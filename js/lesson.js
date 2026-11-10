// Motor das lições: cartões para aprender palavras + exercícios (ouvir, ler, falar, escrever).
import { speak, stopSpeaking, sfx, canListen, listen, speechMatches, norm, lev } from './audio.js';
import { SPECIALS } from './content.js';
import { $, esc, instr, ptHtml, picHtml, label } from './ui.js';
import { support } from './state.js';

const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pickOne = a => a[Math.floor(Math.random() * a.length)];

let micBlocked = false;

const PRAISE = [['Great job!', 'Muito bem!'], ['Awesome!', 'Incrível!'], ['Perfect!', 'Perfeito!'], ['Super!', 'Super!'], ['You got it!', 'Acertou!']];
function praise() {
  const [en, pt] = pickOne(PRAISE);
  return support() === 'full' ? `${pt} 🎉` : `${en} 🎉${en !== pt ? `<small>${pt}</small>` : ''}`;
}

// ---------- Monta a sequência da lição ----------
function build(lesson, playerName) {
  const W = lesson.words;
  const nChunks = Math.ceil(W.length / 4);
  const chunks = [];
  const order = W.slice(); // ordem natural (números em sequência)
  let idx = 0;
  for (let c = 0; c < nChunks; c++) {
    const size = Math.round((W.length - idx) / (nChunks - c));
    chunks.push(order.slice(idx, idx + size));
    idx += size;
  }
  const steps = [];
  const known = [];
  for (const ch of chunks) {
    for (const w of ch) steps.push({ kind: 'learn', w });
    known.push(...ch);
    const s = shuffle(ch);
    steps.push({ kind: 'listen', w: s[0], pool: known.slice() });
    steps.push({ kind: 'pick', w: s[1 % s.length], pool: known.slice() });
    steps.push({ kind: 'speak', w: s[2 % s.length] });
  }
  // revisão
  const all = shuffle(W);
  const typeable = all.filter(w => !w.en.includes(' ') && w.en.length <= 7);
  steps.push({ kind: 'read', w: all[0], pool: W });
  steps.push({ kind: 'listen', w: all[1], pool: W });
  steps.push({ kind: 'type', w: typeable[0] || all[2] });
  if (lesson.id === 'greet') {
    steps.push({ kind: 'order', words: ['Hello,', 'my', 'name', 'is', playerName + '.'], pt: `Olá, meu nome é ${playerName}.` });
    steps.push({ kind: 'speak', w: { en: 'thank you', pt: 'obrigado(a)', pic: '🙏' } });
  } else {
    const sp = shuffle(SPECIALS[lesson.id]);
    steps.push({ kind: 'special', lesson: lesson.id, q: sp[0] });
    steps.push({ kind: 'special', lesson: lesson.id, q: sp[1] });
  }
  return steps;
}

const Q = {
  listen: { en: 'Listen and choose the right picture.', pt: 'Ouça e escolha a imagem certa.' },
  read: { en: 'Read and choose the right picture.', pt: 'Leia e escolha a imagem certa.' },
  pick: { en: 'What is this in English?', pt: 'Como se diz isto em inglês?' },
  speak: { en: 'Say it out loud!', pt: 'Fale em voz alta!' },
  type: { en: 'Write it in English.', pt: 'Escreva em inglês.' },
  order: { en: 'Put the words in order.', pt: 'Coloque as palavras na ordem.' },
  colors: { en: 'What color is it?', pt: 'Qual é a cor?' },
  numbers: { en: 'How many?', pt: 'Quantos são?' },
  fruits: { en: 'What do you see?', pt: 'O que você vê?' },
  learn: { en: 'New word!', pt: 'Palavra nova!' },
};

// ---------- Execução ----------
export function runLesson(lesson, { teacher, playerName }) {
  return new Promise(resolve => {
    const root = $('lesson'), body = $('lsBody'), foot = $('lsFoot'), fb = $('lsFeedback'), main = $('lsMain');
    const queue = build(lesson, playerName);
    let done = 0, mistakes = 0, graded = 0, cur = null;
    const requeued = new Set();
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
      render[cur.kind](cur);
    }

    function right(extra = '') {
      sfx.right();
      graded++;
      footer('ok', praise() + extra, null, next);
    }
    function wrong(correctHtml) {
      sfx.wrong();
      graded++;
      mistakes++;
      if (!requeued.has(cur)) { requeued.add(cur); queue.push(cur); }
      footer('no', `${label('Correct answer:', 'Resposta certa:')} ${correctHtml}`, null, next);
    }

    // Opções com imagens
    function picChoices(w, pool, onDone) {
      const opts = shuffle([w, ...shuffle(pool.filter(x => x !== w)).slice(0, 3)]);
      const box = document.createElement('div');
      box.className = 'choices';
      opts.forEach(o => {
        const b = document.createElement('button');
        b.className = 'choice';
        b.innerHTML = picHtml(o);
        b.onclick = () => {
          if (box.dataset.done) return;
          box.dataset.done = 1;
          if (o === w) { b.classList.add('right'); say(w.en); onDone(true); }
          else {
            b.classList.add('wrong');
            [...box.children][opts.indexOf(w)].classList.add('right');
            onDone(false);
          }
        };
        box.appendChild(b);
      });
      return box;
    }
    function wordChoices(answer, options, onDone) {
      const opts = shuffle(options);
      const box = document.createElement('div');
      box.className = 'choices words';
      opts.forEach(o => {
        const b = document.createElement('button');
        b.className = 'choice';
        b.textContent = o;
        b.onclick = () => {
          if (box.dataset.done) return;
          box.dataset.done = 1;
          if (o === answer) { b.classList.add('right'); say(answer); onDone(true); }
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

    const render = {
      learn({ w }) {
        body.innerHTML = `
          <div class="teacher-tip"><span class="face">${teacher}</span><div>${instr(Q.learn)}</div></div>
          <div class="word-card">
            ${picHtml(w)}
            <div class="word-en">${esc(w.en)}</div>
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
        body.appendChild(picChoices(w, pool, ok => ok ? right() : wrong(`<b>${esc(w.en)}</b>`)));
        setTimeout(() => say(w.en), 250);
        footer('', '', null, null);
      },

      read({ w, pool }) {
        body.innerHTML = `${instr(Q.read)}<div class="word-card"><div class="word-en">${esc(w.en)}</div></div>`;
        body.appendChild(picChoices(w, pool, ok => ok ? right() : wrong(`<b>${esc(w.en)}</b> = ${esc(w.pt)}`)));
        footer('', '', null, null);
      },

      pick({ w, pool }) {
        body.innerHTML = `${instr(Q.pick)}<div class="word-card">${picHtml(w)}</div>`;
        const opts = [w.en, ...shuffle(pool.filter(x => x !== w)).slice(0, 2).map(x => x.en)];
        body.appendChild(wordChoices(w.en, opts, ok => ok ? right() : wrong(`<b>${esc(w.en)}</b>`)));
        footer('', '', null, null);
      },

      speak({ w }) {
        const useMic = canListen && !micBlocked;
        body.innerHTML = `${instr(Q.speak)}
          <div class="word-card">${picHtml(w, 'sm')}<div class="word-en">${esc(w.en)}</div><div class="word-pt">${ptHtml(w.pt, '')}</div></div>
          <div class="say-row"><button id="bHear">🔊 ${label('Listen', 'Ouvir')}</button><button id="bSlow">🐢 ${label('Slow', 'Devagar')}</button></div>
          ${useMic ? `<button class="mic-btn" id="bMic">🎤</button><div class="heard" id="heard">${label('Tap the microphone and speak', 'Toque no microfone e fale')}</div>`
                   : `<div class="heard">${label('Listen and repeat out loud.', 'Ouça e repita em voz alta.')}</div>`}`;
        $('bHear').onclick = () => say(w.en);
        $('bSlow').onclick = () => say(w.en, true);
        say(w.en);
        if (!useMic) {
          footer('', '', label('I said it! ✅', 'Eu falei! ✅'), () => { sfx.right(); graded++; footer('ok', praise(), null, next); });
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
            if (speechMatches(alts, w.en)) { mic.disabled = true; right(); return; }
            tries++;
            sfx.wrong();
            $('heard').innerHTML = alts.length ? `${label('I heard', 'Entendi')}: "${esc(alts[0])}". ${label('Try again!', 'Tente de novo!')}` : label('I didn\'t hear you. Try again!', 'Não ouvi. Tente de novo!');
            if (tries >= 2) footer('', '', label('Continue', 'Continuar'), () => { graded++; next(); });
          } catch (e) {
            mic.classList.remove('on'); mic.disabled = false;
            $('heard').textContent = micMsg(e);
            if (micBlocked) footer('', '', label('I said it! ✅', 'Eu falei! ✅'), () => { graded++; next(); });
          }
        };
        footer('', '', label('Skip 🎤', 'Pular 🎤'), next);
        main.className = 'big ghost';
      },

      type({ w }) {
        const hint = w.en.split('').map((c, i) => i === 0 ? c : (c === ' ' ? ' ' : '_')).join(' ');
        body.innerHTML = `${instr(Q.type)}
          <div class="word-card">${picHtml(w, 'sm')}<div class="word-pt">${ptHtml(w.pt, '')}</div></div>
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

      order({ words, pt }) {
        const target = words.join(' ');
        body.innerHTML = `${instr(Q.order)}<div class="word-pt">${ptHtml(pt, '')}</div><div class="order-line" id="line"></div><div class="order-bank" id="bank"></div>`;
        const line = $('line'), bank = $('bank');
        const picked = [];
        shuffle(words).forEach(wd => {
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
          if (got === target) right();
          else wrong(`<b>${esc(target)}</b>`);
        });
        upd();
      },

      special({ lesson: id, q }) {
        body.innerHTML = `${instr(Q[id])}<div class="word-card"><div class="pic" style="font-size:${q.show.length > 6 ? '3.4rem' : ''}">${q.show}</div></div>`;
        let opts;
        if (q.wrong) opts = [q.answer, ...q.wrong];
        else {
          const all = id === 'colors' ? ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'pink'] : ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
          opts = [q.answer, ...shuffle(all.filter(a => a !== q.answer)).slice(0, 2)];
        }
        body.appendChild(wordChoices(q.answer, opts, ok => ok ? right() : wrong(`<b>${esc(q.answer)}</b>`)));
        footer('', '', null, null);
      },
    };

    next();
  });
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
