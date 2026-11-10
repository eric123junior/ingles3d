// Módulo do JUNIOR — curso de inglês (nível A1 do Quadro Europeu – CEFR), focado em conversa:
// dia a dia, viagem e trabalho em TI. Cada unidade tem um objetivo de conversa ("can-do")
// e etapas: palavras/frases → gramática → escuta → conversa → missão no mundo.
//
// Tipos de etapa:
//  words   { items: [{en, pt, pic|color|digit}], specials? }   cartões + exercícios
//  grammar { cards: [{title, html, examples:[{en,pt}]}], quiz: [{gap, opts, a, why, pt} | {order, pt}] }
//  listen  { scene, lines: [{who, en, pt}], questions: [{q:{en,pt}, opts, a}] }
//  talk    { partner, scene, turns: [{who?, en, pt, opts?: [{en, ok, why?, reply?, save?}]}] }
//  mission { at, desc, talk | talks }   conversa no mundo com um bichinho
// {name} = nome do jogador (aparece no texto, não é falado no áudio).

export const COLORS = [
  { en: 'red', pt: 'vermelho', color: '#ef4444' },
  { en: 'blue', pt: 'azul', color: '#3b82f6' },
  { en: 'yellow', pt: 'amarelo', color: '#facc15' },
  { en: 'green', pt: 'verde', color: '#22c55e' },
  { en: 'orange', pt: 'laranja', color: '#f97316' },
  { en: 'purple', pt: 'roxo', color: '#a855f7' },
  { en: 'pink', pt: 'rosa', color: '#f472b6' },
  { en: 'black', pt: 'preto', color: '#27222e' },
  { en: 'white', pt: 'branco', color: '#ffffff' },
];
export const NUMBERS = [
  { en: 'one', pt: 'um', digit: 1 }, { en: 'two', pt: 'dois', digit: 2 }, { en: 'three', pt: 'três', digit: 3 },
  { en: 'four', pt: 'quatro', digit: 4 }, { en: 'five', pt: 'cinco', digit: 5 }, { en: 'six', pt: 'seis', digit: 6 },
  { en: 'seven', pt: 'sete', digit: 7 }, { en: 'eight', pt: 'oito', digit: 8 }, { en: 'nine', pt: 'nove', digit: 9 },
  { en: 'ten', pt: 'dez', digit: 10 },
];
export const BIG_NUMBERS = [
  { en: 'eleven', pt: 'onze', digit: 11 }, { en: 'twelve', pt: 'doze', digit: 12 }, { en: 'thirteen', pt: 'treze', digit: 13 },
  { en: 'fifteen', pt: 'quinze', digit: 15 }, { en: 'twenty', pt: 'vinte', digit: 20 }, { en: 'twenty-five', pt: 'vinte e cinco', digit: 25 },
  { en: 'thirty', pt: 'trinta', digit: 30 }, { en: 'forty', pt: 'quarenta', digit: 40 }, { en: 'fifty', pt: 'cinquenta', digit: 50 },
  { en: 'one hundred', pt: 'cem', digit: 100 },
];
export const FRUITS = [
  { en: 'apple', pt: 'maçã', pic: '🍎' }, { en: 'banana', pt: 'banana', pic: '🍌' }, { en: 'orange', pt: 'laranja', pic: '🍊' },
  { en: 'grapes', pt: 'uvas', pic: '🍇' }, { en: 'strawberry', pt: 'morango', pic: '🍓' }, { en: 'watermelon', pt: 'melancia', pic: '🍉' },
  { en: 'pear', pt: 'pera', pic: '🍐' },
];

export const UNITS = [
  // ======================================================================
  {
    id: 'u1', npc: 'greet', icon: '👋',
    title: { en: 'Hello!', pt: 'Olá! Cumprimentos e apresentações' },
    cando: 'Consigo cumprimentar, perguntar como a pessoa está, me apresentar e me despedir.',
    intro: { en: 'Hi! I am Teacher Bunny. Let\'s learn to say hello and talk to new friends!', pt: 'Oi! Eu sou a Professora Coelha. Vamos aprender a cumprimentar e conversar com novos amigos!' },
    stages: [
      {
        id: 'greet', type: 'words', title: { en: 'Greetings', pt: 'Cumprimentos' },
        items: [
          { en: 'hello', pt: 'olá', pic: '👋' },
          { en: 'hi', pt: 'oi', pic: '🙋' },
          { en: 'good morning', pt: 'bom dia', pic: '🌅' },
          { en: 'good afternoon', pt: 'boa tarde', pic: '☀️' },
          { en: 'good evening', pt: 'boa noite (ao chegar)', pic: '🌆' },
          { en: 'good night', pt: 'boa noite (ao sair / dormir)', pic: '🌙' },
          { en: 'goodbye', pt: 'adeus / tchau', pic: '🚪' },
          { en: 'see you later', pt: 'até mais', pic: '⏰' },
          { en: 'thank you', pt: 'obrigado(a)', pic: '🙏' },
          { en: 'please', pt: 'por favor', pic: '🤲' },
          { en: 'yes', pt: 'sim', pic: '👍' },
          { en: 'no', pt: 'não', pic: '👎' },
        ],
        specials: [
          { q: { en: 'It is 8 a.m. You say:', pt: 'São 8 da manhã. Você diz:' }, show: '🌅☕', answer: 'good morning', wrong: ['good night', 'good evening'] },
          { q: { en: 'You are going to bed. You say:', pt: 'Você vai dormir. Você diz:' }, show: '🌙🛏️', answer: 'good night', wrong: ['good morning', 'hello'] },
          { q: { en: 'Someone gives you a gift. You say:', pt: 'Alguém te dá um presente. Você diz:' }, show: '🎁', answer: 'thank you', wrong: ['please', 'goodbye'] },
          { q: { en: 'You arrive at a party at 8 p.m. You say:', pt: 'Você chega numa festa às 20h. Você diz:' }, show: '🎉🌆', answer: 'good evening', wrong: ['good night', 'good morning'] },
        ],
      },
      {
        id: 'intro', type: 'words', title: { en: 'Introductions', pt: 'Apresentações' },
        items: [
          { en: 'What\'s your name?', pt: 'Qual é o seu nome?', pic: '🤔' },
          { en: 'My name is Ana.', pt: 'Meu nome é Ana.', pic: '📛' },
          { en: 'I\'m Tom.', pt: 'Eu sou o Tom.', pic: '🙋' },
          { en: 'Nice to meet you.', pt: 'Prazer em te conhecer.', pic: '🤝' },
          { en: 'Nice to meet you too.', pt: 'O prazer é meu.', pic: '😊' },
          { en: 'How are you?', pt: 'Como você está?', pic: '❓' },
          { en: 'I\'m fine, thanks.', pt: 'Estou bem, obrigado(a).', pic: '👌' },
          { en: 'I\'m great!', pt: 'Estou ótimo(a)!', pic: '😄' },
          { en: 'I\'m tired.', pt: 'Estou cansado(a).', pic: '😴' },
          { en: 'And you?', pt: 'E você?', pic: '👉' },
        ],
        specials: [
          { q: { en: 'Someone says this. What do you answer?', pt: 'Alguém diz isto. O que você responde?' }, say: 'Nice to meet you.', answer: 'Nice to meet you too.', wrong: ['Good night.', 'I\'m tired.'] },
          { q: { en: 'Someone says this. What do you answer?', pt: 'Alguém diz isto. O que você responde?' }, say: 'How are you?', answer: 'I\'m fine, thanks. And you?', wrong: ['My name is Tom.', 'Goodbye!'] },
          { q: { en: 'Someone says this. What do you answer?', pt: 'Alguém diz isto. O que você responde?' }, say: 'What\'s your name?', answer: 'My name is Ana.', wrong: ['I\'m fine.', 'Yes, please.'] },
        ],
      },
      {
        id: 'gram', type: 'grammar', title: { en: 'The verb "to be" (I / you)', pt: 'O verbo "to be" (eu / você)' },
        cards: [
          {
            title: 'TO BE = ser / estar',
            html: `<p>Em inglês, <b>ser</b> e <b>estar</b> são o mesmo verbo: <b>to be</b>.</p>
              <table><tr><th>Completo</th><th>Curto (falado)</th><th>Significado</th></tr>
              <tr><td>I am</td><td><b>I'm</b></td><td>eu sou / eu estou</td></tr>
              <tr><td>You are</td><td><b>You're</b></td><td>você é / você está</td></tr></table>
              <p>💡 Na conversa, quase sempre se usa a forma curta: <b>I'm</b>, <b>you're</b>.</p>`,
            examples: [
              { en: 'I\'m Tom.', pt: 'Eu sou o Tom.' },
              { en: 'I\'m fine.', pt: 'Eu estou bem.' },
              { en: 'You\'re my friend.', pt: 'Você é meu amigo.' },
            ],
          },
          {
            title: 'Perguntas: WHAT e HOW',
            html: `<p><b>What</b> = o que / qual &nbsp;·&nbsp; <b>How</b> = como</p>
              <table><tr><td><b>What's</b> your name?</td><td>Qual é o seu nome? <small>(What's = What is)</small></td></tr>
              <tr><td><b>How are</b> you?</td><td>Como você está?</td></tr></table>
              <p>💡 Na pergunta, o verbo vem <b>antes</b> de "you": You are → <b>Are you</b> OK?</p>`,
            examples: [
              { en: 'What\'s your name?', pt: 'Qual é o seu nome?' },
              { en: 'How are you?', pt: 'Como você está?' },
              { en: 'Are you OK?', pt: 'Você está bem?' },
            ],
          },
        ],
        quiz: [
          { gap: 'I ___ Tom.', pt: 'Eu sou o Tom.', opts: ['am', 'are', 'is'], a: 'am', why: 'Com "I" usamos sempre "am": I am = I\'m.' },
          { gap: 'You ___ my friend.', pt: 'Você é meu amigo.', opts: ['are', 'am', 'is'], a: 'are', why: 'Com "you" usamos "are": you are = you\'re.' },
          { gap: '___ your name?', pt: 'Qual é o seu nome?', opts: ['What\'s', 'How', 'Who'], a: 'What\'s', why: 'Para perguntar o nome: What\'s your name?' },
          { gap: 'How ___ you?', pt: 'Como você está?', opts: ['are', 'am', 'is'], a: 'are', why: 'How ARE you? (você = you are).' },
          { gap: 'I\'m fine, thanks. And ___?', pt: 'Estou bem, obrigado. E você?', opts: ['you', 'I', 'me'], a: 'you', why: '"E você?" = And you?' },
          { order: 'Nice to meet you.', pt: 'Prazer em te conhecer.' },
          { order: 'My name is Ana.', pt: 'Meu nome é Ana.' },
        ],
      },
      {
        id: 'listen', type: 'listen', title: { en: 'Listening: two friends', pt: 'Escuta: dois amigos' },
        scene: { en: 'Pom and Nugget meet in the park.', pt: 'Pom e Nugget se encontram no parque.' },
        lines: [
          { who: 'Pom', en: 'Hi! I\'m Pom. What\'s your name?', pt: 'Oi! Eu sou a Pom. Qual é o seu nome?' },
          { who: 'Nugget', en: 'Hello, Pom! My name is Nugget.', pt: 'Olá, Pom! Meu nome é Nugget.' },
          { who: 'Pom', en: 'Nice to meet you, Nugget.', pt: 'Prazer em te conhecer, Nugget.' },
          { who: 'Nugget', en: 'Nice to meet you too. How are you?', pt: 'O prazer é meu. Como você está?' },
          { who: 'Pom', en: 'I\'m great, thanks! And you?', pt: 'Estou ótima, obrigada! E você?' },
          { who: 'Nugget', en: 'I\'m a little tired.', pt: 'Estou um pouco cansado.' },
          { who: 'Pom', en: 'Oh! See you later, Nugget.', pt: 'Ah! Até mais, Nugget.' },
          { who: 'Nugget', en: 'Bye, Pom!', pt: 'Tchau, Pom!' },
        ],
        questions: [
          { q: { en: 'What is the cat\'s name?', pt: 'Qual é o nome da gatinha?' }, opts: ['Pom', 'Nugget', 'Bolt'], a: 'Pom' },
          { q: { en: 'How is Pom?', pt: 'Como a Pom está?' }, opts: ['great', 'tired', 'sad'], a: 'great' },
          { q: { en: 'How is Nugget?', pt: 'Como o Nugget está?' }, opts: ['a little tired', 'great', 'fine'], a: 'a little tired' },
          { q: { en: 'What does Pom say at the end?', pt: 'O que a Pom diz no final?' }, opts: ['See you later!', 'Good morning!', 'Thank you!'], a: 'See you later!' },
        ],
      },
      {
        id: 'talk', type: 'talk', partner: 'greet', title: { en: 'Conversation', pt: 'Conversa com a professora' },
        scene: { en: 'Talk to Teacher Bunny.', pt: 'Converse com a Professora Coelha. Escolha a melhor resposta.' },
        turns: [
          { en: 'Hello! Good morning!', pt: 'Olá! Bom dia!', opts: [
            { en: 'Good morning!', ok: true },
            { en: 'Good night!', why: '"Good night" é para ir embora à noite ou ir dormir.' },
            { en: 'Thank you!', why: '"Thank you" é obrigado. Não é um cumprimento.' }] },
          { en: 'I\'m Teacher Bunny. What\'s your name?', pt: 'Eu sou a Professora Coelha. Qual é o seu nome?', opts: [
            { en: 'My name is {name}.', ok: true },
            { en: 'I\'m fine, thanks.', why: 'Ela perguntou o seu NOME, não como você está.' },
            { en: 'Your name is Bunny.', why: 'Isso significa "o seu nome é Bunny". Fale o SEU nome: My name is...' }] },
          { en: 'Nice to meet you, {name}!', pt: 'Prazer em te conhecer!', opts: [
            { en: 'Nice to meet you too.', ok: true },
            { en: 'Goodbye!', why: 'Ainda não é hora de ir embora 🙂. Responda ao "prazer".' },
            { en: 'Yes, please.', why: '"Yes, please" = sim, por favor. Não combina aqui.' }] },
          { en: 'How are you?', pt: 'Como você está?', opts: [
            { en: 'I\'m fine, thanks. And you?', ok: true },
            { en: 'I\'m great! And you?', ok: true },
            { en: 'I\'m Bunny.', why: 'Você não é a Bunny! 😄 Diga como você está: I\'m fine.' }] },
          { en: 'I\'m great, thank you! See you later!', pt: 'Estou ótima, obrigada! Até mais!', opts: [
            { en: 'Bye! See you later!', ok: true },
            { en: 'Good morning!', why: 'Ela está se despedindo. Responda com bye / see you later.' },
            { en: 'Nice to meet you.', why: 'Isso se diz no começo, quando conhece a pessoa.' }] },
        ],
      },
      {
        id: 'meet', type: 'mission', at: ['Bolt', 'Pom', 'Nugget'],
        title: { en: 'Mission: meet your neighbors', pt: 'Missão: conheça os vizinhos' },
        desc: 'Converse com os 3 vizinhos que passeiam pela vila: Bolt 🐶, Pom 🐱 e Nugget 🐻.',
        talks: {
          Bolt: [
            { en: 'Hey! Hi there!', pt: 'Ei! Oi!', opts: [
              { en: 'Hi!', ok: true }, { en: 'Good night!', why: 'É um cumprimento. Responda "Hi!" ou "Hello!".' }, { en: 'Thank you!', why: 'Ele só disse oi. Responda "Hi!".' }] },
            { en: 'I\'m Bolt. What\'s your name?', pt: 'Eu sou o Bolt. Qual é o seu nome?', opts: [
              { en: 'I\'m {name}.', ok: true }, { en: 'I\'m Bolt.', why: 'Bolt é ele! Diga o seu nome.' }, { en: 'How are you?', why: 'Primeiro responda a pergunta: qual é o seu nome?' }] },
            { en: 'Nice to meet you, {name}!', pt: 'Prazer em te conhecer!', opts: [
              { en: 'Nice to meet you too!', ok: true }, { en: 'Yes, I am.', why: 'Responda ao "prazer": Nice to meet you too!' }, { en: 'See you, Bolt.', why: 'Ainda não acabou a conversa. Responda ao "prazer".' }] },
          ],
          Pom: [
            { en: 'Good afternoon!', pt: 'Boa tarde!', opts: [
              { en: 'Good afternoon!', ok: true }, { en: 'Good night!', why: '"Good night" é despedida. Responda "Good afternoon!".' }, { en: 'Please!', why: '"Please" é por favor.' }] },
            { en: 'How are you today?', pt: 'Como você está hoje?', opts: [
              { en: 'I\'m fine, thanks. And you?', ok: true }, { en: 'I\'m great, thanks!', ok: true }, { en: 'My name is Pom.', why: 'Pom é ela! E a pergunta é como você está.' }] },
            { en: 'I\'m great! See you later!', pt: 'Estou ótima! Até mais!', opts: [
              { en: 'Bye, Pom!', ok: true }, { en: 'Nice to meet you.', why: 'Ela está se despedindo: Bye! / See you!' }, { en: 'Good morning!', why: 'Ela está se despedindo: Bye! / See you!' }] },
          ],
          Nugget: [
            { en: 'Hello! Are you new here?', pt: 'Olá! Você é novo(a) aqui?', opts: [
              { en: 'Yes, I am.', ok: true }, { en: 'No, thanks.', why: '"No, thanks" é para recusar algo. Responda: Yes, I am.' }, { en: 'Yes, you are.', why: 'Ele perguntou sobre VOCÊ: Yes, I am.' }] },
            { en: 'Welcome to the village! My name is Nugget.', pt: 'Bem-vindo(a) à vila! Meu nome é Nugget.', opts: [
              { en: 'Nice to meet you, Nugget. I\'m {name}.', ok: true }, { en: 'Goodbye, Nugget!', why: 'Ele acabou de se apresentar. Diga "prazer" e o seu nome.' }, { en: 'My name is Nugget.', why: 'Esse é o nome dele! Diga o seu.' }] },
            { en: 'Have a nice day!', pt: 'Tenha um bom dia!', opts: [
              { en: 'Thank you! You too!', ok: true }, { en: 'Yes, please.', why: 'Agradeça: Thank you! You too!' }, { en: 'I\'m tired.', why: 'Agradeça: Thank you! You too!' }] },
          ],
        },
      },
    ],
  },
  // ======================================================================
  {
    id: 'u2', npc: 'numbers', icon: '🙋',
    title: { en: 'About me', pt: 'Sobre mim' },
    cando: 'Consigo dizer de onde sou, onde moro, minha idade, minha profissão e minha cor favorita.',
    intro: { en: 'Hello! I am Teacher Panda. Let\'s talk about you: numbers, age, country and job!', pt: 'Olá! Eu sou o Professor Panda. Vamos falar sobre você: números, idade, país e profissão!' },
    stages: [
      {
        id: 'n1', type: 'words', title: { en: 'Numbers 1 to 10', pt: 'Números de 1 a 10' }, items: NUMBERS,
        specials: [
          { q: { en: 'How many?', pt: 'Quantos são?' }, show: '⭐⭐⭐', answer: 'three' },
          { q: { en: 'How many?', pt: 'Quantos são?' }, show: '🐟🐟🐟🐟🐟', answer: 'five' },
          { q: { en: 'How many?', pt: 'Quantos são?' }, show: '🍪🍪🍪🍪🍪🍪🍪🍪', answer: 'eight' },
        ],
      },
      {
        id: 'n2', type: 'words', title: { en: 'Numbers 11 to 100', pt: 'Números de 11 a 100' }, items: BIG_NUMBERS,
        specials: [
          { q: { en: 'Which number is it?', pt: 'Que número é?' }, show: '<span class="digit">13</span>', answer: 'thirteen', wrong: ['thirty', 'three'] },
          { q: { en: 'Which number is it?', pt: 'Que número é?' }, show: '<span class="digit">30</span>', answer: 'thirty', wrong: ['thirteen', 'three'] },
          { q: { en: 'Which number is it?', pt: 'Que número é?' }, show: '<span class="digit">32</span>', answer: 'thirty-two', wrong: ['twenty-three', 'thirteen-two'] },
          { q: { en: 'Which number is it?', pt: 'Que número é? (cuidado: sem "u")' }, show: '<span class="digit">40</span>', answer: 'forty', wrong: ['fourty', 'fourteen'] },
        ],
      },
      {
        id: 'me', type: 'words', title: { en: 'Talking about me', pt: 'Falando de mim' },
        items: [
          { en: 'Where are you from?', pt: 'De onde você é?', pic: '🌍' },
          { en: 'I\'m from Brazil.', pt: 'Eu sou do Brasil.', pic: '🌎' },
          { en: 'I live in São Paulo.', pt: 'Eu moro em São Paulo.', pic: '🏙️' },
          { en: 'How old are you?', pt: 'Quantos anos você tem?', pic: '🎂' },
          { en: 'I\'m thirty years old.', pt: 'Eu tenho trinta anos.', pic: '🎉' },
          { en: 'What do you do?', pt: 'O que você faz? (profissão)', pic: '💼' },
          { en: 'I\'m a software developer.', pt: 'Eu sou desenvolvedor(a) de software.', pic: '💻' },
          { en: 'I work in IT.', pt: 'Eu trabalho com TI.', pic: '🖥️' },
          { en: 'I\'m a student.', pt: 'Eu sou estudante.', pic: '🎓' },
          { en: 'What\'s your favorite color?', pt: 'Qual é a sua cor favorita?', pic: '🎨' },
          { en: 'My favorite color is blue.', pt: 'Minha cor favorita é azul.', pic: '💙' },
        ],
        specials: [
          { q: { en: 'Someone says this. What do you answer?', pt: 'Alguém diz isto. O que você responde?' }, say: 'Where are you from?', answer: 'I\'m from Brazil.', wrong: ['I\'m thirty.', 'I\'m a student.'] },
          { q: { en: 'Someone says this. What do you answer?', pt: 'Alguém diz isto. O que você responde?' }, say: 'What do you do?', answer: 'I work in IT.', wrong: ['I\'m fine.', 'I live in Brazil.'] },
        ],
      },
      { id: 'colors', type: 'words', title: { en: 'Colors', pt: 'Cores' }, items: COLORS },
      {
        id: 'gram', type: 'grammar', title: { en: '"To be" with everyone + a / an', pt: '"To be" com todos + a / an' },
        cards: [
          {
            title: 'TO BE completo',
            html: `<table><tr><th>Completo</th><th>Curto</th><th></th></tr>
              <tr><td>I am</td><td>I'm</td><td>eu sou/estou</td></tr>
              <tr><td>You are</td><td>You're</td><td>você é/está</td></tr>
              <tr><td>He is</td><td>He's</td><td>ele é/está</td></tr>
              <tr><td>She is</td><td>She's</td><td>ela é/está</td></tr>
              <tr><td>It is</td><td>It's</td><td>isto/ele/ela é (coisas)</td></tr>
              <tr><td>We are</td><td>We're</td><td>nós somos/estamos</td></tr>
              <tr><td>They are</td><td>They're</td><td>eles/elas são/estão</td></tr></table>`,
            examples: [
              { en: 'He\'s from Canada.', pt: 'Ele é do Canadá.' },
              { en: 'She\'s a teacher.', pt: 'Ela é professora.' },
              { en: 'It\'s blue.', pt: 'É azul.' },
            ],
          },
          {
            title: '⚠️ Idade: em inglês você É a idade',
            html: `<p>Em português: "eu <b>tenho</b> 30 anos". Em inglês usamos <b>to be</b>:</p>
              <p>✅ <b>I'm thirty.</b> / <b>I'm thirty years old.</b><br>❌ <s>I have thirty years.</s></p>
              <p>💡 Esse é um dos erros mais comuns de brasileiros!</p>`,
            examples: [
              { en: 'I\'m thirty years old.', pt: 'Eu tenho trinta anos.' },
              { en: 'How old are you?', pt: 'Quantos anos você tem?' },
            ],
          },
          {
            title: 'Profissões: A ou AN',
            html: `<p>Antes de profissão, o inglês usa <b>a / an</b> (um / uma):</p>
              <p><b>a</b> + som de consoante: a <b>d</b>eveloper, a <b>s</b>tudent, a <b>t</b>eacher<br>
              <b>an</b> + som de vogal: an <b>e</b>ngineer, an <b>a</b>rchitect, an <b>a</b>nalyst</p>
              <p>❌ <s>I'm developer.</s> &nbsp; ✅ <b>I'm a developer.</b></p>`,
            examples: [
              { en: 'I\'m a software developer.', pt: 'Eu sou desenvolvedor(a) de software.' },
              { en: 'She\'s an engineer.', pt: 'Ela é engenheira.' },
            ],
          },
        ],
        quiz: [
          { gap: 'She ___ a teacher.', pt: 'Ela é professora.', opts: ['is', 'are', 'am'], a: 'is', why: 'He / she / it → is.' },
          { gap: 'I ___ thirty years old.', pt: 'Eu tenho trinta anos.', opts: ['am', 'have', 'is'], a: 'am', why: 'Idade usa to be: I AM thirty. "I have 30" está errado.' },
          { gap: 'He\'s ___ engineer.', pt: 'Ele é engenheiro.', opts: ['an', 'a', 'the'], a: 'an', why: 'Engineer começa com som de vogal → an.' },
          { gap: 'I\'m ___ developer.', pt: 'Eu sou desenvolvedor.', opts: ['a', 'an', '—'], a: 'a', why: 'Developer começa com som de consoante → a. E não pode ficar sem!' },
          { gap: 'Where ___ you from?', pt: 'De onde você é?', opts: ['are', 'is', 'do'], a: 'are', why: 'You → are: Where ARE you from?' },
          { gap: 'They ___ from Brazil.', pt: 'Eles são do Brasil.', opts: ['are', 'is', 'am'], a: 'are', why: 'They → are.' },
          { order: 'Where are you from?', pt: 'De onde você é?' },
          { order: 'I work in IT.', pt: 'Eu trabalho com TI.' },
        ],
      },
      {
        id: 'listen', type: 'listen', title: { en: 'Listening: new coworker', pt: 'Escuta: colega novo' },
        scene: { en: 'Bolt and Nugget talk at the coworking space.', pt: 'Bolt e Nugget conversam no coworking.' },
        lines: [
          { who: 'Bolt', en: 'Hi! I\'m Bolt. I\'m new here.', pt: 'Oi! Eu sou o Bolt. Sou novo aqui.' },
          { who: 'Nugget', en: 'Welcome, Bolt! I\'m Nugget. Where are you from?', pt: 'Bem-vindo, Bolt! Eu sou o Nugget. De onde você é?' },
          { who: 'Bolt', en: 'I\'m from Canada. And you?', pt: 'Eu sou do Canadá. E você?' },
          { who: 'Nugget', en: 'I\'m from Brazil. I live in Rio.', pt: 'Eu sou do Brasil. Moro no Rio.' },
          { who: 'Bolt', en: 'Cool! What do you do?', pt: 'Legal! O que você faz?' },
          { who: 'Nugget', en: 'I\'m a designer. And you?', pt: 'Eu sou designer. E você?' },
          { who: 'Bolt', en: 'I\'m a software developer. I work in IT.', pt: 'Eu sou desenvolvedor de software. Trabalho com TI.' },
          { who: 'Nugget', en: 'Nice! How old are you?', pt: 'Legal! Quantos anos você tem?' },
          { who: 'Bolt', en: 'I\'m twenty-eight.', pt: 'Tenho vinte e oito.' },
        ],
        questions: [
          { q: { en: 'Where is Bolt from?', pt: 'De onde o Bolt é?' }, opts: ['Canada', 'Brazil', 'Rio'], a: 'Canada' },
          { q: { en: 'Where does Nugget live?', pt: 'Onde o Nugget mora?' }, opts: ['in Rio', 'in Canada', 'in São Paulo'], a: 'in Rio' },
          { q: { en: 'What does Nugget do?', pt: 'O que o Nugget faz?' }, opts: ['He\'s a designer.', 'He\'s a developer.', 'He\'s a teacher.'], a: 'He\'s a designer.' },
          { q: { en: 'How old is Bolt?', pt: 'Quantos anos o Bolt tem?' }, opts: ['twenty-eight', 'eighteen', 'thirty-eight'], a: 'twenty-eight' },
        ],
      },
      {
        id: 'talk', type: 'talk', partner: 'numbers', title: { en: 'Conversation', pt: 'Conversa com o professor' },
        scene: { en: 'Talk to Teacher Panda about you.', pt: 'Converse com o Professor Panda sobre você.' },
        turns: [
          { en: 'Let\'s talk about you! Where are you from?', pt: 'Vamos falar sobre você! De onde você é?', opts: [
            { en: 'I\'m from Brazil.', ok: true },
            { en: 'I\'m Brazil.', why: 'Falta o FROM: I\'m FROM Brazil. ("I\'m Brazil" = eu sou o Brasil 😄)' },
            { en: 'I have from Brazil.', why: 'Use to be: I\'m from Brazil.' }] },
          { en: 'Cool! And where do you live?', pt: 'Legal! E onde você mora?', opts: [
            { en: 'I live in São Paulo.', ok: true },
            { en: 'I live in Rio.', ok: true },
            { en: 'I live São Paulo.', why: 'Com cidade usamos IN: I live IN São Paulo.' }] },
          { en: 'How old are you?', pt: 'Quantos anos você tem?', opts: [
            { en: 'I\'m thirty years old.', ok: true },
            { en: 'I\'m twenty-five.', ok: true },
            { en: 'I have thirty years.', why: 'Erro clássico! Idade usa to be: I\'m thirty.' }] },
          { en: 'What do you do?', pt: 'O que você faz?', opts: [
            { en: 'I\'m a software developer.', ok: true },
            { en: 'I work in IT.', ok: true },
            { en: 'I\'m software developer.', why: 'Falta o "a": I\'m A software developer.' }] },
          { en: 'Oh, nice! What\'s your favorite color?', pt: 'Que legal! Qual é a sua cor favorita?', opts: [
            { en: 'My favorite color is blue.', ok: true },
            { en: 'My favorite color is green.', ok: true },
            { en: 'I\'m blue.', why: '"I\'m blue" significa "estou triste"! 😄 Diga: My favorite color is...' }] },
          { en: 'Great talking to you! See you!', pt: 'Foi ótimo conversar com você! Até mais!', opts: [
            { en: 'Thank you! See you!', ok: true },
            { en: 'Good morning!', why: 'Ele está se despedindo.' },
            { en: 'Nice to meet you.', why: 'Isso é para o começo da conversa.' }] },
        ],
      },
      {
        id: 'idcard', type: 'mission', at: 'mayor',
        title: { en: 'Mission: your Village ID', pt: 'Missão: sua identidade da vila' },
        desc: 'Vá até o Prefeito Max 🐻 perto da fonte e responda as perguntas para fazer sua identidade da vila.',
        talk: [
          { en: 'Good morning! Welcome to the village. I need some information for your ID card.', pt: 'Bom dia! Bem-vindo(a) à vila. Preciso de algumas informações para sua identidade.', opts: [
            { en: 'OK, no problem.', ok: true }, { en: 'No, I\'m fine.', why: '"I\'m fine" é "estou bem". Diga: OK, no problem.' }, { en: 'Good night!', why: 'Ele disse bom dia. Diga: OK, no problem.' }] },
          { en: 'What\'s your name?', pt: 'Qual é o seu nome?', opts: [
            { en: 'My name is {name}.', ok: true }, { en: 'Your name is Max.', why: 'Diga o SEU nome: My name is...' }, { en: 'I\'m from {name}.', why: '"From" é para lugar. Diga: My name is...' }] },
          { en: 'Where are you from?', pt: 'De onde você é?', opts: [
            { en: 'I\'m from Brazil.', ok: true, save: ['from', 'Brazil'] },
            { en: 'I\'m from Portugal.', ok: true, save: ['from', 'Portugal'] },
            { en: 'I\'m from Angola.', ok: true, save: ['from', 'Angola'] },
            { en: 'I from Brazil.', why: 'Falta o verbo: I\'M from Brazil.' }] },
          { en: 'How old are you?', pt: 'Quantos anos você tem?', opts: [
            { en: 'I\'m fifteen.', ok: true, save: ['age', '15'] },
            { en: 'I\'m twenty-five.', ok: true, save: ['age', '25'] },
            { en: 'I\'m forty.', ok: true, save: ['age', '40'] },
            { en: 'I have twenty years.', why: 'Idade usa to be: I\'m twenty.' }] },
          { en: 'And what do you do?', pt: 'E o que você faz?', opts: [
            { en: 'I\'m a software developer.', ok: true, save: ['job', 'Software developer 💻'] },
            { en: 'I\'m a student.', ok: true, save: ['job', 'Student 🎓'] },
            { en: 'I\'m an engineer.', ok: true, save: ['job', 'Engineer 🛠️'] },
            { en: 'I am developer.', why: 'Falta o "a": I\'m A developer.' }] },
          { en: 'Perfect! Here is your ID card. Welcome!', pt: 'Perfeito! Aqui está sua identidade. Bem-vindo(a)!', opts: [
            { en: 'Thank you very much!', ok: true }, { en: 'Yes, I am.', why: 'Agradeça: Thank you very much!' }, { en: 'How old are you?', why: 'Agradeça: Thank you very much!' }] },
        ],
      },
    ],
  },
  // ======================================================================
  {
    id: 'u3', npc: 'fruits', icon: '☕',
    title: { en: 'At the café', pt: 'No café (viagem)' },
    cando: 'Consigo pedir comida e bebida, perguntar o preço e pagar.',
    intro: { en: 'Hello! I am Teacher Fox. Let\'s learn to order food and drinks, like on a trip!', pt: 'Olá! Eu sou a Professora Raposa. Vamos aprender a pedir comida e bebida, como numa viagem!' },
    stages: [
      {
        id: 'food', type: 'words', title: { en: 'Food and drinks', pt: 'Comidas e bebidas' },
        items: [
          { en: 'coffee', pt: 'café', pic: '☕' }, { en: 'tea', pt: 'chá', pic: '🍵' }, { en: 'water', pt: 'água', pic: '💧' },
          { en: 'juice', pt: 'suco', pic: '🧃' }, { en: 'milk', pt: 'leite', pic: '🥛' }, { en: 'bread', pt: 'pão', pic: '🍞' },
          { en: 'sandwich', pt: 'sanduíche', pic: '🥪' }, { en: 'cake', pt: 'bolo', pic: '🍰' }, { en: 'cookie', pt: 'biscoito / cookie', pic: '🍪' },
          { en: 'cheese', pt: 'queijo', pic: '🧀' }, { en: 'egg', pt: 'ovo', pic: '🥚' }, { en: 'soup', pt: 'sopa', pic: '🍲' },
        ],
      },
      {
        id: 'fruits', type: 'words', title: { en: 'Fruits', pt: 'Frutas' }, items: FRUITS,
        specials: [
          { q: { en: 'What do you see?', pt: 'O que você vê?' }, show: '🍎🍎🍎', answer: 'three red apples', wrong: ['two red apples', 'three green apples'] },
          { q: { en: 'What do you see?', pt: 'O que você vê?' }, show: '🍏🍏', answer: 'two green apples', wrong: ['two red apples', 'four green apples'] },
          { q: { en: 'What do you see?', pt: 'O que você vê?' }, show: '🍓🍓🍓🍓🍓', answer: 'five strawberries', wrong: ['five grapes', 'three strawberries'] },
        ],
      },
      {
        id: 'order', type: 'words', title: { en: 'Ordering', pt: 'Fazendo o pedido' },
        items: [
          { en: 'Can I have a coffee, please?', pt: 'Pode me ver um café, por favor?', pic: '☕' },
          { en: 'I\'d like a sandwich, please.', pt: 'Eu gostaria de um sanduíche, por favor.', pic: '🥪' },
          { en: 'Anything else?', pt: 'Mais alguma coisa?', pic: '➕' },
          { en: 'That\'s all, thanks.', pt: 'É só isso, obrigado(a).', pic: '✋' },
          { en: 'For here or to go?', pt: 'Para comer aqui ou para levar?', pic: '🏠' },
          { en: 'To go, please.', pt: 'Para levar, por favor.', pic: '🛍️' },
          { en: 'How much is it?', pt: 'Quanto custa?', pic: '💰' },
          { en: 'It\'s five dollars.', pt: 'São cinco dólares.', pic: '💵' },
          { en: 'Can I pay by card?', pt: 'Posso pagar com cartão?', pic: '💳' },
          { en: 'Here you are.', pt: 'Aqui está.', pic: '🤲' },
        ],
        specials: [
          { q: { en: 'The waiter says this. What do you answer?', pt: 'O atendente diz isto. O que você responde?' }, say: 'Anything else?', answer: 'That\'s all, thanks.', wrong: ['Here you are.', 'How old are you?'] },
          { q: { en: 'The waiter says this. What do you answer?', pt: 'O atendente diz isto. O que você responde?' }, say: 'For here or to go?', answer: 'To go, please.', wrong: ['Yes, please.', 'It\'s five dollars.'] },
        ],
      },
      {
        id: 'gram', type: 'grammar', title: { en: 'a / an, plurals and polite requests', pt: 'a / an, plural e pedidos educados' },
        cards: [
          {
            title: 'A ou AN (um / uma)',
            html: `<p><b>a</b> + som de consoante: a coffee, a sandwich, a cookie<br>
              <b>an</b> + som de vogal: an apple, an orange, an egg</p>`,
            examples: [{ en: 'a coffee and an apple', pt: 'um café e uma maçã' }, { en: 'an orange juice', pt: 'um suco de laranja' }],
          },
          {
            title: 'Plural',
            html: `<table><tr><td>+ s</td><td>coffee → coffee<b>s</b>, apple → apple<b>s</b></td></tr>
              <tr><td>+ es</td><td>sandwich → sandwich<b>es</b></td></tr>
              <tr><td>y → ies</td><td>strawberry → strawberr<b>ies</b></td></tr></table>
              <p>💡 Número + plural: <b>two coffees</b>, <b>three cookies</b>.</p>`,
            examples: [{ en: 'two coffees, please', pt: 'dois cafés, por favor' }, { en: 'three cookies', pt: 'três cookies' }],
          },
          {
            title: 'Pedir com educação',
            html: `<p><b>Can I have...?</b> = Pode me ver...? / Eu quero... <br>
              <b>I'd like...</b> (= I would like) = Eu gostaria de...</p>
              <p>💡 "I want a coffee" soa direto demais (até rude) em inglês. Prefira <b>Can I have</b> ou <b>I'd like</b> + <b>please</b>.</p>`,
            examples: [{ en: 'Can I have a coffee, please?', pt: 'Pode me ver um café, por favor?' }, { en: 'I\'d like a sandwich, please.', pt: 'Eu gostaria de um sanduíche, por favor.' }],
          },
        ],
        quiz: [
          { gap: 'Can I have ___ orange juice?', pt: 'Pode me ver um suco de laranja?', opts: ['an', 'a'], a: 'an', why: 'Orange começa com som de vogal → an.' },
          { gap: 'I\'d like ___ sandwich, please.', pt: 'Eu gostaria de um sanduíche.', opts: ['a', 'an'], a: 'a', why: 'Sandwich começa com som de consoante → a.' },
          { gap: 'Two ___, please.', pt: 'Dois cafés, por favor.', opts: ['coffees', 'coffee'], a: 'coffees', why: 'Dois ou mais → plural: coffees.' },
          { gap: 'Three ___.', pt: 'Três morangos.', opts: ['strawberries', 'strawberrys'], a: 'strawberries', why: 'Terminado em consoante + y → ies.' },
          { gap: 'I would ___ a tea, please.', pt: 'Eu gostaria de um chá.', opts: ['like', 'want', 'have'], a: 'like', why: 'I would like (= I\'d like) = eu gostaria.' },
          { gap: 'How much ___ it?', pt: 'Quanto custa?', opts: ['is', 'are', 'am'], a: 'is', why: 'It → is: How much IS it?' },
          { order: 'Can I have a coffee, please?', pt: 'Pode me ver um café, por favor?' },
        ],
      },
      {
        id: 'listen', type: 'listen', title: { en: 'Listening: at the café', pt: 'Escuta: no café' },
        scene: { en: 'Bolt orders at Mrs. Bear\'s café.', pt: 'Bolt faz um pedido no café da Dona Ursa.' },
        lines: [
          { who: 'bakery', en: 'Good morning! What can I get you?', pt: 'Bom dia! O que vai querer?' },
          { who: 'Bolt', en: 'Hi! Can I have a coffee, please?', pt: 'Oi! Pode me ver um café, por favor?' },
          { who: 'bakery', en: 'Sure. Anything else?', pt: 'Claro. Mais alguma coisa?' },
          { who: 'Bolt', en: 'Yes, I\'d like a piece of cake.', pt: 'Sim, eu gostaria de um pedaço de bolo.' },
          { who: 'bakery', en: 'For here or to go?', pt: 'Para comer aqui ou para levar?' },
          { who: 'Bolt', en: 'To go, please. How much is it?', pt: 'Para levar, por favor. Quanto custa?' },
          { who: 'bakery', en: 'It\'s seven dollars.', pt: 'São sete dólares.' },
          { who: 'Bolt', en: 'Can I pay by card?', pt: 'Posso pagar com cartão?' },
          { who: 'bakery', en: 'Of course! Here you are.', pt: 'Claro! Aqui está.' },
          { who: 'Bolt', en: 'Thank you!', pt: 'Obrigado!' },
        ],
        questions: [
          { q: { en: 'What does Bolt drink?', pt: 'O que o Bolt bebe?' }, opts: ['coffee', 'tea', 'juice'], a: 'coffee' },
          { q: { en: 'What does Bolt eat?', pt: 'O que o Bolt come?' }, opts: ['cake', 'a sandwich', 'an apple'], a: 'cake' },
          { q: { en: 'For here or to go?', pt: 'Para comer aqui ou para levar?' }, opts: ['to go', 'for here'], a: 'to go' },
          { q: { en: 'How much is it?', pt: 'Quanto custa?' }, opts: ['seven dollars', 'eleven dollars', 'seventy dollars'], a: 'seven dollars' },
          { q: { en: 'How does Bolt pay?', pt: 'Como o Bolt paga?' }, opts: ['by card', 'in cash'], a: 'by card' },
        ],
      },
      {
        id: 'talk', type: 'talk', partner: 'fruits', title: { en: 'Conversation', pt: 'Conversa: no café' },
        scene: { en: 'Teacher Fox is the waiter. Order something!', pt: 'A Professora Raposa é a atendente. Faça o seu pedido!' },
        turns: [
          { en: 'Hi! Welcome to the café. What can I get you?', pt: 'Oi! Bem-vindo(a) ao café. O que vai querer?', opts: [
            { en: 'Can I have a tea, please?', ok: true },
            { en: 'I\'d like an orange juice, please.', ok: true },
            { en: 'Give me tea.', why: 'Funciona, mas soa rude. Use: Can I have...? / I\'d like..., please.' }] },
          { en: 'Sure! Anything else?', pt: 'Claro! Mais alguma coisa?', opts: [
            { en: 'Yes, a cookie, please.', ok: true },
            { en: 'No, that\'s all, thanks.', ok: true },
            { en: 'Yes, an cookie.', why: 'Cookie começa com som de consoante: A cookie.' }] },
          { en: 'For here or to go?', pt: 'Para comer aqui ou para levar?', opts: [
            { en: 'For here, please.', ok: true },
            { en: 'To go, please.', ok: true },
            { en: 'Yes, please.', why: 'A pergunta é "isso OU aquilo". Escolha: For here / To go.' }] },
          { en: 'Here you are.', pt: 'Aqui está.', opts: [
            { en: 'Thank you! How much is it?', ok: true },
            { en: 'Thank you! How many is it?', why: 'Para preço é How MUCH. (How many = quantos, para contar coisas)' },
            { en: 'Here you are.', why: 'Quem entrega diz "Here you are". Você agradece e pergunta o preço.' }] },
          { en: 'It\'s six dollars.', pt: 'São seis dólares.', opts: [
            { en: 'Can I pay by card?', ok: true },
            { en: 'OK, here you are.', ok: true },
            { en: 'I\'m six dollars.', why: 'Você não é seis dólares! 😄 Pague: Here you are. / Can I pay by card?' }] },
          { en: 'Of course! Have a nice day!', pt: 'Claro! Tenha um bom dia!', opts: [
            { en: 'Thanks, you too!', ok: true },
            { en: 'Good night!', why: 'Responda: Thanks, you too!' },
            { en: 'Anything else?', why: 'Isso quem pergunta é o atendente.' }] },
        ],
      },
      {
        id: 'cafe', type: 'mission', at: 'bakery',
        title: { en: 'Mission: breakfast at the café', pt: 'Missão: café da manhã no café' },
        desc: 'Vá até a padaria/café da Dona Ursa 🐻 e faça o seu pedido em inglês.',
        talk: [
          { en: 'Good morning! What can I get you?', pt: 'Bom dia! O que vai querer?', opts: [
            { en: 'Can I have a coffee, please?', ok: true },
            { en: 'I\'d like a tea, please.', ok: true },
            { en: 'A coffee.', why: 'Funciona, mas seja educado(a): Can I have a coffee, please?' }] },
          { en: 'Sure. Anything else?', pt: 'Claro. Mais alguma coisa?', opts: [
            { en: 'Yes, a sandwich, please.', ok: true },
            { en: 'Yes, two cookies, please.', ok: true },
            { en: 'Yes, two cookie.', why: 'Dois → plural: two cookieS.' }] },
          { en: 'For here or to go?', pt: 'Para comer aqui ou para levar?', opts: [
            { en: 'For here, please.', ok: true },
            { en: 'To go, please.', ok: true },
            { en: 'No, thanks.', why: 'Escolha uma opção: For here / To go.' }] },
          { en: 'That\'s eight dollars, please.', pt: 'São oito dólares, por favor.', opts: [
            { en: 'Can I pay by card?', ok: true },
            { en: 'Here you are.', ok: true },
            { en: 'How old are you?', why: '😄 Isso pergunta a idade. Pague: Here you are.' }] },
          { en: 'Thank you! Enjoy!', pt: 'Obrigada! Aproveite!', opts: [
            { en: 'Thanks! Have a nice day!', ok: true },
            { en: 'Yes, please.', why: 'Ela está se despedindo. Agradeça: Thanks! Have a nice day!' },
            { en: 'Good evening!', why: 'É de manhã, e ela está se despedindo. Agradeça.' }] },
        ],
      },
    ],
  },
  // ======================================================================
  {
    id: 'u4', npc: 'colors', icon: '💼',
    title: { en: 'At work', pt: 'No trabalho (reunião de TI)' },
    cando: 'Consigo participar de uma reunião simples de TI (daily): dizer o que fiz, o que estou fazendo e pedir para repetir.',
    intro: { en: 'Hello! I am Teacher Cat, the team lead. Let\'s practice English for your work meetings!', pt: 'Olá! Eu sou o Professor Gato, líder do time. Vamos praticar inglês para as suas reuniões de trabalho!' },
    stages: [
      {
        id: 'words', type: 'words', title: { en: 'IT words', pt: 'Palavras de TI' },
        items: [
          { en: 'meeting', pt: 'reunião', pic: '📅' }, { en: 'team', pt: 'equipe / time', pic: '👥' },
          { en: 'manager', pt: 'gerente', pic: '👔' }, { en: 'bug', pt: 'bug / erro', pic: '🐛' },
          { en: 'screen', pt: 'tela', pic: '🖥️' }, { en: 'email', pt: 'e-mail', pic: '📧' },
          { en: 'task', pt: 'tarefa', pic: '✅' }, { en: 'deadline', pt: 'prazo', pic: '⏰' },
          { en: 'project', pt: 'projeto', pic: '📁' }, { en: 'code', pt: 'código', pic: '⌨️' },
          { en: 'server', pt: 'servidor', pic: '🗄️' }, { en: 'question', pt: 'pergunta', pic: '❓' },
        ],
      },
      {
        id: 'phrases', type: 'words', title: { en: 'Meeting phrases', pt: 'Frases de reunião' },
        items: [
          { en: 'Can you hear me?', pt: 'Você consegue me ouvir?', pic: '🎧' },
          { en: 'Yes, I can hear you.', pt: 'Sim, consigo te ouvir.', pic: '👂' },
          { en: 'Sorry, I\'m late.', pt: 'Desculpe, estou atrasado(a).', pic: '😅' },
          { en: 'Let\'s start.', pt: 'Vamos começar.', pic: '▶️' },
          { en: 'Can you share your screen?', pt: 'Você pode compartilhar sua tela?', pic: '🖥️' },
          { en: 'Could you repeat that, please?', pt: 'Você poderia repetir, por favor?', pic: '🔁' },
          { en: 'Can you speak more slowly?', pt: 'Você pode falar mais devagar?', pic: '🐢' },
          { en: 'I have a question.', pt: 'Eu tenho uma pergunta.', pic: '✋' },
          { en: 'I\'m working on the login page.', pt: 'Estou trabalhando na página de login.', pic: '⌨️' },
          { en: 'It\'s done.', pt: 'Está pronto.', pic: '✅' },
          { en: 'It\'s not ready yet.', pt: 'Ainda não está pronto.', pic: '⏳' },
          { en: 'No blockers.', pt: 'Sem impedimentos.', pic: '🟢' },
          { en: 'See you tomorrow.', pt: 'Até amanhã.', pic: '👋' },
        ],
        specials: [
          { q: { en: 'You did not understand. You say:', pt: 'Você não entendeu. Você diz:' }, say: 'Let\'s sync on the deployment pipeline after the sprint review.', answer: 'Could you repeat that, please?', wrong: ['It\'s done.', 'No blockers.'] },
          { q: { en: 'Your manager asks this. What do you answer?', pt: 'Seu gerente pergunta isto. O que você responde?' }, say: 'Can you hear me?', answer: 'Yes, I can hear you.', wrong: ['Yes, I can see you.', 'I have a question.'] },
        ],
      },
      {
        id: 'gram', type: 'grammar', title: { en: 'I\'m working on... / Could you...?', pt: 'Estou fazendo... / Você poderia...?' },
        cards: [
          {
            title: 'Agora: to be + verbo-ING',
            html: `<p>Para dizer o que você <b>está fazendo</b> (agora / hoje):</p>
              <p><b>I'm</b> work<b>ing</b> on the API. &nbsp;·&nbsp; <b>I'm</b> fix<b>ing</b> a bug. &nbsp;·&nbsp; <b>I'm</b> test<b>ing</b> the app.</p>
              <p>❌ <s>I working</s> &nbsp; ✅ <b>I'm working</b> (não esqueça o <b>am</b>!)</p>`,
            examples: [{ en: 'I\'m working on the API.', pt: 'Estou trabalhando na API.' }, { en: 'I\'m fixing a bug.', pt: 'Estou corrigindo um bug.' }],
          },
          {
            title: 'Pedidos: Can you / Could you',
            html: `<p><b>Can you...?</b> = Você pode...? (normal)<br><b>Could you...?</b> = Você poderia...? (mais educado)</p>
              <p>Depois vem o verbo simples: Could you <b>repeat</b> that? Can you <b>share</b> your screen?</p>
              <p>💡 Pedir para repetir é <b>profissional</b>. Melhor do que fingir que entendeu!</p>`,
            examples: [{ en: 'Could you repeat that, please?', pt: 'Você poderia repetir, por favor?' }, { en: 'Can you share your screen?', pt: 'Você pode compartilhar sua tela?' }],
          },
          {
            title: 'A daily (stand-up meeting)',
            html: `<p>3 perguntas típicas:</p>
              <table><tr><td>What did you do yesterday?</td><td>Yesterday I <b>fixed</b> a bug.</td></tr>
              <tr><td>What are you doing today?</td><td>Today I'm <b>working on</b> the login page.</td></tr>
              <tr><td>Any blockers?</td><td>No blockers. / I have a question.</td></tr></table>
              <p>💡 Passado regular: verbo + <b>ed</b>: fix<b>ed</b>, test<b>ed</b>, finish<b>ed</b>, work<b>ed</b>.</p>`,
            examples: [{ en: 'Yesterday I fixed a bug.', pt: 'Ontem eu corrigi um bug.' }, { en: 'Today I\'m working on the login page.', pt: 'Hoje estou trabalhando na página de login.' }],
          },
        ],
        quiz: [
          { gap: 'I\'m ___ on the login page.', pt: 'Estou trabalhando na página de login.', opts: ['working', 'work', 'works'], a: 'working', why: 'Agora: I\'m + verbo-ING.' },
          { gap: 'Could you ___ that, please?', pt: 'Você poderia repetir, por favor?', opts: ['repeat', 'repeating', 'repeats'], a: 'repeat', why: 'Depois de could/can: verbo simples.' },
          { gap: 'Yesterday I ___ a bug.', pt: 'Ontem eu corrigi um bug.', opts: ['fixed', 'fix', 'fixing'], a: 'fixed', why: 'Passado: fix + ed = fixed.' },
          { gap: '___ you share your screen?', pt: 'Você pode compartilhar sua tela?', opts: ['Can', 'Are', 'Do'], a: 'Can', why: 'Pedido: Can you...?' },
          { gap: 'It\'s not ready ___.', pt: 'Ainda não está pronto.', opts: ['yet', 'now', 'done'], a: 'yet', why: 'Not ... yet = ainda não.' },
          { gap: 'Today I\'m ___ the app.', pt: 'Hoje estou testando o app.', opts: ['testing', 'test', 'tested'], a: 'testing', why: 'I\'m + verbo-ING.' },
          { order: 'I have a question.', pt: 'Eu tenho uma pergunta.' },
          { order: 'Could you repeat that, please?', pt: 'Você poderia repetir, por favor?' },
        ],
      },
      {
        id: 'listen', type: 'listen', title: { en: 'Listening: the daily meeting', pt: 'Escuta: a daily' },
        scene: { en: 'The team has a daily meeting online.', pt: 'O time faz a reunião diária online.' },
        lines: [
          { who: 'colors', en: 'Good morning, team! Can you hear me?', pt: 'Bom dia, time! Vocês conseguem me ouvir?' },
          { who: 'Bolt', en: 'Yes, I can hear you.', pt: 'Sim, consigo te ouvir.' },
          { who: 'Pom', en: 'Sorry, I\'m late!', pt: 'Desculpe, estou atrasada!' },
          { who: 'colors', en: 'No problem. Let\'s start. Bolt, what did you do yesterday?', pt: 'Sem problema. Vamos começar. Bolt, o que você fez ontem?' },
          { who: 'Bolt', en: 'Yesterday I fixed a bug on the login page. Today I\'m working on the API. No blockers.', pt: 'Ontem corrigi um bug na página de login. Hoje estou trabalhando na API. Sem impedimentos.' },
          { who: 'colors', en: 'Great. Pom?', pt: 'Ótimo. Pom?' },
          { who: 'Pom', en: 'I\'m testing the new app. It\'s not ready yet. I have a question.', pt: 'Estou testando o app novo. Ainda não está pronto. Tenho uma pergunta.' },
          { who: 'colors', en: 'Sure, what is it?', pt: 'Claro, qual é?' },
          { who: 'Pom', en: 'Can you share your screen?', pt: 'Você pode compartilhar sua tela?' },
          { who: 'colors', en: 'Of course!', pt: 'Claro!' },
        ],
        questions: [
          { q: { en: 'Who is late?', pt: 'Quem está atrasado?' }, opts: ['Pom', 'Bolt', 'Teacher Cat'], a: 'Pom' },
          { q: { en: 'What did Bolt fix yesterday?', pt: 'O que o Bolt corrigiu ontem?' }, opts: ['a bug on the login page', 'the server', 'the new app'], a: 'a bug on the login page' },
          { q: { en: 'What is Bolt doing today?', pt: 'O que o Bolt está fazendo hoje?' }, opts: ['He\'s working on the API.', 'He\'s testing the app.', 'He\'s late.'], a: 'He\'s working on the API.' },
          { q: { en: 'Is the new app ready?', pt: 'O app novo está pronto?' }, opts: ['No, not yet.', 'Yes, it\'s done.'], a: 'No, not yet.' },
          { q: { en: 'What does Pom ask?', pt: 'O que a Pom pede?' }, opts: ['to share the screen', 'to repeat', 'to speak slowly'], a: 'to share the screen' },
        ],
      },
      {
        id: 'talk', type: 'talk', partner: 'colors', title: { en: 'Conversation', pt: 'Conversa: reunião 1:1' },
        scene: { en: 'A quick meeting with Teacher Cat, your team lead.', pt: 'Uma reunião rápida com o Professor Gato, seu líder.' },
        turns: [
          { en: 'Good morning! Can you hear me?', pt: 'Bom dia! Consegue me ouvir?', opts: [
            { en: 'Yes, I can hear you.', ok: true },
            { en: 'Yes, I can see you.', why: 'Ele perguntou se você OUVE (hear), não se VÊ (see).' },
            { en: 'Yes, you are.', why: 'Responda com can: Yes, I can hear you.' }] },
          { en: 'Great. What did you do yesterday?', pt: 'Ótimo. O que você fez ontem?', opts: [
            { en: 'Yesterday I fixed a bug.', ok: true },
            { en: 'Yesterday I finished the report.', ok: true },
            { en: 'Yesterday I fix a bug.', why: 'Passado: fixED. Yesterday I fixed a bug.' }] },
          { en: 'Nice. And what are you doing today?', pt: 'Legal. E o que você está fazendo hoje?', opts: [
            { en: 'Today I\'m working on the login page.', ok: true },
            { en: 'Today I\'m testing the app.', ok: true },
            { en: 'Today I working on the login page.', why: 'Falta o AM: Today I\'M working...' }] },
          { en: 'OK. Any blockers?', pt: 'OK. Algum impedimento?', opts: [
            { en: 'No blockers.', ok: true },
            { en: 'I have a question.', ok: true, reply: { en: 'Sure! Let\'s talk after the meeting.', pt: 'Claro! Vamos conversar depois da reunião.' } },
            { en: 'Yes, I can hear you.', why: '"Blockers" = impedimentos. Responda: No blockers.' }] },
          { en: 'Cool, so let\'s sync on the deployment pipeline after the sprint review.', pt: '(Ele falou rápido, com palavras difíceis...)', opts: [
            { en: 'Sorry, could you repeat that, please?', ok: true, reply: { en: 'Sure! Let\'s talk about the project after the meeting.', pt: 'Claro! Vamos falar do projeto depois da reunião.' } },
            { en: 'Can you speak more slowly, please?', ok: true, reply: { en: 'Of course. Let\'s talk... after... the meeting.', pt: 'Claro. Vamos conversar... depois... da reunião.' } },
            { en: 'Yes.', why: 'Se não entendeu, peça para repetir! É profissional: Could you repeat that, please?' }] },
          { en: 'Thanks! See you tomorrow!', pt: 'Obrigado! Até amanhã!', opts: [
            { en: 'Thank you! See you tomorrow.', ok: true },
            { en: 'Good morning!', why: 'Ele está se despedindo: See you tomorrow.' },
            { en: 'Let\'s start.', why: 'A reunião está acabando, não começando.' }] },
        ],
      },
      {
        id: 'daily', type: 'mission', at: 'colors',
        title: { en: 'Mission: the daily meeting', pt: 'Missão: a daily do time' },
        desc: 'Participe da daily com o time no Escritório: Professor Gato, Bolt e Pom.',
        talk: [
          { who: 'colors', en: 'Hi, team! Let\'s start the daily. Good morning, everyone!', pt: 'Oi, time! Vamos começar a daily. Bom dia, pessoal!', opts: [
            { en: 'Good morning, everyone!', ok: true }, { en: 'Good night!', why: 'É de manhã: Good morning!' }, { en: 'See you tomorrow!', why: 'A reunião está começando!' }] },
          { who: 'Bolt', en: 'Hi! Can you share your screen, please?', pt: 'Oi! Você pode compartilhar sua tela, por favor?', opts: [
            { en: 'Sure, one moment.', ok: true }, { en: 'Yes, I can hear you.', why: 'Ele pediu para compartilhar a tela. Responda: Sure, one moment.' }, { en: 'No blockers.', why: 'Ele pediu para compartilhar a tela.' }] },
          { who: 'colors', en: '{name}, what did you do yesterday?', pt: 'O que você fez ontem?', opts: [
            { en: 'Yesterday I tested the app.', ok: true }, { en: 'Yesterday I finished the report.', ok: true }, { en: 'Yesterday I am test the app.', why: 'Passado: Yesterday I testED the app.' }] },
          { who: 'colors', en: 'And today?', pt: 'E hoje?', opts: [
            { en: 'Today I\'m working on the new page.', ok: true }, { en: 'Today I\'m fixing a bug.', ok: true }, { en: 'Today I fixing a bug.', why: 'Falta o AM: Today I\'M fixing a bug.' }] },
          { who: 'Pom', en: 'Is the new page ready?', pt: 'A página nova está pronta?', opts: [
            { en: 'Not yet. It\'s not ready.', ok: true }, { en: 'Yes, it\'s done!', ok: true }, { en: 'It\'s yet not ready.', why: 'O "yet" vai no fim: It\'s not ready yet.' }] },
          { who: 'colors', en: 'Any blockers?', pt: 'Algum impedimento?', opts: [
            { en: 'No blockers.', ok: true }, { en: 'Yes, I have a question about the server.', ok: true }, { en: 'Yes, I can.', why: 'Responda sobre impedimentos: No blockers.' }] },
          { who: 'colors', en: 'Perfect. Thanks, team! See you tomorrow.', pt: 'Perfeito. Obrigado, time! Até amanhã.', opts: [
            { en: 'Thanks! See you tomorrow!', ok: true }, { en: 'Let\'s start.', why: 'A reunião acabou!' }, { en: 'Nice to meet you.', why: 'Vocês já se conhecem. Despeça-se: See you tomorrow!' }] },
        ],
      },
    ],
  },
];
