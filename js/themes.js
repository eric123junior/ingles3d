// Temas: o cenário, os personagens e as falas de cada módulo.
// Personagem com `look` é uma pessoa (js/people.js); sem `look` é um bichinho (species + color).
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
      greet: { name: 'Rosa', pt: 'a Rosa', emoji: '👩‍🌾', look: { skin: '#f1c9a5', hair: '#7a3a22', hairStyle: 'ponytail', top: '#ff8fab', bottom: '#4a6fa5', extras: ['overalls', 'strawHat'] } },
      colors: { name: 'Cedar', pt: 'o Cedar', emoji: '👷', look: { skin: '#d9a77f', hair: '#3a2418', hairStyle: 'short', beard: '#3a2418', top: '#ffb03b', bottom: '#4a5a3a', extras: ['helmet', 'harness'] } },
      numbers: { name: 'Woody', pt: 'o Woody', emoji: '👨‍🌾', face: 'glasses', look: { skin: '#e8c09a', hair: '#5a3d2b', hairStyle: 'short', top: '#6b8f5a', bottom: '#7a5a3a', extras: ['apron'], apronColor: '#8a6248' } },
      fruits: { name: 'Daisy', pt: 'a Daisy', emoji: '🌼', look: { skin: '#f3cfb0', hair: '#e3c27a', hairStyle: 'bun', top: '#ffd54d', bottom: '#5a7a4a', extras: ['apron'], apronColor: '#5fae55' } },
      arena: { name: 'Coach Sprout', pt: 'o Treinador Sprout', emoji: '🏃', hat: 'cap', look: { skin: '#c98f6a', hair: '#2b1d17', hairStyle: 'short', top: '#7be0ad', bottom: '#3b3f4f' } },
      bakery: { name: 'Mrs. Maple', pt: 'a Dona Maple', emoji: '👵', look: { skin: '#f1c9a5', hair: '#dedad2', hairStyle: 'bun', top: '#d9a066', bottom: '#7a5a3a', extras: ['apron'] } },
      shop: { name: 'Lily', pt: 'a Lily', emoji: '👩', look: { skin: '#e8c09a', hair: '#2b1d17', hairStyle: 'long', top: '#f4a9c4', bottom: '#3b3f4f' } },
      mayor: { name: 'Mr. Park', pt: 'o Sr. Park', emoji: '👨‍💼', face: 'glasses', look: { skin: '#f0cfa8', hair: '#2b2b2b', hairStyle: 'short', top: '#ffffff', bottom: '#3b3f4f', extras: ['jacket', 'tie'], jacket: '#4f6b4a', tieColor: '#5fae55' } },
    },
    wanderers: [
      { id: 'Moss', name: 'Moss', emoji: '👨‍🌾', look: { skin: '#d9a77f', hair: '#5a3d2b', hairStyle: 'short', top: '#a8d98a', bottom: '#4a6fa5', extras: ['overalls', 'strawHat'] } },
      { id: 'Fern', name: 'Fern', emoji: '👩‍🌾', look: { skin: '#f6d4b6', hair: '#b5654a', hairStyle: 'curly', top: '#bca6f2', bottom: '#5a7a4a', extras: ['apron'], apronColor: '#a0714f' } },
      { id: 'Twig', name: 'Twig', emoji: '👦', look: { skin: '#f1c9a5', hair: '#e3c27a', hairStyle: 'spiky', top: '#f5c27a', bottom: '#4a5a7a', scale: 0.88 } },
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
    welcome: 'Bem-vindo(a) a Nova York',
    sky: '#cfe4ff', ground: '#b4b8be', water: '#7cc4f0', sand: '#cfc8bc', grass: '#a9adb3', path: '#e6e0d6',
    signs: {
      greet: ["MONICA'S PLACE", 'Apartamento da Monica'], colors: ["JOEY'S STUDIO", 'Estúdio do Joey'], numbers: ['GAME CORNER', 'Cantinho dos Jogos'],
      fruits: ['STREET MARKET', 'Feirinha'], bakery: ['CENTRAL PERK', 'Cafeteria'], shop: ['SHOP', 'Loja'],
      arena: ['WORD RUN', 'Corrida das Palavras'], gate: ['DOWNTOWN', '🔒 Em breve'],
    },
    houses: { greet: ['#c8775a', '#7a3f2e'], colors: ['#e7e1ff', '#7a6ad8'], bakery: ['#6b3f2a', '#2f5a40'] },
    // personagens da série Friends (jogo de uso só da família)
    people: {
      greet: { name: 'Monica', pt: 'a Monica', emoji: '👩‍🍳', look: { skin: '#f3cfb0', hair: '#2b1d17', hairStyle: 'bob', top: '#8a5fb0', bottom: '#2f2a3a' } },
      colors: { name: 'Joey', pt: 'o Joey', emoji: '🍕', look: { skin: '#e5b48e', hair: '#2b1d17', hairStyle: 'spiky', top: '#e9e4d8', bottom: '#3b4a6b', extras: ['jacket'], jacket: '#4a2f22' } },
      numbers: { name: 'Chandler', pt: 'o Chandler', emoji: '👨‍💼', look: { skin: '#f1c9a5', hair: '#5a3d2b', hairStyle: 'short', top: '#ffffff', bottom: '#3b3f4f', extras: ['jacket', 'tie'], jacket: '#56657a', tieColor: '#2f4f7f' } },
      fruits: { name: 'Rachel', pt: 'a Rachel', emoji: '👱‍♀️', look: { skin: '#f3cfb0', hair: '#c9a063', hairStyle: 'long', top: '#ffffff', bottom: '#2f2a3a', extras: ['apron'], apronColor: '#f2ead8' } },
      arena: { name: 'Coach Ursula', pt: 'a Treinadora Ursula', emoji: '🏃‍♀️', look: { skin: '#f6d4b6', hair: '#e8cf8a', hairStyle: 'ponytail', top: '#ff6f91', bottom: '#3b3f4f' } },
      bakery: { name: 'Gunther', pt: 'o Gunther', male: true, emoji: '☕', look: { skin: '#f3d3b8', hair: '#f8f3d6', hairStyle: 'short', top: '#ffffff', bottom: '#2f2a3a', extras: ['apron'], apronColor: '#2f5a40' } },
      shop: { name: 'Janice', pt: 'a Janice', emoji: '💅', look: { skin: '#f1c9a5', hair: '#2b1d17', hairStyle: 'curly', top: '#c99a5a', bottom: '#2f2a3a' } },
      mayor: { name: 'Mr. Treeger', pt: 'o Sr. Treeger', emoji: '🔧', look: { skin: '#e8b896', hair: '#6b5a4a', hairStyle: 'bald', top: '#ffffff', bottom: '#5a6a8a', extras: ['overalls'], scale: 1.12 } },
    },
    wanderers: [
      { id: 'Ross', name: 'Ross', emoji: '🦕', look: { skin: '#f1c9a5', hair: '#4a3020', hairStyle: 'short', top: '#8a5a3a', bottom: '#4a4a5a' } },
      { id: 'Phoebe', name: 'Phoebe', emoji: '🎸', look: { skin: '#f6d4b6', hair: '#f0d58a', hairStyle: 'wavy', robe: '#b8a4ff', sash: '#ffd54d', extras: ['guitar'] } },
      { id: 'Mike', name: 'Mike', emoji: '🎹', look: { skin: '#f1c9a5', hair: '#6b4a2a', hairStyle: 'short', top: '#5a7aa0', bottom: '#3b3f4f' } },
    ],
    voices: { bakery: 'bm_fable', arena: 'af_kore' }, // o Gunther é homem; a Ursula é mulher
    smallTalk: [
      { en: "Hey! What's up?", pt: 'E aí! Tudo bem?' },
      { en: 'I need a coffee!', pt: 'Eu preciso de um café!' },
      { en: "Let's hang out later!", pt: 'Vamos sair mais tarde!' },
      { en: 'I love New York!', pt: 'Eu amo Nova York!' },
      { en: 'See you at Central Perk!', pt: 'Te vejo no Central Perk!' },
      { en: 'What a day!', pt: 'Que dia!' },
    ],
    idTitle: { en: 'Neighbor Card', pt: 'Cartão de Vizinho' },
    gate: { icon: '🏙️', en: 'Downtown', line: { en: 'Downtown is closed... for now!', pt: 'O Centro da cidade está fechado... por enquanto!' } },
    mayorHi: { en: "Hello! Welcome to the building! I'm the super.", pt: 'Olá! Bem-vindo(a) ao prédio! Eu sou o zelador.' },
    job: {
      icon: '🥤',
      locked1: { en: 'Hello there! I need fruits for my smoothies...', pt: 'Olá! Eu preciso de frutas para as minhas vitaminas...' },
      hello: { en: 'Hello, {name}! I want to make a smoothie.', pt: 'Olá, {name}! Eu quero fazer uma vitamina de frutas.' },
      where: { en: 'The fruits are at the Street Market. Thank you!', pt: 'As frutas estão no Street Market (Feirinha). Obrigado!' },
      pay: { en: 'Here is your smoothie... and 40 coins for you!', pt: 'Aqui está sua vitamina... e 40 moedas para você!' },
    },
  },

  // ====================== CARLA: vila bíblica (histórias da Bíblia) ======================
  carla: {
    style: 'bible',
    welcome: 'Bem-vindo(a) à Vila da Paz',
    sky: '#ffe9c2', ground: '#e0c98f', water: '#6ec6e4', sand: '#f1d79c', grass: '#e2cf94', path: '#f2dfb4',
    signs: {
      greet: ['THE CHAPEL', 'Capela'], colors: ['STORY TENT', 'Tenda das Histórias'], numbers: ['THE WELL', 'Praça do Poço'],
      fruits: ['FRUIT GARDEN', 'Jardim das Frutas'], bakery: ['BREAD HOUSE', 'Casa do Pão'], shop: ['MARKET', 'Mercado'],
      arena: ['WORD RUN', 'Corrida das Palavras'], gate: ['JERUSALEM', '🔒 Em breve'],
    },
    houses: { greet: ['#fff8ea', '#c98a5a'], colors: ['#f6e2c0', '#b0563c'], bakery: ['#f6e6c6', '#c79a63'] },
    people: {
      greet: { name: 'Miriam', pt: 'a Miriam', emoji: '🧕', look: { skin: '#d9a77f', hair: '#3a2418', head: 'veil', headColor: '#e9dcc4', robe: '#5b8fc9', sash: '#e9c46a' } },
      colors: { name: 'Samuel', pt: 'o Samuel', emoji: '🧔', look: { skin: '#d4a07a', hair: '#3a2418', hairStyle: 'short', beard: '#3a2418', robe: '#efe4cc', sash: '#6b8f5a' } },
      numbers: { name: 'Teacher Eli', pt: 'o Professor Eli', emoji: '👴', look: { skin: '#d9a77f', hair: '#e8e4dc', head: 'headcloth', headColor: '#f3ead8', band: '#6b4a36', beard: '#efeae2', robe: '#8a6a9a', sash: '#c9a063' } },
      fruits: { name: 'Miss Ruth', pt: 'a Dona Ruth', emoji: '👩‍🌾', look: { skin: '#e0b08a', hair: '#5a3a22', head: 'veil', headColor: '#f6e3b4', robe: '#c8553d', sash: '#f0d58a' } },
      arena: { name: 'Coach Caleb', pt: 'o Treinador Caleb', emoji: '💪', look: { skin: '#c98f6a', hair: '#2b1d17', hairStyle: 'curly', beard: '#2b1d17', robe: '#b0563c', sash: '#e9c46a' } },
      bakery: { name: 'Grandma Anna', pt: 'a Vovó Anna', emoji: '👵', look: { skin: '#e0b08a', hair: '#d8d4cc', head: 'veil', headColor: '#d9c3e8', robe: '#7a5a9a', extras: ['apron'], apronColor: '#f6eedc' } },
      shop: { name: 'Lydia', pt: 'a Lydia', emoji: '🧕', look: { skin: '#e8c09a', hair: '#2b1d17', head: 'veil', headColor: '#9b4fbf', robe: '#7a3a9a', sash: '#ffd54d' } },
      mayor: { name: 'Abraham', pt: 'o Abraão', emoji: '👴', look: { skin: '#d4a07a', hair: '#f1ede6', head: 'headcloth', headColor: '#ffffff', band: '#8a6248', beard: '#f1ede6', robe: '#a0714f', sash: '#e9c46a', extras: ['staff'] } },
    },
    wanderers: [
      { id: 'Levi', name: 'Levi', emoji: '👦', look: { skin: '#c98f6a', hair: '#2b1d17', hairStyle: 'short', robe: '#6b8f5a', sash: '#c9a063', extras: ['staff'] } },
      { id: 'Hannah', name: 'Hannah', emoji: '👩', look: { skin: '#e8c09a', hair: '#3a2418', head: 'veil', headColor: '#f4a9c4', robe: '#efe4cc', sash: '#c8553d' } },
      { id: 'Joel', name: 'Joel', emoji: '👨', look: { skin: '#d4a07a', hair: '#4a3020', head: 'headcloth', headColor: '#e9dcc4', band: '#5a4636', beard: '#4a3020', robe: '#5b8fc9', sash: '#a0714f' } },
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
  const v = { narrator: NARRATOR, ...ROLE_VOICE, ...(theme.voices || {}) };
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
