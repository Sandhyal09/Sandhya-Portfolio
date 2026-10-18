/* app.js — waves, theme toggle, content, timeline, case studies, voice intro, contact form, cursor */
(function () {
  document.documentElement.classList.add("js");
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const EMAIL = (CONTACT.find(c => c.label === "Email") || {}).value || "";

  /* ================= THEME ================= */
  const root = document.documentElement, themeBtn = $("#themeBtn");
  try { const t = localStorage.getItem("sl-theme"); if (t) root.dataset.theme = t; } catch (e) {}
  const syncThemeLabel = () => themeBtn.setAttribute("aria-label", root.dataset.theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  syncThemeLabel();
  themeBtn.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark"; syncThemeLabel();
    try { localStorage.setItem("sl-theme", root.dataset.theme); } catch (e) {}
  });
  addEventListener("scroll", () => $("#nav").classList.toggle("scrolled", scrollY > 20), { passive: true });

  /* ================= FLOWING WAVES ================= */
  (function () {
    const cv = $("#waves"), cx = cv.getContext("2d");
    let W, H, d, mx = .5, my = .5, tmx = .5, tmy = .5;
    function size() { d = Math.min(devicePixelRatio || 1, 2); W = cv.width = cv.offsetWidth * d; H = cv.height = cv.offsetHeight * d; }
    size(); addEventListener("resize", size);
    addEventListener("mousemove", e => { tmx = e.clientX / innerWidth; tmy = e.clientY / innerHeight; });
    const LINES = 46;
    function draw(t) {
      mx += (tmx - mx) * .04; my += (tmy - my) * .04;
      cx.clearRect(0, 0, W, H);
      const light = root.dataset.theme === "light";
      const g = cx.createLinearGradient(0, H, W, 0);
      g.addColorStop(0, light ? "rgba(225,0,255,.55)" : "rgba(225,0,255,.95)");
      g.addColorStop(.55, light ? "rgba(140,30,220,.5)" : "rgba(150,40,230,.9)");
      g.addColorStop(1, light ? "rgba(80,0,202,.45)" : "rgba(80,40,210,.85)");
      cx.strokeStyle = g; cx.lineWidth = 1.1 * d;
      const s = t / 1000 * (REDUCED ? 0 : 1);
      for (let i = 0; i < LINES; i++) {
        const k = i / (LINES - 1), spread = (k - .5);
        const y0 = H * (.86 + spread * .06), y3 = H * (.22 + spread * .1);
        const c1x = W * (.28 + Math.sin(s * .35 + k * 1.6) * .05 + (mx - .5) * .08);
        const c1y = H * (.36 + spread * .55 + Math.sin(s * .5 + k * 2.2) * .07 + (my - .5) * .12);
        const c2x = W * (.62 + Math.cos(s * .3 + k * 1.3) * .06 - (mx - .5) * .08);
        const c2y = H * (1.05 - spread * .5 + Math.cos(s * .45 + k * 1.9) * .08 - (my - .5) * .12);
        cx.globalAlpha = .35 + .65 * (1 - Math.abs(spread) * 1.4);
        cx.beginPath(); cx.moveTo(-W * .05, y0); cx.bezierCurveTo(c1x, c1y, c2x, c2y, W * 1.05, y3); cx.stroke();
      }
      cx.globalAlpha = 1;
      if (!REDUCED) requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  })();

  /* ================= CALENDAR ================= */
  if (CALENDLY_URL) $$(".cal-link").forEach(a => { a.href = CALENDLY_URL; a.hidden = false; });

  /* ================= EXPERTISE ================= */
  const ICONS = {
    ba: '<svg viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M8.5 10h7M8.5 13.5h7M8.5 17h4"/></svg>',
    data: '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5.5" rx="7" ry="2.5"/><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/></svg>',
    bi: '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/></svg>'
  };
  const EXPERTISE = [
    { icon: "ba", title: "Business Analysis", text: "I lead requirements from the first workshop to sign-off, turning what Finance, Risk, clinical and operations teams need into specs developers can build.",
      chips: ["BRD / FRD", "User stories", "Acceptance criteria", "JAD sessions", "AS-IS / TO-BE", "Visio", "UAT", "Agile / Scrum"] },
    { icon: "data", title: "Data Analysis & Quality", text: "I profile, validate and reconcile data with SQL, so reports match their sources before anyone makes a decision on them.",
      chips: ["SQL", "PostgreSQL", "MySQL", "Redshift", "BigQuery", "Profiling", "Reconciliation", "Data modeling", "ETL"] },
    { icon: "bi", title: "Reporting & Dashboards", text: "I design what leaders see: KPIs, filters, drill-downs and secure access, in dashboards people actually use.",
      chips: ["Power BI", "Tableau", "KPI design", "Row-Level Security", "Advanced Excel", "Power Query", "Regulatory reporting"] }
  ];
  $("#skillsGrid").innerHTML = EXPERTISE.map(x =>
    '<div class="skill reveal"><span class="ic">' + ICONS[x.icon] + "</span><h3>" + esc(x.title) + "</h3><p>" + esc(x.text) +
    '</p><div class="chips"><span class="t">Tools:</span>' + x.chips.map(c => '<span class="chip">' + esc(c) + "</span>").join("") + "</div></div>").join("");

  /* ================= SKILLS BAND ================= */
  const half = Math.ceil(SKILL_PILLS.length / 2);
  const pillHTML = list => { const one = list.map(([n, s]) => '<div class="pill"><span class="dot"></span><span><b>' + esc(n) + "</b><small>" + esc(s) + "</small></span></div>").join(""); return one + one; };
  $("#bandA").innerHTML = pillHTML(SKILL_PILLS.slice(0, half)); $("#bandA").style.setProperty("--dur", "55s");
  $("#bandB").innerHTML = pillHTML(SKILL_PILLS.slice(half)); $("#bandB").style.setProperty("--dur", "65s");
  $$(".band-row").forEach(r => r.setAttribute("aria-hidden", "true"));
  $("#bandList").innerHTML = SKILL_PILLS.map(([n, s]) => "<li>" + esc(n) + ": " + esc(s) + "</li>").join("");

  /* ================= TIMELINE ================= */
  const brief = '<svg viewBox="0 0 24 24"><path d="M9 4h6a2 2 0 0 1 2 2v1h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3V6a2 2 0 0 1 2-2zm0 3h6V6H9v1z"/></svg>';
  const tl = $("#timeline");
  JOBS.forEach(j => {
    const it = document.createElement("div"); it.className = "tl-item";
    it.innerHTML = '<div class="tl-card"><h3>' + esc(j.role) + "</h3><h4>" + esc(j.company) + " · " + esc(j.place) + '</h4><span class="tl-tag">' + esc(j.industry) +
      "</span><ul>" + j.points.slice(0, 3).map(p => "<li>" + esc(p) + "</li>").join("") + '</ul></div><div class="tl-date">' + esc(j.dates.replace(" — ", " – ")) + '</div><span class="tl-dot">' + brief + "</span>";
    tl.append(it);
  });

  /* ================= CASE STUDIES ================= */
  // small generated "dashboard" thumbnails, one style per case
  function thumb(i) {
    const pal = [["#5000ca", "#b012e8", "#ff6bd6"], ["#0e6efd", "#5000ca", "#4fd1ff"], ["#b012e8", "#ff7a45", "#ffc24b"]][i % 3];
    const bg = '<rect width="320" height="200" fill="#151225"/><rect x="0" y="0" width="320" height="22" fill="#1e1a33"/><circle cx="12" cy="11" r="3.5" fill="#ff5f57"/><circle cx="24" cy="11" r="3.5" fill="#febc2e"/><circle cx="36" cy="11" r="3.5" fill="#28c840"/>';
    const kpis = [0, 1, 2].map(k => '<rect x="' + (14 + k * 100) + '" y="32" width="90" height="40" rx="6" fill="#221d3d"/><rect x="' + (22 + k * 100) + '" y="40" width="40" height="5" rx="2" fill="#6f6890"/><rect x="' + (22 + k * 100) + '" y="52" width="' + (34 + k * 9) + '" height="12" rx="3" fill="' + pal[k] + '"/>').join("");
    let chart = "";
    if (i % 3 === 0) { // bars + check marks: reconciliation
      chart = [42, 70, 55, 88, 64, 76, 50, 92].map((h, k) => '<rect x="' + (22 + k * 22) + '" y="' + (186 - h) + '" width="14" height="' + h + '" rx="3" fill="' + pal[k % 2] + '"/>').join("") +
        '<rect x="214" y="82" width="92" height="104" rx="6" fill="#221d3d"/>' + [0, 1, 2, 3].map(k => '<circle cx="228" cy="' + (100 + k * 22) + '" r="6" fill="' + (k === 2 ? "#ff7a45" : "#28c840") + '"/><rect x="240" y="' + (97 + k * 22) + '" width="52" height="6" rx="3" fill="#6f6890"/>').join("");
    } else if (i % 3 === 1) { // line chart + donut: KPI definitions
      chart = '<rect x="14" y="82" width="190" height="104" rx="6" fill="#221d3d"/><polyline fill="none" stroke="' + pal[0] + '" stroke-width="3" points="24,170 50,150 76,158 102,128 128,136 154,108 180,116 196,98"/><polyline fill="none" stroke="' + pal[2] + '" stroke-width="2" stroke-dasharray="4 4" points="24,160 50,162 76,146 102,148 128,124 154,128 180,104 196,110"/>' +
        '<rect x="214" y="82" width="92" height="104" rx="6" fill="#221d3d"/><circle cx="260" cy="134" r="30" fill="none" stroke="#3a3360" stroke-width="12"/><circle cx="260" cy="134" r="30" fill="none" stroke="' + pal[1] + '" stroke-width="12" stroke-dasharray="130 200" transform="rotate(-90 260 134)"/>';
    } else { // table rows with one flagged: nightly batch
      chart = '<rect x="14" y="82" width="292" height="104" rx="6" fill="#221d3d"/>' + [0, 1, 2, 3, 4].map(k => '<rect x="24" y="' + (92 + k * 18) + '" width="272" height="12" rx="3" fill="' + (k === 3 ? "rgba(255,122,69,.35)" : "#2b2550") + '"/><rect x="30" y="' + (95 + k * 18) + '" width="60" height="6" rx="3" fill="#6f6890"/><rect x="' + (k === 3 ? 230 : 236) + '" y="' + (95 + k * 18) + '" width="' + (k === 3 ? 54 : 48) + '" height="6" rx="3" fill="' + (k === 3 ? pal[1] : pal[2]) + '"/>').join("");
    }
    return '<svg viewBox="0 0 320 200" role="img" aria-label="Illustrative dashboard">' + bg + kpis + chart + "</svg>";
  }
  $("#cases").innerHTML = CASES.map((c, i) =>
    '<button class="case reveal" type="button" data-i="' + i + '" data-cursor="Read"><div class="thumb">' + thumb(i) + '<span class="open">Read story →</span></div><span class="meta">' +
    esc(c.org) + " · " + esc(c.industry) + "</span><h3>" + esc(c.title) + "</h3><p>" + esc(c.challenge) + "</p></button>").join("");

  const modal = $("#modal");
  let lastFocus = null;
  function openCase(i) {
    const c = CASES[i]; lastFocus = document.activeElement;
    $("#mThumb").innerHTML = thumb(i); $("#mMeta").textContent = c.org + " · " + c.industry; $("#mTitle").textContent = c.title;
    $("#mDl").innerHTML = "<div><dt>The challenge</dt><dd>" + esc(c.challenge) + "</dd></div><div><dt>What I did</dt><dd>" + esc(c.did) + "</dd></div><div><dt>The outcome</dt><dd>" + esc(c.outcome) + "</dd></div>";
    modal.hidden = false; document.body.style.overflow = "hidden"; modal.querySelector(".modal-x").focus();
  }
  function closeCase() { modal.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
  $$(".case").forEach(b => b.addEventListener("click", () => openCase(+b.dataset.i)));
  modal.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeCase(); });
  addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeCase(); });

  /* ================= EDUCATION + CONTACT ================= */
  $("#edu").innerHTML = EDUCATION.map(e => '<div class="reveal"><span class="yr">' + esc(e.dates) + "</span><h3>" + esc(e.degree) + "</h3><span>" + esc(e.school) + "</span></div>").join("");
  CONTACT.concat([{ label: "Based in", value: "Connecticut · New York" }]).forEach(c => {
    const row = document.createElement("div"); row.className = "dline";
    row.innerHTML = '<span class="k">' + esc(c.label) + "</span>" + (c.href ? '<a class="v" href="' + esc(c.href) + '" target="_blank" rel="noopener">' + esc(c.value) + " ↗</a>" : '<span class="v">' + esc(c.value) + "</span>");
    if (c.copy) {
      const b = document.createElement("button"); b.type = "button"; b.textContent = "Copy"; b.dataset.cursor = "Copy";
      b.onclick = () => { const ok = () => { b.textContent = "Copied ✓"; setTimeout(() => b.textContent = "Copy", 1500); }; try { navigator.clipboard.writeText(c.value).then(ok, ok); } catch (e) { ok(); } };
      row.append(b);
    }
    $("#direct").append(row);
  });
  $("#form").addEventListener("submit", async e => {
    e.preventDefault();
    const name = $("#fName").value.trim(), from = $("#fEmail").value.trim(), msg = $("#fMsg").value.trim(), out = $("#formMsg"), btn = $("#fSend");
    out.className = "form-msg";
    if ($("#fTrap").value) return; // bot filled the hidden field
    if (!name || !from || !msg) { out.classList.add("err"); out.textContent = "Please fill in your name, email and a message."; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) { out.classList.add("err"); out.textContent = "That email address doesn't look right. Please check it."; return; }
    if (FORMSPREE_ID) {
      btn.disabled = true; out.textContent = "Sending…";
      try {
        const r = await fetch("https://formspree.io/f/" + FORMSPREE_ID, { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ name, email: from, message: msg, _subject: "Portfolio message from " + name }) });
        if (!r.ok) throw new Error("bad status");
        out.classList.add("ok"); out.textContent = "Thanks, " + name.split(" ")[0] + "! Your message is in my inbox. I'll reply soon.";
        $("#form").reset();
      } catch (err) {
        out.classList.add("err"); out.textContent = "The message couldn't be sent just now. Please email me at " + EMAIL + ".";
      }
      btn.disabled = false; return;
    }
    // no Formspree ID yet: fall back to the visitor's email app
    location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Portfolio message from " + name) + "&body=" + encodeURIComponent(msg + "\n\n— " + name + " (" + from + ")");
    out.textContent = "Your email app should open with the message ready to send. If it doesn't, write to " + EMAIL + ".";
  });

  /* ================= SCROLL REVEALS + TIMELINE LINE ================= */
  if ("IntersectionObserver" in window && !REDUCED) {
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); en.target.classList.remove("hidden"); io.unobserve(en.target); } }), { threshold: .2 });
    $$(".reveal").forEach(el => io.observe(el));
    $$(".tl-item").forEach(el => { el.classList.add("hidden"); io.observe(el); });
    const fill = $("#tlFill");
    const onScroll = () => { const r = tl.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (innerHeight * .6 - r.top) / r.height)); fill.style.height = (p * 100) + "%"; };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
  } else { $$(".reveal").forEach(el => el.classList.add("in")); $("#tlFill").style.height = "100%"; }

  /* ================= CURSOR BALL ================= */
  if (FINE && !REDUCED) {
    const cur = $("#cursor"), lab = $("#cursorLabel");
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; });
    (function loop() { cx += (x - cx) * .18; cy += (y - cy) * .18; cur.style.transform = "translate(" + cx + "px," + cy + "px)"; requestAnimationFrame(loop); })();
    document.addEventListener("mouseover", e => {
      const t = e.target.closest("a, button, .pill");
      cur.classList.toggle("big", !!t); lab.textContent = t ? (t.dataset.cursor || "") : "";
    });
  }

  /* ================= VOICE INTRO ================= */
  const synth = window.speechSynthesis || null, hero = $(".hero"), video = $("#introVideo"), vmodal = $("#vmodal");
  const capText = $("#capText"), playLabel = $("#playLabel"), RESTING = capText.textContent;
  let hasVideo = false, playing = false, cur = -1, sst = null;
  // If assets/intro.mp4 exists, the button plays that video in a large player instead of the AI voice.
  video.addEventListener("loadedmetadata", () => {
    hasVideo = true; playLabel.textContent = "Watch my intro";
    capText.textContent = "A short video intro from me.";
  }, { once: true });
  video.addEventListener("error", () => video.removeAttribute("src"), { once: true });
  video.src = "assets/intro.mp4";
  function openVideo() { vmodal.hidden = false; document.body.style.overflow = "hidden"; video.currentTime = 0; video.play().catch(() => {}); }
  function closeVideo() { video.pause(); vmodal.hidden = true; document.body.style.overflow = ""; }
  vmodal.addEventListener("click", e => { if (e.target.closest("[data-vclose]")) closeVideo(); });
  addEventListener("keydown", e => { if (e.key === "Escape" && !vmodal.hidden) closeVideo(); });
  const sentences = []; let off = 0;
  SCRIPT.split(/(?<=[.!?])\s+/).forEach(s => { const i = SCRIPT.indexOf(s, off); sentences.push({ s, start: i, end: i + s.length }); off = i + s.length; });
  function showAt(ci) {
    let idx = sentences.findIndex(x => ci < x.end + 1); if (idx === -1) idx = sentences.length - 1;
    if (idx !== cur) { cur = idx; let p = sentences[idx].start;
      capText.innerHTML = sentences[idx].s.split(" ").map(w => { const h = '<span class="w" data-s="' + p + '">' + esc(w) + "</span>"; p += w.length + 1; return h; }).join(" "); }
    capText.querySelectorAll(".w").forEach(w => w.classList.toggle("on", +w.dataset.s <= ci));
  }
  function pickVoice() {
    if (!synth) return null;
    const vs = synth.getVoices().filter(v => /^en/i.test(v.lang));
    const pref = ["Samantha", "Google US English", "Microsoft Aria", "Microsoft Jenny", "Ava", "Allison", "Zira", "Karen", "Moira", "Victoria"];
    for (const p of pref) { const v = vs.find(v => v.name.includes(p)); if (v) return v; }
    return vs.find(v => /female/i.test(v.name)) || vs[0] || null;
  }
  if (synth) { synth.getVoices(); synth.onvoiceschanged = () => {}; }
  const ico = $("#playBtn .ico-play path");
  const icon = on => ico.setAttribute("d", on ? "M3.5 3.5h9v9h-9z" : "M4 2.5v11l9-5.5z");
  function stop(finished) {
    if (sst) { sst.done = true; clearInterval(sst.timer); }
    if (synth) synth.cancel();
    playing = false; cur = -1; hero.classList.remove("speaking"); icon(false); playLabel.textContent = "Replay intro";
    capText.textContent = finished ? "Thanks for listening! Scroll down to see my work." : RESTING;
  }
  function play() {
    if (hasVideo) { openVideo(); return; }
    if (playing) { stop(false); return; }
    playing = true; hero.classList.add("speaking"); icon(true); playLabel.textContent = "Stop intro";
    const s = { t0: performance.now(), boundary: false, done: false, fallback: !synth }; sst = s;
    const est = 33000, per = est / SCRIPT.length, end = () => { if (!s.done) stop(true); };
    s.timer = setInterval(() => { const el = performance.now() - s.t0; if (!s.boundary) showAt(Math.floor(el / per)); if (s.fallback && el > est) end(); }, 110);
    showAt(0);
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(SCRIPT); const v = pickVoice(); if (v) u.voice = v;
    u.rate = .98; u.pitch = 1.08;
    u.onboundary = e => { if (e.name === "word" || e.name === undefined) { s.boundary = true; showAt(e.charIndex); } };
    const engineDone = () => { if (!s.boundary && performance.now() - s.t0 < 4000) s.fallback = true; else end(); };
    u.onend = engineDone; u.onerror = engineDone; synth.speak(u);
  }
  $("#playBtn").addEventListener("click", play);
})();
