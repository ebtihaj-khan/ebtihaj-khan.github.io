// Story graphics: skill evidence, unit chart, quiz, breaks flow, rewind, clocks, timeline.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const onSeen = (el, fn, threshold = 0.35) => {
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); fn(); } }, { threshold });
    io.observe(el);
  };
  const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* Skill evidence */
  const projects = {
    ehr: { name: 'Epic and Cerner integrations', when: '2025 to now', proof: 'Delivered SMART on FHIR and HL7 integrations, including consent patterns and cutover criteria.', href: '#ch-switch' },
    fpdak: { name: 'Family planning DAK integration', when: '2025 to now', proof: 'Defined the FHIR exchange between the WHO kit and Sindh’s record systems.', href: '#record' },
    idims: { name: 'WHO IDIMS audit', when: 'Rayn Group', proof: 'Audited data flows and specified interoperability fixes with partner systems.', href: '#record' },
    epa: { name: 'Pharmacy prior authorization', when: '2026 to now', proof: 'Two-vendor routing on NCPDP SCRIPT 2023 that reaches 85%+ of pharmacy-benefit payers.', href: '#ch-calls' },
    ncpdp: { name: 'NCPDP messaging layer', when: '2026 to now', proof: 'One library for prior authorization, RTPB, and formulary ahead of CMS-0057-F.', href: '#ch-calls' },
    medpa: { name: 'Medical prior authorization', when: '2026 to now', proof: 'X12 278 through a clearinghouse, with real-time and batch paths.', href: '#ch-switch' },
    rx: { name: 'Surescripts and Amazon Pharmacy', when: '2025 to now', proof: 'Owned RxTransfer scoping and Amazon Pharmacy routing rules.', href: '#ch-switch' },
    mailorder: { name: 'Mail-order pharmacy partner', when: '2025 to now', proof: 'Found three breaks in our partner pattern. Shipped across about 24 PRs.', href: '#ch-breaks' },
    compendia: { name: 'Drug compendia service', when: '2025 to now', proof: 'RxCUI as the key. Five medication lookups move onto one service.', href: '#ch-calls' },
    zoho: { name: 'Zoho Desk exit', when: '2025 to now', proof: 'Dual writes, about 1M migrated events, daily reconciliation.', href: '#ch-calls' },
    forms: { name: 'Feathery forms exit', when: '2025 to now', proof: 'In-house forms service on GCP with SMS flows and jittered retries.', href: '#ch-switch' },
    gcss: { name: 'GCSS', when: '2022 to 2024', proof: '69,000+ vaccinators tracked. 15,800+ missed settlements flagged.', href: '#ch-gcss' },
    tsc: { name: 'Team support centre ML', when: '2022 to 2024', proof: 'Found 95%+ of centres automatically from GPS traces.', href: '#ch-gps' },
    vaxisure: { name: 'VaxiSure cold chain', when: '2024 to 2025', proof: 'IoT carriers. Up to 25% less potential wastage in pilots.', href: '#ch-cold' },
    disp: { name: 'DISP', when: '2024 to 2025', proof: 'Offline-first apps. 40%+ better data timeliness and accuracy.', href: '#ch-paper' },
    bluelines: { name: 'BlueLines', when: 'Rayn Group', proof: 'Traced poliovirus catchments upstream of positive samples.', href: '#record' },
    editor: { name: 'Boundary editor prototype', when: '2026', proof: 'Drag-to-fix union council boundaries with an audit log.', href: '#ch-demo' },
    onehealth: { name: 'One Health dashboard prototype', when: '2026', proof: 'Cross-sector alerts for CCHF, brucellosis, and rabies.', href: '#ch-demo' },
    xlats: { name: 'xLATS', when: 'Rayn Group', proof: 'Field operations and farm mapping for AgriTech startups.', href: '#record' },
    portal: { name: 'KP open data portal', when: '2018 to 2019', proof: 'Pakistan’s first provincial portal, with 6,000+ datasets.', href: '#ch-rewind' },
    services: { name: 'Government services at Code for Pakistan', when: '2016 to 2022', proof: '60 engineers, 30+ services, 900,000+ citizens.', href: '#ch-rewind' },
    pdma: { name: 'PDMA disaster relief', when: '2016 to 2022', proof: 'Mobile data collection and a live dashboard after disasters.', href: '#record' },
    trees: { name: 'Billion Tree Tsunami mapping', when: '2018 to 2019', proof: 'Plantation sites mapped with open GIS tools.', href: '#record' },
    rayn: { name: 'Rayn Group portfolio', when: '2022 to now', proof: '8+ concurrent initiatives on one platform.', href: '#ch-switch' }
  };
  const skills = [
    ['FHIR and HL7', ['ehr', 'fpdak', 'idims']],
    ['NCPDP and pharmacy', ['epa', 'ncpdp', 'rx', 'mailorder', 'compendia']],
    ['Prior authorization', ['epa', 'medpa', 'ncpdp']],
    ['Vendor migration', ['zoho', 'forms']],
    ['GIS', ['gcss', 'bluelines', 'editor', 'xlats', 'trees']],
    ['ML and analytics', ['tsc', 'gcss', 'onehealth']],
    ['IoT', ['vaxisure']],
    ['Offline mobile', ['disp', 'pdma']],
    ['Open data', ['portal', 'trees']],
    ['Team leadership', ['services', 'rayn']],
    ['Field research and pilots', ['disp', 'vaxisure', 'fpdak']],
    ['HIPAA and compliance', ['ehr', 'ncpdp']]
  ];
  const skillWrap = $('#evidence-skills'), out = $('#evidence-out');
  if (skillWrap) {
    const show = (i) => {
      $$('button', skillWrap).forEach((b, j) => b.setAttribute('aria-pressed', String(i === j)));
      const [label, ids] = skills[i];
      out.innerHTML = `<p class="evidence__count"><strong>${ids.length}</strong> ${ids.length === 1 ? 'project proves' : 'projects prove'} ${esc(label)}</p>
        <ul class="evidence__list">${ids.map((id) => {
          const p = projects[id];
          return `<li><a href="${p.href}"><span class="ev-name">${esc(p.name)}</span><span class="ev-when">${esc(p.when)}</span><span class="ev-proof">${esc(p.proof)}</span></a></li>`;
        }).join('')}</ul>`;
      if (!reduce) out.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' });
    };
    skills.forEach(([label, ids], i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.innerHTML = `${esc(label)} <span class="n">${ids.length}</span>`;
      b.addEventListener('click', () => show(i));
      skillWrap.appendChild(b);
    });
    show(0);
  }

  /* Unit chart: 15,800 dots, one per flagged settlement */
  const units = $('#units');
  if (units) {
    const N = 15800, BLOCK = 1000, BC = 50, BR = 20, PER_ROW = 4;
    const ctx = units.getContext('2d');
    const countEl = $('#units-count');
    const fmt = new Intl.NumberFormat('en-US');
    // Seeded shuffle so dots light in a scattered order
    const order = Array.from({ length: N }, (_, i) => i);
    let seed = 11;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    for (let i = N - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    let shown = reduce ? N : 0, pitch = 0, gap = 10, blockW = 0, blockH = 0, dpr = 1;
    const pos = (i) => {
      const b = Math.floor(i / BLOCK), k = i % BLOCK;
      return [(b % PER_ROW) * (blockW + gap) + (k % BC) * pitch, Math.floor(b / PER_ROW) * (blockH + gap) + Math.floor(k / BC) * pitch];
    };
    const size = () => {
      const r = units.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 2);
      gap = r.width < 420 ? 6 : 10;
      blockW = (r.width - gap * (PER_ROW - 1)) / PER_ROW;
      pitch = blockW / BC; blockH = pitch * BR;
      const rows = Math.ceil(N / BLOCK / PER_ROW);
      const H = rows * blockH + (rows - 1) * gap;
      units.style.height = H + 'px';
      units.width = r.width * dpr; units.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const draw = () => {
      const base = css('--line'), hit = css('--amber');
      const d = Math.max(1, pitch * 0.7);
      ctx.clearRect(0, 0, units.width, units.height);
      ctx.fillStyle = base;
      for (let i = 0; i < N; i++) { const [x, y] = pos(i); ctx.fillRect(x, y, d, d); }
      ctx.fillStyle = hit;
      for (let k = 0; k < shown; k++) { const [x, y] = pos(order[k]); ctx.fillRect(x, y, d, d); }
      countEl.textContent = fmt.format(shown) + (shown === N ? '+' : '');
    };
    new ResizeObserver(size).observe(units);
    new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    onSeen(units, () => {
      if (reduce) return draw();
      const t0 = performance.now(), dur = 2600;
      const tick = (now) => {
        const k = Math.min(1, (now - t0) / dur);
        shown = Math.round(N * (1 - Math.pow(1 - k, 3)));
        draw();
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  /* Clocks */
  const clocks = $$('.clocks__time');
  const tickClocks = () => clocks.forEach((c) => {
    c.textContent = new Intl.DateTimeFormat('en-GB', { timeZone: c.dataset.tz, hour: '2-digit', minute: '2-digit' }).format(new Date());
  });
  if (clocks.length) { tickClocks(); setInterval(tickClocks, 20000); }

  /* Quiz */
  const quiz = [
    { q: 'How should the platform identify a drug?', a: ['RxCUI', 'NDC'], mine: 0,
      why: 'One drug has many NDCs, and formats differ by source. RxCUI gives each drug one stable ID. Five medication lookups are moving onto it.' },
    { q: 'Drug lookups at pharmacy volume. Call the free RxNav API, or host RxNorm?', a: ['Call the API', 'Host it'], mine: 1,
      why: 'RxNav caps at 20 requests a second. That is too slow for a pharmacy. We host RxNorm as flat files and keep Medi-Span for two fields: therapeutic class and DEA schedule.' },
    { q: 'Prior authorization. One vendor or two?', a: ['One vendor', 'Two vendors'], mine: 1,
      why: 'The new vendor goes first. On no coverage, CoverMyMeds takes over. Fax handles the rest after a set window. Together they reach 85%+ of pharmacy-benefit payers.' },
    { q: 'Leaving a vendor with a million task events. Big-bang cutover, or run both?', a: ['Run both', 'Big-bang cutover'], mine: 0,
      why: 'Both systems take every write. Daily reconciliation proves parity. The switch-off comes after the numbers match.' },
    { q: 'Three payer workflows. Build per vendor, or one shared library?', a: ['Per vendor', 'One library'], mine: 1,
      why: 'One NCPDP library covers prior authorization, real-time benefit checks, and formulary. Only the transport layer knows the vendor. CMS-0057-F sets a January 2027 deadline.' }
  ];
  const quizEl = $('#quiz'), scoreEl = $('#quiz-score');
  if (quizEl) {
    let answered = 0, matched = 0;
    quiz.forEach((item, i) => {
      const card = document.createElement('article');
      card.className = 'qcard';
      card.innerHTML = `<p class="qcard__n">${i + 1} of ${quiz.length}</p><h3 class="qcard__q">${esc(item.q)}</h3>
        <div class="qcard__opts">${item.a.map((t, j) => `<button type="button" data-j="${j}">${esc(t)}</button>`).join('')}</div>
        <div class="qcard__why" hidden><p class="qcard__mine">My call: <strong>${esc(item.a[item.mine])}</strong></p><p>${esc(item.why)}</p></div>`;
      $$('button', card).forEach((b) => b.addEventListener('click', () => {
        if (card.classList.contains('is-done')) return;
        const j = +b.dataset.j;
        card.classList.add('is-done');
        $$('button', card).forEach((x) => {
          x.disabled = true;
          if (+x.dataset.j === item.mine) x.classList.add('is-mine');
          if (x === b) x.classList.add('is-picked');
        });
        const why = $('.qcard__why', card);
        why.hidden = false;
        if (!reduce) why.animate([{ opacity: 0, transform: 'translateY(-4px)' }, { opacity: 1, transform: 'none' }], { duration: 360, easing: 'cubic-bezier(.22,1,.36,1)' });
        answered++; if (j === item.mine) matched++;
        if (answered === quiz.length) scoreEl.textContent = `You matched me on ${matched} of ${quiz.length}. ${matched >= 4 ? 'We would get along.' : 'Let’s argue about it over a call.'}`;
      }));
      quizEl.appendChild(card);
    });
  }

  /* Spot the breaks */
  const steps = [
    { t: 'Prescriber approves', fit: 'Approval flows the same way as with other partners.' },
    { t: 'Partner receives the Rx', brk: 'The partner starts the flow. Every other partner waits for our order first. So we ingest their webhook before any order exists.' },
    { t: 'Match patient', fit: 'Two matching strategies, with an ops alert when both fail.' },
    { t: 'Check the NDC', brk: 'Orders need a valid NDC. We added NDC-to-product mapping to the medication catalog.' },
    { t: 'Create order', fit: 'Standard order creation once the NDC checks out.' },
    { t: 'Partner flags an exception', brk: 'Some orders go on hold until someone acts. We built that state from scratch.' },
    { t: 'Ship and update', fit: 'Shipment events map to our existing statuses.' }
  ];
  const flow = $('#flow');
  if (flow) {
    let found = 0;
    const foundEl = $('#flow-found'), ship = $('#flow-ship');
    const list = document.createElement('ol');
    list.className = 'flow__list';
    steps.forEach((s, i) => {
      const li = document.createElement('li');
      li.className = 'fstep';
      li.innerHTML = `<button type="button" class="fstep__btn" aria-expanded="false"><span class="fstep__dot" aria-hidden="true">?</span><span class="fstep__t">${esc(s.t)}</span></button><p class="fstep__note" hidden></p>`;
      const btn = $('button', li), noteEl = $('.fstep__note', li);
      btn.addEventListener('click', () => {
        if (li.classList.contains('is-open')) return;
        li.classList.add('is-open', s.brk ? 'is-break' : 'is-fit');
        btn.setAttribute('aria-expanded', 'true');
        $('.fstep__dot', li).textContent = s.brk ? '!' : '✓';
        noteEl.textContent = (s.brk ? 'Break. ' : 'Fits. ') + (s.brk || s.fit);
        noteEl.hidden = false;
        if (s.brk) {
          found++;
          foundEl.textContent = `${found} of 3 found`;
          if (found === 3) { foundEl.textContent = 'All 3 found.'; ship.hidden = false; }
        }
      });
      list.appendChild(li);
    });
    flow.appendChild(list);
  }

  /* Rewind year and people */
  const yearEl = $('#rewind-year');
  if (yearEl) onSeen($('#ch-rewind'), () => {
    if (reduce) { yearEl.textContent = '2016'; return; }
    let y = 2026;
    const iv = setInterval(() => { y--; yearEl.textContent = y; if (y <= 2016) clearInterval(iv); }, 90);
  }, 0.2);
  const people = $('#people');
  if (people) {
    const icon = '<svg viewBox="0 0 24 40" aria-hidden="true"><circle cx="12" cy="7" r="6"/><path d="M2 40V22a10 10 0 0 1 20 0v18Z"/></svg>';
    for (let i = 0; i < 28; i++) {
      const s = document.createElement('span');
      s.className = 'person' + (i === 27 ? ' person--part' : '');
      s.style.setProperty('--i', i);
      s.innerHTML = icon;
      people.appendChild(s);
    }
  }

  /* Career timeline */
  const gantt = $('#gantt');
  if (gantt) {
    const START = 2014, END = 2027;
    const rows = [
      { g: 'Roles' },
      { t: 'Sweet Pixel Studios', s: 2014.25, e: 2015.8, k: 'core', d: 'Software engineer. Unity mobile games, 4.5+ rating.' },
      { t: 'The Nerd Camp', s: 2015.8, e: 2016.7, k: 'payer', d: 'Business innovation officer. Three launches, about 20% revenue growth.' },
      { t: 'Code for Pakistan', s: 2016.8, e: 2022.05, k: 'rx', d: 'Government innovation lead. 60 engineers, 30+ services.' },
      { t: 'Rayn Group', s: 2022.1, e: 2026.8, k: 'ehr', d: 'Senior product manager. Public health and US interoperability.' },
      { g: 'Projects' },
      { t: 'KP open data portal', s: 2018, e: 2020, k: 'rx', d: '6,000+ datasets. Pakistan’s first provincial portal.' },
      { t: 'Billion Tree mapping', s: 2018, e: 2020, k: 'rx', d: 'Plantation sites mapped with open GIS tools.' },
      { t: 'GCSS', s: 2022.1, e: 2024.7, k: 'ehr', d: '69,000+ vaccinators. 15,800+ missed settlements flagged.' },
      { t: 'Team support centre ML', s: 2022.1, e: 2024.7, k: 'ehr', d: '95%+ of centres found from GPS traces.' },
      { t: 'VaxiSure', s: 2024, e: 2026, k: 'ehr', d: 'IoT cold chain. Up to 25% less potential wastage.' },
      { t: 'DISP', s: 2024, e: 2026, k: 'ehr', d: 'Offline-first polio data. 40%+ better timeliness.' },
      { t: 'Family planning DAK', s: 2025, e: 2026.8, k: 'ehr', d: 'FHIR exchange design with Pathfinder.' },
      { t: 'Foundation Health integrations', s: 2025, e: 2026.8, k: 'ehr', d: '10 partner systems on a US virtual pharmacy.' }
    ];
    const pct = (y) => ((y - START) / (END - START)) * 100;
    const ticks = [];
    for (let y = START; y <= END; y += 2) ticks.push(`<span style="left:${pct(y)}%">${y}</span>`);
    gantt.innerHTML = `<div class="g-axis"><span class="g-label"></span><div class="g-track">${ticks.join('')}</div></div><i class="g-now" style="--p:${pct(2026.8) / 100}" aria-hidden="true"></i>` +
      rows.map((r) => r.g
        ? `<div class="g-group">${r.g}</div>`
        : `<div class="g-row"><span class="g-label">${esc(r.t)}</span><div class="g-track"><button type="button" class="g-bar g-bar--${r.k}" style="left:${pct(r.s)}%;width:${pct(r.e) - pct(r.s)}%" aria-label="${esc(r.t)}, ${Math.floor(r.s)} to ${r.e >= 2026.8 ? 'now' : Math.floor(r.e - 0.01)}. ${esc(r.d)}" data-tip="${esc(r.d)}" data-when="${Math.floor(r.s)} to ${r.e >= 2026.8 ? 'now' : Math.floor(r.e - 0.01)}"></button></div></div>`
      ).join('') + '<div class="g-tip" id="g-tip" role="tooltip" hidden></div>';
    const tip = $('#g-tip', gantt);
    const showTip = (b) => {
      tip.innerHTML = `<strong>${esc(b.closest('.g-row').querySelector('.g-label').textContent)}</strong><span>${esc(b.dataset.when)}</span><span>${esc(b.dataset.tip)}</span>`;
      tip.hidden = false;
      const gr = gantt.getBoundingClientRect(), br = b.getBoundingClientRect();
      const x = Math.min(Math.max(br.left - gr.left + br.width / 2, 120), gr.width - 120);
      tip.style.left = x + 'px';
      tip.style.top = (br.top - gr.top - 8) + 'px';
    };
    $$('.g-bar', gantt).forEach((b) => {
      b.addEventListener('mouseenter', () => showTip(b));
      b.addEventListener('focus', () => showTip(b));
      b.addEventListener('mouseleave', () => { tip.hidden = true; });
      b.addEventListener('blur', () => { tip.hidden = true; });
    });
  }
})();
