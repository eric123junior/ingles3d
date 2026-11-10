// Motor das lições: transforma etapas do curso em passos (cartões, exercícios, gramática,
// escuta de diálogo, conversa) e roda tudo na tela de lição.
import { speak, stopSpeaking, sfx, canListen, listen, speechMatches, norm, lev } from './audio.js';
import { VOICES, PEOPLE } from './content.js';
import { $, esc, instr, ptHtml, picHtml, label } from './ui.js';
import { support, S } from './state.js';

const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pickOne = a => a[Math.floor(Math.random() * a.length)];
const hasVisual = w => !!(w.pic || w.color || w.digit);
export const isPhrase = w => w.en.split(' ').length >= 3;
const typeable = w => !/[ '\-]/.test(w.en) && w.en.length <= 8;
const withName = t => t.split('{name}').join(S.name);

let micBlocked = false;

const PRAISE = [['Great job!', 'Muito bem!'], ['Awesome!', 'Incrível!'], ['Perfect!', 'Perfeito!'], ['Super!', 'Super!'], ['You got it!', 'Acertou!']];
function praise() {
  const [en, pt] = pickOne(PRAISE);
  return support() === 'full' ? `${pt} 🎉` : `${en} 🎉${en !== pt ? `<small>${pt}</small>` : ''}`;
}

// ---------- Construção dos passos ----------
function exercisesFor(w, pool, kinds) {
  return kinds.map(kind => ({ kind, w, pool }));
}

export function buildWords(stage) {
  const W = stage.items;
  const nChunks = Math.ceil(W.length / 4);
  const steps = [], known = [];
  let idx = 0;
  for (let c = 0; c < nChunks; c++) {
    const size = Math.round((W.length - idx) / (nChunks - c));
    const ch = W.slice(idx, idx + size);
    idx += size;
    for (const w of ch) steps.push({ kind: 'learn', w });
    known.push(...ch);
    const s = shuffle(ch);
    const phr = isPhrase(s[0]);
    if (phr) {
      steps.push({ kind: 'listenText', w: s[0], pool: known.slice() });
      steps.push({ kind: 'translate', w: s[1 % s.length], pool: known.slice() });
    } else {
      steps.push({ kind: 'listen', w: s[0], pool: known.slice() });
      steps.push({ kind: 'pick', w: s[1 % s.length], pool: known.slice() });
    }
    steps.push({ kind: 'speak', w: s[2 % s.length] });
  }
  // revisão da etapa
  const all = shuffle(W);
  const words = all.filter(w => !isPhrase(w)), phrases = all.filter(isPhrase);
  if (words.length >= 3) {
    steps.push({ kind: 'read', w: words[0], pool: W.filter(w => !isPhrase(w)) });
    steps.push({ kind: 'listen', w: words[1], pool: W.filter(w => !isPhrase(w)) });
    const t = words.find(typeable);
    if (t) steps.push({ kind: 'type', w: t });
  }
  if (phrases.length >= 2) {
    steps.push({ kind: 'meaning', w: phrases[0], pool: phrases });
    steps.push({ kind: 'order', sentence: phrases[1].en, pt: phrases[1].pt });
    steps.push({ kind: 'listenText', w: phrases[Math.min(2, phrases.length - 1)], pool: phrases });
  }
  for (const sp of shuffle(stage.specials || []).slice(0, 2)) steps.push({ kind: 'special', sp, pool: W });
  return steps;
}

export function buildGrammar(stage) {
  const steps = stage.cards.map(card => ({ kind: 'gcard', card }));
  for (const q of stage.quiz) steps.push(q.order ? { kind: 'order', sentence: q.order, pt: q.pt } : { kind: 'gap', g: q });
  return steps;
}

export function buildListen(stage) {
  return [{ kind: 'dialogue', stage }, ...stage.questions.map(q => ({ kind: 'question', q }))];
}

export function buildTalk(turns, partner, scene) {
  return [{ kind: 'talk', turns, partner, scene }];
}

// Revisão diária: um exercício por item, misturando tipos
export function buildReview(items, pool) {
  return shuffle(items).map(w => {
    const same = pool.filter(x => isPhrase(x) === isPhrase(w) && x.en !== w.en);
    const p = [w, ...same];
    let kinds;
    if (isPhrase(w)) kinds = ['listenText', 'translate', 'meaning', 'order'];
    else if (hasVisual(w)) kinds = ['listen', 'pick', 'read', 'translate'].concat(typeable(w) ? ['type'] : []);
    else kinds = ['listenText', 'translate', 'meaning'];
    const kind = pickOne(kinds);
    if (kind === 'order') return { kind, sentence: w.en, pt: w.pt, item: w };
    return { kind, w, pool: p, item: w };
  });
}

const Q = {
  learn: { en: 'New word!', pt: 'Palavra nova!' },
  learnPhrase: { en: 'New phrase!', pt: 'Frase nova!' },
  listen: { en: 'Listen and choose the right picture.', pt: 'Ouça e escolha a imagem certa.' },
  listenText: { en: 'Listen and choose what you hear.', pt: 'Ouça e escolha o que você ouviu.' },
  read: { en: 'Read and choose the right picture.', pt: 'Leia e escolha a imagem certa.' },
  pick: { en: 'What is this in English?', pt: 'Como se diz isto em inglês?' },
  translate: { en: 'How do you say this in English?', pt: 'Como se diz isto em inglês?' },
  meaning: { en: 'What does it mean?', pt: 'O que significa?' },
  speak: { en: 'Say it out loud!', pt: 'Fale em voz alta!' },
  type: { en: 'Write it in English.', pt: 'Escreva em inglês.' },
  order: { en: 'Put the words in order.', pt: 'Coloque as palavras na ordem.' },
  gap: { en: 'Complete the sentence.', pt: 'Complete a frase.' },
  dialogue: { en: 'Listen to the conversation.', pt: 'Ouça a conversa.' },
};

// ---------- Execução ----------
// steps: lista de passos. opts: { teacher (emoji), onResult(step, ok), onSave(field, value) }
export function runSession(steps, { teacher = '🐾', onResult, onSave } = {}) {
  return new Promise(resolve => {
    const root = $('lesson'), body = $('lsBody'), foot = $('lsFoot'), fb = $('lsFeedback'), main = $('lsMain');
    const queue = steps.slice();
    let done = 0, mistakes = 0, graded = 0, cur = null;
    const requeued = new Set(), firstResult = new Set();
    root.classList.remove('hidden');

    const say = (t, slow) => speak(t, { slow });
    const setBar = () => { $('lsBar').style.width = (done / (done + queue.length) * 100) + '%'; };

    const footer = (state, html = '', text = null, onClick = null) => {
      foot.className = 'ls-foot' + (state ? ' ' + state : '');
      fb.innerHTML = html;
      main.textContent = text || label('Continue', 'Continuar');
      main.disabled = !onClick;
      main.className = 'big ' + (state === 'no' ? 'bad' : state === 'ok' ? 'go' : 'primary');
      main.onclick = onClick ? () => { sfx.click(); onClick(); } : null;
    };

    function finish(ok) {
      stopSpeaking();
      removeEventListener('keydown', onKey);
      root.classList.add('hidden');
      body.innerHTML = '';
      resolve({ done: ok, total: graded, mistakes });
    }
    $('lsClose').onclick = () => { sfx.click(); finish(false); };

    const onKey = e => {
      if (e.key === 'Enter' && !main.disabled && document.activeElement?.tagName !== 'INPUT') { e.preventDefault(); main.click(); }
    };
    addEventListener('keydown', onKey);

    function next() {
      if (cur) done++;
      setBar();
      cur = queue.shift();
      if (!cur) return finish(true);
      body.scrollTop = 0;
      body.className = 'ls-body';
      render[cur.kind](cur);
    }

    function report(ok) {
      if (firstResult.has(cur)) return;
      firstResult.add(cur);
      onResult && onResult(cur, ok);
    }
    function right(extra = '') {
      sfx.right();
      graded++;
      report(true);
      footer('ok', praise() + extra, null, next);
    }
    function wrong(correctHtml, why = '') {
      sfx.wrong();
      graded++;
      mistakes++;
      report(false);
      if (!requeued.has(cur)) { requeued.add(cur); queue.push(cur); }
      footer('no', `${label('Correct answer:', 'Resposta certa:')} ${correctHtml}${why ? `<small>💡 ${esc(why)}</small>` : ''}`, null, next);
    }

    // Botões de escolha (imagens ou textos)
    function choices(answer, options, { render: r = o => esc(o), speakAnswer = true, words = true, onDone }) {
      const opts = shuffle(options);
      const box = document.createElement('div');
      box.className = 'choices' + (words ? ' words' : '');
      opts.forEach(o => {
        const b = document.createElement('button');
        b.className = 'choice';
        b.innerHTML = r(o);
        b.onclick = () => {
          if (box.dataset.done) return;
          box.dataset.done = 1;
          if (o === answer) { b.classList.add('right'); if (speakAnswer) say(typeof o === 'string' ? o : o.en); onDone(true); }
          else {
            b.classList.add('wrong');
            [...box.children][opts.indexOf(answer)].classList.add('right');
            onDone(false);
          }
        };
        box.appendChild(b);
      });
      return box;
    }
    const others = (w, pool, n) => shuffle(pool.filter(x => x.en !== w.en)).slice(0, n);

    const hearRow = (text) => {
      const row = document.createElement('div');
      row.className = 'say-row';
      row.innerHTML = `<button class="small">🔊 ${label('Listen', 'Ouvir')}</button><button class="small">🐢 ${label('Slow', 'Devagar')}</button>`;
      row.children[0].onclick = () => say(text);
      row.children[1].onclick = () => say(text, true);
      return row;
    };

    const render = {
      learn({ w }) {
        const phr = isPhrase(w);
        body.innerHTML = `
          <div class="teacher-tip"><span class="face">${teacher}</span><div>${instr(phr ? Q.learnPhrase : Q.learn)}</div></div>
          <div class="word-card">
            ${hasVisual(w) ? picHtml(w, phr ? 'sm' : '') : ''}
            <div class="word-en ${phr ? 'phrase' : ''}">${esc(w.en)}</div>
            <div class="word-pt">${ptHtml(w.pt, '')}</div>
          </div>
          <div class="say-row">
            <button id="bHear">🔊 ${label('Listen', 'Ouvir')}</button>
            <button id="bSlow">🐢 ${label('Slow', 'Devagar')}</button>
            ${canListen && !micBlocked ? `<button id="bRep">🎤 ${label('Repeat', 'Repetir')}</button>` : ''}
          </div>
          <div class="heard" id="heard"></div>`;
        $('bHear').onclick = () => say(w.en);
        $('bSlow').onclick = () => say(w.en, true);
        const rep = $('bRep');
        if (rep) rep.onclick = async () => {
          rep.disabled = true;
          $('heard').textContent = '🎤 ...';
          try {
            const alts = await listen();
            if (speechMatches(alts, w.en)) { sfx.right(); $('heard').innerHTML = `✅ ${label('Great pronunciation!', 'Ótima pronúncia!')}`; }
            else $('heard').innerHTML = alts.length ? `${label('I heard', 'Entendi')}: "${esc(alts[0])}" — ${label('try again!', 'tente de novo!')}` : label('I didn\'t hear you.', 'Não ouvi nada.');
          } catch (e) { $('heard').textContent = micMsg(e); }
          rep.disabled = false;
        };
        say(w.en);
        footer('', '', null, next);
      },

      listen({ w, pool }) {
        body.innerHTML = `${instr(Q.listen)}<button class="audio-big" id="bA">🔊</button><button class="small ghost" id="bS">🐢 ${label('Slow', 'Devagar')}</button>`;
        $('bA').onclick = () => say(w.en);
        $('bS').onclick = () => say(w.en, true);
        body.appendChild(choices(w, [w, ...others(w, pool, 3)], { render: o => picHtml(o), words: false, onDone: ok => ok ? right() : wrong(`<b>${esc(w.en)}</b>`) }));
        setTimeout(() => say(w.en), 250);
        footer('', '', null, null);
      },

      listenText({ w, pool }) {
        body.innerHTML = `${instr(Q.listenText)}<button class="audio-big" id="bA">🔊</button><button class="small ghost" id="bS">🐢 ${label('Slow', 'Devagar')}</button>`;
        $('bA').onclick = () => say(w.en);
        $('bS').onclick = () => say(w.en, true);
        body.appendChild(choices(w.en, [w.en, ...others(w, pool, 2).map(x => x.en)], { speakAnswer: false, onDone: ok => ok ? right() : wrong(`<b>${esc(w.en)}</b>`) }));
        setTimeout(() => say(w.en), 250);
        footer('', '', null, null);
      },

      read({ w, pool }) {
        body.innerHTML = `${instr(Q.read)}<div class="word-card"><div class="word-en">${esc(w.en)}</div></div>`;
        body.appendChild(choices(w, [w, ...others(w, pool, 3)], { render: o => picHtml(o), words: false, onDone: ok => ok ? right() : wrong(`<b>${esc(w.en)}</b> = ${esc(w.pt)}`) }));
        footer('', '', null, null);
      },

      pick({ w, pool }) {
        body.innerHTML = `${instr(Q.pick)}<div class="word-card">${picHtml(w)}</div>`;
        body.appendChild(choices(w.en, [w.en, ...others(w, pool, 2).map(x => x.en)], { onDone: ok => ok ? right() : wrong(`<b>${esc(w.en)}</b>`) }));
        footer('', '', null, null);
      },

      translate({ w, pool }) {
        body.innerHTML = `${instr(Q.translate)}<div class="word-card">${hasVisual(w) ? picHtml(w, 'sm') : ''}<div class="word-en phrase">${esc(w.pt)}</div></div>`;
        body.appendChild(choices(w.en, [w.en, ...others(w, pool, 2).map(x => x.en)], { onDone: ok => ok ? right() : wrong(`<b>${esc(w.en)}</b>`) }));
        footer('', '', null, null);
      },

      meaning({ w, pool }) {
        body.innerHTML = `${instr(Q.meaning)}<div class="word-card"><div class="word-en phrase">${esc(w.en)}</div></div><button class="small ghost" id="bA">🔊 ${label('Listen', 'Ouvir')}</button>`;
        $('bA').onclick = () => say(w.en);
        say(w.en);
        body.appendChild(choices(w.pt, [w.pt, ...others(w, pool, 2).map(x => x.pt)], { speakAnswer: false, onDone: ok => ok ? right() : wrong(`<b>${esc(w.pt)}</b>`) }));
        footer('', '', null, null);
      },

      speak({ w }) {
        const useMic = canListen && !micBlocked;
        body.innerHTML = `${instr(Q.speak)}
          <div class="word-card">${picHtml(w, 'sm')}<div class="word-en ${isPhrase(w) ? 'phrase' : ''}">${esc(w.en)}</div><div class="word-pt">${ptHtml(w.pt, '')}</div></div>
          <div class="say-row"><button id="bHear">🔊 ${label('Listen', 'Ouvir')}</button><button id="bSlow">🐢 ${label('Slow', 'Devagar')}</button></div>
          ${useMic ? `<button class="mic-btn" id="bMic">🎤</button><div class="heard" id="heard">${label('Tap the microphone and speak', 'Toque no microfone e fale')}</div>`
                   : `<div class="heard">${label('Listen and repeat out loud.', 'Ouça e repita em voz alta.')}</div>`}`;
        $('bHear').onclick = () => say(w.en);
        $('bSlow').onclick = () => say(w.en, true);
        say(w.en);
        if (!useMic) {
          footer('', '', label('I said it! ✅', 'Eu falei! ✅'), () => { sfx.right(); footer('ok', praise(), null, next); });
          return;
        }
        let tries = 0;
        const mic = $('bMic');
        mic.onclick = async () => {
          mic.classList.add('on'); mic.disabled = true;
          $('heard').textContent = label('Listening...', 'Ouvindo...');
          try {
            const alts = await listen();
            mic.classList.remove('on'); mic.disabled = false;
            if (speechMatches(alts, w.en)) { mic.disabled = true; sfx.right(); footer('ok', praise(), null, next); return; }
            tries++;
            sfx.wrong();
            $('heard').innerHTML = alts.length ? `${label('I heard', 'Entendi')}: "${esc(alts[0])}". ${label('Try again!', 'Tente de novo!')}` : label('I didn\'t hear you. Try again!', 'Não ouvi. Tente de novo!');
            if (tries >= 2) footer('', '', label('Continue', 'Continuar'), next);
          } catch (e) {
            mic.classList.remove('on'); mic.disabled = false;
            $('heard').textContent = micMsg(e);
            if (micBlocked) footer('', '', label('I said it! ✅', 'Eu falei! ✅'), next);
          }
        };
        footer('', '', label('Skip 🎤', 'Pular 🎤'), next);
        main.className = 'big ghost';
      },

      type({ w }) {
        const hint = w.en.split('').map((c, i) => i === 0 ? c : '_').join(' ');
        body.innerHTML = `${instr(Q.type)}
          <div class="word-card">${picHtml(w, 'sm')}<div class="word-pt">${esc(w.pt)}</div></div>
          <button class="small ghost" id="bHear">🔊 ${label('Listen', 'Ouvir')}</button>
          <input class="type-input" id="tIn" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="...">
          <div class="hint-letters">${esc(hint)}</div>`;
        $('bHear').onclick = () => say(w.en);
        const inp = $('tIn');
        setTimeout(() => inp.focus(), 50);
        const check = () => {
          const v = norm(inp.value), t = norm(w.en);
          if (!v) return;
          inp.disabled = true;
          if (v === t) { say(w.en); right(); }
          else if (t.length >= 5 && lev(v, t) <= 1) { say(w.en); right(`<small>${label('Almost! Spelling:', 'Quase! Escreve-se:')} <b>${esc(w.en)}</b></small>`); }
          else wrong(`<b>${esc(w.en)}</b>`);
        };
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); if (!inp.disabled) check(); else if (!main.disabled) main.click(); } });
        footer('', '', label('Check', 'Verificar'), check);
      },

      order({ sentence, pt }) {
        const words = sentence.split(' ');
        body.innerHTML = `${instr(Q.order)}<div class="word-pt">${esc(pt)}</div><div class="order-line" id="line"></div><div class="order-bank" id="bank"></div>`;
        const line = $('line'), bank = $('bank');
        const picked = [];
        let bankWords = shuffle(words);
        if (bankWords.join(' ') === sentence && words.length > 1) bankWords = bankWords.reverse();
        bankWords.forEach(wd => {
          const t = document.createElement('button');
          t.className = 'tile'; t.textContent = wd;
          t.onclick = () => {
            if (t.classList.contains('used')) return;
            sfx.pop();
            t.classList.add('used');
            const c = document.createElement('button');
            c.className = 'tile'; c.textContent = wd;
            c.onclick = () => { sfx.pop(); c.remove(); t.classList.remove('used'); picked.splice(picked.indexOf(c), 1); upd(); };
            picked.push(c); line.appendChild(c); upd();
          };
          bank.appendChild(t);
        });
        const upd = () => { main.disabled = picked.length !== words.length; };
        footer('', '', label('Check', 'Verificar'), () => {
          const got = picked.map(c => c.textContent).join(' ');
          [...line.children, ...bank.children].forEach(b => b.onclick = null);
          if (got === sentence) { say(sentence); right(); }
          else wrong(`<b>${esc(sentence)}</b>`);
        });
        upd();
      },

      special({ sp, pool }) {
        const q = sp.q || Q.pick;
        const visual = sp.say ? `<div class="bubble-q">💬 "${esc(sp.say)}"</div><button class="small ghost" id="bA">🔊 ${label('Listen', 'Ouvir')}</button>`
          : `<div class="word-card"><div class="pic" style="font-size:${sp.show.length > 6 ? '3.2rem' : ''}">${sp.show}</div></div>`;
        body.innerHTML = `${instr(q)}${visual}`;
        if (sp.say) { $('bA').onclick = () => say(sp.say); say(sp.say); }
        const wrongs = sp.wrong || shuffle(pool.filter(x => x.en !== sp.answer)).slice(0, 2).map(x => x.en);
        body.appendChild(choices(sp.answer, [sp.answer, ...wrongs], { onDone: ok => ok ? right() : wrong(`<b>${esc(sp.answer)}</b>`) }));
        footer('', '', null, null);
      },

      gcard({ card }) {
        body.className = 'ls-body left';
        body.innerHTML = `<div class="teacher-tip"><span class="face">${teacher}</span><div><b>🧩 ${esc(card.title)}</b></div></div>
          <div class="gram-card">${card.html}</div>
          <div class="examples">${card.examples.map((e, i) => `<button class="ex" data-i="${i}"><span>🔊</span><div><b>${esc(e.en)}</b><small>${esc(e.pt)}</small></div></button>`).join('')}</div>`;
        body.querySelectorAll('.ex').forEach(b => b.onclick = () => say(card.examples[+b.dataset.i].en));
        footer('', '', null, next);
      },

      gap({ g }) {
        const parts = g.gap.split('___');
        body.innerHTML = `${instr(Q.gap)}<div class="word-card"><div class="word-en phrase">${esc(parts[0])}<span class="blank" id="blank">____</span>${esc(parts[1] || '')}</div><div class="word-pt">${ptHtml(g.pt, '')}</div></div>`;
        const full = g.gap.replace('___', g.a);
        body.appendChild(choices(g.a, g.opts, {
          speakAnswer: false,
          onDone: ok => {
            $('blank').textContent = g.a;
            $('blank').classList.add(ok ? 'ok' : 'no');
            say(full);
            ok ? right(`<small>💡 ${esc(g.why)}</small>`) : wrong(`<b>${esc(full)}</b>`, g.why);
          },
        }));
        footer('', '', null, null);
      },

      dialogue({ stage }) {
        body.innerHTML = `${instr(Q.dialogue)}<div class="scene">🎬 ${esc(stage.scene.en)}<small>${esc(stage.scene.pt)}</small></div>
          <div class="chat" id="chat"></div>
          <div class="say-row"><button class="small" id="bAgain" disabled>🔁 ${label('Listen again', 'Ouvir de novo')}</button></div>`;
        const chat = $('chat');
        let token = 0;
        const play = async () => {
          const my = ++token;
          chat.innerHTML = '';
          $('bAgain').disabled = true;
          for (const ln of stage.lines) {
            if (my !== token || !chat.isConnected) return;
            const p = PEOPLE[ln.who];
            chat.insertAdjacentHTML('beforeend', bubble(p, ln, ln.who === stage.lines[0].who ? 'l' : 'r'));
            chat.lastElementChild.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            await speak(ln.en, { voice: VOICES[ln.who] });
            await new Promise(r => setTimeout(r, 250));
          }
          if (my !== token || !chat.isConnected) return;
          $('bAgain').disabled = false;
          footer('', '', null, next);
        };
        $('bAgain').onclick = () => { sfx.click(); play(); };
        footer('', '', null, null);
        play();
      },

      question({ q }) {
        body.innerHTML = `<div class="ls-q">🎧 ${esc(q.q.en)}</div><div class="ls-qpt">${ptHtml(q.q.pt, '')}</div><button class="small ghost" id="bA">🔊</button>`;
        $('bA').onclick = () => say(q.q.en);
        say(q.q.en);
        body.appendChild(choices(q.a, q.opts, { speakAnswer: false, onDone: ok => ok ? right() : wrong(`<b>${esc(q.a)}</b>`) }));
        footer('', '', null, null);
      },

      talk({ turns, partner, scene }) {
        const P = PEOPLE[partner];
        body.innerHTML = `<div class="scene">🗣️ ${esc(scene.en)}<small>${esc(scene.pt)}</small></div><div class="chat" id="chat"></div><div class="talk-opts" id="opts"></div>`;
        const chat = $('chat'), optsBox = $('opts');
        footer('', '', null, null);
        let i = 0;
        const scroll = () => chat.lastElementChild?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        const npcSay = async (who, line) => {
          chat.insertAdjacentHTML('beforeend', bubble(PEOPLE[who], { en: withName(line.en), pt: line.pt }, 'l'));
          scroll();
          await speak(withName(line.en), { voice: VOICES[who] });
        };
        const turn = async () => {
          if (!chat.isConnected) return;
          if (i >= turns.length) {
            sfx.right();
            footer('ok', `${label('Conversation complete!', 'Conversa completa!')} 🎉`, null, next);
            return;
          }
          const t = turns[i];
          const who = t.who || partner;
          await npcSay(who, t);
          if (!chat.isConnected) return;
          if (!t.opts) { i++; return turn(); }
          let missed = false;
          optsBox.innerHTML = '';
          for (const o of shuffle(t.opts)) {
            const b = document.createElement('button');
            b.className = 'choice talk-opt';
            b.innerHTML = esc(withName(o.en)) + (o.pt ? `<small>${esc(o.pt)}</small>` : '');
            b.onclick = async () => {
              if (optsBox.dataset.busy) return;
              if (!o.ok) {
                sfx.wrong();
                b.classList.add('wrong'); b.disabled = true;
                mistakes++;
                if (!missed) { missed = true; graded++; }
                foot.className = 'ls-foot no';
                fb.innerHTML = `💡 ${esc(o.why || label('Try another answer.', 'Tente outra resposta.'))}`;
                return;
              }
              optsBox.dataset.busy = 1;
              sfx.pop();
              if (!missed) graded++;
              if (o.save && onSave) onSave(o.save[0], o.save[1]);
              foot.className = 'ls-foot'; fb.innerHTML = '';
              optsBox.innerHTML = '';
              chat.insertAdjacentHTML('beforeend', `<div class="bubble me"><div class="txt"><b>${esc(withName(o.en))}</b></div><div class="av">⭐</div></div>`);
              scroll();
              if (!o.en.includes('{name}')) await speak(o.en);
              if (o.reply) await npcSay(who, o.reply);
              delete optsBox.dataset.busy;
              i++;
              turn();
            };
            optsBox.appendChild(b);
          }
          optsBox.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        };
        turn();
      },
    };

    next();
  });
}

function bubble(p, ln, side) {
  return `<div class="bubble ${side}"><div class="av" title="${esc(p.name)}">${p.emoji}</div><div class="txt"><span class="who">${esc(p.name)}</span><b>${esc(ln.en)}</b>${ln.pt ? `<small>${ptHtml(ln.pt, '')}</small>` : ''}</div></div>`;
}

function micMsg(e) {
  const m = String(e && e.message);
  if (m.includes('not-allowed') || m.includes('service-not-allowed')) {
    micBlocked = true;
    return '🎤 Microfone bloqueado. Libere o microfone no navegador ou continue sem ele.';
  }
  if (m.includes('no-speech')) return label('I didn\'t hear you. Try again!', 'Não ouvi. Tente de novo!');
  if (m.includes('network')) return '🎤 Sem internet para reconhecer a fala.';
  return '🎤 Não consegui usar o microfone agora.';
}
