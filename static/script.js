// CAS Autofill Web - Frontend Logic
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
    // HTML date input gives YYYY-MM-DD, backend expects YYYY/MM/DD
    return dateStr.replace(/-/g, "/");
}

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
        const c = document.getElementById("rec-c").value.trim();
        const a = document.getElementById("rec-a").value.trim();
        const s = document.getElementById("rec-s").value.trim();

        if (!club) throw new Error("Please fetch and select a club.");
        if (!date) throw new Error("Please select a date.");
        if (!theme) throw new Error("Activity theme cannot be empty.");
        if (!c || !a || !s) throw new Error("All hours fields are required.");

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
        const c = document.getElementById("batch-c").value.trim();
        const a = document.getElementById("batch-a").value.trim();
        const s = document.getElementById("batch-s").value.trim();

        if (!club) throw new Error("Please fetch and select a club.");
        if (!clubDesc) throw new Error("Club description cannot be empty.");
        if (!weekday) throw new Error("Please select a weekday.");
        if (!start || !end) throw new Error("Please select both start and end dates.");
        if (!c || !a || !s) throw new Error("All hours fields are required.");

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
