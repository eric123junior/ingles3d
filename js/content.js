// Conteúdo do jogo: lições, loja, falas. Tudo em inglês com apoio em português.

export const GAME_NAME = 'Bichinhos English';

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

// Cada palavra: en, pt e um visual (pic = emoji, color = cor, digit = número)
export const LESSONS = [
  {
    id: 'greet', icon: '👋', npc: 'bunny',
    title: { en: 'Greetings', pt: 'Cumprimentos' },
    intro: { en: 'Hi! I am Teacher Bunny. Let\'s learn to say hello!', pt: 'Oi! Eu sou a Professora Coelha. Vamos aprender a cumprimentar!' },
    words: [
      { en: 'hello', pt: 'olá / oi', pic: '👋' },
      { en: 'goodbye', pt: 'tchau', pic: '🚪' },
      { en: 'thank you', pt: 'obrigado(a)', pic: '🙏' },
      { en: 'please', pt: 'por favor', pic: '🥺' },
      { en: 'yes', pt: 'sim', pic: '👍' },
      { en: 'no', pt: 'não', pic: '👎' },
      { en: 'good morning', pt: 'bom dia', pic: '🌅' },
      { en: 'good night', pt: 'boa noite', pic: '🌙' },
    ],
  },
  {
    id: 'colors', icon: '🎨', npc: 'cat',
    title: { en: 'Colors', pt: 'Cores' },
    intro: { en: 'Hello! I am Teacher Cat. I love colors!', pt: 'Olá! Eu sou o Professor Gato. Eu amo cores!' },
    words: [
      { en: 'red', pt: 'vermelho', color: '#ef4444' },
      { en: 'blue', pt: 'azul', color: '#3b82f6' },
      { en: 'yellow', pt: 'amarelo', color: '#facc15' },
      { en: 'green', pt: 'verde', color: '#22c55e' },
      { en: 'orange', pt: 'laranja', color: '#f97316' },
      { en: 'purple', pt: 'roxo', color: '#a855f7' },
      { en: 'pink', pt: 'rosa', color: '#f472b6' },
    ],
  },
  {
    id: 'numbers', icon: '🔢', npc: 'panda',
    title: { en: 'Numbers', pt: 'Números' },
    intro: { en: 'Hello! I am Teacher Panda. Let\'s count from one to ten!', pt: 'Olá! Eu sou o Professor Panda. Vamos contar de um a dez!' },
    words: [
      { en: 'one', pt: 'um', digit: 1 },
      { en: 'two', pt: 'dois', digit: 2 },
      { en: 'three', pt: 'três', digit: 3 },
      { en: 'four', pt: 'quatro', digit: 4 },
      { en: 'five', pt: 'cinco', digit: 5 },
      { en: 'six', pt: 'seis', digit: 6 },
      { en: 'seven', pt: 'sete', digit: 7 },
      { en: 'eight', pt: 'oito', digit: 8 },
      { en: 'nine', pt: 'nove', digit: 9 },
      { en: 'ten', pt: 'dez', digit: 10 },
    ],
  },
  {
    id: 'fruits', icon: '🍎', npc: 'fox',
    title: { en: 'Fruits', pt: 'Frutas' },
    intro: { en: 'Hello! I am Teacher Fox. Yummy fruits!', pt: 'Olá! Eu sou a Professora Raposa. Frutas gostosas!' },
    words: [
      { en: 'apple', pt: 'maçã', pic: '🍎' },
      { en: 'banana', pt: 'banana', pic: '🍌' },
      { en: 'orange', pt: 'laranja', pic: '🍊' },
      { en: 'grapes', pt: 'uvas', pic: '🍇' },
      { en: 'strawberry', pt: 'morango', pic: '🍓' },
      { en: 'watermelon', pt: 'melancia', pic: '🍉' },
      { en: 'pear', pt: 'pera', pic: '🍐' },
    ],
  },
];

// Perguntas especiais de cada lição (além das automáticas)
export const SPECIALS = {
  colors: [
    { show: '🍌', answer: 'yellow' }, { show: '🍓', answer: 'red' }, { show: '🐸', answer: 'green' },
    { show: '🍆', answer: 'purple' }, { show: '🐳', answer: 'blue' }, { show: '🥕', answer: 'orange' }, { show: '🌸', answer: 'pink' },
  ],
  numbers: [
    { show: '⭐⭐⭐', answer: 'three' }, { show: '🐟🐟🐟🐟🐟', answer: 'five' }, { show: '🎈🎈', answer: 'two' },
    { show: '🍪🍪🍪🍪', answer: 'four' }, { show: '🌼🌼🌼🌼🌼🌼', answer: 'six' }, { show: '🐞', answer: 'one' },
  ],
  fruits: [
    { show: '🍎🍎🍎', answer: 'three red apples', wrong: ['two red apples', 'three green apples'] },
    { show: '🍏🍏', answer: 'two green apples', wrong: ['two red apples', 'four green apples'] },
    { show: '🍌🍌🍌🍌', answer: 'four bananas', wrong: ['five bananas', 'four oranges'] },
    { show: '🍓🍓🍓🍓🍓', answer: 'five strawberries', wrong: ['five grapes', 'three strawberries'] },
  ],
};

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

// Falas dos bichinhos que passeiam pela vila
export const SMALL_TALK = [
  { en: 'Hello! Good morning!', pt: 'Olá! Bom dia!' },
  { en: 'Hi! I like apples.', pt: 'Oi! Eu gosto de maçãs.' },
  { en: 'Hello, friend!', pt: 'Olá, amigo!' },
  { en: 'Thank you! Goodbye!', pt: 'Obrigado! Tchau!' },
  { en: 'I love the color blue!', pt: 'Eu amo a cor azul!' },
  { en: 'One, two, three... hello!', pt: 'Um, dois, três... olá!' },
];
