// Temas: o cenário, os bichinhos e as falas de cada módulo.
// Os "papéis" são sempre os mesmos (greet, numbers, fruits, colors = professores das unidades 1 a 4;
// arena, bakery, shop, mayor), só mudam o nome, a cara e o lugar. A voz é fixa por papel.

export const ROLE_VOICE = {
  greet: 'af_bella', colors: 'am_michael', numbers: 'am_fenrir', fruits: 'af_sarah',
  arena: 'am_puck', bakery: 'bf_emma', shop: 'af_aoede', mayor: 'bm_george',
};
const NARRATOR = 'af_heart'; // palavras das lições, minijogo, loja
const WANDER_VOICE = ['am_puck', 'af_bella', 'am_michael'];

export const THEMES = {
  // ====================== JUNIOR: vila dos bichinhos (trabalho e TI) ======================
  junior: {
    style: 'village',
    welcome: 'Bem-vindo(a) à Vila',
    sky: '#bfe8ff', ground: '#9fd18a', water: '#7fd3f7', sand: '#f7e2b0', grass: '#98d97a', path: '#f3dcb4',
    signs: {
      greet: ['HELLO HOUSE', 'Casa do Olá'], colors: ['OFFICE', 'Escritório'], numbers: ['NUMBER SQUARE', 'Praça dos Números'],
      fruits: ['FRUIT GARDEN', 'Jardim das Frutas'], bakery: ['BAKERY', 'Padaria e café'], shop: ['SHOP', 'Loja'],
      arena: ['WORD RUN', 'Corrida das Palavras'], gate: ['FOREST', '🔒 Em breve'],
    },
    houses: { greet: ['#fff1f5', '#ff9ebb'], colors: ['#fffbe8', '#7cc6ff'], bakery: ['#fff3d6', '#c98a5a'] },
    people: {
      greet: { name: 'Teacher Bunny', pt: 'a Professora Coelha', species: 'bunny', color: '#f4a9c4', emoji: '🐰', hat: 'bow' },
      colors: { name: 'Teacher Cat', pt: 'o Professor Gato', species: 'cat', color: '#f5a25d', emoji: '🐱', face: 'glasses' },
      numbers: { name: 'Teacher Panda', pt: 'o Professor Panda', species: 'panda', color: '#3d3a4b', emoji: '🐼', neck: 'bowtie' },
      fruits: { name: 'Teacher Fox', pt: 'a Professora Raposa', species: 'fox', color: '#f58a3d', emoji: '🦊', hat: 'flower' },
      arena: { name: 'Coach Puppy', pt: 'o Treinador Cachorrinho', species: 'puppy', color: '#d9a066', emoji: '🐶', hat: 'cap' },
      bakery: { name: 'Mrs. Bear', pt: 'a Dona Ursa', species: 'bear', color: '#9a6a46', emoji: '🐻', neck: 'scarf' },
      shop: { name: 'Mimi', pt: 'a Mimi', species: 'bunny', color: '#f7efe4', emoji: '🐰', hat: 'party' },
      mayor: { name: 'Mayor Max', pt: 'o Prefeito Max', species: 'bear', color: '#a3acb9', emoji: '🐻', hat: 'tophat', neck: 'bowtie' },
    },
    wanderers: [
      { id: 'Bolt', name: 'Bolt', species: 'puppy', color: '#8ec5ff', emoji: '🐶' },
      { id: 'Pom', name: 'Pom', species: 'cat', color: '#bca6f2', emoji: '🐱' },
      { id: 'Nugget', name: 'Nugget', species: 'bear', color: '#f5c27a', emoji: '🐻' },
    ],
    smallTalk: [
      { en: 'Hello! Good morning!', pt: 'Olá! Bom dia!' },
      { en: 'Hi! I like apples.', pt: 'Oi! Eu gosto de maçãs.' },
      { en: 'Hello, friend!', pt: 'Olá, amigo!' },
      { en: 'Thank you! Goodbye!', pt: 'Obrigado! Tchau!' },
      { en: 'I love the color blue!', pt: 'Eu amo a cor azul!' },
      { en: 'One, two, three... hello!', pt: 'Um, dois, três... olá!' },
    ],
    idTitle: { en: 'Village ID', pt: 'Identidade da Vila' },
    gate: { icon: '🌲', en: 'Forest', line: { en: 'The Forest is closed... for now!', pt: 'A Floresta está fechada... por enquanto!' } },
    mayorHi: { en: 'Hello! Welcome to our village! I am the mayor.', pt: 'Olá! Bem-vindo(a) à nossa vila! Eu sou o prefeito.' },
    job: {
      icon: '🥧',
      locked1: { en: 'Hello, dear! I need fruits for my pies...', pt: 'Olá, querido(a)! Eu preciso de frutas para minhas tortas...' },
      hello: { en: 'Hello, {name}! I want to bake a pie.', pt: 'Olá, {name}! Eu quero fazer uma torta.' },
      where: { en: 'The fruits are in the Fruit Garden. Thank you!', pt: 'As frutas estão no Fruit Garden (Jardim das Frutas). Obrigada!' },
      pay: { en: 'Here is my pie... and 40 coins for you!', pt: 'Aqui está minha torta... e 40 moedas para você!' },
    },
  },

  // ====================== ERIC: jardim botânico (jardinagem, paisagismo, árvores) ======================
  eric: {
    style: 'garden',
    welcome: 'Bem-vindo(a) ao Jardim Botânico',
    sky: '#c6efff', ground: '#8fcf7a', water: '#74cdea', sand: '#e6dcae', grass: '#84cf68', path: '#e9d6a6',
    signs: {
      greet: ['GREENHOUSE', 'Estufa'], colors: ['TOOL SHED', 'Galpão de Ferramentas'], numbers: ['NURSERY', 'Viveiro de Mudas'],
      fruits: ['ORCHARD', 'Pomar'], bakery: ['GARDEN CENTER', 'Loja de Jardinagem'], shop: ['SHOP', 'Loja'],
      arena: ['WORD RUN', 'Corrida das Palavras'], gate: ['BIG PARK', '🔒 Em breve'],
    },
    houses: { greet: ['#e9fff6', '#86dcc0'], colors: ['#e7cfa6', '#9a6a46'], bakery: ['#f6ffe8', '#5fae55'] },
    people: {
      greet: { name: 'Rosa', pt: 'a Rosa', species: 'bunny', color: '#f7efe4', emoji: '🐰', hat: 'flower' },
      colors: { name: 'Cedar', pt: 'o Cedar', species: 'cat', color: '#9a6a46', emoji: '🐱', hat: 'cap' },
      numbers: { name: 'Woody', pt: 'o Woody', species: 'panda', color: '#3d3a4b', emoji: '🐼', face: 'glasses' },
      fruits: { name: 'Daisy', pt: 'a Daisy', species: 'fox', color: '#f58a3d', emoji: '🦊', hat: 'bow' },
      arena: { name: 'Coach Sprout', pt: 'o Treinador Sprout', species: 'puppy', color: '#a8d98a', emoji: '🐶', hat: 'cap' },
      bakery: { name: 'Mrs. Maple', pt: 'a Dona Maple', species: 'bear', color: '#d9a066', emoji: '🐻', neck: 'scarf' },
      shop: { name: 'Lily', pt: 'a Lily', species: 'bunny', color: '#f4a9c4', emoji: '🐰', hat: 'party' },
      mayor: { name: 'Mr. Park', pt: 'o Sr. Park', species: 'bear', color: '#a3acb9', emoji: '🐻', face: 'glasses', neck: 'bowtie' },
    },
    wanderers: [
      { id: 'Moss', name: 'Moss', species: 'puppy', color: '#8ec5ff', emoji: '🐶' },
      { id: 'Fern', name: 'Fern', species: 'cat', color: '#bca6f2', emoji: '🐱' },
      { id: 'Twig', name: 'Twig', species: 'bear', color: '#f5c27a', emoji: '🐻' },
    ],
    smallTalk: [
      { en: 'Hello! Good morning!', pt: 'Olá! Bom dia!' },
      { en: 'What a beautiful day!', pt: 'Que dia lindo!' },
      { en: 'I love trees!', pt: 'Eu amo árvores!' },
      { en: 'The flowers are beautiful today.', pt: 'As flores estão lindas hoje.' },
      { en: 'The grass is very green!', pt: 'A grama está bem verde!' },
      { en: 'I like to work outdoors.', pt: 'Eu gosto de trabalhar ao ar livre.' },
    ],
    idTitle: { en: 'Work Badge', pt: 'Crachá de Trabalho' },
    gate: { icon: '🌳', en: 'Big Park', line: { en: 'The Big Park is closed... for now!', pt: 'O Parque Grande está fechado... por enquanto!' } },
    mayorHi: { en: 'Hello! Welcome to the Botanical Garden! I am the manager.', pt: 'Olá! Bem-vindo(a) ao Jardim Botânico! Eu sou o gerente.' },
    job: {
      icon: '🥗',
      locked1: { en: 'Hello, dear! I need fruits for the team...', pt: 'Olá, querido(a)! Eu preciso de frutas para a equipe...' },
      hello: { en: 'Hello, {name}! I want to make a fruit salad for the team.', pt: 'Olá, {name}! Eu quero fazer uma salada de frutas para a equipe.' },
      where: { en: 'The fruits are in the Orchard. Thank you!', pt: 'As frutas estão no Orchard (Pomar). Obrigada!' },
      pay: { en: 'Here is your fruit salad... and 40 coins for you!', pt: 'Aqui está sua salada de frutas... e 40 moedas para você!' },
    },
  },

  // ====================== ELLEN: Rua do Café (turma de amigos) ======================
  ellen: {
    style: 'city',
    welcome: 'Bem-vindo(a) à Coffee Street',
    sky: '#cfe4ff', ground: '#b9c9a8', water: '#7cc4f0', sand: '#e9e1d2', grass: '#a6d88c', path: '#dcd6cf',
    signs: {
      greet: ['THE APARTMENT', 'O Apartamento'], colors: ['THE STUDIO', 'O Estúdio'], numbers: ['GAME CORNER', 'Cantinho dos Jogos'],
      fruits: ['STREET MARKET', 'Feirinha'], bakery: ['COZY CUP CAFÉ', 'Cafeteria'], shop: ['SHOP', 'Loja'],
      arena: ['WORD RUN', 'Corrida das Palavras'], gate: ['DOWNTOWN', '🔒 Em breve'],
    },
    houses: { greet: ['#ffd9c2', '#b5654a'], colors: ['#e7e1ff', '#7a6ad8'], bakery: ['#fff0dd', '#7b4a2e'] },
    people: {
      greet: { name: 'Mia', pt: 'a Mia', species: 'bunny', color: '#f4a9c4', emoji: '🐰', hat: 'bow' },
      colors: { name: 'Leo', pt: 'o Leo', species: 'cat', color: '#f5a25d', emoji: '🐱', face: 'sunglasses' },
      numbers: { name: 'Sam', pt: 'o Sam', species: 'panda', color: '#3d3a4b', emoji: '🐼', hat: 'cap' },
      fruits: { name: 'Zoe', pt: 'a Zoe', species: 'fox', color: '#f58a3d', emoji: '🦊', hat: 'flower' },
      arena: { name: 'Coach Rex', pt: 'o Treinador Rex', species: 'puppy', color: '#d9a066', emoji: '🐶', hat: 'cap' },
      bakery: { name: 'Olive', pt: 'a Olive', species: 'bear', color: '#9a6a46', emoji: '🐻', neck: 'scarf' },
      shop: { name: 'Gigi', pt: 'a Gigi', species: 'bunny', color: '#f7efe4', emoji: '🐰', hat: 'party' },
      mayor: { name: 'Mr. Gray', pt: 'o Sr. Gray', species: 'bear', color: '#a3acb9', emoji: '🐻', face: 'glasses', neck: 'bowtie' },
    },
    wanderers: [
      { id: 'Ben', name: 'Ben', species: 'puppy', color: '#8ec5ff', emoji: '🐶' },
      { id: 'Kate', name: 'Kate', species: 'cat', color: '#bca6f2', emoji: '🐱' },
      { id: 'Duke', name: 'Duke', species: 'bear', color: '#f5c27a', emoji: '🐻' },
    ],
    smallTalk: [
      { en: "Hey! What's up?", pt: 'E aí! Tudo bem?' },
      { en: 'I need a coffee!', pt: 'Eu preciso de um café!' },
      { en: "Let's hang out later!", pt: 'Vamos sair mais tarde!' },
      { en: 'I love this street.', pt: 'Eu amo esta rua.' },
      { en: 'See you at the café!', pt: 'Te vejo na cafeteria!' },
      { en: 'What a day!', pt: 'Que dia!' },
    ],
    idTitle: { en: 'Neighbor Card', pt: 'Cartão de Vizinho' },
    gate: { icon: '🏙️', en: 'Downtown', line: { en: 'Downtown is closed... for now!', pt: 'O Centro da cidade está fechado... por enquanto!' } },
    mayorHi: { en: 'Hello! Welcome to Coffee Street! I am the building manager.', pt: 'Olá! Bem-vindo(a) à Coffee Street! Eu sou o síndico do prédio.' },
    job: {
      icon: '🥤',
      locked1: { en: 'Hello, dear! I need fruits for my smoothies...', pt: 'Olá, querido(a)! Eu preciso de frutas para as minhas vitaminas...' },
      hello: { en: 'Hello, {name}! I want to make a smoothie.', pt: 'Olá, {name}! Eu quero fazer uma vitamina de frutas.' },
      where: { en: 'The fruits are at the Street Market. Thank you!', pt: 'As frutas estão no Street Market (Feirinha). Obrigada!' },
      pay: { en: 'Here is your smoothie... and 40 coins for you!', pt: 'Aqui está sua vitamina... e 40 moedas para você!' },
    },
  },

  // ====================== CARLA: vila bíblica (histórias da Bíblia) ======================
  carla: {
    style: 'bible',
    welcome: 'Bem-vindo(a) à Vila da Paz',
    sky: '#ffe9c2', ground: '#d9c38a', water: '#6ec6e4', sand: '#f1d79c', grass: '#cbd486', path: '#ecd3a2',
    signs: {
      greet: ['THE CHAPEL', 'Capela'], colors: ['STORY TENT', 'Tenda das Histórias'], numbers: ['THE WELL', 'Praça do Poço'],
      fruits: ['FRUIT GARDEN', 'Jardim das Frutas'], bakery: ['BREAD HOUSE', 'Casa do Pão'], shop: ['MARKET', 'Mercado'],
      arena: ['WORD RUN', 'Corrida das Palavras'], gate: ['JERUSALEM', '🔒 Em breve'],
    },
    houses: { greet: ['#fff8ea', '#c98a5a'], colors: ['#f6e2c0', '#b0563c'], bakery: ['#f6e6c6', '#c79a63'] },
    people: {
      greet: { name: 'Sister Grace', pt: 'a Irmã Grace', species: 'bunny', color: '#f7efe4', emoji: '🐰', neck: 'scarf' },
      colors: { name: 'Brother Sam', pt: 'o Irmão Sam', species: 'cat', color: '#f5a25d', emoji: '🐱', face: 'glasses' },
      numbers: { name: 'Teacher Eli', pt: 'o Professor Eli', species: 'panda', color: '#3d3a4b', emoji: '🐼', neck: 'bowtie' },
      fruits: { name: 'Miss Ruth', pt: 'a Dona Ruth', species: 'fox', color: '#f58a3d', emoji: '🦊', hat: 'flower' },
      arena: { name: 'Coach Caleb', pt: 'o Treinador Caleb', species: 'puppy', color: '#d9a066', emoji: '🐶', hat: 'cap' },
      bakery: { name: 'Grandma Anna', pt: 'a Vovó Anna', species: 'bear', color: '#9a6a46', emoji: '🐻', face: 'glasses', neck: 'scarf' },
      shop: { name: 'Lydia', pt: 'a Lydia', species: 'bunny', color: '#bca6f2', emoji: '🐰', hat: 'bow' },
      mayor: { name: 'Elder Abe', pt: 'o Ancião Abe', species: 'bear', color: '#a3acb9', emoji: '🐻', neck: 'scarf' },
    },
    wanderers: [
      { id: 'Levi', name: 'Levi', species: 'puppy', color: '#8ec5ff', emoji: '🐶' },
      { id: 'Hannah', name: 'Hannah', species: 'cat', color: '#f4a9c4', emoji: '🐱' },
      { id: 'Joel', name: 'Joel', species: 'bear', color: '#f5c27a', emoji: '🐻' },
    ],
    smallTalk: [
      { en: 'Hello! God bless you!', pt: 'Olá! Deus te abençoe!' },
      { en: 'Peace be with you!', pt: 'A paz esteja com você!' },
      { en: 'What a beautiful day! Thank God!', pt: 'Que dia lindo! Graças a Deus!' },
      { en: 'God is good!', pt: 'Deus é bom!' },
      { en: 'I love the stories of the Bible.', pt: 'Eu amo as histórias da Bíblia.' },
      { en: 'Have a blessed day!', pt: 'Tenha um dia abençoado!' },
    ],
    idTitle: { en: 'Village Card', pt: 'Cartão da Vila' },
    gate: { icon: '🏛️', en: 'Jerusalem', line: { en: 'The road to Jerusalem is closed... for now!', pt: 'A estrada para Jerusalém está fechada... por enquanto!' } },
    mayorHi: { en: 'Peace be with you! Welcome to our village!', pt: 'A paz esteja com você! Bem-vindo(a) à nossa vila!' },
    job: {
      icon: '🍞',
      locked1: { en: 'Hello, dear! I need fruits for my sweet bread...', pt: 'Olá, querido(a)! Eu preciso de frutas para o meu pão doce...' },
      hello: { en: 'Hello, {name}! I want to bake sweet bread.', pt: 'Olá, {name}! Eu quero fazer pão doce.' },
      where: { en: 'The fruits are in the Fruit Garden. Thank you!', pt: 'As frutas estão no Fruit Garden (Jardim das Frutas). Obrigada!' },
      pay: { en: 'Here is some sweet bread... and 40 coins for you!', pt: 'Aqui está um pão doce... e 40 moedas para você!' },
    },
  },
};

// vozes de cada bichinho do tema: papel fixo + os três que passeiam
export function voicesFor(theme) {
  const v = { narrator: NARRATOR, ...ROLE_VOICE };
  theme.wanderers.forEach((w, i) => { v[w.id] = WANDER_VOICE[i]; });
  return v;
}

// nome e emoji nos diálogos
export function peopleFor(theme) {
  const p = {};
  for (const [id, x] of Object.entries(theme.people)) p[id] = { name: x.name, emoji: x.emoji, pt: x.pt };
  for (const w of theme.wanderers) p[w.id] = { name: w.name, emoji: w.emoji, pt: w.name };
  return p;
}
