"""
CAS Monster Website - Flask Backend
Mirrors CAS_AUTOFILL.py functionality as a web application.
"""
import os
import re
import time
import json
import threading
from concurrent.futures import ThreadPoolExecutor
from datetime import date as dt_date, timedelta
from typing import Optional

import requests
from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit

# --------------- Config ---------------
URL = "http://101.227.232.33:8001/"
DEEPSEEK_BASE_URL = "https://api.deepseek.com"
DEEPSEEK_CHAT_ENDPOINT = f"{DEEPSEEK_BASE_URL}/v1/chat/completions"
CONVERSATION_CLUB = "谈话记录(Conversation)"
DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY", "")

app = Flask(__name__)
app.config["SECRET_KEY"] = "cas-monster-secret"
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="threading")

# --------------- Session Store ---------------
sessions = {}       # sid -> {"cookies": list, "username": str, "password": str}
cancel_flags = {}   # sid -> bool
pending_data = {}   # sid -> {"task": str, "entries": list, "params": dict}

# --------------- Helpers ---------------

def parse_date_ymd(s: str):
    m = re.match(r"^\s*(\d{4})[/-](\d{1,2})[/-](\d{1,2})\s*$", s)
    if not m:
        raise ValueError("Date format must be YYYY/MM/DD")
    y, mo, d = map(int, m.groups())
    if not (1 <= mo <= 12 and 1 <= d <= 31):
        raise ValueError("Invalid month/day.")
    try:
        dt_date(y, mo, d)
    except ValueError as exc:
        raise ValueError("Invalid date.") from exc
    return y, mo, d


def iter_weekly_dates(start_dt: dt_date, end_dt: dt_date):
    cur = start_dt
    while cur <= end_dt:
        yield cur
        cur += timedelta(days=7)


def word_count(s: str) -> int:
    if re.search(r"[A-Za-z]", s):
        return len(re.findall(r"[A-Za-z0-9]+(?:'[A-Za-z0-9]+)?", s))
    return len(re.findall(r"\S", s))


def parse_json_object(text: str) -> dict:
    cleaned = text.strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```[a-zA-Z0-9]*\n", "", cleaned)
        cleaned = re.sub(r"\n```$", "", cleaned)
        cleaned = cleaned.strip()
    try:
        return json.loads(cleaned)
    except Exception:
        m = re.search(r"\{.*\}", cleaned, re.S)
        if not m:
            raise ValueError("No JSON object found in response.")
        return json.loads(m.group(0))


# --------------- DeepSeek API ---------------

def deepseek_chat(api_key: str, model: str, messages: list, temperature: float = 0.5, max_tokens: int = 600) -> dict:
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    payload = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
    }
    r = requests.post(DEEPSEEK_CHAT_ENDPOINT, headers=headers, json=payload)
    if r.status_code != 200:
        try:
            j = r.json()
        except Exception:
            j = {"raw": r.text}
        raise RuntimeError(f"DeepSeek API error HTTP {r.status_code}: {j}")
    return r.json()


def generate_activity_record_deepseek(api_key, club_name, date_ymd, theme, c_hours, a_hours, s_hours, model="deepseek-chat"):
    is_conversation = club_name.strip() == CONVERSATION_CLUB
    min_words = 175 if is_conversation else 100
    word_target = "180-220" if is_conversation else "120-180"
    user_content = (
        f"Write an IB CAS Activity Record for the club '{club_name}'.\n"
        f"Context:\n"
        f"- Date: {date_ymd}\n"
        f"- Activity theme: {theme}\n"
        f"- Hours: C={c_hours}, A={a_hours}, S={s_hours}\n\n"
        f"Hard output rules (MUST follow):\n"
        f"- Output ONLY the final record text.\n"
        f"- Do NOT add a title, labels, prefaces, explanations, word counts, or any extra lines.\n"
        f"- No bullet points, no markdown, no quotes.\n\n"
        f"Content requirements:\n"
        f"- English, realistic high school tone.\n"
        f"- 1-2 coherent paragraphs.\n"
        f"- {word_target} words (must be >= {min_words} words).\n"
        f"- The first 80% of the text must be concrete and specific.\n"
        f"- Only in the LAST 1-2 sentences, allow brief general reflection."
    )
    messages = [
        {"role": "system", "content": "You write IB CAS Activity Records. Output ONLY the final prose."},
        {"role": "user", "content": user_content},
    ]
    last_text = ""
    for _ in range(3):
        resp = deepseek_chat(api_key, model, messages, temperature=0.55, max_tokens=360)
        text = resp["choices"][0]["message"]["content"].strip()
        last_text = text
        if word_count(text) >= min_words:
            return text
        messages.append({"role": "assistant", "content": text})
        messages.append({"role": "user", "content": f"Too short. Expand to {word_target} words."})
    return last_text


def generate_weekly_theme_desc_deepseek(api_key, club_name, date_ymd, club_desc, periodic_desc, used_themes, used_descs=None, model="deepseek-chat"):
    avoid = "; ".join(used_themes[-8:]) if used_themes else "none"
    if periodic_desc:
        periodic_line = f"- Periodic activity: {periodic_desc}"
        theme_guidance = (
            f"- All themes MUST be about the periodic activity: {periodic_desc}.\n"
            f"- Generate a specific aspect, session, or subtopic of this periodic activity.\n"
            f"- Keep the same overarching subject; only vary the specific focus within that subject.\n"
            f"- Avoid repetition. Do NOT reuse any themes from: {avoid}."
        )
    else:
        periodic_line = "- Periodic activity: none"
        theme_guidance = (
            f"- Avoid repetition. Do NOT reuse any themes from: {avoid}.\n"
            f"- Vary the activity focus across weeks."
        )
    user_content = (
        f"Create ONE unique Activity theme and Activity Description for the club '{club_name}'.\n"
        f"Club description: {club_desc}\n"
        f"Date: {date_ymd}\n"
        f"{periodic_line}\n\n"
        f"Return a JSON object with keys theme and description only.\n"
        f"Rules:\n"
        f"- theme: 4-10 words, English, no date, no quotes.\n"
        f"- description: English, single paragraph, more than 80 words.\n"
        f"- Include at least 3 concrete details.\n"
        f"{theme_guidance}\n"
        f"- No bullet points, no markdown, no labels."
    )
    messages = [
        {"role": "system", "content": "Return ONLY a valid JSON object with keys theme and description."},
        {"role": "user", "content": user_content},
    ]
    used_norm = {t.strip().lower() for t in used_themes}
    used_descs_norm = {d.strip().lower() for d in (used_descs or [])}
    last_theme, last_desc = "", ""
    for _ in range(4):
        resp = deepseek_chat(api_key, model, messages, temperature=0.6, max_tokens=320)
        raw = resp["choices"][0]["message"]["content"].strip()
        try:
            obj = parse_json_object(raw)
            theme = str(obj.get("theme", "")).strip()
            desc = str(obj.get("description", "")).strip()
        except Exception:
            messages.append({"role": "assistant", "content": raw})
            messages.append({"role": "user", "content": "Return only valid JSON with keys theme and description."})
            continue
        theme = re.sub(r"\s+", " ", theme)
        desc = re.sub(r"\s+", " ", desc)
        last_theme, last_desc = theme, desc
        if not theme or word_count(theme) < 4 or word_count(theme) > 10:
            messages.append({"role": "assistant", "content": raw})
            messages.append({"role": "user", "content": "Revise: theme must be 4-10 words."})
            continue
        if theme.strip().lower() in used_norm:
            messages.append({"role": "assistant", "content": raw})
            messages.append({"role": "user", "content": "Revise: theme repeats. Make it different."})
            continue
        if word_count(desc) <= 80:
            messages.append({"role": "assistant", "content": raw})
            messages.append({"role": "user", "content": "Revise: description must be more than 80 words."})
            continue
        if desc.strip().lower() in used_descs_norm:
            messages.append({"role": "assistant", "content": raw})
            messages.append({"role": "user", "content": "Revise: description repeats. Write new content."})
            continue
        return theme, desc
    return last_theme, last_desc


def generate_reflection_summary_deepseek(api_key, club_name, title, club_desc="", reflection_desc="", model="deepseek-chat"):
    extra_context = ""
    if club_desc:
        extra_context += f"Club description: {club_desc}\n"
    if reflection_desc:
        extra_context += f"Reflection focus: {reflection_desc}\n"
    user_content = (
        f"Write a concise English summary for an IB CAS reflection.\n"
        f"Club: {club_name}\nTitle: {title}\n\n"
        f"{extra_context}"
        f"Hard output rules:\n"
        f"- Output ONLY ONE sentence.\n"
        f"- No labels, no quotes, no extra lines.\n"
        f"- About 20 words (18-22). Must end with punctuation."
    )
    messages = [
        {"role": "system", "content": "Return exactly one natural English sentence only."},
        {"role": "user", "content": user_content},
    ]
    last = ""
    for _ in range(4):
        resp = deepseek_chat(api_key, model, messages, temperature=0.45, max_tokens=80)
        text = resp["choices"][0]["message"]["content"].strip()
        text = re.sub(r"\s+", " ", text).split("\n")[0].strip().strip('"')
        last = text
        wc = word_count(text)
        if 18 <= wc <= 22 and text.endswith(('.', '!', '?')):
            return text
        messages.append({"role": "assistant", "content": text})
        messages.append({"role": "user", "content": "Revise: 1 sentence, 18-22 words, end with punctuation."})
    return last


def generate_reflection_content_deepseek(api_key, club_name, title, club_desc="", reflection_desc="", model="deepseek-chat"):
    extra_context = ""
    if club_desc:
        extra_context += f"Club description: {club_desc}\n"
    if reflection_desc:
        extra_context += f"Reflection focus: {reflection_desc}\n"
    user_content = (
        f"Write an IB CAS Activity Reflection in English.\n"
        f"Club: {club_name}\nTitle: {title}\n\n"
        f"{extra_context}"
        f"Hard output rules:\n"
        f"- Output ONLY the reflection body text.\n"
        f"- No title, labels, headers, prefaces.\n"
        f"- No bullet points, no markdown.\n\n"
        f"Structure:\n"
        f"- At least 550 words (target 600-750).\n"
        f"- 4-7 paragraphs.\n"
        f"- First 70-85% must be specific with 6-10 concrete details.\n"
        f"- Only final paragraph allows general statements."
    )
    messages = [
        {"role": "system", "content": "You write long-form IB CAS reflections. Output ONLY the final body text."},
        {"role": "user", "content": user_content},
    ]
    last = ""
    for _ in range(3):
        resp = deepseek_chat(api_key, model, messages, temperature=0.55, max_tokens=1400)
        text = resp["choices"][0]["message"]["content"].strip()
        last = text
        if word_count(text) >= 550:
            return text
        messages.append({"role": "assistant", "content": text})
        messages.append({"role": "user", "content": "Too short. Expand to 600-750 words."})
    return last


# --------------- Playwright automation ---------------

def _find_iframe_src_contains(page, must_contain, timeout_ms=60000):
    end = time.time() + timeout_ms / 1000
    while time.time() < end:
        for h in page.locator("iframe").element_handles():
            src = h.get_attribute("src") or ""
            if src and all(s in src for s in must_contain):
                return src
        time.sleep(0.12)
    return None


def _frame_locator_by_src(page, src):
    esc = src.replace("\\", "\\\\").replace('"', '\\"')
    return page.frame_locator(f'iframe[src="{esc}"]')


def int_from_text(t):
    m = re.search(r"\d+", t)
    if not m:
        raise ValueError(f"Cannot parse integer from {t!r}")
    return int(m.group())


def select_date_layui(scope, target_year, target_month, target_day):
    cal = scope.locator("#layui-laydate1")
    cal.wait_for(state="visible")

    def current_ym():
        y_txt = cal.locator(".laydate-set-ym span[lay-type='year']").inner_text()
        m_txt = cal.locator(".laydate-set-ym span[lay-type='month']").inner_text()
        return int_from_text(y_txt), int_from_text(m_txt)

    for _ in range(60):
        cy, _ = current_ym()
        if cy == target_year:
            break
        cal.locator("i.laydate-next-y" if cy < target_year else "i.laydate-prev-y").click()
        time.sleep(0.03)

    for _ in range(60):
        cy, cm = current_ym()
        if cy == target_year and cm == target_month:
            break
        cal.locator(
            "i.laydate-next-m" if (cy * 12 + cm) < (target_year * 12 + target_month) else "i.laydate-prev-m"
        ).click()
        time.sleep(0.03)

    cal.locator(f"td[lay-ymd='{target_year}-{target_month}-{target_day}']").click()


def login_and_wait_home(page, user, pw):
    page.goto(URL, wait_until="domcontentloaded")
    page.fill("input[placeholder='Please enter your login account']", user)
    page.fill("input[placeholder='Please enter your password']", pw)
    page.click("button.login-btn")
    page.wait_for_selector("text=WFLA高中综合系统")


def login_or_restore(page, user, pw):
    """Navigate to URL; skip login if session cookies are still valid."""
    page.goto(URL, wait_until="domcontentloaded")
    try:
        page.wait_for_selector("text=WFLA高中综合系统", timeout=5000)
        return
    except Exception:
        pass
    page.fill("input[placeholder='Please enter your login account']", user)
    page.fill("input[placeholder='Please enter your password']", pw)
    page.click("button.login-btn")
    page.wait_for_selector("text=WFLA高中综合系统")


def pick_context(page, iframe_css):
    if page.locator(iframe_css).count() > 0:
        return page.frame_locator(iframe_css)
    return page


def list_clubs_in_add_dialog(add_ctx):
    club_input = add_ctx.locator(
        "div.layui-form-item:has(label:has-text('Select a club')) "
        "div.layui-form-select input[placeholder='Please select']"
    )
    club_input.wait_for()
    club_input.click()
    options = add_ctx.locator("dd[lay-value]").filter(has_not=add_ctx.locator(".layui-select-tips"))
    options.first.wait_for()
    clubs = [t.strip() for t in options.all_inner_texts() if t.strip()]
    return [c for c in clubs if c.lower() != "please select"]


def select_club_by_text(add_ctx, club_name):
    club_input = add_ctx.locator(
        "div.layui-form-item:has(label:has-text('Select a club')) "
        "div.layui-form-select input[placeholder='Please select']"
    )
    club_input.wait_for()
    club_input.click()
    add_ctx.locator(f"dd:has-text('{club_name}')").click()


def open_records_list_ctx(page):
    page.click("text=Club Info")
    page.click("text=Activity Records")
    return pick_context(page, "iframe[src*='Stu/Cas/RecordList']")


def open_reflection_list_ctx(page):
    page.click("text=Club Info")
    page.click("text=Activity Reflection")
    src = _find_iframe_src_contains(page, ["Stu/Cas", "Reflection"])
    if src and "AddReflection" not in src:
        return _frame_locator_by_src(page, src)
    for css in ["iframe[src*='Stu/Cas/Reflection']", "iframe[src*='Stu/Cas/Reflec']"]:
        if page.locator(css).count() > 0:
            return page.frame_locator(css)
    return page


def open_add_record_ctx(record_list_ctx, page):
    btn = record_list_ctx.locator("button[data-method='add']")
    if btn.count() == 0:
        btn = record_list_ctx.locator("button:has-text('Add')")
    btn.first.click()
    add_iframe_css = "iframe[src*='/Stu/Cas/AddRecord']"
    if record_list_ctx.locator(add_iframe_css).count():
        return record_list_ctx.frame_locator(add_iframe_css)
    if page.locator(add_iframe_css).count():
        return page.frame_locator(add_iframe_css)
    return page.frame_locator(add_iframe_css)


def open_add_reflection_ctx(reflection_list_ctx, page):
    btn = reflection_list_ctx.locator("button[data-method='add']")
    if btn.count() == 0:
        btn = reflection_list_ctx.locator("button:has-text('Add')")
    btn.first.click()
    add_iframe_css = "iframe[src*='/Stu/Cas/AddReflection']"
    if reflection_list_ctx.locator(add_iframe_css).count():
        return reflection_list_ctx.frame_locator(add_iframe_css)
    if page.locator(add_iframe_css).count():
        return page.frame_locator(add_iframe_css)
    return page.frame_locator(add_iframe_css)


def fill_kindeditor_body(add_ctx, text):
    editor_iframe = add_ctx.locator("iframe.ke-edit-iframe")
    editor_iframe.first.wait_for()
    editor_frame = add_ctx.frame_locator("iframe.ke-edit-iframe")
    body = editor_frame.locator("body.ke-content")
    body.wait_for()
    body.evaluate("(el, v) => { el.innerText = v; }", text)
    body.click()
    body.press("End")


def click_learning_outcomes(add_ctx, selected):
    for name in selected:
        box = add_ctx.locator(
            f"xpath=//input[@type='checkbox' and @title='{name}']/following-sibling::div[contains(@class,'layui-form-checkbox')]"
        )
        if box.count() == 0:
            box = add_ctx.locator(f"div.layui-form-checkbox:has-text('{name}')")
        box.first.click(force=True)
        time.sleep(0.05)


# --------------- Socket.IO event handlers ---------------

def emit_log(sid, msg):
    socketio.emit("log", {"msg": msg}, to=sid)


@socketio.on("disconnect")
def handle_disconnect():
    sid = request.sid
    sessions.pop(sid, None)
    cancel_flags.pop(sid, None)
    pending_data.pop(sid, None)


@socketio.on("cancel")
def handle_cancel():
    sid = request.sid
    cancel_flags[sid] = True
    emit_log(sid, "[System] Cancel requested.")


@socketio.on("fetch_clubs")
def handle_fetch_clubs(data):
    sid = request.sid
    user = data.get("username", "").strip()
    pw = data.get("password", "").strip()
    if not user or not pw:
        emit("error", {"msg": "Username/Password cannot be empty."})
        return

    def task():
        try:
            from playwright.sync_api import sync_playwright
            emit_log(sid, "[Clubs] Logging in and fetching clubs...")
            with sync_playwright() as p:
                browser = p.chromium.launch(headless=True, slow_mo=60)
                page = browser.new_page()
                page.set_default_timeout(0)
                page.set_default_navigation_timeout(0)
                login_and_wait_home(page, user, pw)
                cookies = page.context.cookies()
                sessions[sid] = {"cookies": cookies, "username": user, "password": pw}
                record_list_ctx = open_records_list_ctx(page)
                add_ctx = open_add_record_ctx(record_list_ctx, page)
                clubs = list_clubs_in_add_dialog(add_ctx)
                if not clubs:
                    raise RuntimeError("No clubs found.")
                clubs_reflection = list(clubs)
                if CONVERSATION_CLUB not in clubs_reflection:
                    clubs_reflection.append(CONVERSATION_CLUB)
                browser.close()
            emit_log(sid, f"[Clubs] Fetched {len(clubs)} clubs.")
            socketio.emit("clubs_fetched", {
                "clubs_records": clubs,
                "clubs_reflection": clubs_reflection,
            }, to=sid)
        except Exception as e:
            emit_log(sid, f"[Clubs] Error: {e}")
            socketio.emit("error", {"msg": str(e)}, to=sid)

    threading.Thread(target=task, daemon=True).start()


# ---- Single Record (two-phase) ----

@socketio.on("run_record")
def handle_run_record(data):
    """Phase 1: Generate record text via AI."""
    sid = request.sid
    user = data.get("username", "").strip()
    pw = data.get("password", "").strip()
    club = data.get("club", "").strip()
    date_str = data.get("date", "").strip()
    theme = data.get("theme", "").strip()
    c = data.get("c_hours", "").strip()
    a = data.get("a_hours", "").strip()
    s = data.get("s_hours", "").strip()

    try:
        y, mo, d = parse_date_ymd(date_str)
        date_ymd = f"{y:04d}/{mo:02d}/{d:02d}"
        for name, val in [("C", c), ("A", a), ("S", s)]:
            if not re.match(r"^\d+(\.\d+)?$", val):
                raise ValueError(f"{name} hours must be a number.")
    except Exception as e:
        emit("error", {"msg": str(e)})
        return

    cancel_flags[sid] = False

    def task():
        try:
            emit_log(sid, "[Record] Generating description via DeepSeek...")
            desc = generate_activity_record_deepseek(
                api_key=DEEPSEEK_API_KEY, club_name=club, date_ymd=date_ymd,
                theme=theme, c_hours=c, a_hours=a, s_hours=s,
            )
            socketio.emit("preview_record", {"text": desc}, to=sid)
            pending_data[sid] = {
                "task": "record",
                "entries": [{"date_ymd": date_ymd, "year": y, "month": mo, "day": d,
                             "theme": theme, "desc": desc}],
                "params": {"club": club, "c": c, "a": a, "s": s},
            }
            emit_log(sid, "[Record] Generated. Review preview, then click 'Confirm & Submit'.")
            socketio.emit("content_ready", {"task": "record"}, to=sid)
        except Exception as e:
            emit_log(sid, f"[Record] Error: {e}")
            socketio.emit("task_done", {"task": "record"}, to=sid)

    threading.Thread(target=task, daemon=True).start()


@socketio.on("confirm_record")
def handle_confirm_record(data):
    """Phase 2: Fill the form in browser."""
    sid = request.sid
    pd = pending_data.pop(sid, None)
    if not pd or pd["task"] != "record":
        emit("error", {"msg": "No pending record to confirm."})
        return

    session = sessions.get(sid, {})
    user = data.get("username", "").strip() or session.get("username", "")
    pw = data.get("password", "").strip() or session.get("password", "")
    cancel_flags[sid] = False

    def task():
        try:
            from playwright.sync_api import sync_playwright
            entry = pd["entries"][0]
            params = pd["params"]
            cookies = session.get("cookies")

            emit_log(sid, "[Record] Submitting to WFLA...")

            with sync_playwright() as p:
                browser = p.chromium.launch(headless=True, slow_mo=60)
                context = browser.new_context()
                if cookies:
                    context.add_cookies(cookies)
                page = context.new_page()
                page.set_default_timeout(0)
                page.set_default_navigation_timeout(0)
                login_or_restore(page, user, pw)

                record_list_ctx = open_records_list_ctx(page)
                add_ctx = open_add_record_ctx(record_list_ctx, page)

                emit_log(sid, f"[Record] Selecting club: {params['club']}")
                select_club_by_text(add_ctx, params["club"])

                date_input = add_ctx.locator("div.layui-form-item:has(label:has-text('Event date')) input")
                date_input.click()
                cal_scope = add_ctx if add_ctx.locator("#layui-laydate1").count() else page
                select_date_layui(cal_scope, entry["year"], entry["month"], entry["day"])
                emit_log(sid, f"[Record] Date selected: {entry['date_ymd']}")

                add_ctx.locator("div.layui-form-item:has(label:has-text('Activity theme')) input").fill(entry["theme"])
                add_ctx.locator("input[name='CDuration']").fill(params["c"])
                add_ctx.locator("input[name='ADuration']").fill(params["a"])
                add_ctx.locator("input[name='SDuration']").fill(params["s"])
                add_ctx.locator("textarea[name='Reflection']").fill(entry["desc"])
                add_ctx.locator("button[lay-filter='add']:has-text('Save')").click()
                emit_log(sid, "[Record] Saved.")
                time.sleep(2)

                if sid in sessions:
                    sessions[sid]["cookies"] = context.cookies()
                browser.close()

            emit_log(sid, "[Record] Done.")
            socketio.emit("task_done", {"task": "record"}, to=sid)
        except Exception as e:
            emit_log(sid, f"[Record] Error: {e}")
            socketio.emit("task_done", {"task": "record"}, to=sid)

    threading.Thread(target=task, daemon=True).start()


# ---- Batch Records (two-phase) ----

@socketio.on("run_batch")
def handle_run_batch(data):
    """Phase 1: Pre-generate ALL themes + descriptions via AI."""
    sid = request.sid
    user = data.get("username", "").strip()
    pw = data.get("password", "").strip()
    club = data.get("club", "").strip()
    club_desc = data.get("club_desc", "").strip()
    weekday_label = data.get("weekday", "").strip()
    start = data.get("start_date", "").strip()
    end = data.get("end_date", "").strip()
    periodic = data.get("periodic", "").strip()
    c = data.get("c_hours", "").strip()
    a = data.get("a_hours", "").strip()
    s = data.get("s_hours", "").strip()

    WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    try:
        for name, val in [("C", c), ("A", a), ("S", s)]:
            if not re.match(r"^\d+(\.\d+)?$", val):
                raise ValueError(f"{name} hours must be a number.")
        y1, m1, d1 = parse_date_ymd(start)
        y2, m2, d2 = parse_date_ymd(end)
        start_dt = dt_date(y1, m1, d1)
        end_dt = dt_date(y2, m2, d2)
        weekday_idx = WEEKDAYS.index(weekday_label)
        if start_dt.weekday() != weekday_idx or end_dt.weekday() != weekday_idx:
            raise ValueError(f"Start and end dates must both be {weekday_label}.")
        if start_dt > end_dt:
            raise ValueError("End date must be after start date.")
        dates = list(iter_weekly_dates(start_dt, end_dt))
        if not dates:
            raise ValueError("No dates found.")
    except Exception as e:
        emit("error", {"msg": str(e)})
        return

    cancel_flags[sid] = False

    def task():
        used_themes = []
        used_descs = []
        entries = []
        try:
            total = len(dates)
            emit_log(sid, f"[Batch] Generating {total} weekly themes + descriptions...")

            for idx, dt_item in enumerate(dates, start=1):
                if cancel_flags.get(sid):
                    emit_log(sid, "[Batch] Cancelled during generation.")
                    socketio.emit("task_done", {"task": "batch"}, to=sid)
                    return

                date_ymd = f"{dt_item.year:04d}/{dt_item.month:02d}/{dt_item.day:02d}"
                emit_log(sid, f"[Batch] ({idx}/{total}) Generating for {date_ymd}...")

                theme, desc = generate_weekly_theme_desc_deepseek(
                    api_key=DEEPSEEK_API_KEY, club_name=club, date_ymd=date_ymd,
                    club_desc=club_desc, periodic_desc=periodic,
                    used_themes=used_themes, used_descs=used_descs,
                )
                if not theme or not desc:
                    raise RuntimeError(f"DeepSeek returned empty for {date_ymd}.")
                used_themes.append(theme)
                used_descs.append(desc)
                entries.append({
                    "date_ymd": date_ymd,
                    "year": dt_item.year, "month": dt_item.month, "day": dt_item.day,
                    "theme": theme, "desc": desc,
                })
                socketio.emit("preview_record", {
                    "text": f"[{idx}/{total}] {date_ymd}\n{theme}\n\n{desc}"
                }, to=sid)

            pending_data[sid] = {
                "task": "batch",
                "entries": entries,
                "params": {"club": club, "c": c, "a": a, "s": s},
            }
            emit_log(sid, f"[Batch] All {total} entries generated. Review preview, then click 'Confirm & Submit'.")
            socketio.emit("content_ready", {"task": "batch"}, to=sid)
        except Exception as e:
            emit_log(sid, f"[Batch] Error: {e}")
            socketio.emit("task_done", {"task": "batch"}, to=sid)

    threading.Thread(target=task, daemon=True).start()


@socketio.on("confirm_batch")
def handle_confirm_batch(data):
    """Phase 2: Fill all records in browser using pre-generated content."""
    sid = request.sid
    pd = pending_data.pop(sid, None)
    if not pd or pd["task"] != "batch":
        emit("error", {"msg": "No pending batch to confirm."})
        return

    session = sessions.get(sid, {})
    user = data.get("username", "").strip() or session.get("username", "")
    pw = data.get("password", "").strip() or session.get("password", "")
    cancel_flags[sid] = False

    def task():
        try:
            from playwright.sync_api import sync_playwright
            entries = pd["entries"]
            params = pd["params"]
            cookies = session.get("cookies")

            emit_log(sid, f"[Batch] Submitting {len(entries)} records to WFLA...")

            with sync_playwright() as p:
                browser = p.chromium.launch(headless=True, slow_mo=60)
                context = browser.new_context()
                if cookies:
                    context.add_cookies(cookies)
                page = context.new_page()
                page.set_default_timeout(0)
                page.set_default_navigation_timeout(0)
                login_or_restore(page, user, pw)

                record_list_ctx = open_records_list_ctx(page)

                total = len(entries)
                for idx, entry in enumerate(entries, start=1):
                    if cancel_flags.get(sid):
                        emit_log(sid, f"[Batch] Cancelled at {idx}/{total}. Previous records already saved.")
                        break

                    emit_log(sid, f"[Batch] ({idx}/{total}) Filling {entry['date_ymd']}...")
                    add_ctx = open_add_record_ctx(record_list_ctx, page)
                    select_club_by_text(add_ctx, params["club"])

                    date_input = add_ctx.locator("div.layui-form-item:has(label:has-text('Event date')) input")
                    date_input.click()
                    cal_scope = add_ctx if add_ctx.locator("#layui-laydate1").count() else page
                    select_date_layui(cal_scope, entry["year"], entry["month"], entry["day"])

                    add_ctx.locator("div.layui-form-item:has(label:has-text('Activity theme')) input").fill(entry["theme"])
                    add_ctx.locator("input[name='CDuration']").fill(params["c"])
                    add_ctx.locator("input[name='ADuration']").fill(params["a"])
                    add_ctx.locator("input[name='SDuration']").fill(params["s"])
                    add_ctx.locator("textarea[name='Reflection']").fill(entry["desc"])
                    add_ctx.locator("button[lay-filter='add']:has-text('Save')").click()
                    emit_log(sid, f"[Batch] ({idx}/{total}) Saved.")

                    try:
                        page.locator("iframe[src*='/Stu/Cas/AddRecord']").wait_for(state="detached")
                    except Exception:
                        time.sleep(1.2)

                if sid in sessions:
                    sessions[sid]["cookies"] = context.cookies()
                browser.close()

            emit_log(sid, "[Batch] Submission finished.")
            socketio.emit("task_done", {"task": "batch"}, to=sid)
        except Exception as e:
            emit_log(sid, f"[Batch] Error: {e}")
            socketio.emit("task_done", {"task": "batch"}, to=sid)

    threading.Thread(target=task, daemon=True).start()


# ---- Reflection (two-phase, parallel AI) ----

@socketio.on("run_reflection")
def handle_run_reflection(data):
    """Phase 1: Generate all summaries + contents (summary || content in parallel per entry)."""
    sid = request.sid
    user = data.get("username", "").strip()
    pw = data.get("password", "").strip()
    club = data.get("club", "").strip()
    club_desc = data.get("club_desc", "").strip()
    titles = data.get("titles", [])
    desc_lines = data.get("desc_lines", [])
    selected = data.get("outcomes", [])

    if not titles:
        emit("error", {"msg": "Please provide at least one title."})
        return
    if not selected:
        emit("error", {"msg": "Select at least one Learning Outcome."})
        return
    if not desc_lines:
        desc_lines = [""] * len(titles)

    cancel_flags[sid] = False

    def task():
        entries = []
        try:
            total = len(titles)
            emit_log(sid, f"[Reflection] Generating {total} reflections (parallel summary + content)...")

            for idx, title in enumerate(titles, start=1):
                if cancel_flags.get(sid):
                    emit_log(sid, "[Reflection] Cancelled during generation.")
                    socketio.emit("task_done", {"task": "reflection"}, to=sid)
                    return

                reflection_desc = desc_lines[idx - 1] if idx - 1 < len(desc_lines) else ""
                emit_log(sid, f"[Reflection] ({idx}/{total}) Generating for '{title}'...")

                with ThreadPoolExecutor(max_workers=2) as pool:
                    fut_summary = pool.submit(
                        generate_reflection_summary_deepseek,
                        DEEPSEEK_API_KEY, club, title, club_desc, reflection_desc,
                    )
                    fut_content = pool.submit(
                        generate_reflection_content_deepseek,
                        DEEPSEEK_API_KEY, club, title, club_desc, reflection_desc,
                    )
                    summary = fut_summary.result()
                    content = fut_content.result()

                entries.append({"title": title, "summary": summary, "content": content})
                socketio.emit("preview_reflection", {"summary": summary, "content": content}, to=sid)

            pending_data[sid] = {
                "task": "reflection",
                "entries": entries,
                "params": {"club": club, "outcomes": selected},
            }
            emit_log(sid, f"[Reflection] All {total} entries generated. Review preview, then click 'Confirm & Submit'.")
            socketio.emit("content_ready", {"task": "reflection"}, to=sid)
        except Exception as e:
            emit_log(sid, f"[Reflection] Error: {e}")
            socketio.emit("task_done", {"task": "reflection"}, to=sid)

    threading.Thread(target=task, daemon=True).start()


@socketio.on("confirm_reflection")
def handle_confirm_reflection(data):
    """Phase 2: Fill all reflections in browser."""
    sid = request.sid
    pd = pending_data.pop(sid, None)
    if not pd or pd["task"] != "reflection":
        emit("error", {"msg": "No pending reflection to confirm."})
        return

    session = sessions.get(sid, {})
    user = data.get("username", "").strip() or session.get("username", "")
    pw = data.get("password", "").strip() or session.get("password", "")
    cancel_flags[sid] = False

    def task():
        try:
            from playwright.sync_api import sync_playwright
            entries = pd["entries"]
            params = pd["params"]
            cookies = session.get("cookies")

            emit_log(sid, f"[Reflection] Submitting {len(entries)} reflections to WFLA...")

            with sync_playwright() as p:
                browser = p.chromium.launch(headless=True, slow_mo=60)
                context = browser.new_context()
                if cookies:
                    context.add_cookies(cookies)
                page = context.new_page()
                page.set_default_timeout(0)
                page.set_default_navigation_timeout(0)
                login_or_restore(page, user, pw)

                refl_list_ctx = open_reflection_list_ctx(page)

                total = len(entries)
                for idx, entry in enumerate(entries, start=1):
                    if cancel_flags.get(sid):
                        emit_log(sid, f"[Reflection] Cancelled at {idx}/{total}. Previous reflections already saved.")
                        break

                    emit_log(sid, f"[Reflection] ({idx}/{total}) Filling '{entry['title']}'...")
                    add_ctx = open_add_reflection_ctx(refl_list_ctx, page)

                    select_club_by_text(add_ctx, params["club"])
                    add_ctx.locator("input[name='Title']").fill(entry["title"])
                    add_ctx.locator("textarea[name='Summary']").fill(entry["summary"])
                    fill_kindeditor_body(add_ctx, entry["content"])

                    emit_log(sid, f"[Reflection] ({idx}/{total}) Selecting outcomes: {', '.join(params['outcomes'])}")
                    click_learning_outcomes(add_ctx, params["outcomes"])

                    add_ctx.locator("button[lay-filter='add']:has-text('Save')").click()
                    emit_log(sid, f"[Reflection] ({idx}/{total}) Saved.")

                    try:
                        page.locator("iframe[src*='/Stu/Cas/AddReflection']").wait_for(state="detached")
                    except Exception:
                        time.sleep(1.2)

                if sid in sessions:
                    sessions[sid]["cookies"] = context.cookies()
                browser.close()

            emit_log(sid, "[Reflection] Submission finished.")
            socketio.emit("task_done", {"task": "reflection"}, to=sid)
        except Exception as e:
            emit_log(sid, f"[Reflection] Error: {e}")
            socketio.emit("task_done", {"task": "reflection"}, to=sid)

    threading.Thread(target=task, daemon=True).start()


# --------------- Routes ---------------

@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    socketio.run(app, host="0.0.0.0", port=port, debug=False, allow_unsafe_werkzeug=True)
