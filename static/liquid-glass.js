/* ============================================================================
 * liquid-glass-refract  —  Apple-style "Liquid Glass" for the web
 * ----------------------------------------------------------------------------
 * Physics-based refraction. Zero dependencies, framework-agnostic, single file.
 *
 *   • Rounded-rect SDF (pixel space) + convex squircle bezel profile + Snell's
 *     law of refraction → light only bends at the edge bevel (bezel); the flat
 *     interior has zero displacement, so there is no box / no magnification /
 *     no flip.
 *   • Chromatic aberration: the R / G / B channels are displaced separately.
 *   • Multi-instance, auto-sizing (ResizeObserver), HiDPI (DPR), and graceful
 *     degradation to plain frosted glass on non-Chromium engines.
 *
 * Full refraction relies on a url() inside `backdrop-filter`, which is only
 * stable on Chromium (Chrome / Edge). Firefox / Safari fall back to a simple
 * CSS blur. That is a browser limitation, not a bug in this library.
 *
 * API (see README):
 *   const g = new LiquidGlass(target, options)
 *   g.update(options) | g.refresh() | g.destroy()
 *   LiquidGlass.autoInit(selector?) -> instance[]
 *   LiquidGlass.version
 *   <liquid-glass strength="24" bezel="40" radius="32"> … </liquid-glass>
 * ========================================================================== */
(function (global) {
  "use strict";
  if (typeof document === "undefined" || typeof window === "undefined") return;

  var SVGNS = "http://www.w3.org/2000/svg";
  var XLINK = "http://www.w3.org/1999/xlink";
  var VERSION = "1.0.0";

  /* Index of refraction for the glass bezel (~ optical crown glass). */
  var IOR = 1.45;
  /* Hard cap on the displacement-map raster so huge surfaces stay cheap.
     The field is smooth, so a modest map stretched to the element is fine. */
  var MAX_RASTER = 224;

  /* ---- small math helpers ------------------------------------------------- */
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function len(x, y) { return Math.sqrt(x * x + y * y); }

  // Signed distance to a rounded rectangle centred at the origin, half-size
  // (hw, hh), corner radius r. Negative inside, 0 on the border, positive out.
  function roundedRectSDF(x, y, hw, hh, r) {
    var qx = Math.abs(x) - hw + r;
    var qy = Math.abs(y) - hh + r;
    return Math.min(Math.max(qx, qy), 0) + len(Math.max(qx, 0), Math.max(qy, 0)) - r;
  }

  /* Chromium support probe for url() inside (-webkit-)backdrop-filter. */
  var SUPPORTS_BACKDROP_URL = (function () {
    try {
      return !!(window.CSS && CSS.supports &&
        (CSS.supports("backdrop-filter", "url(#a)") ||
         CSS.supports("-webkit-backdrop-filter", "url(#a)")));
    } catch (e) { return false; }
  })();

  /* Shared, hidden <svg><defs> host for every generated filter. */
  var defsHost = null;
  function getDefs() {
    if (defsHost && defsHost.isConnected) return defsHost;
    var svg = document.createElementNS(SVGNS, "svg");
    svg.setAttribute("class", "lg-filter-host");
    svg.setAttribute("aria-hidden", "true");
    svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none";
    defsHost = document.createElementNS(SVGNS, "defs");
    svg.appendChild(defsHost);
    document.body.appendChild(svg);
    return defsHost;
  }

  var uid = 0;

  /* Resolve a target into an element. */
  function resolve(target) {
    if (!target) return null;
    if (typeof target === "string") return document.querySelector(target);
    return target.nodeType === 1 ? target : null;
  }

  /* ========================================================================
   * LiquidGlass — one glass surface.
   * ====================================================================== */
  function LiquidGlass(target, options) {
    if (!(this instanceof LiquidGlass)) return new LiquidGlass(target, options);
    var el = resolve(target);
    if (!el) throw new Error("LiquidGlass: target not found");
    if (el.__lg) return el.__lg;            // idempotent per element

    this.el = el;
    el.__lg = this;
    this.id = "lgf" + (++uid);
    this.o = {
      radius: "auto",
      bezel: 46,
      strength: 20,
      aberration: 6,
      blur: 1,
      saturate: 1.4,
      brightness: 1.06,
      specular: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      fallbackBlur: 8
    };
    if (options) for (var k in options) if (options.hasOwnProperty(k)) this.o[k] = options[k];

    this._w = this._h = 0;
    this._maxDisp = 1;       // peak displacement (px) baked into the current map
    this._build();
  }

  LiquidGlass.version = VERSION;

  LiquidGlass.prototype._build = function () {
    this.el.classList.add("liquid-glass");

    if (!SUPPORTS_BACKDROP_URL) {
      document.documentElement.classList.add("lg-no-refract");
      this._applyFallback();
      this._buildSpecular();
      this._observe();
      return;
    }

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    var f = document.createElementNS(SVGNS, "filter");
    f.setAttribute("id", this.id);
    f.setAttribute("filterUnits", "userSpaceOnUse");
    f.setAttribute("color-interpolation-filters", "sRGB");
    f.setAttribute("x", "0"); f.setAttribute("y", "0");
    f.setAttribute("width", "100%"); f.setAttribute("height", "100%");
    this.filter = f;

    this.feImage = document.createElementNS(SVGNS, "feImage");
    this.feImage.setAttribute("result", "map");
    this.feImage.setAttribute("preserveAspectRatio", "none");
    f.appendChild(this.feImage);

    getDefs().appendChild(f);

    this._buildFilterGraph();
    this._buildSpecular();
    this._observe();
    this.refresh();
  };

  /* Build (or rebuild) the displacement portion of the filter. With chromatic
     aberration the R/G/B channels are displaced at slightly different scales
     and recombined; without it a single displacement pass is used. */
  LiquidGlass.prototype._buildFilterGraph = function () {
    var f = this.filter;
    // wipe everything except the feImage (the map source)
    while (f.lastChild && f.lastChild !== this.feImage) f.removeChild(f.lastChild);

    var ab = Math.max(0, this.o.aberration) / 100;

    function disp(scale, result) {
      var d = document.createElementNS(SVGNS, "feDisplacementMap");
      d.setAttribute("in", "SourceGraphic");
      d.setAttribute("in2", "map");
      d.setAttribute("xChannelSelector", "R");
      d.setAttribute("yChannelSelector", "G");
      d.setAttribute("scale", scale.toFixed(2));
      d.setAttribute("result", result);
      f.appendChild(d);
      return d;
    }
    // Keep only one colour channel. Alpha must stay 1: feComposite "arithmetic"
    // works in *premultiplied* space, so a 0-alpha pass would contribute nothing
    // and the result would collapse to a single channel (a green cast). With
    // alpha=1 the three single-channel passes add back up to the full colour,
    // and the summed alpha simply clamps to 1.
    function pick(input, ch, result) {
      var m = document.createElementNS(SVGNS, "feColorMatrix");
      m.setAttribute("in", input);
      m.setAttribute("type", "matrix");
      var r = ch === "r" ? 1 : 0, g = ch === "g" ? 1 : 0, b = ch === "b" ? 1 : 0;
      m.setAttribute("values",
        r + " 0 0 0 0  " + g + " 0 0 0 0  " + b + " 0 0 0 0  0 0 0 1 0");
      m.setAttribute("result", result);
      f.appendChild(m);
      return m;
    }
    function add(a, b, result) {
      var c = document.createElementNS(SVGNS, "feComposite");
      c.setAttribute("in", a);
      c.setAttribute("in2", b);
      c.setAttribute("operator", "arithmetic");
      c.setAttribute("k1", "0"); c.setAttribute("k2", "1");
      c.setAttribute("k3", "1"); c.setAttribute("k4", "0");
      c.setAttribute("result", result);
      f.appendChild(c);
      return c;
    }

    this._scaleNodes = [];
    if (ab <= 0) {
      this._scaleNodes.push(disp(1, "out"));   // scale set later in _applyMap
    } else {
      var dr = disp(1, "dr"); pick("dr", "r", "rr");
      var dg = disp(1, "dg"); pick("dg", "g", "gg");
      var db = disp(1, "db"); pick("db", "b", "bb");
      add("rr", "gg", "rg");
      add("rg", "bb", "out");
      this._scaleNodes.push(dr, dg, db);
      this._abScales = [1 + ab, 1, 1 - ab];   // R bends most, B least
    }
  };

  /* Optional specular layer: a thin rim of light that rides the bezel. */
  LiquidGlass.prototype._buildSpecular = function () {
    if (!this.o.specular) { this._removeSpecular(); return; }
    if (this.spec) return;
    var s = document.createElement("span");
    s.className = "lg-specular";
    s.setAttribute("aria-hidden", "true");
    // Keep it behind the element's own content but above the refracted backdrop.
    this.el.appendChild(s);
    this.spec = s;
  };
  LiquidGlass.prototype._removeSpecular = function () {
    if (this.spec && this.spec.parentNode) this.spec.parentNode.removeChild(this.spec);
    this.spec = null;
  };

  LiquidGlass.prototype._observe = function () {
    var self = this;
    this.ro = new ResizeObserver(function () { self.refresh(); });
    this.ro.observe(this.el);
  };

  /* Read the effective corner radius in px. */
  LiquidGlass.prototype._radiusPx = function (w, h) {
    var r = this.o.radius;
    if (r === "auto" || r == null) {
      var cs = getComputedStyle(this.el);
      r = parseFloat(cs.borderTopLeftRadius) || 0;
    }
    return clamp(r, 0, Math.min(w, h) / 2);
  };

  /* Rebuild the displacement map raster (expensive) + re-apply the filter. */
  LiquidGlass.prototype.refresh = function () {
    if (!SUPPORTS_BACKDROP_URL) { this._applyFallback(); return; }

    var rect = this.el.getBoundingClientRect();
    var w = Math.round(rect.width);
    var h = Math.round(rect.height);
    if (w < 2 || h < 2) return;             // collapsed / hidden
    this._w = w; this._h = h;

    var rPx = this._radiusPx(w, h);
    var bezel = clamp(this.o.bezel, 1, Math.min(w, h) / 2);
    var strength = Math.max(0, this.o.strength);

    // Map raster: element size * dpr, capped. Smooth field → cheap to stretch.
    var scale = Math.min(this.o.dpr, MAX_RASTER / Math.max(w, h));
    var mw = Math.max(2, Math.round(w * scale));
    var mh = Math.max(2, Math.round(h * scale));
    this.canvas.width = mw;
    this.canvas.height = mh;

    var img = this.ctx.createImageData(mw, mh);
    var data = img.data;
    var raw = new Float32Array(mw * mh * 2);

    var hw = w / 2, hh = h / 2;
    // Peak of the Snell term occurs at the rim; normalise so it equals `strength`.
    var peak = 1 - Math.sin(Math.asin(Math.min(1, 1 / IOR)));  // = 1 - 1/IOR
    var gain = peak > 1e-4 ? strength / peak : strength;
    var eps = bezel / 16 + 0.5;             // finite-difference step for normals
    var maxDisp = 0, k = 0;

    for (var py = 0; py < mh; py++) {
      var ey = (py + 0.5) / mh * h - hh;    // element-space px, centred
      for (var px = 0; px < mw; px++) {
        var ex = (px + 0.5) / mw * w - hw;
        var d = roundedRectSDF(ex, ey, hw, hh, rPx);
        var dxv = 0, dyv = 0;
        if (d < 0) {                        // inside the surface only
          var depth = -d;                   // distance inward from the border
          if (depth < bezel) {
            var t = depth / bezel;          // 0 at rim → 1 at inner bezel edge
            // Convex squircle cross-section: incidence angle goes 90°→0°.
            var thetaI = Math.acos(clamp(t, 0, 1));
            var sinT = Math.min(1, Math.sin(thetaI) / IOR);
            var thetaT = Math.asin(sinT);
            var mag = gain * (Math.sin(thetaI) - Math.sin(thetaT));
            // Outward normal via finite differences of the SDF.
            var gx = roundedRectSDF(ex + eps, ey, hw, hh, rPx) -
                     roundedRectSDF(ex - eps, ey, hw, hh, rPx);
            var gy = roundedRectSDF(ex, ey + eps, hw, hh, rPx) -
                     roundedRectSDF(ex, ey - eps, hw, hh, rPx);
            var gl = len(gx, gy) || 1;
            // Refraction pulls the sampled backdrop toward the centre (-normal).
            dxv = -(gx / gl) * mag;
            dyv = -(gy / gl) * mag;
          }
        }
        raw[k++] = dxv;
        raw[k++] = dyv;
        if (Math.abs(dxv) > maxDisp) maxDisp = Math.abs(dxv);
        if (Math.abs(dyv) > maxDisp) maxDisp = Math.abs(dyv);
      }
    }
    if (maxDisp < 1) maxDisp = 1;
    this._maxDisp = maxDisp;

    // Encode offsets into R (x) and G (y); 128 == no displacement.
    k = 0;
    for (var i = 0; i < data.length; i += 4) {
      data[i]     = (raw[k++] / maxDisp * 0.5 + 0.5) * 255;
      data[i + 1] = (raw[k++] / maxDisp * 0.5 + 0.5) * 255;
      data[i + 2] = 128;
      data[i + 3] = 255;
    }
    this.ctx.putImageData(img, 0, 0);

    var url = this.canvas.toDataURL();
    this.feImage.setAttributeNS(XLINK, "href", url);
    this.feImage.setAttribute("href", url);
    this.feImage.setAttribute("x", "0");
    this.feImage.setAttribute("y", "0");
    this.feImage.setAttribute("width", w);
    this.feImage.setAttribute("height", h);
    this.filter.setAttribute("width", w);
    this.filter.setAttribute("height", h);

    this._applyMap();
  };

  /* Apply current displacement scale + the CSS backdrop-filter tail. Cheap:
     called on its own when only strength / aberration / blur etc. change. */
  LiquidGlass.prototype._applyMap = function () {
    if (!SUPPORTS_BACKDROP_URL) { this._applyFallback(); return; }
    // feDisplacementMap shifts by scale*(channel-0.5); our peak channel offset
    // is 0.5, so scale = 2*maxDisp reproduces the true peak displacement.
    var base = 2 * this._maxDisp;
    var nodes = this._scaleNodes || [];
    if (this._abScales && nodes.length === 3) {
      for (var i = 0; i < 3; i++) nodes[i].setAttribute("scale", (base * this._abScales[i]).toFixed(2));
    } else if (nodes[0]) {
      nodes[0].setAttribute("scale", base.toFixed(2));
    }
    var o = this.o;
    var tail = "url(#" + this.id + ") blur(" + o.blur + "px) saturate(" + o.saturate +
               ") brightness(" + o.brightness + ")";
    this.el.style.webkitBackdropFilter = tail;
    this.el.style.backdropFilter = tail;
  };

  LiquidGlass.prototype._applyFallback = function () {
    var o = this.o;
    var tail = "blur(" + o.fallbackBlur + "px) saturate(" + o.saturate +
               ") brightness(" + o.brightness + ")";
    this.el.style.webkitBackdropFilter = tail;
    this.el.style.backdropFilter = tail;
  };

  /* Public: change parameters. Only bezel/radius/dpr force a map rebuild. */
  LiquidGlass.prototype.update = function (options) {
    if (!options) return this;
    var rebuild = false, regraph = false;
    for (var k in options) {
      if (!options.hasOwnProperty(k)) continue;
      if (this.o[k] === options[k]) continue;
      this.o[k] = options[k];
      if (k === "bezel" || k === "radius" || k === "dpr") rebuild = true;
      if (k === "aberration") regraph = true;
      if (k === "specular") { options[k] ? this._buildSpecular() : this._removeSpecular(); }
    }
    if (!SUPPORTS_BACKDROP_URL) { this._applyFallback(); return this; }
    if (regraph) this._buildFilterGraph();
    if (rebuild) this.refresh();
    else this._applyMap();      // strength / aberration / blur / saturate …
    return this;
  };

  /* Public: tear down completely. */
  LiquidGlass.prototype.destroy = function () {
    if (this.ro) this.ro.disconnect();
    if (this.filter && this.filter.parentNode) this.filter.parentNode.removeChild(this.filter);
    this._removeSpecular();
    this.el.style.backdropFilter = "";
    this.el.style.webkitBackdropFilter = "";
    this.el.classList.remove("liquid-glass");
    delete this.el.__lg;
  };

  /* ---- statics ------------------------------------------------------------ */
  LiquidGlass.autoInit = function (selector) {
    selector = selector || "[data-liquid-glass]";
    var out = [];
    var nodes = document.querySelectorAll(selector);
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i], opts = {};
      var raw = el.getAttribute("data-liquid-glass");
      if (raw) { try { opts = JSON.parse(raw); } catch (e) {} }
      out.push(new LiquidGlass(el, opts));
    }
    return out;
  };

  /* ---- <liquid-glass> custom element -------------------------------------- */
  if (typeof customElements !== "undefined" && !customElements.get("liquid-glass")) {
    function attrNum(el, name, dflt) {
      var v = el.getAttribute(name);
      return v == null || v === "" ? dflt : parseFloat(v);
    }
    var LGElement = function () { return Reflect.construct(HTMLElement, [], LGElement); };
    LGElement.prototype = Object.create(HTMLElement.prototype);
    LGElement.prototype.constructor = LGElement;
    LGElement.prototype.connectedCallback = function () {
      var opts = {};
      if (this.hasAttribute("radius")) opts.radius = attrNum(this, "radius");
      if (this.hasAttribute("bezel")) opts.bezel = attrNum(this, "bezel");
      if (this.hasAttribute("strength")) opts.strength = attrNum(this, "strength");
      if (this.hasAttribute("aberration")) opts.aberration = attrNum(this, "aberration");
      if (this.hasAttribute("blur")) opts.blur = attrNum(this, "blur");
      if (this.hasAttribute("saturate")) opts.saturate = attrNum(this, "saturate");
      if (this.hasAttribute("brightness")) opts.brightness = attrNum(this, "brightness");
      if (this.hasAttribute("specular")) opts.specular = this.getAttribute("specular") !== "false";
      this.__glass = new LiquidGlass(this, opts);
    };
    LGElement.prototype.disconnectedCallback = function () {
      if (this.__glass) this.__glass.destroy();
    };
    try { customElements.define("liquid-glass", LGElement); } catch (e) {}
  }

  /* ========================================================================
   * Project convenience layer — auto-glass the existing CAS Monster markup
   * without hand-editing every element. Maps each surface to tuned options
   * and watches for surfaces added at runtime (chat cards, modals, …).
   * ====================================================================== */
  var PRESETS = [
    { sel: ".login-card",     o: { strength: 26, bezel: 52, aberration: 7, radius: "auto" } },
    { sel: ".right-panel",    o: { strength: 20, bezel: 44, aberration: 5 } },
    { sel: ".card",           o: { strength: 18, bezel: 40, aberration: 5 } },
    { sel: ".quick-modal",    o: { strength: 22, bezel: 46, aberration: 6 } },
    { sel: ".report-modal",   o: { strength: 22, bezel: 46, aberration: 6 } },
    { sel: ".cas-card-group", o: { strength: 18, bezel: 40, aberration: 5 } },
    { sel: ".cas-card",       o: { strength: 16, bezel: 38, aberration: 5 } },
    { sel: ".title-bar",      o: { strength: 14, bezel: 30, aberration: 4, specular: true } },
    { sel: ".disclaimer",     o: { strength: 12, bezel: 26, aberration: 3 } },
    { sel: ".chat-input-box", o: { strength: 14, bezel: 30, aberration: 4 } }
  ];

  function autoAttach(el, o) {
    if (!el || el.__lg) return;
    try { new LiquidGlass(el, o); } catch (e) {}
  }
  function scan(root) {
    root = root || document;
    if (!root.querySelectorAll) return;
    for (var i = 0; i < PRESETS.length; i++) {
      var p = PRESETS[i], nodes = root.querySelectorAll(p.sel);
      for (var j = 0; j < nodes.length; j++) autoAttach(nodes[j], p.o);
    }
  }

  function boot() {
    if (!SUPPORTS_BACKDROP_URL) document.documentElement.classList.add("lg-no-refract");
    scan(document);
    LiquidGlass.autoInit();   // honour any data-liquid-glass authoring too
    var mo = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var added = muts[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var n = added[j];
          if (n.nodeType !== 1) continue;
          scan(n);
          if (n.matches) {
            for (var p = 0; p < PRESETS.length; p++) {
              if (n.matches(PRESETS[p].sel)) autoAttach(n, PRESETS[p].o);
            }
          }
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  /* UMD-ish export + global. */
  global.LiquidGlass = LiquidGlass;
  if (typeof module !== "undefined" && module.exports) module.exports = LiquidGlass;
})(typeof window !== "undefined" ? window : this);
