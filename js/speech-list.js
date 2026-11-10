// Lista de TODAS as falas em inglês do jogo (de todos os módulos), com a voz de cada uma.
// Usada por tools/gerar-audio.mjs para gravar os áudios.
// As lições entram sozinhas (lê js/courses/*). Ao criar uma fala nova FORA das lições, inclua aqui.
import { ACCESSORIES, FRUIT_ITEMS, SPECIES, LINES, ORDER_KINDS, ORDER_MAX, stripName } from './content.js';
import { THEMES, voicesFor } from './themes.js';
import { COURSES } from './course.js';

export const NAME = 'NAME'; // marcador do nome do jogador (é removido do áudio)

export function allSpeech() {
  const out = [];
  const add = (voice, text, slow = false) => {
    const t = stripName(String(text).split('{name}').join(NAME), NAME);
    if (t) out.push({ voice, text: t, slow });
  };

  for (const id of Object.keys(COURSES)) {
    const theme = THEMES[id], V = voicesFor(theme), N = V.narrator;
    const turns = (list, partner) => {
      for (const t of list) {
        const who = t.who || partner;
        add(V[who], t.en);
        for (const o of t.opts || []) {
          if (o.ok && !o.en.includes('{name}')) add(N, o.en);
          if (o.reply) add(V[who], o.reply.en);
        }
      }
    };

    // ---- lições ----
    for (const u of COURSES[id]) {
      const T = V[u.npc];
      add(T, u.intro.en);
      add(T, LINES.teacherLocked); add(T, LINES.teacherAgain); add(T, LINES.greatJob(NAME));
      for (const s of u.stages) {
        if (s.type === 'words') {
          for (const w of s.items) { add(N, w.en); add(N, w.en, true); }
          for (const sp of s.specials || []) { add(N, sp.answer); if (sp.say) add(N, sp.say); }
        } else if (s.type === 'grammar') {
          for (const c of s.cards) for (const e of c.examples) add(N, e.en);
          for (const q of s.quiz) add(N, q.gap ? q.gap.replace('___', q.a) : q.order);
        } else if (s.type === 'listen') {
          for (const ln of s.lines) add(V[ln.who], ln.en);
          for (const q of s.questions) add(N, q.q.en);
        } else if (s.type === 'talk') {
          turns(s.turns, s.partner);
        } else if (s.type === 'mission') {
          if (s.talks) for (const [who, list] of Object.entries(s.talks)) { turns(list, who); add(V[who], LINES.greatJob(NAME)); }
          else { turns(s.talk, s.at); add(V[s.at], LINES.greatJob(NAME)); }
        }
      }
    }

    // ---- cenário deste módulo ----
    add(N, theme.gate.line.en); add(N, LINES.gate2);
    add(V.mayor, theme.mayorHi.en);
    const B = V.bakery;
    for (const t of [theme.job.locked1.en, theme.job.hello.en, theme.job.where.en, theme.job.pay.en, LINES.bakeryLocked2, LINES.bakeryWrong]) add(B, t);
    for (const kind of ORDER_KINDS) for (let n = 1; n <= ORDER_MAX; n++) {
      const o = { kind, n };
      add(B, LINES.bakeryNeed(o)); add(B, LINES.bakeryRemind(o)); add(B, LINES.bakeryYes(o)); add(B, LINES.bakeryRetry(o));
    }
    for (const w of theme.wanderers) {
      add(V[w.id], LINES.hi(NAME));
      for (const s of theme.smallTalk) add(V[w.id], s.en);
    }

    // ---- igual em todos os módulos ----
    add(V.arena, LINES.arenaLocked); add(V.arena, LINES.arenaHi(NAME)); add(V.arena, LINES.arenaHow);
    add(V.shop, LINES.shopHello(NAME));
    for (const a of ACCESSORIES) { add(V.shop, LINES.shopBuy(a)); add(V.shop, a.en); }
    for (const f of Object.values(FRUIT_ITEMS)) add(N, f.en);
    for (const sp of SPECIES) add(N, LINES.pet(sp));
    for (const t of [LINES.hello(NAME), LINES.createPet, LINES.welcomeBack(NAME), LINES.howAreYou]) add(N, t);
    add(N, 'thank you'); add(N, 'thank you', true);
  }

  // sem repetidos
  const seen = new Set();
  return out.filter(s => { const k = s.voice + s.slow + s.text.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });
}
