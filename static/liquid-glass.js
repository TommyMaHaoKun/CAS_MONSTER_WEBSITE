/* ============================================================================
 * Liquid Glass refraction for the web
 * ----------------------------------------------------------------------------
 * Faithful implementation of the displacement-map technique popularised by
 * shuding/liquid-glass (MIT) and described in kube.io's "Liquid Glass in the
 * Browser". For every glass surface we:
 *   1. rasterise a *displacement map* on a <canvas>, where each pixel encodes
 *      how far the backdrop should be sampled from (R = x offset, G = y offset);
 *   2. concentrate that displacement near the rounded-rect border using a
 *      signed-distance field (SDF) + smoothStep, so the centre stays clear and
 *      only the edges bend the light (this is what real Liquid Glass does);
 *   3. pipe the map through  feImage -> feDisplacementMap  and apply the filter
 *      as a `backdrop-filter`, so the page *behind* the element refracts.
 *
 * Chromium applies url() backdrop-filters; Safari/Firefox ignore them and fall
 * back to the plain CSS blur defined in style.css, so the UI still looks glassy.
 * ========================================================================== */
(function () {
  "use strict";
  if (typeof document === "undefined" || typeof window === "undefined") return;

  var SVGNS = "http://www.w3.org/2000/svg";
  var XLINK = "http://www.w3.org/1999/xlink";

  /* ---- shader-style helpers (ported from the reference implementation) ---- */
  function clamp01(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }
  function smoothStep(a, b, t) {
    t = clamp01((t - a) / (b - a));
    return t * t * (3 - 2 * t);
  }
  function len(x, y) { return Math.sqrt(x * x + y * y); }
  // Signed distance to a rounded rectangle centred at origin, half-size (hw,hh),
  // corner radius r. Negative inside, 0 on the border, positive outside.
  function roundedRectSDF(x, y, hw, hh, r) {
    var qx = Math.abs(x) - hw + r;
    var qy = Math.abs(y) - hh + r;
    return Math.min(Math.max(qx, qy), 0) + len(Math.max(qx, 0), Math.max(qy, 0)) - r;
  }

  /* ---- shared <defs> host for every generated filter --------------------- */
  var defs = null;
  function getDefs() {
    if (defs && defs.isConnected) return defs;
    var svg = document.createElementNS(SVGNS, "svg");
    svg.setAttribute("class", "lg-filter-host");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none";
    defs = document.createElementNS(SVGNS, "defs");
    svg.appendChild(defs);
    document.body.appendChild(svg);
    return defs;
  }

  /* Detect Chromium-style support for url() inside backdrop-filter. */
  var SUPPORTS_BACKDROP_URL = (function () {
    try {
      return !!(window.CSS && CSS.supports &&
        (CSS.supports("backdrop-filter", "url(#a)") ||
         CSS.supports("-webkit-backdrop-filter", "url(#a)")));
    } catch (e) { return false; }
  })();

  var uid = 0;

  /* ---- a single glass surface -------------------------------------------- */
  function Glass(el, opts) {
    opts = opts || {};
    this.el = el;
    this.id = "lgf" + (++uid);
    // map resolution is capped for performance; the map is a smooth field so a
    // low-res image stretched to the element looks identical to a full-res one.
    this.maxRes = opts.maxRes || 176;
    this.strength = opts.strength != null ? opts.strength : 1;     // displacement gain
    this.band = opts.band != null ? opts.band : 0.34;              // edge band width (0..0.5)
    this.radius = opts.radius != null ? opts.radius : 0.62;        // SDF corner radius (norm)
    this.tail = opts.tail != null ? opts.tail : "blur(0.4px) saturate(180%) brightness(1.05)";
    this._w = this._h = 0;
    this._build();
  }

  Glass.prototype._build = function () {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    var f = document.createElementNS(SVGNS, "filter");
    f.setAttribute("id", this.id);
    f.setAttribute("filterUnits", "userSpaceOnUse");
    f.setAttribute("color-interpolation-filters", "sRGB");
    f.setAttribute("x", "0"); f.setAttribute("y", "0");
    f.setAttribute("width", "100%"); f.setAttribute("height", "100%");

    this.feImage = document.createElementNS(SVGNS, "feImage");
    this.feImage.setAttribute("result", "map");
    this.feImage.setAttribute("preserveAspectRatio", "none");

    this.feDisp = document.createElementNS(SVGNS, "feDisplacementMap");
    this.feDisp.setAttribute("in", "SourceGraphic");
    this.feDisp.setAttribute("in2", "map");
    this.feDisp.setAttribute("xChannelSelector", "R");
    this.feDisp.setAttribute("yChannelSelector", "G");

    f.appendChild(this.feImage);
    f.appendChild(this.feDisp);
    getDefs().appendChild(f);
    this.filter = f;

    var self = this;
    this.ro = new ResizeObserver(function () { self.update(); });
    this.ro.observe(this.el);
    this.update();
  };

  Glass.prototype.update = function () {
    var rect = this.el.getBoundingClientRect();
    var w = Math.round(rect.width);
    var h = Math.round(rect.height);
    if (w < 2 || h < 2) return;                 // hidden / collapsed -> skip
    if (w === this._w && h === this._h) return; // unchanged
    this._w = w; this._h = h;

    // Map raster size (downscaled, aspect-preserved).
    var scale = Math.min(1, this.maxRes / Math.max(w, h));
    var mw = Math.max(2, Math.round(w * scale));
    var mh = Math.max(2, Math.round(h * scale));
    this.canvas.width = mw;
    this.canvas.height = mh;

    var hw = 0.5, hh = 0.5;                      // half extents in normalised space
    var img = this.ctx.createImageData(mw, mh);
    var data = img.data;
    var raw = new Float32Array(mw * mh * 2);
    var maxDisp = 0;

    // Pass 1: compute the per-pixel displacement vector (in element pixels).
    var k = 0;
    for (var y = 0; y < mh; y++) {
      for (var x = 0; x < mw; x++) {
        var u = (x + 0.5) / mw;                  // 0..1
        var v = (y + 0.5) / mh;
        var ix = u - 0.5;                        // centred -0.5..0.5
        var iy = v - 0.5;
        var d = roundedRectSDF(ix, iy, hw, hh, this.radius * 0.5);
        // depth inward from the border (0 at edge, grows toward centre)
        var depth = -d;
        // magnitude: 1 at the rim, easing to 0 once we are `band` inside.
        var m = smoothStep(this.band, 0, depth) * this.strength;
        // lens direction: pull the sample toward the centre (refraction).
        var dx = -ix * m;                        // in normalised units
        var dy = -iy * m;
        var pdx = dx * w;                        // convert to element pixels
        var pdy = dy * h;
        raw[k++] = pdx;
        raw[k++] = pdy;
        if (Math.abs(pdx) > maxDisp) maxDisp = Math.abs(pdx);
        if (Math.abs(pdy) > maxDisp) maxDisp = Math.abs(pdy);
      }
    }
    if (maxDisp < 1) maxDisp = 1;

    // Pass 2: encode offsets into R/G (0.5 == no displacement).
    k = 0;
    for (var i = 0; i < data.length; i += 4) {
      data[i]     = (raw[k++] / maxDisp * 0.5 + 0.5) * 255; // R -> x
      data[i + 1] = (raw[k++] / maxDisp * 0.5 + 0.5) * 255; // G -> y
      data[i + 2] = 128;                                    // B unused
      data[i + 3] = 255;                                    // A
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
    this.feDisp.setAttribute("scale", maxDisp.toFixed(2));

    if (SUPPORTS_BACKDROP_URL) {
      var bf = "url(#" + this.id + ") " + this.tail;
      this.el.style.webkitBackdropFilter = bf;
      this.el.style.backdropFilter = bf;
    }
  };

  Glass.prototype.destroy = function () {
    if (this.ro) this.ro.disconnect();
    if (this.filter && this.filter.parentNode) this.filter.parentNode.removeChild(this.filter);
    this.el.style.backdropFilter = "";
    this.el.style.webkitBackdropFilter = "";
  };

  /* ---- surface presets: which elements get refraction, and how strong ---- */
  // Refraction is reserved for surfaces that float over *rich* content (cards,
  // panels, modals, the login card over its gradient). Chrome elements like the
  // title bar / input box sit over a flat backdrop, where the displacement only
  // shows up as a faint rectangle — so they stay plain frosted glass.
  var PRESETS = [
    { sel: ".login-card",      o: { strength: 1.05, band: 0.30, radius: 0.5 } },
    { sel: ".right-panel",     o: { strength: 0.85, band: 0.22, radius: 0.32 } },
    { sel: ".card",            o: { strength: 0.85, band: 0.30, radius: 0.42 } },
    { sel: ".quick-modal",     o: { strength: 1.0,  band: 0.26, radius: 0.4 } },
    { sel: ".report-modal",    o: { strength: 1.0,  band: 0.26, radius: 0.4 } },
    { sel: ".cas-card-group",  o: { strength: 0.85, band: 0.24, radius: 0.36 } },
    { sel: ".cas-card",        o: { strength: 0.8,  band: 0.30, radius: 0.42 } }
  ];

  function attach(el, o) {
    if (!el || el.__lg) return;
    el.__lg = new Glass(el, o);
  }
  function scan(root) {
    root = root || document;
    for (var i = 0; i < PRESETS.length; i++) {
      var p = PRESETS[i];
      var nodes = root.querySelectorAll ? root.querySelectorAll(p.sel) : [];
      for (var j = 0; j < nodes.length; j++) attach(nodes[j], p.o);
    }
  }

  function boot() {
    if (!SUPPORTS_BACKDROP_URL) {
      // Mark the document so CSS can lean on the blur-only fallback path.
      document.documentElement.classList.add("lg-no-refract");
    }
    scan(document);
    // Watch for dynamically added surfaces (chat cards, modals opening, etc.).
    var mo = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var added = muts[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var n = added[j];
          if (n.nodeType !== 1) continue;
          scan(n);
          if (n.matches) {
            for (var p = 0; p < PRESETS.length; p++) {
              if (n.matches(PRESETS[p].sel)) attach(n, PRESETS[p].o);
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

  // Expose for manual use / debugging.
  window.LiquidGlass = { Glass: Glass, scan: scan, attach: attach };
})();
