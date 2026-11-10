// Progresso do jogador (salvo no aparelho). Login/nuvem fica para a versão 2.

import { activeId } from './profile.js';

// um progresso separado para cada jogador
const KEY = 'bichinhosEnglish.save.v2.' + activeId;

function fresh() {
  return {
    created: false,
    name: '', species: 'cat', color: '#f5a25d',
    xp: 0, coins: 0,
    course: {},           // 'u1.greet' -> estrelas (1..3)
    srs: {},              // revisão diária: 'hello' -> { box, due }
    met: [],              // vizinhos conhecidos (missão da unidade 1)
    profile: {},          // identidade da vila: from, age, job
    owned: [], equipped: { hat: null, face: null, neck: null },
    streak: 0, lastDay: null,
    missions: 0, order: null, bestRun: 0, playedRun: false,
    settings: { sound: true, voiceRate: 0.85 },
  };
}

export const S = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return Object.assign(fresh(), JSON.parse(raw));
  } catch (e) { /* sem storage: joga sem salvar */ }
  return fresh();
}

export function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignora */ }
}

export function resetSave() {
  try { localStorage.removeItem(KEY); } catch (e) { /* ignora */ }
  Object.assign(S, fresh());
}

// ---------- Nível / XP ----------
export function xpForLevel(lv) { return 60 + (lv - 1) * 40; } // xp para passar do nível lv
export function levelInfo(xp = S.xp) {
  let lv = 1, rest = xp;
  while (rest >= xpForLevel(lv)) { rest -= xpForLevel(lv); lv++; }
  return { level: lv, cur: rest, need: xpForLevel(lv) };
}

// Quanto português aparece: 'full' (tudo), 'mid' (inglês + português pequeno), 'low' (só inglês, toque para ver)
export function support(lv = levelInfo().level) {
  if (lv <= 3) return 'full';
  if (lv <= 6) return 'mid';
  return 'low';
}

// ---------- Sequência diária ----------
function dayStr(d) { return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
export function today() { return dayStr(new Date()); }
function yesterday() { const d = new Date(); d.setDate(d.getDate() - 1); return dayStr(d); }

// Sequência mostrada (zera se ficou um dia sem jogar)
export function shownStreak() {
  if (S.lastDay === today() || S.lastDay === yesterday()) return S.streak;
  return 0;
}

// Chamado ao completar uma atividade. Retorna o novo valor se for o primeiro do dia.
export function touchDay() {
  const t = today();
  if (S.lastDay === t) return null;
  S.streak = S.lastDay === yesterday() ? S.streak + 1 : 1;
  S.lastDay = t;
  return S.streak;
}
