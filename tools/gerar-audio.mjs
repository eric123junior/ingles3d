// Gera os áudios em inglês do jogo com a voz neural Kokoro (Apache 2.0), rodando no PC.
// Uso (dentro de ingles3d/tools):  npm install  &&  node gerar-audio.mjs
// Só grava o que ainda não existe; apaga áudios que não são mais usados.
// Para gravar mais rápido, abra 3 janelas e rode em cada uma:  node gerar-audio.mjs --shard 0/3  (depois 1/3 e 2/3)
// e no fim rode uma vez sem --shard para fechar a lista (manifest.json).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { KokoroTTS } from 'kokoro-js';
import { Mp3Encoder } from '@breezystack/lamejs';
import { allSpeech } from '../js/speech-list.js';
import { speechKey } from '../js/content.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'audio');
fs.mkdirSync(OUT, { recursive: true });
const manifestPath = path.join(OUT, 'manifest.json');
const old = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {};

// o nome do arquivo sai da própria fala, então dá para saber o que já foi gravado só olhando a pasta
const fileOf = k => crypto.createHash('sha1').update(k).digest('hex').slice(0, 12) + '.mp3';
const has = k => fs.existsSync(path.join(OUT, old[k] || fileOf(k)));
const sh = process.argv.indexOf('--shard');
const [shardI, shardN] = sh > 0 ? process.argv[sh + 1].split('/').map(Number) : [0, 1];
const shard = shardN > 1;

const list = allSpeech();
const todo = list.filter(s => !has(speechKey(s.voice, s.text, s.slow))).filter((s, i) => i % shardN === shardI);
console.log(`${list.length} falas, ${todo.length} para gravar${shard ? ` (parte ${shardI + 1} de ${shardN})` : ''}`);

// corta silêncio do começo/fim e ajusta o volume
function tidy(samples) {
  let a = 0, b = samples.length - 1;
  while (a < b && Math.abs(samples[a]) < 0.01) a++;
  while (b > a && Math.abs(samples[b]) < 0.01) b--;
  a = Math.max(0, a - 1200); b = Math.min(samples.length - 1, b + 2400);
  const s = samples.slice(a, b + 1);
  let peak = 0;
  for (const v of s) peak = Math.max(peak, Math.abs(v));
  const g = peak > 0 ? 0.92 / peak : 1;
  return s.map(v => v * g);
}

function mp3(samples, rate) {
  const enc = new Mp3Encoder(1, rate, 56);
  const pcm = new Int16Array(samples.length);
  for (let i = 0; i < samples.length; i++) pcm[i] = Math.max(-32768, Math.min(32767, Math.round(samples[i] * 32767)));
  const parts = [];
  for (let i = 0; i < pcm.length; i += 1152) { const c = enc.encodeBuffer(pcm.subarray(i, i + 1152)); if (c.length) parts.push(Buffer.from(c)); }
  const end = enc.flush(); if (end.length) parts.push(Buffer.from(end));
  return Buffer.concat(parts);
}

const manifest = {};
for (const s of list) {
  const k = speechKey(s.voice, s.text, s.slow);
  if (has(k)) manifest[k] = old[k] || fileOf(k);
}

if (todo.length) {
  const tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', { dtype: 'q8', device: 'cpu' });
  let i = 0;
  for (const s of todo) {
    i++;
    const k = speechKey(s.voice, s.text, s.slow);
    const file = fileOf(k);
    // palavras soltas um pouco mais devagar para ficar bem claro
    const single = s.text.split(' ').length <= 3;
    const speed = s.slow ? 0.62 : single ? 0.9 : 0.95;
    const a = await tts.generate(s.text, { voice: s.voice, speed });
    const tmp = path.join(OUT, file + '.tmp' + shardI);
    fs.writeFileSync(tmp, mp3(tidy(a.audio), a.sampling_rate));
    fs.renameSync(tmp, path.join(OUT, file));
    manifest[k] = file;
    console.log(`[${i}/${todo.length}] ${s.voice}${s.slow ? ' (devagar)' : ''}: ${s.text}`);
    if (!shard && i % 20 === 0) fs.writeFileSync(manifestPath, JSON.stringify(manifest)); // salva o progresso
  }
}

if (shard) { console.log('Parte pronta! Rode sem --shard no fim para fechar a lista.'); process.exit(0); }
fs.writeFileSync(manifestPath, JSON.stringify(manifest));
// remove arquivos que não são mais usados
const used = new Set(Object.values(manifest));
for (const f of fs.readdirSync(OUT)) if (f.endsWith('.mp3') && !used.has(f)) fs.unlinkSync(path.join(OUT, f));
console.log('Pronto!', Object.keys(manifest).length, 'áudios em', OUT);
