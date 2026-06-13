// CAS Autofill Web - Frontend Logic

// ---- i18n ----
const I18N = {
    en: {
        config: "Configuration",
        account: "Account",
        username: "Username",
        password: "Password",
        fetch_clubs: "Fetch clubs",
        tab_records: "Activity Records",
        tab_batch: "Weekly Batch Records",
        tab_reflection: "Activity Reflection",
        tab_tutorial: "Tutorial",
        tab_log: "Log",
        single_record: "Single Record",
        club: "Club",
        fetch_first: "Fetch clubs first",
        date: "Date",
        activity_theme: "Activity theme",
        hours_cas: "Hours (C/A/S)",
        run_single: "Run single record",
        weekly_batch: "Weekly Batch Records",
        club_desc: "Club description",
        weekday: "Weekday",
        select_weekday: "Select weekday",
        start_date: "Start date",
        end_date: "End date",
        periodic_label: "Periodic activity<br><small>(optional)</small>",
        theme_desc: "Theme/Description",
        auto_deepseek: "Generated automatically by DeepSeek",
        run_batch: "Run weekly batch",
        reflection: "Reflection",
        num_reflections: "Number of reflections",
        titles_label: "Titles<br><small>(one per line)</small>",
        descs_label: "Reflection descriptions<br><small>(optional, one per line)</small>",
        learning_outcomes: "Learning Outcomes",
        lo_awareness: "Awareness",
        lo_challenge: "Challenge",
        lo_initiative: "Initiative",
        lo_collaboration: "Collaboration",
        lo_commitment: "Commitment",
        lo_global: "Global Value",
        lo_ethics: "Ethics",
        lo_newskills: "New Skills",
        run_reflection: "Run reflection autofill",
        runtime_log: "Runtime Log",
        preview: "Preview",
        preview_record: "Record",
        preview_reflection: "Reflection",
        content_summary: "Content Summary (20 words)",
        reflection_content: "Reflection content (\u2265 550 words)",
        disclaimer_bold: "Disclaimer:",
        disclaimer_text: "This tool is intended solely for generating IB CAS activity records and reflections. Users must not generate any content that violates the laws of the People's Republic of China, including but not limited to politically sensitive material, pornography, violence, terrorism, discrimination, or any other illegal content. By using this service, you agree to comply with all applicable laws and regulations. The operator reserves the right to suspend access for any misuse.",
        // Placeholders
        ph_username: "Login account",
        ph_password: "Password",
        ph_theme: "e.g. Cold War Origins Discussion",
        ph_club_desc: "Brief club description",
        ph_start_date: "Select start date",
        ph_end_date: "Select end date",
        ph_periodic: "Optional recurring activity",
        ph_titles: "One title per line",
        ph_descs: "Optional: one description per line",
        // Tutorial
        tutorial_title: "How to Use CAS Autofill",
        tut_step1_title: "Step 1: Login",
        tut_step1: 'Enter your WFLA school system username and password in the Account section, then click "Fetch clubs" to load your available clubs.',
        tut_step2_title: "Step 2: Choose a Mode",
        tut_step2: "Select one of the three modes:",
        tut_mode1: "<strong>Activity Records</strong> \u2014 Fill a single activity record for one date. You provide the club, date, activity theme, and CAS hours.",
        tut_mode2: "<strong>Weekly Batch Records</strong> \u2014 Automatically generate and fill multiple weekly records within a date range. The AI generates unique themes and descriptions for each week.",
        tut_mode3: "<strong>Activity Reflection</strong> \u2014 Generate and submit CAS reflections. Provide titles, optional descriptions, and select learning outcomes.",
        tut_step3_title: "Step 3: Fill in the Form",
        tut_step3: 'Complete all required fields. For Weekly Batch, select a weekday first, then use the calendar to pick start/end dates (only the matching weekday is selectable). The "Periodic activity" field is optional \u2014 if provided, all generated records will share the same overarching theme.',
        tut_step4_title: "Step 4: Run",
        tut_step4: "Click the Run button. The system will log in to the school system, generate content via DeepSeek AI, and fill in the forms automatically. Check the Log tab and Preview panel for progress and results.",
        tut_hours_title: "CAS Hours",
        tut_hours: "C = Creativity, A = Activity, S = Service. Enter the number of hours for each category. Leave empty or enter 0 for categories that don't apply.",
        tut_tips_title: "Tips",
        tut_tip1: "The school system can be slow. Please be patient while the automation runs.",
        tut_tip2: "Check the Preview panel on the right to see generated content before it is submitted.",
        tut_tip3: "Use dark mode (toggle in top-right) for comfortable viewing at night.",
        tut_tip4: "For batch records, a more specific club description helps the AI generate better content.",
        tab_chat: "CAS AI Chat",
        chat_welcome: "Hello! I'm your IB CAS AI advisor. I've studied all the CAS documents. Ask me anything about CAS requirements, activities, or reflections!",
        chat_placeholder: "Ask about IB CAS...",
        chat_send: "Send",
        chat_thinking: "Thinking...",
    },
    zh: {
        config: "\u914D\u7F6E",
        account: "\u8D26\u6237",
        username: "\u7528\u6237\u540D",
        password: "\u5BC6\u7801",
        fetch_clubs: "\u83B7\u53D6\u793E\u56E2",
        tab_records: "\u6D3B\u52A8\u8BB0\u5F55",
        tab_batch: "\u6BCF\u5468\u6279\u91CF\u8BB0\u5F55",
        tab_reflection: "\u6D3B\u52A8\u53CD\u601D",
        tab_tutorial: "\u4F7F\u7528\u6559\u7A0B",
        tab_log: "\u65E5\u5FD7",
        single_record: "\u5355\u6761\u8BB0\u5F55",
        club: "\u793E\u56E2",
        fetch_first: "\u8BF7\u5148\u83B7\u53D6\u793E\u56E2",
        date: "\u65E5\u671F",
        activity_theme: "\u6D3B\u52A8\u4E3B\u9898",
        hours_cas: "\u5C0F\u65F6 (C/A/S)",
        run_single: "\u8FD0\u884C\u5355\u6761\u8BB0\u5F55",
        weekly_batch: "\u6BCF\u5468\u6279\u91CF\u8BB0\u5F55",
        club_desc: "\u793E\u56E2\u63CF\u8FF0",
        weekday: "\u661F\u671F",
        select_weekday: "\u9009\u62E9\u661F\u671F",
        start_date: "\u5F00\u59CB\u65E5\u671F",
        end_date: "\u7ED3\u675F\u65E5\u671F",
        periodic_label: "\u5468\u671F\u6027\u6D3B\u52A8<br><small>(\u53EF\u9009)</small>",
        theme_desc: "\u4E3B\u9898/\u63CF\u8FF0",
        auto_deepseek: "\u7531 DeepSeek \u81EA\u52A8\u751F\u6210",
        run_batch: "\u8FD0\u884C\u6BCF\u5468\u6279\u91CF",
        reflection: "\u53CD\u601D",
        num_reflections: "\u53CD\u601D\u6570\u91CF",
        titles_label: "\u6807\u9898<br><small>(\u6BCF\u884C\u4E00\u4E2A)</small>",
        descs_label: "\u53CD\u601D\u63CF\u8FF0<br><small>(\u53EF\u9009\uFF0C\u6BCF\u884C\u4E00\u4E2A)</small>",
        learning_outcomes: "\u5B66\u4E60\u6210\u679C",
        lo_awareness: "\u8BA4\u77E5",
        lo_challenge: "\u6311\u6218",
        lo_initiative: "\u4E3B\u52A8\u6027",
        lo_collaboration: "\u5408\u4F5C",
        lo_commitment: "\u627F\u8BFA",
        lo_global: "\u5168\u7403\u4EF7\u503C",
        lo_ethics: "\u4F26\u7406",
        lo_newskills: "\u65B0\u6280\u80FD",
        run_reflection: "\u8FD0\u884C\u53CD\u601D\u81EA\u52A8\u586B\u5199",
        runtime_log: "\u8FD0\u884C\u65E5\u5FD7",
        preview: "\u9884\u89C8",
        preview_record: "\u8BB0\u5F55",
        preview_reflection: "\u53CD\u601D",
        content_summary: "\u5185\u5BB9\u6458\u8981\uFF0820\u8BCD\uFF09",
        reflection_content: "\u53CD\u601D\u5185\u5BB9\uFF08\u2265 550\u8BCD\uFF09",
        disclaimer_bold: "\u514D\u8D23\u58F0\u660E\uFF1A",
        disclaimer_text: "\u672C\u5DE5\u5177\u4EC5\u7528\u4E8E\u751F\u6210 IB CAS \u6D3B\u52A8\u8BB0\u5F55\u548C\u53CD\u601D\u3002\u7528\u6237\u4E0D\u5F97\u751F\u6210\u4EFB\u4F55\u8FDD\u53CD\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD\u6CD5\u5F8B\u7684\u5185\u5BB9\uFF0C\u5305\u62EC\u4F46\u4E0D\u9650\u4E8E\u653F\u6CBB\u654F\u611F\u5185\u5BB9\u3001\u8272\u60C5\u3001\u66B4\u529B\u3001\u6050\u6016\u4E3B\u4E49\u3001\u6B67\u89C6\u6216\u5176\u4ED6\u4EFB\u4F55\u8FDD\u6CD5\u5185\u5BB9\u3002\u4F7F\u7528\u672C\u670D\u52A1\u5373\u8868\u793A\u60A8\u540C\u610F\u9075\u5B88\u6240\u6709\u9002\u7528\u6CD5\u5F8B\u6CD5\u89C4\u3002\u8FD0\u8425\u65B9\u4FDD\u7559\u56E0\u6EE5\u7528\u800C\u6682\u505C\u8BBF\u95EE\u7684\u6743\u5229\u3002",
        // Placeholders
        ph_username: "\u767B\u5F55\u8D26\u53F7",
        ph_password: "\u5BC6\u7801",
        ph_theme: "\u4F8B\u5982\uFF1A\u51B7\u6218\u8D77\u6E90\u8BA8\u8BBA",
        ph_club_desc: "\u7B80\u8981\u793E\u56E2\u63CF\u8FF0",
        ph_start_date: "\u9009\u62E9\u5F00\u59CB\u65E5\u671F",
        ph_end_date: "\u9009\u62E9\u7ED3\u675F\u65E5\u671F",
        ph_periodic: "\u53EF\u9009\u7684\u5468\u671F\u6027\u6D3B\u52A8",
        ph_titles: "\u6BCF\u884C\u4E00\u4E2A\u6807\u9898",
        ph_descs: "\u53EF\u9009\uFF1A\u6BCF\u884C\u4E00\u4E2A\u63CF\u8FF0",
        // Tutorial
        tutorial_title: "CAS Autofill \u4F7F\u7528\u6559\u7A0B",
        tut_step1_title: "\u7B2C\u4E00\u6B65\uFF1A\u767B\u5F55",
        tut_step1: "\u5728\u8D26\u6237\u533A\u57DF\u8F93\u5165\u60A8\u7684 WFLA \u6821\u56ED\u7CFB\u7EDF\u7528\u6237\u540D\u548C\u5BC6\u7801\uFF0C\u7136\u540E\u70B9\u51FB\u201C\u83B7\u53D6\u793E\u56E2\u201D\u52A0\u8F7D\u60A8\u7684\u53EF\u7528\u793E\u56E2\u3002",
        tut_step2_title: "\u7B2C\u4E8C\u6B65\uFF1A\u9009\u62E9\u6A21\u5F0F",
        tut_step2: "\u9009\u62E9\u4E09\u79CD\u6A21\u5F0F\u4E4B\u4E00\uFF1A",
        tut_mode1: "<strong>\u6D3B\u52A8\u8BB0\u5F55</strong> \u2014 \u4E3A\u67D0\u4E00\u5929\u586B\u5199\u5355\u6761\u6D3B\u52A8\u8BB0\u5F55\u3002\u60A8\u9700\u63D0\u4F9B\u793E\u56E2\u3001\u65E5\u671F\u3001\u6D3B\u52A8\u4E3B\u9898\u548C CAS \u5C0F\u65F6\u6570\u3002",
        tut_mode2: "<strong>\u6BCF\u5468\u6279\u91CF\u8BB0\u5F55</strong> \u2014 \u5728\u65E5\u671F\u8303\u56F4\u5185\u81EA\u52A8\u751F\u6210\u5E76\u586B\u5199\u591A\u6761\u6BCF\u5468\u8BB0\u5F55\u3002AI \u4F1A\u4E3A\u6BCF\u5468\u751F\u6210\u72EC\u7279\u7684\u4E3B\u9898\u548C\u63CF\u8FF0\u3002",
        tut_mode3: "<strong>\u6D3B\u52A8\u53CD\u601D</strong> \u2014 \u751F\u6210\u5E76\u63D0\u4EA4 CAS \u53CD\u601D\u3002\u63D0\u4F9B\u6807\u9898\u3001\u53EF\u9009\u63CF\u8FF0\uFF0C\u5E76\u9009\u62E9\u5B66\u4E60\u6210\u679C\u3002",
        tut_step3_title: "\u7B2C\u4E09\u6B65\uFF1A\u586B\u5199\u8868\u5355",
        tut_step3: "\u5B8C\u6210\u6240\u6709\u5FC5\u586B\u5B57\u6BB5\u3002\u5BF9\u4E8E\u6BCF\u5468\u6279\u91CF\uFF0C\u5148\u9009\u62E9\u661F\u671F\uFF0C\u7136\u540E\u4F7F\u7528\u65E5\u5386\u9009\u62E9\u5F00\u59CB/\u7ED3\u675F\u65E5\u671F\uFF08\u53EA\u6709\u5339\u914D\u7684\u661F\u671F\u53EF\u9009\uFF09\u3002\u201C\u5468\u671F\u6027\u6D3B\u52A8\u201D\u5B57\u6BB5\u4E3A\u53EF\u9009 \u2014 \u5982\u679C\u586B\u5199\uFF0C\u6240\u6709\u751F\u6210\u7684\u8BB0\u5F55\u5C06\u5171\u4EAB\u76F8\u540C\u7684\u603B\u4E3B\u9898\u3002",
        tut_step4_title: "\u7B2C\u56DB\u6B65\uFF1A\u8FD0\u884C",
        tut_step4: "\u70B9\u51FB\u8FD0\u884C\u6309\u94AE\u3002\u7CFB\u7EDF\u5C06\u767B\u5F55\u6821\u56ED\u7CFB\u7EDF\uFF0C\u901A\u8FC7 DeepSeek AI \u751F\u6210\u5185\u5BB9\uFF0C\u5E76\u81EA\u52A8\u586B\u5199\u8868\u5355\u3002\u67E5\u770B\u65E5\u5FD7\u9009\u9879\u5361\u548C\u9884\u89C8\u9762\u677F\u4EE5\u4E86\u89E3\u8FDB\u5EA6\u548C\u7ED3\u679C\u3002",
        tut_hours_title: "CAS \u5C0F\u65F6\u6570",
        tut_hours: "C = \u521B\u9020\u529B\uFF0CA = \u6D3B\u52A8\uFF0CS = \u670D\u52A1\u3002\u8F93\u5165\u6BCF\u4E2A\u7C7B\u522B\u7684\u5C0F\u65F6\u6570\u3002\u4E0D\u9002\u7528\u7684\u7C7B\u522B\u7559\u7A7A\u6216\u8F93\u5165 0\u3002",
        tut_tips_title: "\u63D0\u793A",
        tut_tip1: "\u6821\u56ED\u7CFB\u7EDF\u53EF\u80FD\u8F83\u6162\uFF0C\u8BF7\u5728\u81EA\u52A8\u5316\u8FD0\u884C\u65F6\u8010\u5FC3\u7B49\u5F85\u3002",
        tut_tip2: "\u67E5\u770B\u53F3\u4FA7\u9884\u89C8\u9762\u677F\u4EE5\u5728\u63D0\u4EA4\u524D\u67E5\u770B\u751F\u6210\u7684\u5185\u5BB9\u3002",
        tut_tip3: "\u4F7F\u7528\u6DF1\u8272\u6A21\u5F0F\uFF08\u53F3\u4E0A\u89D2\u5207\u6362\uFF09\u4EE5\u83B7\u5F97\u66F4\u8212\u9002\u7684\u591C\u95F4\u89C2\u770B\u4F53\u9A8C\u3002",
        tut_tip4: "\u5BF9\u4E8E\u6279\u91CF\u8BB0\u5F55\uFF0C\u66F4\u5177\u4F53\u7684\u793E\u56E2\u63CF\u8FF0\u6709\u52A9\u4E8E AI \u751F\u6210\u66F4\u597D\u7684\u5185\u5BB9\u3002",
        tab_chat: "AI\u52A9\u624B",
        chat_welcome: "\u4F60\u597D\uFF01\u6211\u662F\u4F60\u7684 IB CAS AI \u987E\u95EE\uFF0C\u5DF2\u5B66\u4E60\u4E86\u6240\u6709CAS\u6587\u6863\u3002\u6709\u4EFB\u4F55\u5173\u4E8E CAS \u8981\u6C42\u3001\u6D3B\u52A8\u6216\u53CD\u601D\u7684\u95EE\u9898\u90FD\u53EF\u4EE5\u95EE\u6211\uFF01",
        chat_placeholder: "\u8BE2\u95EE\u6709\u5173 IB CAS \u7684\u95EE\u9898\u2026",
        chat_send: "\u53D1\u9001",
        chat_thinking: "\u601D\u8003\u4E2D\u2026",
    },
};

let currentLang = localStorage.getItem("cas-lang") || "en";

function applyLang(lang) {
    currentLang = lang;
    const t = I18N[lang];
    document.getElementById("lang-toggle").textContent = lang === "en" ? "\u4E2D\u6587" : "EN";
    // Text content
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (t[key] !== undefined) el.textContent = t[key];
    });
    // HTML content (for labels with <br><small>)
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
        const key = el.getAttribute("data-i18n-html");
        if (t[key] !== undefined) el.innerHTML = t[key];
    });
    // Placeholders
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
        const key = el.getAttribute("data-i18n-ph");
        if (t[key] !== undefined) el.placeholder = t[key];
    });
    // Tutorial list items use innerHTML
    document.querySelectorAll(".tutorial-list [data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (t[key] !== undefined) el.innerHTML = t[key];
    });
}

function toggleLang() {
    const next = currentLang === "en" ? "zh" : "en";
    localStorage.setItem("cas-lang", next);
    applyLang(next);
}

// ---- Dark mode ----
function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.innerHTML = theme === "dark" ? "&#9788;" : "&#9790;";
}

function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("cas-theme", next);
    applyTheme(next);
}

// Apply saved theme and language immediately
applyTheme(localStorage.getItem("cas-theme") || "light");
applyLang(currentLang);

const socket = io();

// ---- State ----
let isRunning = false;

// ---- Socket events ----
socket.on("connect", () => {
    appendLog("[System] Connected to server.");
});

socket.on("disconnect", () => {
    appendLog("[System] Disconnected from server.");
});

socket.on("log", (data) => {
    appendLog(data.msg);
});

socket.on("error", (data) => {
    appendLog("[Error] " + data.msg);
    alert(data.msg);
});

socket.on("clubs_fetched", (data) => {
    populateSelect("rec-club", data.clubs_records);
    populateSelect("batch-club", data.clubs_records);
    populateSelect("ref-club", data.clubs_reflection);
    setButtonsRunning(false);
    appendLog("[Clubs] Dropdowns updated.");
});

socket.on("preview_record", (data) => {
    document.getElementById("preview-record").textContent = data.text;
});

socket.on("preview_reflection", (data) => {
    document.getElementById("preview-summary").textContent = data.summary;
    document.getElementById("preview-reflection").textContent = data.content;
});

socket.on("task_done", () => {
    setButtonsRunning(false);
});

// ---- Tab switching ----
document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});

document.querySelectorAll(".preview-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".preview-tab-btn").forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".preview-tab-content").forEach((c) => c.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.ptab).classList.add("active");
    });
});

// ---- Helpers ----
function appendLog(msg) {
    const logBox = document.getElementById("log-output");
    logBox.textContent += msg + "\n";
    logBox.scrollTop = logBox.scrollHeight;
}

function populateSelect(id, options) {
    const sel = document.getElementById(id);
    sel.innerHTML = "";
    options.forEach((opt) => {
        const o = document.createElement("option");
        o.value = opt;
        o.textContent = opt;
        sel.appendChild(o);
    });
    sel.disabled = false;
}

function getAccount() {
    const user = document.getElementById("username").value.trim();
    const pw = document.getElementById("password").value.trim();
    if (!user || !pw) {
        throw new Error("Username/Password cannot be empty.");
    }
    return { username: user, password: pw };
}

function setButtonsRunning(running) {
    isRunning = running;
    const btns = [
        "btn-fetch-clubs",
        "btn-run-record",
        "btn-run-batch",
        "btn-run-reflection",
    ];
    btns.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.disabled = running;
    });
}

function formatDateForBackend(dateStr) {
    return dateStr.replace(/-/g, "/");
}

// ---- Custom Calendar Date Picker (weekday filtering) ----
const WEEKDAY_MAP = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6, Sunday: 0 };
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function createCalendar(calId, inputId) {
    const cal = document.getElementById(calId);
    const input = document.getElementById(inputId);
    let viewYear, viewMonth;

    const today = new Date();
    viewYear = today.getFullYear();
    viewMonth = today.getMonth();

    input.addEventListener("click", (e) => {
        e.stopPropagation();
        const weekday = document.getElementById("batch-weekday").value;
        if (!weekday) { alert("Please select a weekday first."); return; }
        // Close other calendar
        document.querySelectorAll(".cal-dropdown").forEach((c) => { if (c.id !== calId) c.classList.remove("open"); });
        cal.classList.toggle("open");
        if (cal.classList.contains("open")) render();
    });

    document.addEventListener("click", (e) => {
        if (!cal.contains(e.target) && e.target !== input) cal.classList.remove("open");
    });

    function getWeekdayIndex() {
        const w = document.getElementById("batch-weekday").value;
        return w ? WEEKDAY_MAP[w] : -1;
    }

    function render() {
        const allowedDay = getWeekdayIndex();
        const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
        const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
        const daysInPrev = new Date(viewYear, viewMonth, 0).getDate();

        let html = `<div class="cal-nav">
            <button class="cal-nav-btn" data-action="prev-year">&laquo;</button>
            <button class="cal-nav-btn" data-action="prev-month">&lsaquo;</button>
            <span class="cal-title">${MONTH_NAMES[viewMonth]} ${viewYear}</span>
            <button class="cal-nav-btn" data-action="next-month">&rsaquo;</button>
            <button class="cal-nav-btn" data-action="next-year">&raquo;</button>
        </div>`;
        html += `<div class="cal-grid">`;
        ["Mo","Tu","We","Th","Fr","Sa","Su"].forEach((d) => { html += `<div class="cal-header">${d}</div>`; });

        // Adjust firstDay to Monday-based (0=Mon)
        const startOffset = (firstDay + 6) % 7;

        for (let i = 0; i < 42; i++) {
            let dayNum = i - startOffset + 1;
            let inMonth = true;
            let dispYear = viewYear, dispMonth = viewMonth, dispDay;

            if (dayNum < 1) {
                // Previous month
                inMonth = false;
                const pm = viewMonth === 0 ? 11 : viewMonth - 1;
                const py = viewMonth === 0 ? viewYear - 1 : viewYear;
                dispDay = daysInPrev + dayNum;
                dispYear = py; dispMonth = pm;
            } else if (dayNum > daysInMonth) {
                inMonth = false;
                const nm = viewMonth === 11 ? 0 : viewMonth + 1;
                const ny = viewMonth === 11 ? viewYear + 1 : viewYear;
                dispDay = dayNum - daysInMonth;
                dispYear = ny; dispMonth = nm;
            } else {
                dispDay = dayNum;
            }

            const dateObj = new Date(dispYear, dispMonth, dispDay);
            const isAllowed = dateObj.getDay() === allowedDay;
            const dateStr = `${dispYear}/${String(dispMonth + 1).padStart(2, "0")}/${String(dispDay).padStart(2, "0")}`;

            let cls = "cal-day";
            if (!inMonth) cls += " cal-dim";
            if (isAllowed) cls += " cal-allowed";
            else cls += " cal-disabled";

            if (isAllowed) {
                html += `<div class="${cls}" data-date="${dateStr}">${dispDay}</div>`;
            } else {
                html += `<div class="${cls}">${dispDay}</div>`;
            }
        }
        html += `</div>`;
        cal.innerHTML = html;

        // Bind nav buttons
        cal.querySelectorAll(".cal-nav-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                if (action === "prev-year") viewYear--;
                else if (action === "next-year") viewYear++;
                else if (action === "prev-month") { viewMonth--; if (viewMonth < 0) { viewMonth = 11; viewYear--; } }
                else if (action === "next-month") { viewMonth++; if (viewMonth > 11) { viewMonth = 0; viewYear++; } }
                render();
            });
        });

        // Bind day clicks
        cal.querySelectorAll(".cal-day.cal-allowed").forEach((el) => {
            el.addEventListener("click", (e) => {
                e.stopPropagation();
                input.value = el.dataset.date;
                cal.classList.remove("open");
            });
        });
    }
}

// Initialize calendars for batch start/end
createCalendar("cal-batch-start", "batch-start");
createCalendar("cal-batch-end", "batch-end");

// Reset dates when weekday changes
document.getElementById("batch-weekday").addEventListener("change", () => {
    document.getElementById("batch-start").value = "";
    document.getElementById("batch-end").value = "";
});

// ---- Actions ----
function fetchClubs() {
    if (isRunning) return;
    try {
        const acc = getAccount();
        setButtonsRunning(true);
        appendLog("[Clubs] Fetching clubs...");
        socket.emit("fetch_clubs", acc);
    } catch (e) {
        alert(e.message);
    }
}

function runRecord() {
    if (isRunning) return;
    try {
        const acc = getAccount();
        const club = document.getElementById("rec-club").value;
        const date = document.getElementById("rec-date").value;
        const theme = document.getElementById("rec-theme").value.trim();
        const c = document.getElementById("rec-c").value.trim() || "0";
        const a = document.getElementById("rec-a").value.trim() || "0";
        const s = document.getElementById("rec-s").value.trim() || "0";

        if (!club) throw new Error("Please fetch and select a club.");
        if (!date) throw new Error("Please select a date.");
        if (!theme) throw new Error("Activity theme cannot be empty.");

        setButtonsRunning(true);
        appendLog("[Records] Starting single record...");
        socket.emit("run_record", {
            ...acc,
            club,
            date: formatDateForBackend(date),
            theme,
            c_hours: c,
            a_hours: a,
            s_hours: s,
        });
    } catch (e) {
        alert(e.message);
    }
}

function runBatch() {
    if (isRunning) return;
    try {
        const acc = getAccount();
        const club = document.getElementById("batch-club").value;
        const clubDesc = document.getElementById("batch-club-desc").value.trim();
        const weekday = document.getElementById("batch-weekday").value;
        const start = document.getElementById("batch-start").value;
        const end = document.getElementById("batch-end").value;
        const periodic = document.getElementById("batch-periodic").value.trim();
        const c = document.getElementById("batch-c").value.trim() || "0";
        const a = document.getElementById("batch-a").value.trim() || "0";
        const s = document.getElementById("batch-s").value.trim() || "0";

        if (!club) throw new Error("Please fetch and select a club.");
        if (!clubDesc) throw new Error("Club description cannot be empty.");
        if (!weekday) throw new Error("Please select a weekday.");
        if (!start || !end) throw new Error("Please select both start and end dates.");

        setButtonsRunning(true);
        appendLog("[Batch] Starting weekly batch...");
        socket.emit("run_batch", {
            ...acc,
            club,
            club_desc: clubDesc,
            weekday,
            start_date: formatDateForBackend(start),
            end_date: formatDateForBackend(end),
            periodic,
            c_hours: c,
            a_hours: a,
            s_hours: s,
        });
    } catch (e) {
        alert(e.message);
    }
}

function runReflection() {
    if (isRunning) return;
    try {
        const acc = getAccount();
        const club = document.getElementById("ref-club").value;
        const count = parseInt(document.getElementById("ref-count").value);
        const clubDesc = document.getElementById("ref-club-desc").value.trim();
        const titlesRaw = document.getElementById("ref-titles").value.trim();
        const descsRaw = document.getElementById("ref-descs").value.trim();

        if (!club) throw new Error("Please fetch and select a club.");
        if (!clubDesc) throw new Error("Club description cannot be empty.");
        if (!titlesRaw) throw new Error("Please input at least one title.");

        const titles = titlesRaw.split("\n").map((t) => t.trim()).filter(Boolean);
        if (titles.length !== count) {
            throw new Error(`Number of titles (${titles.length}) must match count (${count}).`);
        }

        let descLines = [];
        if (descsRaw) {
            descLines = descsRaw.split("\n").map((d) => d.trim()).filter(Boolean);
            if (descLines.length !== count) {
                throw new Error(`Descriptions (${descLines.length}) must match count (${count}).`);
            }
        }

        const outcomes = [];
        document.querySelectorAll(".outcome-check input:checked").forEach((cb) => {
            outcomes.push(cb.value);
        });
        if (outcomes.length === 0) {
            throw new Error("Select at least one Learning Outcome.");
        }

        setButtonsRunning(true);
        appendLog("[Reflection] Starting reflection autofill...");
        socket.emit("run_reflection", {
            ...acc,
            club,
            club_desc: clubDesc,
            titles,
            desc_lines: descLines,
            outcomes,
        });
    } catch (e) {
        alert(e.message);
    }
}

// ---- CAS AI Chat ----
let chatHistory = [];

function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Minimal, self-contained Markdown renderer. Escapes HTML first to prevent XSS,
// then applies a safe subset of Markdown (headings, bold/italic, code, lists, links).
function renderMarkdown(src) {
    // Extract fenced code blocks first so their contents aren't processed.
    const codeBlocks = [];
    src = src.replace(/```[\w]*\n?([\s\S]*?)```/g, (m, code) => {
        codeBlocks.push(code.replace(/\n$/, ""));
        return "CB" + (codeBlocks.length - 1) + "";
    });

    const lines = src.split("\n");
    let html = "";
    let listType = null; // "ul" | "ol"
    const closeList = () => { if (listType) { html += `</${listType}>`; listType = null; } };

    const inline = (text) => {
        text = escapeHtml(text);
        text = text.replace(/`([^`]+)`/g, (m, c) => `<code>${c}</code>`);
        text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
        text = text.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
        text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
        return text;
    };

    for (const raw of lines) {
        const line = raw.replace(/\s+$/, "");
        const cb = line.match(/^CB(\d+)$/);
        if (cb) { closeList(); html += `<pre><code>${escapeHtml(codeBlocks[+cb[1]])}</code></pre>`; continue; }
        if (line.trim() === "") { closeList(); continue; }

        const h = line.match(/^(#{1,4})\s+(.*)$/);
        if (h) { closeList(); const lv = h[1].length; html += `<h${lv}>${inline(h[2])}</h${lv}>`; continue; }

        const ol = line.match(/^\s*\d+\.\s+(.*)$/);
        const ul = line.match(/^\s*[-*]\s+(.*)$/);
        if (ol) {
            if (listType !== "ol") { closeList(); html += "<ol>"; listType = "ol"; }
            html += `<li>${inline(ol[1])}</li>`; continue;
        }
        if (ul) {
            if (listType !== "ul") { closeList(); html += "<ul>"; listType = "ul"; }
            html += `<li>${inline(ul[1])}</li>`; continue;
        }
        closeList();
        html += `<p>${inline(line)}</p>`;
    }
    closeList();
    return html;
}

function appendChatBubble(role, text, isThinking) {
    const container = document.getElementById("chat-messages");
    const div = document.createElement("div");
    div.className = "chat-bubble " + role;
    if (isThinking) div.id = "chat-thinking-bubble";
    const inner = document.createElement("div");
    inner.className = "chat-bubble-inner";
    // Render assistant replies as Markdown; keep user input / status as plain text.
    if (role.indexOf("assistant") === 0 && !isThinking) {
        inner.classList.add("markdown");
        inner.innerHTML = renderMarkdown(text);
    } else {
        inner.style.whiteSpace = "pre-wrap";
        inner.textContent = text;
    }
    div.appendChild(inner);
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
}

async function sendChat() {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();
    if (!message) return;

    input.value = "";
    appendChatBubble("user", message);

    const btn = document.getElementById("btn-send-chat");
    btn.disabled = true;
    input.disabled = true;

    const t = I18N[currentLang];
    const thinkingBubble = appendChatBubble("assistant thinking", t.chat_thinking || "Thinking...", true);

    try {
        const resp = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, history: chatHistory }),
        });
        const data = await resp.json();
        thinkingBubble.remove();
        if (data.error) {
            appendChatBubble("assistant", "Error: " + data.error);
        } else {
            appendChatBubble("assistant", data.reply);
            chatHistory.push({ role: "user", content: message });
            chatHistory.push({ role: "assistant", content: data.reply });
            // Keep history manageable
            if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);
        }
    } catch (e) {
        thinkingBubble.remove();
        appendChatBubble("assistant", "Network error: " + e.message);
    } finally {
        btn.disabled = false;
        input.disabled = false;
        input.focus();
    }
}
