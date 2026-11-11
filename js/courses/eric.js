// Módulo do ERIC — inglês (nível A1) para quem trabalha com jardinagem, paisagismo e arborismo.
// Mesmo formato do módulo do Junior (veja o topo de courses/junior.js).
// Cenário: Jardim Botânico (js/themes.js → eric).
import { UNITS as J } from './junior.js';

// etapas neutras do curso do Junior (cumprimentos, números, cores, frutas...) reaproveitadas aqui
const st = (u, s) => J.find(x => x.id === u).stages.find(x => x.id === s);

const SAY = { en: 'Someone says this. What do you answer?', pt: 'Alguém diz isto. O que você responde?' };

export const UNITS = [
  // ======================================================================
  {
    id: 'u1', npc: 'greet', icon: '👋',
    title: { en: 'Hello!', pt: 'Olá! Cumprimentos e apresentações' },
    cando: 'Consigo cumprimentar, me apresentar e perguntar como a pessoa está.',
    intro: { en: "Hi! I am Rosa. Welcome to the garden! Let's learn to say hello and meet the gardeners!", pt: 'Oi! Eu sou a Rosa. Bem-vindo(a) ao jardim! Vamos aprender a cumprimentar e conhecer os jardineiros!' },
    stages: [
      st('u1', 'greet'),
      st('u1', 'intro'),
      st('u1', 'gram'),
      {
        id: 'listen', type: 'listen', title: { en: 'Listening: two gardeners', pt: 'Escuta: dois jardineiros' },
        scene: { en: 'Rosa and Moss meet in the greenhouse.', pt: 'Rosa e Moss se encontram na estufa.' },
        lines: [
          { who: 'greet', en: 'Good morning! Are you the new gardener?', pt: 'Bom dia! Você é o novo jardineiro?' },
          { who: 'Moss', en: "Good morning! Yes, I am. What's your name?", pt: 'Bom dia! Sou sim. Qual é o seu nome?' },
          { who: 'greet', en: 'My name is Rosa. And you?', pt: 'Meu nome é Rosa. E você?' },
          { who: 'Moss', en: "I'm Moss. Nice to meet you, Rosa.", pt: 'Eu sou o Moss. Prazer em te conhecer, Rosa.' },
          { who: 'greet', en: 'Nice to meet you too. How are you?', pt: 'O prazer é meu. Como você está?' },
          { who: 'Moss', en: "I'm great, thanks! And you?", pt: 'Estou ótimo, obrigado! E você?' },
          { who: 'greet', en: "I'm fine, thanks. Welcome to the garden!", pt: 'Estou bem, obrigada. Bem-vindo ao jardim!' },
          { who: 'Moss', en: 'Thank you! See you later!', pt: 'Obrigado! Até mais!' },
        ],
        questions: [
          { q: { en: "What is the new gardener's name?", pt: 'Qual é o nome do novo jardineiro?' }, opts: ['Moss', 'Rosa', 'Twig'], a: 'Moss' },
          { q: { en: 'How is Moss?', pt: 'Como o Moss está?' }, opts: ['great', 'tired', 'fine'], a: 'great' },
          { q: { en: 'How is Rosa?', pt: 'Como a Rosa está?' }, opts: ['fine', 'tired', 'great'], a: 'fine' },
          { q: { en: 'What does Moss say at the end?', pt: 'O que o Moss diz no final?' }, opts: ['See you later!', 'Good night!', 'Nice to meet you!'], a: 'See you later!' },
        ],
      },
      {
        id: 'talk', type: 'talk', partner: 'greet', title: { en: 'Conversation', pt: 'Conversa com a Rosa' },
        scene: { en: 'Talk to Rosa in the greenhouse.', pt: 'Converse com a Rosa na estufa. Escolha a melhor resposta.' },
        turns: [
          { en: 'Good afternoon! Welcome to the garden!', pt: 'Boa tarde! Bem-vindo(a) ao jardim!', opts: [
            { en: 'Good afternoon! Thank you!', ok: true },
            { en: 'Good night!', why: '"Good night" é para ir embora à noite ou ir dormir.' },
            { en: 'Goodbye!', why: 'Você acabou de chegar 🙂. Responda ao cumprimento.' }] },
          { en: "I'm Rosa. I work here. What's your name?", pt: 'Eu sou a Rosa. Eu trabalho aqui. Qual é o seu nome?', opts: [
            { en: 'My name is {name}.', ok: true },
            { en: "I'm fine, thanks.", why: 'Ela perguntou o seu NOME, não como você está.' },
            { en: 'Your name is Rosa.', why: 'Isso é "o seu nome é Rosa". Fale o SEU nome: My name is...' }] },
          { en: 'Nice to meet you, {name}! How are you today?', pt: 'Prazer em te conhecer! Como você está hoje?', opts: [
            { en: "Nice to meet you too. I'm great!", ok: true },
            { en: "Nice to meet you too. I'm fine, thanks.", ok: true },
            { en: "I'm Rosa.", why: 'Você não é a Rosa! 😄 Diga como você está: I\'m fine.' }] },
          { en: 'Are you a new gardener?', pt: 'Você é um(a) novo(a) jardineiro(a)?', opts: [
            { en: 'Yes, I am.', ok: true },
            { en: 'Yes, you are.', why: 'Ela perguntou sobre VOCÊ: Yes, I am.' },
            { en: 'No, thanks.', why: '"No, thanks" é para recusar algo. Responda: Yes, I am.' }] },
          { en: 'Great! See you in the garden!', pt: 'Ótimo! Vejo você no jardim!', opts: [
            { en: 'See you later!', ok: true },
            { en: 'Thank you! Bye!', ok: true },
            { en: 'Good morning!', why: 'Ela está se despedindo. Responda com bye / see you later.' }] },
        ],
      },
      {
        id: 'meet', type: 'mission', at: ['Moss', 'Fern', 'Twig'],
        title: { en: 'Mission: meet the gardeners', pt: 'Missão: conheça os jardineiros' },
        desc: 'Converse com os 3 jardineiros que passeiam pelo jardim: Moss 👨‍🌾, Fern 👩‍🌾 e Twig 👦.',
        talks: {
          Moss: [
            { en: 'Hey! Good morning!', pt: 'Ei! Bom dia!', opts: [
              { en: 'Good morning!', ok: true }, { en: 'Good night!', why: 'Ele disse bom dia. Responda "Good morning!".' }, { en: 'Thank you!', why: 'Ele só cumprimentou. Responda "Good morning!".' }] },
            { en: "I'm Moss. I'm a gardener. And you?", pt: 'Eu sou o Moss. Sou jardineiro. E você?', opts: [
              { en: "I'm {name}. Nice to meet you.", ok: true }, { en: "I'm Moss.", why: 'Moss é ele! Diga o seu nome.' }, { en: 'And you?', why: 'Ele já se apresentou. Agora é a sua vez.' }] },
            { en: 'Nice to meet you too! See you later!', pt: 'O prazer é meu! Até mais!', opts: [
              { en: 'See you later, Moss!', ok: true }, { en: 'Nice to meet you.', why: 'Ele está se despedindo: See you later!' }, { en: 'Yes, please.', why: 'Ele está se despedindo: See you later!' }] },
          ],
          Fern: [
            { en: "Hi! I'm Fern. What's your name?", pt: 'Oi! Eu sou a Fern. Qual é o seu nome?', opts: [
              { en: 'My name is {name}.', ok: true }, { en: 'My name is Fern.', why: 'Fern é ela! Diga o seu nome.' }, { en: "I'm fine.", why: 'Ela perguntou o seu nome.' }] },
            { en: 'How are you today, {name}?', pt: 'Como você está hoje?', opts: [
              { en: "I'm great, thanks. And you?", ok: true }, { en: "I'm fine, thanks. And you?", ok: true }, { en: "I'm {name}.", why: 'Ela já sabe o seu nome. A pergunta é como você está.' }] },
            { en: "I'm fine, thank you. Goodbye!", pt: 'Estou bem, obrigada. Tchau!', opts: [
              { en: 'Goodbye, Fern!', ok: true }, { en: 'Hello, Fern!', why: 'Ela está se despedindo: Goodbye!' }, { en: 'Good morning!', why: 'Ela está se despedindo: Goodbye!' }] },
          ],
          Twig: [
            { en: 'Hello! Are you new here?', pt: 'Olá! Você é novo(a) aqui?', opts: [
              { en: 'Yes, I am.', ok: true }, { en: 'No, thanks.', why: '"No, thanks" é para recusar algo. Responda: Yes, I am.' }, { en: 'Yes, you are.', why: 'Ele perguntou sobre VOCÊ: Yes, I am.' }] },
            { en: 'Welcome to the garden! My name is Twig.', pt: 'Bem-vindo(a) ao jardim! Meu nome é Twig.', opts: [
              { en: "Thank you, Twig. I'm {name}.", ok: true }, { en: 'Goodbye, Twig!', why: 'Ele acabou de se apresentar. Agradeça e diga o seu nome.' }, { en: 'My name is Twig.', why: 'Esse é o nome dele! Diga o seu.' }] },
            { en: 'Have a nice day!', pt: 'Tenha um bom dia!', opts: [
              { en: 'Thank you! You too!', ok: true }, { en: 'Yes, please.', why: 'Agradeça: Thank you! You too!' }, { en: "I'm tired.", why: 'Agradeça: Thank you! You too!' }] },
          ],
        },
      },
    ],
  },
  // ======================================================================
  {
    id: 'u2', npc: 'numbers', icon: '🙋',
    title: { en: 'About me', pt: 'Sobre mim e o meu trabalho' },
    cando: 'Consigo dizer de onde sou, onde moro, minha idade e qual é o meu trabalho.',
    intro: { en: "Hello! I am Woody. I take care of the young trees. Let's learn numbers and talk about you!", pt: 'Olá! Eu sou o Woody. Eu cuido das árvores novas. Vamos aprender os números e falar sobre você!' },
    stages: [
      st('u2', 'n1'),
      st('u2', 'n2'),
      {
        id: 'me', type: 'words', title: { en: 'About me', pt: 'Sobre mim' },
        items: [
          { en: 'Where are you from?', pt: 'De onde você é?', pic: '🌎' },
          { en: "I'm from Brazil.", pt: 'Eu sou do Brasil.', pic: '⚽' },
          { en: 'I live in São Paulo.', pt: 'Eu moro em São Paulo.', pic: '🏠' },
          { en: 'How old are you?', pt: 'Quantos anos você tem?', pic: '🎂' },
          { en: "I'm thirty years old.", pt: 'Eu tenho trinta anos.', pic: '🎈' },
          { en: 'What do you do?', pt: 'O que você faz? (qual é o seu trabalho?)', pic: '💼' },
          { en: "I'm a gardener.", pt: 'Eu sou jardineiro(a).', pic: '🌱' },
          { en: "I'm a landscaper.", pt: 'Eu sou paisagista.', pic: '🏡' },
          { en: "I'm an arborist.", pt: 'Eu sou arborista (cuido de árvores).', pic: '🌳' },
          { en: 'I work outdoors.', pt: 'Eu trabalho ao ar livre.', pic: '☀️' },
          { en: 'I take care of trees.', pt: 'Eu cuido de árvores.', pic: '🌲' },
          { en: 'I love plants.', pt: 'Eu amo plantas.', pic: '💚' },
        ],
        specials: [
          { q: SAY, say: 'Where are you from?', answer: "I'm from Brazil.", wrong: ["I'm thirty years old.", "I'm a gardener."] },
          { q: SAY, say: 'What do you do?', answer: "I'm a gardener.", wrong: ["I'm fine, thanks.", "I'm from Brazil."] },
          { q: SAY, say: 'How old are you?', answer: "I'm thirty years old.", wrong: ['I live in São Paulo.', "I'm an arborist."] },
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
              <tr><td>It is</td><td><b>It's</b></td><td>(coisa, planta, bicho) é / está</td></tr>
              <tr><td>We are</td><td><b>We're</b></td><td>nós somos / estamos</td></tr>
              <tr><td>They are</td><td><b>They're</b></td><td>eles / elas são, estão</td></tr></table>
              <p>💡 Só três formas: <b>am</b> (I), <b>is</b> (he, she, it), <b>are</b> (you, we, they).</p>`,
            examples: [
              { en: "He's a gardener.", pt: 'Ele é jardineiro.' },
              { en: "She's from Canada.", pt: 'Ela é do Canadá.' },
              { en: "It's a big tree.", pt: 'É uma árvore grande.' },
              { en: "They're arborists.", pt: 'Eles são arboristas.' },
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
              { en: "I'm forty.", pt: 'Eu tenho quarenta.' },
              { en: "She's twenty-five years old.", pt: 'Ela tem vinte e cinco anos.' },
            ],
          },
          {
            title: 'A / AN antes da profissão',
            html: `<p>Em inglês, a profissão sempre leva <b>a</b> ou <b>an</b> antes:</p>
              <table><tr><th>a + som de consoante</th><th>an + som de vogal</th></tr>
              <tr><td><b>a</b> gardener</td><td><b>an</b> arborist</td></tr>
              <tr><td><b>a</b> landscaper</td><td><b>an</b> engineer</td></tr></table>
              <p>❌ <s>I'm gardener.</s> &nbsp; ✅ <b>I'm a gardener.</b></p>`,
            examples: [
              { en: "I'm a gardener.", pt: 'Eu sou jardineiro(a).' },
              { en: "She's a landscaper.", pt: 'Ela é paisagista.' },
              { en: "He's an arborist.", pt: 'Ele é arborista.' },
            ],
          },
        ],
        quiz: [
          { gap: 'She ___ a landscaper.', pt: 'Ela é paisagista.', opts: ['is', 'are', 'am'], a: 'is', why: 'Com he / she / it usamos "is".' },
          { gap: 'They ___ from Brazil.', pt: 'Eles são do Brasil.', opts: ['are', 'is', 'am'], a: 'are', why: 'Com they / we / you usamos "are".' },
          { gap: 'I ___ forty years old.', pt: 'Eu tenho quarenta anos.', opts: ['am', 'have', 'is'], a: 'am', why: 'Idade usa TO BE: I am forty. Nunca "have".' },
          { gap: "I'm ___ arborist.", pt: 'Eu sou arborista.', opts: ['an', 'a', 'the'], a: 'an', why: '"Arborist" começa com som de vogal → an.' },
          { gap: "He's ___ gardener.", pt: 'Ele é jardineiro.', opts: ['a', 'an', 'are'], a: 'a', why: '"Gardener" começa com som de consoante → a.' },
          { gap: 'Where ___ you from?', pt: 'De onde você é?', opts: ['are', 'is', 'am'], a: 'are', why: 'Com "you" usamos "are": Where are you from?' },
          { order: 'I take care of trees.', pt: 'Eu cuido de árvores.' },
          { order: 'What do you do?', pt: 'O que você faz?' },
        ],
      },
      {
        id: 'listen', type: 'listen', title: { en: 'Listening: in the nursery', pt: 'Escuta: no viveiro de mudas' },
        scene: { en: 'Woody talks to Fern in the nursery.', pt: 'Woody conversa com a Fern no viveiro.' },
        lines: [
          { who: 'numbers', en: 'Hi, Fern! Where are you from?', pt: 'Oi, Fern! De onde você é?' },
          { who: 'Fern', en: "I'm from Canada. And you, Woody?", pt: 'Eu sou do Canadá. E você, Woody?' },
          { who: 'numbers', en: "I'm from China. But I live here now.", pt: 'Eu sou da China. Mas eu moro aqui agora.' },
          { who: 'Fern', en: 'How old are you?', pt: 'Quantos anos você tem?' },
          { who: 'numbers', en: "I'm forty years old. And you?", pt: 'Eu tenho quarenta anos. E você?' },
          { who: 'Fern', en: "I'm twenty-five.", pt: 'Eu tenho vinte e cinco.' },
          { who: 'numbers', en: 'What do you do, Fern?', pt: 'O que você faz, Fern?' },
          { who: 'Fern', en: "I'm a landscaper. I design gardens.", pt: 'Eu sou paisagista. Eu projeto jardins.' },
          { who: 'numbers', en: "Great! I'm an arborist. I take care of trees.", pt: 'Que legal! Eu sou arborista. Eu cuido de árvores.' },
          { who: 'Fern', en: 'My favorite color is green!', pt: 'Minha cor favorita é verde!' },
          { who: 'numbers', en: 'Me too!', pt: 'A minha também!' },
        ],
        questions: [
          { q: { en: 'Where is Fern from?', pt: 'De onde a Fern é?' }, opts: ['Canada', 'China', 'Brazil'], a: 'Canada' },
          { q: { en: 'How old is Fern?', pt: 'Quantos anos a Fern tem?' }, opts: ['twenty-five', 'forty', 'thirty'], a: 'twenty-five' },
          { q: { en: 'What does Fern do?', pt: 'O que a Fern faz?' }, opts: ["She's a landscaper.", "She's an arborist.", "She's a student."], a: "She's a landscaper." },
          { q: { en: 'What does Woody do?', pt: 'O que o Woody faz?' }, opts: ["He's an arborist.", "He's a landscaper.", "He's a teacher."], a: "He's an arborist." },
          { q: { en: "What is Fern's favorite color?", pt: 'Qual é a cor favorita da Fern?' }, opts: ['green', 'blue', 'red'], a: 'green' },
        ],
      },
      {
        id: 'talk', type: 'talk', partner: 'numbers', title: { en: 'Conversation', pt: 'Conversa com o Woody' },
        scene: { en: 'Woody wants to know you better.', pt: 'O Woody quer te conhecer melhor. Escolha a melhor resposta.' },
        turns: [
          { en: 'Hello, {name}! Can I ask you some questions?', pt: 'Olá! Posso te fazer algumas perguntas?', opts: [
            { en: 'Sure!', ok: true },
            { en: 'Yes, of course.', ok: true },
            { en: "I'm thirty.", why: 'Ele ainda não perguntou a idade. Diga: Sure! (Claro!)' }] },
          { en: 'Where are you from?', pt: 'De onde você é?', opts: [
            { en: "I'm from Brazil.", ok: true },
            { en: 'I from Brazil.', why: 'Falta o verbo: I\'M from Brazil.' },
            { en: "I'm a Brazil.", why: 'País não leva "a". Diga: I\'m from Brazil.' }] },
          { en: 'Nice! And where do you live?', pt: 'Legal! E onde você mora?', opts: [
            { en: 'I live in São Paulo.', ok: true },
            { en: "I'm live in São Paulo.", why: 'Aqui não tem "am": I live in São Paulo.' },
            { en: "I'm thirty years old.", why: 'Ele perguntou ONDE você mora (where do you live).' }] },
          { en: 'How old are you?', pt: 'Quantos anos você tem?', opts: [
            { en: "I'm thirty years old.", ok: true },
            { en: "I'm forty.", ok: true },
            { en: 'I have thirty years.', why: 'Idade usa to be: I\'m thirty.' }] },
          { en: 'What do you do?', pt: 'O que você faz?', opts: [
            { en: "I'm a gardener.", ok: true },
            { en: "I'm an arborist.", ok: true },
            { en: "I'm a landscaper.", ok: true },
            { en: "I'm gardener.", why: 'Falta o "a": I\'m A gardener.' }] },
          { en: "Wow! I'm an arborist too. What's your favorite color?", pt: 'Uau! Eu também sou arborista. Qual é a sua cor favorita?', opts: [
            { en: 'My favorite color is green.', ok: true },
            { en: 'My favorite color is blue.', ok: true },
            { en: "I'm green.", why: 'Isso é "eu sou verde" 😄. Diga: My favorite color is green.' }] },
        ],
      },
      {
        id: 'idcard', type: 'mission', at: 'mayor',
        title: { en: 'Mission: your work badge', pt: 'Missão: seu crachá de trabalho' },
        desc: 'Vá até o Sr. Park 👨‍💼 na praça central e responda as perguntas para fazer o seu crachá de trabalho.',
        talk: [
          { en: 'Good morning! Welcome to the Botanical Garden. I need some information for your work badge.', pt: 'Bom dia! Bem-vindo(a) ao Jardim Botânico. Preciso de algumas informações para o seu crachá.', opts: [
            { en: 'OK, no problem.', ok: true }, { en: "No, I'm fine.", why: '"I\'m fine" é "estou bem". Diga: OK, no problem.' }, { en: 'Good night!', why: 'Ele disse bom dia. Diga: OK, no problem.' }] },
          { en: "What's your name?", pt: 'Qual é o seu nome?', opts: [
            { en: 'My name is {name}.', ok: true }, { en: 'Your name is Park.', why: 'Diga o SEU nome: My name is...' }, { en: "I'm from {name}.", why: '"From" é para lugar. Diga: My name is...' }] },
          { en: 'Where are you from?', pt: 'De onde você é?', opts: [
            { en: "I'm from Brazil.", ok: true, save: ['from', 'Brazil'] },
            { en: "I'm from Portugal.", ok: true, save: ['from', 'Portugal'] },
            { en: "I'm from Angola.", ok: true, save: ['from', 'Angola'] },
            { en: 'I from Brazil.', why: 'Falta o verbo: I\'M from Brazil.' }] },
          { en: 'How old are you?', pt: 'Quantos anos você tem?', opts: [
            { en: "I'm twenty-five.", ok: true, save: ['age', '25'] },
            { en: "I'm forty.", ok: true, save: ['age', '40'] },
            { en: "I'm fifty.", ok: true, save: ['age', '50'] },
            { en: 'I have forty years.', why: 'Idade usa to be: I\'m forty.' }] },
          { en: 'And what do you do?', pt: 'E o que você faz?', opts: [
            { en: "I'm a gardener.", ok: true, save: ['job', 'Gardener 🌱'] },
            { en: "I'm a landscaper.", ok: true, save: ['job', 'Landscaper 🏡'] },
            { en: "I'm an arborist.", ok: true, save: ['job', 'Arborist 🌳'] },
            { en: "I'm a arborist.", why: '"Arborist" começa com vogal: I\'m AN arborist.' }] },
          { en: 'Thank you, {name}! Here is your badge. Welcome to the team!', pt: 'Obrigado! Aqui está o seu crachá. Bem-vindo(a) à equipe!', opts: [
            { en: 'Thank you very much!', ok: true }, { en: 'Please!', why: '"Please" é por favor. Agradeça: Thank you!' }, { en: 'Good night!', why: 'Agradeça: Thank you very much!' }] },
        ],
      },
    ],
  },
  // ======================================================================
  {
    id: 'u3', npc: 'fruits', icon: '🌱',
    title: { en: 'At the garden center', pt: 'Plantas, ferramentas e compras' },
    cando: 'Consigo dar nome às plantas e ferramentas e comprar o que preciso numa loja de jardinagem.',
    intro: { en: "Hi! I'm Daisy. Let's learn plants, fruits and tools. Then we go shopping at the garden center!", pt: 'Oi! Eu sou a Daisy. Vamos aprender plantas, frutas e ferramentas. Depois vamos às compras na loja de jardinagem!' },
    stages: [
      {
        id: 'plants', type: 'words', title: { en: 'Plants', pt: 'Plantas e partes da árvore' },
        items: [
          { en: 'tree', pt: 'árvore', pic: '🌳' },
          { en: 'flower', pt: 'flor', pic: '🌼' },
          { en: 'rose', pt: 'rosa (flor)', pic: '🌹' },
          { en: 'grass', pt: 'grama', pic: '🌿' },
          { en: 'leaf', pt: 'folha', pic: '🍃' },
          { en: 'seed', pt: 'semente' },
          { en: 'soil', pt: 'terra' },
          { en: 'root', pt: 'raiz' },
          { en: 'branch', pt: 'galho' },
          { en: 'trunk', pt: 'tronco' },
          { en: 'bush', pt: 'arbusto' },
          { en: 'hedge', pt: 'cerca viva' },
        ],
        specials: [
          { q: { en: 'How many trees?', pt: 'Quantas árvores?' }, show: '🌳🌳🌳', answer: 'three trees', wrong: ['two trees', 'three tree'] },
          { q: { en: 'What is this?', pt: 'O que é isto?' }, show: '🌹', answer: 'a rose', wrong: ['a tree', 'a leaf'] },
          { q: { en: 'It is under the ground. The tree drinks water with it.', pt: 'Fica embaixo da terra. A árvore bebe água por ela.' }, show: '🌳⬇️💧', answer: 'root', wrong: ['leaf', 'branch'] },
        ],
      },
      st('u3', 'fruits'),
      {
        id: 'tools', type: 'words', title: { en: 'Garden tools', pt: 'Ferramentas de jardim' },
        items: [
          { en: 'shovel', pt: 'pá' },
          { en: 'rake', pt: 'rastelo (ancinho)' },
          { en: 'hose', pt: 'mangueira' },
          { en: 'gloves', pt: 'luvas', pic: '🧤' },
          { en: 'wheelbarrow', pt: 'carrinho de mão' },
          { en: 'watering can', pt: 'regador' },
          { en: 'pot', pt: 'vaso', pic: '🏺' },
          { en: 'fertilizer', pt: 'adubo' },
        ],
        specials: [
          { q: { en: 'You dig a hole with a...', pt: 'Você cava um buraco com uma...' }, show: '🕳️', answer: 'shovel', wrong: ['hose', 'pot'] },
          { q: { en: 'You water the plants with a...', pt: 'Você rega as plantas com uma...' }, show: '💧🌱', answer: 'hose', wrong: ['rake', 'shovel'] },
        ],
      },
      {
        id: 'buying', type: 'words', title: { en: 'Buying things', pt: 'Comprando na loja' },
        items: [
          { en: 'Can I help you?', pt: 'Posso ajudar?', pic: '🙋' },
          { en: "I'm looking for a shovel.", pt: 'Estou procurando uma pá.', pic: '🔍' },
          { en: 'Do you have roses?', pt: 'Vocês têm rosas?', pic: '🌹' },
          { en: 'Yes, we do.', pt: 'Temos, sim.', pic: '👍' },
          { en: 'How many do you need?', pt: 'De quantos(as) você precisa?', pic: '🔢' },
          { en: 'I need two bags of soil.', pt: 'Eu preciso de dois sacos de terra.', pic: '🛍️' },
          { en: "I'll take it.", pt: 'Vou levar.', pic: '🛒' },
          { en: 'Anything else?', pt: 'Mais alguma coisa?', pic: '➕' },
          { en: "That's all, thanks.", pt: 'É só isso, obrigado(a).', pic: '✋' },
          { en: 'How much is it?', pt: 'Quanto custa?', pic: '💵' },
          { en: "It's ten dollars.", pt: 'Custa dez dólares.', pic: '🔟' },
          { en: 'Can I pay by card?', pt: 'Posso pagar com cartão?', pic: '💳' },
          { en: 'Here you are.', pt: 'Aqui está.', pic: '🤲' },
        ],
        specials: [
          { q: SAY, say: 'Can I help you?', answer: "Yes, please. I'm looking for a rake.", wrong: ["I'm fine, thanks.", 'Here you are.'] },
          { q: SAY, say: 'How many do you need?', answer: 'I need two, please.', wrong: ["It's ten dollars.", 'Yes, we do.'] },
          { q: SAY, say: 'Anything else?', answer: "No, that's all, thanks.", wrong: ['Nice to meet you.', 'Can I help you?'] },
        ],
      },
      {
        id: 'gram', type: 'grammar', title: { en: 'Plurals, how much / how many', pt: 'Plural, how much / how many' },
        cards: [
          {
            title: 'Um e vários: a / an e o plural',
            html: `<p><b>a</b> tree, <b>a</b> rose · <b>an</b> apple, <b>an</b> orange (som de vogal → an)</p>
              <table><tr><th>Um</th><th>Vários</th><th>Regra</th></tr>
              <tr><td>tree</td><td>tree<b>s</b></td><td>+ s</td></tr>
              <tr><td>bush · branch</td><td>bush<b>es</b> · branch<b>es</b></td><td>final sh / ch → + es</td></tr>
              <tr><td>leaf</td><td>lea<b>ves</b></td><td>f → ves</td></tr></table>
              <p>💡 No plural não se usa a / an: <b>two trees</b>.</p>`,
            examples: [
              { en: 'one tree, two trees', pt: 'uma árvore, duas árvores' },
              { en: 'one branch, three branches', pt: 'um galho, três galhos' },
              { en: 'The leaves are green.', pt: 'As folhas são verdes.' },
            ],
          },
          {
            title: 'HOW MUCH × HOW MANY',
            html: `<table><tr><td><b>How much</b> is it?</td><td>Quanto custa? (preço)</td></tr>
              <tr><td><b>How many</b> do you need?</td><td>Quantos você precisa? (quantidade, coisas que dá para contar)</td></tr></table>
              <p>💡 Resposta do preço: <b>It's</b> ten dollars. Resposta da quantidade: <b>I need</b> two.</p>`,
            examples: [
              { en: 'How much is the shovel?', pt: 'Quanto custa a pá?' },
              { en: "It's twelve dollars.", pt: 'Custa doze dólares.' },
              { en: 'How many bags do you need?', pt: 'De quantos sacos você precisa?' },
            ],
          },
          {
            title: 'Pedindo com educação',
            html: `<table><tr><td><b>I'm looking for</b> a rake.</td><td>Estou procurando um rastelo.</td></tr>
              <tr><td><b>I need</b> two bags of soil.</td><td>Preciso de dois sacos de terra.</td></tr>
              <tr><td><b>Can I have</b> a hose, <b>please</b>?</td><td>Pode me dar uma mangueira, por favor?</td></tr>
              <tr><td><b>Do you have</b> roses?</td><td>Vocês têm rosas?</td></tr></table>
              <p>💡 Termine com <b>please</b> e agradeça com <b>thank you</b>.</p>`,
            examples: [
              { en: "I'm looking for a rake.", pt: 'Estou procurando um rastelo.' },
              { en: 'Can I have a hose, please?', pt: 'Pode me dar uma mangueira, por favor?' },
              { en: 'Do you have gloves?', pt: 'Vocês têm luvas?' },
            ],
          },
        ],
        quiz: [
          { gap: 'I need ___ apple tree.', pt: 'Eu preciso de uma macieira.', opts: ['an', 'a', 'two'], a: 'an', why: '"Apple" começa com som de vogal → an.' },
          { gap: 'Two ___, please.', pt: 'Duas rosas, por favor.', opts: ['roses', 'rose', 'a rose'], a: 'roses', why: 'Mais de uma → plural com s: roses.' },
          { gap: 'The tree has big ___.', pt: 'A árvore tem galhos grandes.', opts: ['branches', 'branchs', 'branch'], a: 'branches', why: 'Final "ch" → + es: branches.' },
          { gap: 'The ___ are green.', pt: 'As folhas são verdes.', opts: ['leaves', 'leafs', 'leaf'], a: 'leaves', why: 'Leaf é irregular: f → ves = leaves.' },
          { gap: 'How ___ is the shovel?', pt: 'Quanto custa a pá?', opts: ['much', 'many', 'old'], a: 'much', why: 'Preço → How much.' },
          { gap: 'How ___ bags do you need?', pt: 'De quantos sacos você precisa?', opts: ['many', 'much', 'old'], a: 'many', why: 'Quantidade de coisas contáveis → How many.' },
          { order: "I'm looking for a rake.", pt: 'Estou procurando um rastelo.' },
          { order: 'Can I pay by card?', pt: 'Posso pagar com cartão?' },
        ],
      },
      {
        id: 'listen', type: 'listen', title: { en: 'Listening: at the garden center', pt: 'Escuta: na loja de jardinagem' },
        scene: { en: 'Twig is shopping at the garden center.', pt: 'O Twig está fazendo compras na loja de jardinagem.' },
        lines: [
          { who: 'bakery', en: 'Good morning! Can I help you?', pt: 'Bom dia! Posso ajudar?' },
          { who: 'Twig', en: "Yes, please. I'm looking for a shovel.", pt: 'Sim, por favor. Estou procurando uma pá.' },
          { who: 'bakery', en: 'The shovels are here. This one is twelve dollars.', pt: 'As pás estão aqui. Esta custa doze dólares.' },
          { who: 'Twig', en: "Great. I'll take it. Do you have gloves?", pt: 'Ótimo. Vou levar. Vocês têm luvas?' },
          { who: 'bakery', en: 'Yes, we do. How many do you need?', pt: 'Temos, sim. De quantas você precisa?' },
          { who: 'Twig', en: 'Two pairs, please. And three bags of soil.', pt: 'Dois pares, por favor. E três sacos de terra.' },
          { who: 'bakery', en: 'Anything else?', pt: 'Mais alguma coisa?' },
          { who: 'Twig', en: "No, that's all, thanks. How much is it?", pt: 'Não, é só isso, obrigado. Quanto custa?' },
          { who: 'bakery', en: "It's thirty dollars.", pt: 'São trinta dólares.' },
          { who: 'Twig', en: 'Can I pay by card?', pt: 'Posso pagar com cartão?' },
          { who: 'bakery', en: 'Sure. Here you are. Have a nice day!', pt: 'Claro. Aqui está. Tenha um bom dia!' },
        ],
        questions: [
          { q: { en: 'What is Twig looking for?', pt: 'O que o Twig está procurando?' }, opts: ['a shovel', 'a rake', 'a hose'], a: 'a shovel' },
          { q: { en: 'How much is the shovel?', pt: 'Quanto custa a pá?' }, opts: ['twelve dollars', 'ten dollars', 'twenty dollars'], a: 'twelve dollars' },
          { q: { en: 'How many bags of soil?', pt: 'Quantos sacos de terra?' }, opts: ['three', 'two', 'five'], a: 'three' },
          { q: { en: 'How much is everything?', pt: 'Quanto custa tudo?' }, opts: ['thirty dollars', 'thirteen dollars', 'twelve dollars'], a: 'thirty dollars' },
          { q: { en: 'How does Twig pay?', pt: 'Como o Twig paga?' }, opts: ['by card', 'with apples', 'with flowers'], a: 'by card' },
        ],
      },
      {
        id: 'talk', type: 'talk', partner: 'fruits', title: { en: 'Role-play: the store', pt: 'Conversa: brincando de loja' },
        scene: { en: 'Daisy is the clerk. You are the customer.', pt: 'A Daisy é a vendedora. Você é o(a) cliente.' },
        turns: [
          { en: 'Hello! Welcome to the garden center. Can I help you?', pt: 'Olá! Bem-vindo(a) à loja de jardinagem. Posso ajudar?', opts: [
            { en: "Yes, please. I'm looking for a rake.", ok: true },
            { en: "Yes, I'm a rake.", why: 'Isso é "eu sou um rastelo" 😄. Diga: I\'m LOOKING FOR a rake.' },
            { en: "I'm fine, thanks.", why: 'Ela ofereceu ajuda. Diga o que você procura.' }] },
          { en: 'The rakes are here. This one is nine dollars.', pt: 'Os rastelos estão aqui. Este custa nove dólares.', opts: [
            { en: "Great. I'll take it.", ok: true },
            { en: "I'm nine.", why: 'Isso é a sua idade 😄. Para levar: I\'ll take it.' },
            { en: 'How old is it?', why: '"How old" é para idade. Para levar: I\'ll take it.' }] },
          { en: 'Anything else?', pt: 'Mais alguma coisa?', opts: [
            { en: 'Yes. Do you have roses?', ok: true },
            { en: 'Yes. Do you are roses?', why: 'Para perguntar se tem: Do you HAVE roses?' },
            { en: 'Yes, you do.', why: 'Diga o que mais você quer: Do you have roses?' }] },
          { en: 'Yes, we do! Red, pink and white. How many do you need?', pt: 'Temos, sim! Vermelhas, cor-de-rosa e brancas. De quantas você precisa?', opts: [
            { en: 'I need three red roses.', ok: true },
            { en: 'Three, please.', ok: true },
            { en: 'I need three red rose.', why: 'Três → plural: three red roses.' },
            { en: "It's three dollars.", why: 'Ela perguntou a QUANTIDADE (how many), não o preço.' }] },
          { en: 'Here you are. Anything else?', pt: 'Aqui está. Mais alguma coisa?', opts: [
            { en: "No, that's all, thanks. How much is it?", ok: true },
            { en: "No, that's all. How many is it?", why: 'Preço → How MUCH is it?' },
            { en: 'Yes, we do.', why: 'Quem diz "Yes, we do" é a loja. Diga: That\'s all, thanks.' }] },
          { en: "It's twenty-one dollars.", pt: 'São vinte e um dólares.', opts: [
            { en: 'Can I pay by card?', ok: true },
            { en: 'Here you are.', ok: true },
            { en: "I'm twenty-one.", why: 'Isso é idade. Para pagar: Can I pay by card? / Here you are.' }] },
          { en: 'Sure! Thank you. Have a nice day!', pt: 'Claro! Obrigada. Tenha um bom dia!', opts: [
            { en: 'Thank you! You too!', ok: true },
            { en: 'Yes, please.', why: 'Ela desejou bom dia. Responda: Thank you! You too!' },
            { en: 'Nice to meet you.', why: 'Isso se diz ao conhecer alguém. Aqui: Thank you! You too!' }] },
        ],
      },
      {
        id: 'shop', type: 'mission', at: 'bakery',
        title: { en: 'Mission: buy your tools', pt: 'Missão: compre suas ferramentas' },
        desc: 'Vá até a Sra. Maple 👵 no GARDEN CENTER e compre o que você precisa para trabalhar.',
        talk: [
          { en: 'Good afternoon, {name}! Can I help you?', pt: 'Boa tarde! Posso ajudar?', opts: [
            { en: "Yes, please. I'm looking for a shovel.", ok: true },
            { en: 'Good afternoon. I need a shovel, please.', ok: true },
            { en: "I'm a shovel.", why: 'Isso é "eu sou uma pá" 😄. Diga: I\'m looking for a shovel.' }] },
          { en: 'Sure. A big shovel or a small shovel?', pt: 'Claro. Uma pá grande (big) ou uma pá pequena (small)?', opts: [
            { en: 'A big shovel, please.', ok: true },
            { en: 'A small shovel, please.', ok: true },
            { en: 'Yes, please.', why: 'Ela pediu para você ESCOLHER: big ou small?' }] },
          { en: 'Here you are. Do you need gloves?', pt: 'Aqui está. Você precisa de luvas?', opts: [
            { en: 'Yes, please. One pair.', ok: true },
            { en: 'No, thank you.', ok: true },
            { en: 'Yes, I am.', why: 'Pergunta com "Do you...?" → Yes, please / No, thank you.' }] },
          { en: 'Anything else?', pt: 'Mais alguma coisa?', opts: [
            { en: 'Yes. I need two bags of soil.', ok: true },
            { en: 'Yes. I need two bag of soil.', why: 'Dois → plural: two bagS of soil.' },
            { en: 'Yes. How many is it?', why: 'Diga o que você precisa: I need two bags of soil.' }] },
          { en: 'OK! Is that all?', pt: 'OK! É só isso?', opts: [
            { en: "Yes, that's all. How much is it?", ok: true },
            { en: "Yes, that's all. How old is it?", why: '"How old" é idade. Preço → How much is it?' },
            { en: "Yes, that's all. How much are you?", why: 'Você quer o preço das coisas: How much is IT?' }] },
          { en: "It's twenty-five dollars.", pt: 'São vinte e cinco dólares.', opts: [
            { en: 'Can I pay by card?', ok: true },
            { en: 'Here you are.', ok: true },
            { en: "It's ten dollars.", why: 'O preço quem diz é ela. Agora pague: Can I pay by card?' }] },
          { en: 'Of course! Thank you, {name}. Good luck with your garden!', pt: 'Claro! Obrigada. Boa sorte com o seu jardim!', opts: [
            { en: 'Thank you! Goodbye!', ok: true },
            { en: 'Please!', why: '"Please" é por favor. Agradeça: Thank you!' },
            { en: 'Can I help you?', why: 'Quem oferece ajuda é a vendedora. Agradeça e se despeça.' }] },
        ],
      },
    ],
  },
  // ======================================================================
  {
    id: 'u4', npc: 'colors', icon: '🌳',
    title: { en: 'Working in the garden', pt: 'Trabalhando: jardim, paisagismo e árvores' },
    cando: 'Consigo dizer o que estou fazendo, o que sei fazer e combinar um serviço com um cliente.',
    intro: { en: "Hello! I'm Cedar. Time to work! Let's learn to talk about the job and talk to a client.", pt: 'Olá! Eu sou o Cedar. Hora de trabalhar! Vamos aprender a falar do serviço e a conversar com um cliente.' },
    stages: [
      {
        id: 'verbs', type: 'words', title: { en: 'Garden jobs', pt: 'Serviços do jardim (ações)' },
        items: [
          { en: 'plant a tree', pt: 'plantar uma árvore', pic: '🌱' },
          { en: 'water the plants', pt: 'regar as plantas', pic: '💧' },
          { en: 'mow the lawn', pt: 'cortar a grama' },
          { en: 'prune the roses', pt: 'podar as roseiras', pic: '✂️' },
          { en: 'trim the hedge', pt: 'aparar a cerca viva' },
          { en: 'cut the branch', pt: 'cortar o galho' },
          { en: 'dig a hole', pt: 'cavar um buraco', pic: '🕳️' },
          { en: 'rake the leaves', pt: 'juntar as folhas (com o rastelo)', pic: '🍂' },
          { en: 'pull the weeds', pt: 'arrancar o mato (ervas daninhas)' },
          { en: 'climb the tree', pt: 'subir na árvore', pic: '🧗' },
        ],
        specials: [
          { q: { en: 'The grass is very tall. What do you do?', pt: 'A grama está muito alta. O que você faz?' }, show: '🌿🌿🌿', answer: 'mow the lawn', wrong: ['dig a hole', 'climb the tree'] },
          { q: { en: 'The plants are dry. What do you do?', pt: 'As plantas estão secas. O que você faz?' }, show: '🌱☀️', answer: 'water the plants', wrong: ['cut the branch', 'rake the leaves'] },
          { q: { en: 'The leaves are on the ground. What do you do?', pt: 'As folhas estão no chão. O que você faz?' }, show: '🍂🍂🍂', answer: 'rake the leaves', wrong: ['plant a tree', 'water the plants'] },
        ],
      },
      {
        id: 'gear', type: 'words', title: { en: 'Pro tools and safety', pt: 'Ferramentas de profissional e segurança' },
        items: [
          { en: 'pruning shears', pt: 'tesoura de poda', pic: '✂️' },
          { en: 'lawn mower', pt: 'cortador de grama' },
          { en: 'chainsaw', pt: 'motosserra' },
          { en: 'ladder', pt: 'escada' },
          { en: 'rope', pt: 'corda' },
          { en: 'helmet', pt: 'capacete', pic: '⛑️' },
          { en: 'safety glasses', pt: 'óculos de proteção', pic: '🥽' },
          { en: 'boots', pt: 'botas', pic: '🥾' },
        ],
        specials: [
          { q: { en: 'You climb a tree. You need a helmet and a...', pt: 'Você sobe na árvore. Precisa de capacete e de uma...' }, show: '🌳🧗', answer: 'rope', wrong: ['lawn mower', 'boots'] },
          { q: { en: 'You mow the lawn with a...', pt: 'Você corta a grama com um...' }, show: '🌿🌿', answer: 'lawn mower', wrong: ['ladder', 'helmet'] },
        ],
      },
      {
        id: 'design', type: 'words', title: { en: 'Landscaping', pt: 'Paisagismo: partes do jardim' },
        items: [
          { en: 'garden', pt: 'jardim', pic: '🏡' },
          { en: 'lawn', pt: 'gramado' },
          { en: 'flower bed', pt: 'canteiro de flores', pic: '🌷' },
          { en: 'path', pt: 'caminho' },
          { en: 'fence', pt: 'cerca' },
          { en: 'pond', pt: 'lago (pequeno)' },
          { en: 'fountain', pt: 'fonte', pic: '⛲' },
          { en: 'bench', pt: 'banco (de sentar)' },
          { en: 'stone', pt: 'pedra' },
          { en: 'shade', pt: 'sombra' },
        ],
        specials: [
          { q: { en: 'Fish live here.', pt: 'Os peixes vivem aqui.' }, show: '🐟💧', answer: 'pond', wrong: ['fence', 'bench'] },
          { q: { en: 'A big tree gives you...', pt: 'Uma árvore grande te dá...' }, show: '🌳😌', answer: 'shade', wrong: ['stone', 'path'] },
        ],
      },
      {
        id: 'job', type: 'words', title: { en: 'Talking to a client', pt: 'Falando com o cliente' },
        items: [
          { en: 'Can you prune this tree?', pt: 'Você pode podar esta árvore?', pic: '🌳' },
          { en: 'Sure, no problem.', pt: 'Claro, sem problema.', pic: '👍' },
          { en: 'When can you start?', pt: 'Quando você pode começar?', pic: '📅' },
          { en: 'I can start tomorrow.', pt: 'Posso começar amanhã.', pic: '🌅' },
          { en: 'How long does it take?', pt: 'Quanto tempo demora?', pic: '⏱️' },
          { en: 'It takes two hours.', pt: 'Demora duas horas.', pic: '🕑' },
          { en: 'This tree is sick.', pt: 'Esta árvore está doente.', pic: '🤒' },
          { en: 'This branch is dangerous.', pt: 'Este galho é perigoso.', pic: '⚠️' },
          { en: 'Be careful!', pt: 'Cuidado!', pic: '🚧' },
          { en: 'I need a ladder.', pt: 'Eu preciso de uma escada.', pic: '🙋' },
          { en: "It's done.", pt: 'Está pronto.', pic: '✅' },
          { en: 'It looks great!', pt: 'Ficou ótimo!', pic: '🤩' },
        ],
        specials: [
          { q: SAY, say: 'When can you start?', answer: 'I can start tomorrow.', wrong: ['It takes two hours.', "It's ten dollars."] },
          { q: SAY, say: 'How long does it take?', answer: 'It takes two hours.', wrong: ['I can start tomorrow.', 'Sure, no problem.'] },
          { q: SAY, say: 'Can you prune this tree?', answer: 'Sure, no problem.', wrong: ['It looks great!', "I'm fine, thanks."] },
        ],
      },
      {
        id: 'gram', type: 'grammar', title: { en: "I'm working / I can", pt: 'Estou fazendo (-ing) / eu consigo (can)' },
        cards: [
          {
            title: 'O que está acontecendo AGORA: am / is / are + verbo-ING',
            html: `<table><tr><td><b>I'm</b> water<b>ing</b> the plants.</td><td>Estou regando as plantas.</td></tr>
              <tr><td><b>He's</b> cutt<b>ing</b> the branch.</td><td>Ele está cortando o galho.</td></tr>
              <tr><td><b>They're</b> plant<b>ing</b> trees.</td><td>Eles estão plantando árvores.</td></tr></table>
              <p>✏️ Ortografia: cut → cu<b>tt</b>ing · dig → di<b>gg</b>ing · rake → rak<b>ing</b> · prune → prun<b>ing</b></p>
              <p>💡 Pergunta: <b>What are you doing?</b> = O que você está fazendo?</p>`,
            examples: [
              { en: 'What are you doing?', pt: 'O que você está fazendo?' },
              { en: "I'm watering the plants.", pt: 'Estou regando as plantas.' },
              { en: "She's pruning the roses.", pt: 'Ela está podando as roseiras.' },
              { en: "We're digging a hole.", pt: 'Estamos cavando um buraco.' },
            ],
          },
          {
            title: 'CAN = conseguir / poder',
            html: `<p><b>can</b> + verbo simples (sem "to", sem "ing"). É igual para todas as pessoas.</p>
              <table><tr><td><b>Can you</b> prune this tree?</td><td>Você pode podar esta árvore?</td></tr>
              <tr><td>Yes, <b>I can</b>. / No, <b>I can't</b>.</td><td>Posso. / Não posso.</td></tr>
              <tr><td><b>I can</b> start tomorrow.</td><td>Posso começar amanhã.</td></tr></table>
              <p>❌ <s>I can to start.</s> &nbsp; ✅ <b>I can start.</b></p>`,
            examples: [
              { en: 'Can you cut this branch?', pt: 'Você pode cortar este galho?' },
              { en: 'Yes, I can.', pt: 'Sim, posso.' },
              { en: "No, I can't. It's dangerous.", pt: 'Não posso. É perigoso.' },
            ],
          },
          {
            title: 'Perguntas do serviço',
            html: `<table><tr><td><b>When</b> can you start?</td><td>Quando você pode começar?</td></tr>
              <tr><td><b>How long</b> does it take?</td><td>Quanto tempo demora?</td></tr>
              <tr><td><b>How much</b> is it?</td><td>Quanto custa?</td></tr></table>
              <p>💡 Respostas: I can start <b>tomorrow</b>. · It takes <b>two hours</b>. · It's <b>fifty dollars</b>.</p>`,
            examples: [
              { en: 'When can you start?', pt: 'Quando você pode começar?' },
              { en: 'How long does it take?', pt: 'Quanto tempo demora?' },
              { en: 'It takes three hours.', pt: 'Demora três horas.' },
            ],
          },
        ],
        quiz: [
          { gap: "I'm ___ the plants.", pt: 'Estou regando as plantas.', opts: ['watering', 'water', 'waters'], a: 'watering', why: 'Agora = am + verbo-ING: I\'m watering.' },
          { gap: 'He ___ cutting the branch.', pt: 'Ele está cortando o galho.', opts: ['is', 'are', 'am'], a: 'is', why: 'Com "he" usamos "is": He is cutting.' },
          { gap: "They're ___ a hole.", pt: 'Eles estão cavando um buraco.', opts: ['digging', 'diging', 'dig'], a: 'digging', why: 'Dig dobra o G: digging.' },
          { gap: '___ you prune this tree?', pt: 'Você pode podar esta árvore?', opts: ['Can', 'Are', 'Is'], a: 'Can', why: 'Para pedir um serviço: Can you...?' },
          { gap: 'Yes, I ___.', pt: 'Sim, eu posso.', opts: ['can', 'am', 'do'], a: 'can', why: 'Pergunta com CAN → resposta com CAN: Yes, I can.' },
          { gap: 'I can ___ tomorrow.', pt: 'Posso começar amanhã.', opts: ['start', 'starting', 'to start'], a: 'start', why: 'Depois de CAN o verbo fica simples: can start.' },
          { gap: 'How ___ does it take?', pt: 'Quanto tempo demora?', opts: ['long', 'old', 'many'], a: 'long', why: 'Tempo de duração → How long.' },
          { order: 'What are you doing?', pt: 'O que você está fazendo?' },
          { order: 'It takes two hours.', pt: 'Demora duas horas.' },
        ],
      },
      {
        id: 'listen', type: 'listen', title: { en: 'Listening: a client calls', pt: 'Escuta: uma cliente pede um serviço' },
        scene: { en: 'Lily has a problem in her garden. She talks to Cedar.', pt: 'A Lily tem um problema no jardim dela. Ela fala com o Cedar.' },
        lines: [
          { who: 'shop', en: 'Hi, Cedar! Can you help me? I have a big tree in my garden.', pt: 'Oi, Cedar! Pode me ajudar? Eu tenho uma árvore grande no meu jardim.' },
          { who: 'colors', en: "Sure! What's the problem?", pt: 'Claro! Qual é o problema?' },
          { who: 'shop', en: "One branch is dangerous. It's over my house.", pt: 'Um galho é perigoso. Ele está em cima da minha casa.' },
          { who: 'colors', en: 'OK. I can cut the branch. I need a ladder and a rope.', pt: 'OK. Eu posso cortar o galho. Preciso de uma escada e de uma corda.' },
          { who: 'shop', en: 'Can you prune the roses too?', pt: 'Você pode podar as roseiras também?' },
          { who: 'colors', en: 'Yes, I can. No problem.', pt: 'Posso, sim. Sem problema.' },
          { who: 'shop', en: 'When can you start?', pt: 'Quando você pode começar?' },
          { who: 'colors', en: 'I can start tomorrow morning.', pt: 'Posso começar amanhã de manhã.' },
          { who: 'shop', en: 'How long does it take?', pt: 'Quanto tempo demora?' },
          { who: 'colors', en: 'It takes three hours.', pt: 'Demora três horas.' },
          { who: 'shop', en: 'And how much is it?', pt: 'E quanto custa?' },
          { who: 'colors', en: "It's fifty dollars.", pt: 'São cinquenta dólares.' },
          { who: 'shop', en: 'Great! See you tomorrow!', pt: 'Ótimo! Até amanhã!' },
        ],
        questions: [
          { q: { en: 'What is the problem?', pt: 'Qual é o problema?' }, opts: ['A branch is dangerous.', 'The tree is small.', 'The roses are sick.'], a: 'A branch is dangerous.' },
          { q: { en: 'What does Cedar need?', pt: 'Do que o Cedar precisa?' }, opts: ['a ladder and a rope', 'a shovel and a rake', 'a hose and a pot'], a: 'a ladder and a rope' },
          { q: { en: 'When can Cedar start?', pt: 'Quando o Cedar pode começar?' }, opts: ['tomorrow morning', 'today', 'tomorrow night'], a: 'tomorrow morning' },
          { q: { en: 'How long does it take?', pt: 'Quanto tempo demora?' }, opts: ['three hours', 'two hours', 'thirteen hours'], a: 'three hours' },
          { q: { en: 'How much is it?', pt: 'Quanto custa?' }, opts: ['fifty dollars', 'fifteen dollars', 'five dollars'], a: 'fifty dollars' },
        ],
      },
      {
        id: 'talk', type: 'talk', partner: 'colors', title: { en: 'Conversation: at work', pt: 'Conversa: no trabalho com o Cedar' },
        scene: { en: 'You are working with Cedar in the garden.', pt: 'Você está trabalhando com o Cedar no jardim.' },
        turns: [
          { en: 'Good morning, {name}! Are you ready to work?', pt: 'Bom dia! Pronto(a) para trabalhar?', opts: [
            { en: 'Yes, I am!', ok: true },
            { en: "Yes, I'm ready!", ok: true },
            { en: 'Yes, I ready.', why: 'Falta o verbo: I\'M ready.' }] },
          { en: 'Great. What are you doing now?', pt: 'Ótimo. O que você está fazendo agora?', opts: [
            { en: "I'm watering the plants.", ok: true },
            { en: 'I watering the plants.', why: 'Falta o "am": I\'M watering.' },
            { en: "I'm water the plants.", why: 'Falta o "ing": I\'m waterING.' }] },
          { en: 'Good. Can you mow the lawn after that?', pt: 'Bom. Você pode cortar a grama depois?', opts: [
            { en: 'Sure, no problem.', ok: true },
            { en: 'Yes, I can.', ok: true },
            { en: 'Yes, I am.', why: 'Pergunta com CAN → Yes, I CAN.' }] },
          { en: 'Look at this tree. This branch is dangerous.', pt: 'Olhe esta árvore. Este galho é perigoso.', opts: [
            { en: 'I can cut it. I need a ladder.', ok: true },
            { en: 'I can to cut it. I need a ladder.', why: 'Depois de CAN não tem "to": I can cut it.' },
            { en: 'It looks great!', why: 'Um galho perigoso não está ótimo 😅. Diga: I can cut it.' }] },
          { en: 'Here is the ladder. Be careful!', pt: 'Aqui está a escada. Cuidado!', opts: [
            { en: "Thanks! I'm cutting the branch now.", ok: true },
            { en: 'Thanks! I cutting the branch now.', why: 'Falta o "am": I\'M cutting.' },
            { en: "Thanks! I'm cut the branch now.", why: 'Falta o "ing": I\'m cuttING.' }] },
          { en: 'How long does it take?', pt: 'Quanto tempo demora?', opts: [
            { en: 'It takes one hour.', ok: true },
            { en: 'I can start tomorrow.', why: 'Ele perguntou quanto tempo DEMORA: It takes one hour.' },
            { en: "It's one dollar.", why: 'Isso é preço. Tempo: It takes one hour.' }] },
          { en: "Wow! It's done. It looks great, {name}!", pt: 'Uau! Está pronto. Ficou ótimo!', opts: [
            { en: 'Thank you, Cedar!', ok: true },
            { en: 'Be careful!', why: 'O serviço já acabou. Agradeça: Thank you!' },
            { en: 'Can I help you?', why: 'Ele te elogiou. Agradeça: Thank you!' }] },
        ],
      },
      {
        id: 'client', type: 'mission', at: 'mayor',
        title: { en: 'Mission: your first client', pt: 'Missão: seu primeiro cliente' },
        desc: 'O Sr. Park 👨‍💼, na praça central, tem um serviço para você. Combine tudo com ele em inglês!',
        talk: [
          { en: 'Hello, {name}! I have a job for you. Do you have a minute?', pt: 'Olá! Tenho um serviço para você. Você tem um minuto?', opts: [
            { en: 'Sure! How can I help you?', ok: true },
            { en: 'Yes, of course.', ok: true },
            { en: "I'm a minute.", why: 'Isso é "eu sou um minuto" 😄. Diga: Sure! / Yes, of course.' }] },
          { en: 'This big tree is sick. And one branch is dangerous. Can you cut the branch?', pt: 'Esta árvore grande está doente. E um galho é perigoso. Você pode cortar o galho?', opts: [
            { en: 'Yes, I can. No problem.', ok: true },
            { en: 'Yes, I am.', why: 'Pergunta com CAN → Yes, I CAN.' },
            { en: 'Yes, I can to cut.', why: 'Depois de CAN não tem "to": I can cut.' }] },
          { en: 'Great! Can you prune the roses and trim the hedge too?', pt: 'Ótimo! Você pode podar as roseiras e aparar a cerca viva também?', opts: [
            { en: 'Sure, no problem.', ok: true },
            { en: 'Yes, I can do that.', ok: true },
            { en: 'Yes, I pruning.', why: 'Para dizer que pode: Yes, I can. / Sure, no problem.' }] },
          { en: 'When can you start?', pt: 'Quando você pode começar?', opts: [
            { en: 'I can start tomorrow morning.', ok: true },
            { en: 'I can start today.', ok: true },
            { en: 'It takes tomorrow.', why: '"It takes" é para duração. Aqui: I can start tomorrow.' }] },
          { en: 'How long does it take?', pt: 'Quanto tempo demora?', opts: [
            { en: 'It takes three hours.', ok: true },
            { en: "It's three dollars.", why: 'Isso é preço. Duração: It takes three hours.' },
            { en: 'I can start three hours.', why: 'Duração: It TAKES three hours.' }] },
          { en: 'And how much is it?', pt: 'E quanto custa?', opts: [
            { en: "It's fifty dollars.", ok: true },
            { en: "It's forty dollars.", ok: true },
            { en: 'It takes fifty dollars.', why: 'Preço: IT\'S fifty dollars.' },
            { en: "I'm fifty.", why: 'Isso é idade 😄. Preço: It\'s fifty dollars.' }] },
          { en: 'Perfect! Do you need a ladder?', pt: 'Perfeito! Você precisa de uma escada?', opts: [
            { en: 'Yes, please. I need a ladder and a rope.', ok: true },
            { en: 'No, thank you. I have a ladder.', ok: true },
            { en: "Yes, I'm a ladder.", why: 'Isso é "eu sou uma escada" 😄. Diga: I NEED a ladder.' }] },
          { en: 'Thank you, {name}. You are a great gardener!', pt: 'Obrigado. Você é um(a) ótimo(a) jardineiro(a)!', opts: [
            { en: 'Thank you very much! See you tomorrow!', ok: true },
            { en: "It's done.", why: 'O serviço ainda não foi feito. Agradeça e diga: See you tomorrow!' },
            { en: 'Be careful!', why: 'Ele te elogiou. Agradeça: Thank you very much!' }] },
        ],
      },
    ],
  },
];
