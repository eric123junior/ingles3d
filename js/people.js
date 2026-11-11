// Pessoas chibi (para os módulos com personagens humanos: Friends, Bíblia, jardineiros).
// Mesmo "contrato" do makeAnimal: { root, head, anchors, jump(), update(dt, speed) }.
//
// look = {
//   skin, hair, hairStyle: short | spiky | bob | long | wavy | bun | ponytail | curly | bald,
//   top (camisa), bottom (calça), shoes,
//   robe: cor da túnica/vestido (cobre as pernas), sash: faixa na cintura,
//   head: veil | headcloth (pano na cabeça) + headColor, band (cor da faixa),
//   beard: cor da barba, extras: ['apron', 'overalls', 'jacket', 'tie', 'strawHat', 'helmet', 'guitar', 'staff', 'harness'],
//   jacket, scale
// }
import * as THREE from 'three';
import { toon, mesh, ball, CYL, CONE, BOX } from './models.js';

const HEMI = new THREE.SphereGeometry(1, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.5);

function hairOn(head, look) {
  const style = look.hairStyle || 'short';
  const m = toon(look.hair || '#4a3428');
  const add = (o) => { head.add(o); return o; };
  if (style !== 'bald') {
    const cap = add(mesh(HEMI, m, [0, 0.03, -0.02], [0.49, 0.5, 0.48]));
    cap.rotation.x = -0.28;
    add(ball(m, [0, -0.06, -0.13], [0.46, 0.42, 0.36]));
  }
  switch (style) {
    case 'bald':
      add(ball(m, [0, -0.12, -0.2], [0.44, 0.22, 0.3]));
      break;
    case 'spiky':
      for (let i = 0; i < 5; i++) {
        const c = add(mesh(CONE, m, [-0.24 + i * 0.12, 0.42, 0.12 - Math.abs(i - 2) * 0.05], [0.09, 0.2, 0.09]));
        c.rotation.x = 0.5;
      }
      break;
    case 'bob':
      for (const s of [-1, 1]) add(ball(m, [s * 0.4, -0.16, -0.02], [0.15, 0.34, 0.3]));
      add(ball(m, [0, -0.2, -0.14], [0.48, 0.42, 0.36]));
      break;
    case 'long': case 'wavy':
      for (const s of [-1, 1]) {
        add(ball(m, [s * 0.4, -0.18, -0.02], [0.15, 0.36, 0.3]));
        add(ball(m, [s * 0.36, -0.5, 0.0], [0.13, 0.32, 0.16]));
        if (style === 'wavy') for (let k = 0; k < 3; k++) add(ball(m, [s * 0.42, -0.3 - k * 0.2, 0.08], 0.1));
      }
      add(ball(m, [0, -0.5, -0.22], [0.44, 0.6, 0.2]));
      break;
    case 'bun':
      add(ball(m, [0, 0.38, -0.26], 0.18));
      break;
    case 'ponytail': {
      add(ball(m, [0, 0.12, -0.46], 0.1));
      const tail = add(ball(m, [0, -0.2, -0.52], [0.12, 0.32, 0.12]));
      tail.rotation.x = 0.3;
      break;
    }
    case 'curly':
      for (let i = 0; i < 11; i++) {
        const a = Math.PI * 0.18 + i / 10 * Math.PI * 1.64; // em volta, sem tampar o rosto
        add(ball(m, [Math.sin(a) * 0.5, -0.05 + Math.cos(i * 1.7) * 0.12, Math.cos(a) * 0.46 - 0.04], 0.17));
      }
      add(ball(m, [0, 0.38, -0.05], [0.4, 0.2, 0.4]));
      break;
  }
}

function headCloth(head, look) {
  const c = toon(look.headColor || '#f3ead8');
  const shell = mesh(HEMI, c, [0, 0.04, -0.02], [0.53, 0.54, 0.52]);
  shell.rotation.x = -0.32;
  head.add(shell);
  // um pouquinho de cabelo aparecendo na testa
  if (look.hairStyle !== 'bald') head.add(ball(toon(look.hair || '#4a3428'), [0, 0.2, 0.33], [0.3, 0.08, 0.1], false));
  // pano caindo nas costas
  head.add(ball(c, [0, -0.32, -0.22], [0.5, 0.58, 0.28]));
  if (look.head === 'headcloth') {
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.045, 8, 28), toon(look.band || '#5a4636'));
    band.rotation.x = Math.PI / 2 - 0.3; band.position.set(0, 0.2, -0.03);
    head.add(band);
  }
}

export function makePerson(look = {}) {
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  const skin = toon(look.skin || '#f2c6a0');
  const top = toon(look.top || '#6cc7ff');
  const bottom = toon(look.bottom || '#4a5a7a');
  const shoes = toon(look.shoes || '#4a3b36');
  const mEye = toon('#2b2233'), mWhite = toon('#ffffff'), mCheek = toon('#ff9db5');
  const extras = look.extras || [];
  const robe = look.robe ? toon(look.robe) : null;

  // pés (sapato + perninha)
  const feet = [];
  for (const s of [-1, 1]) {
    const f = new THREE.Group();
    f.position.set(s * 0.14, 0, 0);
    f.add(ball(shoes, [0, 0.08, 0.05], [0.13, 0.09, 0.18]));
    if (!robe) f.add(mesh(CYL, bottom, [0, 0.27, 0], [0.11, 0.34, 0.11]));
    root.add(f);
    feet.push(f);
  }

  // corpo
  if (robe) {
    body.add(mesh(CONE, robe, [0, 0.5, 0], [0.42, 0.86, 0.36]));
    body.add(ball(robe, [0, 0.68, 0], [0.34, 0.32, 0.28]));
    if (look.sash) {
      const s = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.05, 8, 24), toon(look.sash));
      s.rotation.x = Math.PI / 2; s.position.y = 0.6; s.scale.set(1, 0.85, 1);
      body.add(s);
    }
  } else {
    body.add(ball(bottom, [0, 0.46, 0], [0.32, 0.18, 0.27]));
    body.add(ball(top, [0, 0.66, 0], [0.35, 0.33, 0.29]));
  }
  body.add(mesh(CYL, skin, [0, 0.95, 0], [0.11, 0.12, 0.11], false));

  if (extras.includes('jacket')) {
    const j = toon(look.jacket || '#3b3340');
    for (const s of [-1, 1]) body.add(ball(j, [s * 0.2, 0.67, 0.07], [0.19, 0.32, 0.25]));
    body.add(ball(j, [0, 0.67, -0.06], [0.34, 0.32, 0.24]));
  }
  if (extras.includes('tie')) body.add(mesh(BOX, toon(look.tieColor || '#c0392b'), [0, 0.7, 0.28], [0.07, 0.28, 0.04], false));
  if (extras.includes('apron')) body.add(ball(toon(look.apronColor || '#ffffff'), [0, 0.55, 0.22], [0.27, 0.3, 0.09]));
  if (extras.includes('overalls')) {
    const o = toon(look.bottom || '#4a6fa5');
    body.add(mesh(BOX, o, [0, 0.74, 0.25], [0.3, 0.2, 0.06]));
    for (const s of [-1, 1]) body.add(mesh(BOX, o, [s * 0.13, 0.86, 0.17], [0.06, 0.08, 0.2], false));
  }
  if (extras.includes('harness')) { // cinto de segurança do podador
    const h = toon('#ff8a00');
    const belt = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.035, 6, 24), h);
    belt.rotation.x = Math.PI / 2; belt.position.y = 0.52; body.add(belt);
    for (const s of [-1, 1]) { const st = mesh(BOX, h, [s * 0.12, 0.7, 0.26], [0.05, 0.36, 0.03], false); st.rotation.z = s * 0.2; body.add(st); }
    body.add(new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.015, 6, 12), toon('#9aa3b2')).translateY(0.5).translateZ(0.32));
  }
  if (extras.includes('guitar')) {
    const g = new THREE.Group();
    g.add(ball(toon('#c98a4b'), [0, 0, 0], [0.2, 0.25, 0.07]));
    g.add(ball(toon('#c98a4b'), [0, 0.22, 0], [0.15, 0.17, 0.07]));
    g.add(mesh(BOX, toon('#6b4a36'), [0, 0.55, 0], [0.06, 0.5, 0.04]));
    g.position.set(0.05, 0.62, -0.33); g.rotation.z = 0.5;
    body.add(g);
  }

  // cabeça
  const head = new THREE.Group();
  head.position.set(0, 1.3, 0);
  body.add(head);
  head.add(ball(skin, [0, 0, 0], [0.46, 0.45, 0.44]));
  for (const s of [-1, 1]) {
    head.add(ball(mEye, [s * 0.15, 0.0, 0.405], [0.06, 0.08, 0.04], false));
    head.add(ball(mWhite, [s * 0.15 + 0.02, 0.035, 0.435], 0.022, false));
    head.add(ball(mCheek, [s * 0.27, -0.11, 0.34], [0.065, 0.04, 0.03], false));
    head.add(ball(skin, [s * 0.45, -0.03, 0], [0.07, 0.1, 0.06], false));
  }
  head.add(ball(skin, [0, -0.06, 0.445], [0.05, 0.045, 0.04], false));
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.012, 6, 12, Math.PI), mEye);
  mouth.position.set(0, -0.17, 0.41); mouth.rotation.z = Math.PI;
  head.add(mouth);
  if (look.head) headCloth(head, look); else hairOn(head, look);
  if (look.beard) {
    const b = toon(look.beard);
    head.add(ball(b, [0, -0.28, 0.25], [0.32, 0.26, 0.22]));
    head.add(ball(b, [0, -0.11, 0.41], [0.13, 0.04, 0.04], false));
  }
  if (extras.includes('strawHat')) {
    const h = toon('#f0d58a');
    head.add(mesh(CYL, h, [0, 0.36, 0], [0.7, 0.03, 0.7]));
    head.add(ball(h, [0, 0.42, 0], [0.38, 0.24, 0.38]));
    head.add(mesh(CYL, toon('#e2574c'), [0, 0.42, 0], [0.385, 0.06, 0.385], false));
  }
  if (extras.includes('helmet')) {
    const h = toon('#ff8a00');
    head.add(mesh(HEMI, h, [0, 0.12, 0], [0.52, 0.48, 0.52]));
    head.add(mesh(CYL, h, [0, 0.13, 0.06], [0.56, 0.03, 0.58]));
  }

  // braços
  const arms = [];
  const sleeve = robe || (extras.includes('jacket') ? toon(look.jacket || '#3b3340') : top);
  for (const s of [-1, 1]) {
    const pivot = new THREE.Group();
    pivot.position.set(s * 0.33, 0.86, 0);
    pivot.add(ball(sleeve, [s * 0.04, -0.13, 0.02], [0.1, 0.17, 0.1]));
    pivot.add(ball(skin, [s * 0.05, -0.3, 0.03], 0.075));
    if (s === 1 && extras.includes('staff')) {
      pivot.add(mesh(CYL, toon('#8a6248'), [0.06, -0.15, 0.08], [0.03, 1.5, 0.03]));
      const hook = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.03, 6, 12, Math.PI), toon('#8a6248'));
      hook.position.set(0.16, 0.6, 0.08); hook.rotation.z = 0; pivot.add(hook);
    }
    body.add(pivot);
    arms.push(pivot);
  }

  const anchors = { hat: new THREE.Group(), face: new THREE.Group(), neck: new THREE.Group() };
  anchors.hat.position.set(0, 0.46, 0);
  anchors.face.position.set(0, 0.01, 0.43);
  anchors.neck.position.set(0, 0.92, 0);
  head.add(anchors.hat, anchors.face);
  body.add(anchors.neck);

  root.scale.setScalar(look.scale || 1);
  root.traverse(o => { if (o.isMesh) o.receiveShadow = false; });

  let phase = Math.random() * 10, t = Math.random() * 10, happy = 0;
  return {
    root, head, anchors, species: 'person',
    jump() { happy = 1; },
    update(dt, speed) {
      t += dt;
      const moving = speed > 0.1;
      phase += dt * (moving ? 11 : 0);
      const sw = moving ? Math.sin(phase) : 0;
      feet[0].position.z = sw * 0.14;
      feet[1].position.z = -sw * 0.14;
      feet[0].position.y = moving ? Math.max(0, Math.cos(phase)) * 0.07 : 0;
      feet[1].position.y = moving ? Math.max(0, -Math.cos(phase)) * 0.07 : 0;
      arms[0].rotation.x = -sw * 0.7;
      arms[1].rotation.x = sw * 0.7;
      const breathe = Math.sin(t * 2.2) * 0.012;
      body.position.y = moving ? Math.abs(Math.sin(phase)) * 0.06 : 0;
      body.scale.set(1 - breathe * 0.5, 1 + breathe, 1 - breathe * 0.5);
      head.rotation.z = moving ? Math.sin(phase * 0.5) * 0.05 : Math.sin(t * 1.3) * 0.035;
      if (happy > 0) {
        happy = Math.max(0, happy - dt * 1.6);
        const j = Math.sin((1 - happy) * Math.PI * 2);
        root.position.y = Math.max(0, j) * 0.6;
        arms[0].rotation.z = -2.4 * happy; arms[1].rotation.z = 2.4 * happy;
      } else { root.position.y = 0; arms[0].rotation.z = 0; arms[1].rotation.z = 0; }
    },
  };
}
