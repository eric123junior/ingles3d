// Sons, voz em inglês (fala do navegador) e reconhecimento de fala (microfone).
import { S } from './state.js';
import { VOICES, speechKey, stripName } from './content.js';

// ---------- Efeitos sonoros sintetizados ----------
let ctx = null;
export function unlockAudio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) ctx = new AC();
  }
  if (ctx && ctx.state === 'suspended') ctx.resume();
}

function tone(freq, start, dur, type = 'sine', vol = 0.15, slideTo = null) {
  if (!ctx || !S.settings.sound) return;
  const t0 = ctx.currentTime + start;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(ctx.destination);
  o.start(t0); o.stop(t0 + dur + 0.02);
}

export const sfx = {
  click() { tone(660, 0, 0.06, 'triangle', 0.08); },
  right() { tone(660, 0, 0.12, 'triangle'); tone(880, 0.1, 0.12, 'triangle'); tone(1320, 0.2, 0.2, 'triangle', 0.12); },
  wrong() { tone(220, 0, 0.25, 'square', 0.06, 160); },
  coin() { tone(988, 0, 0.08, 'square', 0.06); tone(1319, 0.07, 0.18, 'square', 0.06); },
  pop() { tone(500, 0, 0.1, 'sine', 0.14, 900); },
  levelUp() { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.22, 'triangle', 0.13)); },
  unlock() { [392, 523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.07, 0.18, 'sine', 0.12)); },
  step() { tone(140 + Math.random() * 40, 0, 0.05, 'sine', 0.03); },
  tick() { tone(1200, 0, 0.04, 'sine', 0.06); },
};

// ---------- Voz em inglês ----------
// 1º: áudios gravados com voz neural (pasta audio/). 2º (reserva): voz em inglês do aparelho.
// Nunca usa voz em português para ler inglês (fica incompreensível).
const synth = window.speechSynthesis;
let voice = null;
let manifest = {};
const ready = fetch('audio/manifest.json').then(r => r.ok ? r.json() : {}).then(m => { manifest = m; }).catch(() => {});

function pickVoice() {
  if (!synth) return;
  const vs = synth.getVoices().filter(v => /^en(-|_|$)/i.test(v.lang));
  if (!vs.length) { voice = null; return; }
  const prefs = [/Natural/i, /Online/i, /Neural/i, /Google US English/i, /Samantha/i, /Google UK English Female/i, /en-US/i];
  for (const p of prefs) {
    const v = vs.find(v => p.test(v.name) || p.test(v.lang));
    if (v) { voice = v; return; }
  }
  voice = vs[0];
}
if (synth) {
  pickVoice();
  synth.onvoiceschanged = pickVoice;
}

let current = null;
const cache = new Map();
function fileFor(voiceId, text, slow) {
  return manifest[speechKey(voiceId, text, slow)] || manifest[speechKey(VOICES.narrator, text, slow)] || null;
}

// Fala um texto em inglês com a voz do personagem.
export async function speak(text, { voice: voiceId = VOICES.narrator, slow = false } = {}) {
  if (!text) return;
  await ready;
  stopSpeaking();
  const t = stripName(text, S.name);
  const userSlow = S.settings.voiceRate < 0.8;
  let file = fileFor(voiceId, t, slow), rate = userSlow ? 0.85 : 1;
  if (!file && slow) { file = fileFor(voiceId, t, false); rate = 0.7; }
  if (file) {
    let a = cache.get(file);
    if (!a) { a = new Audio('audio/' + file); cache.set(file, a); }
    a.playbackRate = rate;
    a.currentTime = 0;
    current = a;
    return new Promise(res => {
      a.onended = a.onerror = () => res();
      a.play().catch(() => res());
    });
  }
  console.warn('[voz] sem áudio gravado:', voiceId, JSON.stringify(t));
  if (!synth || !voice) return; // sem voz em inglês no aparelho: fica em silêncio
  return new Promise(res => {
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = voice.lang; u.voice = voice;
      u.rate = slow ? 0.6 : userSlow ? 0.75 : 0.9;
      u.onend = u.onerror = () => res();
      synth.speak(u);
      setTimeout(res, 6000);
    } catch (e) { res(); }
  });
}
export function stopSpeaking() {
  try { synth && synth.cancel(); } catch (e) { /* ignora */ }
  if (current) { current.pause(); current = null; }
}

// ---------- Reconhecimento de fala ----------
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
export const canListen = !!SR;

// Escuta uma vez. Retorna lista de frases ouvidas (pode ser vazia).
export function listen() {
  return new Promise((res, rej) => {
    if (!SR) return rej(new Error('unsupported'));
    stopSpeaking();
    const r = new SR();
    r.lang = 'en-US';
    r.interimResults = false;
    r.maxAlternatives = 5;
    let done = false;
    const finish = (v, err) => { if (done) return; done = true; clearTimeout(tm); err ? rej(err) : res(v); };
    r.onresult = e => {
      const alts = [];
      for (const result of e.results) for (const a of result) alts.push(a.transcript);
      finish(alts);
    };
    r.onerror = e => finish(null, new Error(e.error || 'error'));
    r.onend = () => finish([]);
    const tm = setTimeout(() => { try { r.stop(); } catch (e) { /* ignora */ } }, 7000);
    try { r.start(); } catch (e) { finish(null, e); }
  });
}

// ---------- Comparação de respostas ----------
const SOUND_ALIKE = {
  one: ['won', '1', 'wan'], two: ['to', 'too', '2', 'tu'], three: ['3', 'tree', 'free'], four: ['for', '4', 'fore'],
  five: ['5'], six: ['6', 'sex', 'sticks'], seven: ['7'], eight: ['ate', '8', 'eat'], nine: ['9', 'nein'], ten: ['10', 'tan', 'then'],
  hello: ['hallo', 'hullo', 'hi', 'hey hello'], goodbye: ['good bye', 'bye', 'good-bye'], no: ['know', 'now', 'nah'],
  yes: ['yeah', 'yas'], red: ['read', 'rad', 'bread'], blue: ['blew'], pear: ['pair', 'pare', 'bear'],
  grapes: ['graves', 'great'], pink: ['think'], 'thank you': ['thanks', 'thank u', 'thankyou'],
  'good night': ['goodnight'], 'good morning': ['goodmorning'], orange: ['oranges'], apple: ['apples', 'happle'],
};

export function norm(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}

export function lev(a, b) {
  const m = a.length, n = b.length;
  const d = Array.from({ length: m + 1 }, (_, i) => [i]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}

// A fala combina com a palavra/frase esperada?
export function speechMatches(alts, target) {
  const t = norm(target);
  const ok = [t, ...(SOUND_ALIKE[t] || []).map(norm)];
  for (const a of alts) {
    const h = norm(a);
    if (!h) continue;
    for (const o of ok) {
      if (h === o) return true;
      if ((' ' + h + ' ').includes(' ' + o + ' ')) return true;
      const sim = 1 - lev(h, o) / Math.max(h.length, o.length);
      if (sim >= 0.75) return true;
    }
  }
  return false;
}
