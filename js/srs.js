// Revisão diária com repetição espaçada (caixas de Leitner, como no Anki):
// acertou → a palavra volta daqui a mais dias; errou → volta amanhã.
import { S } from './state.js';
import { UNITS } from './course.js';

const INTERVALS = [0, 1, 2, 4, 7, 15, 30, 60]; // dias até a próxima revisão, por caixa

export function dayNum(d = new Date()) {
  return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
}

// todas as palavras/frases do curso, por texto em inglês
const ALL = new Map();
for (const u of UNITS) for (const s of u.stages) if (s.type === 'words') for (const it of s.items) if (!ALL.has(it.en)) ALL.set(it.en, it);

export function addItems(items) {
  for (const it of items) if (!S.srs[it.en]) S.srs[it.en] = { box: 1, due: dayNum() + 1 };
}

export function learnedItems() {
  return Object.keys(S.srs).map(en => ALL.get(en)).filter(Boolean);
}

export function dueItems() {
  const today = dayNum();
  return Object.entries(S.srs)
    .filter(([en, r]) => r.due <= today && ALL.has(en))
    .sort((a, b) => a[1].box - b[1].box)
    .map(([en]) => ALL.get(en));
}

export function grade(en, ok) {
  const r = S.srs[en];
  if (!r) return;
  if (ok) r.box = Math.min(r.box + 1, INTERVALS.length - 1);
  else r.box = 1;
  r.due = dayNum() + INTERVALS[r.box];
}
