// Módulo da ELLEN — inglês (nível A1) no clima de uma série de comédia sobre uma turma de amigos:
// apartamento, cafeteria, conversa do dia a dia, gírias leves, convites e planos.
// Os personagens, falas e lugares são ORIGINAIS deste jogo (inspirados no estilo "sitcom de amigos").
// Mesmo formato do módulo do Junior (veja o topo de courses/junior.js).
// Cenário: Coffee Street (js/themes.js → ellen).
import { UNITS as J } from './junior.js';

// etapas neutras do curso do Junior (cumprimentos, números, cores, comidas, frutas...) reaproveitadas aqui
const st = (u, s) => J.find(x => x.id === u).stages.find(x => x.id === s);

const SAY = { en: 'Someone says this. What do you answer?', pt: 'Alguém diz isto. O que você responde?' };

export const UNITS = [
  // ======================================================================
  {
    id: 'u1', npc: 'greet', icon: '👋',
    title: { en: 'Hello!', pt: 'Olá! Cumprimentos e apresentações' },
    cando: 'Consigo cumprimentar (formal e entre amigos), me apresentar e perguntar como a pessoa está.',
    intro: { en: "Hey! I'm Mia, your new neighbor! Let's learn to say hello and meet my friends!", pt: 'Ei! Eu sou a Mia, sua nova vizinha! Vamos aprender a cumprimentar e conhecer os meus amigos!' },
    stages: [
      st('u1', 'greet'),
      st('u1', 'intro'),
      {
        id: 'casual', type: 'words', title: { en: 'Friends talk', pt: 'Jeito de falar entre amigos' },
        items: [
          { en: 'Hey!', pt: 'Ei! / Oi!', pic: '👋' },
          { en: "What's up?", pt: 'E aí? / Tudo bem?', pic: '🤙' },
          { en: 'Not much.', pt: 'Nada de mais. / Tudo na mesma.', pic: '🤷' },
          { en: "How's it going?", pt: 'Como vão as coisas?', pic: '🙂' },
          { en: 'Pretty good.', pt: 'Tudo bem. / Bem legal.', pic: '😌' },
          { en: 'Cool!', pt: 'Legal!', pic: '😎' },
          { en: 'Really?', pt: 'Sério? / É mesmo?', pic: '😮' },
          { en: 'Me too.', pt: 'Eu também.', pic: '🙋' },
          { en: 'This is my friend.', pt: 'Este(a) é meu amigo / minha amiga.', pic: '👫' },
          { en: 'Welcome!', pt: 'Bem-vindo(a)!', pic: '🎊' },
          { en: 'Take care!', pt: 'Se cuida!', pic: '🤗' },
          { en: 'See you tomorrow.', pt: 'Até amanhã.', pic: '📅' },
        ],
        specials: [
          { q: SAY, say: "What's up?", answer: 'Not much. And you?', wrong: ['Me too.', 'Take care!'] },
          { q: SAY, say: "How's it going?", answer: 'Pretty good, thanks!', wrong: ["I'm Tom.", 'See you tomorrow.'] },
          { q: SAY, say: "I'm tired.", answer: 'Me too.', wrong: ['Not much.', 'Nice to meet you.'] },
        ],
      },
      st('u1', 'gram'),
      {
        id: 'listen', type: 'listen', title: { en: 'Listening: at the café', pt: 'Escuta: na cafeteria' },
        scene: { en: 'Mia is at the café with Ben. Kate is with her.', pt: 'A Mia está na cafeteria com o Ben. A Kate está com ela.' },
        lines: [
          { who: 'greet', en: "Hey, Ben! What's up?", pt: 'Ei, Ben! E aí?' },
          { who: 'Ben', en: "Not much. How's it going, Mia?", pt: 'Nada de mais. Como vão as coisas, Mia?' },
          { who: 'greet', en: "Pretty good! Ben, this is Kate. She's my new roommate.", pt: 'Tudo bem! Ben, esta é a Kate. Ela é minha nova colega de apartamento.' },
          { who: 'Ben', en: 'Hi, Kate! Nice to meet you.', pt: 'Oi, Kate! Prazer em te conhecer.' },
          { who: 'Kate', en: 'Nice to meet you too, Ben. How are you?', pt: 'O prazer é meu, Ben. Como você está?' },
          { who: 'Ben', en: "I'm great, thanks. Welcome to the building!", pt: 'Estou ótimo, obrigado. Bem-vinda ao prédio!' },
          { who: 'Kate', en: 'Thank you! I love this café.', pt: 'Obrigada! Eu amo esta cafeteria.' },
          { who: 'Ben', en: 'Me too!', pt: 'Eu também!' },
          { who: 'greet', en: "Oh, it's late! See you tomorrow, Ben!", pt: 'Ah, está tarde! Até amanhã, Ben!' },
          { who: 'Ben', en: 'Take care! Bye!', pt: 'Se cuidem! Tchau!' },
        ],
        questions: [
          { q: { en: 'Who is Kate?', pt: 'Quem é a Kate?' }, opts: ["Mia's new roommate", "Ben's sister", 'the waitress'], a: "Mia's new roommate" },
          { q: { en: 'How is Ben?', pt: 'Como o Ben está?' }, opts: ['great', 'tired', 'sad'], a: 'great' },
          { q: { en: 'What does Kate love?', pt: 'O que a Kate ama?' }, opts: ['the café', 'the park', 'the bus'], a: 'the café' },
          { q: { en: 'What does Mia say at the end?', pt: 'O que a Mia diz no final?' }, opts: ['See you tomorrow!', 'Good morning!', 'Nice to meet you!'], a: 'See you tomorrow!' },
        ],
      },
      {
        id: 'talk', type: 'talk', partner: 'greet', title: { en: 'Conversation', pt: 'Conversa com a Mia' },
        scene: { en: 'Mia is your new neighbor. Talk to her.', pt: 'A Mia é a sua nova vizinha. Converse com ela e escolha a melhor resposta.' },
        turns: [
          { en: "Hey! You're new here, right? I'm Mia.", pt: 'Ei! Você é novo(a) aqui, né? Eu sou a Mia.', opts: [
            { en: "Hi, Mia! I'm {name}.", ok: true },
            { en: 'Hi! My name is Mia.', why: 'Mia é ela! Diga o SEU nome.' },
            { en: 'Good night, Mia!', why: '"Good night" é despedida. Diga oi e o seu nome.' }] },
          { en: "Nice to meet you, {name}! How's it going?", pt: 'Prazer em te conhecer! Como vão as coisas?', opts: [
            { en: 'Nice to meet you too. Pretty good!', ok: true },
            { en: "Nice to meet you too. I'm fine, thanks.", ok: true },
            { en: "I'm {name}.", why: 'Você já disse o nome. Ela perguntou como vão as coisas: Pretty good!' }] },
          { en: 'Cool! I live in apartment three. Welcome to the building!', pt: 'Legal! Eu moro no apartamento três. Bem-vindo(a) ao prédio!', opts: [
            { en: 'Thank you!', ok: true },
            { en: 'Thanks, Mia!', ok: true },
            { en: 'Please!', why: '"Please" é por favor. Para agradecer: Thank you! / Thanks!' }] },
          { en: "I'm so tired today...", pt: 'Estou tão cansada hoje...', opts: [
            { en: 'Me too.', ok: true },
            { en: 'Really? Take care!', ok: true },
            { en: 'Cool!', why: 'Estar cansada não é legal 😅. Diga: Me too. / Take care!' }] },
          { en: 'OK, see you tomorrow at the café?', pt: 'OK, te vejo amanhã na cafeteria?', opts: [
            { en: 'Sure! See you tomorrow!', ok: true },
            { en: 'Not much.', why: '"Not much" é resposta para "What\'s up?". Aqui: See you tomorrow!' },
            { en: "What's up?", why: '"What\'s up?" é para quando você CHEGA. Aqui: See you tomorrow!' }] },
        ],
      },
      {
        id: 'meet', type: 'mission', at: ['Ben', 'Kate', 'Duke'],
        title: { en: 'Mission: meet the gang', pt: 'Missão: conheça a turma' },
        desc: 'Converse com os 3 amigos que passeiam pela rua: Ben 🐶, Kate 🐱 e Duke 🐻.',
        talks: {
          Ben: [
            { en: "Hey! What's up?", pt: 'Ei! E aí?', opts: [
              { en: 'Not much. And you?', ok: true }, { en: "Hey! How's it going?", ok: true }, { en: 'Good night!', why: 'Ele está te cumprimentando. Responda: Not much. And you?' }] },
            { en: "Pretty good! I'm Ben. And you?", pt: 'Tudo bem! Eu sou o Ben. E você?', opts: [
              { en: "I'm {name}. Nice to meet you.", ok: true }, { en: "I'm Ben.", why: 'Ben é ele! Diga o seu nome.' }, { en: 'Me too.', why: 'Ele quer saber o seu NOME: I\'m...' }] },
            { en: 'Nice to meet you too. See you around!', pt: 'O prazer é meu. A gente se vê por aí!', opts: [
              { en: 'See you, Ben!', ok: true }, { en: 'Welcome!', why: 'Ele está se despedindo: See you!' }, { en: "What's up?", why: 'Ele está se despedindo: See you!' }] },
          ],
          Kate: [
            { en: 'Hi! Are you the new neighbor?', pt: 'Oi! Você é o(a) novo(a) vizinho(a)?', opts: [
              { en: 'Yes, I am.', ok: true }, { en: 'Yes, you are.', why: 'Ela perguntou sobre VOCÊ: Yes, I am.' }, { en: 'No, thanks.', why: '"No, thanks" é para recusar algo. Responda: Yes, I am.' }] },
            { en: "Cool! I'm Kate. What's your name?", pt: 'Legal! Eu sou a Kate. Qual é o seu nome?', opts: [
              { en: 'My name is {name}.', ok: true }, { en: 'My name is Kate.', why: 'Kate é ela! Diga o seu nome.' }, { en: 'Pretty good.', why: 'Ela perguntou o seu NOME.' }] },
            { en: 'Nice to meet you, {name}. Take care!', pt: 'Prazer em te conhecer. Se cuida!', opts: [
              { en: 'Nice to meet you too. Take care!', ok: true }, { en: 'Not much.', why: 'Responda ao "prazer": Nice to meet you too.' }, { en: 'Good morning!', why: 'Ela está se despedindo: Take care!' }] },
          ],
          Duke: [
            { en: "Hello there! I'm Duke. How are you today?", pt: 'Olá! Eu sou o Duke. Como você está hoje?', opts: [
              { en: "I'm great, thanks. And you?", ok: true }, { en: "I'm fine, thanks. And you?", ok: true }, { en: "I'm Duke.", why: 'Duke é ele! Diga como você está: I\'m fine.' }] },
            { en: "I'm a little tired. I work at night.", pt: 'Estou um pouco cansado. Eu trabalho à noite.', opts: [
              { en: 'Really? Take care!', ok: true }, { en: 'Nice to meet you too.', why: 'Ele disse que está cansado. Diga: Really? Take care!' }, { en: 'Yes, please.', why: 'Ele disse que está cansado. Diga: Really? Take care!' }] },
            { en: 'Thanks! See you tomorrow!', pt: 'Obrigado! Até amanhã!', opts: [
              { en: 'See you tomorrow, Duke!', ok: true }, { en: 'Hello!', why: 'Ele está se despedindo: See you tomorrow!' }, { en: "How's it going?", why: 'Ele está se despedindo: See you tomorrow!' }] },
          ],
        },
      },
    ],
  },
  // ======================================================================
  {
    id: 'u2', npc: 'numbers', icon: '🙋',
    title: { en: 'About me', pt: 'Sobre mim e os meus amigos' },
    cando: 'Consigo dizer de onde sou, onde moro, minha idade, minha profissão e apresentar um amigo.',
    intro: { en: "Hey! I'm Sam. I love games and numbers! Let's learn numbers and talk about you and your friends!", pt: 'Ei! Eu sou o Sam. Eu amo jogos e números! Vamos aprender os números e falar de você e dos seus amigos!' },
    stages: [
      st('u2', 'n1'),
      st('u2', 'n2'),
      {
        id: 'me', type: 'words', title: { en: 'About me', pt: 'Sobre mim' },
        items: [
          { en: 'Where are you from?', pt: 'De onde você é?', pic: '🌎' },
          { en: "I'm from Brazil.", pt: 'Eu sou do Brasil.', pic: '⚽' },
          { en: 'I live in apartment five.', pt: 'Eu moro no apartamento cinco.', pic: '🏢' },
          { en: 'How old are you?', pt: 'Quantos anos você tem?', pic: '🎂' },
          { en: "I'm thirty years old.", pt: 'Eu tenho trinta anos.', pic: '🎈' },
          { en: 'What do you do?', pt: 'O que você faz? (qual é o seu trabalho?)', pic: '💼' },
          { en: "I'm a chef.", pt: 'Eu sou chef de cozinha.', pic: '🍳' },
          { en: "I'm an actor.", pt: 'Eu sou ator / atriz.', pic: '🎭' },
          { en: "I'm a musician.", pt: 'Eu sou músico(a).', pic: '🎸' },
          { en: 'This is my roommate.', pt: 'Este(a) é meu / minha colega de apartamento.', pic: '🛋️' },
          { en: "She's my neighbor.", pt: 'Ela é minha vizinha.', pic: '🚪' },
          { en: "He's my best friend.", pt: 'Ele é meu melhor amigo.', pic: '💛' },
        ],
        specials: [
          { q: SAY, say: 'What do you do?', answer: "I'm a chef.", wrong: ["I'm fine, thanks.", "I'm from Brazil."] },
          { q: SAY, say: 'Where are you from?', answer: "I'm from Brazil.", wrong: ["I'm thirty years old.", "I'm a musician."] },
          { q: SAY, say: 'How old are you?', answer: "I'm thirty years old.", wrong: ['I live in apartment five.', "I'm an actor."] },
        ],
      },
      st('u2', 'colors'),
      {
        id: 'gram', type: 'grammar', title: { en: 'To be + a / an', pt: 'Verbo "to be" completo + a / an' },
        cards: [
          {
            title: 'TO BE com todas as pessoas',
            html: `<table><tr><th>Completo</th><th>Curto</th><th>Significado</th></tr>
              <tr><td>I am</td><td><b>I'm</b></td><td>eu sou / estou</td></tr>
              <tr><td>You are</td><td><b>You're</b></td><td>você é / está</td></tr>
              <tr><td>He is / She is</td><td><b>He's / She's</b></td><td>ele / ela é, está</td></tr>
              <tr><td>It is</td><td><b>It's</b></td><td>(coisa, lugar, bicho) é / está</td></tr>
              <tr><td>We are</td><td><b>We're</b></td><td>nós somos / estamos</td></tr>
              <tr><td>They are</td><td><b>They're</b></td><td>eles / elas são, estão</td></tr></table>
              <p>💡 Só três formas: <b>am</b> (I), <b>is</b> (he, she, it), <b>are</b> (you, we, they).</p>`,
            examples: [
              { en: "She's my neighbor.", pt: 'Ela é minha vizinha.' },
              { en: "He's an actor.", pt: 'Ele é ator.' },
              { en: "We're friends.", pt: 'Nós somos amigos.' },
              { en: "They're roommates.", pt: 'Eles dividem o apartamento.' },
            ],
          },
          {
            title: 'Idade: use TO BE (não "have")',
            html: `<p>Em português a gente <b>tem</b> anos. Em inglês a gente <b>é</b> a idade:</p>
              <table><tr><td><b>I'm</b> thirty (years old).</td><td>Eu tenho trinta anos.</td></tr>
              <tr><td><s>I have thirty years.</s></td><td>❌ errado</td></tr></table>
              <p>💡 Pode dizer só o número: <b>I'm thirty.</b></p>`,
            examples: [
              { en: 'How old are you?', pt: 'Quantos anos você tem?' },
              { en: "I'm twenty-five.", pt: 'Eu tenho vinte e cinco.' },
              { en: "He's thirty years old.", pt: 'Ele tem trinta anos.' },
            ],
          },
          {
            title: 'A / AN na profissão · THIS IS para apresentar',
            html: `<p>A profissão sempre leva <b>a</b> ou <b>an</b> antes:</p>
              <table><tr><th>a + som de consoante</th><th>an + som de vogal</th></tr>
              <tr><td><b>a</b> chef · <b>a</b> musician · <b>a</b> waiter</td><td><b>an</b> actor · <b>an</b> artist</td></tr></table>
              <p>❌ <s>I'm chef.</s> &nbsp; ✅ <b>I'm a chef.</b></p>
              <p>💡 Para apresentar alguém: <b>This is</b> Kate. <b>She's</b> my roommate.</p>`,
            examples: [
              { en: "I'm a chef.", pt: 'Eu sou chef de cozinha.' },
              { en: "She's an artist.", pt: 'Ela é artista.' },
              { en: "This is Leo. He's my best friend.", pt: 'Este é o Leo. Ele é meu melhor amigo.' },
            ],
          },
        ],
        quiz: [
          { gap: 'He ___ my best friend.', pt: 'Ele é meu melhor amigo.', opts: ['is', 'are', 'am'], a: 'is', why: 'Com he / she / it usamos "is".' },
          { gap: 'We ___ neighbors.', pt: 'Nós somos vizinhos.', opts: ['are', 'is', 'am'], a: 'are', why: 'Com we / you / they usamos "are".' },
          { gap: 'I ___ thirty years old.', pt: 'Eu tenho trinta anos.', opts: ['am', 'have', 'is'], a: 'am', why: 'Idade usa TO BE: I am thirty. Nunca "have".' },
          { gap: "She's ___ actor.", pt: 'Ela é atriz.', opts: ['an', 'a', 'the'], a: 'an', why: '"Actor" começa com som de vogal → an.' },
          { gap: "I'm ___ musician.", pt: 'Eu sou músico(a).', opts: ['a', 'an', 'are'], a: 'a', why: '"Musician" começa com som de consoante → a.' },
          { gap: '___ is my roommate, Kate.', pt: 'Esta é minha colega de apartamento, a Kate.', opts: ['This', 'He', 'Are'], a: 'This', why: 'Para apresentar alguém: This is...' },
          { order: "He's my best friend.", pt: 'Ele é meu melhor amigo.' },
          { order: 'I live in apartment five.', pt: 'Eu moro no apartamento cinco.' },
        ],
      },
      {
        id: 'listen', type: 'listen', title: { en: 'Listening: a new neighbor', pt: 'Escuta: um vizinho novo' },
        scene: { en: 'Sam meets Duke at the Game Corner.', pt: 'O Sam conhece o Duke no Cantinho dos Jogos.' },
        lines: [
          { who: 'numbers', en: "Hey! I'm Sam. Are you new in the building?", pt: 'Ei! Eu sou o Sam. Você é novo no prédio?' },
          { who: 'Duke', en: "Yes, I am. I'm Duke. I live in apartment seven.", pt: 'Sou, sim. Eu sou o Duke. Eu moro no apartamento sete.' },
          { who: 'numbers', en: 'Cool! Where are you from, Duke?', pt: 'Legal! De onde você é, Duke?' },
          { who: 'Duke', en: "I'm from Chicago. What do you do, Sam?", pt: 'Eu sou de Chicago. O que você faz, Sam?' },
          { who: 'numbers', en: "I'm a chef. I work at a restaurant. And you?", pt: 'Eu sou chef. Eu trabalho num restaurante. E você?' },
          { who: 'Duke', en: "I'm a musician. I play the guitar at night.", pt: 'Eu sou músico. Eu toco violão à noite.' },
          { who: 'numbers', en: 'Really? Cool! How old are you?', pt: 'Sério? Legal! Quantos anos você tem?' },
          { who: 'Duke', en: "I'm twenty-five. And you?", pt: 'Eu tenho vinte e cinco. E você?' },
          { who: 'numbers', en: "I'm thirty. Hey, this is Leo. He's my best friend.", pt: 'Eu tenho trinta. Ei, este é o Leo. Ele é meu melhor amigo.' },
          { who: 'Duke', en: 'Hi, Leo! Nice to meet you.', pt: 'Oi, Leo! Prazer em te conhecer.' },
        ],
        questions: [
          { q: { en: 'Where does Duke live?', pt: 'Onde o Duke mora?' }, opts: ['apartment seven', 'apartment five', 'apartment three'], a: 'apartment seven' },
          { q: { en: 'What does Duke do?', pt: 'O que o Duke faz?' }, opts: ["He's a musician.", "He's a chef.", "He's an actor."], a: "He's a musician." },
          { q: { en: 'What does Sam do?', pt: 'O que o Sam faz?' }, opts: ["He's a chef.", "He's a musician.", "He's a teacher."], a: "He's a chef." },
          { q: { en: 'How old is Duke?', pt: 'Quantos anos o Duke tem?' }, opts: ['twenty-five', 'thirty', 'fifteen'], a: 'twenty-five' },
          { q: { en: 'Who is Leo?', pt: 'Quem é o Leo?' }, opts: ["Sam's best friend", "Duke's roommate", 'the waiter'], a: "Sam's best friend" },
        ],
      },
      {
        id: 'talk', type: 'talk', partner: 'numbers', title: { en: 'Conversation', pt: 'Conversa com o Sam' },
        scene: { en: 'Sam wants to play a question game.', pt: 'O Sam quer brincar de perguntas. Escolha a melhor resposta.' },
        turns: [
          { en: "Hey, {name}! Let's play a game: I ask, you answer. OK?", pt: 'Ei! Vamos jogar: eu pergunto, você responde. OK?', opts: [
            { en: 'OK! Sure!', ok: true },
            { en: "Cool! Let's play.", ok: true },
            { en: "I'm thirty.", why: 'Ele ainda não perguntou a idade. Diga: OK! Sure!' }] },
          { en: 'Where are you from?', pt: 'De onde você é?', opts: [
            { en: "I'm from Brazil.", ok: true },
            { en: 'I from Brazil.', why: 'Falta o verbo: I\'M from Brazil.' },
            { en: 'I live from Brazil.', why: '"Live" combina com "in". De onde: I\'m from Brazil.' }] },
          { en: 'Do you live in this building?', pt: 'Você mora neste prédio?', opts: [
            { en: 'Yes. I live in apartment five.', ok: true },
            { en: "Yes. I'm live in apartment five.", why: 'Aqui não tem "am": I live in apartment five.' },
            { en: "Yes. I'm apartment five.", why: 'Isso é "eu sou o apartamento cinco" 😄. Diga: I LIVE IN apartment five.' }] },
          { en: 'How old are you?', pt: 'Quantos anos você tem?', opts: [
            { en: "I'm thirty years old.", ok: true },
            { en: "I'm twenty-five.", ok: true },
            { en: 'I have thirty years.', why: 'Idade usa to be: I\'m thirty.' }] },
          { en: 'What do you do?', pt: 'O que você faz?', opts: [
            { en: "I'm a chef.", ok: true },
            { en: "I'm a student.", ok: true },
            { en: "I'm an actor.", ok: true },
            { en: "I'm actor.", why: 'Falta o "an": I\'m AN actor.' }] },
          { en: "Cool! Last question: what's your favorite color?", pt: 'Legal! Última pergunta: qual é a sua cor favorita?', opts: [
            { en: 'My favorite color is purple.', ok: true },
            { en: 'My favorite color is blue.', ok: true },
            { en: 'My favorite is color blue.', why: 'A ordem é: My favorite COLOR IS blue.' }] },
          { en: 'Me too! You win the game!', pt: 'A minha também! Você ganhou o jogo!', opts: [
            { en: 'Really? Cool! Thank you!', ok: true },
            { en: 'Not much.', why: '"Not much" é resposta para "What\'s up?". Comemore: Cool! Thank you!' },
            { en: "I'm from Sam.", why: 'Isso não faz sentido 😄. Comemore: Cool! Thank you!' }] },
        ],
      },
      {
        id: 'idcard', type: 'mission', at: 'mayor',
        title: { en: 'Mission: your neighbor card', pt: 'Missão: seu cartão de vizinho' },
        desc: 'Vá até o Sr. Gray 🐻 (o síndico) na praça central e responda as perguntas para fazer o seu cartão de vizinho.',
        talk: [
          { en: "Good morning! I'm Mr. Gray, the building manager. I need some information for your neighbor card.", pt: 'Bom dia! Eu sou o Sr. Gray, o síndico. Preciso de algumas informações para o seu cartão de vizinho.', opts: [
            { en: 'OK, no problem.', ok: true }, { en: "No, I'm fine.", why: '"I\'m fine" é "estou bem". Diga: OK, no problem.' }, { en: 'Good night!', why: 'Ele disse bom dia. Diga: OK, no problem.' }] },
          { en: "What's your name?", pt: 'Qual é o seu nome?', opts: [
            { en: 'My name is {name}.', ok: true }, { en: 'Your name is Gray.', why: 'Diga o SEU nome: My name is...' }, { en: "I'm from {name}.", why: '"From" é para lugar. Diga: My name is...' }] },
          { en: 'Where are you from?', pt: 'De onde você é?', opts: [
            { en: "I'm from Brazil.", ok: true, save: ['from', 'Brazil'] },
            { en: "I'm from Portugal.", ok: true, save: ['from', 'Portugal'] },
            { en: "I'm from Angola.", ok: true, save: ['from', 'Angola'] },
            { en: 'I from Brazil.', why: 'Falta o verbo: I\'M from Brazil.' }] },
          { en: 'How old are you?', pt: 'Quantos anos você tem?', opts: [
            { en: "I'm twenty-five.", ok: true, save: ['age', '25'] },
            { en: "I'm thirty.", ok: true, save: ['age', '30'] },
            { en: "I'm forty.", ok: true, save: ['age', '40'] },
            { en: 'I have thirty years.', why: 'Idade usa to be: I\'m thirty.' }] },
          { en: 'And what do you do?', pt: 'E o que você faz?', opts: [
            { en: "I'm a chef.", ok: true, save: ['job', 'Chef 🍳'] },
            { en: "I'm a musician.", ok: true, save: ['job', 'Musician 🎸'] },
            { en: "I'm a student.", ok: true, save: ['job', 'Student 🎓'] },
            { en: "I'm a actor.", why: '"Actor" começa com vogal: I\'m AN actor.' }] },
          { en: 'Thank you, {name}! Here is your card. Welcome to Coffee Street!', pt: 'Obrigado! Aqui está o seu cartão. Bem-vindo(a) à Coffee Street!', opts: [
            { en: 'Thank you very much!', ok: true }, { en: 'Please!', why: '"Please" é por favor. Agradeça: Thank you!' }, { en: 'Good night!', why: 'Agradeça: Thank you very much!' }] },
        ],
      },
    ],
  },
  // ======================================================================
  {
    id: 'u3', npc: 'fruits', icon: '☕',
    title: { en: 'At the café', pt: 'Na cafeteria com os amigos' },
    cando: 'Consigo pedir comida e bebida, dizer que estou com fome ou sede e pagar a conta.',
    intro: { en: "Hi! I'm Zoe. Are you hungry? Let's learn food and drinks. Then we go to the Cozy Cup Café!", pt: 'Oi! Eu sou a Zoe. Está com fome? Vamos aprender comidas e bebidas. Depois vamos à cafeteria Cozy Cup!' },
    stages: [
      st('u3', 'food'),
      st('u3', 'fruits'),
      st('u3', 'order'),
      {
        id: 'out', type: 'words', title: { en: 'Eating out', pt: 'Comendo fora com os amigos' },
        items: [
          { en: 'A table for two, please.', pt: 'Uma mesa para dois, por favor.', pic: '🍽️' },
          { en: 'The menu, please.', pt: 'O cardápio, por favor.', pic: '📖' },
          { en: "I'm hungry.", pt: 'Estou com fome.', pic: '😋' },
          { en: "I'm thirsty.", pt: 'Estou com sede.', pic: '🥤' },
          { en: 'Enjoy your meal!', pt: 'Bom apetite!', pic: '🍴' },
          { en: "It's delicious!", pt: 'Está uma delícia!', pic: '🤤' },
          { en: 'The check, please.', pt: 'A conta, por favor.', pic: '🧾' },
          { en: "It's my treat!", pt: 'É por minha conta! (eu pago)', pic: '🎁' },
          { en: "Let's split the check.", pt: 'Vamos dividir a conta.', pic: '➗' },
          { en: "You're welcome.", pt: 'De nada.', pic: '🤗' },
        ],
        specials: [
          { q: { en: 'You finish eating. You want to pay. You say:', pt: 'Você terminou de comer e quer pagar. Você diz:' }, show: '🍽️💵', answer: 'The check, please.', wrong: ['The menu, please.', "I'm hungry."] },
          { q: { en: 'You arrive at the restaurant with a friend. You say:', pt: 'Você chega ao restaurante com um amigo. Você diz:' }, show: '🚪👫', answer: 'A table for two, please.', wrong: ["It's delicious!", "You're welcome."] },
          { q: { en: 'You want to pay for your friend. You say:', pt: 'Você quer pagar a parte do seu amigo. Você diz:' }, show: '🎁💳', answer: "It's my treat!", wrong: ["Let's split the check.", "I'm thirsty."] },
          { q: SAY, say: 'Thank you!', answer: "You're welcome.", wrong: ['Enjoy your meal!', 'The check, please.'] },
        ],
      },
      st('u3', 'gram'),
      {
        id: 'listen', type: 'listen', title: { en: 'Listening: lunch at the café', pt: 'Escuta: almoço na cafeteria' },
        scene: { en: 'Kate and Duke are at the Cozy Cup Café.', pt: 'A Kate e o Duke estão na cafeteria Cozy Cup.' },
        lines: [
          { who: 'bakery', en: 'Hi, guys! A table for two?', pt: 'Oi, pessoal! Mesa para dois?' },
          { who: 'Kate', en: "Yes, please. I'm so hungry!", pt: 'Sim, por favor. Estou com tanta fome!' },
          { who: 'bakery', en: 'Here is the menu. What would you like?', pt: 'Aqui está o cardápio. O que vocês vão querer?' },
          { who: 'Kate', en: "I'd like a sandwich and an orange juice, please.", pt: 'Eu queria um sanduíche e um suco de laranja, por favor.' },
          { who: 'Duke', en: 'Can I have a coffee and a cake, please?', pt: 'Pode me trazer um café e um bolo, por favor?' },
          { who: 'bakery', en: 'Sure! Anything else?', pt: 'Claro! Mais alguma coisa?' },
          { who: 'Duke', en: "No, that's all, thanks.", pt: 'Não, é só isso, obrigado.' },
          { who: 'Kate', en: 'Mmm! This sandwich is delicious!', pt: 'Hmm! Este sanduíche está uma delícia!' },
          { who: 'Duke', en: 'The check, please.', pt: 'A conta, por favor.' },
          { who: 'bakery', en: "It's fifteen dollars.", pt: 'São quinze dólares.' },
          { who: 'Kate', en: "Let's split the check.", pt: 'Vamos dividir a conta.' },
          { who: 'Duke', en: "No, no. It's my treat!", pt: 'Não, não. É por minha conta!' },
          { who: 'Kate', en: 'Really? Thank you, Duke!', pt: 'Sério? Obrigada, Duke!' },
        ],
        questions: [
          { q: { en: 'What does Kate order?', pt: 'O que a Kate pede?' }, opts: ['a sandwich and an orange juice', 'a coffee and a cake', 'a soup and a tea'], a: 'a sandwich and an orange juice' },
          { q: { en: 'What does Duke drink?', pt: 'O que o Duke bebe?' }, opts: ['coffee', 'tea', 'juice'], a: 'coffee' },
          { q: { en: 'How is the sandwich?', pt: 'Como está o sanduíche?' }, opts: ['delicious', 'small', 'bad'], a: 'delicious' },
          { q: { en: 'How much is the check?', pt: 'Quanto deu a conta?' }, opts: ['fifteen dollars', 'fifty dollars', 'five dollars'], a: 'fifteen dollars' },
          { q: { en: 'Who pays?', pt: 'Quem paga?' }, opts: ['Duke', 'Kate', 'Olive'], a: 'Duke' },
        ],
      },
      {
        id: 'talk', type: 'talk', partner: 'fruits', title: { en: 'Role-play: the restaurant', pt: 'Conversa: brincando de restaurante' },
        scene: { en: 'Zoe is the waitress. You are the customer.', pt: 'A Zoe é a garçonete. Você é o(a) cliente.' },
        turns: [
          { en: 'Hello! Welcome! A table for one?', pt: 'Olá! Bem-vindo(a)! Mesa para um?', opts: [
            { en: 'Yes, please.', ok: true },
            { en: 'A table for two, please.', ok: true },
            { en: "I'm a table.", why: 'Isso é "eu sou uma mesa" 😄. Diga: Yes, please.' }] },
          { en: 'Here is the menu. Are you hungry?', pt: 'Aqui está o cardápio. Está com fome?', opts: [
            { en: "Yes, I'm hungry!", ok: true },
            { en: "Yes, I am. I'm thirsty too.", ok: true },
            { en: 'Yes, I have hungry.', why: 'Fome usa TO BE: I\'M hungry (não "have").' }] },
          { en: 'What would you like?', pt: 'O que você vai querer?', opts: [
            { en: "I'd like a sandwich, please.", ok: true },
            { en: 'Can I have a soup, please?', ok: true },
            { en: 'I like a sandwich.', why: '"I like" = eu gosto. Para pedir: I\'D like (eu gostaria).' },
            { en: 'Give me sandwich.', why: 'Fica sem educação e falta o "a". Diga: I\'d like a sandwich, please.' }] },
          { en: 'And to drink?', pt: 'E para beber?', opts: [
            { en: 'An orange juice, please.', ok: true },
            { en: 'Water, please.', ok: true },
            { en: 'A orange juice, please.', why: '"Orange" começa com vogal: AN orange juice.' }] },
          { en: 'Here you are. Enjoy your meal!', pt: 'Aqui está. Bom apetite!', opts: [
            { en: "Thank you! It's delicious!", ok: true },
            { en: 'Thank you!', ok: true },
            { en: "You're welcome.", why: '"You\'re welcome" (de nada) é a resposta para um "thank you". Aqui VOCÊ agradece.' }] },
          { en: 'Anything else?', pt: 'Mais alguma coisa?', opts: [
            { en: "No, that's all, thanks. The check, please.", ok: true },
            { en: "No, that's all. The table, please.", why: 'Para pagar você pede a conta: The CHECK, please.' },
            { en: "Yes, I'm fine.", why: 'Se não quer mais nada: No, that\'s all, thanks.' }] },
          { en: "It's twelve dollars.", pt: 'São doze dólares.', opts: [
            { en: 'Can I pay by card?', ok: true },
            { en: 'Here you are.', ok: true },
            { en: "I'm twelve.", why: 'Isso é idade 😄. Para pagar: Can I pay by card? / Here you are.' }] },
          { en: 'Thank you! See you soon!', pt: 'Obrigada! Até logo!', opts: [
            { en: 'Bye! See you!', ok: true },
            { en: "What's up?", why: '"What\'s up?" é para quando você chega. Aqui: Bye! See you!' },
            { en: 'Enjoy your meal!', why: 'Quem deseja bom apetite é a garçonete. Despeça-se: Bye!' }] },
        ],
      },
      {
        id: 'cafe', type: 'mission', at: 'bakery',
        title: { en: 'Mission: lunch with a friend', pt: 'Missão: almoço com um amigo' },
        desc: 'Vá até a Olive 🐻 no COZY CUP CAFÉ. Você vai almoçar com o Ben: peça a comida e resolva a conta!',
        talk: [
          { en: 'Hi, {name}! Hi, Ben! A table for two?', pt: 'Oi! Oi, Ben! Mesa para dois?', opts: [
            { en: 'Yes, please. A table for two.', ok: true },
            { en: "Yes, I'm two.", why: 'Isso é "eu tenho dois anos" 😄. Diga: A table for two.' },
            { en: 'The check, please.', why: 'Você ainda nem comeu 😄. Primeiro a mesa: A table for two.' }] },
          { en: 'Here is the menu. What would you like?', pt: 'Aqui está o cardápio. O que vocês vão querer?', opts: [
            { en: "I'd like a sandwich and a juice, please.", ok: true },
            { en: 'Can I have a soup and a tea, please?', ok: true },
            { en: 'I like sandwich.', why: '"I like" = eu gosto. Para pedir: I\'D like a sandwich, please.' }] },
          { who: 'Ben', en: "And I'd like a cake and a coffee, please. I'm so hungry!", pt: 'E eu queria um bolo e um café, por favor. Estou com tanta fome!' },
          { en: 'Sure! Anything else?', pt: 'Claro! Mais alguma coisa?', opts: [
            { en: "No, that's all, thanks.", ok: true },
            { en: 'Yes. Water, please.', ok: true },
            { en: 'Yes, you are.', why: 'Se não quer mais nada: No, that\'s all, thanks.' }] },
          { en: 'Here you are. Enjoy your meal!', pt: 'Aqui está. Bom apetite!', opts: [
            { en: "Thank you! It's delicious!", ok: true },
            { en: 'Thanks, Olive!', ok: true },
            { en: "You're welcome.", why: '"You\'re welcome" é a resposta para um "thank you". Aqui VOCÊ agradece.' }] },
          { who: 'Ben', en: "Mmm! Let's split the check, {name}.", pt: 'Hmm! Vamos dividir a conta.', opts: [
            { en: "No, it's my treat!", ok: true },
            { en: "OK. Let's split the check.", ok: true },
            { en: "No, I'm a check.", why: 'Isso é "eu sou uma conta" 😄. Diga: It\'s my treat! ou Let\'s split the check.' }] },
          { en: "The check? It's twenty dollars.", pt: 'A conta? São vinte dólares.', opts: [
            { en: 'Can I pay by card?', ok: true },
            { en: 'Here you are.', ok: true },
            { en: 'How old is it?', why: '"How old" é idade. Para pagar: Can I pay by card?' }] },
          { who: 'Ben', en: "Thank you, {name}! You're a great friend!", pt: 'Obrigado! Você é um(a) ótimo(a) amigo(a)!', opts: [
            { en: "You're welcome, Ben!", ok: true },
            { en: 'Not much.', why: 'Ele agradeceu. Responda: You\'re welcome! (de nada)' },
            { en: 'The menu, please.', why: 'Ele agradeceu. Responda: You\'re welcome! (de nada)' }] },
        ],
      },
    ],
  },
  // ======================================================================
  {
    id: 'u4', npc: 'colors', icon: '🎬',
    title: { en: 'Hanging out', pt: 'Saindo com os amigos: gostos e convites' },
    cando: 'Consigo dizer do que gosto, convidar um amigo, combinar horário e reagir como numa conversa de verdade.',
    intro: { en: "Hey! I'm Leo. I'm an actor! Let's talk about things we like and make plans with friends!", pt: 'Ei! Eu sou o Leo. Eu sou ator! Vamos falar das coisas que a gente gosta e fazer planos com os amigos!' },
    stages: [
      {
        id: 'things', type: 'words', title: { en: 'Fun things', pt: 'Coisas divertidas' },
        items: [
          { en: 'movie', pt: 'filme', pic: '🎬' },
          { en: 'music', pt: 'música', pic: '🎵' },
          { en: 'pizza', pt: 'pizza', pic: '🍕' },
          { en: 'party', pt: 'festa', pic: '🎉' },
          { en: 'game', pt: 'jogo', pic: '🎮' },
          { en: 'book', pt: 'livro', pic: '📚' },
          { en: 'guitar', pt: 'violão / guitarra', pic: '🎸' },
          { en: 'beach', pt: 'praia', pic: '🏖️' },
          { en: 'park', pt: 'parque', pic: '🌳' },
          { en: 'concert', pt: 'show (de música)', pic: '🎤' },
          { en: 'popcorn', pt: 'pipoca', pic: '🍿' },
          { en: 'weekend', pt: 'fim de semana', pic: '📅' },
        ],
        specials: [
          { q: { en: 'You eat this at the movies.', pt: 'Você come isto no cinema.' }, show: '🎬😋', answer: 'popcorn', wrong: ['guitar', 'beach'] },
          { q: { en: 'Saturday and Sunday are the...', pt: 'Sábado e domingo são o...' }, show: '🛋️😴', answer: 'weekend', wrong: ['concert', 'party'] },
        ],
      },
      {
        id: 'likes', type: 'words', title: { en: 'Likes and dislikes', pt: 'Gosto e não gosto' },
        items: [
          { en: 'I like pizza.', pt: 'Eu gosto de pizza.', pic: '🍕' },
          { en: 'I love music.', pt: 'Eu amo música.', pic: '🎵' },
          { en: "I don't like coffee.", pt: 'Eu não gosto de café.', pic: '🙅' },
          { en: 'I hate Mondays.', pt: 'Eu odeio segundas-feiras.', pic: '😩' },
          { en: 'Do you like movies?', pt: 'Você gosta de filmes?', pic: '🎬' },
          { en: 'Yes, I do.', pt: 'Gosto, sim.', pic: '👍' },
          { en: "No, I don't.", pt: 'Não gosto, não.', pic: '👎' },
          { en: 'What do you like?', pt: 'Do que você gosta?', pic: '🤔' },
          { en: 'I like it a lot.', pt: 'Eu gosto muito.', pic: '💖' },
          { en: 'I really like this song.', pt: 'Eu gosto muito desta música.', pic: '🎶' },
        ],
        specials: [
          { q: SAY, say: 'Do you like pizza?', answer: 'Yes, I do.', wrong: ['Yes, I am.', 'Yes, I like.'] },
          { q: SAY, say: 'Do you like Mondays?', answer: "No, I don't.", wrong: ["No, I'm not.", 'No, I like.'] },
        ],
      },
      {
        id: 'invite', type: 'words', title: { en: 'Making plans', pt: 'Convites e planos' },
        items: [
          { en: 'Are you free tonight?', pt: 'Você está livre hoje à noite?', pic: '🌙' },
          { en: "Let's watch a movie.", pt: 'Vamos assistir a um filme.', pic: '🎬' },
          { en: 'Do you want to come?', pt: 'Você quer vir?', pic: '🙋' },
          { en: "I'd love to!", pt: 'Eu adoraria!', pic: '😍' },
          { en: "Sorry, I can't.", pt: 'Desculpa, não posso.', pic: '😔' },
          { en: "I'm busy.", pt: 'Estou ocupado(a).', pic: '⏳' },
          { en: 'What time?', pt: 'Que horas?', pic: '⏰' },
          { en: "At eight o'clock.", pt: 'Às oito horas.', pic: '🕗' },
          { en: 'See you there!', pt: 'Te vejo lá!', pic: '📍' },
          { en: 'Sounds great!', pt: 'Parece ótimo! / Combinado!', pic: '🤩' },
        ],
        specials: [
          { q: SAY, say: 'Are you free tonight?', answer: 'Yes, I am. Why?', wrong: ["At eight o'clock.", 'See you there!'] },
          { q: SAY, say: 'Do you want to come?', answer: "I'd love to!", wrong: ['Yes, I am.', "I'm fine, thanks."] },
          { q: SAY, say: 'What time?', answer: "At eight o'clock.", wrong: ['In my apartment.', 'Sounds great!'] },
        ],
      },
      {
        id: 'express', type: 'words', title: { en: 'Reactions', pt: 'Reações de quem conversa de verdade' },
        items: [
          { en: 'Guess what!', pt: 'Adivinha! / Sabe da novidade?', pic: '🤫' },
          { en: 'No way!', pt: 'Não acredito! / Mentira!', pic: '😱' },
          { en: 'Are you serious?', pt: 'Está falando sério?', pic: '🤨' },
          { en: "I'm kidding.", pt: 'Estou brincando.', pic: '😜' },
          { en: 'Oh my gosh!', pt: 'Nossa! / Minha nossa!', pic: '🙀' },
          { en: 'Good for you!', pt: 'Que bom para você! / Parabéns!', pic: '👏' },
          { en: "What's wrong?", pt: 'O que foi? / Qual é o problema?', pic: '😟' },
          { en: 'Never mind.', pt: 'Deixa pra lá.', pic: '🙅' },
          { en: "I'm so happy!", pt: 'Estou tão feliz!', pic: '😄' },
          { en: "That's funny!", pt: 'Que engraçado!', pic: '😂' },
        ],
        specials: [
          { q: { en: 'Your friend looks sad. You ask:', pt: 'Seu amigo parece triste. Você pergunta:' }, show: '😟', answer: "What's wrong?", wrong: ['Good for you!', "That's funny!"] },
          { q: { en: 'Your friend has a new job! You say:', pt: 'Seu amigo arrumou um emprego novo! Você diz:' }, show: '💼🎉', answer: 'Good for you!', wrong: ['Never mind.', "What's wrong?"] },
          { q: { en: 'Your friend tells a joke. You say:', pt: 'Seu amigo conta uma piada. Você diz:' }, show: '😂', answer: "That's funny!", wrong: ["What's wrong?", 'Never mind.'] },
        ],
      },
      {
        id: 'gram', type: 'grammar', title: { en: "Like, let's, want to", pt: "Gostar (like), vamos (let's), querer (want to)" },
        cards: [
          {
            title: 'LIKE / DON\'T LIKE',
            html: `<table><tr><td>I <b>like</b> pizza.</td><td>Eu gosto de pizza.</td></tr>
              <tr><td>I <b>don't like</b> coffee.</td><td>Eu não gosto de café.</td></tr>
              <tr><td><b>Do you like</b> movies?</td><td>Você gosta de filmes?</td></tr>
              <tr><td>Yes, <b>I do</b>. / No, <b>I don't</b>.</td><td>Gosto. / Não gosto.</td></tr></table>
              <p>❌ <s>Yes, I like.</s> &nbsp; ✅ <b>Yes, I do.</b></p>
              <p>💡 Com he / she: <b>She likes</b> music. · <b>Does she like</b> popcorn? Yes, she <b>does</b>.</p>`,
            examples: [
              { en: 'Do you like music?', pt: 'Você gosta de música?' },
              { en: 'Yes, I do. I love music!', pt: 'Gosto, sim. Eu amo música!' },
              { en: "I don't like Mondays.", pt: 'Eu não gosto de segundas-feiras.' },
            ],
          },
          {
            title: "LET'S = vamos! · WANT TO = querer",
            html: `<table><tr><td><b>Let's</b> watch a movie.</td><td>Vamos assistir a um filme.</td></tr>
              <tr><td><b>Let's</b> go to the beach!</td><td>Vamos à praia!</td></tr>
              <tr><td>Do you <b>want to</b> come?</td><td>Você quer vir?</td></tr>
              <tr><td>I <b>want to</b> eat pizza.</td><td>Eu quero comer pizza.</td></tr></table>
              <p>💡 Depois de <b>let's</b> e de <b>want to</b> o verbo fica simples. E <b>I can</b> + verbo = eu posso: <b>I can bring</b> pizza.</p>`,
            examples: [
              { en: "Let's go to the party!", pt: 'Vamos à festa!' },
              { en: 'Do you want to come?', pt: 'Você quer vir?' },
              { en: 'I can bring popcorn.', pt: 'Eu posso levar pipoca.' },
            ],
          },
          {
            title: 'Quando? AT + hora · ON + dia',
            html: `<table><tr><td><b>at</b> eight o'clock</td><td>às oito horas</td></tr>
              <tr><td><b>on</b> Saturday</td><td>no sábado</td></tr>
              <tr><td><b>tonight</b> · <b>tomorrow</b></td><td>hoje à noite · amanhã (sem at / on)</td></tr></table>
              <p>💡 Dias: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday (sempre com letra maiúscula).</p>`,
            examples: [
              { en: "See you at eight o'clock.", pt: 'Te vejo às oito horas.' },
              { en: 'The party is on Saturday.', pt: 'A festa é no sábado.' },
              { en: 'Are you free tonight?', pt: 'Você está livre hoje à noite?' },
            ],
          },
        ],
        quiz: [
          { gap: 'I ___ like coffee.', pt: 'Eu não gosto de café.', opts: ["don't", 'not', 'no'], a: "don't", why: 'Negativo com like: I DON\'T like.' },
          { gap: '___ you like movies?', pt: 'Você gosta de filmes?', opts: ['Do', 'Are', 'Is'], a: 'Do', why: 'Pergunta com like: DO you like...?' },
          { gap: 'Yes, I ___.', pt: 'Gosto, sim.', opts: ['do', 'am', 'like'], a: 'do', why: 'Pergunta com DO → resposta curta com DO: Yes, I do.' },
          { gap: '___ watch a movie!', pt: 'Vamos assistir a um filme!', opts: ["Let's", 'Let', 'We'], a: "Let's", why: 'Vamos...! = Let\'s + verbo.' },
          { gap: 'Do you want ___ come?', pt: 'Você quer vir?', opts: ['to', 'for', 'at'], a: 'to', why: 'Querer + verbo = want TO + verbo.' },
          { gap: "See you ___ eight o'clock.", pt: 'Te vejo às oito horas.', opts: ['at', 'on', 'in'], a: 'at', why: 'Hora → at.' },
          { gap: 'The party is ___ Saturday.', pt: 'A festa é no sábado.', opts: ['on', 'at', 'in'], a: 'on', why: 'Dia da semana → on.' },
          { order: 'Do you want to come?', pt: 'Você quer vir?' },
          { order: "Let's watch a movie.", pt: 'Vamos assistir a um filme.' },
        ],
      },
      {
        id: 'listen', type: 'listen', title: { en: 'Listening: plans for tonight', pt: 'Escuta: planos para hoje à noite' },
        scene: { en: 'Leo, Kate and Ben make plans for tonight.', pt: 'O Leo, a Kate e o Ben combinam um programa para hoje à noite.' },
        lines: [
          { who: 'colors', en: 'Guess what! I have a new movie. Are you free tonight?', pt: 'Adivinha! Eu tenho um filme novo. Vocês estão livres hoje à noite?' },
          { who: 'Kate', en: 'Yes, I am! I love movies. What time?', pt: 'Eu estou! Eu amo filmes. Que horas?' },
          { who: 'colors', en: "At eight o'clock, in my apartment.", pt: 'Às oito horas, no meu apartamento.' },
          { who: 'Kate', en: 'Sounds great! Ben, do you want to come?', pt: 'Parece ótimo! Ben, você quer vir?' },
          { who: 'Ben', en: "Sorry, I can't. I'm busy tonight.", pt: 'Desculpa, não posso. Estou ocupado hoje à noite.' },
          { who: 'Kate', en: 'No way! Are you serious?', pt: 'Não acredito! Está falando sério?' },
          { who: 'Ben', en: "I'm kidding! I'd love to. I can bring pizza.", pt: 'Estou brincando! Eu adoraria. Posso levar pizza.' },
          { who: 'colors', en: 'Good! I have popcorn. Kate, do you like popcorn?', pt: 'Boa! Eu tenho pipoca. Kate, você gosta de pipoca?' },
          { who: 'Kate', en: 'Yes, I do. I like it a lot!', pt: 'Gosto, sim. Gosto muito!' },
          { who: 'colors', en: 'OK! See you there at eight!', pt: 'OK! Vejo vocês lá às oito!' },
        ],
        questions: [
          { q: { en: 'What time is the movie?', pt: 'Que horas é o filme?' }, opts: ["at eight o'clock", "at six o'clock", "at ten o'clock"], a: "at eight o'clock" },
          { q: { en: 'Where is the movie night?', pt: 'Onde é a noite de cinema?' }, opts: ["in Leo's apartment", 'at the café', 'at the park'], a: "in Leo's apartment" },
          { q: { en: 'Is Ben really busy?', pt: 'O Ben está mesmo ocupado?' }, opts: ["No. He's kidding.", "Yes. He's busy.", "Yes. He's tired."], a: "No. He's kidding." },
          { q: { en: 'What can Ben bring?', pt: 'O que o Ben pode levar?' }, opts: ['pizza', 'popcorn', 'cake'], a: 'pizza' },
          { q: { en: 'Does Kate like popcorn?', pt: 'A Kate gosta de pipoca?' }, opts: ['Yes, she does.', "No, she doesn't.", 'She hates it.'], a: 'Yes, she does.' },
        ],
      },
      {
        id: 'talk', type: 'talk', partner: 'colors', title: { en: 'Conversation', pt: 'Conversa com o Leo' },
        scene: { en: 'Leo has big news. Talk to him.', pt: 'O Leo tem uma novidade. Converse com ele.' },
        turns: [
          { en: "Hey, {name}! Guess what! I'm in a new movie!", pt: 'Ei! Adivinha! Eu estou num filme novo!', opts: [
            { en: 'No way! Good for you!', ok: true },
            { en: 'Are you serious? Good for you!', ok: true },
            { en: "What's wrong?", why: '"What\'s wrong?" é para quando alguém está triste. É notícia boa: Good for you!' }] },
          { en: 'Thanks! Do you like movies?', pt: 'Valeu! Você gosta de filmes?', opts: [
            { en: 'Yes, I do. I love movies!', ok: true },
            { en: 'Yes, I like.', why: 'Resposta curta com DO: Yes, I do.' },
            { en: 'Yes, I am.', why: 'Pergunta com "Do you...?" → Yes, I DO.' }] },
          { en: 'Cool! And do you like coffee?', pt: 'Legal! E você gosta de café?', opts: [
            { en: 'Yes, I do. I like it a lot.', ok: true },
            { en: "No, I don't. I like tea.", ok: true },
            { en: 'No, I not like.', why: 'Negativo: No, I DON\'T.' }] },
          { en: 'What do you like to do on the weekend?', pt: 'O que você gosta de fazer no fim de semana?', opts: [
            { en: 'I like movies and music.', ok: true },
            { en: 'I love the beach.', ok: true },
            { en: "I'm like the beach.", why: 'Com "like" não se usa "am": I like the beach.' }] },
          { en: 'Me too! Hey, are you free tonight?', pt: 'Eu também! Ei, você está livre hoje à noite?', opts: [
            { en: 'Yes, I am. Why?', ok: true },
            { en: 'Yes, I do.', why: 'Pergunta com ARE → Yes, I AM.' },
            { en: "At eight o'clock.", why: 'Ele não perguntou a hora. Diga: Yes, I am. Why?' }] },
          { en: "There's a party at the café. Do you want to come?", pt: 'Tem uma festa na cafeteria. Você quer vir?', opts: [
            { en: "I'd love to! What time?", ok: true },
            { en: 'Sounds great! What time?', ok: true },
            { en: 'Yes, I want.', why: 'Em inglês não se para em "want". Diga: I\'d love to! / Yes, I do.' }] },
          { en: "At nine o'clock. See you there!", pt: 'Às nove horas. Te vejo lá!', opts: [
            { en: 'See you there!', ok: true },
            { en: 'Sounds great! See you!', ok: true },
            { en: "I'm busy there.", why: 'Você já aceitou 🙂. Despeça-se: See you there!' }] },
        ],
      },
      {
        id: 'movie', type: 'mission', at: 'colors',
        title: { en: 'Mission: movie night', pt: 'Missão: noite de cinema' },
        desc: 'Volte ao Leo 🐱 no THE STUDIO. A turma vai fazer uma noite de cinema — combine tudo em inglês!',
        talk: [
          { en: 'Hey, {name}! Are you free tonight?', pt: 'Ei! Você está livre hoje à noite?', opts: [
            { en: 'Yes, I am. Why?', ok: true },
            { en: "Yes, I'm free tonight!", ok: true },
            { en: 'Yes, I do.', why: 'Pergunta com ARE → Yes, I AM.' }] },
          { en: "Movie night in my apartment, at eight o'clock! Do you want to come?", pt: 'Noite de cinema no meu apartamento, às oito! Você quer vir?', opts: [
            { en: "I'd love to!", ok: true },
            { en: 'Sounds great!', ok: true },
            { en: 'Never mind.', why: '"Never mind" = deixa pra lá. Para aceitar: I\'d love to!' }] },
          { who: 'Kate', en: "Hey, {name}! I'm coming too! Do you like popcorn?", pt: 'Ei! Eu também vou! Você gosta de pipoca?', opts: [
            { en: 'Yes, I do. I love popcorn!', ok: true },
            { en: "No, I don't. But I like pizza.", ok: true },
            { en: 'Yes, I like.', why: 'Resposta curta com DO: Yes, I do.' }] },
          { who: 'Ben', en: 'Hey! What time is the movie?', pt: 'Ei! Que horas é o filme?', opts: [
            { en: "At eight o'clock.", ok: true },
            { en: "In eight o'clock.", why: 'Hora → AT: at eight o\'clock.' },
            { en: "In Leo's apartment.", why: 'Ele perguntou a HORA (what time), não o lugar.' }] },
          { who: 'Ben', en: 'Cool. I can bring pizza. What can you bring, {name}?', pt: 'Legal. Eu posso levar pizza. O que você pode levar?', opts: [
            { en: 'I can bring juice.', ok: true },
            { en: 'I can bring a cake.', ok: true },
            { en: 'I can to bring juice.', why: 'Depois de CAN não tem "to": I can bring juice.' }] },
          { en: "Great! Oh no... I don't have a TV! ... I'm kidding!", pt: 'Ótimo! Ah, não... eu não tenho TV! ... Estou brincando!', opts: [
            { en: "No way! That's funny!", ok: true },
            { en: "Oh my gosh, Leo! That's funny!", ok: true },
            { en: "Sorry, I can't.", why: 'Ele só fez uma piada 😄. Reaja: That\'s funny!' }] },
          { en: 'OK! See you tonight at eight!', pt: 'OK! Te vejo hoje à noite, às oito!', opts: [
            { en: 'See you there!', ok: true },
            { en: 'Sounds great! See you!', ok: true },
            { en: 'See you tomorrow!', why: 'O filme é HOJE à noite (tonight), não amanhã: See you there!' }] },
        ],
      },
    ],
  },
];
