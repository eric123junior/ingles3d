// Modelos 3D feitos com formas simples: bichinhos chibi, acessórios, casas, árvores, frutas, placas.
import * as THREE from 'three';

// ---------- Materiais "desenho animado" ----------
const grad = new THREE.DataTexture(new Uint8Array([110, 190, 255]), 3, 1, THREE.RedFormat);
grad.minFilter = grad.magFilter = THREE.NearestFilter;
grad.needsUpdate = true;

const matCache = new Map();
export function toon(color, extra = {}) {
  const { unique, ...params } = extra;
  const key = color + JSON.stringify(params);
  if (!unique && matCache.has(key)) return matCache.get(key);
  const m = new THREE.MeshToonMaterial({ color, gradientMap: grad, ...params });
  if (!unique) matCache.set(key, m);
  return m;
}

const SPH = new THREE.SphereGeometry(1, 24, 18);
const SPH_LO = new THREE.SphereGeometry(1, 12, 9);
const CONE = new THREE.ConeGeometry(1, 1, 16);
const CYL = new THREE.CylinderGeometry(1, 1, 1, 18);
const BOX = new THREE.BoxGeometry(1, 1, 1);

export function mesh(geo, mat, pos = [0, 0, 0], scale = [1, 1, 1], shadow = true) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(...pos);
  if (typeof scale === 'number') m.scale.setScalar(scale); else m.scale.set(...scale);
  m.castShadow = shadow;
  return m;
}
export const ball = (mat, pos, s, shadow) => mesh(SPH, mat, pos, s, shadow);

function mix(hex, other, t) { return '#' + new THREE.Color(hex).lerp(new THREE.Color(other), t).getHexString(); }
function luminance(hex) { const c = new THREE.Color(hex); return 0.3 * c.r + 0.59 * c.g + 0.11 * c.b; }

// ---------- Bichinhos ----------
export function makeAnimal(species, color, opts = {}) {
  const root = new THREE.Group();
  const body = new THREE.Group(); // tudo que balança ao andar
  root.add(body);

  const dark = luminance(color) < 0.3;
  let main = color, accent = mix(color, '#ffffff', dark ? 0.35 : 0.6), limb = color;
  if (species === 'panda') { main = '#f8f6f2'; accent = '#ffffff'; limb = color; }
  if (species === 'fox') accent = '#fffaf2';
  const mMain = toon(main, { unique: true }), mAcc = toon(accent, { unique: true }), mLimb = toon(limb, { unique: true });
  const mEye = toon('#2b2233'), mWhite = toon('#ffffff'), mCheek = toon('#ff9db5'), mNose = toon(species === 'cat' || species === 'bunny' ? '#ff7f9f' : '#3a2c33');

  // corpo
  const torso = ball(mMain, [0, 0.55, 0], [0.42, 0.44, 0.4]);
  body.add(torso);
  body.add(ball(mAcc, [0, 0.52, 0.2], [0.28, 0.3, 0.22]));

  // cabeça
  const head = new THREE.Group();
  head.position.set(0, 1.22, 0);
  body.add(head);
  head.add(ball(mMain, [0, 0, 0], [0.54, 0.48, 0.5]));
  for (const s of [-1, 1]) {
    const eye = ball(mEye, [s * 0.18, 0.03, 0.43], [0.075, 0.095, 0.05], false);
    head.add(eye);
    head.add(ball(mWhite, [s * 0.18 + 0.025, 0.07, 0.47], 0.026, false));
    head.add(ball(mCheek, [s * 0.32, -0.1, 0.36], [0.075, 0.045, 0.03], false));
  }
  if (species === 'panda') for (const s of [-1, 1]) {
    const patch = ball(mLimb, [s * 0.18, 0.02, 0.41], [0.12, 0.14, 0.06], false);
    patch.rotation.z = s * 0.5;
    head.add(patch);
  }
  if (['bear', 'puppy', 'fox', 'panda'].includes(species)) {
    head.add(ball(mAcc, [0, -0.12, 0.42], [0.17, 0.12, 0.1], false));
    head.add(ball(mNose, [0, -0.07, 0.52], [0.06, 0.045, 0.04], false));
  } else {
    head.add(ball(mNose, [0, -0.06, 0.49], [0.045, 0.032, 0.03], false));
  }
  // boquinha
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.012, 6, 12, Math.PI), mEye);
  mouth.position.set(0, -0.15, 0.48); mouth.rotation.z = Math.PI;
  if (['bear', 'puppy', 'fox', 'panda'].includes(species)) mouth.position.set(0, -0.19, 0.5);
  head.add(mouth);

  // orelhas
  const ears = [];
  for (const s of [-1, 1]) {
    let ear;
    if (species === 'cat' || species === 'fox') {
      ear = new THREE.Group();
      ear.add(mesh(CONE, mMain, [0, 0, 0], species === 'fox' ? [0.17, 0.34, 0.1] : [0.15, 0.28, 0.09]));
      ear.add(mesh(CONE, toon('#ffc2d1'), [0, -0.02, 0.04], species === 'fox' ? [0.09, 0.22, 0.04] : [0.08, 0.18, 0.04], false));
      ear.position.set(s * 0.3, 0.4, 0);
      ear.rotation.z = -s * 0.35;
    } else if (species === 'bunny') {
      ear = new THREE.Group();
      ear.add(ball(mMain, [0, 0.3, 0], [0.1, 0.34, 0.07]));
      ear.add(ball(toon('#ffc2d1'), [0, 0.3, 0.04], [0.055, 0.26, 0.04], false));
      ear.position.set(s * 0.16, 0.32, 0);
      ear.rotation.z = -s * 0.15;
    } else if (species === 'puppy') {
      ear = new THREE.Group();
      ear.add(ball(toon(mix(color, '#3a2c33', 0.35)), [0, -0.2, 0], [0.13, 0.26, 0.08]));
      ear.position.set(s * 0.47, 0.12, 0);
      ear.rotation.z = s * 0.25;
    } else { // bear, panda
      ear = new THREE.Group();
      ear.add(ball(species === 'panda' ? mLimb : mMain, [0, 0, 0], [0.14, 0.14, 0.08]));
      if (species === 'bear') ear.add(ball(mAcc, [0, 0, 0.05], [0.08, 0.08, 0.04], false));
      ear.position.set(s * 0.36, 0.36, 0);
    }
    head.add(ear);
    ears.push(ear);
  }

  // braços (com pivô no ombro)
  const arms = [];
  for (const s of [-1, 1]) {
    const pivot = new THREE.Group();
    pivot.position.set(s * 0.37, 0.78, 0);
    pivot.add(ball(mLimb, [s * 0.04, -0.16, 0.02], [0.11, 0.17, 0.11]));
    body.add(pivot);
    arms.push(pivot);
  }
  // pés
  const feet = [];
  for (const s of [-1, 1]) {
    const f = ball(mLimb, [s * 0.18, 0.1, 0.04], [0.14, 0.1, 0.18]);
    root.add(f);
    feet.push(f);
  }
  // rabo
  let tail;
  if (species === 'bunny') tail = ball(toon('#ffffff'), [0, 0.42, -0.4], 0.12);
  else if (species === 'fox') {
    tail = new THREE.Group();
    tail.add(ball(mMain, [0, 0.12, -0.25], [0.18, 0.18, 0.32]));
    tail.add(ball(toon('#ffffff'), [0, 0.2, -0.52], [0.12, 0.12, 0.12]));
    tail.position.set(0, 0.35, -0.25); tail.rotation.x = 0.6;
  } else if (species === 'cat') {
    tail = new THREE.Group();
    const seg = mesh(CYL, mMain, [0, 0.25, 0], [0.05, 0.5, 0.05]);
    tail.add(seg); tail.add(ball(mMain, [0, 0.5, 0], 0.06));
    tail.position.set(0, 0.4, -0.36); tail.rotation.x = -0.5;
  } else if (species === 'puppy') {
    tail = new THREE.Group();
    tail.add(mesh(CONE, mMain, [0, 0.12, 0], [0.07, 0.26, 0.07]));
    tail.position.set(0, 0.5, -0.36); tail.rotation.x = -0.7;
  } else tail = ball(species === 'panda' ? mLimb : mMain, [0, 0.4, -0.38], 0.08);
  body.add(tail);

  // pontos para acessórios
  const anchors = { hat: new THREE.Group(), face: new THREE.Group(), neck: new THREE.Group() };
  anchors.hat.position.set(0, 0.42, 0);
  anchors.face.position.set(0, 0.03, 0.45);
  anchors.neck.position.set(0, 0.86, 0);
  head.add(anchors.hat, anchors.face);
  body.add(anchors.neck);

  root.scale.setScalar(opts.scale || 1);
  root.traverse(o => { if (o.isMesh) o.receiveShadow = false; });

  // animação
  let phase = Math.random() * 10, t = Math.random() * 10, happy = 0;
  const anim = {
    root, head, anchors, species,
    jump() { happy = 1; },
    update(dt, speed) {
      t += dt;
      const moving = speed > 0.1;
      phase += dt * (moving ? 11 : 0);
      const sw = moving ? Math.sin(phase) : 0;
      feet[0].position.z = 0.04 + sw * 0.14;
      feet[1].position.z = 0.04 - sw * 0.14;
      feet[0].position.y = 0.1 + (moving ? Math.max(0, Math.cos(phase)) * 0.07 : 0);
      feet[1].position.y = 0.1 + (moving ? Math.max(0, -Math.cos(phase)) * 0.07 : 0);
      arms[0].rotation.x = -sw * 0.7;
      arms[1].rotation.x = sw * 0.7;
      const breathe = Math.sin(t * 2.2) * 0.015;
      body.position.y = moving ? Math.abs(Math.sin(phase)) * 0.07 : 0;
      body.scale.set(1 - breathe * 0.5, 1 + breathe, 1 - breathe * 0.5);
      head.rotation.z = moving ? Math.sin(phase * 0.5) * 0.06 : Math.sin(t * 1.3) * 0.04;
      if (tail) tail.rotation.z = Math.sin(t * (moving ? 9 : 3)) * 0.35;
      ears.forEach((e, i) => { e.rotation.x = Math.sin(t * 3 + i) * 0.06; });
      if (happy > 0) {
        happy = Math.max(0, happy - dt * 1.6);
        const j = Math.sin((1 - happy) * Math.PI * 2);
        root.position.y = Math.max(0, j) * 0.6;
        arms[0].rotation.z = -2.4 * happy; arms[1].rotation.z = 2.4 * happy;
      } else { root.position.y = 0; arms[0].rotation.z = 0; arms[1].rotation.z = 0; }
    },
  };
  return anim;
}

// ---------- Acessórios ----------
export function makeAccessory(id) {
  const g = new THREE.Group();
  switch (id) {
    case 'bow': {
      const m = toon('#ff6fa0');
      g.add(mesh(CONE, m, [-0.13, 0, 0], [0.1, 0.18, 0.08])).children[0].rotation.z = Math.PI / 2;
      const r = mesh(CONE, m, [0.13, 0, 0], [0.1, 0.18, 0.08]); r.rotation.z = -Math.PI / 2; g.add(r);
      g.add(ball(m, [0, 0, 0], 0.06));
      g.position.set(0.2, 0.0, 0.1); g.rotation.z = -0.3;
      break;
    }
    case 'flower': {
      for (let i = 0; i < 5; i++) {
        const a = i / 5 * Math.PI * 2;
        g.add(ball(toon('#fff2a8'), [Math.cos(a) * 0.08, Math.sin(a) * 0.08, 0], [0.06, 0.06, 0.03]));
      }
      g.add(ball(toon('#ffb84d'), [0, 0, 0.02], 0.05));
      g.position.set(-0.24, -0.02, 0.18); g.rotation.y = -0.5;
      break;
    }
    case 'cap': {
      const m = toon('#4f9dff');
      const dome = new THREE.Mesh(new THREE.SphereGeometry(0.4, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), m);
      dome.scale.set(1.15, 0.7, 1.1); dome.position.y = -0.12; dome.castShadow = true;
      g.add(dome);
      g.add(mesh(CYL, m, [0, -0.11, 0.38], [0.3, 0.025, 0.24]));
      g.add(ball(toon('#ffffff'), [0, 0.17, 0], 0.04));
      break;
    }
    case 'party': {
      g.add(mesh(CONE, toon('#b388ff'), [0, 0.18, 0], [0.18, 0.42, 0.18]));
      g.add(ball(toon('#ffd54d'), [0, 0.41, 0], 0.07));
      g.add(mesh(CYL, toon('#ffd54d'), [0, 0.06, 0], [0.13, 0.04, 0.13]));
      g.rotation.z = 0.2; g.scale.setScalar(1.3);
      break;
    }
    case 'tophat': {
      const m = toon('#2f2a3a');
      g.add(mesh(CYL, m, [0, -0.02, 0], [0.38, 0.03, 0.38]));
      g.add(mesh(CYL, m, [0, 0.18, 0], [0.24, 0.38, 0.24]));
      g.add(mesh(CYL, toon('#ff6f91'), [0, 0.05, 0], [0.245, 0.07, 0.245]));
      break;
    }
    case 'crown': {
      const m = toon('#ffcc33');
      g.add(mesh(new THREE.CylinderGeometry(0.26, 0.24, 0.14, 16, 1, true), m, [0, 0.02, 0]));
      for (let i = 0; i < 6; i++) {
        const a = i / 6 * Math.PI * 2;
        g.add(mesh(CONE, m, [Math.cos(a) * 0.24, 0.15, Math.sin(a) * 0.24], [0.05, 0.13, 0.05]));
      }
      g.add(ball(toon('#ff4d6d'), [0, 0.04, 0.26], 0.04));
      g.children[0].material.side = THREE.DoubleSide;
      g.scale.setScalar(1.3);
      break;
    }
    case 'glasses': {
      const m = toon('#3b2f4a');
      for (const s of [-1, 1]) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.018, 8, 20), m);
        ring.position.set(s * 0.18, 0, 0.03); g.add(ring);
      }
      g.add(mesh(BOX, m, [0, 0.01, 0.03], [0.14, 0.02, 0.02], false));
      break;
    }
    case 'sunglasses': {
      const m = toon('#1d1a24');
      for (const s of [-1, 1]) g.add(mesh(BOX, m, [s * 0.17, 0, 0.04], [0.2, 0.13, 0.03], false));
      g.add(mesh(BOX, m, [0, 0.03, 0.04], [0.5, 0.025, 0.02], false));
      break;
    }
    case 'scarf': {
      const m = toon('#ff5c5c');
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.08, 10, 24), m);
      ring.rotation.x = Math.PI / 2; ring.castShadow = true; g.add(ring);
      g.add(mesh(BOX, m, [0.14, -0.18, 0.27], [0.1, 0.3, 0.06]));
      break;
    }
    case 'bowtie': {
      const m = toon('#ff4d6d');
      const l = mesh(CONE, m, [-0.09, 0, 0], [0.08, 0.14, 0.06]); l.rotation.z = -Math.PI / 2;
      const r = mesh(CONE, m, [0.09, 0, 0], [0.08, 0.14, 0.06]); r.rotation.z = Math.PI / 2;
      g.add(l, r, ball(m, [0, 0, 0], 0.045));
      g.position.set(0, -0.02, 0.36);
      break;
    }
  }
  return g;
}

export function dressAnimal(anim, equipped, accessories) {
  for (const slot of ['hat', 'face', 'neck']) {
    const a = anim.anchors[slot];
    while (a.children.length) a.remove(a.children[0]);
    const id = equipped[slot];
    if (id && accessories.some(x => x.id === id)) a.add(makeAccessory(id));
  }
}

// ---------- Cenário ----------
export function makeTree(kind = 0, scale = 1) {
  const g = new THREE.Group();
  g.add(mesh(CYL, toon('#a0714f'), [0, 0.7, 0], [0.22, 1.4, 0.22]));
  const leaf = toon(['#7ccf6b', '#8fdc7a', '#ffb7cf', '#6fc48f'][kind % 4]);
  if (kind === 3) { // pinheiro
    g.add(mesh(CONE, leaf, [0, 1.9, 0], [1.1, 1.6, 1.1]));
    g.add(mesh(CONE, leaf, [0, 2.7, 0], [0.8, 1.2, 0.8]));
  } else {
    g.add(ball(leaf, [0, 2.1, 0], 1.05));
    g.add(ball(leaf, [0.6, 1.8, 0.2], 0.7));
    g.add(ball(leaf, [-0.55, 1.85, -0.1], 0.72));
    g.add(ball(leaf, [0.1, 2.6, -0.2], 0.7));
  }
  g.scale.setScalar(scale);
  return g;
}

export function makeHouse(wall, roof, w = 4, d = 3.6, h = 2.6) {
  const g = new THREE.Group();
  const walls = mesh(BOX, toon(wall), [0, h / 2, 0], [w, h, d]);
  walls.receiveShadow = true;
  g.add(walls);
  // telhado em prisma
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2 - 0.35, 0); shape.lineTo(w / 2 + 0.35, 0); shape.lineTo(0, 1.6); shape.lineTo(-w / 2 - 0.35, 0);
  const roofGeo = new THREE.ExtrudeGeometry(shape, { depth: d + 0.6, bevelEnabled: false });
  roofGeo.translate(0, 0, -(d + 0.6) / 2);
  const r = new THREE.Mesh(roofGeo, toon(roof));
  r.position.y = h; r.castShadow = true;
  g.add(r);
  // porta e janelas
  g.add(mesh(BOX, toon('#9b6b4b'), [0, 0.75, d / 2 + 0.02], [0.9, 1.5, 0.08], false));
  g.add(ball(toon('#ffd36b'), [0.28, 0.75, d / 2 + 0.08], 0.06, false));
  for (const s of [-1, 1]) {
    g.add(mesh(BOX, toon('#bfe9ff'), [s * w * 0.3, 1.5, d / 2 + 0.02], [0.75, 0.7, 0.06], false));
    g.add(mesh(BOX, toon('#ffffff'), [s * w * 0.3, 1.5, d / 2 + 0.05], [0.08, 0.72, 0.04], false));
  }
  g.add(mesh(BOX, toon('#d18f6b'), [w * 0.25, h + 1.0, -0.3], [0.45, 1.2, 0.45]));
  return g;
}

export function makeFlowerPatch(rng, count, radius) {
  const g = new THREE.Group();
  const cols = ['#ff8fab', '#fff27a', '#ffffff', '#b8a4ff', '#ff9f6b'];
  for (let i = 0; i < count; i++) {
    const a = rng() * Math.PI * 2, r = Math.sqrt(rng()) * radius;
    g.add(mesh(CYL, toon('#5fae55'), [Math.cos(a) * r, 0.12, Math.sin(a) * r], [0.025, 0.24, 0.025], false));
    g.add(ball(toon(cols[i % cols.length]), [Math.cos(a) * r, 0.27, Math.sin(a) * r], 0.09, false));
  }
  return g;
}

export function makeFence(len, color = '#fff4e0') {
  const g = new THREE.Group();
  const m = toon(color);
  const n = Math.max(2, Math.round(len / 0.9));
  for (let i = 0; i < n; i++) {
    const x = -len / 2 + i * len / (n - 1);
    g.add(mesh(BOX, m, [x, 0.4, 0], [0.12, 0.8, 0.12]));
    g.add(mesh(CONE, m, [x, 0.87, 0], [0.09, 0.14, 0.09]));
  }
  g.add(mesh(BOX, m, [0, 0.55, 0], [len, 0.09, 0.06]));
  g.add(mesh(BOX, m, [0, 0.3, 0], [len, 0.09, 0.06]));
  return g;
}

// Textura de texto (placas e etiquetas)
export function textCanvas(lines, { w = 512, h = 128, bg = '#fffaf3', fg = '#3b2f4a', border = '#f0c9a8', font = 64, radius = 36 } = {}) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const x = c.getContext('2d');
  if (bg) {
    x.fillStyle = bg;
    x.beginPath(); x.roundRect(6, 6, w - 12, h - 12, radius); x.fill();
    if (border) { x.lineWidth = 10; x.strokeStyle = border; x.stroke(); }
  }
  x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle';
  const arr = Array.isArray(lines) ? lines : [lines];
  arr.forEach((ln, i) => {
    const size = i === 0 ? font : font * 0.6;
    x.font = `800 ${size}px "Baloo 2", system-ui, sans-serif`;
    const y = h / 2 + (i - (arr.length - 1) / 2) * font * 0.85;
    x.fillText(ln, w / 2, y);
  });
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export function makeLabel(text, opts = {}) {
  const tex = textCanvas(text, { w: 512, h: 128, font: 58, ...opts });
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthWrite: false }));
  const s = opts.size || 1.6;
  sp.scale.set(s, s / 4, 1);
  sp.renderOrder = 5;
  return sp;
}

// Ícone flutuante (!, 🔒, ✓) que pode ser trocado
export function makeIcon() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthWrite: false }));
  sp.scale.set(0.8, 0.8, 1);
  sp.renderOrder = 6;
  let cur = null;
  sp.userData.set = (kind) => {
    if (kind === cur) return;
    cur = kind;
    sp.visible = !!kind;
    if (!kind) return;
    const x = c.getContext('2d');
    x.clearRect(0, 0, 128, 128);
    const bg = { quest: '#ffc94d', lock: '#c9bfd6', done: '#4cc38a', talk: '#8ec5ff', shop: '#ff8fab', play: '#b388ff' }[kind];
    x.fillStyle = bg; x.beginPath(); x.arc(64, 64, 56, 0, Math.PI * 2); x.fill();
    x.lineWidth = 8; x.strokeStyle = '#fff'; x.stroke();
    x.textAlign = 'center'; x.textBaseline = 'middle';
    const sym = { quest: '!', lock: '🔒', done: '✓', talk: '💬', shop: '🛍️', play: '▶' }[kind];
    x.font = sym.length === 1 && /[!✓▶]/.test(sym) ? '800 78px "Baloo 2", sans-serif' : '60px sans-serif';
    x.fillStyle = '#fff';
    x.fillText(sym, 64, sym === '!' ? 70 : 68);
    tex.needsUpdate = true;
  };
  return sp;
}

export function makeSign(text, sub) {
  const g = new THREE.Group();
  const wood = toon('#b9825c');
  g.add(mesh(BOX, wood, [-0.9, 0.8, 0], [0.12, 1.6, 0.12]));
  g.add(mesh(BOX, wood, [0.9, 0.8, 0], [0.12, 1.6, 0.12]));
  const tex = textCanvas(sub ? [text, sub] : text, { w: 512, h: 200, font: 66, bg: '#fff3dc', border: '#b9825c', radius: 24 });
  const board = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.86, 0.1), [wood, wood, wood, wood, new THREE.MeshToonMaterial({ map: tex, gradientMap: grad }), wood]);
  board.position.y = 1.5; board.castShadow = true;
  g.add(board);
  return g;
}

// ---------- Frutas ----------
export function makeFruit(kind, s = 1) {
  const g = new THREE.Group();
  const stem = toon('#7a5236'), leaf = toon('#5cbf5a');
  switch (kind) {
    case 'redApple': case 'greenApple': {
      g.add(ball(toon(kind === 'redApple' ? '#ef3b3b' : '#8fd14f'), [0, 0.28, 0], [0.28, 0.26, 0.28]));
      g.add(mesh(CYL, stem, [0, 0.58, 0], [0.025, 0.14, 0.025]));
      const l = ball(leaf, [0.08, 0.6, 0], [0.09, 0.03, 0.05]); l.rotation.z = 0.5; g.add(l);
      break;
    }
    case 'orange':
      g.add(ball(toon('#ff9a2e'), [0, 0.28, 0], 0.28));
      g.add(ball(leaf, [0.05, 0.56, 0], [0.08, 0.03, 0.05]));
      break;
    case 'banana': {
      const geo = new THREE.TorusGeometry(0.3, 0.08, 10, 20, Math.PI * 0.75);
      const b = new THREE.Mesh(geo, toon('#ffd93b'));
      b.rotation.z = Math.PI * 1.12; b.position.y = 0.42; b.castShadow = true;
      g.add(b);
      g.add(ball(stem, [-0.27, 0.48, 0], 0.04));
      break;
    }
    case 'strawberry': {
      const c = mesh(CONE, toon('#ff3d5e'), [0, 0.25, 0], [0.22, 0.42, 0.22]);
      c.rotation.x = Math.PI; g.add(c);
      g.add(ball(toon('#ff3d5e'), [0, 0.42, 0], [0.22, 0.12, 0.22]));
      g.add(mesh(CONE, leaf, [0, 0.52, 0], [0.18, 0.08, 0.18]));
      break;
    }
    case 'grapes':
      [[0, 0.5, 0], [-0.12, 0.38, 0], [0.12, 0.38, 0], [0, 0.26, 0.05], [-0.07, 0.15, 0], [0.07, 0.15, 0], [0, 0.38, 0.1]]
        .forEach(p => g.add(ball(toon('#9b5de5'), p, 0.1)));
      break;
    case 'pear':
      g.add(ball(toon('#c9df5a'), [0, 0.22, 0], 0.25));
      g.add(ball(toon('#c9df5a'), [0, 0.47, 0], 0.15));
      g.add(mesh(CYL, stem, [0, 0.66, 0], [0.02, 0.12, 0.02]));
      break;
    case 'watermelon': {
      g.add(ball(toon('#3fa34d'), [0, 0.32, 0], [0.42, 0.32, 0.32]));
      break;
    }
  }
  g.scale.setScalar(s);
  return g;
}

// Bloco com número (Number Square e minijogo)
export function makeNumberBlock(n, color = '#ffffff') {
  const tex = textCanvas(String(n), { w: 256, h: 256, bg: color, border: '#6c5ce7', fg: '#6c5ce7', font: 170, radius: 40 });
  const m = new THREE.MeshToonMaterial({ map: tex, gradientMap: grad });
  const b = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.9), m);
  b.castShadow = true;
  return b;
}

// Gema colorida (cores no minijogo)
export function makeGem(color) {
  const g = new THREE.Group();
  const m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 0), toon(color));
  m.castShadow = true; m.position.y = 0.5;
  g.add(m);
  return g;
}

export { SPH, SPH_LO, CONE, CYL, BOX, grad };
