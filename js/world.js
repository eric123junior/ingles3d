// A Vila Inicial: ilha, casas, caminhos, árvores, pomar, arena do minijogo e ponte para a próxima área.
import * as THREE from 'three';
import {
  toon, mesh, ball, makeTree, makeHouse, makeFlowerPatch, makeFence, makeSign, makeFruit,
  makeNumberBlock, CYL, BOX, CONE, SPH,
} from './models.js';

export const ISLAND_R = 34;

function rng(seed) {
  return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
}

// Vira o objeto para olhar um ponto (no plano XZ)
function face(obj, tx, tz) { obj.rotation.y = Math.atan2(tx - obj.position.x, tz - obj.position.z); }

export function buildWorld(scene) {
  const colliders = [];
  const reserved = []; // áreas sem árvores
  const anim = [];     // coisas animadas
  const R = rng(7);
  const addCol = (x, z, r) => colliders.push({ x, z, r });
  const reserve = (x, z, r) => reserved.push({ x, z, r });

  // ---------- Água e ilha ----------
  const water = new THREE.Mesh(new THREE.CircleGeometry(260, 64), toon('#7fd3f7'));
  water.rotation.x = -Math.PI / 2; water.position.y = -0.45;
  water.receiveShadow = true;
  scene.add(water);
  anim.push(t => { water.position.y = -0.45 + Math.sin(t * 0.8) * 0.04; });

  const sand = mesh(new THREE.CylinderGeometry(ISLAND_R + 2.4, ISLAND_R + 3.4, 0.9, 72), toon('#f7e2b0'), [0, -0.5, 0], 1, false);
  sand.receiveShadow = true; scene.add(sand);
  const grass = mesh(new THREE.CylinderGeometry(ISLAND_R, ISLAND_R + 0.6, 1, 72), toon('#98d97a'), [0, -0.5, 0], 1, false);
  grass.receiveShadow = true; scene.add(grass);

  // ---------- Caminhos ----------
  const pathMat = toon('#f3dcb4');
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

  // ---------- Fonte ----------
  const fountain = new THREE.Group();
  fountain.add(mesh(CYL, toon('#d9d4e8'), [0, 0.3, 0], [2.4, 0.6, 2.4]));
  const pool = mesh(CYL, toon('#8fdcff'), [0, 0.55, 0], [2.05, 0.1, 2.05], false);
  fountain.add(pool);
  fountain.add(mesh(CYL, toon('#d9d4e8'), [0, 1.1, 0], [0.35, 1.2, 0.35]));
  fountain.add(mesh(CYL, toon('#d9d4e8'), [0, 1.7, 0], [1.0, 0.18, 1.0]));
  const spout = ball(toon('#bfeeff'), [0, 2.1, 0], [0.35, 0.5, 0.35], false);
  fountain.add(spout);
  scene.add(fountain);
  addCol(0, 0, 2.7);
  anim.push(t => { spout.scale.y = 0.5 + Math.sin(t * 4) * 0.08; });

  // ---------- Estações ----------
  const stations = {};

  function houseStation(id, x, z, wall, roof, title, sub) {
    const h = makeHouse(wall, roof);
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

  houseStation('greet', -16, -7, '#fff1f5', '#ff9ebb', 'HELLO HOUSE', 'Casa do Olá');
  houseStation('colors', 16, -7, '#fffbe8', '#7cc6ff', 'COLOR STUDIO', 'Estúdio das Cores');
  // pinceladas de cor no estúdio
  [['#ef4444', -1.3], ['#facc15', -0.4], ['#3b82f6', 0.5], ['#22c55e', 1.4]].forEach(([c, dx], i) => {
    const pot = new THREE.Group();
    pot.add(mesh(CYL, toon('#ffffff'), [0, 0.25, 0], [0.3, 0.5, 0.3]));
    pot.add(mesh(CYL, toon(c), [0, 0.51, 0], [0.26, 0.04, 0.26], false));
    const s = stations.colors;
    const dir = s.npc.clone().sub(s.pos).normalize();
    const side = new THREE.Vector3(dir.z, 0, -dir.x);
    pot.position.copy(s.pos).addScaledVector(dir, 2.4).addScaledVector(side, dx - 3.2 + (i > 1 ? 0 : 0));
    scene.add(pot);
  });

  // Number Square: blocos de 1 a 10 em arco
  {
    const cx = -17, cz = 12;
    const base = new THREE.Mesh(new THREE.CircleGeometry(5.2, 40), toon('#e8e1ff'));
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
    const sign = makeSign('NUMBER SQUARE', 'Praça dos Números');
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
    const sign = makeSign('FRUIT GARDEN', 'Jardim das Frutas');
    sign.position.set(npc.x - dir.z * 2.6, 0, npc.z + dir.x * 2.6);
    face(sign, 0, 0); scene.add(sign); addCol(sign.position.x, sign.position.z, 0.9);
    path(npc.x, npc.z, dir.x * 5.5, dir.z * 5.5);
    reserve(cx, cz, 7.5);
    stations.fruits = { pos: new THREE.Vector3(cx, 0, cz), npc, look: new THREE.Vector3(0, 0, 0) };
  }

  // Padaria (missão)
  {
    const bx = 0, bz = -21;
    const h = makeHouse('#fff3d6', '#c98a5a', 6, 4.2, 3);
    h.position.set(bx, 0, bz); scene.add(h);
    addCol(bx - 1.6, bz, 2.6); addCol(bx + 1.6, bz, 2.6);
    // toldo listrado
    for (let i = 0; i < 6; i++) {
      const s = mesh(BOX, toon(i % 2 ? '#ffffff' : '#ff8fab'), [bx - 2.5 + i, 2.3, bz + 2.6], [1, 0.08, 1.2]);
      s.rotation.x = 0.35; scene.add(s);
    }
    // pãozinho gigante no teto
    const bread = ball(toon('#e9a35b'), [bx, 4.9, bz + 0.6], [0.9, 0.5, 0.6]);
    scene.add(bread);
    anim.push(t => { bread.rotation.y = Math.sin(t) * 0.3; });
    const sign = makeSign('BAKERY', 'Padaria');
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
    const sign = makeSign('SHOP', 'Loja');
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
    const sign = makeSign('WORD RUN', 'Corrida das Palavras');
    const sp = arena.center.clone().addScaledVector(dir, arena.radius + 1.8).add(new THREE.Vector3(dir.z * 3, 0, -dir.x * 3));
    sign.position.copy(sp); face(sign, 0, 0); scene.add(sign); addCol(sp.x, sp.z, 0.9);
    const npc = arena.center.clone().addScaledVector(dir, arena.radius + 1.2);
    path(npc.x, npc.z, dir.x * 5.5, dir.z * 5.5);
    reserve(ax, az, arena.radius + 2.5);
    stations.arena = { pos: arena.center.clone(), npc, look: new THREE.Vector3(0, 0, 0) };
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
    const sign = makeSign('FOREST', '🔒 Em breve');
    sign.position.set(-32, 0, 3.2); sign.rotation.y = Math.PI / 2; scene.add(sign);
    addCol(sign.position.x, sign.position.z, 0.9);
    // ilha da floresta ao longe
    const far = mesh(new THREE.CylinderGeometry(14, 15, 1, 40), toon('#7fc46a'), [-56, -0.5, 0], 1, false);
    scene.add(far);
    const fr = rng(99);
    for (let i = 0; i < 26; i++) {
      const a = fr() * Math.PI * 2, r = 3 + fr() * 10;
      const t = makeTree(3, 1 + fr() * 0.6);
      t.position.set(-56 + Math.cos(a) * r, 0, Math.sin(a) * r);
      scene.add(t);
    }
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
  let placed = 0;
  for (let tries = 0; tries < 900 && placed < 62; tries++) {
    const a = R() * Math.PI * 2, r = 6 + Math.sqrt(R()) * (ISLAND_R - 7);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (!free(x, z, 1.4)) continue;
    const t = makeTree(Math.floor(R() * 4), 0.8 + R() * 0.5);
    t.position.set(x, 0, z); t.rotation.y = R() * 6;
    scene.add(t); addCol(x, z, 0.6);
    placed++;
  }
  for (let i = 0; i < 26; i++) {
    const a = R() * Math.PI * 2, r = 7 + R() * (ISLAND_R - 9);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (!free(x, z, 1)) continue;
    const f = makeFlowerPatch(R, 7, 1);
    f.position.set(x, 0, z); scene.add(f);
  }
  for (let i = 0; i < 14; i++) {
    const a = R() * Math.PI * 2, r = 8 + R() * (ISLAND_R - 10);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (!free(x, z, 0.8)) continue;
    const s = ball(toon('#c9c2d6'), [x, 0.15, z], [0.5 + R() * 0.4, 0.35, 0.45 + R() * 0.3]);
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
