// Lista de TODAS as falas em inglês do jogo, com a voz de cada uma.
// Usada por tools/gerar-audio.mjs para gravar os áudios. Ao criar uma fala nova no jogo, inclua aqui.
import {
  LESSONS, SPECIALS, ACCESSORIES, FRUIT_ITEMS, SPECIES, SMALL_TALK, VOICES, LINES, ORDER_KINDS, ORDER_MAX, stripName,
} from './content.js';

export const NAME = 'NAME'; // marcador do nome do jogador (é removido do áudio)

export function allSpeech() {
  const out = [];
  const add = (voice, text, slow = false) => out.push({ voice, text: stripName(text, NAME), slow });
  const N = VOICES.narrator;

  // palavras das lições (normal e devagar)
  for (const l of LESSONS) for (const w of l.words) { add(N, w.en); add(N, w.en, true); }
  for (const id of Object.keys(SPECIALS)) for (const q of SPECIALS[id]) { add(N, q.answer); (q.wrong || []).forEach(x => add(N, x)); }
  add(N, 'thank you'); add(N, 'thank you', true);

  // professores
  for (const l of LESSONS) {
    const v = VOICES[l.id];
    add(v, l.intro.en);
    add(v, LINES.teacherToday(l));
    add(v, LINES.teacherReplay(NAME, l));
    add(v, LINES.teacherLocked);
    add(v, LINES.greatJob(NAME));
  }

  // treinador do minijogo
  add(VOICES.arena, LINES.arenaLocked);
  add(VOICES.arena, LINES.arenaHi(NAME));
  add(VOICES.arena, LINES.arenaHow);

  // padaria
  const B = VOICES.bakery;
  for (const t of [LINES.bakeryLocked1, LINES.bakeryLocked2, LINES.bakeryHello(NAME), LINES.bakeryWhere, LINES.bakeryPay, LINES.bakeryWrong]) add(B, t);
  for (const kind of ORDER_KINDS) for (let n = 1; n <= ORDER_MAX; n++) {
    const o = { kind, n };
    add(B, LINES.bakeryNeed(o)); add(B, LINES.bakeryRemind(o)); add(B, LINES.bakeryYes(o)); add(B, LINES.bakeryRetry(o));
  }
  for (const f of Object.values(FRUIT_ITEMS)) add(N, f.en);

  // loja
  add(VOICES.shop, LINES.shopHello(NAME));
  for (const a of ACCESSORIES) { add(VOICES.shop, LINES.shopBuy(a)); add(VOICES.shop, a.en); }

  // bichinhos que passeiam
  for (const who of ['Bolt', 'Pom', 'Nugget']) {
    add(VOICES[who], LINES.hi(NAME));
    for (const s of SMALL_TALK) add(VOICES[who], s.en);
  }

  // narrador: criação, menu, portão
  for (const sp of SPECIES) add(N, LINES.pet(sp));
  for (const t of [LINES.hello(NAME), LINES.createPet, LINES.welcomeBack(NAME), LINES.howAreYou, LINES.gate1, LINES.gate2]) add(N, t);

  // sem repetidos
  const seen = new Set();
  return out.filter(s => { const k = s.voice + s.slow + s.text.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });
}
