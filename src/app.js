import * as THREE from 'three';
import { DS, GROUPS, BRANCHES, LEVELS, ORDER } from './data.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { renderViz } from './viz.js';

// ---------- helpers ----------
function rng(seed) {                       // deterministic PRNG from a string seed
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = h >>> 0;
  return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const norm = (p) => { const l = Math.hypot(p[0], p[1], p[2]) || 1; return [p[0] / l, p[1] / l, p[2] / l]; };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ease = (k) => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
const isWide = () => innerWidth > 760;
const uiScale = () => Math.max(1, Math.min(1.7, innerWidth / 1500));
const byId = Object.fromEntries(DS.map((d, i) => [d.id, i]));
const cxClass = (c) => /O\(1\)|α/.test(c) ? 'g' : /log/.test(c) ? 't' : /²/.test(c) ? 'b' : 'm';

// ---------- progress ----------
let done = new Set();
try { done = new Set(JSON.parse(localStorage.getItem('csmap-done') || localStorage.getItem('dsmap-done') || '[]')); } catch (e) {}
const saveDone = () => { try { localStorage.setItem('csmap-done', JSON.stringify([...done])); } catch (e) {} };
function renderProgress() { document.getElementById('progress').innerHTML = `<b>${done.size}</b> / ${DS.length} understood`; }

// ---------- layout: where each topic's cluster sits ----------
const GROUP_CENTER = {
  foundations: [-320, 110, 40],
  systems:     [320, 130, -50],
  data:        [-280, -170, -70],
  software:    [270, -170, 60],
  ai_sec:      [0, 30, 190],
};

const CENTERS = (() => {
  const R = rng('layout-v4-cs'), placed = [], out = [];
  for (const d of DS) {
    const gc = GROUP_CENTER[d.group] || [0, 0, 0];
    let minD = 180, s = null;
    for (let k = 0; !s; k++) {
      if (k > 0 && k % 400 === 0) minD *= .93;
      const x = R() * 2 - 1, y = R() * 2 - 1, z = R() * 2 - 1;
      if (x * x + y * y + z * z > 1) continue;
      const p = [gc[0] + x * 190, gc[1] + y * 130, gc[2] + z * 160];
      if (placed.every((q) => Math.hypot(q[0] - p[0], q[1] - p[1], q[2] - p[2]) > minD)) s = p;
    }
    placed.push(s); out.push(new THREE.Vector3(...s));
  }
  return out;
})();
const CLOUD = CENTERS.reduce((a, c) => a.add(c), new THREE.Vector3()).multiplyScalar(1 / CENTERS.length);

// ---------- graph: core → branches → leaves for each topic ----------
const nodes = [], links = [], brains = [];
const RAD = 46;
DS.forEach((d, bi) => {
  const r = rng(d.id + '-shape');
  const first = nodes.length;
  const sc = [.75 + .55 * r(), .7 + .45 * r(), .75 + .55 * r()];
  const ph = [6.3 * r(), 6.3 * r(), 6.3 * r()];
  const rot = r() * Math.PI * 2;
  const warp = (p) => {                       // stretch, rotate and ripple so clusters look organic
    const y = p[1] * sc[1], x0 = p[0] * sc[0], z0 = p[2] * sc[2];
    const x = x0 * Math.cos(rot) - z0 * Math.sin(rot), z = x0 * Math.sin(rot) + z0 * Math.cos(rot), w = .2 * RAD;
    return [x + w * Math.sin(y / RAD * 1.7 + ph[0]), y + w * Math.sin(z / RAD * 1.7 + ph[1]), z + w * Math.sin(x / RAD * 1.7 + ph[2])];
  };
  const core = nodes.length;
  nodes.push({ bi, kind: 'core', color: GROUPS[d.group].color, r: 6.8, local: [0, 0, 0] });
  const branchIdx = [];
  BRANCHES.forEach((B, a) => {
    const yv = 1 - 2 * (a + .5) / BRANCHES.length, rr = Math.sqrt(1 - yv * yv), th = Math.PI * (3 - Math.sqrt(5)) * a;
    const dir = norm([Math.cos(th) * rr + (r() - .5) * .45, yv + (r() - .5) * .45, Math.sin(th) * rr + (r() - .5) * .45]);
    const dist = RAD * (.8 + .45 * r());
    const bp = [dir[0] * dist, dir[1] * dist, dir[2] * dist];
    const b = nodes.length;
    nodes.push({ bi, kind: 'branch', branch: a, color: B.color, r: 3.8, local: warp(bp) });
    links.push([core, b, 'in']); branchIdx.push(b);
    const items = d[B.key].slice(0, 9);
    items.forEach((it, j) => {
      const ld = norm([dir[0] + (r() - .5) * 1.5, dir[1] + (r() - .5) * 1.5, dir[2] + (r() - .5) * 1.5]);
      const ls = RAD * (.45 + .5 * r());
      const l = nodes.length;
      nodes.push({ bi, kind: 'leaf', branch: a, item: j, color: B.leaf, r: 2.2,
        text: Array.isArray(it) ? `${it[0]}: ${it[1]}` : it,
        local: warp([bp[0] + ld[0] * ls, bp[1] + ld[1] * ls, bp[2] + ld[2] * ls]) });
      links.push([b, l, 'in']);
    });
  });
  const rm = rng(d.id + '-drift');
  brains.push({ core, first, count: nodes.length - first, branchIdx,
    m: { amp: new THREE.Vector3(9 + 9 * rm(), 7 + 8 * rm(), 8 + 9 * rm()), freq: new THREE.Vector3(.09 + .07 * rm(), .08 + .07 * rm(), .07 + .06 * rm()),
      phase: new THREE.Vector3(6.3 * rm(), 6.3 * rm(), 6.3 * rm()), axis: new THREE.Vector3(rm() - .5, rm() - .5, rm() - .5).normalize(),
      wob: .16 + .14 * rm(), wobF: .05 + .05 * rm(), spin: (rm() - .5) * .05 } });
});

// links between related topics (core ↔ core, once per pair)
const relSeen = new Set();
DS.forEach((d, i) => d.related.forEach((rid) => {
  const j = byId[rid]; if (j === undefined) return;
  const key = Math.min(i, j) + '-' + Math.max(i, j); if (relSeen.has(key)) return;
  relSeen.add(key); links.push([brains[i].core, brains[j].core, 'rel', i, j]);
}));
const brainOf = new Int16Array(nodes.length); nodes.forEach((n, i) => brainOf[i] = n.bi);
const N = nodes.length, L = links.length;

// ---------- three.js ----------
const stage = document.getElementById('stage');
let renderer = null;
try { renderer = new THREE.WebGLRenderer({ antialias: true }); } catch (e) {}
if (!renderer) {
  const fb = document.getElementById('fallback');
  fb.style.display = 'block';
  fb.innerHTML = '<p>3D view needs WebGL, which this browser has turned off. Here is the list instead.</p>' +
    ORDER.map((id, i) => { const d = DS.find((x) => x.id === id); return `<div class="fbitem"><b>${i + 1}. ${esc(d.name)}</b><br>${esc(d.one)}</div>`; }).join('');
  throw new Error('WebGL unavailable');
}
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearColor(0xffffff, 1);
renderer.setSize(innerWidth, innerHeight);
stage.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 1, 9000);
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xffffff, 400, 2300);

const sphere = innerWidth < 640 ? new THREE.SphereGeometry(1, 12, 8) : new THREE.SphereGeometry(1, 16, 11);
const mesh = new THREE.InstancedMesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffffff }), N);
mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); mesh.frustumCulled = false;
const baseCol = nodes.map((n) => new THREE.Color(n.color));
baseCol.forEach((c, i) => mesh.setColorAt(i, c));

const ePos = new Float32Array(6 * L), eCol = new Float32Array(6 * L);
const eGeo = new THREE.BufferGeometry();
eGeo.setAttribute('position', new THREE.BufferAttribute(ePos, 3).setUsage(THREE.DynamicDrawUsage));
eGeo.setAttribute('color', new THREE.BufferAttribute(eCol, 3).setUsage(THREE.DynamicDrawUsage));
const edges = new THREE.LineSegments(eGeo, new THREE.LineBasicMaterial({ vertexColors: true })); edges.frustumCulled = false;

const mPos = new Float32Array(3 * L), mCol = new Float32Array(3 * L);
const mGeo = new THREE.BufferGeometry();
mGeo.setAttribute('position', new THREE.BufferAttribute(mPos, 3).setUsage(THREE.DynamicDrawUsage));
mGeo.setAttribute('color', new THREE.BufferAttribute(mCol, 3).setUsage(THREE.DynamicDrawUsage));
const mids = new THREE.Points(mGeo, new THREE.PointsMaterial({ size: 2.2, sizeAttenuation: false, vertexColors: true })); mids.frustumCulled = false;
scene.add(edges, mids, mesh);

// dark-mode extras: soft additive glow behind nodes
const glowTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d'), grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(.25, 'rgba(255,255,255,.45)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
})();
const coreIdx = nodes.map((n, i) => n.kind === 'core' ? i : -1).filter((i) => i >= 0);
const restIdx = nodes.map((n, i) => n.kind !== 'core' ? i : -1).filter((i) => i >= 0);
function makeGlow(idx, size) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3 * idx.length), 3).setUsage(THREE.DynamicDrawUsage));
  g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(3 * idx.length), 3).setUsage(THREE.DynamicDrawUsage));
  const p = new THREE.Points(g, new THREE.PointsMaterial({ size, map: glowTex, vertexColors: true, transparent: true, depthWrite: false,
    blending: THREE.AdditiveBlending, sizeAttenuation: true }));
  p.frustumCulled = false; p.visible = false; p.userData.idx = idx; return p;
}
const glows = [makeGlow(coreIdx, 70), makeGlow(restIdx, 22)];
scene.add(...glows);

// per-frame motion: each cluster drifts and wobbles slowly
const world = new Float32Array(3 * N);
const pulse = { set: new Set(), until: 0 };
const drift = brains.map(() => new THREE.Vector3()), quat = brains.map(() => new THREE.Quaternion());
const Y = new THREE.Vector3(0, 1, 0), _q = new THREE.Quaternion(), _v = new THREE.Vector3(), _m = new THREE.Matrix4();
function step(t) {
  brains.forEach((b, i) => {
    const m = b.m;
    drift[i].set(m.amp.x * Math.sin(t * m.freq.x + m.phase.x), m.amp.y * Math.sin(t * m.freq.y + m.phase.y), m.amp.z * Math.sin(t * m.freq.z + m.phase.z));
    quat[i].setFromAxisAngle(m.axis, m.wob * Math.sin(t * m.wobF + m.phase.x));
    _q.setFromAxisAngle(Y, t * m.spin); quat[i].multiply(_q);
  });
  for (let n = 0; n < N; n++) {
    const nd = nodes[n], b = nd.bi;
    _v.set(nd.local[0], nd.local[1], nd.local[2]).applyQuaternion(quat[b]).add(CENTERS[b]).add(drift[b]);
    world[3 * n] = _v.x; world[3 * n + 1] = _v.y; world[3 * n + 2] = _v.z;
    let rs = nd.r;
    if (activeCategory !== 'all' && DS[b].group !== activeCategory) {
      rs *= .65; // scale down non-matching category nodes
    }
    if (pulse.until > performance.now() && pulse.set.has(n)) rs *= (nd.kind === 'leaf' ? 1.35 : 1.6) + .45 * Math.sin(performance.now() / 140);
    _m.makeScale(rs, rs, rs).setPosition(_v); mesh.setMatrixAt(n, _m);
  }
  mesh.instanceMatrix.needsUpdate = true;
  for (let e = 0; e < L; e++) {
    const a = links[e][0], b = links[e][1];
    for (let k = 0; k < 3; k++) {
      ePos[6 * e + k] = world[3 * a + k]; ePos[6 * e + 3 + k] = world[3 * b + k];
      mPos[3 * e + k] = (world[3 * a + k] + world[3 * b + k]) / 2;
    }
  }
  eGeo.attributes.position.needsUpdate = true; mGeo.attributes.position.needsUpdate = true;
  if (dark) for (const gl of glows) {
    const arr = gl.geometry.attributes.position.array, idx = gl.userData.idx;
    for (let k = 0; k < idx.length; k++) { const n = idx[k]; arr[3 * k] = world[3 * n]; arr[3 * k + 1] = world[3 * n + 1]; arr[3 * k + 2] = world[3 * n + 2]; }
    gl.geometry.attributes.position.needsUpdate = true;
  }
}
const posOf = (n, out) => out.set(world[3 * n], world[3 * n + 1], world[3 * n + 2]);
const centerOf = (bi, out) => out.copy(CENTERS[bi]).add(drift[bi]);

// colour state: fade everything not in focus towards background
const BGC = new THREE.Color(0xffffff), EDGE = new THREE.Color('#DCDCE4'), MID = new THREE.Color('#A6BDEE'), REL = new THREE.Color('#E6E6EE');
let edgeTint = .18;
const _c = new THREE.Color();
let selected = -1, hovered = -1, paintKey = '', activeCategory = 'all';

function fadeFor(bi) {
  if (activeCategory !== 'all' && DS[bi].group !== activeCategory) {
    return .93; // dimmed non-category nodes
  }
  if (selected >= 0) {
    if (bi === selected) return 0;
    return DS[selected].related.includes(DS[bi].id) || DS[bi].related.includes(DS[selected].id) ? .55 : .88;
  }
  if (hovered >= 0) return bi === hovered ? 0 : .4;
  return 0;
}

function paint() {
  const key = selected + ':' + hovered + ':' + activeCategory;
  if (key === paintKey) return;
  paintKey = key;
  const f = brains.map((_, i) => fadeFor(i));
  for (let n = 0; n < N; n++) mesh.setColorAt(n, _c.copy(baseCol[n]).lerp(BGC, f[nodes[n].bi]));
  mesh.instanceColor.needsUpdate = true;
  for (const gl of glows) {
    const arr = gl.geometry.attributes.color.array, idx = gl.userData.idx, k0 = gl === glows[0] ? .55 : .32;
    idx.forEach((n, k) => {
      const ff = f[nodes[n].bi]; _c.copy(baseCol[n]).multiplyScalar(k0 * (1 - ff) * (1 - ff)).toArray(arr, 3 * k);
    });
    gl.geometry.attributes.color.needsUpdate = true;
  }
  for (let e = 0; e < L; e++) {
    const [a, b, kind, i, j] = links[e];
    if (kind === 'rel') {
      const on = selected >= 0 && (i === selected || j === selected);
      if (on) _c.set(GROUPS[DS[selected].group].color).lerp(BGC, .45);
      else _c.copy(REL).lerp(BGC, selected >= 0 ? .7 : hovered >= 0 && i !== hovered && j !== hovered ? .5 : (activeCategory !== 'all' && (DS[i].group !== activeCategory || DS[j].group !== activeCategory)) ? .92 : 0);
    } else {
      _c.copy(EDGE).lerp(baseCol[brains[nodes[a].bi].core], edgeTint).lerp(BGC, .9 * f[nodes[a].bi]);
    }
    _c.toArray(eCol, 6 * e); _c.toArray(eCol, 6 * e + 3);
    _c.copy(MID).lerp(BGC, kind === 'rel' ? Math.max(.6, f[nodes[a].bi]) : f[nodes[a].bi]).toArray(mCol, 3 * e);
  }
  eGeo.attributes.color.needsUpdate = true; mGeo.attributes.color.needsUpdate = true;
  labelEls.forEach((el, i) => { el.classList.toggle('sel', i === selected); el.classList.toggle('hov', i === hovered && i !== selected); });
}

// ---------- category filtering ----------
function setCategory(cat, fly = true) {
  if (activeCategory === cat) {
    activeCategory = 'all';
  } else {
    activeCategory = cat;
  }
  updateCategoryUI();
  paintKey = '';
  paint();
  if (fly) {
    if (activeCategory === 'all') {
      overview(1100);
    } else {
      focusCategory(activeCategory, 1200);
    }
  }
  if (listEl.classList.contains('open')) renderList();
}

function focusCategory(cat, ms = 1100) {
  const gc = GROUP_CENTER[cat];
  if (!gc) return;
  const target = new THREE.Vector3(...gc);
  const dist = isWide() ? 720 : 960;
  const camPos = target.clone().add(new THREE.Vector3(0, 90, dist));
  flyTo(camPos, target, ms);
}

function updateCategoryUI() {
  document.querySelectorAll('.cat-pill').forEach((btn) => {
    btn.classList.toggle('act', btn.dataset.cat === activeCategory);
  });
}

function renderCategoryButtons() {
  const cats = [
    { key: 'all', name: 'All' },
    ...Object.entries(GROUPS).map(([k, g]) => ({ key: k, name: g.name, color: g.color })),
  ];
  const heroHtml = `<span class="legend-label">Filter:</span>` + cats.map((c) => `
    <button class="cat-pill${c.key === activeCategory ? ' act' : ''}" data-cat="${c.key}" aria-label="Filter by ${esc(c.name)}">
      ${c.color ? `<i style="background:${c.color}"></i>` : ''}<span>${esc(c.name)}</span>
    </button>`).join('');

  const barHtml = cats.map((c) => `
    <button class="cat-pill${c.key === activeCategory ? ' act' : ''}" data-cat="${c.key}" aria-label="Filter by ${esc(c.name)}">
      ${c.color ? `<i style="background:${c.color}"></i>` : ''}<span>${esc(c.name)}</span>
    </button>`).join('');

  const leg = document.getElementById('legend');
  if (leg) leg.innerHTML = heroHtml;
  const cbar = document.getElementById('catBar');
  if (cbar) cbar.innerHTML = barHtml;
}

// ---------- theme ----------
let dark = false;
try { const s = localStorage.getItem('csmap-theme'); dark = s ? s === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) {}
function applyTheme() {
  const bg = dark ? '#090a12' : '#ffffff';
  document.body.classList.toggle('dark', dark);
  renderer.setClearColor(bg, 1); scene.fog.color.set(bg); BGC.set(bg);
  EDGE.set(dark ? '#2b2e45' : '#DCDCE4'); MID.set(dark ? '#5d6fa8' : '#A6BDEE'); REL.set(dark ? '#20223a' : '#E6E6EE');
  edgeTint = dark ? .32 : .18;
  glows.forEach((g) => g.visible = dark);
  const tb = document.getElementById('themeBtn'); if (tb) tb.textContent = dark ? '☀ Light' : '☾ Dark';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg);
  paintKey = '';
  if (dark) step((performance.now() - (window.__t0 || 0)) / 1000);
}
function toggleTheme() { dark = !dark; try { localStorage.setItem('csmap-theme', dark ? 'dark' : 'light'); } catch (e) {} applyTheme(); }

// ---------- controls & camera moves ----------
const controls = new OrbitControls(camera, renderer.domElement);
Object.assign(controls, { enableDamping: true, dampingFactor: .08, zoomToCursor: true, minDistance: 25, maxDistance: 2600, rotateSpeed: .7, zoomSpeed: 1.1 });
let tween = null, dragging = false;
controls.addEventListener('start', () => { tween = null; dragging = true; if (auto.active && auto.playing) pauseAuto(); });
controls.addEventListener('end', () => { dragging = false; });
function resetDamping() {
  if (controls._sphericalDelta) controls._sphericalDelta.set(0, 0, 0);
  if (controls._panOffset) controls._panOffset.set(0, 0, 0);
  if ('_scale' in controls) controls._scale = 1;
}
function flyTo(pos, target, ms = 1200) {
  resetDamping();
  if (ms <= 0) { camera.position.copy(pos); controls.target.copy(target); controls.update(); tween = null; return; }
  tween = { p0: camera.position.clone(), t0: controls.target.clone(), p1: pos.clone(), t1: target.clone(), start: performance.now(), ms };
}
function basis(dir) {
  const right = new THREE.Vector3().crossVectors(Y, dir).normalize();
  const up = new THREE.Vector3().crossVectors(dir, right).normalize();
  return { right, up };
}
function clearestDir(bi, dist) {
  const c = centerOf(bi, new THREE.Vector3());
  const others = brains.map((_, j) => j).filter((j) => j !== bi).map((j) => centerOf(j, new THREE.Vector3()));
  let best = new THREE.Vector3(0, .12, 1).normalize(), bestScore = -Infinity;
  for (let e = 0; e < 30; e++) {
    const l = 1 - 2 * (e + .5) / 30, h = Math.sqrt(1 - l * l), a = Math.PI * (3 - Math.sqrt(5)) * e;
    const u = new THREE.Vector3(Math.cos(a) * h, .6 * l, Math.sin(a) * h).normalize();
    if (u.z < .3) continue;
    const seg = u.clone().multiplyScalar(dist); let p = Infinity;
    for (const o of others) {
      const rel = o.clone().sub(c), k = Math.max(0, Math.min(1, rel.dot(seg) / seg.lengthSq()));
      p = Math.min(p, rel.distanceTo(seg.clone().multiplyScalar(k)));
    }
    const score = Math.min(p, 260) + 40 * u.z;
    if (score > bestScore) { bestScore = score; best = u; }
  }
  return best;
}
function focusCam(bi, ms = 1200, centred = false) {
  const n = isWide() ? 340 : 460, dir = clearestDir(bi, n), { right, up } = basis(dir);
  const c = centerOf(bi, new THREE.Vector3());
  const t = centred ? c.clone() : isWide() ? c.clone().addScaledVector(right, .3 * n) : c.clone().addScaledVector(up, -.3 * n);
  flyTo(t.clone().addScaledVector(dir, n), t, ms);
}
function overview(ms = 1300) {
  const wide = isWide(), dist = wide ? 1120 : 1650;
  const t = wide ? CLOUD.clone().add(new THREE.Vector3(-220, 0, 0)) : CLOUD.clone().add(new THREE.Vector3(0, -140, 0));
  flyTo(t.clone().add(new THREE.Vector3(0, 110, dist)), t, ms);
}
function explore() {
  const dir = camera.position.clone().sub(controls.target).normalize();
  flyTo(CLOUD.clone().addScaledVector(dir, isWide() ? 980 : 1500), CLOUD.clone(), 1100);
}
function zoomBy(f) {
  const d = camera.position.distanceTo(controls.target), dir = controls.target.clone().sub(camera.position).normalize();
  const nd = Math.max(40, Math.min(controls.maxDistance, d * f));
  flyTo(controls.target.clone().addScaledVector(dir, -nd), controls.target.clone(), 450);
}

// ---------- labels ----------
const labelsEl = document.getElementById('labels');
const labelEls = DS.map((d, i) => {
  const el = document.createElement('div'); el.className = 'lbl';
  el.innerHTML = `<span class="dot" style="background:${GROUPS[d.group].color}"></span><span>${esc(d.name)}</span><span class="ck"></span>`;
  el.addEventListener('click', (e) => { e.stopPropagation(); select(i); });
  el.addEventListener('pointerenter', () => { hovered = i; });
  el.addEventListener('pointerleave', () => { if (hovered === i) hovered = -1; });
  el.addEventListener('wheel', (e) => { e.preventDefault(); renderer.domElement.dispatchEvent(new WheelEvent('wheel', e)); }, { passive: false });
  labelsEl.appendChild(el); return el;
});
const branchEls = BRANCHES.map((B) => {
  const el = document.createElement('div'); el.className = 'blbl'; el.textContent = B.name; el.style.color = B.color;
  el.style.visibility = 'hidden'; labelsEl.appendChild(el); return el;
});
function refreshChecks() { labelEls.forEach((el, i) => el.querySelector('.ck').textContent = done.has(DS[i].id) ? '✓' : ''); }
const _dir = new THREE.Vector3(), _p = new THREE.Vector3(), _t = new THREE.Vector3();
const FOCAL = () => innerHeight / 2 / Math.tan(THREE.MathUtils.degToRad(25));
function project(n) {
  posOf(n, _p); const depth = _t.copy(_p).sub(camera.position).dot(_dir);
  _p.project(camera);
  return { depth, x: (_p.x + 1) / 2 * innerWidth, y: (1 - _p.y) / 2 * innerHeight };
}
function updateLabels() {
  camera.getWorldDirection(_dir);
  const W = innerWidth, H = innerHeight, F = FOCAL();
  const items = brains.map((b, i) => { const p = project(b.core); return { i, ...p, rpx: 6.8 * F / Math.max(p.depth, 1) }; });
  const prio = (it) => it.i === selected ? 2 : it.i === hovered ? 1 : 0;
  items.sort((a, b) => prio(b) - prio(a) || a.depth - b.depth);
  const placed = [];
  for (const it of items) {
    const el = labelEls[it.i];
    if (activeCategory !== 'all' && DS[it.i].group !== activeCategory) {
      el.style.visibility = 'hidden';
      continue;
    }
    const fs = Math.max(11, Math.min(19, 4300 / Math.max(it.depth, 1))) * uiScale();
    const w = DS[it.i].name.length * fs * .58 + 3.2 * fs, h = 1.6 * fs;
    const x = it.x + it.rpx + 5, y = it.y - h / 2;
    const off = it.depth < 8 || x > W + 20 || x + w < -20 || y < -40 || y > H + 40;
    const clash = !prio(it) && placed.some((r) => x < r.x + r.w && x + w > r.x && y < r.y + r.h && y + h > r.y);
    if (off || clash) { el.style.visibility = 'hidden'; continue; }
    el.style.visibility = 'visible';
    el.style.fontSize = fs.toFixed(1) + 'px';
    el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
    el.style.opacity = fadeFor(it.i) > .6 ? .35 : 1;
    placed.push({ x, y, w, h });
  }
  branchEls.forEach((el, a) => {
    if (selected < 0) { el.style.visibility = 'hidden'; return; }
    const p = project(brains[selected].branchIdx[a]);
    if (p.depth < 8) { el.style.visibility = 'hidden'; return; }
    const us = uiScale(), rpx = 3.8 * F / p.depth, w = (BRANCHES[a].name.length * 7.6 + 12) * us, h = 18 * us;
    el.style.fontSize = (11 * us).toFixed(1) + 'px';
    let x = p.x + rpx + 4, y = p.y - 9;
    const hit = () => placed.some((r) => x < r.x + r.w && x + w > r.x && y < r.y + r.h && y + h > r.y);
    for (let k = 0; k < 6 && hit(); k++) y += (k % 2 ? -1 : 1) * (k + 1) * 10;
    if (hit()) { x = p.x - rpx - 4 - w; y = p.y - 9; }
    placed.push({ x, y, w, h });
    el.style.visibility = 'visible';
    el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
  });
}

// ---------- picking ----------
function pick(px, py) {
  camera.getWorldDirection(_dir);
  const F = FOCAL(); let best = -1, bestDepth = Infinity;
  for (let n = 0; n < N; n++) {
    const p = project(n); if (p.depth < 5) continue;
    const rad = Math.max(nodes[n].kind === 'leaf' ? 6 : 9, nodes[n].r * F / p.depth + 4);
    if (Math.hypot(p.x - px, p.y - py) < rad && p.depth < bestDepth) { bestDepth = p.depth; best = n; }
  }
  return best;
}
const tip = document.getElementById('tip');
function showTip(n, x, y) {
  if (n < 0) { tip.style.opacity = 0; return; }
  const nd = nodes[n], d = DS[nd.bi];
  if (nd.kind === 'core') tip.innerHTML = `<small>${esc(GROUPS[d.group].name)} · ${esc(LEVELS[d.level])}</small>${esc(d.name)}`;
  else if (nd.kind === 'branch') tip.innerHTML = `<small>${esc(d.name)}</small>${esc(BRANCHES[nd.branch].name)}`;
  else tip.innerHTML = `<small>${esc(d.name)} · ${esc(BRANCHES[nd.branch].name)}</small>${esc(nd.text)}`;
  const tx = Math.min(x + 14, innerWidth - 300);
  tip.style.transform = `translate(${tx}px,${y + 14}px)`; tip.style.opacity = 1;
}
const cv = renderer.domElement;
cv.style.cursor = 'grab';
let down = null, hoverQueued = false, lastMove = null;
cv.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY, t: performance.now() }; tip.style.opacity = 0; });
cv.addEventListener('pointerup', (e) => {
  if (!down) return;
  const tap = Math.hypot(e.clientX - down.x, e.clientY - down.y) < 7 && performance.now() - down.t < 600; down = null;
  if (!tap) return;
  const n = pick(e.clientX, e.clientY);
  if (n >= 0) select(nodes[n].bi, nodes[n].kind === 'core' ? null : nodes[n]);
  else if (selected >= 0 && !auto.active) deselect();
});
cv.addEventListener('pointermove', (e) => {
  if (e.pointerType !== 'mouse' || e.buttons) return;
  lastMove = e; if (hoverQueued) return; hoverQueued = true;
  requestAnimationFrame(() => {
    hoverQueued = false; const n = pick(lastMove.clientX, lastMove.clientY);
    hovered = n >= 0 ? nodes[n].bi : -1;
    cv.style.cursor = n >= 0 ? 'pointer' : 'grab';
    showTip(n, lastMove.clientX, lastMove.clientY);
  });
});
cv.addEventListener('pointerleave', () => { hovered = -1; tip.style.opacity = 0; });

// ---------- panel ----------
const panel = document.getElementById('panel');
function renderPanel(bi) {
  const d = DS[bi], g = GROUPS[d.group], idx = ORDER.indexOf(d.id), isDone = done.has(d.id);
  const renderCore = (B) => `
    <h3 data-sec="${B.key}"><i style="background:${B.color}"></i>${esc(B.name)}</h3>
    <table class="ops core-tbl">
      ${d.core.map(([concept, detail], j) => `
        <tr data-item="core-${j}">
          <td><b>${esc(concept)}</b></td>
          <td><span class="core-detail">${esc(detail)}</span></td>
        </tr>`).join('')}
    </table>`;
  const list = (B) => `<h3 data-sec="${B.key}"><i style="background:${B.color}"></i>${esc(B.name)}</h3>
    <ul class="items" style="--c:${B.color}">${d[B.key].map((x, j) => `<li data-item="${B.key}-${j}">${esc(x)}</li>`).join('')}</ul>`;
  const isLoopingThis = auto.active && auto.loop === 'topic' && (auto.loopBi === bi || (auto.loopBi < 0 && STEPS[auto.i]?.bi === bi));

  panel.innerHTML = `
    <div class="p-top"><span class="pill" style="--c:${g.color}">${esc(g.name)}</span><span class="lvl">${esc(LEVELS[d.level])}</span>
      <button class="x" data-act="close" aria-label="Close">✕</button></div>
    <h2>${esc(d.name)}</h2>
    <p class="one">${esc(d.one)}</p>
    <div class="ds-viz">${renderViz(d.id)}</div>
    <div class="p-actions">
      <button class="learned ${isDone ? 'on' : ''}" data-act="learn">${isDone ? '✓ Understood' : 'Mark as understood'}</button>
      <button class="loop-topic-btn ${isLoopingThis ? 'on' : ''}" data-act="loop-topic" title="Loop all sections of ${esc(d.name)} continuously">
        ${isLoopingThis && auto.playing ? '❚❚ Looping topic' : '▶ Play in loop'}
      </button>
    </div>
    ${renderCore(BRANCHES[0])}
    ${BRANCHES.slice(1).map(list).join('')}
    <h3><i style="background:#0f1020"></i>Code Example</h3>
    <div class="code"><button data-act="copy">Copy</button><pre>${esc(d.py)}</pre></div>
    <h3><i style="background:#ccc"></i>Related Domains</h3>
    <div class="chips">${d.related.map((r) => { const o = DS[byId[r]]; if (!o) return ''; return `<button data-go="${r}"><i style="background:${GROUPS[o.group].color}"></i>${esc(o.name)}</button>`; }).join('')}</div>
    <div class="nav"><button data-act="prev">← Prev</button><span>Topic ${idx + 1} of ${ORDER.length}</span><button data-act="next">Next →</button></div>`;
  panel.scrollTop = 0;
}

panel.addEventListener('click', async (e) => {
  const go = e.target.closest('[data-go]'); if (go) { select(byId[go.dataset.go]); return; }
  const btn = e.target.closest('[data-act]'); if (!btn) return;
  const act = btn.dataset.act, d = DS[selected];
  if (act === 'close') { if (auto.active) setTourPanel(false); else deselect(); }
  else if (act === 'learn') { done.has(d.id) ? done.delete(d.id) : done.add(d.id); saveDone(); renderProgress(); refreshChecks(); renderPanel(selected); }
  else if (act === 'loop-topic') {
    if (auto.active && auto.loop === 'topic' && (auto.loopBi === selected || (auto.loopBi < 0 && STEPS[auto.i]?.bi === selected))) {
      toggleAuto();
    } else {
      startTopicLoop(selected);
    }
    renderPanel(selected);
  }
  else if ((act === 'next' || act === 'prev') && auto.active) autoJump(act === 'next' ? 1 : -1);
  else if (act === 'next' || act === 'prev') {
    const i = ORDER.indexOf(d.id), j = (i + (act === 'next' ? 1 : -1) + ORDER.length) % ORDER.length; select(byId[ORDER[j]]);
  } else if (act === 'copy') {
    try { await navigator.clipboard.writeText(d.py); btn.textContent = 'Copied'; }
    catch (err) { btn.textContent = 'Select to copy'; }
    setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
  }
});

// ---------- selection ----------
let follow = -1; const followLast = new THREE.Vector3();
function select(bi, node = null, opts = {}) {
  if (bi < 0 || bi === undefined) return;
  if (!opts.auto && auto.active) pauseAuto();
  const changed = bi !== selected;
  selected = bi; follow = bi; centerOf(bi, followLast);
  document.body.classList.add('exploring');
  closeList();
  if (changed) { renderPanel(bi); focusCam(bi, opts.flyMs || 1200, !!opts.noPanel); }
  if (!opts.noPanel) { panel.classList.add('open'); document.body.classList.add('panel-open'); }
  else if (opts.auto) { panel.classList.remove('open'); document.body.classList.remove('panel-open'); }
  if (location.hash.slice(1) !== DS[bi].id) location.hash = DS[bi].id;
  if (node && node.kind !== 'core') {
    const key = BRANCHES[node.branch].key;
    const target = node.kind === 'leaf' ? panel.querySelector(`[data-item="${key}-${node.item}"]`) : panel.querySelector(`[data-sec="${key}"]`);
    if (target) {
      setTimeout(() => { target.scrollIntoView({ behavior: 'smooth', block: 'center' }); target.classList.add('flash'); setTimeout(() => target.classList.remove('flash'), 1600); }, changed ? 350 : 0);
    }
  }
}
function deselect() {
  selected = -1; follow = -1; panel.classList.remove('open'); document.body.classList.remove('panel-open');
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  if (camera.position.distanceTo(controls.target) < 420) {
    const dir = camera.position.clone().sub(controls.target).normalize();
    flyTo(controls.target.clone().addScaledVector(dir, 520), controls.target.clone(), 800);
  }
}
function goHome() { deselect(); activeCategory = 'all'; updateCategoryUI(); document.body.classList.remove('exploring'); overview(); }

// ---------- list view ----------
const listEl = document.getElementById('list'), listBtn = document.getElementById('listBtn');
function renderList() {
  const groupsToRender = activeCategory === 'all'
    ? Object.entries(GROUPS)
    : Object.entries(GROUPS).filter(([k]) => k === activeCategory);

  listEl.innerHTML = `
    <div style="max-width:1100px; margin:0 auto 24px; display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
      <span style="font-size:11.5px; font-weight:700; text-transform:uppercase; color:var(--mute); letter-spacing:.06em;">Filter:</span>
      <button class="cat-pill${activeCategory === 'all' ? ' act' : ''}" data-cat="all">All</button>
      ${Object.entries(GROUPS).map(([k, g]) => `
        <button class="cat-pill${activeCategory === k ? ' act' : ''}" data-cat="${k}"><i style="background:${g.color}"></i>${esc(g.name)}</button>
      `).join('')}
    </div>
  ` + groupsToRender.map(([gk, g]) => `
    <div class="lgroup"><h4><i style="background:${g.color}"></i>${esc(g.name)}</h4><div class="cards">
    ${DS.filter((d) => d.group === gk).sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id)).map((d) => `
      <button class="card" data-go="${d.id}">${done.has(d.id) ? '<span class="done">✓</span>' : ''}
      <span class="n">${String(ORDER.indexOf(d.id) + 1).padStart(2, '0')} · ${esc(LEVELS[d.level])}</span><b>${esc(d.name)}</b><p>${esc(d.one)}</p></button>`).join('')}
    </div></div>`).join('');
}
function openList() { renderList(); listEl.classList.add('open'); listBtn.textContent = '◎ 3D view'; tip.style.opacity = 0; }
function closeList() { listEl.classList.remove('open'); listBtn.textContent = '☰ List view'; }
listBtn.addEventListener('click', () => listEl.classList.contains('open') ? closeList() : openList());
listEl.addEventListener('click', (e) => {
  const catBtn = e.target.closest('.cat-pill');
  if (catBtn) { setCategory(catBtn.dataset.cat, false); return; }
  const c = e.target.closest('[data-go]');
  if (c) select(byId[c.dataset.go]);
});

// ---------- hero & misc ----------
renderCategoryButtons();
document.getElementById('legend').addEventListener('click', (e) => {
  const b = e.target.closest('.cat-pill');
  if (b) setCategory(b.dataset.cat);
});
document.getElementById('catBar').addEventListener('click', (e) => {
  const b = e.target.closest('.cat-pill');
  if (b) setCategory(b.dataset.cat);
});

document.getElementById('startBtn').addEventListener('click', () => select(byId[ORDER[0]]));
document.getElementById('exploreBtn').addEventListener('click', () => { document.body.classList.add('exploring'); explore(); });
document.getElementById('brand').addEventListener('click', goHome);
document.getElementById('zin').addEventListener('click', () => zoomBy(.6));
document.getElementById('zout').addEventListener('click', () => zoomBy(1.6));
addEventListener('keydown', (e) => {
  if (e.target.closest && e.target.closest('input, textarea')) return;
  if (e.key === '/') { e.preventDefault(); qEl.focus(); qEl.select(); return; }
  if (e.key === ' ') { e.preventDefault(); auto.active ? toggleAuto() : startAuto(); return; }
  if (e.key === 'd' && !e.metaKey && !e.ctrlKey) { toggleTheme(); return; }
  if (e.key === 'l' && !e.metaKey && !e.ctrlKey) { cycleLoopMode(); return; }
  if (auto.active && e.key === 'p') { setTourPanel(!auto.showPanel); return; }
  if (auto.active && e.key === 'c') { setTourCaps(!auto.showCaps); return; }
  if (e.key === 'f' && !e.metaKey && !e.ctrlKey) { toggleFullscreen(); return; }
  if (e.key === 'Escape') { if (auto.active) { stopAuto(); return; } if (listEl.classList.contains('open')) closeList(); else if (selected >= 0) deselect(); }
  if (auto.active && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) { autoJump(e.key === 'ArrowRight' ? 1 : -1); return; }
  if (selected >= 0 && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
    const i = ORDER.indexOf(DS[selected].id), j = (i + (e.key === 'ArrowRight' ? 1 : -1) + ORDER.length) % ORDER.length; select(byId[ORDER[j]]);
  }
});
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight);
});
function fromHash() { const id = location.hash.slice(1); if (id && byId[id] !== undefined && byId[id] !== selected) select(byId[id]); }
addEventListener('hashchange', fromHash);

// ---------- search with autocomplete ----------
const qEl = document.getElementById('q'), suggEl = document.getElementById('sugg'), searchBox = document.getElementById('search');
const INDEX = nodes.map((nd, n) => {
  const d = DS[nd.bi];
  if (nd.kind === 'core') return { n, kind: 0, title: d.name, sub: `${GROUPS[d.group].name} · ${LEVELS[d.level]}`, color: GROUPS[d.group].color };
  const B = BRANCHES[nd.branch];
  if (nd.kind === 'branch') return { n, kind: 1, title: `${B.name}`, sub: d.name, color: B.color };
  return { n, kind: 2, title: nd.text, sub: `${d.name} · ${B.name}`, color: B.color };
});

const ALIAS = {
  'dsa': 'data structures algorithms dsa sorting binary search trees graphs big o leetcode hash maps heaps stacks queues',
  'architecture': 'cpu hardware silicon registers cache assembly instruction set risc-v x86 alu clock memory hierarchy',
  'os': 'operating system processes threads virtual memory scheduling kernel linux syscalls deadlocks concurrency',
  'networking': 'tcp ip sockets udp http dns routing packet switching packets osi layers protocols latency',
  'databases': 'sql acid transactions b-trees indexing nosql relational joins sharding wal replication storage',
  'distributed-systems': 'cap theorem consensus raft paxos replication split brain distributed fault tolerance event driven',
  'languages-compilers': 'ast parser interpreter compiler bytecode jit garbage collection type systems grammar lexer',
  'software-engineering': 'solid clean code design patterns modularity testing refactoring ci cd agile architectural patterns',
  'web-cloud': 'browser dom rest graphql microservices serverless containers docker kubernetes cloud api cdn frontend backend',
  'ai-ml': 'machine learning neural networks deep learning transformers llms gradient descent backpropagation training models',
  'cybersecurity': 'cryptography hashing encryption rsa zero trust authentication ssl tls sql injection buffer overflow security',
  'theory-computation': 'turing machines p vs np decidability automata computability halting problem complexity classes formal grammars'
};
INDEX.forEach((it) => { if (it.kind === 0) it.alias = ALIAS[DS[nodes[it.n].bi].id] || ''; });
const fold = (s) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');
INDEX.forEach((it) => { it.ft = fold(it.title); it.fs = fold(it.sub); it.fa = fold(it.alias || ''); });

function score(it, words, q) {
  let s = 0;
  for (const w of words) {
    const inT = it.ft.indexOf(w), inA = it.fa.indexOf(w), inS = it.fs.indexOf(w);
    if (inT < 0 && inA < 0 && inS < 0) return -1;
    if (inT === 0) s += 30; else if (inT > 0) s += /[\s(\-/·:]/.test(it.ft[inT - 1]) ? 20 : 10;
    else if (inA >= 0) s += 18; else s += 3;
  }
  if (it.ft === q) s += 60; else if (it.ft.startsWith(q)) s += 25;
  s += [14, 4, 0][it.kind];
  return s - it.ft.length * .02;
}
function hl(text, words) {
  const f = fold(text); const marks = new Array(text.length).fill(false);
  for (const w of words) { let i = 0; while ((i = f.indexOf(w, i)) >= 0) { for (let k = i; k < i + w.length; k++) marks[k] = true; i += w.length; } }
  let out = '', open = false;
  for (let i = 0; i < text.length; i++) {
    if (marks[i] && !open) { out += '<mark>'; open = true; } if (!marks[i] && open) { out += '</mark>'; open = false; }
    out += esc(text[i]);
  }
  return out + (open ? '</mark>' : '');
}
let results = [], active = 0;
function runSearch() {
  const q = fold(qEl.value.trim()); searchBox.classList.toggle('has-text', !!q);
  if (!q) { closeSugg(); return; }
  const words = q.split(/\s+/).filter(Boolean);
  results = INDEX.map((it) => ({ it, s: score(it, words, q) })).filter((r) => r.s >= 0).sort((a, b) => b.s - a.s).slice(0, 10).map((r) => r.it);
  active = 0;
  suggEl.innerHTML = results.length ? results.map((it, i) => `<div class="sg${i === 0 ? ' act' : ''}" role="option" data-i="${i}">
      <i class="${it.kind === 0 ? 'core' : ''}" style="background:${it.color}"></i>
      <div><div class="t">${hl(it.title, words)}</div><div class="s">${it.kind === 0 ? 'Topic · ' : ''}${esc(it.sub)}</div></div></div>`).join('')
    : `<div class="sg-empty">No matches for “${esc(qEl.value.trim())}”</div>`;
  suggEl.classList.add('open'); qEl.setAttribute('aria-expanded', 'true');
}
function closeSugg() { suggEl.classList.remove('open'); qEl.setAttribute('aria-expanded', 'false'); }
function setActive(i) {
  if (!results.length) return; active = (i + results.length) % results.length;
  suggEl.querySelectorAll('.sg').forEach((el, k) => el.classList.toggle('act', k === active));
  suggEl.querySelector('.sg.act')?.scrollIntoView({ block: 'nearest' });
}
function choose(i) {
  const it = results[i]; if (!it) return;
  const nd = nodes[it.n];
  closeSugg(); qEl.blur();
  select(nd.bi, nd.kind === 'core' ? null : nd);
  pulse.set = new Set([it.n]); pulse.until = performance.now() + 2600;
}
qEl.addEventListener('input', runSearch);
qEl.addEventListener('focus', () => { if (qEl.value.trim()) runSearch(); tip.style.opacity = 0; });
qEl.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
  else if (e.key === 'Enter') { e.preventDefault(); choose(active); }
  else if (e.key === 'Escape') { if (qEl.value) { qEl.value = ''; runSearch(); } else qEl.blur(); closeSugg(); }
});
suggEl.addEventListener('pointerdown', (e) => { const el = e.target.closest('.sg'); if (el) { e.preventDefault(); choose(+el.dataset.i); } });
suggEl.addEventListener('pointermove', (e) => { const el = e.target.closest('.sg'); if (el && +el.dataset.i !== active) setActive(+el.dataset.i); });
qEl.addEventListener('blur', () => setTimeout(closeSugg, 120));

// ---------- autoplay: a slow, film-like tour ----------
const STEPS = [];
ORDER.forEach((id) => {
  const bi = byId[id];
  STEPS.push({ bi, br: -1, dur: 6800 });
  BRANCHES.forEach((B, a) => STEPS.push({ bi, br: a, dur: 3200 + 300 * Math.min(DS[bi][B.key].length, 6) }));
});
const SPEEDS = [.5, 1, 1.5, 2];
const auto = { active: false, playing: false, i: 0, el: 0, speed: 1, flashTimer: 0, showPanel: true, showCaps: true, loop: 'off', loopBi: -1 };
try { auto.showPanel = localStorage.getItem('csmap-tour-panel') !== 'off'; auto.showCaps = localStorage.getItem('csmap-tour-caps') !== 'off'; } catch (e) {}
const tourPanel = () => isWide() && auto.showPanel;
const capEl = document.getElementById('caption'), playerEl = document.getElementById('player');
const ppBtn = playerEl.querySelector('[data-p="toggle"]'), spdBtn = playerEl.querySelector('[data-p="speed"]');
const pTitle = playerEl.querySelector('.pt'), pFill = playerEl.querySelector('.pbar i');

function getTopicRange(bi) {
  const start = STEPS.findIndex((s) => s.bi === bi && s.br < 0);
  const count = 1 + BRANCHES.length;
  return { start: start < 0 ? 0 : start, end: start < 0 ? count - 1 : start + count - 1, count };
}

function startTopicLoop(bi) {
  auto.loop = 'topic';
  auto.loopBi = bi;
  auto.active = true;
  auto.playing = true;
  document.body.classList.add('autoplay', 'exploring');
  closeList(); tip.style.opacity = 0;
  const range = getTopicRange(bi);
  const curBi = STEPS[auto.i]?.bi;
  const target = (curBi === bi && auto.i >= range.start && auto.i <= range.end) ? auto.i : range.start;
  syncPlayer();
  goStep(target);
  if (selected === bi) renderPanel(bi);
}

function cycleLoopMode() {
  if (auto.loop === 'off') {
    auto.loop = 'topic';
    auto.loopBi = selected >= 0 ? selected : (STEPS[auto.i]?.bi ?? 0);
  } else if (auto.loop === 'topic') {
    auto.loop = 'all';
    auto.loopBi = -1;
  } else {
    auto.loop = 'off';
    auto.loopBi = -1;
  }
  syncPlayer();
  if (selected >= 0) renderPanel(selected);
}

function setCaption(k, t, d) {
  capEl.classList.remove('show');
  setTimeout(() => {
    capEl.querySelector('.k').textContent = k; capEl.querySelector('.t').textContent = t; capEl.querySelector('.d').textContent = d;
    capEl.classList.add('show');
  }, 260);
}
function clearFlash() { clearTimeout(auto.flashTimer); panel.querySelectorAll('.flash').forEach((el) => el.classList.remove('flash')); }
function runStep() {
  const s = STEPS[auto.i], d = DS[s.bi], n = ORDER.indexOf(d.id) + 1, b = brains[s.bi];
  const wide = isWide();
  if (auto.loop === 'topic') {
    const range = getTopicRange(s.bi);
    const stepInTopic = Math.max(0, auto.i - range.start) + 1;
    pTitle.textContent = `${d.name} · 🔁 Loop (${stepInTopic} / ${range.count})`;
  } else {
    pTitle.textContent = `${d.name} · ${n} / ${ORDER.length}`;
  }
  clearFlash();
  if (s.br < 0) {
    select(s.bi, null, { auto: true, flyMs: 3400 / auto.speed, noPanel: !tourPanel() });
    if (wide) panel.scrollTo({ top: 0, behavior: 'smooth' });
    pulse.set = new Set([b.core]); pulse.until = performance.now() + s.dur / auto.speed;
    setCaption(`${String(n).padStart(2, '0')} / ${ORDER.length} · ${GROUPS[d.group].name} · ${LEVELS[d.level]}`, d.name, d.one);
  } else {
    const B = BRANCHES[s.br], bn = b.branchIdx[s.br];
    const set = new Set([bn]); for (let k = b.first; k < b.first + b.count; k++) if (nodes[k].kind === 'leaf' && nodes[k].branch === s.br) set.add(k);
    pulse.set = set; pulse.until = performance.now() + s.dur / auto.speed;
    const items = d[B.key].slice(0, 5).map((x) => Array.isArray(x) ? `${x[0]}: ${x[1]}` : x);
    setCaption(`${String(n).padStart(2, '0')} · ${d.name}`, B.name, items.join('  ·  '));
    if (panel.classList.contains('open')) {
      const h = panel.querySelector(`[data-sec="${B.key}"]`);
      if (h) panel.scrollTo({ top: h.offsetTop - 16, behavior: 'smooth' });
      panel.querySelectorAll(`[data-item^="${B.key}-"]`).forEach((el) => el.classList.add('flash'));
      auto.flashTimer = setTimeout(clearFlash, s.dur / auto.speed - 300);
    }
  }
}
function goStep(i) { auto.i = Math.max(0, Math.min(STEPS.length - 1, i)); auto.el = 0; runStep(); }
function syncPlayer() {
  ppBtn.innerHTML = auto.playing
    ? '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="1.5" width="2.8" height="9" rx=".6"/><rect x="7.2" y="1.5" width="2.8" height="9" rx=".6"/></svg>'
    : '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M3 1.6v8.8a.6.6 0 0 0 .9.52l7.3-4.4a.6.6 0 0 0 0-1.04L3.9 1.08A.6.6 0 0 0 3 1.6z"/></svg>'; ppBtn.title = auto.playing ? 'Pause (space)' : 'Play (space)';
  spdBtn.textContent = auto.speed + '×';
  const pb = playerEl.querySelector('[data-p="panel"]'), cb = playerEl.querySelector('[data-p="caps"]');
  pb.classList.toggle('off', !auto.showPanel); pb.title = (auto.showPanel ? 'Hide' : 'Show') + ' side panel (P)';
  cb.classList.toggle('off', !auto.showCaps); cb.title = (auto.showCaps ? 'Hide' : 'Show') + ' captions (C)';
  const lb = playerEl.querySelector('[data-p="loop"]');
  if (lb) {
    lb.classList.remove('off', 'topic', 'all');
    lb.classList.add(auto.loop);
    const topicName = DS[auto.loopBi >= 0 ? auto.loopBi : STEPS[auto.i]?.bi]?.name || 'topic';
    lb.title = auto.loop === 'topic' ? `Looping ${topicName} (L)` : auto.loop === 'all' ? 'Looping all topics (L)' : 'Loop: Off (L)';
  }
  document.body.classList.toggle('no-caps', !auto.showCaps);
  syncPlayBtn();
  document.body.classList.toggle('auto-paused', auto.active && !auto.playing);
  if (!auto.playing) document.body.classList.remove('idle'); else wake();
  if (selected >= 0 && panel.classList.contains('open')) {
    const loopBtn = panel.querySelector('.loop-topic-btn');
    if (loopBtn) {
      const isLoopingThis = auto.active && auto.loop === 'topic' && (auto.loopBi === selected || (auto.loopBi < 0 && STEPS[auto.i]?.bi === selected));
      loopBtn.classList.toggle('on', isLoopingThis);
      loopBtn.textContent = isLoopingThis && auto.playing ? '❚❚ Looping topic' : '▶ Play in loop';
    }
  }
}
function startAuto() {
  const from = selected >= 0 ? STEPS.findIndex((s) => s.bi === selected && s.br < 0) : 0;
  auto.active = true; auto.playing = true;
  document.body.classList.add('autoplay', 'exploring');
  closeList(); tip.style.opacity = 0;
  syncPlayer(); goStep(from < 0 ? 0 : from);
}
function pauseAuto() { if (!auto.active) return; auto.playing = false; syncPlayer(); }
function toggleAuto() {
  if (!auto.active) return startAuto();
  auto.playing = !auto.playing;
  if (auto.playing && selected !== STEPS[auto.i].bi) goStep(auto.i);
  syncPlayer();
  if (selected >= 0) renderPanel(selected);
}
function setTourPanel(v) {
  auto.showPanel = v; try { localStorage.setItem('csmap-tour-panel', v ? 'on' : 'off'); } catch (e) {}
  syncPlayer();
  if (!auto.active || selected < 0) return;
  if (tourPanel()) { panel.classList.add('open'); document.body.classList.add('panel-open'); }
  else { panel.classList.remove('open'); document.body.classList.remove('panel-open'); clearFlash(); }
  focusCam(selected, 1400, !tourPanel());
}
function setTourCaps(v) {
  auto.showCaps = v; try { localStorage.setItem('csmap-tour-caps', v ? 'on' : 'off'); } catch (e) {}
  syncPlayer();
}
function syncPlayBtn() {
  const b = document.getElementById('playBtn');
  b.textContent = !auto.active ? '▶ Play tour' : auto.playing ? '❚❚ Pause tour' : '▶ Resume tour';
}
function stopAuto() {
  auto.active = false; auto.playing = false; clearFlash(); pulse.until = 0;
  capEl.classList.remove('show'); document.body.classList.remove('autoplay', 'auto-paused', 'idle'); syncPlayBtn();
  if (selected >= 0) renderPanel(selected);
}
function autoJump(dir) {
  const cur = ORDER.indexOf(DS[STEPS[auto.i].bi].id);
  const next = (cur + dir + ORDER.length) % ORDER.length;
  const nextBi = byId[ORDER[next]];
  if (auto.loop === 'topic') {
    auto.loopBi = nextBi;
  }
  goStep(STEPS.findIndex((s) => s.bi === nextBi && s.br < 0));
  if (selected >= 0) renderPanel(nextBi);
}
function tickAuto(dt) {
  if (!auto.active) return;
  if (auto.playing) {
    auto.el += dt * 1000 * auto.speed;
    if (auto.el >= STEPS[auto.i].dur) {
      if (auto.loop === 'topic') {
        const range = getTopicRange(auto.loopBi >= 0 ? auto.loopBi : STEPS[auto.i].bi);
        if (auto.i >= range.end) {
          goStep(range.start);
        } else {
          goStep(auto.i + 1);
        }
      } else if (auto.i >= STEPS.length - 1) {
        if (auto.loop === 'all') {
          goStep(0);
        } else {
          stopAuto(); deselect(); overview(2600); return;
        }
      } else {
        goStep(auto.i + 1);
      }
    }
    if (!tween && !dragging) {
      const off = camera.position.clone().sub(controls.target).applyAxisAngle(Y, dt * .05 * auto.speed);
      camera.position.copy(controls.target).add(off);
    }
  }
  if (auto.loop === 'topic') {
    const range = getTopicRange(auto.loopBi >= 0 ? auto.loopBi : STEPS[auto.i].bi);
    const stepInTopic = Math.max(0, auto.i - range.start);
    const frac = (stepInTopic + Math.min(1, auto.el / STEPS[auto.i].dur)) / range.count;
    pFill.style.width = (frac * 100).toFixed(2) + '%';
  } else {
    pFill.style.width = ((auto.i + Math.min(1, auto.el / STEPS[auto.i].dur)) / STEPS.length * 100).toFixed(2) + '%';
  }
}
playerEl.addEventListener('click', (e) => {
  const b = e.target.closest('[data-p]'); if (!b) return;
  const p = b.dataset.p;
  if (p === 'toggle') toggleAuto();
  else if (p === 'next') autoJump(1);
  else if (p === 'prev') autoJump(-1);
  else if (p === 'loop') cycleLoopMode();
  else if (p === 'stop') stopAuto();
  else if (p === 'panel') setTourPanel(!auto.showPanel);
  else if (p === 'caps') setTourCaps(!auto.showCaps);
  else if (p === 'speed') { auto.speed = SPEEDS[(SPEEDS.indexOf(auto.speed) + 1) % SPEEDS.length]; syncPlayer(); }
});
document.getElementById('playBtn').addEventListener('click', () => auto.active ? toggleAuto() : startAuto());
document.getElementById('playHero').addEventListener('click', startAuto);

// ---------- big-screen comforts ----------
let idleTimer = 0;
function wake() {
  document.body.classList.remove('idle'); clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { if (auto.playing) document.body.classList.add('idle'); }, 3000);
}
['pointermove', 'pointerdown', 'keydown', 'wheel'].forEach((ev) => addEventListener(ev, wake, { passive: true }));
async function toggleFullscreen(btn) {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch (e) {
    if (btn) { const t = btn.innerHTML; btn.textContent = 'Not allowed here'; setTimeout(() => { btn.innerHTML = t; }, 1800); }
  }
}
document.getElementById('themeBtn').addEventListener('click', toggleTheme);
document.querySelectorAll('[data-fs]').forEach((b) => b.addEventListener('click', () => toggleFullscreen(b)));
applyTheme();

// ---------- loop ----------
renderProgress(); refreshChecks();
step(0); overview(0); paint();
fromHash();
const t0 = performance.now(); window.__t0 = t0;
let lastNow = t0;
function frame(now) {
  const t = (now - t0) / 1000, dt = Math.min(.05, (now - lastNow) / 1000); lastNow = now;
  step(t);
  tickAuto(dt);
  if (tween) {
    const k = Math.min(1, (now - tween.start) / tween.ms), e = ease(k);
    camera.position.lerpVectors(tween.p0, tween.p1, e); controls.target.lerpVectors(tween.t0, tween.t1, e);
    if (k >= 1) tween = null;
  }
  if (follow >= 0) {
    const c = centerOf(follow, _v); const dlt = c.clone().sub(followLast); followLast.copy(c);
    if (!dragging) {
      camera.position.add(dlt); controls.target.add(dlt);
      if (tween) { tween.p1.add(dlt); tween.t1.add(dlt); }
    }
  }
  controls.update();
  paint();
  updateLabels();
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
