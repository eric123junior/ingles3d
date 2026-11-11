// O cenário: ilha, casas, caminhos, árvores, pomar, arena do minijogo e ponte para a próxima área.
// O formato é o mesmo para todos; o tema (js/themes.js) muda cores, placas, construções e enfeites.
import * as THREE from 'three';
import {
  toon, mesh, ball, makeTree, makeHouse, makeFlowerPatch, makeFence, makeSign, makeFruit,
  makeNumberBlock, makeLabel, textCanvas, CYL, BOX, CONE, SPH,
} from './models.js';
import { makePerson } from './people.js';

export const ISLAND_R = 34;

function rng(seed) {
  return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
}

// Vira o objeto para olhar um ponto (no plano XZ)
function face(obj, tx, tz) { obj.rotation.y = Math.atan2(tx - obj.position.x, tz - obj.position.z); }


// ---------- Peças extras de cenário (usadas conforme o tema) ----------
function makePalm(s = 1) {
  const g = new THREE.Group();
  const trunk = toon('#b98f5f');
  let x = 0;
  for (let i = 0; i < 5; i++) {
    x = i * i * 0.035;
    g.add(mesh(CYL, trunk, [x, 0.36 + i * 0.68, 0], [0.2 - i * 0.018, 0.72, 0.2 - i * 0.018]));
  }
  const top = 0.36 + 4 * 0.68 + 0.4;
  const leaf = toon('#58b860');
  for (let k = 0; k < 7; k++) {
    const arm = new THREE.Group();
    arm.position.set(x, top, 0);
    arm.rotation.y = k / 7 * Math.PI * 2;
    const l = ball(leaf, [1.0, -0.22, 0], [1.1, 0.09, 0.3]);
    l.rotation.z = -0.38;
    arm.add(l);
    g.add(arm);
  }
  g.add(ball(toon('#8a5a3a'), [x + 0.15, top - 0.12, 0.1], 0.14));
  g.add(ball(toon('#8a5a3a'), [x - 0.12, top - 0.14, -0.1], 0.14));
  g.scale.setScalar(s);
  return g;
}

function makeBush(flower) {
  const g = new THREE.Group();
  const m = toon('#58b060');
  g.add(ball(m, [0, 0.45, 0], [0.75, 0.55, 0.75]));
  g.add(ball(m, [0.5, 0.35, 0.15], 0.45));
  g.add(ball(m, [-0.45, 0.38, -0.1], 0.48));
  if (flower) for (let k = 0; k < 6; k++) {
    const a = k * 1.05;
    g.add(ball(toon(flower), [Math.cos(a) * 0.55, 0.62 + (k % 2) * 0.18, Math.sin(a) * 0.55], 0.1, false));
  }
  return g;
}

// arbusto podado em bolas (topiaria)
function makeTopiary() {
  const g = new THREE.Group();
  const m = toon('#4aa35a');
  g.add(mesh(CYL, toon('#c9825a'), [0, 0.2, 0], [0.34, 0.4, 0.34]));
  g.add(mesh(CYL, toon('#a0714f'), [0, 0.8, 0], [0.07, 0.9, 0.07]));
  g.add(ball(m, [0, 1.0, 0], 0.5));
  g.add(ball(m, [0, 1.75, 0], 0.34));
  return g;
}

function makePot(flower) {
  const g = new THREE.Group();
  g.add(mesh(CYL, toon('#c9825a'), [0, 0.16, 0], [0.2, 0.32, 0.2]));
  g.add(ball(toon('#5fb85a'), [0, 0.45, 0], [0.2, 0.26, 0.2], false));
  if (flower) g.add(ball(toon(flower), [0, 0.7, 0], 0.1, false));
  return g;
}

// janelas dos prédios (uma textura só, repetida)
let winTex = null;
function windowTexture() {
  if (!winTex) {
    const c = document.createElement('canvas'); c.width = 64; c.height = 64;
    const x = c.getContext('2d');
    x.fillStyle = '#bfe9ff'; x.fillRect(12, 12, 40, 40);
    x.fillStyle = '#ffffff'; x.fillRect(30, 12, 4, 40); x.fillRect(12, 30, 40, 4);
    winTex = new THREE.CanvasTexture(c);
    winTex.colorSpace = THREE.SRGBColorSpace;
  }
  return winTex;
}

function makeBuilding(wall, roof, w = 4.4, d = 3.6, h = 5.6, door = true, doorColor = '#8a5a44') {
  const g = new THREE.Group();
  const walls = mesh(BOX, toon(wall), [0, h / 2, 0], [w, h, d]);
  walls.receiveShadow = true; g.add(walls);
  g.add(mesh(BOX, toon(roof), [0, h + 0.15, 0], [w + 0.4, 0.3, d + 0.4]));
  const cols = Math.max(2, Math.round(w / 1.4)), rows = Math.max(1, Math.round((h - 2.4) / 1.5));
  const tex = windowTexture().clone();
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(cols, rows); tex.needsUpdate = true;
  const win = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.88, rows * 1.4), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
  win.position.set(0, 2.2 + rows * 0.7, d / 2 + 0.02);
  g.add(win);
  if (door) {
    g.add(mesh(BOX, toon(doorColor), [0, 0.8, d / 2 + 0.02], [1.0, 1.6, 0.08], false));
    g.add(ball(toon('#ffd36b'), [0.3, 0.8, d / 2 + 0.08], 0.06, false));
    const aw = mesh(BOX, toon(roof), [0, 1.95, d / 2 + 0.45], [1.8, 0.08, 0.9]);
    aw.rotation.x = 0.3; g.add(aw);
    for (const sx of [-1, 1]) g.add(mesh(BOX, toon('#7a8a5a'), [sx * 1.4, 0.25, d / 2 + 0.35], [0.5, 0.5, 0.5]), ball(toon('#58b060'), [sx * 1.4, 0.7, d / 2 + 0.35], 0.36));
  }
  return g;
}

// casa de teto reto (vila bíblica)
function makeFlatHouse(wall, trim, w = 4, d = 3.6, h = 2.5) {
  const g = new THREE.Group();
  const walls = mesh(BOX, toon(wall), [0, h / 2, 0], [w, h, d]);
  walls.receiveShadow = true; g.add(walls);
  g.add(mesh(BOX, toon(trim), [0, h + 0.1, 0], [w + 0.3, 0.2, d + 0.3]));
  g.add(mesh(BOX, toon(wall), [-w * 0.22, h + 0.75, -d * 0.18], [w * 0.46, 1.1, d * 0.5]));
  g.add(mesh(BOX, toon(trim), [-w * 0.22, h + 1.36, -d * 0.18], [w * 0.46 + 0.25, 0.14, d * 0.5 + 0.25]));
  g.add(mesh(BOX, toon('#6b4a36'), [0, 0.75, d / 2 + 0.02], [0.9, 1.5, 0.08], false));
  const arch = mesh(CYL, toon('#6b4a36'), [0, 1.5, d / 2 + 0.02], [0.45, 0.08, 0.45], false);
  arch.rotation.x = Math.PI / 2; g.add(arch);
  for (const sx of [-1, 1]) g.add(mesh(BOX, toon('#6b4a36'), [sx * w * 0.32, 1.6, d / 2 + 0.02], [0.45, 0.55, 0.06], false));
  const aw = mesh(BOX, toon('#c8553d'), [0, 2.0, d / 2 + 0.55], [1.9, 0.06, 1.0]);
  aw.rotation.x = 0.28; g.add(aw);
  for (const sx of [-1, 1]) g.add(mesh(CYL, toon('#8a6248'), [sx * 0.85, 0.9, d / 2 + 1.0], [0.05, 1.8, 0.05]));
  return g;
}

function makeTent(c1, c2) {
  const g = new THREE.Group();
  g.add(mesh(CONE, toon(c1), [0, 1.7, 0], [2.7, 3.4, 2.7]));
  g.add(mesh(CYL, toon(c2), [0, 0.2, 0], [2.72, 0.4, 2.72]));
  g.add(mesh(CONE, toon('#5a3a2a'), [0, 0.95, 1.95], [0.8, 1.9, 0.22], false));
  g.add(mesh(CYL, toon('#8a6248'), [0, 3.7, 0], [0.06, 1.0, 0.06]));
  g.add(mesh(BOX, toon(c2), [0.32, 4.0, 0], [0.6, 0.34, 0.04]));
  return g;
}

function makeWell() {
  const g = new THREE.Group();
  g.add(mesh(CYL, toon('#cdbfae'), [0, 0.4, 0], [0.95, 0.8, 0.95]));
  g.add(mesh(CYL, toon('#6ec6e4'), [0, 0.81, 0], [0.78, 0.04, 0.78], false));
  for (const sx of [-1, 1]) g.add(mesh(BOX, toon('#8a6248'), [sx * 0.85, 1.4, 0], [0.12, 2.0, 0.12]));
  g.add(mesh(BOX, toon('#8a6248'), [0, 2.1, 0], [1.9, 0.1, 0.1]));
  g.add(mesh(CONE, toon('#c8553d'), [0, 2.65, 0], [1.4, 0.8, 1.0]));
  g.add(mesh(CYL, toon('#a0714f'), [0, 1.35, 0], [0.16, 0.26, 0.16]));
  g.add(mesh(CYL, toon('#e9dcc0'), [0, 1.75, 0], [0.015, 0.7, 0.015], false));
  return g;
}

function makeSheep() {
  const g = new THREE.Group();
  const wool = toon('#fffaf0'), dark = toon('#4a4048');
  g.add(ball(wool, [0, 0.55, 0], [0.42, 0.36, 0.58]));
  g.add(ball(wool, [0, 0.8, 0.42], 0.22));
  g.add(ball(dark, [0, 0.72, 0.6], [0.15, 0.17, 0.19]));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(mesh(CYL, dark, [sx * 0.2, 0.15, sz * 0.3], [0.05, 0.3, 0.05]));
  return g;
}

function makeArk() {
  const g = new THREE.Group();
  const wood = toon('#a0714f'), dark = toon('#8a5a3a');
  g.add(mesh(BOX, wood, [0, 0.9, 0], [9, 1.8, 3.2]));
  for (const sx of [-1, 1]) { const c = mesh(CONE, wood, [sx * 5.3, 0.9, 0], [0.9, 1.8, 1.6]); c.rotation.z = -sx * Math.PI / 2; g.add(c); }
  g.add(mesh(BOX, dark, [0, 1.85, 0], [9.4, 0.14, 3.5]));
  g.add(mesh(BOX, toon('#c99368'), [0, 2.7, 0], [5.4, 1.6, 2.4]));
  const roof = mesh(CONE, toon('#c8553d'), [0, 4.0, 0], [3.2, 1.1, 1.9]);
  g.add(roof);
  for (let i = 0; i < 4; i++) g.add(mesh(BOX, toon('#5a3a2a'), [-1.8 + i * 1.2, 2.8, 1.22], [0.5, 0.6, 0.06], false));
  return g;
}

function makeRainbow(r = 40) {
  const g = new THREE.Group();
  ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#a855f7'].forEach((c, i) => {
    const m = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.75, fog: false });
    g.add(new THREE.Mesh(new THREE.TorusGeometry(r - i * 1.3, 0.65, 6, 48, Math.PI), m));
  });
  return g;
}

// ---------- Nova York (Ellen) ----------
// escada de incêndio na frente do prédio
function makeFireEscape(w, h, d) {
  const g = new THREE.Group();
  const m = toon('#2f2a36');
  for (let y = 2.6; y < h - 0.6; y += 1.6) {
    g.add(mesh(BOX, m, [0, y, d / 2 + 0.45], [w * 0.55, 0.06, 0.9], false));
    g.add(mesh(BOX, m, [0, y + 0.45, d / 2 + 0.88], [w * 0.55, 0.05, 0.05], false));
    for (let k = 0; k < 5; k++) g.add(mesh(BOX, m, [-w * 0.27 + k * w * 0.135, y + 0.22, d / 2 + 0.88], [0.04, 0.45, 0.04], false));
    const st = mesh(BOX, m, [0, y + 0.8, d / 2 + 0.45], [0.18, 1.7, 0.06], false);
    st.rotation.z = 0.9; g.add(st);
  }
  return g;
}

// o sofá laranja (Central Perk)
function makeCouch() {
  const g = new THREE.Group();
  const m = toon('#e07a2e'), legs = toon('#5a3a2a');
  g.add(mesh(BOX, m, [0, 0.42, 0], [2.4, 0.32, 0.95]));
  g.add(mesh(BOX, m, [0, 0.85, -0.38], [2.4, 0.7, 0.24]));
  for (const s of [-1, 1]) g.add(mesh(BOX, m, [s * 1.2, 0.62, 0], [0.24, 0.48, 0.95]));
  for (let i = 0; i < 3; i++) g.add(ball(toon('#ef8d40'), [-0.78 + i * 0.78, 0.62, 0.05], [0.37, 0.09, 0.4], false));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(mesh(CYL, legs, [sx * 1.1, 0.13, sz * 0.38], [0.06, 0.26, 0.06], false));
  return g;
}

// fachada do Central Perk: tijolo, vitrine grande e letreiro verde
function makeCafe(w = 6.4, d = 4.2, h = 4.6) {
  const g = makeBuilding('#7a4a34', '#4a2f22', w, d, h, false);
  g.add(mesh(BOX, toon('#2f5a40'), [0, 1.3, d / 2 + 0.03], [w * 0.92, 2.6, 0.06], false));
  for (const s of [-1, 1]) {
    g.add(mesh(BOX, toon('#bfe9ff'), [s * w * 0.27, 1.35, d / 2 + 0.08], [w * 0.34, 1.7, 0.04], false));
    g.add(mesh(BOX, toon('#f6e7c8'), [s * w * 0.27, 1.35, d / 2 + 0.11], [0.06, 1.7, 0.03], false));
  }
  g.add(mesh(BOX, toon('#5a3a2a'), [0, 1.0, d / 2 + 0.08], [1.1, 2.0, 0.05], false));
  const tex = textCanvas(['Central Perk'], { w: 512, h: 128, bg: '#2f5a40', fg: '#f6e7c8', border: '#f6e7c8', font: 70, radius: 18 });
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 0.9), new THREE.MeshBasicMaterial({ map: tex }));
  sign.position.set(0, 2.95, d / 2 + 0.1);
  g.add(sign);
  const aw = mesh(BOX, toon('#2f5a40'), [0, 2.35, d / 2 + 0.55], [w * 0.95, 0.08, 1.1]);
  aw.rotation.x = 0.3; g.add(aw);
  return g;
}

function makeTaxi() {
  const g = new THREE.Group();
  const y = toon('#ffc928'), dark = toon('#2f2a36');
  g.add(mesh(BOX, y, [0, 0.5, 0], [1.3, 0.5, 2.6]));
  g.add(mesh(BOX, y, [0, 0.95, -0.1], [1.15, 0.45, 1.4]));
  g.add(mesh(BOX, toon('#bfe9ff'), [0, 0.98, 0.6], [1.05, 0.34, 0.04], false));
  g.add(mesh(BOX, toon('#bfe9ff'), [0, 0.98, -0.8], [1.05, 0.34, 0.04], false));
  g.add(mesh(BOX, toon('#ffffff'), [0, 1.27, -0.1], [0.5, 0.16, 0.22], false));
  g.add(mesh(BOX, dark, [0, 0.55, 0], [1.32, 0.08, 2.62], false));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const wh = mesh(CYL, dark, [sx * 0.62, 0.25, sz * 0.85], [0.25, 0.16, 0.25]);
    wh.rotation.z = Math.PI / 2; g.add(wh);
  }
  for (const sx of [-1, 1]) g.add(ball(toon('#fff4b0'), [sx * 0.42, 0.55, 1.31], 0.09, false));
  return g;
}

function makeFoosball() {
  const g = new THREE.Group();
  g.add(mesh(BOX, toon('#5a3a2a'), [0, 0.7, 0], [1.1, 0.3, 1.8]));
  g.add(mesh(BOX, toon('#3fa34d'), [0, 0.86, 0], [0.95, 0.02, 1.65], false));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(mesh(BOX, toon('#5a3a2a'), [sx * 0.45, 0.28, sz * 0.75], [0.12, 0.56, 0.12]));
  for (let i = 0; i < 4; i++) {
    const z = -0.6 + i * 0.4;
    const rod = mesh(CYL, toon('#c9c2d6'), [0, 0.95, z], [0.02, 1.6, 0.02], false);
    rod.rotation.z = Math.PI / 2; g.add(rod);
    for (let k = -1; k <= 1; k++) g.add(ball(toon(i % 2 ? '#3b82f6' : '#ef4444'), [k * 0.28, 0.93, z], [0.05, 0.1, 0.05], false));
  }
  return g;
}

function makeHydrant() {
  const g = new THREE.Group();
  const r = toon('#e2403a');
  g.add(mesh(CYL, r, [0, 0.3, 0], [0.16, 0.6, 0.16]));
  g.add(ball(r, [0, 0.62, 0], 0.17));
  for (const s of [-1, 1]) { const n = mesh(CYL, r, [s * 0.18, 0.4, 0], [0.07, 0.14, 0.07], false); n.rotation.z = Math.PI / 2; g.add(n); }
  return g;
}

function makeHotDogCart() {
  const g = new THREE.Group();
  g.add(mesh(BOX, toon('#d9d4e8'), [0, 0.75, 0], [1.6, 0.8, 0.9]));
  g.add(mesh(BOX, toon('#e2403a'), [0, 0.95, 0.46], [1.6, 0.3, 0.02], false));
  for (const s of [-1, 1]) { const w = mesh(CYL, toon('#2f2a36'), [s * 0.55, 0.25, 0.48], [0.25, 0.08, 0.25]); w.rotation.x = Math.PI / 2; g.add(w); }
  g.add(mesh(CYL, toon('#9aa3b2'), [0.6, 1.5, 0], [0.03, 1.2, 0.03], false));
  for (let i = 0; i < 6; i++) g.add(mesh(BOX, toon(i % 2 ? '#ffffff' : '#ffd54d'), [-0.15 + i * 0.25 - 0.5, 2.1, 0], [0.25, 0.06, 1.6]));
  return g;
}

// prédio bem alto com antena, ao longe
function makeSkyTower() {
  const g = new THREE.Group();
  const m = toon('#c9c2d6');
  g.add(mesh(BOX, m, [0, 6, 0], [4, 12, 4]));
  g.add(mesh(BOX, m, [0, 14, 0], [3, 4, 3]));
  g.add(mesh(BOX, m, [0, 17.5, 0], [2, 3, 2]));
  g.add(mesh(BOX, m, [0, 19.8, 0], [1.2, 1.6, 1.2]));
  g.add(mesh(CYL, toon('#9aa3b2'), [0, 22.5, 0], [0.12, 4, 0.12]));
  return g;
}

// ---------- Bíblia (Carla) ----------
// boneco parado com nome em cima (Maria, José, Noé, Davi...)
function makeFigure(look, name, labelY = 2.25) {
  const p = makePerson(look);
  if (name) { const tag = makeLabel(name, { size: 1.3 }); tag.position.y = labelY; p.root.add(tag); }
  return p.root;
}

function makeStable() {
  const g = new THREE.Group();
  const wood = toon('#9a6a46'), dark = toon('#6b4a36');
  g.add(mesh(BOX, wood, [0, 1.4, -1.4], [5, 2.8, 0.2]));
  for (const s of [-1, 1]) g.add(mesh(BOX, wood, [s * 2.4, 1.4, -0.3], [0.2, 2.8, 2.4]));
  for (const sx of [-1, 1]) g.add(mesh(CYL, dark, [sx * 2.4, 1.5, 1.0], [0.12, 3, 0.12]));
  const roof = mesh(BOX, toon('#c9a063'), [0, 3.05, -0.2], [5.6, 0.16, 3.2]);
  roof.rotation.x = -0.18; g.add(roof);
  for (let i = 0; i < 6; i++) g.add(ball(toon('#e9c46a'), [-2 + i * 0.8, 0.12, -0.6 + (i % 2) * 0.5], [0.4, 0.12, 0.3], false)); // palha
  // manjedoura com o bebê
  const crib = new THREE.Group();
  crib.add(mesh(BOX, dark, [0, 0.45, 0], [1.0, 0.3, 0.55]));
  for (const s of [-1, 1]) { const l = mesh(BOX, dark, [s * 0.4, 0.22, 0], [0.08, 0.5, 0.5]); l.rotation.z = s * 0.3; crib.add(l); }
  crib.add(ball(toon('#e9c46a'), [0, 0.62, 0], [0.45, 0.08, 0.24], false));
  crib.add(ball(toon('#fffaf0'), [0, 0.7, 0], [0.28, 0.12, 0.14], false));
  crib.add(ball(toon('#e0b08a'), [0.2, 0.74, 0], 0.09, false));
  crib.position.set(0, 0, 0.1);
  g.add(crib);
  // estrela de Belém
  const star = new THREE.Group();
  for (let k = 0; k < 4; k++) { const r = mesh(CONE, toon('#ffe066'), [0, 0, 0], [0.18, 0.9, 0.1], false); r.rotation.z = k * Math.PI / 2; star.add(r); }
  star.add(ball(toon('#fff4b0'), [0, 0, 0], 0.22, false));
  star.position.set(0, 4.6, 0);
  g.add(star);
  g.userData.star = star;
  return g;
}

function makeCamel() {
  const g = new THREE.Group();
  const m = toon('#d9a066');
  g.add(ball(m, [0, 1.25, 0], [0.45, 0.4, 0.85]));
  g.add(ball(m, [0, 1.62, -0.15], [0.32, 0.3, 0.38]));
  const neck = mesh(CYL, m, [0, 1.65, 0.85], [0.14, 0.9, 0.14]); neck.rotation.x = 0.55; g.add(neck);
  g.add(ball(m, [0, 2.05, 1.2], [0.18, 0.17, 0.3]));
  g.add(ball(toon('#2b2233'), [0.12, 2.12, 1.28], 0.03, false), ball(toon('#2b2233'), [-0.12, 2.12, 1.28], 0.03, false));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(mesh(CYL, m, [sx * 0.25, 0.5, sz * 0.5], [0.07, 1.0, 0.07]));
  g.add(mesh(BOX, toon('#c8553d'), [0, 1.62, 0.25], [0.7, 0.05, 0.5], false));
  return g;
}

function makeBoat() {
  const g = new THREE.Group();
  const wood = toon('#8a5a3a');
  g.add(mesh(BOX, wood, [0, 0.35, 0], [1.6, 0.6, 4]));
  for (const s of [-1, 1]) { const c = mesh(CONE, wood, [0, 0.35, s * 2.4], [0.8, 0.8, 0.3]); c.rotation.x = s * Math.PI / 2; g.add(c); }
  g.add(mesh(CYL, toon('#6b4a36'), [0, 2.0, 0.3], [0.07, 3.2, 0.07]));
  const sail = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.2), toon('#fff4e0', { side: THREE.DoubleSide }));
  sail.position.set(0, 2.2, 0.32); sail.rotation.y = Math.PI / 2; g.add(sail);
  // rede de pesca
  g.add(ball(toon('#d8c4a0'), [0.5, 0.75, -1.2], [0.35, 0.18, 0.5], false));
  return g;
}

// muralha de pedra com portão em arco (Jerusalém, ao longe)
function makeCityWall() {
  const g = new THREE.Group();
  const st = toon('#e3cf9f'), top = toon('#cdb37f');
  for (const s of [-1, 1]) {
    g.add(mesh(BOX, st, [0, 2.2, s * 6.5], [1.4, 4.4, 9]));
    for (let i = 0; i < 6; i++) g.add(mesh(BOX, top, [0, 4.65, s * (2.6 + i * 1.6)], [1.5, 0.5, 0.8]));
    g.add(mesh(BOX, st, [0, 3, s * 2.4], [2.2, 6, 1.8]));
  }
  g.add(mesh(BOX, st, [0, 5.0, 0], [1.4, 1.6, 3.2]));
  const arch = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.3, 8, 16, Math.PI), top);
  arch.position.set(0.72, 4.15, 0); arch.rotation.y = Math.PI / 2; g.add(arch);
  return g;
}

// ---------- Jardim botânico (Eric) ----------
function makeGreenhouse(wall, roof) {
  const g = new THREE.Group();
  const w = 4.4, d = 3.6, h = 2.4;
  const glass = toon('#cfeff6', { transparent: true, opacity: 0.45 });
  const frame = toon('#ffffff');
  g.add(mesh(BOX, glass, [0, h / 2, 0], [w, h, d], false));
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2, 0); shape.lineTo(w / 2, 0); shape.lineTo(0, 1.4); shape.lineTo(-w / 2, 0);
  const rg = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: false }); rg.translate(0, 0, -d / 2);
  const r = new THREE.Mesh(rg, glass); r.position.y = h; g.add(r);
  for (const sx of [-1, -0.5, 0, 0.5, 1]) for (const sz of [-1, 1]) g.add(mesh(BOX, frame, [sx * w / 2, h / 2, sz * d / 2], [0.07, h, 0.07], false));
  for (const sz of [-1, 1]) g.add(mesh(BOX, frame, [0, h, sz * d / 2], [w, 0.07, 0.07], false));
  g.add(mesh(BOX, frame, [0, h + 1.4, 0], [0.08, 0.08, d], false));
  // plantas lá dentro
  for (let i = 0; i < 6; i++) {
    const x = -1.6 + (i % 3) * 1.6, z = i < 3 ? -0.9 : 0.7;
    g.add(mesh(BOX, toon('#8a6248'), [x, 0.35, z], [1.2, 0.7, 0.6], false));
    g.add(ball(toon(['#5fb85a', '#7ccf6b', '#4aa35a'][i % 3]), [x, 0.95, z], [0.55, 0.4, 0.3], false));
    g.add(ball(toon(['#ff8fab', '#ffd54d', '#b8a4ff'][i % 3]), [x + 0.2, 1.25, z + 0.1], 0.12, false));
  }
  g.add(mesh(BOX, toon(roof), [0, 0.9, d / 2 + 0.02], [1.0, 1.8, 0.06], false));
  return g;
}

function makePond() {
  const g = new THREE.Group();
  const water = new THREE.Mesh(new THREE.CircleGeometry(3.2, 32), toon('#74cdea'));
  water.rotation.x = -Math.PI / 2; water.position.y = 0.04; g.add(water);
  for (let i = 0; i < 18; i++) {
    const a = i / 18 * Math.PI * 2;
    g.add(ball(toon('#c9c2d6'), [Math.cos(a) * 3.3, 0.12, Math.sin(a) * 3.3], [0.45, 0.22, 0.35], false));
  }
  [[1, 0.6], [-1.2, -0.4], [0.2, -1.5], [-0.4, 1.4], [1.6, -1.0]].forEach(([x, z], i) => {
    g.add(mesh(CYL, toon('#5fb85a'), [x, 0.07, z], [0.42, 0.02, 0.42], false));
    if (i % 2 === 0) g.add(ball(toon('#ff9ebb'), [x + 0.1, 0.18, z], [0.16, 0.12, 0.16], false));
  });
  // sapinho
  g.add(ball(toon('#58b060'), [-1.2, 0.2, -0.4], [0.16, 0.12, 0.14]));
  g.add(ball(toon('#ffffff'), [-1.25, 0.3, -0.33], 0.04, false), ball(toon('#ffffff'), [-1.15, 0.3, -0.33], 0.04, false));
  return g;
}

function makeMower() {
  const g = new THREE.Group();
  g.add(mesh(BOX, toon('#e2403a'), [0, 0.35, 0], [0.8, 0.3, 0.9]));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) { const w = mesh(CYL, toon('#2f2a36'), [sx * 0.42, 0.15, sz * 0.32], [0.15, 0.08, 0.15]); w.rotation.z = Math.PI / 2; g.add(w); }
  for (const s of [-1, 1]) { const h = mesh(CYL, toon('#9aa3b2'), [s * 0.3, 0.75, -0.75], [0.03, 1.1, 0.03], false); h.rotation.x = -0.75; g.add(h); }
  g.add(mesh(CYL, toon('#2f2a36'), [0, 1.15, -1.15], [0.03, 0.66, 0.03], false).rotateZ(Math.PI / 2));
  return g;
}

// árvore grande com corda e escada (trabalho do podador)
function makeBigOak() {
  const g = new THREE.Group();
  g.add(makeTree(0, 2.3));
  g.add(mesh(CYL, toon('#f0d58a'), [1.3, 2.0, 0.4], [0.025, 4.0, 0.025], false));
  const ld = new THREE.Group();
  for (const sx of [-1, 1]) ld.add(mesh(BOX, toon('#d9a066'), [sx * 0.3, 1.6, 0], [0.07, 3.2, 0.07]));
  for (let i = 0; i < 8; i++) ld.add(mesh(BOX, toon('#d9a066'), [0, 0.3 + i * 0.4, 0], [0.6, 0.06, 0.06]));
  ld.rotation.x = 0.3; ld.position.set(-0.2, 0, 1.0);
  g.add(ld);
  return g;
}

// enfeite gigante no teto da "padaria" de cada tema
function makeRoofIcon(style) {
  const g = new THREE.Group();
  if (style === 'garden') { // flor
    g.add(mesh(CYL, toon('#5fae55'), [0, -0.2, 0], [0.07, 0.8, 0.07]));
    for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; g.add(ball(toon('#ff8fab'), [Math.cos(a) * 0.42, 0.4 + Math.sin(a) * 0.42, 0], [0.26, 0.26, 0.12])); }
    g.add(ball(toon('#ffd54d'), [0, 0.4, 0.05], [0.24, 0.24, 0.14]));
  } else if (style === 'city') { // xícara de café
    g.add(mesh(CYL, toon('#ffffff'), [0, 0.1, 0], [0.62, 0.8, 0.62]));
    g.add(mesh(CYL, toon('#7b4a2e'), [0, 0.51, 0], [0.54, 0.02, 0.54], false));
    const h = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.08, 8, 16), toon('#ffffff'));
    h.position.set(0.72, 0.1, 0); g.add(h);
    g.add(mesh(CYL, toon('#ffffff'), [0, -0.34, 0], [0.85, 0.08, 0.85]));
    for (let k = 0; k < 3; k++) g.add(ball(toon('#ffffff', { transparent: true, opacity: 0.7 }), [-0.2 + k * 0.2, 0.9 + k * 0.28, 0], 0.13 - k * 0.02, false));
  } else { // pão
    g.add(ball(toon('#e9a35b'), [0, 0, 0], [0.9, 0.5, 0.6]));
    if (style === 'bible') for (let k = 0; k < 3; k++) g.add(mesh(BOX, toon('#c98a4b'), [-0.4 + k * 0.4, 0.42, 0], [0.08, 0.12, 0.7], false));
  }
  return g;
}

export function buildWorld(scene, theme) {
  const style = theme.style;
  const SIGN = theme.signs;
  const colliders = [];
  const reserved = []; // áreas sem árvores
  const anim = [];     // coisas animadas
  const R = rng(7);
  const addCol = (x, z, r) => colliders.push({ x, z, r });
  const reserve = (x, z, r) => reserved.push({ x, z, r });

  // ---------- Água e ilha ----------
  const water = new THREE.Mesh(new THREE.CircleGeometry(260, 64), toon(theme.water));
  water.rotation.x = -Math.PI / 2; water.position.y = -0.45;
  water.receiveShadow = true;
  scene.add(water);
  anim.push(t => { water.position.y = -0.45 + Math.sin(t * 0.8) * 0.04; });

  const sand = mesh(new THREE.CylinderGeometry(ISLAND_R + 2.4, ISLAND_R + 3.4, 0.9, 72), toon(theme.sand), [0, -0.5, 0], 1, false);
  sand.receiveShadow = true; scene.add(sand);
  const grass = mesh(new THREE.CylinderGeometry(ISLAND_R, ISLAND_R + 0.6, 1, 72), toon(theme.grass), [0, -0.5, 0], 1, false);
  grass.receiveShadow = true; scene.add(grass);

  // ---------- Caminhos ----------
  const pathMat = toon(theme.path);
  const disc = new THREE.CircleGeometry(1, 20);
  const pathPts = [];
  function path(x1, z1, x2, z2, w = 1.25) {
    const len = Math.hypot(x2 - x1, z2 - z1), n = Math.ceil(len / 0.7);
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      pathPts.push([x1 + (x2 - x1) * t, z1 + (z2 - z1) * t, w]);
    }
    for (let i = 0; i <= Math.ceil(len / 2); i++) {
      const t = i / Math.ceil(len / 2);
      reserve(x1 + (x2 - x1) * t, z1 + (z2 - z1) * t, w + 0.8);
    }
  }
  // praça central
  const plaza = new THREE.Mesh(new THREE.CircleGeometry(6.5, 48), pathMat);
  plaza.rotation.x = -Math.PI / 2; plaza.position.y = 0.012; plaza.receiveShadow = true;
  scene.add(plaza);
  reserve(0, 0, 8);

  // ---------- Fonte (na vila bíblica: um oásis com palmeiras) ----------
  if (style === 'bible') {
    const oasis = new THREE.Group();
    const pool = new THREE.Mesh(new THREE.CircleGeometry(2.2, 32), toon('#6ec6e4'));
    pool.rotation.x = -Math.PI / 2; pool.position.y = 0.05; oasis.add(pool);
    for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; oasis.add(ball(toon('#d8c4a0'), [Math.cos(a) * 2.35, 0.15, Math.sin(a) * 2.35], [0.45, 0.28, 0.38])); }
    [0.4, 2.5, 4.4].forEach((a, i) => { const p = makePalm(0.9 + i * 0.12); p.position.set(Math.cos(a) * 2.2, 0, Math.sin(a) * 2.2); oasis.add(p); });
    scene.add(oasis);
  } else {
    const fountain = new THREE.Group();
    fountain.add(mesh(CYL, toon('#d9d4e8'), [0, 0.3, 0], [2.4, 0.6, 2.4]));
    const pool = mesh(CYL, toon('#8fdcff'), [0, 0.55, 0], [2.05, 0.1, 2.05], false);
    fountain.add(pool);
    fountain.add(mesh(CYL, toon('#d9d4e8'), [0, 1.1, 0], [0.35, 1.2, 0.35]));
    fountain.add(mesh(CYL, toon('#d9d4e8'), [0, 1.7, 0], [1.0, 0.18, 1.0]));
    const spout = ball(toon('#bfeeff'), [0, 2.1, 0], [0.35, 0.5, 0.35], false);
    fountain.add(spout);
    scene.add(fountain);
    anim.push(t => { spout.scale.y = 0.5 + Math.sin(t * 4) * 0.08; });
  }
  addCol(0, 0, 2.7);
  if (style === 'city') { // o sofá laranja na frente da fonte (como na abertura da série)
    const couch = makeCouch();
    couch.position.set(0, 0, 3.6);
    scene.add(couch); addCol(0, 3.6, 1.2);
  }

  // ---------- Estações ----------
  const stations = {};

  function houseStation(id, x, z, make) {
    const [wall, roof] = theme.houses[id], [title, sub] = SIGN[id];
    const h = make ? make(wall, roof) : makeHouse(wall, roof);
    h.position.set(x, 0, z); face(h, 0, 0);
    scene.add(h);
    addCol(x, z, 2.9);
    const dir = new THREE.Vector3(-x, 0, -z).normalize();
    const npc = new THREE.Vector3(x + dir.x * 3.6, 0, z + dir.z * 3.6);
    const sign = makeSign(title, sub);
    const side = new THREE.Vector3(dir.z, 0, -dir.x);
    sign.position.set(npc.x + side.x * 2.4, 0, npc.z + side.z * 2.4);
    face(sign, 0, 0);
    scene.add(sign);
    addCol(sign.position.x, sign.position.z, 0.9);
    path(npc.x, npc.z, dir.x * 5.5 + 0, dir.z * 5.5);
    reserve(x, z, 5);
    stations[id] = { pos: new THREE.Vector3(x, 0, z), npc, look: new THREE.Vector3(0, 0, 0) };
    return h;
  }

  // casa da unidade 1 e casa da unidade 4 (cada tema tem a sua construção)
  const chapel = (wall, roof) => {
    const h = makeHouse(wall, roof);
    h.add(mesh(BOX, toon(wall), [0, 4.5, 1.0], [1.0, 1.5, 1.0]));
    h.add(mesh(CONE, toon(roof), [0, 5.7, 1.0], [0.85, 0.9, 0.85]));
    h.add(mesh(BOX, toon('#ffe9a8'), [0, 6.65, 1.0], [0.12, 0.9, 0.12]));
    h.add(mesh(BOX, toon('#ffe9a8'), [0, 6.8, 1.0], [0.52, 0.12, 0.12]));
    return h;
  };
  const MAKE = {
    city: {
      greet: (w, r) => { const b = makeBuilding(w, r, 4.4, 3.6, 7.2, true, '#7a4fa0'); b.add(makeFireEscape(4.4, 7.2, 3.6)); return b; }, // porta roxa
      colors: (w, r) => makeBuilding(w, r, 4.4, 3.6, 4.2),
    },
    bible: { greet: chapel, colors: (w, r) => makeTent(w, r) },
    garden: { greet: makeGreenhouse },
  }[style] || {};
  const hGreet = houseStation('greet', -16, -7, MAKE.greet);
  const hColors = houseStation('colors', 16, -7, MAKE.colors);
  {
    // enfeites na frente da casa da unidade 4
    const s = stations.colors;
    const dir = s.npc.clone().sub(s.pos).normalize();
    const side = new THREE.Vector3(dir.z, 0, -dir.x);
    const at = (o, f, sd) => { o.position.copy(s.pos).addScaledVector(dir, f).addScaledVector(side, sd); face(o, 0, 0); scene.add(o); return o; };
    if (style === 'garden') { // galpão: carrinho de mão, pá e escada
      const wb = new THREE.Group();
      wb.add(mesh(BOX, toon('#e2574c'), [0, 0.55, 0], [0.7, 0.34, 1.0]));
      const wh = mesh(CYL, toon('#3d3a4b'), [0, 0.22, 0.65], [0.22, 0.1, 0.22]); wh.rotation.z = Math.PI / 2; wb.add(wh);
      for (const sx of [-1, 1]) { const hd = mesh(CYL, toon('#a0714f'), [sx * 0.3, 0.55, -0.85], [0.04, 0.9, 0.04]); hd.rotation.x = Math.PI / 2 - 0.2; wb.add(hd); }
      wb.add(ball(toon('#7a5a3a'), [0, 0.74, 0], [0.3, 0.14, 0.42], false));
      at(wb, 2.6, -3.0); addCol(wb.position.x, wb.position.z, 0.7);
      const ld = new THREE.Group();
      for (const sx of [-1, 1]) ld.add(mesh(BOX, toon('#d9a066'), [sx * 0.3, 1.3, 0], [0.07, 2.6, 0.07]));
      for (let i = 0; i < 6; i++) ld.add(mesh(BOX, toon('#d9a066'), [0, 0.3 + i * 0.4, 0], [0.6, 0.06, 0.06]));
      ld.rotation.x = -0.28;
      const lg = new THREE.Group(); lg.add(ld); at(lg, 2.25, 1.35);
      const sh = new THREE.Group();
      sh.add(mesh(CYL, toon('#a0714f'), [0, 0.85, 0], [0.035, 1.3, 0.035]));
      sh.add(mesh(BOX, toon('#9aa3b2'), [0, 0.18, 0], [0.26, 0.36, 0.04]));
      sh.rotation.x = -0.22;
      const sg = new THREE.Group(); sg.add(sh); at(sg, 2.1, -1.5);
      [-2.1, -2.6].forEach((sd, i) => at(makePot(['#ff8fab', '#ffd54d'][i]), 2.4, sd + 0.3 - i * 0.1));
    } else if (style === 'bible') { // tenda: tapete e almofadas
      const rug = mesh(CYL, toon('#c8553d'), [0, 0.02, 0], [1.3, 0.03, 1.3], false);
      at(rug, 3.4, 0);
      [['#ffd54d', -1.0], ['#6ec6e4', 1.0]].forEach(([c, sd]) => at(ball(toon(c), [0, 0.16, 0], [0.34, 0.16, 0.34]), 3.2, sd));
    } else { // potes de tinta
      [['#ef4444', -1.3], ['#facc15', -0.4], ['#3b82f6', 0.5], ['#22c55e', 1.4]].forEach(([c, dx]) => {
        const pot = new THREE.Group();
        pot.add(mesh(CYL, toon('#ffffff'), [0, 0.25, 0], [0.3, 0.5, 0.3]));
        pot.add(mesh(CYL, toon(c), [0, 0.51, 0], [0.26, 0.04, 0.26], false));
        at(pot, 2.4, dx - 3.2);
      });
    }
    if (style === 'garden') { // estufa: vasos de flores na frente
      const g0 = stations.greet, d0 = g0.npc.clone().sub(g0.pos).normalize(), s0 = new THREE.Vector3(d0.z, 0, -d0.x);
      ['#ff8fab', '#ffd54d', '#b8a4ff', '#ffffff', '#ff9f6b'].forEach((c, i) => {
        const pot = makePot(c);
        pot.position.copy(g0.pos).addScaledVector(d0, 2.3).addScaledVector(s0, -3.2 + i * 0.55);
        pot.scale.setScalar(1.25); scene.add(pot);
      });
    }
    if (style === 'city') { // estúdio: estrela no teto
      const star = ball(toon('#ffd54d'), [0, 5.1, 0.6], [0.5, 0.5, 0.18]);
      hColors.add(star);
      anim.push(t => { star.rotation.z = t * 0.8; star.scale.x = 0.5 + Math.sin(t * 3) * 0.06; });
    }
  }

  // Number Square: blocos de 1 a 10 em arco
  {
    const cx = -17, cz = 12;
    const base = new THREE.Mesh(new THREE.CircleGeometry(5.2, 40), toon({ garden: '#e9dcc0', city: '#e6e0f7', bible: '#f3e3c0' }[style] || '#e8e1ff'));
    base.rotation.x = -Math.PI / 2; base.position.set(cx, 0.014, cz); base.receiveShadow = true;
    scene.add(base);
    const ang0 = Math.atan2(-cx, -cz); // direção para o centro
    for (let i = 0; i < 10; i++) {
      const a = ang0 + Math.PI + (i - 4.5) * 0.26;
      const b = makeNumberBlock(i + 1, ['#fff4f4', '#fffbe0', '#eefbf0', '#eef6ff', '#f6efff'][i % 5]);
      const r = 3.9;
      b.position.set(cx + Math.sin(a) * r, 0.45 + (i % 2) * 0.0, cz + Math.cos(a) * r);
      b.lookAt(cx, 0.45, cz);
      scene.add(b);
      addCol(b.position.x, b.position.z, 0.65);
      anim.push(t => { b.position.y = 0.45 + Math.max(0, Math.sin(t * 2 + i * 0.6)) * 0.12; });
    }
    const dir = new THREE.Vector3(-cx, 0, -cz).normalize();
    const npc = new THREE.Vector3(cx + dir.x * 1.2, 0, cz + dir.z * 1.2);
    // enfeite do tema no meio da praça dos números
    {
      const ox = cx - dir.x * 1.7, oz = cz - dir.z * 1.7;
      let deco = null;
      if (style === 'bible') deco = makeWell();
      else if (style === 'garden') { // bancada de mudas
        deco = new THREE.Group();
        deco.add(mesh(BOX, toon('#c99368'), [0, 0.55, 0], [2.2, 0.1, 0.9]));
        for (const sx of [-1, 1]) deco.add(mesh(BOX, toon('#8a6248'), [sx * 0.95, 0.27, 0], [0.1, 0.54, 0.8]));
        ['#ff8fab', null, '#ffd54d', null, '#b8a4ff'].forEach((c, i) => { const pt = makePot(c); pt.position.set(-0.84 + i * 0.42, 0.6, 0); deco.add(pt); });
      } else if (style === 'city') deco = makeFoosball(); // pebolim
      if (deco) { deco.position.set(ox, 0, oz); face(deco, 0, 0); scene.add(deco); addCol(ox, oz, 1.1); }
    }
    const sign = makeSign(...SIGN.numbers);
    sign.position.set(cx + dir.x * 4.6 + dir.z * 3, 0, cz + dir.z * 4.6 - dir.x * 3);
    face(sign, 0, 0); scene.add(sign); addCol(sign.position.x, sign.position.z, 0.9);
    path(npc.x + dir.x * 2, npc.z + dir.z * 2, dir.x * 5.5, dir.z * 5.5);
    reserve(cx, cz, 6.5);
    stations.numbers = { pos: new THREE.Vector3(cx, 0, cz), npc, look: new THREE.Vector3(0, 0, 0) };
  }

  // Fruit Garden + pomar (missão)
  const orchard = [];
  {
    const cx = 19, cz = 13;
    const base = new THREE.Mesh(new THREE.CircleGeometry(6.4, 40), toon('#b6e59a'));
    base.rotation.x = -Math.PI / 2; base.position.set(cx, 0.014, cz); base.receiveShadow = true;
    scene.add(base);
    // cerca no fundo
    for (let i = 0; i < 6; i++) {
      const a = Math.atan2(cx, cz) - 1.2 + i * 0.48;
      const f = makeFence(3.2);
      f.position.set(cx + Math.sin(a) * 6.6, 0, cz + Math.cos(a) * 6.6);
      f.rotation.y = a + Math.PI / 2;
      scene.add(f);
    }
    // árvores frutíferas
    [[-3.5, 3.6], [3.8, 3.2], [0.4, 5.2]].forEach(([dx, dz]) => {
      const t = makeTree(1, 0.9);
      for (let k = 0; k < 6; k++) {
        const a = k / 6 * Math.PI * 2;
        t.add(ball(toon('#ef3b3b'), [Math.cos(a) * 0.95, 1.9 + (k % 2) * 0.5, Math.sin(a) * 0.95], 0.16));
      }
      t.position.set(cx + dx, 0, cz + dz);
      scene.add(t); addCol(t.position.x, t.position.z, 0.6);
    });
    const kinds = ['redApple', 'greenApple', 'banana', 'orange', 'strawberry'];
    // cestinhos/caixotes com frutas: 5 tipos x 4
    kinds.forEach((k, ki) => {
      const a = -1.1 + ki * 0.55;
      const crateX = cx + Math.sin(a) * 2.6 - 0.5, crateZ = cz - Math.cos(a) * 2.6 + 1.6;
      for (let j = 0; j < 4; j++) {
        const ox = (j % 2 - 0.5) * 0.7, oz = (Math.floor(j / 2) - 0.5) * 0.7;
        const m = makeFruit(k, 1);
        m.position.set(crateX + ox, 0, crateZ + oz);
        m.rotation.y = R() * 6;
        scene.add(m);
        orchard.push({ kind: k, mesh: m, home: m.position.clone(), active: true, respawn: 0 });
      }
    });
    const dir = new THREE.Vector3(-cx, 0, -cz).normalize();
    const npc = new THREE.Vector3(cx + dir.x * 5.2, 0, cz + dir.z * 5.2);
    const sign = makeSign(...SIGN.fruits);
    sign.position.set(npc.x - dir.z * 2.6, 0, npc.z + dir.x * 2.6);
    face(sign, 0, 0); scene.add(sign); addCol(sign.position.x, sign.position.z, 0.9);
    path(npc.x, npc.z, dir.x * 5.5, dir.z * 5.5);
    reserve(cx, cz, 7.5);
    stations.fruits = { pos: new THREE.Vector3(cx, 0, cz), npc, look: new THREE.Vector3(0, 0, 0) };
  }

  // Padaria (missão)
  {
    const bx = 0, bz = -21;
    const [bw, br] = theme.houses.bakery;
    const h = style === 'bible' ? makeFlatHouse(bw, br, 6, 4.2, 3) : style === 'city' ? makeCafe() : makeHouse(bw, br, 6, 4.2, 3);
    h.position.set(bx, 0, bz); scene.add(h);
    addCol(bx - 1.6, bz, 2.6); addCol(bx + 1.6, bz, 2.6);
    // toldo listrado
    const awn = { garden: '#7ccf6b', bible: '#c8553d' }[style] || '#ff8fab';
    if (style !== 'bible' && style !== 'city') for (let i = 0; i < 6; i++) {
      const s = mesh(BOX, toon(i % 2 ? '#ffffff' : awn), [bx - 2.5 + i, 2.3, bz + 2.6], [1, 0.08, 1.2]);
      s.rotation.x = 0.35; scene.add(s);
    }
    // enfeite gigante no teto (pão, flor, xícara...)
    const bread = makeRoofIcon(style);
    bread.position.set(bx, { bible: 3.9, city: 5.7 }[style] || 4.9, bz + 0.6);
    if (style === 'city' || style === 'garden') bread.scale.setScalar(1.5);
    scene.add(bread);
    anim.push(t => { bread.rotation.y = Math.sin(t) * 0.3; });
    if (style === 'city') { // mesinhas na calçada
      for (const sx of [-1, 1]) {
        const tb = new THREE.Group();
        tb.add(mesh(CYL, toon('#ffffff'), [0, 0.7, 0], [0.5, 0.06, 0.5]), mesh(CYL, toon('#5b5470'), [0, 0.35, 0], [0.05, 0.7, 0.05]));
        tb.add(mesh(CYL, toon('#ff8fab'), [0.75, 0.3, 0], [0.22, 0.6, 0.22]), mesh(CYL, toon('#8ec5ff'), [-0.75, 0.3, 0], [0.22, 0.6, 0.22]));
        tb.position.set(bx + sx * 4.6, 0, bz + 3.2); scene.add(tb); addCol(tb.position.x, tb.position.z, 1.0);
      }
    }
    if (style === 'garden') { // plantas à venda
      ['#ff8fab', '#ffd54d', '#b8a4ff', '#ffffff'].forEach((c, i) => { const b = makeBush(c); b.scale.setScalar(0.7); b.position.set(bx - 4.4 - (i % 2) * 1.0, 0, bz + 2.2 + Math.floor(i / 2) * 1.0); scene.add(b); });
      addCol(bx - 4.9, bz + 2.7, 1.2);
    }
    const sign = makeSign(...SIGN.bakery);
    sign.position.set(bx + 3.6, 0, bz + 3.2); scene.add(sign); addCol(sign.position.x, sign.position.z, 0.9);
    path(bx, bz + 4, 0, -6);
    reserve(bx, bz, 6);
    stations.bakery = { pos: new THREE.Vector3(bx, 0, bz), npc: new THREE.Vector3(bx, 0, bz + 3.6), look: new THREE.Vector3(0, 0, 0) };
  }

  // Loja
  {
    const sx = -14, sz = 21;
    const g = new THREE.Group();
    g.add(mesh(BOX, toon('#c98a5a'), [0, 0.55, 0], [3.4, 1.1, 1.2]));
    g.add(mesh(BOX, toon('#fff3dc'), [0, 1.13, 0], [3.5, 0.08, 1.3]));
    for (const s of [-1, 1]) g.add(mesh(BOX, toon('#b9825c'), [s * 1.6, 1.6, -0.4], [0.12, 3.2, 0.12]));
    for (let i = 0; i < 7; i++) {
      const st = mesh(BOX, toon(i % 2 ? '#ffffff' : '#8ec5ff'), [-1.8 + i * 0.6, 3.1, 0.05], [0.6, 0.1, 1.9]);
      st.rotation.x = 0.25; g.add(st);
    }
    // vitrine: chapéus
    g.add(mesh(CONE, toon('#b388ff'), [-1, 1.45, 0], [0.18, 0.5, 0.18]));
    g.add(mesh(CYL, toon('#2f2a3a'), [0, 1.35, 0], [0.22, 0.4, 0.22]));
    g.add(ball(toon('#ff6fa0'), [1, 1.3, 0], 0.16));
    g.position.set(sx, 0, sz); face(g, 0, 0);
    scene.add(g);
    addCol(sx, sz, 2);
    const dir = new THREE.Vector3(-sx, 0, -sz).normalize();
    const sign = makeSign(...SIGN.shop);
    sign.position.set(sx + dir.x * 1.5 + dir.z * 3, 0, sz + dir.z * 1.5 - dir.x * 3);
    face(sign, 0, 0); scene.add(sign); addCol(sign.position.x, sign.position.z, 0.9);
    const npc = new THREE.Vector3(sx + dir.x * 1.9, 0, sz + dir.z * 1.9);
    path(npc.x + dir.x, npc.z + dir.z, dir.x * 5.5, dir.z * 5.5);
    reserve(sx, sz, 5);
    stations.shop = { pos: new THREE.Vector3(sx, 0, sz), npc, look: new THREE.Vector3(0, 0, 0) };
  }

  // Arena do minijogo
  const arena = { center: new THREE.Vector3(7, 0, 22), radius: 5.6, spots: [] };
  {
    const { x: ax, z: az } = arena.center;
    const plat = mesh(CYL, toon('#ffe7f0'), [ax, 0.06, az], [arena.radius + 0.4, 0.12, arena.radius + 0.4], false);
    plat.receiveShadow = true; scene.add(plat);
    const ring = new THREE.Mesh(new THREE.RingGeometry(arena.radius - 0.2, arena.radius + 0.3, 48), toon('#ff8fab'));
    ring.rotation.x = -Math.PI / 2; ring.position.set(ax, 0.13, az); scene.add(ring);
    const cols = ['#ffd6e0', '#d6ecff', '#fff3c4', '#dcf7e8', '#eadcff', '#ffe2c9'];
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2 + 0.3;
      const p = new THREE.Vector3(ax + Math.cos(a) * 3.4, 0, az + Math.sin(a) * 3.4);
      const ped = mesh(CYL, toon(cols[i]), [p.x, 0.2, p.z], [0.75, 0.2, 0.75]);
      ped.receiveShadow = true; scene.add(ped);
      arena.spots.push(p);
    }
    // balões
    for (let i = 0; i < 4; i++) {
      const a = i / 4 * Math.PI * 2 + 0.8;
      const bx2 = ax + Math.cos(a) * (arena.radius + 0.6), bz2 = az + Math.sin(a) * (arena.radius + 0.6);
      scene.add(mesh(CYL, toon('#ffffff'), [bx2, 1.2, bz2], [0.02, 2.4, 0.02], false));
      const bal = ball(toon(['#ff6f91', '#6cc7ff', '#ffd54d', '#7be0ad'][i]), [bx2, 2.7, bz2], [0.42, 0.5, 0.42]);
      scene.add(bal);
      anim.push(t => { bal.position.y = 2.7 + Math.sin(t * 1.5 + i) * 0.12; });
    }
    const dir = new THREE.Vector3(-ax, 0, -az).normalize();
    const sign = makeSign(...SIGN.arena);
    const sp = arena.center.clone().addScaledVector(dir, arena.radius + 1.8).add(new THREE.Vector3(dir.z * 3, 0, -dir.x * 3));
    sign.position.copy(sp); face(sign, 0, 0); scene.add(sign); addCol(sp.x, sp.z, 0.9);
    const npc = arena.center.clone().addScaledVector(dir, arena.radius + 1.2);
    path(npc.x, npc.z, dir.x * 5.5, dir.z * 5.5);
    reserve(ax, az, arena.radius + 2.5);
    stations.arena = { pos: arena.center.clone(), npc, look: new THREE.Vector3(0, 0, 0) };
  }

  // Prefeito / gerente / síndico: fica na praça, do lado leste da fonte
  {
    const npc = new THREE.Vector3(4.9, 0, 0);
    const pod = mesh(CYL, toon('#ffe9a8'), [npc.x, 0.04, npc.z], [0.95, 0.08, 0.95], false);
    pod.receiveShadow = true; scene.add(pod);
    stations.mayor = { pos: npc.clone(), npc, look: new THREE.Vector3(14, 0, 0) };
  }

  // Ponte para a próxima área (trancada)
  const gate = { x: -36.2 };
  {
    path(-5.5, 0, -33, 0, 1.4);
    for (let i = 0; i < 9; i++) {
      const p = mesh(BOX, toon(i % 2 ? '#c99368' : '#b9825c'), [-33 - i * 1.0, -0.05, 0], [0.95, 0.25, 3]);
      p.receiveShadow = true; scene.add(p);
    }
    for (const s of [-1, 1]) {
      scene.add(mesh(BOX, toon('#a0714f'), [-37, 0.6, s * 1.5], [9, 0.12, 0.12]));
      for (let i = 0; i < 4; i++) scene.add(mesh(BOX, toon('#a0714f'), [-33.5 - i * 2.6, 0.3, s * 1.5], [0.14, 0.8, 0.14]));
    }
    // portão
    const gg = new THREE.Group();
    for (const s of [-1, 1]) {
      gg.add(mesh(BOX, toon('#8a6248'), [0, 1.3, s * 1.6], [0.3, 2.6, 0.3]));
      gg.add(ball(toon('#ffd54d'), [0, 2.75, s * 1.6], 0.2));
    }
    for (let i = 0; i < 5; i++) gg.add(mesh(BOX, toon('#fff4e0'), [0, 0.95, -1.2 + i * 0.6], [0.1, 1.7, 0.18]));
    gg.add(mesh(BOX, toon('#fff4e0'), [0, 1.5, 0], [0.12, 0.12, 3.2]));
    gg.add(mesh(BOX, toon('#fff4e0'), [0, 0.5, 0], [0.12, 0.12, 3.2]));
    gg.position.set(gate.x - 0.3, 0, 0);
    scene.add(gg);
    const sign = makeSign(...SIGN.gate);
    sign.position.set(-32, 0, 3.2); sign.rotation.y = Math.PI / 2; scene.add(sign);
    addCol(sign.position.x, sign.position.z, 0.9);
    // ilha da próxima área, ao longe
    const farCol = { city: '#cfc9c0', bible: '#ead29a' }[style] || '#7fc46a';
    const far = mesh(new THREE.CylinderGeometry(14, 15, 1, 40), toon(farCol), [-56, -0.5, 0], 1, false);
    scene.add(far);
    const fr = rng(99);
    for (let i = 0; i < 26; i++) {
      const a = fr() * Math.PI * 2, r = 3 + fr() * 10;
      let t;
      if (style === 'city') { if (i > 13) continue; t = makeBuilding(['#ffd9c2', '#d6ecff', '#fff3c4', '#e7e1ff'][i % 4], '#8a8499', 3 + fr() * 2, 3, 5 + fr() * 8, false); t.rotation.y = Math.PI / 2; }
      else if (style === 'bible') { if (i % 2) t = makePalm(1 + fr() * 0.5); else { t = makeFlatHouse('#f3e3c3', '#c79a63', 3, 3, 2 + fr() * 2); t.rotation.y = Math.PI / 2; } }
      else if (style === 'garden') t = makeTree(i % 3, 1.4 + fr() * 1.0);
      else t = makeTree(3, 1 + fr() * 0.6);
      t.position.set(-56 + Math.cos(a) * r, 0, Math.sin(a) * r);
      scene.add(t);
    }
    if (style === 'bible') { const wall = makeCityWall(); wall.position.set(-43.2, 0, 0); scene.add(wall); }
    if (style === 'city') [[-60, -5, 1], [-52, 7, 0.75]].forEach(([x, z, s]) => { const tw = makeSkyTower(); tw.position.set(x, 0, z); tw.scale.setScalar(s); scene.add(tw); });
    gate.mesh = gg;
    reserve(-30, 0, 4);
  }

  // desenha os caminhos (instanciado)
  const inst = new THREE.InstancedMesh(disc, pathMat, pathPts.length);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
  pathPts.forEach(([x, z, w], i) => { m4.compose(new THREE.Vector3(x, 0.01, z), q, new THREE.Vector3(w, w, 1)); inst.setMatrixAt(i, m4); });
  inst.receiveShadow = true;
  scene.add(inst);

  // ---------- Árvores, flores, pedras ----------
  const free = (x, z, r) => {
    if (Math.hypot(x, z) > ISLAND_R - 2) return false;
    for (const a of reserved) if (Math.hypot(x - a.x, z - a.z) < a.r + r) return false;
    for (const c of colliders) if (Math.hypot(x - c.x, z - c.z) < c.r + r + 0.5) return false;
    return true;
  };
  const ringSpot = (a, r) => [Math.cos(a) * r, Math.sin(a) * r];
  // coloca um objeto num lugar livre (entre os raios r0 e r1 da ilha)
  const placeFree = (obj, rad, r0 = 8, r1 = ISLAND_R - 4) => {
    for (let k = 0; k < 120; k++) {
      const [x, z] = ringSpot(R() * Math.PI * 2, r0 + R() * (r1 - r0));
      if (!free(x, z, rad)) continue;
      obj.position.set(x, 0, z); obj.rotation.y = R() * 6;
      scene.add(obj); addCol(x, z, rad);
      return obj;
    }
    return null;
  };

  // ---------- Detalhes de cada tema ----------
  if (style === 'city') { // Nova York: avenida em volta da praça, táxis, hidrantes, carrinho de cachorro-quente
    const road = new THREE.Mesh(new THREE.RingGeometry(8.7, 10.4, 72), toon('#6f747c'));
    road.rotation.x = -Math.PI / 2; road.position.y = 0.016; road.receiveShadow = true; scene.add(road);
    for (let i = 0; i < 28; i++) {
      const a = i / 28 * Math.PI * 2;
      const dash = mesh(BOX, toon('#ffffff'), [Math.cos(a) * 9.55, 0.03, Math.sin(a) * 9.55], [0.12, 0.02, 0.8], false);
      dash.rotation.y = -a; scene.add(dash);
    }
    for (let i = 0; i < 24; i++) { const [x, z] = ringSpot(i / 24 * Math.PI * 2, 9.55); reserve(x, z, 0.9); }
    // táxis andando pela avenida
    [0, Math.PI].forEach((a0, i) => {
      const taxi = makeTaxi(); scene.add(taxi);
      const r = i ? 9.1 : 10.0, dir = i ? -1 : 1;
      anim.push(t => {
        const a = a0 + t * 0.22 * dir;
        taxi.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
        taxi.rotation.y = -a + (dir > 0 ? Math.PI : 0);
      });
    });
    for (let i = 0; i < 3; i++) placeFree(makeTaxi(), 1.5, 12, ISLAND_R - 6);
    for (let i = 0; i < 5; i++) placeFree(makeHydrant(), 0.4, 11, ISLAND_R - 5);
    placeFree(makeHotDogCart(), 1.1, 11, 16);
  }
  if (style === 'bible') { // presépio, Davi e Golias, camelos, barco de pescador, Noé na arca
    const stable = makeStable();
    stable.position.set(14, 0, -23); face(stable, 0, 0);
    const mary = makeFigure({ skin: '#e0b08a', hair: '#3a2418', head: 'veil', headColor: '#6ea8de', robe: '#e9f0fa', sash: '#6ea8de' }, 'Mary');
    mary.position.set(-0.9, 0, 0.5); mary.rotation.y = 0.9; stable.add(mary);
    const joseph = makeFigure({ skin: '#d4a07a', hair: '#4a3020', head: 'headcloth', headColor: '#c9a063', band: '#6b4a36', beard: '#4a3020', robe: '#8a6248', sash: '#e9c46a', extras: ['staff'] }, 'Joseph');
    joseph.position.set(1.0, 0, 0.4); joseph.rotation.y = -0.9; stable.add(joseph);
    const baby = makeLabel('Baby Jesus', { size: 1.2 }); baby.position.set(0, 1.35, 0.1); stable.add(baby);
    const sh = makeSheep(); sh.position.set(1.8, 0, 1.3); stable.add(sh);
    scene.add(stable); addCol(14, -23, 3); reserve(14, -23, 5);
    anim.push(t => { stable.userData.star.rotation.z = Math.sin(t) * 0.2; stable.userData.star.scale.setScalar(1 + Math.sin(t * 3) * 0.08); });

    const goliath = makeFigure({ skin: '#d4a07a', hair: '#2b1d17', hairStyle: 'curly', beard: '#2b1d17', robe: '#8a8f99', sash: '#5a4636', extras: ['staff'], scale: 2.3 });
    goliath.position.set(26, 0, -3); face(goliath, 0, 0); scene.add(goliath); addCol(26, -3, 1.2); reserve(26, -3, 3);
    const gTag = makeLabel('Goliath', { size: 1.4 }); gTag.position.set(26, 5.0, -3); scene.add(gTag);
    const david = makeFigure({ skin: '#e0b08a', hair: '#9a4a2a', hairStyle: 'curly', robe: '#efe4cc', sash: '#6b8f5a', scale: 0.82 }, 'David', 2.6);
    david.position.set(23.2, 0, -1.6); face(david, 26, -3); scene.add(david); addCol(23.2, -1.6, 0.5);

    for (let i = 0; i < 3; i++) placeFree(makeCamel(), 1.0, 10, ISLAND_R - 5);
    const boat = makeBoat();
    boat.position.set(40, -0.3, -16); boat.rotation.y = 0.4; scene.add(boat);
    const peter = makeFigure({ skin: '#c98f6a', hair: '#4a3020', hairStyle: 'curly', beard: '#4a3020', robe: '#6b8f9a', sash: '#a0714f' }, 'Peter');
    peter.position.set(0, 0.65, -0.6); boat.add(peter);
    anim.push(t => { boat.position.y = -0.3 + Math.sin(t * 1.1) * 0.1; boat.rotation.z = Math.sin(t * 0.8) * 0.04; });
  }
  if (style === 'garden') { // lago com vitórias-régias, árvore grande do podador, cortador de grama
    const pond = makePond(); pond.position.set(14, 0, -23); scene.add(pond); addCol(14, -23, 3.4); reserve(14, -23, 4.2);
    const oak = makeBigOak(); oak.position.set(-23, 0, -20); oak.rotation.y = 0.8; scene.add(oak); addCol(-23, -20, 1.0); reserve(-23, -20, 3.5);
    placeFree(makeMower(), 0.8, 9, 15);
  }
  if (style === 'city') { // prédios em volta do bairro
    const cols = ['#ffd9c2', '#d6ecff', '#fff3c4', '#e7e1ff', '#dcf7e8', '#ffe2ea'];
    for (let i = 0; i < 18; i++) {
      const a = i / 18 * Math.PI * 2 + 0.17;
      if (Math.abs(Math.atan2(Math.sin(a - Math.PI), Math.cos(a - Math.PI))) < 0.3) continue; // deixa a ponte livre
      const [x, z] = ringSpot(a, ISLAND_R - 3.2);
      if (!free(x, z, 2.6)) continue;
      const b = makeBuilding(cols[i % cols.length], ['#8a8499', '#b5654a', '#7a6ad8'][i % 3], 3.6 + R() * 1.4, 3.4, 6 + R() * 7, false);
      b.position.set(x, 0, z); face(b, 0, 0);
      scene.add(b); addCol(x, z, 2.7);
    }
  }
  if (style === 'garden') { // canteiros de flores, arbustos e topiarias
    for (let i = 0; i < 4; i++) {
      const [x, z] = ringSpot(i / 4 * Math.PI * 2 + Math.PI / 4, 10.2);
      const soil = mesh(CYL, toon('#8a6248'), [x, 0.03, z], [1.9, 0.06, 1.9], false);
      soil.receiveShadow = true; scene.add(soil);
      const f = makeFlowerPatch(R, 26, 1.7); f.position.set(x, 0.05, z); f.scale.setScalar(1.3); scene.add(f);
      reserve(x, z, 2.2);
    }
    let n = 0;
    for (let tries = 0; tries < 400 && n < 22; tries++) {
      const [x, z] = ringSpot(R() * Math.PI * 2, 9 + R() * (ISLAND_R - 12));
      if (!free(x, z, 1.2)) continue;
      const o = n % 3 === 0 ? makeTopiary() : makeBush(['#ff8fab', '#ffd54d', '#ffffff', '#b8a4ff'][n % 4]);
      o.position.set(x, 0, z); o.rotation.y = R() * 6;
      scene.add(o); addCol(x, z, 0.7); n++;
    }
  }
  if (style === 'bible') { // ovelhas, arca no mar e arco-íris
    let n = 0;
    for (let tries = 0; tries < 200 && n < 7; tries++) {
      const [x, z] = ringSpot(R() * Math.PI * 2, 9 + R() * (ISLAND_R - 13));
      if (!free(x, z, 1.2)) continue;
      const sh = makeSheep();
      sh.position.set(x, 0, z); sh.rotation.y = R() * 6;
      scene.add(sh); addCol(x, z, 0.6); n++;
      const k = n;
      anim.push(t => { sh.position.y = Math.max(0, Math.sin(t * 2.2 + k * 1.7)) * 0.06; });
    }
    const ark = makeArk();
    const noah = makeFigure({ skin: '#d4a07a', hair: '#f1ede6', head: 'headcloth', headColor: '#f3ead8', band: '#8a6248', beard: '#f1ede6', robe: '#8a6a9a', sash: '#e9c46a', extras: ['staff'], scale: 1.4 }, 'Noah');
    noah.position.set(3.6, 1.9, 0); noah.rotation.y = Math.PI / 2; ark.add(noah);
    ark.position.set(14, -0.6, -52); ark.rotation.y = 0.35;
    scene.add(ark);
    anim.push(t => { ark.position.y = -0.6 + Math.sin(t * 0.9) * 0.12; ark.rotation.z = Math.sin(t * 0.7) * 0.03; });
    const rb = makeRainbow(46);
    rb.position.set(10, -6, -92); scene.add(rb);
  }
  const TREES = { garden: 70, city: 26, bible: 38 }[style] || 62;
  const randomTree = () => {
    const s = 0.8 + R() * 0.5;
    if (style === 'bible') return R() < 0.65 ? makePalm(s * 1.05) : makeTree(0, s);
    if (style === 'city') return makeTree(Math.floor(R() * 3), s);
    if (style === 'garden') return R() < 0.15 ? makeTree(0, s * 1.7) : makeTree(Math.floor(R() * 4), s);
    return makeTree(Math.floor(R() * 4), s);
  };
  let placed = 0;
  for (let tries = 0; tries < 900 && placed < TREES; tries++) {
    const a = R() * Math.PI * 2, r = 6 + Math.sqrt(R()) * (ISLAND_R - 7);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (!free(x, z, 1.4)) continue;
    const t = randomTree();
    t.position.set(x, 0, z); t.rotation.y = R() * 6;
    scene.add(t); addCol(x, z, 0.6);
    placed++;
  }
  for (let i = 0; i < ({ garden: 60, bible: 10, city: 4 }[style] || 26); i++) {
    const a = R() * Math.PI * 2, r = 7 + R() * (ISLAND_R - 9);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (!free(x, z, 1)) continue;
    const f = makeFlowerPatch(R, 7, 1);
    f.position.set(x, 0, z); scene.add(f);
  }
  for (let i = 0; i < ({ bible: 34, city: 0 }[style] ?? 14); i++) {
    const a = R() * Math.PI * 2, r = 8 + R() * (ISLAND_R - 10);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (!free(x, z, 0.8)) continue;
    const s = ball(toon(style === 'bible' ? '#d8c4a0' : '#c9c2d6'), [x, 0.15, z], [0.5 + R() * 0.4, 0.35, 0.45 + R() * 0.3]);
    scene.add(s);
  }
  // bancos na praça
  for (let i = 0; i < 4; i++) {
    const a = i / 4 * Math.PI * 2 + Math.PI / 4;
    const b = new THREE.Group();
    b.add(mesh(BOX, toon('#c99368'), [0, 0.45, 0], [1.6, 0.12, 0.55]));
    b.add(mesh(BOX, toon('#c99368'), [0, 0.75, -0.25], [1.6, 0.4, 0.08]));
    for (const s of [-1, 1]) b.add(mesh(BOX, toon('#8a6248'), [s * 0.65, 0.22, 0], [0.12, 0.44, 0.45]));
    b.position.set(Math.cos(a) * 5.4, 0, Math.sin(a) * 5.4);
    face(b, 0, 0); b.rotation.y += Math.PI;
    scene.add(b); addCol(b.position.x, b.position.z, 0.8);
  }
  // postes de luz
  for (let i = 0; i < 4; i++) {
    const a = i / 4 * Math.PI * 2 + Math.PI / 4;
    const x = Math.cos(a) * 7.4, z = Math.sin(a) * 7.4;
    scene.add(mesh(CYL, toon('#5b5470'), [x, 1.3, z], [0.07, 2.6, 0.07]));
    scene.add(ball(toon('#fff4b0'), [x, 2.7, z], 0.25));
    addCol(x, z, 0.3);
  }

  // ---------- Nuvens ----------
  const clouds = [];
  for (let i = 0; i < 9; i++) {
    const c = new THREE.Group();
    const m = toon('#ffffff');
    for (let k = 0; k < 4; k++) c.add(ball(m, [k * 1.3 - 2, Math.sin(k) * 0.4, (k % 2) * 0.5], 1.1 + (k % 2) * 0.4, false));
    c.position.set(-60 + R() * 120, 16 + R() * 6, -60 + R() * 100);
    c.scale.setScalar(1 + R());
    scene.add(c); clouds.push(c);
  }
  anim.push((t, dt) => clouds.forEach(c => { c.position.x += dt * 0.6; if (c.position.x > 70) c.position.x = -70; }));

  // ---------- Pássaros de papel (borboletas) ----------
  const flies = [];
  for (let i = 0; i < 6; i++) {
    const f = new THREE.Group();
    const m = toon(['#ffd54d', '#ff8fab', '#8ec5ff'][i % 3], { side: THREE.DoubleSide });
    const wl = new THREE.Mesh(new THREE.CircleGeometry(0.16, 8), m), wr = wl.clone();
    wl.position.x = -0.12; wr.position.x = 0.12;
    f.add(wl, wr);
    const home = new THREE.Vector3(-25 + R() * 50, 1.2, -25 + R() * 50);
    f.userData = { home, wl, wr, k: R() * 10 };
    scene.add(f); flies.push(f);
  }
  anim.push(t => flies.forEach(f => {
    const { home, wl, wr, k } = f.userData;
    f.position.set(home.x + Math.sin(t * 0.5 + k) * 3, home.y + Math.sin(t * 1.3 + k) * 0.4, home.z + Math.cos(t * 0.4 + k) * 3);
    wl.rotation.y = Math.sin(t * 18 + k) * 1.1; wr.rotation.y = -wl.rotation.y;
    f.rotation.y = t * 0.5 + k;
  }));

  return {
    colliders, stations, orchard, arena, gate,
    update(t, dt) { for (const f of anim) f(t, dt); },
  };
}
