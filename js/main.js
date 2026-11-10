// Bichinhos English — jogo 3D para aprender inglês. Arquivo principal: cena, personagens, fluxo do jogo.
import * as THREE from 'three';
import { buildWorld } from './world.js';
import { makeAnimal, dressAnimal, makeLabel, makeIcon, makeFruit, toon, CONE } from './models.js';
import { Controls, PlayerMover, isTouch } from './player.js';
import { S, save, resetSave, levelInfo, support, touchDay, shownStreak } from './state.js';
import {
  GAME_NAME, THEME, SPECIES, FUR_COLORS, NAMES, ACCESSORIES, FRUIT_ITEMS, NUM_WORDS, NUM_PT, SMALL_TALK, VOICES, LINES, PEOPLE,
  ORDER_KINDS, ORDER_MAX, orderPhrase,
} from './content.js';
import { UNITS, WORDBANK, WORDBANK_STAGE, stageIcon, stageLabel, stageKey } from './course.js';
import { PROFILES, PROFILE, profileId, chooseProfile } from './profile.js';
import { speak, sfx, unlockAudio, stopSpeaking } from './audio.js';
import { $, esc, toast, confetti, dialog, modal, ptHtml, label, picHtml } from './ui.js';
import { runSession, buildWords, buildGrammar, buildListen, buildTalk, buildReview } from './lesson.js';
import { addItems, dueItems, learnedItems, grade } from './srs.js';
import { WordRun } from './minigame.js';

// ---------- Cena ----------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, isTouch ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
$('game').appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(THEME.sky);
scene.fog = new THREE.Fog(THEME.sky, 55, 130);
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 400);

scene.add(new THREE.HemisphereLight('#ffffff', THEME.ground, 1.6));
const sun = new THREE.DirectionalLight('#fff6e8', 1.9);
sun.castShadow = true;
sun.shadow.mapSize.set(isTouch ? 1024 : 2048, isTouch ? 1024 : 2048);
Object.assign(sun.shadow.camera, { left: -22, right: 22, top: 22, bottom: -22, near: 1, far: 80 });
sun.shadow.bias = -0.0008;
scene.add(sun, sun.target);

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

const world = buildWorld(scene, THEME);
const mover = new PlayerMover();
let mode = 'title'; // title | creator | play | busy | minigame
const controls = new Controls(renderer.domElement, { onInteract: () => doInteract() });

document.title = GAME_NAME;

// ---------- Jogador ----------
let player = null;
function buildPlayer() {
  if (player) scene.remove(player.root);
  player = makeAnimal(S.species, S.color);
  dressAnimal(player, S.equipped, ACCESSORIES);
  scene.add(player.root);
}
buildPlayer();

const speciesOf = id => SPECIES.find(s => s.id === id) || SPECIES[0];

// ---------- Bichinhos do cenário (vêm do tema do jogador) ----------
const NPC_DEFS = Object.entries(THEME.people).map(([id, p]) => ({ id, ...p }));
const WANDER_DEFS = THEME.wanderers;
// troca {name} pelo nome do jogador nas falas do tema
const tx = o => ({ en: o.en.replace('{name}', S.name), pt: o.pt.replace('{name}', S.name) });

const npcs = [];
function addNpc(def, pos, wander) {
  const anim = makeAnimal(def.species, def.color);
  dressAnimal(anim, { hat: def.hat || null, face: def.face || null, neck: def.neck || null }, ACCESSORIES);
  anim.root.position.copy(pos);
  scene.add(anim.root);
  const tag = makeLabel(def.name, { size: 1.5 });
  tag.position.y = 2.25;
  anim.root.add(tag);
  const icon = makeIcon();
  icon.position.y = 2.95;
  anim.root.add(icon);
  const n = { ...def, voice: VOICES[def.id], look: world.stations[def.id]?.look, anim, pos: anim.root.position, icon, wander, heading: 0, col: { x: pos.x, z: pos.z, r: 0.55 }, speed: 0 };
  if (wander) Object.assign(n, { target: null, wait: Math.random() * 3 });
  npcs.push(n);
  return n;
}
for (const d of NPC_DEFS) addNpc(d, world.stations[d.id].npc.clone(), false);
const WAYPOINTS = Object.values(world.stations).map(s => s.npc.clone().lerp(new THREE.Vector3(), 0.25));
for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; WAYPOINTS.push(new THREE.Vector3(Math.cos(a) * 4.4, 0, Math.sin(a) * 4.4)); }
WANDER_DEFS.forEach((d, i) => addNpc(d, WAYPOINTS[i * 2].clone(), true));
const npcById = id => npcs.find(n => n.id === id);

// ---------- Curso: progresso e desbloqueios ----------
const stageDone = key => !!S.course[key];
const unitDone = u => u.stages.every(s => stageDone(stageKey(u, s)));
const unitIndex = u => UNITS.indexOf(u);
const unitUnlocked = u => unitIndex(u) === 0 || unitDone(UNITS[unitIndex(u) - 1]);
const nextStage = u => u.stages.find(s => !stageDone(stageKey(u, s)));
const unitOfNpc = id => UNITS.find(u => u.npc === id);
const missionAt = (u, id) => [].concat(u.stages[u.stages.length - 1].at).includes(id);
// missão pronta para fazer com este bichinho (todas as etapas antes dela feitas)
function readyMission(id) {
  for (const u of UNITS) {
    if (!unitUnlocked(u) || unitDone(u)) continue;
    const s = nextStage(u);
    if (s.type === 'mission' && [].concat(s.at).includes(id)) {
      if (s.talks && S.met.includes(id)) return null;
      return { unit: u, stage: s };
    }
  }
  return null;
}
// o trabalho das frutas abre quando a unidade que ensina as frutas termina
const FRUIT_UNIT = UNITS.find(u => u.stages.some(s => stageKey(u, s) === WORDBANK_STAGE.fruits));
const fruitJobOpen = () => unitDone(FRUIT_UNIT);

function unlocked(id) {
  if (id === 'arena') return stageDone(WORDBANK_STAGE.numbers);
  const u = unitOfNpc(id);
  return u ? unitUnlocked(u) : true;
}

function npcStatus(n) {
  if (readyMission(n.id)) return 'quest';
  if (n.wander) return null;
  if (n.id === 'shop') return 'shop';
  if (n.id === 'mayor') return S.profile.job ? 'done' : 'talk';
  if (n.id === 'arena') return unlocked('arena') ? (S.playedRun ? 'play' : 'quest') : 'lock';
  if (n.id === 'bakery') return S.order ? 'quest' : fruitJobOpen() ? 'talk' : 'lock';
  const u = unitOfNpc(n.id);
  if (!u) return 'talk';
  if (!unitUnlocked(u)) return 'lock';
  if (unitDone(u)) return 'done';
  const s = nextStage(u);
  return s.type === 'mission' && !missionAt(u, n.id) ? 'talk' : 'quest';
}

// Próximo objetivo (texto + bichinho de destino)
function currentGoal() {
  const due = dueItems().length;
  if (due >= 8) return { npc: null, en: `Do your daily review (${due})`, pt: `Faça a revisão do dia: botão 🧠 (${due})` };
  for (const u of UNITS) {
    if (unitDone(u)) continue;
    const s = nextStage(u);
    if (s.type === 'mission') {
      const targets = [].concat(s.at).filter(id => !(s.talks && S.met.includes(id)));
      const near = targets.map(npcById).filter(Boolean).sort((a, b) => a.pos.distanceTo(mover.pos) - b.pos.distanceTo(mover.pos))[0];
      return { npc: near ? near.id : null, en: s.title.en, pt: s.title.pt + (s.talks ? ` (${S.met.length}/${Object.keys(s.talks).length})` : '') };
    }
    const P = PEOPLE[u.npc];
    return { npc: u.npc, en: `${P.name}: ${s.title.en}`, pt: `${P.name} ${P.emoji}: ${s.title.pt}` };
  }
  if (S.order) return { npc: 'bakery', en: `Bring ${orderPhrase(S.order)} to ${PEOPLE.bakery.name}`, pt: `Leve ${orderPt(S.order)} para ${PEOPLE.bakery.pt} ${PEOPLE.bakery.emoji}`, fruit: true };
  if (due) return { npc: null, en: `Do your daily review (${due})`, pt: `Faça a revisão do dia: botão 🧠 (${due})` };
  return { npc: null, en: `Units complete! Review, play Word Run or help ${PEOPLE.bakery.name}.`, pt: `Unidades completas! Revise, jogue a Corrida das Palavras ou ajude ${PEOPLE.bakery.pt}.` };
}

// ---------- HUD ----------
function updateHud() {
  const li = levelInfo();
  $('hudAvatar').textContent = speciesOf(S.species).emoji;
  $('hudName').textContent = S.name;
  $('hudLevel').textContent = (support() === 'full' ? 'Nv ' : 'Lv ') + li.level;
  $('hudXp').style.width = (li.cur / li.need * 100) + '%';
  $('hudCoins').textContent = S.coins;
  $('hudStreak').textContent = shownStreak();
  const due = dueItems().length;
  $('btnReview').classList.toggle('hidden', !due);
  $('hudDue').textContent = due;
  const g = currentGoal();
  $('goal').innerHTML = '🎯 ' + (support() === 'full' ? esc(g.pt) : `${esc(g.en)}<br>${ptHtml(g.pt, '')}`);
  updateBasket();
  npcs.forEach(n => n.icon.userData.set(npcStatus(n)));
}

// ---------- Recompensas ----------
function grant(xp, coins) {
  const before = levelInfo().level, supBefore = support(before);
  S.xp += xp; S.coins += coins;
  const st = touchDay();
  if (st) {
    S.coins += 10;
    setTimeout(() => toast(`🔥 ${st} ${st === 1 ? 'dia' : 'dias'} seguidos! +10 💰`, 3000), 600);
  }
  const after = levelInfo().level;
  save();
  updateHud();
  if (after > before) {
    setTimeout(() => {
      sfx.levelUp(); confetti(90);
      toast(`⭐ Level ${after}! ⭐<br><small>${label('Level up!', 'Você subiu de nível!')}</small>`, 3200);
      if (support(after) !== supBefore) setTimeout(() => toast('💬 Agora vou usar mais inglês e menos português. Você consegue! 💪', 4200), 1800);
    }, 900);
  }
}

// ---------- Interação ----------
let nearest = null;
const ORCH_R = 1.35;

function findInteraction() {
  if (mode !== 'play') return null;
  let best = null, bd = 1e9;
  for (const n of npcs) {
    const d = n.pos.distanceTo(mover.pos);
    if (d < 2.4 && d < bd) { bd = d; best = { type: 'npc', n }; }
  }
  if (fruitJobOpen()) for (const f of world.orchard) {
    if (!f.active) continue;
    const d = f.home.distanceTo(mover.pos);
    if (d < ORCH_R && d < bd) { bd = d; best = { type: 'fruit', f }; }
  }
  if (Math.abs(mover.pos.z) < 2 && mover.pos.x < world.gate.x + 2.6) best = { type: 'gate' };
  return best;
}

let lastBtn = '';
function updateInteractButton() {
  nearest = findInteraction();
  let html = '';
  if (nearest) {
    const key = isTouch ? '' : '<span class="key">E</span>';
    if (nearest.type === 'npc') html = `💬 ${esc(nearest.n.name)}${key}`;
    else if (nearest.type === 'fruit') html = `${FRUIT_ITEMS[nearest.f.kind].emoji} ${label('Pick up', 'Pegar')}${key}`;
    else html = `🔒 ${THEME.gate.en}${key}`;
  }
  if (html !== lastBtn) {
    lastBtn = html;
    $('interact').innerHTML = html;
    $('interact').classList.toggle('hidden', !html);
  }
}
$('interact').addEventListener('click', () => doInteract());

async function busy(fn) {
  mode = 'busy';
  controls.enabled = false;
  controls.reset();
  $('interact').classList.add('hidden'); lastBtn = '';
  try { await fn(); } catch (e) { console.error(e); }
  if (mode === 'busy') { mode = 'play'; controls.enabled = true; }
  updateHud();
}

function doInteract() {
  if (mode !== 'play' || !nearest) return;
  unlockAudio();
  const it = nearest;
  if (it.type === 'fruit') return pickFruit(it.f);
  if (it.type === 'gate') return busy(() => dialog({
    name: `${THEME.gate.icon} ${THEME.gate.en}`, lines: [
      THEME.gate.line,
      { en: LINES.gate2, pt: 'Uma nova área chega na próxima versão do jogo!' },
    ],
  }));
  const n = it.n;
  faceTo(n, mover.pos);
  const mission = readyMission(n.id);
  if (mission) return busy(() => playMission(mission.unit, mission.stage, n));
  if (n.wander) return busy(() => smallTalk(n));
  if (n.id === 'mayor') return busy(() => talkMayor(n));
  if (n.id === 'shop') return busy(() => talkShop(n));
  if (n.id === 'arena') return busy(() => talkArena(n));
  if (n.id === 'bakery') return busy(() => talkBakery(n));
  return busy(() => talkTeacher(n));
}

function faceTo(n, p) { n.heading = Math.atan2(p.x - n.pos.x, p.z - n.pos.z); n.anim.root.rotation.y = n.heading; }

const OK_CHOICE = [{ label: '👍 OK', value: true, cls: 'primary' }];

async function smallTalk(n) {
  n.anim.jump();
  const ln = SMALL_TALK[Math.floor(Math.random() * SMALL_TALK.length)];
  await dialog({ name: n.name, voice: n.voice, lines: [{ en: LINES.hi(S.name), pt: `Oi, ${S.name}!` }, ln] });
}

// ---------- Professores e etapas do curso ----------
async function talkTeacher(n) {
  const u = unitOfNpc(n.id);
  if (!u) return;
  if (!unitUnlocked(u)) {
    const prev = UNITS[unitIndex(u) - 1];
    await dialog({ name: n.name, voice: n.voice, lines: [
      { en: LINES.teacherLocked, pt: `Olá! Volte depois, por favor. Primeiro termine a Unidade ${unitIndex(prev) + 1} (${prev.title.pt}) com ${PEOPLE[prev.npc].pt}.` },
    ] });
    return;
  }
  n.anim.jump();
  const first = !u.stages.some(s => stageDone(stageKey(u, s)));
  await dialog({ name: n.name, voice: n.voice, lines: [first ? u.intro : { en: LINES.teacherAgain, pt: 'Olá de novo! Vamos continuar aprendendo!' }] });
  // menu da unidade: escolhe uma etapa, joga, volta ao menu
  while (true) {
    const s = await unitMenu(u, n);
    if (!s) return;
    await playStage(u, s, n);
    if (unitDone(u)) return;
  }
}

function unitMenu(u, n) {
  return new Promise(res => {
    let chosen = null;
    const next = nextStage(u);
    const rows = u.stages.map((s, i) => {
      const key = stageKey(u, s), done = stageDone(key);
      const open = done || s === next;
      const stars = done ? '⭐'.repeat(S.course[key]) : '';
      let btn;
      if (!open) btn = `<span class="lock">🔒</span>`;
      else if (s.type === 'mission' && !missionAt(u, n.id)) btn = done ? `<span class="ok">✓</span>` : `<span class="where">📍 ${label('Go there', 'Vá até lá')}</span>`;
      else btn = `<button class="small ${done ? '' : 'go'}" data-i="${i}">${done ? '↻' : '▶'}</button>`;
      return `<div class="stage-row ${done ? 'done' : ''} ${s === next ? 'next' : ''}">
        <div class="st-ic">${stageIcon(s)}</div>
        <div class="st-txt"><small>${stageLabel(s)}</small><b>${esc(s.title.pt)}</b>${s === next && s.type === 'mission' ? `<small class="desc">${esc(s.desc)}</small>` : ''}</div>
        <div class="st-stars">${stars}</div>${btn}</div>`;
    }).join('');
    const doneCount = u.stages.filter(s => stageDone(stageKey(u, s))).length;
    modal(`<div class="unit-head"><span class="u-ic">${u.icon}</span><div><small>${label('Unit', 'Unidade')} ${unitIndex(u) + 1} · ${doneCount}/${u.stages.length}</small><h2>${esc(u.title.en)}</h2><div class="sub">${esc(u.title.pt)}</div></div></div>
      <div class="cando">🎯 ${esc(u.cando)}</div>
      <div class="stage-list">${rows}</div>
      <button class="big ghost" data-close>${label('Close', 'Fechar')}</button>`, {
      onClose: () => res(chosen),
      onMount: (p, close) => p.querySelectorAll('[data-i]').forEach(b => b.onclick = () => { sfx.click(); chosen = u.stages[+b.dataset.i]; close(); }),
    });
  });
}

// Joga uma etapa do curso (lição, gramática, escuta, conversa ou missão)
async function playStage(u, s, n) {
  const key = stageKey(u, s);
  const replay = stageDone(key);
  let steps;
  if (s.type === 'words') steps = buildWords(s);
  else if (s.type === 'grammar') steps = buildGrammar(s);
  else if (s.type === 'listen') steps = buildListen(s);
  else if (s.type === 'talk') steps = buildTalk(s.turns, s.partner, s.scene);
  else steps = buildTalk(s.talks ? s.talks[n.id] : s.talk, n.id, { en: s.title.en, pt: s.desc });
  const r = await runSession(steps, {
    teacher: PEOPLE[u.npc].emoji,
    onSave: (field, value) => { S.profile[field] = value; },
  });
  if (!r.done) return false;
  const correct = Math.max(0, r.total - r.mistakes);
  const stars = r.mistakes <= 1 ? 3 : r.mistakes <= 3 ? 2 : 1;
  let xp = 8 * correct + 15, coins = 2 * correct + 5 * stars;
  if (replay) { xp = Math.round(xp / 2); coins = Math.round(coins / 2); }

  // missão dos vizinhos: precisa conversar com os 3
  if (s.talks && !replay) {
    if (!S.met.includes(n.id)) S.met.push(n.id);
    const total = Object.keys(s.talks).length;
    if (S.met.length < total) {
      sfx.right(); n.anim.jump();
      toast(`🤝 ${label('New friends', 'Novos amigos')}: ${S.met.length}/${total}`, 2600);
      grant(Math.round(xp / 2), Math.round(coins / 2));
      return true;
    }
  }
  const jobWas = fruitJobOpen();
  S.course[key] = Math.max(S.course[key] || 0, stars);
  if (s.type === 'words') addItems(s.items);
  sfx.levelUp(); confetti();
  if (n) { n.anim.jump(); speak(LINES.greatJob(S.name), { voice: n.voice }); }
  const unitNow = !replay && unitDone(u);
  await resultModal({
    title: `${stageIcon(s)} ${esc(s.title.pt)}`, stars, xp, coins,
    extra: s.type === 'words' && !replay ? `<p class="sub">🧠 ${s.items.length} ${label('items added to your daily review', 'itens entraram na sua revisão diária')}</p>` : '',
  });
  grant(xp, coins);
  if (s.id === 'idcard') await showIdCard();
  if (unitNow) await unitComplete(u);
  else if (!replay && s === u.stages[u.stages.length - 2] && u.stages[u.stages.length - 1].type === 'mission') {
    const m = u.stages[u.stages.length - 1];
    setTimeout(() => toast(`🎯 ${esc(m.title.pt)}<br><small>${esc(m.desc)}</small>`, 5000), 400);
  }
  if (key === WORDBANK_STAGE.numbers && !replay) setTimeout(() => toast('🔓 Word Run (Corrida das Palavras)!'), 1200);
  if (!jobWas && fruitJobOpen()) setTimeout(() => toast(`🔓 ${THEME.job.icon} Novo trabalho: ajude ${esc(PEOPLE.bakery.pt)} com as frutas!`, 4500), 1600);
  return true;
}

async function playMission(u, s, n) {
  faceTo(n, mover.pos); n.anim.jump();
  await playStage(u, s, n);
}

async function unitComplete(u) {
  sfx.levelUp(); confetti(140);
  const nextU = UNITS[unitIndex(u) + 1];
  await resultModal({
    title: `🏅 ${label('Unit complete!', 'Unidade completa!')}`, stars: null, xp: 50, coins: 50,
    extra: `<p><b>${esc(u.title.en)}</b> · ${esc(u.title.pt)}</p><p class="cando">✅ ${esc(u.cando)}</p>` +
      (nextU ? `<p>🔓 ${label('Next unit', 'Próxima unidade')}: <b>${esc(nextU.title.pt)}</b> ${label('with', 'com')} ${PEOPLE[nextU.npc].name} ${PEOPLE[nextU.npc].emoji}</p>` : `<p>🎓 ${label('You finished all units of this version!', 'Você terminou todas as unidades desta versão!')}</p>`),
  });
  grant(50, 50);
}

function showIdCard() {
  return new Promise(res => {
    const P = S.profile;
    modal(`<h2>🎫 ${label(THEME.idTitle.en, THEME.idTitle.pt)}</h2>
      <div class="idcard"><div class="id-av">${speciesOf(S.species).emoji}</div><div>
        <div><small>Name</small><b>${esc(S.name)}</b></div>
        <div><small>From</small><b>${esc(P.from || '—')}</b></div>
        <div><small>Age</small><b>${esc(P.age || '—')}</b></div>
        <div><small>Job</small><b>${esc(P.job || '—')}</b></div></div></div>
      <button class="big primary" data-close>${label('Continue', 'Continuar')}</button>`, { onClose: res });
  });
}

async function talkMayor(n) {
  n.anim.jump();
  await dialog({ name: n.name, voice: n.voice, lines: [THEME.mayorHi] });
  if (S.profile.job) await showIdCard();
}

// ---------- Revisão diária ----------
async function startReview() {
  let items = dueItems();
  if (!items.length) {
    const all = learnedItems();
    if (!all.length) { toast('🧠 Faça uma lição primeiro para ter o que revisar!'); return; }
    items = all.sort(() => Math.random() - 0.5).slice(0, 10);
  }
  items = items.slice(0, 15);
  const r = await runSession(buildReview(items, learnedItems()), {
    teacher: '🧠',
    onResult: (step, ok) => { if (step.item) grade(step.item.en, ok); },
  });
  save();
  if (!r.done) { updateHud(); return; }
  const correct = Math.max(0, r.total - r.mistakes);
  sfx.levelUp(); confetti();
  await resultModal({ title: `🧠 ${label('Review complete!', 'Revisão completa!')}`, stars: null, xp: 5 * correct + 10, coins: 2 * correct,
    extra: `<p class="sub">✅ ${correct}/${r.total} · ${label('What you missed comes back sooner.', 'O que você errou volta mais cedo para revisar.')}</p>` });
  grant(5 * correct + 10, 2 * correct);
}
$('btnReview').addEventListener('click', () => { if (mode !== 'play') return; sfx.click(); unlockAudio(); busy(startReview); });

function resultModal({ title, stars, xp, coins, extra = '' }) {
  return new Promise(res => {
    const st = stars == null ? '' : `<div class="result-stars">${[1, 2, 3].map(i => `<span class="${i <= stars ? '' : 'off'}">⭐</span>`).join('')}</div>`;
    modal(`
      <h2>${title}</h2>${st}
      <div class="reward-row"><div class="reward">+${xp} XP</div><div class="reward">+${coins} 💰</div></div>
      ${extra}
      <button class="big primary" data-close>${label('Continue', 'Continuar')}</button>`, { onClose: res });
  });
}

// ---------- Minijogo ----------
const wordRun = new WordRun(scene, world.arena);
async function talkArena(n) {
  if (!unlocked('arena')) {
    await dialog({ name: n.name, voice: n.voice, lines: [{ en: LINES.arenaLocked, pt: `Oi! Aprenda os números primeiro (Unidade 2, com ${PEOPLE.numbers.pt}) e depois venha jogar!` }] });
    return;
  }
  n.anim.jump();
  const go = await dialog({
    name: n.name, voice: n.voice,
    lines: [
      { en: LINES.arenaHi(S.name), pt: `Oi, ${S.name}! Vamos jogar a Corrida das Palavras!` },
      { en: LINES.arenaHow, pt: 'Ouça a palavra e corra até o objeto certo! Se errar, perde 3 segundos.' },
    ],
    choices: [{ label: `▶ ${label('Play!', 'Jogar!')}`, value: true, cls: 'go' }, { label: label('Later', 'Depois'), value: false }],
  });
  if (!go) return;
  const cats = Object.keys(WORDBANK).filter(c => stageDone(WORDBANK_STAGE[c]));
  mode = 'minigame';
  controls.enabled = true;
  $('hud').classList.add('hidden');
  await new Promise(res => wordRun.start(cats, mover, async r => {
    controls.enabled = false; controls.reset();
    $('hud').classList.remove('hidden');
    mode = 'busy';
    if (r.quit && r.score === 0) return res();
    const best = r.score > S.bestRun;
    if (best) S.bestRun = r.score;
    const first = !S.playedRun;
    S.playedRun = true;
    const xp = Math.round(r.score / 2) + 10, coins = Math.round(r.score / 4) + (first ? 20 : 5);
    sfx.levelUp(); confetti();
    await resultModal({
      title: `🏃 Word Run`, xp, coins, stars: null,
      extra: `<p class="sub">⭐ ${r.score} ${label('points', 'pontos')} · ✅ ${r.hits}<br>${best ? '🏆 ' + label('New record!', 'Novo recorde!') : `🏆 ${label('Record', 'Recorde')}: ${S.bestRun}`}</p>`,
    });
    grant(xp, coins);
    res();
  }));
  mover.pos.copy(world.stations.arena.npc).lerp(new THREE.Vector3(), 0.1);
}

// ---------- Padaria (missão) ----------
let basket = [];
const countOf = (arr, k) => arr.filter(x => x === k).length;
function orderPt(o) {
  const f = FRUIT_ITEMS[o.kind];
  const fem = /maçã|banana|laranja/.test(f.pt);
  const num = o.n === 1 ? (fem ? 'uma' : 'um') : o.n === 2 ? (fem ? 'duas' : 'dois') : NUM_PT[o.n];
  return `${num} ${o.n === 1 ? f.pt : f.ptPlural}`;
}
function basketPhrase() {
  const kinds = [...new Set(basket)];
  return kinds.map(k => { const c = countOf(basket, k); return `${NUM_WORDS[c]} ${c === 1 ? FRUIT_ITEMS[k].en : FRUIT_ITEMS[k].plural}`; }).join(' and ');
}

function updateBasket() {
  const el = $('basket');
  const show = (S.order || basket.length) && mode !== 'title' && mode !== 'creator';
  el.classList.toggle('hidden', !show);
  if (!show) return;
  const order = S.order ? `📝 <b>${orderPhrase(S.order)}</b> <button id="bOrderSay">🔊</button>` : '';
  const items = basket.length ? basket.map(k => FRUIT_ITEMS[k].emoji).join('') : '—';
  el.innerHTML = `${order}<span>🧺 ${items}</span>${basket.length ? `<button id="bEmpty">${label('Empty', 'Esvaziar')}</button>` : ''}`;
  const sb = $('bOrderSay'); if (sb) sb.onclick = () => speak(LINES.bakeryNeed(S.order), { voice: VOICES.bakery });
  const eb = $('bEmpty'); if (eb) eb.onclick = () => { sfx.pop(); emptyBasket(); };
}
function emptyBasket() { basket = []; world.orchard.forEach(f => { f.active = true; f.mesh.visible = true; }); updateBasket(); }

function pickFruit(f) {
  if (basket.length >= 6) { toast(label('Your basket is full!', 'Sua cesta está cheia! Entregue ou esvazie.')); return; }
  f.active = false; f.mesh.visible = false;
  basket.push(f.kind);
  sfx.pop();
  speak(FRUIT_ITEMS[f.kind].en);
  toast(`${FRUIT_ITEMS[f.kind].emoji} <b>${FRUIT_ITEMS[f.kind].en}</b>`, 1200);
  player.jump();
  updateBasket();
}

function newOrder() {
  if (!S.missions) return { kind: 'redApple', n: 3 };
  let o;
  do o = { kind: ORDER_KINDS[Math.floor(Math.random() * ORDER_KINDS.length)], n: 1 + Math.floor(Math.random() * ORDER_MAX) };
  while (S.order && o.kind === S.order.kind && o.n === S.order.n);
  return o;
}

async function talkBakery(n) {
  if (!fruitJobOpen()) {
    await dialog({ name: n.name, voice: n.voice, lines: [
      THEME.job.locked1,
      { en: LINES.bakeryLocked2, pt: `Termine a Unidade ${unitIndex(FRUIT_UNIT) + 1} (${FRUIT_UNIT.title.pt}) com ${PEOPLE[FRUIT_UNIT.npc].pt} e depois volte aqui!` },
    ] });
    return;
  }
  n.anim.jump();
  if (!S.order) {
    S.order = newOrder(); save();
    await dialog({ name: n.name, voice: n.voice, lines: [
      tx(THEME.job.hello),
      { en: LINES.bakeryNeed(S.order), pt: `Eu preciso de ${orderPt(S.order)}, por favor.` },
      THEME.job.where,
    ], choices: OK_CHOICE });
    updateHud();
    return;
  }
  const o = S.order;
  if (!basket.length) {
    await dialog({ name: n.name, voice: n.voice, lines: [
      { en: LINES.bakeryRemind(o), pt: `Por favor, me traga ${orderPt(o)}. As frutas estão no ${THEME.signs.fruits[0]} (${THEME.signs.fruits[1]}).` },
    ] });
    return;
  }
  const ok = basket.length === o.n && countOf(basket, o.kind) === o.n;
  if (ok) {
    const reward = 40;
    await dialog({ name: n.name, voice: n.voice, lines: [
      { en: LINES.bakeryYes(o), pt: `Isso! ${orderPt(o).replace(/^./, c => c.toUpperCase())}! Muito obrigada!` },
      THEME.job.pay,
    ] });
    S.order = null; S.missions++;
    basket = []; emptyBasket();
    sfx.coin(); confetti();
    await resultModal({ title: `${THEME.job.icon} ${label('Mission complete!', 'Missão completa!')}`, stars: null, xp: 30, coins: reward,
      extra: `<p class="sub">${label(`Talk to ${PEOPLE.bakery.name} again for a new order!`, `Fale com ${PEOPLE.bakery.pt} de novo para um novo pedido!`)}</p>` });
    grant(30, reward);
  } else {
    sfx.wrong();
    await dialog({ name: n.name, voice: n.voice, lines: [
      { en: LINES.bakeryWrong, pt: `Ah não! Não está certo. Você trouxe: ${basket.map(k => FRUIT_ITEMS[k].emoji).join(' ')} (${basketPhrase()})` },
      { en: LINES.bakeryRetry(o), pt: `Eu preciso de ${orderPt(o)}. Tente de novo! (devolvi as frutas ao lugar)` },
    ] });
    emptyBasket();
  }
}

// ---------- Loja ----------
async function talkShop(n) {
  n.anim.jump();
  await dialog({ name: n.name, voice: n.voice, lines: [{ en: LINES.shopHello(S.name), pt: `Olá, ${S.name}! Bem-vindo(a) à minha loja!` }] });
  await new Promise(res => openShop(res));
}

function openShop(onClose) {
  const render = (p) => {
    p.querySelector('.coins-line').textContent = `💰 ${S.coins}`;
    const grid = p.querySelector('.shop-grid');
    grid.innerHTML = ACCESSORIES.map(a => {
      const owned = S.owned.includes(a.id), on = S.equipped[a.slot] === a.id;
      const btn = owned
        ? `<button data-eq="${a.id}" class="${on ? '' : 'go'}">${on ? label('Take off', 'Tirar') : label('Wear', 'Vestir')}</button>`
        : `<button data-buy="${a.id}" class="primary" ${S.coins < a.price ? 'disabled' : ''}>💰 ${a.price}</button>`;
      return `<div class="item ${on ? 'equipped' : ''}"><div class="ic">${a.icon}</div><div class="nm">${a.en}</div><div class="nmpt">${ptHtml(a.pt, '')}</div>${btn}</div>`;
    }).join('');
    grid.querySelectorAll('[data-buy]').forEach(b => b.onclick = () => {
      const a = ACCESSORIES.find(x => x.id === b.dataset.buy);
      if (S.coins < a.price) return;
      S.coins -= a.price; S.owned.push(a.id); S.equipped[a.slot] = a.id;
      sfx.coin(); speak(LINES.shopBuy(a), { voice: VOICES.shop });
      dressAnimal(player, S.equipped, ACCESSORIES); player.jump();
      save(); updateHud(); render(p);
    });
    grid.querySelectorAll('[data-eq]').forEach(b => b.onclick = () => {
      const a = ACCESSORIES.find(x => x.id === b.dataset.eq);
      S.equipped[a.slot] = S.equipped[a.slot] === a.id ? null : a.id;
      sfx.pop();
      if (S.equipped[a.slot]) speak(a.en, { voice: VOICES.shop });
      dressAnimal(player, S.equipped, ACCESSORIES); player.jump();
      save(); render(p);
    });
  };
  modal(`<h2>🛍️ Shop</h2><div class="coins-line"></div><div class="shop-grid"></div>
    <button class="big ghost" data-close>${label('Close', 'Fechar')}</button>`, { onMount: render, onClose });
}

// ---------- Menu ----------
$('btnMenu').addEventListener('click', () => {
  if (mode !== 'play') return;
  sfx.click();
  busy(() => new Promise(res => openMenu(res)));
});

function openMenu(onClose) {
  modal(`<h2>☰ Menu</h2>
    <div class="menu-btns">
      <button class="big" id="mCourse">📚 ${label('My course', 'Meu curso')}</button>
      <button class="big" id="mReview">🧠 ${label('Review / practice', 'Revisão / praticar')}</button>
      <button class="big" id="mWords">📖 ${label('My words', 'Minhas palavras')}</button>
      ${S.profile.job ? `<button class="big" id="mId">🎫 ${label(THEME.idTitle.en, THEME.idTitle.pt)}</button>` : ''}
      <button class="big" id="mEdit">🐾 ${label('Edit my pet', 'Editar meu bichinho')}</button>
      <button class="big" id="mTeacher">👩‍🏫 Painel do professor</button>
    </div>
    <div class="setting"><span>🔊 Som</span><button class="small" id="mSound">${S.settings.sound ? 'Ligado' : 'Desligado'}</button></div>
    <div class="setting"><span>🗣️ Velocidade da voz</span><button class="small" id="mRate">${S.settings.voiceRate < 0.8 ? '🐢 Devagar' : '🙂 Normal'}</button></div>
    <p class="tiny">${isTouch ? 'Arraste o lado esquerdo da tela para andar e o lado direito para girar a câmera.' : 'Ande com WASD ou setas. Arraste o mouse para girar a câmera. E = falar.'}</p>
    <button class="big" id="mSwitch">👥 Trocar de jogador <small>(${esc(PROFILE.name)})</small></button>
    <button class="big ghost" id="mReset">🗑️ Apagar progresso</button>
    <button class="big primary" data-close>${label('Close', 'Fechar')}</button>`, {
    onClose,
    onMount: (p, close) => {
      p.querySelector('#mWords').onclick = () => { sfx.click(); openWords(onClose); };
      p.querySelector('#mCourse').onclick = () => { sfx.click(); openCourse(onClose); };
      p.querySelector('#mReview').onclick = () => { sfx.click(); const cb = onClose; close(true); startReview().then(cb); };
      const idb = p.querySelector('#mId'); if (idb) idb.onclick = () => { sfx.click(); const cb = onClose; close(true); showIdCard().then(cb); };
      p.querySelector('#mEdit').onclick = () => { sfx.click(); onClose = null; close(); startCreator(true); };
      p.querySelector('#mTeacher').onclick = () => { sfx.click(); toast('👩‍🏫 Na versão 2: login, turmas e acompanhamento dos alunos!', 3500); };
      p.querySelector('#mSound').onclick = e => { S.settings.sound = !S.settings.sound; save(); e.target.textContent = S.settings.sound ? 'Ligado' : 'Desligado'; sfx.click(); };
      p.querySelector('#mRate').onclick = e => {
        S.settings.voiceRate = S.settings.voiceRate < 0.8 ? 0.85 : 0.65; save();
        e.target.textContent = S.settings.voiceRate < 0.8 ? '🐢 Devagar' : '🙂 Normal';
        speak(LINES.howAreYou);
      };
      p.querySelector('#mSwitch').onclick = () => { sfx.click(); save(); chooseProfile(null); };
      p.querySelector('#mReset').onclick = e => {
        if (e.target.dataset.sure) { resetSave(); location.reload(); return; }
        e.target.dataset.sure = 1; e.target.textContent = '⚠️ Toque de novo para apagar TUDO';
        e.target.classList.add('bad');
      };
    },
  });
}

function openWords(onClose) {
  const groups = [];
  for (const u of UNITS) for (const s of u.stages) if (s.type === 'words' && stageDone(stageKey(u, s))) groups.push(s);
  const body = groups.length
    ? groups.map(s => `<h3>${esc(s.title.en)} <small>· ${esc(s.title.pt)}</small></h3>` +
        s.items.map(w => `<div class="wl-row" data-say="${esc(w.en)}">${picHtml(w, 'sm')}<div><b>${esc(w.en)}</b> <span>${esc(w.pt)}</span></div><div style="margin-left:auto">🔊</div></div>`).join('')).join('')
    : `<p class="sub">Faça uma lição para colecionar palavras!</p>`;
  modal(`<h2>📖 ${label('My words', 'Minhas palavras')}</h2><div class="word-list">${body}</div>
    <button class="big primary" data-close>${label('Close', 'Fechar')}</button>`, {
    onClose,
    onMount: p => p.querySelectorAll('[data-say]').forEach(r => r.onclick = () => speak(r.dataset.say)),
  });
}

function openCourse(onClose) {
  const body = UNITS.map((u, i) => {
    const done = u.stages.filter(s => stageDone(stageKey(u, s))).length;
    const st = unitDone(u) ? '✅' : unitUnlocked(u) ? '▶' : '🔒';
    return `<div class="course-unit ${unitUnlocked(u) ? '' : 'locked'}"><div class="u-ic">${u.icon}</div><div>
      <small>${label('Unit', 'Unidade')} ${i + 1} · ${PEOPLE[u.npc].name} ${PEOPLE[u.npc].emoji}</small>
      <b>${st} ${esc(u.title.en)}</b> <span>${esc(u.title.pt)}</span>
      <div class="bar"><div style="width:${done / u.stages.length * 100}%"></div></div>
      <small class="desc">🎯 ${esc(u.cando)}</small></div></div>`;
  }).join('');
  modal(`<h2>📚 ${label('My course', 'Meu curso')}</h2><p class="sub">${PROFILE.emoji} ${esc(PROFILE.name)} · ${esc(PROFILE.title)} · Nível A1 (iniciante)</p>${body}
    <p class="tiny">Em breve: mais unidades (família, rotina, horas, direções, passado...).</p>
    <button class="big primary" data-close>${label('Close', 'Fechar')}</button>`, { onClose });
}

// ---------- Criação de personagem ----------
let creatorEditing = false;
function startCreator(editing) {
  creatorEditing = editing;
  mode = 'creator';
  controls.enabled = false;
  $('title').classList.add('hidden');
  $('hud').classList.add('hidden');
  $('interact').classList.add('hidden'); lastBtn = '';
  $('creator').classList.remove('hidden');
  if (!editing) { mover.pos.set(0, 0, 7); }
  mover.heading = 0;
  const sr = $('speciesRow'), cr = $('colorRow');
  sr.innerHTML = SPECIES.map(s => `<button class="sp-btn ${s.id === S.species ? 'sel' : ''}" data-sp="${s.id}" title="${s.en}">${s.emoji}</button>`).join('');
  cr.innerHTML = FUR_COLORS.map(c => `<button class="sw ${c === S.color ? 'sel' : ''}" data-c="${c}" style="background:${c}"></button>`).join('');
  $('nameInput').value = S.name || '';
  sr.querySelectorAll('[data-sp]').forEach(b => b.onclick = () => {
    S.species = b.dataset.sp;
    if (S.species === 'panda') { // panda fica com cara de panda: manchas escuras
      S.color = '#3d3a4b';
      cr.querySelectorAll('.sw').forEach(x => x.classList.toggle('sel', x.dataset.c === S.color));
    }
    sfx.pop(); buildPlayer(); player.jump();
    const sp = speciesOf(S.species); speak(LINES.pet(sp));
    sr.querySelectorAll('.sp-btn').forEach(x => x.classList.toggle('sel', x === b));
  });
  cr.querySelectorAll('[data-c]').forEach(b => b.onclick = () => {
    S.color = b.dataset.c; sfx.pop(); buildPlayer();
    cr.querySelectorAll('.sw').forEach(x => x.classList.toggle('sel', x === b));
  });
}
$('btnRandomName').onclick = () => { sfx.click(); $('nameInput').value = NAMES[Math.floor(Math.random() * NAMES.length)]; };
$('btnCreate').onclick = () => {
  unlockAudio(); sfx.right();
  S.name = ($('nameInput').value.trim() || NAMES[Math.floor(Math.random() * NAMES.length)]).slice(0, 12);
  const first = !S.created;
  S.created = true;
  save();
  $('creator').classList.add('hidden');
  $('nameInput').blur();
  enterPlay();
  player.jump();
  speak(LINES.hello(S.name));
  if (first) {
    setTimeout(() => toast(`👋 ${THEME.welcome}, ${esc(S.name)}!`, 3000), 300);
    setTimeout(() => toast(isTouch ? '🕹️ Arraste o lado esquerdo da tela para andar' : '🕹️ Ande com WASD ou as setas · E para falar', 4500), 2000);
    setTimeout(() => toast(`🎯 Siga a seta amarela até ${esc(PEOPLE.greet.pt)}: a Unidade 1 começa lá!`, 4500), 5200);
  }
};

function enterPlay() {
  mode = 'play';
  controls.enabled = true;
  $('title').classList.add('hidden');
  $('hud').classList.remove('hidden');
  controls.yaw = 0;
  updateHud();
}

// ---------- Título ----------
// cada pessoa tem o seu módulo (curso + cenário) e o seu progresso
function showPicker() {
  $('titleMain').classList.add('hidden');
  $('picker').classList.remove('hidden');
  $('pickRow').innerHTML = PROFILES.map(p => `<button class="pick ${p.id === profileId ? 'sel' : ''}" data-p="${p.id}">
    <span class="pk-ic">${p.emoji}</span><span class="pk-txt"><b>${esc(p.name)}</b><small>${esc(p.title)}</small><small class="desc">${esc(p.desc)}</small></span></button>`).join('');
  $('pickRow').querySelectorAll('[data-p]').forEach(b => b.onclick = () => {
    if (b.dataset.p === profileId) { $('picker').classList.add('hidden'); $('titleMain').classList.remove('hidden'); return; }
    chooseProfile(b.dataset.p);
  });
}
if (!profileId) showPicker();
$('whoPlays').innerHTML = `${PROFILE.emoji} <b>${esc(PROFILE.name)}</b> · ${esc(PROFILE.title)}`;
$('btnSwitch').onclick = () => { showPicker(); };

if (S.created) {
  $('btnPlay').textContent = `▶ ${label('Continue', 'Continuar')} (${S.name})`;
  $('btnNew').classList.remove('hidden');
}
$('btnPlay').onclick = () => {
  unlockAudio(); sfx.click();
  if (S.created) { enterPlay(); speak(LINES.welcomeBack(S.name)); }
  else { startCreator(false); speak(LINES.createPet); }
};
$('btnNew').onclick = e => {
  if (!e.target.dataset.sure) { e.target.dataset.sure = 1; e.target.textContent = '⚠️ Toque de novo: apaga o progresso'; return; }
  resetSave(); location.reload();
};

// ---------- Seta guia ----------
const arrow = new THREE.Mesh(CONE, toon('#ffc94d'));
arrow.scale.set(0.28, 0.6, 0.12);
arrow.rotation.order = 'YXZ';
scene.add(arrow);

// ---------- Loop ----------
const clock = new THREE.Clock();
const camPos = new THREE.Vector3(0, 12, 20), camLook = new THREE.Vector3();
let t = 0;

function updateNpcs(dt) {
  for (const n of npcs) {
    if (n.wander) {
      const nearP = n.pos.distanceTo(mover.pos) < 2.6 && mode !== 'title';
      if (nearP || mode === 'busy') { n.speed = 0; if (nearP) faceTo(n, mover.pos); }
      else if (n.wait > 0) { n.wait -= dt; n.speed = 0; }
      else {
        if (!n.target) n.target = WAYPOINTS[Math.floor(Math.random() * WAYPOINTS.length)];
        const dx = n.target.x - n.pos.x, dz = n.target.z - n.pos.z, d = Math.hypot(dx, dz);
        if (d < 0.4) { n.target = null; n.wait = 1 + Math.random() * 4; n.speed = 0; }
        else {
          const sp = 2.2;
          n.pos.x += dx / d * sp * dt; n.pos.z += dz / d * sp * dt;
          n.speed = sp;
          let h = Math.atan2(dx, dz) - n.heading; h = Math.atan2(Math.sin(h), Math.cos(h));
          n.heading += h * Math.min(1, dt * 8);
          n.anim.root.rotation.y = n.heading;
          for (const c of world.colliders) {
            const ex = n.pos.x - c.x, ez = n.pos.z - c.z, ed = Math.hypot(ex, ez), min = c.r + 0.45;
            if (ed < min && ed > 0.001) { n.pos.x = c.x + ex / ed * min; n.pos.z = c.z + ez / ed * min; }
          }
        }
      }
    } else {
      const near = n.pos.distanceTo(mover.pos) < 5 && (mode === 'play' || mode === 'busy');
      const lk = n.look || { x: 0, z: 0 };
      const target = near ? Math.atan2(mover.pos.x - n.pos.x, mover.pos.z - n.pos.z) : Math.atan2(lk.x - n.pos.x, lk.z - n.pos.z);
      let h = target - n.heading; h = Math.atan2(Math.sin(h), Math.cos(h));
      n.heading += h * Math.min(1, dt * 4);
      n.anim.root.rotation.y = n.heading;
    }
    n.col.x = n.pos.x; n.col.z = n.pos.z;
    n.anim.update(dt, n.speed);
    n.icon.position.y = 2.95 + Math.sin(t * 3 + n.pos.x) * 0.1;
  }
}

let stepT = 0;
function frame() {
  const dt = Math.min(clock.getDelta(), 0.05);
  t += dt;
  world.update(t, dt);

  if (mode === 'play' || mode === 'minigame') {
    const cols = world.colliders.concat(npcs.map(n => n.col));
    mover.update(dt, controls.input(), controls.yaw, cols, world.gate);
  } else mover.speed = 0;
  if (mode === 'creator') mover.heading += dt * 0.6;
  player.root.position.x = mover.pos.x; player.root.position.z = mover.pos.z;
  player.root.rotation.y = mover.heading;
  player.update(dt, mover.speed);
  if (mover.speed > 0.5) { stepT -= dt; if (stepT <= 0) { stepT = 0.28; sfx.step(); } }

  updateNpcs(dt);
  wordRun.update(dt, t);

  // frutas do pomar giram de leve
  for (const f of world.orchard) if (f.active) f.mesh.position.y = Math.max(0, Math.sin(t * 2 + f.home.x * 3)) * 0.08;

  // câmera
  if (mode === 'title') {
    const a = t * 0.08;
    camPos.set(Math.sin(a) * 34, 17, Math.cos(a) * 34);
    camLook.set(0, 0, 0);
    camera.position.lerp(camPos, 0.05);
  } else if (mode === 'creator') {
    camLook.set(mover.pos.x, 0.95, mover.pos.z);
    camPos.set(mover.pos.x, 1.7, mover.pos.z + 4.6);
    camera.position.lerp(camPos, 0.12);
  } else {
    const portrait = camera.aspect < 0.9; // celular em pé: afasta a câmera
    const d = (mode === 'minigame' ? 15 : controls.dist) * (portrait ? 1.35 : 1);
    camLook.set(mover.pos.x, 1.0, mover.pos.z);
    camPos.set(mover.pos.x + Math.sin(controls.yaw) * d, d * 0.72, mover.pos.z + Math.cos(controls.yaw) * d);
    camera.position.lerp(camPos, 1 - Math.pow(0.0015, dt));
  }
  camera.lookAt(camLook);
  if (mode === 'creator') {
    // sobe o bichinho na tela para não ficar atrás do painel
    const shift = innerHeight > innerWidth ? 0.55 : 0.4;
    camera.setViewOffset(innerWidth, innerHeight, 0, innerHeight * shift * 0.5, innerWidth, innerHeight);
  } else if (camera.view && camera.view.enabled) camera.clearViewOffset();

  // sol acompanha o jogador
  sun.position.set(mover.pos.x + 12, 26, mover.pos.z + 8);
  sun.target.position.set(mover.pos.x, 0, mover.pos.z);

  // seta para o objetivo
  const g = (mode === 'play') ? currentGoal() : null;
  const tn = g && g.npc ? npcById(g.npc) : null;
  let tp = tn ? tn.pos : null;
  if (g && g.fruit && !basket.length) tp = world.stations.fruits.pos;
  if (tp && tp.distanceTo(mover.pos) > 4.5) {
    const ang = Math.atan2(tp.x - mover.pos.x, tp.z - mover.pos.z);
    arrow.visible = true;
    arrow.position.set(mover.pos.x + Math.sin(ang) * 1.5, 0.25 + Math.sin(t * 5) * 0.05, mover.pos.z + Math.cos(ang) * 1.5);
    arrow.rotation.set(Math.PI / 2, ang, 0);
  } else arrow.visible = false;

  if (mode === 'play') updateInteractButton();
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

updateHud();
frame();

// salva ao sair
addEventListener('pagehide', save);
addEventListener('visibilitychange', () => { if (document.hidden) { save(); stopSpeaking(); } });

// para testes no console
window.__game = { S, mover, npcs, world, grant, wordRun, UNITS, THEME, startReview, playStage, npcById, get mode() { return mode; } };
