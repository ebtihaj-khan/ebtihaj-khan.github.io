(() => {
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const withTransition = (fn) => {
    if (document.startViewTransition && !reduce && !document.hidden) document.startViewTransition(fn).ready.catch(() => {});
    else fn();
  };

  // Load sequence
  root.classList.add('js');
  requestAnimationFrame(() => requestAnimationFrame(() => $('.hero').classList.add('is-loaded')));

  // Sticky bar border and active section
  const bar = $('.bar');
  addEventListener('scroll', () => bar.classList.toggle('is-scrolled', scrollY > 8), { passive: true });
  const navLinks = $$('.bar__nav a');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = navFor[e.target.id] ?? e.target.id;
      navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main > section[id]').forEach((el) => spy.observe(el));
  const navFor = { top: '', now: 'now', playbook: 'now', calls: 'now', case: 'field', field: 'field', builds: 'field', career: 'career', toolkit: 'career', talks: 'career', education: 'career', contact: 'contact' };

  // Theme
  const themeBtn = $('#theme');
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const toggleTheme = () => withTransition(() => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    store.set('theme', next);
    window.Orb && window.Orb.redraw();
  });
  themeBtn.addEventListener('click', toggleTheme);

  // Reading length
  const viewBtns = $$('.view-switch button');
  const setView = (v) => withTransition(() => {
    if (v === 'short') root.dataset.view = 'short'; else delete root.dataset.view;
    viewBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === v)));
    store.set('view', v);
  });
  viewBtns.forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
  if (root.dataset.view === 'short') viewBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === 'short')));

  // Orb lens
  const notes = {
    idle: 'The orb is idle. It holds 1,725 points, one for every 40 vaccinators GCSS tracks in a campaign.',
    field: 'Each point is a settlement on a campaign map. Amber points are settlements the system marks as missed. Teams go back to those first.',
    interop: 'The hub is the pharmacy platform. Each cluster is a partner system. Teal points on the spokes are messages: prescriptions, prior authorizations, and benefit checks.',
    civic: 'Thirty clusters, one for each government service my teams digitized at Code for Pakistan. The teal one is the open data portal.'
  };
  const lensBtns = $$('.lens__options button');
  const note = $('#lens-note');
  lensBtns.forEach((b) => b.addEventListener('click', () => {
    const on = b.getAttribute('aria-pressed') !== 'true';
    lensBtns.forEach((x) => x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', String(on));
    const shape = on ? b.dataset.shape : 'idle';
    window.Orb && window.Orb.setShape(shape);
    note.textContent = notes[shape];
  }));

  // Count up the proof numbers once
  const fmt = new Intl.NumberFormat('en-US');
  const counters = $$('[data-count]');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      countObs.unobserve(e.target);
      if (reduce) return;
      const el = e.target, end = +el.dataset.count, suffix = el.textContent.includes('+') ? '+' : '';
      const t0 = performance.now(), dur = 1400;
      const tick = (now) => {
        const k = Math.min(1, (now - t0) / dur);
        const v = Math.round(end * (1 - Math.pow(1 - k, 4)));
        el.textContent = fmt.format(v) + (k === 1 ? suffix : '');
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => countObs.observe(c));

  // Integration map
  const systems = [
    { id: 'ehr', name: 'Epic and Cerner', kind: 'ehr', std: 'SMART on FHIR, HL7', status: 'Live',
      points: ['Delivered EHR integrations with both vendors.', 'Scoped FHIR resources, consent and access patterns, and production cutover criteria across care settings.'] },
    { id: 'surescripts', name: 'Surescripts', kind: 'rx', std: 'RxTransfer', status: 'Live',
      points: ['Owned scoping end to end: pharmacy search, transfer messaging, and confirmation.', 'Expanded in-network reach for prescription transfers.'] },
    { id: 'amazon', name: 'Amazon Pharmacy', kind: 'rx', std: 'Fulfillment routing', status: 'Live',
      points: ['Defined routing rules, edge cases, and release checklists.', 'Shortened the fulfillment path for eligible e-prescriptions.'] },
    { id: 'mailorder', name: 'Mail-order pharmacy partner', kind: 'rx', std: 'Webhooks, NDC validation', status: 'Live',
      points: ['Wrote the PRD around three breaks from our partner pattern: an inbound-first flow, hard NDC validation, and a new on-hold exception state.', 'Mapped the event lifecycle from prescription approval to shipment, with idempotent webhooks and match-failure alerts.', 'Delivered across about 24 merged PRs and ran go-live readiness with the customer.'] },
    { id: 'epa', name: 'Second ePA vendor', kind: 'payer', std: 'NCPDP SCRIPT 2023', status: 'In build',
      points: ['Added a second electronic prior authorization vendor next to CoverMyMeds.', 'Specified the four-message PA exchange and the appeal pair for denials.', 'Set routing: the new vendor first, CoverMyMeds on no coverage, fax after a configurable window.'] },
    { id: 'ncpdp', name: 'NCPDP messaging layer', kind: 'payer', std: 'RTPB v13, Formulary and Benefit', status: 'Planned',
      points: ['Planned one vendor-agnostic library for prior authorization, real-time benefit checks, and formulary.', 'Routed batch formulary files through the compendia flat-file pipeline.', 'Driven by the CMS-0057-F deadline in January 2027.'] },
    { id: 'clearinghouse', name: 'Medical PA clearinghouse', kind: 'payer', std: 'X12 278', status: 'In build',
      points: ['Wrote the PRD for medical-benefit prior authorization on infusion and specialty drugs.', 'Specified real-time and batch paths, a response state machine, and config-driven payer rule packs.', 'Built the MVP payer scope from the clearinghouse’s own payer export.'] },
    { id: 'compendia', name: 'Drug compendia', kind: 'core', std: 'RxNorm, Medi-Span', status: 'In build',
      points: ['One translation service replaces five separate medication lookups.', 'RxCUI is the key. RxNorm runs in-house as flat files.', 'Medi-Span covers only therapeutic class and DEA schedule.'] },
    { id: 'tasks', name: 'Task platform', kind: 'core', std: 'Zoho Desk exit', status: 'Migrating',
      points: ['Moved tasks into native Task, TaskEvent, and Agent tables.', 'Dual writes, about 1M migrated events, and daily reconciliation before cutover.', 'Added per-client data isolation and encrypted case notes.'] },
    { id: 'forms', name: 'Forms service', kind: 'core', std: 'Feathery exit, GCP', status: 'Rolling out',
      points: ['Replaced a vendor form tool that threw 502 and 504 errors.', 'Shipped pharmacist forms first, then a patient forms service with SMS flows.', 'Added jittered retries so failed submissions stop failing silently.'] }
  ];
  const kindName = { ehr: 'Clinical records', rx: 'Pharmacy and fulfillment', payer: 'Payer and benefits', core: 'Internal platform' };

  const map = $('#imap'), nodesEl = $('#imap-nodes'), linesEl = $('#imap-lines'), panel = $('#imap-panel'), hub = $('#imap-hub');
  const NS = 'http://www.w3.org/2000/svg';
  let active = null;

  systems.forEach((s, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'node node--' + s.kind;
    b.textContent = s.name;
    b.setAttribute('role', 'listitem');
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => select(s.id));
    b.addEventListener('mouseenter', () => highlight(s.id));
    b.addEventListener('mouseleave', () => highlight(active));
    s.btn = b;
    nodesEl.appendChild(b);
  });

  function layout() {
    const r = nodesEl.getBoundingClientRect();
    linesEl.innerHTML = '';
    if (getComputedStyle(linesEl).display === 'none') { systems.forEach((s) => { s.btn.style.left = s.btn.style.top = ''; }); return; }
    linesEl.setAttribute('viewBox', `0 0 ${r.width} ${r.height}`);
    const cx = r.width / 2, cy = r.height / 2;
    const rx = r.width / 2 - 90, ry = r.height / 2 - 30;
    systems.forEach((s, i) => {
      const a = (i / systems.length) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry;
      s.btn.style.left = x + 'px'; s.btn.style.top = y + 'px';
      const ln = document.createElementNS(NS, 'line');
      ln.setAttribute('x1', cx); ln.setAttribute('y1', cy); ln.setAttribute('x2', x); ln.setAttribute('y2', y);
      ln.setAttribute('class', s.kind);
      s.line = ln;
      linesEl.appendChild(ln);
      if (!reduce) {
        const dot = document.createElementNS(NS, 'circle');
        dot.setAttribute('r', '2.5');
        dot.setAttribute('class', 'packet ' + s.kind);
        const dur = 2.4 + (i % 4) * 0.6;
        const back = i % 2 === 0;
        dot.innerHTML = `<animateMotion dur="${dur}s" repeatCount="indefinite" path="M${back ? x : cx},${back ? y : cy} L${back ? cx : x},${back ? cy : y}"/>`;
        linesEl.appendChild(dot);
      }
    });
    highlight(active);
  }

  function highlight(id) {
    systems.forEach((s) => s.line && s.line.classList.toggle('is-on', s.id === id));
  }

  function render(s) {
    panel.style.setProperty('--c', `var(--${s.kind})`);
    panel.innerHTML = `
      <p class="p-kind">${kindName[s.kind]}</p>
      <h3>${s.name}</h3>
      <p class="p-std">${s.std}</p>
      <span class="p-status">${s.status}</span>
      <ul>${s.points.map((p) => `<li>${p}</li>`).join('')}</ul>
      <p class="p-hint">Use the arrow keys to move between systems.</p>`;
  }

  function select(id, focus) {
    const s = systems.find((x) => x.id === id);
    active = id;
    systems.forEach((x) => x.btn.setAttribute('aria-pressed', String(x.id === id)));
    highlight(id);
    withTransitionPanel(() => render(s));
    if (focus) s.btn.focus();
  }
  function withTransitionPanel(fn) {
    if (reduce || !panel.animate) return fn();
    panel.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(6px)' }], { duration: 140, easing: 'ease-in' })
      .finished.then(() => {
        fn();
        panel.animate([{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' });
      });
  }
  nodesEl.addEventListener('keydown', (e) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) return;
    e.preventDefault();
    const i = systems.findIndex((s) => s.id === active);
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
    select(systems[(i + d + systems.length) % systems.length].id, true);
  });
  active = 'epa';
  systems.forEach((x) => x.btn.setAttribute('aria-pressed', String(x.id === active)));
  render(systems.find((s) => s.id === active));
  new ResizeObserver(layout).observe(map);

  // Project accordions and filters
  $$('.proj__head').forEach((h) => h.addEventListener('click', () => {
    h.setAttribute('aria-expanded', String(h.getAttribute('aria-expanded') !== 'true'));
  }));
  const filterBtns = $$('.filters button');
  filterBtns.forEach((b) => b.addEventListener('click', () => withTransition(() => {
    filterBtns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    const f = b.dataset.filter;
    $$('.proj').forEach((p) => { p.hidden = f !== 'all' && !p.dataset.tags.split(' ').includes(f); });
  })));

  // Timeline: dots fill as each role scrolls into view
  const roleObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-seen'); });
  }, { rootMargin: '0px 0px -35% 0px' });
  $$('.role, .case__chart').forEach((r) => roleObs.observe(r));

  // Copy email
  const copyBtn = $('#copy-email');
  const copyEmail = async () => {
    const hint = $('.copy__hint', copyBtn);
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.email);
      hint.textContent = 'Copied';
    } catch (e) {
      location.href = 'mailto:' + copyBtn.dataset.email;
    }
    setTimeout(() => { hint.textContent = 'Copy'; }, 1800);
  };
  copyBtn.addEventListener('click', copyEmail);

  // Print: open every collapsed item first, then restore
  let closed = [];
  addEventListener('beforeprint', () => {
    closed = $$('details:not([open])');
    closed.forEach((d) => (d.open = true));
  });
  addEventListener('afterprint', () => closed.forEach((d) => (d.open = false)));
  $('#print').addEventListener('click', () => print());

  // Command menu
  const palette = $('#palette'), input = $('#palette-input'), list = $('#palette-list');
  const go = (id) => () => document.getElementById(id).scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  const commands = [
    { label: 'What I work on now', hint: 'Section', run: go('now') },
    { label: 'How I run an integration', hint: 'Section', run: go('playbook') },
    { label: 'Calls I made', hint: 'Section', run: go('calls') },
    { label: 'Case study: GCSS', hint: 'Section', run: go('case') },
    { label: 'Field work', hint: 'Section', run: go('field') },
    { label: 'Prototypes', hint: 'Section', run: go('builds') },
    { label: 'Career', hint: 'Section', run: go('career') },
    { label: 'Talks and papers', hint: 'Section', run: go('talks') },
    { label: 'Contact', hint: 'Section', run: go('contact') },
    { label: 'Copy email address', hint: 'Action', run: copyEmail },
    { label: 'Switch color theme', hint: 'Action', run: toggleTheme },
    { label: 'Show the short version', hint: 'Action', run: () => setView('short') },
    { label: 'Show the full story', hint: 'Action', run: () => setView('full') },
    { label: 'Print resume', hint: 'Action', run: () => print() },
    { label: 'Open LinkedIn', hint: 'Link', run: () => open('https://www.linkedin.com/in/ebtihajkhan/', '_blank', 'noopener') },
    { label: 'Open GitHub', hint: 'Link', run: () => open('https://github.com/ebtihaj-khan', '_blank', 'noopener') }
  ];
  let shown = commands, sel = 0;
  const draw = () => {
    list.innerHTML = '';
    if (!shown.length) {
      const li = document.createElement('li');
      li.innerHTML = '<span>No match. Try “career” or “email”.</span>';
      list.appendChild(li);
      return;
    }
    shown.forEach((c, i) => {
      const li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(i === sel));
      li.innerHTML = `<span>${c.label}</span><span>${c.hint}</span>`;
      li.addEventListener('click', () => runCmd(c));
      li.addEventListener('mousemove', () => { if (sel !== i) { sel = i; draw(); } });
      list.appendChild(li);
    });
  };
  const runCmd = (c) => { palette.close(); setTimeout(c.run, 50); };
  const openPalette = () => { input.value = ''; shown = commands; sel = 0; draw(); palette.showModal(); input.focus(); };
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    shown = commands.filter((c) => c.label.toLowerCase().includes(q));
    sel = 0; draw();
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, shown.length - 1); draw(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); draw(); }
    if (e.key === 'Enter' && shown[sel]) runCmd(shown[sel]);
  });
  palette.addEventListener('click', (e) => { if (e.target === palette) palette.close(); });
  $('#open-palette').addEventListener('click', openPalette);
  addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palette.open ? palette.close() : openPalette(); }
  });
})();
