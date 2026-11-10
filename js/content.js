// Conteúdo comum do jogo: loja, frutas, falas. Tudo em inglês com apoio em português.
// As lições ficam em js/courses/ e o cenário/personagens de cada jogador em js/themes.js.
import { activeId } from './profile.js';
import { THEMES, voicesFor, peopleFor } from './themes.js';

export const GAME_NAME = 'Bichinhos English';
export const THEME = THEMES[activeId];

export const SPECIES = [
  { id: 'cat', emoji: '🐱', en: 'cat', pt: 'gato' },
  { id: 'bunny', emoji: '🐰', en: 'bunny', pt: 'coelho' },
  { id: 'panda', emoji: '🐼', en: 'panda', pt: 'panda' },
  { id: 'puppy', emoji: '🐶', en: 'puppy', pt: 'cachorrinho' },
  { id: 'bear', emoji: '🐻', en: 'bear', pt: 'urso' },
  { id: 'fox', emoji: '🦊', en: 'fox', pt: 'raposa' },
];

export const FUR_COLORS = ['#f5a25d', '#f7efe4', '#a3acb9', '#f4a9c4', '#8ec5ff', '#bca6f2', '#a8d98a', '#9a6a46', '#3d3a4b'];

export const NAMES = ['Kiki', 'Lulu', 'Mochi', 'Bolinha', 'Pipoca', 'Nina', 'Tobi', 'Bento', 'Mel', 'Fofucho', 'Luna', 'Biscoito'];

export const ACCESSORIES = [
  { id: 'bow', slot: 'hat', icon: '🎀', en: 'bow', pt: 'laço', price: 30 },
  { id: 'flower', slot: 'hat', icon: '🌼', en: 'flower', pt: 'flor', price: 30 },
  { id: 'bowtie', slot: 'neck', icon: '🎗️', en: 'bow tie', pt: 'gravata borboleta', price: 40 },
  { id: 'cap', slot: 'hat', icon: '🧢', en: 'cap', pt: 'boné', price: 50 },
  { id: 'glasses', slot: 'face', icon: '👓', en: 'glasses', pt: 'óculos', price: 60 },
  { id: 'scarf', slot: 'neck', icon: '🧣', en: 'scarf', pt: 'cachecol', price: 60 },
  { id: 'party', slot: 'hat', icon: '🥳', en: 'party hat', pt: 'chapéu de festa', price: 80 },
  { id: 'sunglasses', slot: 'face', icon: '🕶️', en: 'sunglasses', pt: 'óculos de sol', price: 90 },
  { id: 'tophat', slot: 'hat', icon: '🎩', en: 'top hat', pt: 'cartola', price: 120 },
  { id: 'crown', slot: 'hat', icon: '👑', en: 'crown', pt: 'coroa', price: 200 },
];

// Frutas que existem no pomar (missão da padaria)
export const FRUIT_ITEMS = {
  redApple: { en: 'red apple', plural: 'red apples', pt: 'maçã vermelha', ptPlural: 'maçãs vermelhas', emoji: '🍎' },
  greenApple: { en: 'green apple', plural: 'green apples', pt: 'maçã verde', ptPlural: 'maçãs verdes', emoji: '🍏' },
  banana: { en: 'banana', plural: 'bananas', pt: 'banana', ptPlural: 'bananas', emoji: '🍌' },
  orange: { en: 'orange', plural: 'oranges', pt: 'laranja', ptPlural: 'laranjas', emoji: '🍊' },
  strawberry: { en: 'strawberry', plural: 'strawberries', pt: 'morango', ptPlural: 'morangos', emoji: '🍓' },
};

export const NUM_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
export const NUM_PT = ['zero', 'uma', 'duas', 'três', 'quatro', 'cinco'];

// Falas dos bichinhos que passeiam pelo cenário
export const SMALL_TALK = THEME.smallTalk;

// ---------- Vozes e falas ----------
// Vozes neurais Kokoro (geradas no PC por tools/gerar-audio.mjs). Cada personagem tem a sua.
export const VOICES = voicesFor(THEME);

// Quem é quem (nome e emoji nos diálogos)
export const PEOPLE = peopleFor(THEME);

// Pedidos da padaria: 5 frutas x 1 a 4 unidades
export const ORDER_KINDS = Object.keys(FRUIT_ITEMS);
export const ORDER_MAX = 4;
export function orderPhrase(o) { const f = FRUIT_ITEMS[o.kind]; return `${NUM_WORDS[o.n]} ${o.n === 1 ? f.en : f.plural}`; }
const cap = s => s[0].toUpperCase() + s.slice(1);

// Falas em inglês dos bichinhos ({n} = nome do jogador; não é falado no áudio)
export const LINES = {
  hi: n => `Hi, ${n}!`,
  gate2: 'A new area is coming soon!',
  teacherLocked: 'Hello! Come back later, please.',
  teacherAgain: "Hello again! Let's keep learning!",
  greatJob: n => `Great job, ${n}!`,
  arenaLocked: 'Hi! Learn the numbers first, then come play!',
  arenaHi: n => `Hi, ${n}! Let's play Word Run!`,
  arenaHow: 'Listen to the word and run to the right thing!',
  bakeryLocked2: 'Finish Unit 3 first, then come back!',
  bakeryNeed: o => `I need ${orderPhrase(o)}, please.`,
  bakeryRemind: o => `Please bring me ${orderPhrase(o)}.`,
  bakeryYes: o => `Yes! ${cap(orderPhrase(o))}! Thank you so much!`,
  bakeryWrong: 'Oh no! That is not right.',
  bakeryRetry: o => `I need ${orderPhrase(o)}. Try again!`,
  shopHello: n => `Hello, ${n}! Welcome to my shop!`,
  shopBuy: a => `A ${a.en}! Very nice!`,
  pet: sp => `${sp.en}!`,
  hello: n => `Hello, ${n}!`,
  createPet: 'Hello! Create your pet!',
  welcomeBack: n => `Welcome back, ${n}!`,
  howAreYou: 'Hello! How are you?',
};

// O nome do jogador não entra no áudio gravado: "Hello, Kiki! I want..." -> "Hello! I want..."
export function stripName(text, name) {
  if (!name) return text;
  return text.split(', ' + name).join('').split(name).join('').replace(/\s+([!?.,])/g, '$1').trim();
}

// Chave do arquivo de áudio para um texto
export function speechKey(voice, text, slow) {
  const t = text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  return `${voice}|${slow ? 'slow|' : ''}${t}`;
}
