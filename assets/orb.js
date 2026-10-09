// The orb: 1,725 points that morph between shapes, one per domain.
(() => {
  const canvas = document.getElementById('orb');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const N = 1725;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Seeded random so shapes look the same on every visit.
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

  const pts = Array.from({ length: N }, (_, i) => ({
    x: 0, y: 0, z: 0, tx: 0, ty: 0, tz: 0,
    r: rand(), delay: rand() * 0.5, flag: 0, i
  }));

  // Shape builders write targets into each point.
  const golden = Math.PI * (3 - Math.sqrt(5));
  const fib = (i, n) => {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    return [Math.cos(th) * rad, y, Math.sin(th) * rad];
  };

  const shapes = {
    idle(p, t) {
      const [x, y, z] = fib(p.i, N);
      const w = 1 + 0.035 * Math.sin(x * 4 + t * 0.9) * Math.cos(y * 3 - t * 0.7) + 0.03 * Math.sin(z * 6 + t * 1.3);
      p.tx = x * w; p.ty = y * w; p.tz = z * w; p.flag = 0;
    },
    field(p, t) {
      // A country-shaped plane of settlements. About 5% are flagged as missed.
      const a = p.r * Math.PI * 2;
      const edge = 0.95 + 0.13 * Math.sin(3 * a + 1) + 0.07 * Math.cos(5 * a);
      const d = Math.sqrt(((p.i * 0.618034) % 1)) * edge * 1.05;
      const x = Math.cos(a) * d, z = Math.sin(a) * d;
      const h = 0.05 * Math.sin(x * 5 + t * 0.6) * Math.cos(z * 4);
      p.tx = x; p.ty = h + 0.05; p.tz = z;
      p.flag = (p.i % 19 === 0) ? 2 : 0;
    },
    interop(p, t) {
      // A hub, ten partner systems, and messages moving along the spokes.
      const K = 10, k = p.i % K;
      const ang = (k / K) * Math.PI * 2;
      const nx = Math.cos(ang) * 1.0, nz = Math.sin(ang) * 1.0, ny = Math.sin(ang * 2) * 0.18;
      const band = p.i % 7;
      if (band < 3) {
        const [x, y, z] = fib(p.i, N);
        p.tx = x * 0.34; p.ty = y * 0.34; p.tz = z * 0.34; p.flag = 0;
      } else if (band < 6) {
        const [x, y, z] = fib(p.i, N);
        const s = 0.11 + 0.02 * Math.sin(t * 2 + k);
        p.tx = nx + x * s; p.ty = ny + y * s; p.tz = nz + z * s; p.flag = 0;
      } else {
        const u = (p.r + t * 0.12 * (k % 2 ? 1 : -1) + 10) % 1;
        p.tx = nx * u; p.ty = ny * u; p.tz = nz * u; p.flag = 1;
      }
    },
    civic(p, t) {
      // Thirty clusters, one for each digitized government service.
      const C = 30, c = p.i % C;
      const [cx, cy, cz] = fib(c, C);
      const [x, y, z] = fib(Math.floor(p.i / C), Math.ceil(N / C));
      const s = 0.09 + 0.015 * Math.sin(t * 1.5 + c);
      const R = 0.92;
      p.tx = cx * R + x * s; p.ty = cy * R + y * s; p.tz = cz * R + z * s;
      p.flag = c === 7 ? 1 : 0;
    }
  };

  let shape = 'idle';
  let morphStart = -10;
  let colors = {};
  const readColors = () => {
    const cs = getComputedStyle(document.documentElement);
    colors = {
      ink: cs.getPropertyValue('--ink').trim(),
      teal: cs.getPropertyValue('--teal').trim(),
      amber: cs.getPropertyValue('--amber').trim()
    };
  };
  readColors();
  new MutationObserver(readColors).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', readColors);

  // Size
  let W = 0, H = 0, dpr = 1;
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  new ResizeObserver(resize).observe(canvas);
  resize();

  // Pointer: tilt toward the cursor, drag to spin, points part around the cursor.
  let rotY = 0.6, rotX = -0.25, velY = 0, tiltX = 0, tiltY = 0;
  let pointer = { x: -9999, y: -9999, inside: false };
  let dragging = false, lastX = 0;
  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.inside = true;
    tiltX = (pointer.y / H - 0.5) * 0.4;
    tiltY = (pointer.x / W - 0.5) * 0.4;
    if (dragging) { velY = (e.clientX - lastX) * 0.004; lastX = e.clientX; }
  });
  canvas.addEventListener('pointerleave', () => { pointer.inside = false; tiltX = tiltY = 0; dragging = false; });
  canvas.addEventListener('pointerdown', (e) => { dragging = true; lastX = e.clientX; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointerup', () => { dragging = false; });

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(); }).observe(canvas);

  const start = performance.now();
  let raf = 0, first = true;
  let cxT = 0, cyT = 0;

  function frame(now) {
    const t = (now - start) / 1000;
    const morph = t - morphStart;
    const fn = shapes[shape];

    if (!reduce) {
      rotY += 0.0022 + velY;
      velY *= 0.94;
    }
    cxT += (tiltX - cxT) * 0.05; cyT += (tiltY - cyT) * 0.05;
    const ax = rotX + (shape === 'field' ? -0.55 : 0) + cxT;
    const ay = rotY + cyT;
    const sx = Math.sin(ax), cx = Math.cos(ax), sy = Math.sin(ay), cy = Math.cos(ay);

    ctx.clearRect(0, 0, W, H);
    const R = Math.min(W, H) * 0.36;
    const ox = W / 2, oy = H / 2, f = 3.2;

    for (const p of pts) {
      fn(p, reduce ? 0 : t);
      if (first || reduce) { p.x = p.tx; p.y = p.ty; p.z = p.tz; }
      else {
        const k = morph < p.delay ? 0.012 : 0.07;
        p.x += (p.tx - p.x) * k; p.y += (p.ty - p.y) * k; p.z += (p.tz - p.z) * k;
      }
      // Rotate
      let x = p.x * cy - p.z * sy;
      let z = p.x * sy + p.z * cy;
      let y = p.y * cx - z * sx;
      z = p.y * sx + z * cx;
      const s = f / (f + z);
      let px = ox + x * R * s, py = oy + y * R * s;

      if (pointer.inside) {
        const dx = px - pointer.x, dy = py - pointer.y;
        const d2 = dx * dx + dy * dy, rr = 70 * 70;
        if (d2 < rr) {
          const push = (1 - d2 / rr) * 18;
          const d = Math.sqrt(d2) || 1;
          px += (dx / d) * push; py += (dy / d) * push;
        }
      }

      const depth = (1 - z) / 2; // 0 back, 1 front
      const size = (p.flag ? 2.6 : 1.7) * s;
      ctx.globalAlpha = 0.18 + depth * 0.72;
      ctx.fillStyle = p.flag === 2 ? colors.amber : p.flag === 1 ? colors.teal : (p.r < 0.12 ? colors.teal : colors.ink);
      ctx.fillRect(px - size / 2, py - size / 2, size, size);
    }
    ctx.globalAlpha = 1;
    first = false;
  }

  function loop() {
    cancelAnimationFrame(raf);
    const step = (now) => {
      frame(now);
      if (visible && !reduce) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }
  loop();

  window.Orb = {
    setShape(name) {
      shape = shapes[name] ? name : 'idle';
      morphStart = (performance.now() - start) / 1000;
      for (const p of pts) p.delay = rand() * 0.45;
      if (reduce) loop();
    },
    redraw: loop
  };
})();
