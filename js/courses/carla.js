// Módulo da CARLA — inglês (nível A1) com o tema da Bíblia: cumprimentos e bênçãos, falar de si,
// comida e partilha, descrever pessoas — e uma historinha da Bíblia por unidade
// (a Criação, a Arca de Noé, os cinco pães e dois peixes, Davi e Golias).
// As histórias são recontadas com palavras simples, no presente, para quem está começando.
// Mesmo formato do módulo do Junior (veja o topo de courses/junior.js).
// Cenário: Vila da Paz (js/themes.js → carla).
import { UNITS as J } from './junior.js';

// etapas neutras do curso do Junior (cumprimentos, números, cores, comidas, frutas...) reaproveitadas aqui
const st = (u, s) => J.find(x => x.id === u).stages.find(x => x.id === s);

const SAY = { en: 'Someone says this. What do you answer?', pt: 'Alguém diz isto. O que você responde?' };

export const UNITS = [
  // ======================================================================
  {
    id: 'u1', npc: 'greet', icon: '👋',
    title: { en: 'Hello and blessings', pt: 'Olá! Cumprimentos e bênçãos' },
    cando: 'Consigo cumprimentar, me apresentar, perguntar como a pessoa está e desejar uma bênção.',
    intro: { en: "Hello! Peace be with you! I'm Sister Grace. Let's learn to say hello. Then I tell you a story about God!", pt: 'Olá! A paz esteja com você! Eu sou a Irmã Grace. Vamos aprender a cumprimentar. Depois eu conto uma história sobre Deus!' },
    stages: [
      st('u1', 'greet'),
      st('u1', 'intro'),
      {
        id: 'faith', type: 'words', title: { en: 'Words of faith', pt: 'Palavras de fé e bênçãos' },
        items: [
          { en: 'God', pt: 'Deus' },
          { en: 'Bible', pt: 'Bíblia', pic: '📖' },
          { en: 'church', pt: 'igreja', pic: '⛪' },
          { en: 'pray', pt: 'orar / rezar', pic: '🙏' },
          { en: 'love', pt: 'amor / amar', pic: '❤️' },
          { en: 'peace', pt: 'paz', pic: '🕊️' },
          { en: 'Amen.', pt: 'Amém.' },
          { en: 'Thank God!', pt: 'Graças a Deus!', pic: '🙌' },
          { en: 'God bless you.', pt: 'Deus te abençoe.', pic: '✨' },
          { en: 'Peace be with you.', pt: 'A paz esteja com você.', pic: '🤝' },
          { en: 'God is good.', pt: 'Deus é bom.', pic: '🌟' },
          { en: 'Have a blessed day.', pt: 'Tenha um dia abençoado.', pic: '🌅' },
        ],
        specials: [
          { q: SAY, say: 'God bless you!', answer: 'God bless you too!', wrong: ['Good night!', "I'm fine, thanks."] },
          { q: SAY, say: 'How are you?', answer: "I'm fine, thank God!", wrong: ['Amen.', 'Peace be with you.'] },
          { q: { en: 'People pray and sing together here.', pt: 'As pessoas oram e cantam juntas aqui.' }, show: '🙏🎶', answer: 'church', wrong: ['peace', 'love'] },
        ],
      },
      st('u1', 'gram'),
      {
        id: 'world', type: 'words', title: { en: "God's world", pt: 'O mundo que Deus fez' },
        items: [
          { en: 'light', pt: 'luz', pic: '💡' },
          { en: 'day', pt: 'dia', pic: '🌅' },
          { en: 'night', pt: 'noite', pic: '🌃' },
          { en: 'sky', pt: 'céu', pic: '☁️' },
          { en: 'sea', pt: 'mar', pic: '🌊' },
          { en: 'land', pt: 'terra (chão, terra firme)', pic: '⛰️' },
          { en: 'sun', pt: 'sol', pic: '☀️' },
          { en: 'moon', pt: 'lua', pic: '🌙' },
          { en: 'star', pt: 'estrela', pic: '⭐' },
          { en: 'plant', pt: 'planta', pic: '🌱' },
          { en: 'man', pt: 'homem', pic: '👨' },
          { en: 'woman', pt: 'mulher', pic: '👩' },
        ],
        specials: [
          { q: { en: 'It is in the sky at night.', pt: 'Fica no céu à noite.' }, show: '🌃👀', answer: 'moon', wrong: ['sun', 'sea'] },
          { q: { en: 'Fish live here.', pt: 'Os peixes vivem aqui.' }, show: '🐟🐠', answer: 'sea', wrong: ['sky', 'land'] },
        ],
      },
      {
        id: 'story', type: 'listen', story: true, title: { en: 'Story: God makes the world', pt: 'História: Deus faz o mundo (a Criação)' },
        scene: { en: 'Sister Grace tells the first story of the Bible.', pt: 'A Irmã Grace conta a primeira história da Bíblia.' },
        lines: [
          { who: 'greet', en: 'In the beginning, there is no light. Everything is dark.', pt: 'No princípio, não há luz. Tudo é escuro.' },
          { who: 'greet', en: 'God says, "Light!" And there is light.', pt: 'Deus diz: "Luz!" E a luz aparece.' },
          { who: 'greet', en: 'God makes the day and the night.', pt: 'Deus faz o dia e a noite.' },
          { who: 'greet', en: 'God makes the sky, the sea and the land.', pt: 'Deus faz o céu, o mar e a terra.' },
          { who: 'greet', en: 'God makes plants and trees.', pt: 'Deus faz as plantas e as árvores.' },
          { who: 'greet', en: 'God makes the sun, the moon and the stars.', pt: 'Deus faz o sol, a lua e as estrelas.' },
          { who: 'greet', en: 'God makes fish, birds and all the animals.', pt: 'Deus faz os peixes, os pássaros e todos os animais.' },
          { who: 'greet', en: 'Then God makes a man and a woman.', pt: 'Depois Deus faz um homem e uma mulher.' },
          { who: 'greet', en: 'God looks at everything. It is very good!', pt: 'Deus olha para tudo. É muito bom!' },
          { who: 'greet', en: 'On day seven, God rests.', pt: 'No sétimo dia, Deus descansa.' },
        ],
        questions: [
          { q: { en: 'What is there in the beginning?', pt: 'O que há no princípio?' }, opts: ['no light', 'many stars', 'a big sun'], a: 'no light' },
          { q: { en: 'Who makes the sun, the moon and the stars?', pt: 'Quem faz o sol, a lua e as estrelas?' }, opts: ['God', 'a man', 'a woman'], a: 'God' },
          { q: { en: 'What does God make after the animals?', pt: 'O que Deus faz depois dos animais?' }, opts: ['a man and a woman', 'the sea', 'the night'], a: 'a man and a woman' },
          { q: { en: 'How is everything?', pt: 'Como tudo ficou?' }, opts: ['very good', 'very bad', 'very small'], a: 'very good' },
          { q: { en: 'What does God do on day seven?', pt: 'O que Deus faz no sétimo dia?' }, opts: ['God rests.', 'God makes the sea.', 'God makes the moon.'], a: 'God rests.' },
        ],
      },
      {
        id: 'talk', type: 'talk', partner: 'greet', title: { en: 'Conversation', pt: 'Conversa com a Irmã Grace' },
        scene: { en: 'You meet Sister Grace at the chapel.', pt: 'Você encontra a Irmã Grace na capela. Escolha a melhor resposta.' },
        turns: [
          { en: "Good morning! Peace be with you! I'm Sister Grace.", pt: 'Bom dia! A paz esteja com você! Eu sou a Irmã Grace.', opts: [
            { en: "Good morning! I'm {name}.", ok: true },
            { en: "Good night! I'm {name}.", why: '"Good night" é despedida (boa noite ao sair). De manhã: Good morning!' },
            { en: "Good morning! I'm Grace.", why: 'Grace é ela! Diga o SEU nome.' }] },
          { en: 'Nice to meet you, {name}! How are you today?', pt: 'Prazer em te conhecer! Como você está hoje?', opts: [
            { en: "Nice to meet you too. I'm fine, thank God!", ok: true },
            { en: "Nice to meet you too. I'm fine, thanks. And you?", ok: true },
            { en: "I'm {name}.", why: 'Você já disse o nome. Ela perguntou como você está: I\'m fine.' }] },
          { en: "I'm very well, thank God. Welcome to our village!", pt: 'Estou muito bem, graças a Deus. Bem-vindo(a) à nossa vila!', opts: [
            { en: 'Thank you!', ok: true },
            { en: 'Thank you, Sister Grace!', ok: true },
            { en: 'Please!', why: '"Please" é por favor. Para agradecer: Thank you!' }] },
          { en: 'Look at the sky! What a beautiful day!', pt: 'Olhe o céu! Que dia lindo!', opts: [
            { en: 'Yes! Thank God!', ok: true },
            { en: 'Yes! God is good!', ok: true },
            { en: 'Good night!', why: 'Ainda é dia 🙂. Concorde: Yes! Thank God!' }] },
          { en: 'I pray for you today. God bless you, {name}!', pt: 'Eu oro por você hoje. Deus te abençoe!', opts: [
            { en: 'Thank you! God bless you too!', ok: true },
            { en: 'Amen! Thank you!', ok: true },
            { en: "I'm fine.", why: 'Ela te deu uma bênção. Agradeça: Thank you! God bless you too!' }] },
          { en: 'Goodbye! Have a blessed day!', pt: 'Tchau! Tenha um dia abençoado!', opts: [
            { en: 'Goodbye! Peace be with you!', ok: true },
            { en: 'Thank you! See you later!', ok: true },
            { en: 'Hello!', why: '"Hello" é para quando você chega. Aqui: Goodbye!' }] },
        ],
      },
      {
        id: 'meet', type: 'mission', at: ['Levi', 'Hannah', 'Joel'],
        title: { en: 'Mission: meet the village', pt: 'Missão: conheça a vila' },
        desc: 'Converse com os 3 moradores que passeiam pela vila: Levi 🐶, Hannah 🐱 e Joel 🐻.',
        talks: {
          Levi: [
            { en: "Hello! God bless you! I'm Levi. What's your name?", pt: 'Olá! Deus te abençoe! Eu sou o Levi. Qual é o seu nome?', opts: [
              { en: 'My name is {name}.', ok: true }, { en: 'My name is Levi.', why: 'Levi é ele! Diga o seu nome.' }, { en: "I'm fine, thanks.", why: 'Ele perguntou o seu NOME: My name is...' }] },
            { en: 'Nice to meet you, {name}! How are you?', pt: 'Prazer em te conhecer! Como você está?', opts: [
              { en: "Nice to meet you too. I'm fine, thanks.", ok: true }, { en: "Nice to meet you too. I'm fine, thank God!", ok: true }, { en: 'Good night!', why: 'Ele perguntou como você está: I\'m fine.' }] },
            { en: 'Thank God! Have a blessed day!', pt: 'Graças a Deus! Tenha um dia abençoado!', opts: [
              { en: 'Thank you! God bless you!', ok: true }, { en: 'Good morning!', why: 'Ele está se despedindo. Diga: Thank you! God bless you!' }, { en: 'My name is {name}.', why: 'Você já disse o nome. Agradeça: Thank you! God bless you!' }] },
          ],
          Hannah: [
            { en: 'Peace be with you! Are you new here?', pt: 'A paz esteja com você! Você é novo(a) aqui?', opts: [
              { en: 'Yes, I am.', ok: true }, { en: 'Yes, you are.', why: 'Ela perguntou sobre VOCÊ: Yes, I am.' }, { en: 'Amen.', why: 'Ela fez uma pergunta. Responda: Yes, I am.' }] },
            { en: "Welcome! I'm Hannah. And you?", pt: 'Bem-vindo(a)! Eu sou a Hannah. E você?', opts: [
              { en: "I'm {name}. Nice to meet you.", ok: true }, { en: "I'm Hannah.", why: 'Hannah é ela! Diga o seu nome.' }, { en: "I'm fine.", why: 'Ela quer saber o seu NOME: I\'m...' }] },
            { en: 'Nice to meet you too. God is good!', pt: 'O prazer é meu. Deus é bom!', opts: [
              { en: 'Amen! God is good!', ok: true }, { en: 'Yes! Thank God!', ok: true }, { en: 'Good night!', why: 'Concorde com ela: Amen! God is good!' }] },
          ],
          Joel: [
            { en: "Good afternoon! I'm Joel. How are you today?", pt: 'Boa tarde! Eu sou o Joel. Como você está hoje?', opts: [
              { en: "I'm fine, thank God. And you?", ok: true }, { en: "I'm fine, thanks. And you?", ok: true }, { en: "I'm Joel.", why: 'Joel é ele! Diga como você está: I\'m fine.' }] },
            { en: "I'm great! I love this village. See you at church!", pt: 'Estou ótimo! Eu amo esta vila. Te vejo na igreja!', opts: [
              { en: 'See you later, Joel!', ok: true }, { en: 'Hello, Joel!', why: 'Ele está se despedindo: See you later!' }, { en: 'Please.', why: 'Ele está se despedindo: See you later!' }] },
            { en: 'Goodbye! Peace be with you!', pt: 'Tchau! A paz esteja com você!', opts: [
              { en: 'Goodbye! God bless you!', ok: true }, { en: 'Peace be with you too!', ok: true }, { en: 'Good morning!', why: 'Ele está se despedindo: Goodbye! God bless you!' }] },
          ],
        },
      },
    ],
  },
  // ======================================================================
  {
    id: 'u2', npc: 'numbers', icon: '🙋',
    title: { en: 'About me', pt: 'Sobre mim — e a Arca de Noé' },
    cando: 'Consigo dizer de onde sou, minha idade, o que eu faço, falar da família e dizer nomes de animais e cores.',
    intro: { en: "Hello! I'm Teacher Eli. Let's learn numbers, colors and animals. And I have a story about a very big boat!", pt: 'Olá! Eu sou o Professor Eli. Vamos aprender números, cores e animais. E eu tenho uma história sobre um barco muito grande!' },
    stages: [
      st('u2', 'n1'),
      st('u2', 'n2'),
      {
        id: 'me', type: 'words', title: { en: 'About me', pt: 'Sobre mim' },
        items: [
          { en: 'Where are you from?', pt: 'De onde você é?', pic: '🌎' },
          { en: "I'm from Brazil.", pt: 'Eu sou do Brasil.', pic: '⚽' },
          { en: 'How old are you?', pt: 'Quantos anos você tem?', pic: '🎂' },
          { en: "I'm fifty years old.", pt: 'Eu tenho cinquenta anos.', pic: '🎈' },
          { en: 'What do you do?', pt: 'O que você faz? (qual é o seu trabalho?)', pic: '💼' },
          { en: "I'm a teacher.", pt: 'Eu sou professor(a).', pic: '🍎' },
          { en: "I'm a nurse.", pt: 'Eu sou enfermeiro(a).', pic: '💉' },
          { en: "I'm a homemaker.", pt: 'Eu cuido da casa. (dona de casa)', pic: '🏠' },
          { en: "I'm retired.", pt: 'Eu sou aposentado(a).', pic: '🌷' },
          { en: "I'm married.", pt: 'Eu sou casado(a).', pic: '💍' },
          { en: 'This is my family.', pt: 'Esta é a minha família.', pic: '👪' },
          { en: 'I go to church on Sunday.', pt: 'Eu vou à igreja no domingo.', pic: '⛪' },
        ],
        specials: [
          { q: SAY, say: 'What do you do?', answer: "I'm a teacher.", wrong: ["I'm fine, thanks.", "I'm from Brazil."] },
          { q: SAY, say: 'Where are you from?', answer: "I'm from Brazil.", wrong: ["I'm fifty years old.", "I'm married."] },
          { q: SAY, say: 'How old are you?', answer: "I'm fifty years old.", wrong: ["I'm a nurse.", 'This is my family.'] },
        ],
      },
      st('u2', 'colors'),
      {
        id: 'animals', type: 'words', title: { en: 'Animals and the ark', pt: 'Os animais e a arca' },
        items: [
          { en: 'dog', pt: 'cachorro', pic: '🐶' },
          { en: 'cat', pt: 'gato', pic: '🐱' },
          { en: 'bird', pt: 'pássaro', pic: '🐦' },
          { en: 'fish', pt: 'peixe', pic: '🐟' },
          { en: 'horse', pt: 'cavalo', pic: '🐴' },
          { en: 'sheep', pt: 'ovelha', pic: '🐑' },
          { en: 'lion', pt: 'leão', pic: '🦁' },
          { en: 'elephant', pt: 'elefante', pic: '🐘' },
          { en: 'dove', pt: 'pomba', pic: '🕊️' },
          { en: 'ark', pt: 'arca (barco muito grande)', pic: '🚢' },
          { en: 'rain', pt: 'chuva', pic: '🌧️' },
          { en: 'rainbow', pt: 'arco-íris', pic: '🌈' },
        ],
        specials: [
          { q: { en: 'It is in the sky after the rain. It has many colors.', pt: 'Aparece no céu depois da chuva. Tem muitas cores.' }, show: '🌧️☀️', answer: 'rainbow', wrong: ['dove', 'ark'] },
          { q: { en: 'It is a very big animal.', pt: 'É um animal muito grande.' }, show: '🥜💧', answer: 'elephant', wrong: ['bird', 'cat'] },
          { q: { en: 'It is a white bird. It means peace.', pt: 'É um pássaro branco. Significa paz.' }, show: '☮️', answer: 'dove', wrong: ['lion', 'horse'] },
        ],
      },
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
              { en: 'Noah is a good man.', pt: 'Noé é um homem bom.' },
              { en: 'The ark is very big.', pt: 'A arca é muito grande.' },
              { en: 'We are a family.', pt: 'Nós somos uma família.' },
              { en: 'The animals are in the ark.', pt: 'Os animais estão na arca.' },
            ],
          },
          {
            title: 'Idade: use TO BE (não "have")',
            html: `<p>Em português a gente <b>tem</b> anos. Em inglês a gente <b>é</b> a idade:</p>
              <table><tr><td><b>I'm</b> fifty (years old).</td><td>Eu tenho cinquenta anos.</td></tr>
              <tr><td><s>I have fifty years.</s></td><td>❌ errado</td></tr></table>
              <p>💡 Pode dizer só o número: <b>I'm fifty.</b></p>`,
            examples: [
              { en: 'How old are you?', pt: 'Quantos anos você tem?' },
              { en: "I'm forty-five.", pt: 'Eu tenho quarenta e cinco.' },
              { en: "She's sixty years old.", pt: 'Ela tem sessenta anos.' },
            ],
          },
          {
            title: 'A / AN: um, uma',
            html: `<p>Antes de profissão, bicho ou coisa (um só) use <b>a</b> ou <b>an</b>:</p>
              <table><tr><th>a + som de consoante</th><th>an + som de vogal</th></tr>
              <tr><td><b>a</b> teacher · <b>a</b> nurse · <b>a</b> dove</td><td><b>an</b> ark · <b>an</b> elephant · <b>an</b> angel</td></tr></table>
              <p>❌ <s>I'm teacher.</s> &nbsp; ✅ <b>I'm a teacher.</b></p>
              <p>💡 Com adjetivo não tem a / an: <b>I'm retired.</b> · <b>I'm married.</b></p>`,
            examples: [
              { en: "I'm a nurse.", pt: 'Eu sou enfermeiro(a).' },
              { en: 'It is an elephant.', pt: 'É um elefante.' },
              { en: "I'm retired.", pt: 'Eu sou aposentado(a).' },
            ],
          },
        ],
        quiz: [
          { gap: 'Noah ___ a good man.', pt: 'Noé é um homem bom.', opts: ['is', 'are', 'am'], a: 'is', why: 'Noah = he → "is".' },
          { gap: 'The animals ___ in the ark.', pt: 'Os animais estão na arca.', opts: ['are', 'is', 'am'], a: 'are', why: 'The animals = they → "are".' },
          { gap: 'I ___ fifty years old.', pt: 'Eu tenho cinquenta anos.', opts: ['am', 'have', 'is'], a: 'am', why: 'Idade usa TO BE: I am fifty. Nunca "have".' },
          { gap: 'It is ___ elephant.', pt: 'É um elefante.', opts: ['an', 'a', 'are'], a: 'an', why: '"Elephant" começa com som de vogal → an.' },
          { gap: "I'm ___ teacher.", pt: 'Eu sou professor(a).', opts: ['a', 'an', 'is'], a: 'a', why: '"Teacher" começa com som de consoante → a.' },
          { gap: 'We ___ a family.', pt: 'Nós somos uma família.', opts: ['are', 'is', 'am'], a: 'are', why: 'Com we / you / they usamos "are".' },
          { order: 'This is my family.', pt: 'Esta é a minha família.' },
          { order: 'The ark is very big.', pt: 'A arca é muito grande.' },
        ],
      },
      {
        id: 'story', type: 'listen', story: true, title: { en: "Story: Noah's ark", pt: 'História: a Arca de Noé' },
        scene: { en: 'Teacher Eli tells the story of Noah.', pt: 'O Professor Eli conta a história de Noé.' },
        lines: [
          { who: 'numbers', en: 'Noah is a good man. He loves God.', pt: 'Noé é um homem bom. Ele ama a Deus.' },
          { who: 'numbers', en: 'God says, "Noah, make a very big boat: an ark."', pt: 'Deus diz: "Noé, faça um barco muito grande: uma arca."' },
          { who: 'numbers', en: 'Noah makes the ark. It is very, very big!', pt: 'Noé faz a arca. Ela é muito, muito grande!' },
          { who: 'numbers', en: 'The animals come, two by two.', pt: 'Os animais chegam, de dois em dois.' },
          { who: 'numbers', en: 'Two lions, two elephants, two horses, two birds...', pt: 'Dois leões, dois elefantes, dois cavalos, dois pássaros...' },
          { who: 'numbers', en: 'Noah and his family go into the ark.', pt: 'Noé e a família dele entram na arca.' },
          { who: 'numbers', en: 'Then the rain comes. It rains for forty days and forty nights.', pt: 'Então vem a chuva. Chove por quarenta dias e quarenta noites.' },
          { who: 'numbers', en: 'There is water everywhere. But the ark is safe.', pt: 'Há água por toda parte. Mas a arca está segura.' },
          { who: 'numbers', en: 'Noah sends a dove. The dove comes back with a green leaf.', pt: 'Noé solta uma pomba. A pomba volta com uma folha verde.' },
          { who: 'numbers', en: 'The land is dry! Noah, his family and the animals leave the ark.', pt: 'A terra está seca! Noé, a família e os animais saem da arca.' },
          { who: 'numbers', en: 'God puts a rainbow in the sky. It is a promise.', pt: 'Deus coloca um arco-íris no céu. É uma promessa.' },
          { who: 'numbers', en: 'Noah says, "Thank you, God!"', pt: 'Noé diz: "Obrigado, Deus!"' },
        ],
        questions: [
          { q: { en: 'What does Noah make?', pt: 'O que Noé faz?' }, opts: ['an ark', 'a church', 'a rainbow'], a: 'an ark' },
          { q: { en: 'How do the animals come?', pt: 'Como os animais chegam?' }, opts: ['two by two', 'one by one', 'ten by ten'], a: 'two by two' },
          { q: { en: 'How many days does it rain?', pt: 'Por quantos dias chove?' }, opts: ['forty', 'four', 'fourteen'], a: 'forty' },
          { q: { en: 'Which bird does Noah send?', pt: 'Qual pássaro Noé solta?' }, opts: ['a dove', 'a lion', 'a sheep'], a: 'a dove' },
          { q: { en: 'What does God put in the sky?', pt: 'O que Deus coloca no céu?' }, opts: ['a rainbow', 'a boat', 'a leaf'], a: 'a rainbow' },
        ],
      },
      {
        id: 'talk', type: 'talk', partner: 'numbers', title: { en: 'Conversation', pt: 'Conversa com o Professor Eli' },
        scene: { en: 'Teacher Eli has some questions for you.', pt: 'O Professor Eli tem algumas perguntas para você. Escolha a melhor resposta.' },
        turns: [
          { en: 'Hello, {name}! I have some questions for you. Are you ready?', pt: 'Olá! Eu tenho algumas perguntas para você. Está pronto(a)?', opts: [
            { en: 'Yes, I am.', ok: true },
            { en: "Yes, I'm ready!", ok: true },
            { en: 'Yes, you are.', why: 'Ele perguntou sobre VOCÊ: Yes, I am.' }] },
          { en: 'Where are you from?', pt: 'De onde você é?', opts: [
            { en: "I'm from Brazil.", ok: true },
            { en: 'I from Brazil.', why: 'Falta o verbo: I\'M from Brazil.' },
            { en: "I'm of Brazil.", why: 'De onde → from: I\'m FROM Brazil.' }] },
          { en: 'How old are you?', pt: 'Quantos anos você tem?', opts: [
            { en: "I'm fifty years old.", ok: true },
            { en: "I'm thirty-five.", ok: true },
            { en: 'I have fifty years.', why: 'Idade usa to be: I\'m fifty.' }] },
          { en: 'What do you do?', pt: 'O que você faz?', opts: [
            { en: "I'm a teacher.", ok: true },
            { en: "I'm a nurse.", ok: true },
            { en: "I'm retired.", ok: true },
            { en: "I'm a retired.", why: '"Retired" é adjetivo, não leva "a": I\'m retired.' }] },
          { en: 'What is your favorite animal?', pt: 'Qual é o seu animal favorito?', opts: [
            { en: 'My favorite animal is the dog.', ok: true },
            { en: 'My favorite animal is the lion.', ok: true },
            { en: 'My favorite is animal the dog.', why: 'A ordem é: My favorite ANIMAL IS the dog.' }] },
          { en: 'Very good! In the story, who makes the ark?', pt: 'Muito bem! Na história, quem faz a arca?', opts: [
            { en: 'Noah makes the ark.', ok: true },
            { en: 'The dove makes the ark.', why: 'A pomba (dove) só traz a folha 🙂. Quem faz a arca é Noah.' },
            { en: 'The rain makes the ark.', why: '"Rain" é a chuva. Quem faz a arca é Noah.' }] },
          { en: 'And what does God put in the sky?', pt: 'E o que Deus coloca no céu?', opts: [
            { en: 'A rainbow.', ok: true },
            { en: 'God puts a rainbow in the sky.', ok: true },
            { en: 'An elephant.', why: 'Um elefante no céu? 😄 É o arco-íris: a rainbow.' }] },
          { en: 'Excellent, {name}! God bless you!', pt: 'Excelente! Deus te abençoe!', opts: [
            { en: 'Thank you, Teacher Eli! God bless you too!', ok: true },
            { en: 'Amen! Thank you!', ok: true },
            { en: "I'm from Brazil.", why: 'Ele te deu uma bênção. Agradeça: Thank you! God bless you too!' }] },
        ],
      },
      {
        id: 'idcard', type: 'mission', at: 'mayor',
        title: { en: 'Mission: your village card', pt: 'Missão: seu cartão da vila' },
        desc: 'Vá até o Ancião Abe 🐻 na praça central e responda as perguntas para fazer o seu cartão da vila.',
        talk: [
          { en: "Peace be with you! I'm Elder Abe. I need some information for your village card.", pt: 'A paz esteja com você! Eu sou o Ancião Abe. Preciso de algumas informações para o seu cartão da vila.', opts: [
            { en: 'OK, no problem.', ok: true }, { en: "No, I'm fine.", why: '"I\'m fine" é "estou bem". Diga: OK, no problem.' }, { en: 'Good night!', why: 'Ele quer fazer o seu cartão. Diga: OK, no problem.' }] },
          { en: "What's your name?", pt: 'Qual é o seu nome?', opts: [
            { en: 'My name is {name}.', ok: true }, { en: 'Your name is Abe.', why: 'Diga o SEU nome: My name is...' }, { en: "I'm from {name}.", why: '"From" é para lugar. Diga: My name is...' }] },
          { en: 'Where are you from?', pt: 'De onde você é?', opts: [
            { en: "I'm from Brazil.", ok: true, save: ['from', 'Brazil'] },
            { en: "I'm from Portugal.", ok: true, save: ['from', 'Portugal'] },
            { en: "I'm from Angola.", ok: true, save: ['from', 'Angola'] },
            { en: 'I from Brazil.', why: 'Falta o verbo: I\'M from Brazil.' }] },
          { en: 'How old are you?', pt: 'Quantos anos você tem?', opts: [
            { en: "I'm thirty-five.", ok: true, save: ['age', '35'] },
            { en: "I'm fifty.", ok: true, save: ['age', '50'] },
            { en: "I'm sixty-five.", ok: true, save: ['age', '65'] },
            { en: 'I have fifty years.', why: 'Idade usa to be: I\'m fifty.' }] },
          { en: 'And what do you do?', pt: 'E o que você faz?', opts: [
            { en: "I'm a teacher.", ok: true, save: ['job', 'Teacher 🍎'] },
            { en: "I'm a nurse.", ok: true, save: ['job', 'Nurse 💉'] },
            { en: "I'm a homemaker.", ok: true, save: ['job', 'Homemaker 🏠'] },
            { en: "I'm retired.", ok: true, save: ['job', 'Retired 🌷'] },
            { en: "I'm teacher.", why: 'Falta o "a": I\'m A teacher.' }] },
          { en: 'Thank you, {name}! Here is your card. God bless you!', pt: 'Obrigado! Aqui está o seu cartão. Deus te abençoe!', opts: [
            { en: 'Thank you very much! God bless you too!', ok: true }, { en: 'Please!', why: '"Please" é por favor. Agradeça: Thank you!' }, { en: 'Good morning!', why: 'Agradeça: Thank you very much!' }] },
        ],
      },
    ],
  },
  // ======================================================================
  {
    id: 'u3', npc: 'fruits', icon: '🍞',
    title: { en: 'Food and sharing', pt: 'Comida e partilha — os pães e os peixes' },
    cando: 'Consigo dizer que estou com fome ou sede, oferecer, aceitar e recusar comida com educação e agradecer.',
    intro: { en: "Hi! I'm Miss Ruth. Let's learn about food and sharing. I have a story about bread and fish!", pt: 'Oi! Eu sou a Dona Ruth. Vamos aprender sobre comida e partilha. Eu tenho uma história sobre pães e peixes!' },
    stages: [
      st('u3', 'food'),
      st('u3', 'fruits'),
      {
        id: 'meal', type: 'words', title: { en: 'A meal together', pt: 'Uma refeição juntos' },
        items: [
          { en: 'fish', pt: 'peixe', pic: '🐟' },
          { en: 'loaf', pt: 'pão inteiro (um pão)', pic: '🥖' },
          { en: 'basket', pt: 'cesta / cesto', pic: '🧺' },
          { en: 'crowd', pt: 'multidão', pic: '👥' },
          { en: 'gift', pt: 'presente', pic: '🎁' },
          { en: 'hungry', pt: 'com fome', pic: '😋' },
          { en: 'thirsty', pt: 'com sede', pic: '🥤' },
          { en: 'eat', pt: 'comer', pic: '🍴' },
          { en: 'drink', pt: 'beber', pic: '🥛' },
          { en: 'give', pt: 'dar', pic: '🤲' },
          { en: 'share', pt: 'dividir / partilhar', pic: '🤝' },
          { en: 'everyone', pt: 'todo mundo / todos', pic: '👪' },
        ],
        specials: [
          { q: { en: 'You want to eat. You are...', pt: 'Você quer comer. Você está...' }, show: '🍽️😩', answer: 'hungry', wrong: ['thirsty', 'basket'] },
          { q: { en: 'You want water. You are...', pt: 'Você quer água. Você está...' }, show: '💧😩', answer: 'thirsty', wrong: ['hungry', 'gift'] },
          { q: { en: 'Many, many people together.', pt: 'Muitas e muitas pessoas juntas.' }, show: '🏟️', answer: 'crowd', wrong: ['loaf', 'fish'] },
        ],
      },
      {
        id: 'share', type: 'words', title: { en: 'At the table', pt: 'À mesa: oferecer, aceitar e agradecer' },
        items: [
          { en: 'Are you hungry?', pt: 'Você está com fome?', pic: '😋' },
          { en: "I'm very thirsty.", pt: 'Estou com muita sede.', pic: '🥤' },
          { en: 'Would you like some bread?', pt: 'Você aceita um pouco de pão?', pic: '🍞' },
          { en: 'Yes, please.', pt: 'Sim, por favor.', pic: '👍' },
          { en: 'No, thank you.', pt: 'Não, obrigado(a).', pic: '🙅' },
          { en: 'Can I have some water, please?', pt: 'Pode me dar um pouco de água, por favor?', pic: '💧' },
          { en: 'Here you are.', pt: 'Aqui está.', pic: '🤲' },
          { en: 'Help yourself.', pt: 'Sirva-se. / Fique à vontade.', pic: '🍽️' },
          { en: "Let's share.", pt: 'Vamos dividir.', pic: '🤝' },
          { en: 'There is enough for everyone.', pt: 'Tem o suficiente para todos.', pic: '👪' },
          { en: 'Thank you for the food.', pt: 'Obrigado(a) pela comida.', pic: '🙏' },
          { en: "It's delicious!", pt: 'Está uma delícia!', pic: '🤤' },
        ],
        specials: [
          { q: SAY, say: 'Would you like some bread?', answer: 'Yes, please.', wrong: ['Help yourself.', 'Here you are.'] },
          { q: SAY, say: 'Are you hungry?', answer: 'Yes, I am.', wrong: ['Yes, please.', 'Here you are.'] },
          { q: { en: 'There is one cake and three friends. You say:', pt: 'Tem um bolo e três amigos. Você diz:' }, show: '🍰👫👤', answer: "Let's share.", wrong: ['No, thank you.', "I'm very thirsty."] },
          { q: { en: 'You give bread to a friend. You say:', pt: 'Você entrega o pão a um amigo. Você diz:' }, show: '🍞🤲', answer: 'Here you are.', wrong: ['Yes, please.', 'Are you hungry?'] },
        ],
      },
      {
        id: 'gram', type: 'grammar', title: { en: 'There is / there are, some, plurals', pt: 'Tem / há (there is, there are), some e plurais' },
        cards: [
          {
            title: 'THERE IS / THERE ARE = tem, há',
            html: `<table><tr><th>Um só</th><th>Mais de um</th></tr>
              <tr><td><b>There is</b> a boy.</td><td><b>There are</b> two fish.</td></tr>
              <tr><td>Tem um menino.</td><td>Tem dois peixes.</td></tr></table>
              <p>Pergunta: <b>Is there</b> a basket? · <b>Are there</b> apples?</p>
              <p>Negativo: <b>There is no</b> food. (Não tem comida.)</p>
              <p>❌ <s>Have a boy.</s> &nbsp; ✅ <b>There is a boy.</b></p>`,
            examples: [
              { en: 'There is a boy in the crowd.', pt: 'Tem um menino na multidão.' },
              { en: 'There are five loaves.', pt: 'Tem cinco pães.' },
              { en: 'There is no food here.', pt: 'Não tem comida aqui.' },
            ],
          },
          {
            title: 'SOME = um pouco de, alguns · oferecer e pedir',
            html: `<p>Use <b>some</b> quando não diz a quantidade exata:</p>
              <table><tr><td><b>some</b> bread · <b>some</b> water</td><td>um pouco de pão · de água</td></tr>
              <tr><td><b>some</b> apples</td><td>algumas maçãs</td></tr></table>
              <p>Oferecer: <b>Would you like some</b> bread?<br>Pedir: <b>Can I have some</b> water, please?</p>
              <p>💡 Um só → <b>a / an</b>: <b>an</b> apple, <b>a</b> cake.</p>`,
            examples: [
              { en: 'Would you like some fish?', pt: 'Você aceita um pouco de peixe?' },
              { en: 'Can I have some bread, please?', pt: 'Pode me dar um pouco de pão, por favor?' },
              { en: 'Can I have an apple, please?', pt: 'Pode me dar uma maçã, por favor?' },
            ],
          },
          {
            title: 'Plurais diferentes',
            html: `<p>O plural normal ganha <b>-s</b>: basket → basket<b>s</b>. Mas alguns mudam:</p>
              <table><tr><th>Um</th><th>Mais de um</th></tr>
              <tr><td>loaf</td><td><b>loaves</b></td></tr>
              <tr><td>fish</td><td><b>fish</b> (não muda!)</td></tr>
              <tr><td>man · woman</td><td><b>men · women</b></td></tr>
              <tr><td>child</td><td><b>children</b></td></tr>
              <tr><td>person</td><td><b>people</b></td></tr></table>
              <p>💡 <b>Bread</b> não tem plural: <b>some bread</b> ou <b>two loaves of bread</b>.</p>`,
            examples: [
              { en: 'five loaves and two fish', pt: 'cinco pães e dois peixes' },
              { en: 'There are many people.', pt: 'Tem muitas pessoas.' },
              { en: 'The children are hungry.', pt: 'As crianças estão com fome.' },
            ],
          },
        ],
        quiz: [
          { gap: 'There ___ a boy in the crowd.', pt: 'Tem um menino na multidão.', opts: ['is', 'are', 'have'], a: 'is', why: 'Um só → there IS.' },
          { gap: 'There ___ five loaves.', pt: 'Tem cinco pães.', opts: ['are', 'is', 'has'], a: 'are', why: 'Mais de um → there ARE.' },
          { gap: 'Would you like ___ water?', pt: 'Você aceita um pouco de água?', opts: ['some', 'a', 'an'], a: 'some', why: 'Água não se conta: SOME water.' },
          { gap: 'Can I have ___ apple, please?', pt: 'Pode me dar uma maçã, por favor?', opts: ['an', 'a', 'some'], a: 'an', why: 'Uma só, e começa com vogal → an apple.' },
          { gap: 'The boy has two ___.', pt: 'O menino tem dois peixes.', opts: ['fish', 'fishes', 'fishs'], a: 'fish', why: 'O plural de fish é fish.' },
          { gap: 'There are many ___ here.', pt: 'Tem muitas pessoas aqui.', opts: ['people', 'persons', 'person'], a: 'people', why: 'O plural de person é people.' },
          { gap: 'Five ___ of bread.', pt: 'Cinco pães.', opts: ['loaves', 'loafs', 'loaf'], a: 'loaves', why: 'loaf → loaves.' },
          { order: 'Would you like some bread?', pt: 'Você aceita um pouco de pão?' },
          { order: 'There is enough for everyone.', pt: 'Tem o suficiente para todos.' },
        ],
      },
      {
        id: 'story', type: 'listen', story: true, title: { en: 'Story: five loaves and two fish', pt: 'História: os cinco pães e os dois peixes' },
        scene: { en: 'Miss Ruth tells a story about sharing.', pt: 'A Dona Ruth conta uma história sobre partilha.' },
        lines: [
          { who: 'fruits', en: 'One day, a big crowd is with Jesus. There are five thousand people!', pt: 'Um dia, uma grande multidão está com Jesus. São cinco mil pessoas!' },
          { who: 'fruits', en: 'It is late, and the people are hungry.', pt: 'Está tarde, e as pessoas estão com fome.' },
          { who: 'fruits', en: 'But there is no food here.', pt: 'Mas não tem comida aqui.' },
          { who: 'fruits', en: 'There is a boy in the crowd. He has five loaves and two fish.', pt: 'Tem um menino na multidão. Ele tem cinco pães e dois peixes.' },
          { who: 'fruits', en: 'The boy gives his food to Jesus.', pt: 'O menino dá a comida dele para Jesus.' },
          { who: 'fruits', en: 'Jesus thanks God for the food.', pt: 'Jesus agradece a Deus pela comida.' },
          { who: 'fruits', en: 'His friends give the bread and the fish to the people.', pt: 'Os amigos dele dão o pão e o peixe para as pessoas.' },
          { who: 'fruits', en: 'Everyone eats. There is enough for everyone!', pt: 'Todos comem. Tem o suficiente para todos!' },
          { who: 'fruits', en: 'In the end, there are twelve baskets of food.', pt: 'No final, sobram doze cestos de comida.' },
          { who: 'fruits', en: 'A small gift can help many people.', pt: 'Um presente pequeno pode ajudar muita gente.' },
        ],
        questions: [
          { q: { en: 'How are the people?', pt: 'Como as pessoas estão?' }, opts: ['hungry', 'thirsty', 'happy'], a: 'hungry' },
          { q: { en: 'What does the boy have?', pt: 'O que o menino tem?' }, opts: ['five loaves and two fish', 'two loaves and five fish', 'twelve baskets'], a: 'five loaves and two fish' },
          { q: { en: 'What does the boy do?', pt: 'O que o menino faz?' }, opts: ['He gives his food to Jesus.', 'He eats the food.', 'He goes home.'], a: 'He gives his food to Jesus.' },
          { q: { en: 'What does Jesus do first?', pt: 'O que Jesus faz primeiro?' }, opts: ['He thanks God.', 'He eats.', 'He goes to the sea.'], a: 'He thanks God.' },
          { q: { en: 'How many baskets are there in the end?', pt: 'Quantos cestos sobram no final?' }, opts: ['twelve', 'two', 'five'], a: 'twelve' },
        ],
      },
      {
        id: 'talk', type: 'talk', partner: 'fruits', title: { en: 'Conversation', pt: 'Conversa com a Dona Ruth' },
        scene: { en: 'Miss Ruth invites you to eat in her fruit garden.', pt: 'A Dona Ruth convida você para comer no pomar dela.' },
        turns: [
          { en: 'Hello, {name}! Welcome to my fruit garden. Are you hungry?', pt: 'Olá! Bem-vindo(a) ao meu pomar. Está com fome?', opts: [
            { en: "Yes, I am. I'm hungry!", ok: true },
            { en: 'Yes, I have hungry.', why: 'Fome usa TO BE: I\'M hungry (não "have").' },
            { en: "Yes, I'm a hungry.", why: '"Hungry" é adjetivo, não leva "a": I\'m hungry.' }] },
          { en: 'There are apples, bananas and oranges. Would you like some fruit?', pt: 'Tem maçãs, bananas e laranjas. Você aceita uma fruta?', opts: [
            { en: 'Yes, please!', ok: true },
            { en: 'Yes, please. Can I have an apple?', ok: true },
            { en: 'Yes, I like.', why: 'Para aceitar: Yes, please.' }] },
          { en: 'Here you are. Are you thirsty too?', pt: 'Aqui está. Está com sede também?', opts: [
            { en: 'Yes, I am. Can I have some water, please?', ok: true },
            { en: "No, thank you. I'm fine.", ok: true },
            { en: "Yes, I'm water.", why: 'Isso é "eu sou água" 😄. Diga: Can I have some water, please?' }] },
          { en: 'Look! Hannah and Levi are here. But there is only one cake...', pt: 'Olha! A Hannah e o Levi chegaram. Mas só tem um bolo...', opts: [
            { en: "No problem. Let's share!", ok: true },
            { en: "Let's share. There is enough for everyone.", ok: true },
            { en: 'There are one cake.', why: 'Um só → there IS one cake. E a ideia aqui é dividir: Let\'s share!' }] },
          { en: 'Good idea! Before we eat, we thank God.', pt: 'Boa ideia! Antes de comer, a gente agradece a Deus.', opts: [
            { en: 'Thank you, God, for the food. Amen.', ok: true },
            { en: 'Thank you for the food!', ok: true },
            { en: 'Help yourself.', why: '"Help yourself" é para oferecer comida. Para agradecer: Thank you for the food.' }] },
          { en: 'Amen! Help yourself, {name}!', pt: 'Amém! Sirva-se!', opts: [
            { en: "Thank you! It's delicious!", ok: true },
            { en: 'Thank you, Miss Ruth!', ok: true },
            { en: 'Here you are.', why: '"Here you are" é quando VOCÊ entrega algo. Aqui agradeça: Thank you!' }] },
          { en: 'Take some bread for your family too.', pt: 'Leve um pouco de pão para a sua família também.', opts: [
            { en: 'Thank you very much! God bless you!', ok: true },
            { en: 'Thank you, Miss Ruth!', ok: true },
            { en: "You're hungry.", why: 'Ela te deu um presente. Agradeça: Thank you very much!' }] },
        ],
      },
      {
        id: 'bread', type: 'mission', at: 'bakery',
        title: { en: 'Mission: bread for everyone', pt: 'Missão: pão para todos' },
        desc: 'Vá até a Vovó Anna 🐻 na BREAD HOUSE e busque comida para dividir com a vila.',
        talk: [
          { en: 'Hello, dear! Welcome to the Bread House. Are you hungry?', pt: 'Olá, querido(a)! Bem-vindo(a) à Casa do Pão. Está com fome?', opts: [
            { en: "Yes, I'm hungry!", ok: true },
            { en: 'Yes, I am. Hello, Grandma Anna!', ok: true },
            { en: 'Yes, I have hungry.', why: 'Fome usa TO BE: I\'M hungry.' }] },
          { en: 'Would you like some bread?', pt: 'Você aceita um pouco de pão?', opts: [
            { en: 'Yes, please.', ok: true },
            { en: 'Yes, please. Can I have five loaves?', ok: true },
            { en: 'Yes, I would like some breads.', why: '"Bread" não tem plural: some bread / five loaves.' }] },
          { en: 'Five loaves! Is it for you?', pt: 'Cinco pães! É para você?', opts: [
            { en: "No. It's for my friends. Let's share!", ok: true },
            { en: 'No. There are many people in the village.', ok: true },
            { en: 'No. There is many people.', why: 'People é plural → there ARE many people.' }] },
          { en: 'How nice! There are two fish here too. Would you like some fish?', pt: 'Que bom! Tem dois peixes aqui também. Você aceita um pouco de peixe?', opts: [
            { en: 'Yes, please. Thank you!', ok: true },
            { en: 'No, thank you. The bread is enough.', ok: true },
            { en: 'Yes, two fishes.', why: 'O plural de fish é fish: two fish.' }] },
          { en: 'Here you are: five loaves and two fish. It is a gift!', pt: 'Aqui está: cinco pães e dois peixes. É um presente!', opts: [
            { en: 'Thank you, Grandma Anna! God bless you!', ok: true },
            { en: 'Thank you very much!', ok: true },
            { en: 'Here you are.', why: 'Quem entrega é ela. Você agradece: Thank you very much!' }] },
          { who: 'Levi', en: "Mmm, bread! I'm so hungry, {name}!", pt: 'Hmm, pão! Estou com tanta fome!', opts: [
            { en: 'Help yourself, Levi! There is enough for everyone.', ok: true },
            { en: "Here you are, Levi. Let's share!", ok: true },
            { en: 'No, thank you.', why: 'Ele está com fome 🙂. Ofereça: Help yourself! / Here you are.' }] },
          { who: 'Levi', en: "Thank you! It's delicious!", pt: 'Obrigado! Está uma delícia!', opts: [
            { en: 'Thank God! And thank you, Grandma Anna!', ok: true },
            { en: 'A small gift can help many people.', ok: true },
            { en: "I'm very thirsty.", why: 'Ele agradeceu. Responda com alegria: Thank God!' }] },
          { en: 'God bless you, {name}! See you later!', pt: 'Deus te abençoe! Até mais!', opts: [
            { en: 'God bless you too! Goodbye!', ok: true },
            { en: 'Amen! See you later!', ok: true },
            { en: 'Good morning!', why: 'Ela está se despedindo: Goodbye! / See you later!' }] },
        ],
      },
    ],
  },
  // ======================================================================
  {
    id: 'u4', npc: 'colors', icon: '👑',
    title: { en: 'People', pt: 'Como as pessoas são — Davi e Golias' },
    cando: 'Consigo descrever pessoas, dizer o que alguém tem e o que eu consigo (ou não consigo) fazer — e contar uma história simples.',
    intro: { en: "Hello, friend! I'm Brother Sam. Let's learn to describe people. Today's story has a giant!", pt: 'Olá, amigo(a)! Eu sou o Irmão Sam. Vamos aprender a descrever pessoas. A história de hoje tem um gigante!' },
    stages: [
      {
        id: 'adj', type: 'words', title: { en: 'How people are', pt: 'Como as pessoas são' },
        items: [
          { en: 'big', pt: 'grande', pic: '🐘' },
          { en: 'small', pt: 'pequeno', pic: '🐭' },
          { en: 'tall', pt: 'alto', pic: '🦒' },
          { en: 'short', pt: 'baixo' },
          { en: 'strong', pt: 'forte', pic: '💪' },
          { en: 'weak', pt: 'fraco', pic: '🥀' },
          { en: 'brave', pt: 'corajoso', pic: '🦁' },
          { en: 'afraid', pt: 'com medo', pic: '😨' },
          { en: 'young', pt: 'jovem', pic: '👶' },
          { en: 'old', pt: 'velho / idoso', pic: '👴' },
          { en: 'happy', pt: 'feliz', pic: '😄' },
          { en: 'sad', pt: 'triste', pic: '😢' },
        ],
        specials: [
          { q: { en: 'The opposite of "big" is...', pt: 'O contrário de "big" é...' }, show: '🐘↔️🐭', answer: 'small', wrong: ['tall', 'strong'] },
          { q: { en: 'The opposite of "happy" is...', pt: 'O contrário de "happy" é...' }, show: '😄↔️❓', answer: 'sad', wrong: ['brave', 'young'] },
          { q: { en: 'The opposite of "strong" is...', pt: 'O contrário de "strong" é...' }, show: '💪↔️❓', answer: 'weak', wrong: ['old', 'big'] },
        ],
      },
      {
        id: 'battle', type: 'words', title: { en: 'Words of the story', pt: 'Palavras da história' },
        items: [
          { en: 'king', pt: 'rei', pic: '🤴' },
          { en: 'soldier', pt: 'soldado', pic: '💂' },
          { en: 'giant', pt: 'gigante' },
          { en: 'shepherd', pt: 'pastor de ovelhas' },
          { en: 'boy', pt: 'menino', pic: '👦' },
          { en: 'stone', pt: 'pedra' },
          { en: 'sling', pt: 'funda (de atirar pedra)' },
          { en: 'sword', pt: 'espada', pic: '⚔️' },
          { en: 'army', pt: 'exército' },
          { en: 'fight', pt: 'lutar / luta', pic: '🥊' },
          { en: 'win', pt: 'vencer / ganhar', pic: '🏆' },
          { en: 'help', pt: 'ajudar / ajuda', pic: '🤝' },
        ],
        specials: [
          { q: { en: 'He takes care of sheep.', pt: 'Ele cuida das ovelhas.' }, show: '🐑🐑🐑', answer: 'shepherd', wrong: ['king', 'giant'] },
          { q: { en: 'He is very, very tall.', pt: 'Ele é muito, muito alto.' }, show: '🦒⬆️', answer: 'giant', wrong: ['boy', 'stone'] },
          { q: { en: 'Many soldiers together.', pt: 'Muitos soldados juntos.' }, show: '💂💂💂', answer: 'army', wrong: ['sling', 'sword'] },
        ],
      },
      {
        id: 'describe', type: 'words', title: { en: 'Talking about people', pt: 'Falando das pessoas' },
        items: [
          { en: 'Who is he?', pt: 'Quem é ele?', pic: '🤔' },
          { en: 'He is the king.', pt: 'Ele é o rei.', pic: '🤴' },
          { en: 'He is very tall.', pt: 'Ele é muito alto.', pic: '🦒' },
          { en: 'She is very brave.', pt: 'Ela é muito corajosa.', pic: '🦁' },
          { en: "I'm not afraid.", pt: 'Eu não estou com medo.', pic: '😌' },
          { en: 'He has a sword.', pt: 'Ele tem uma espada.', pic: '⚔️' },
          { en: 'I have five stones.', pt: 'Eu tenho cinco pedras.', pic: '🖐️' },
          { en: 'Can you help me?', pt: 'Você pode me ajudar?', pic: '🙋' },
          { en: 'I can do it.', pt: 'Eu consigo.', pic: '💪' },
          { en: "I can't do it.", pt: 'Eu não consigo.', pic: '😩' },
          { en: 'God is with me.', pt: 'Deus está comigo.', pic: '🙏' },
          { en: "Don't be afraid.", pt: 'Não tenha medo.', pic: '🤗' },
        ],
        specials: [
          { q: SAY, say: 'Can you help me?', answer: 'Yes, I can.', wrong: ['Yes, I am.', 'Yes, I have.'] },
          { q: SAY, say: 'Who is he?', answer: 'He is the king.', wrong: ['He has a sword.', 'I can do it.'] },
          { q: SAY, say: "I'm afraid.", answer: "Don't be afraid. God is with you.", wrong: ['He is very tall.', "I can't do it."] },
        ],
      },
      {
        id: 'gram', type: 'grammar', title: { en: 'Is, has, can', pt: 'Descrever (is), ter (have / has) e conseguir (can)' },
        cards: [
          {
            title: 'IS + adjetivo · IS NOT',
            html: `<table><tr><td>David <b>is</b> brave.</td><td>Davi é corajoso.</td></tr>
              <tr><td>He <b>is not</b> afraid. (= <b>isn't</b>)</td><td>Ele não está com medo.</td></tr>
              <tr><td>The soldiers <b>are</b> afraid.</td><td>Os soldados estão com medo.</td></tr>
              <tr><td>Goliath is <b>very</b> tall.</td><td>Golias é muito alto.</td></tr></table>
              <p>💡 O adjetivo vem <b>antes</b> da coisa e não tem plural:<br><b>a big sword</b> · <b>five small stones</b> &nbsp; ❌ <s>a sword big</s></p>`,
            examples: [
              { en: 'David is small, but he is brave.', pt: 'Davi é pequeno, mas é corajoso.' },
              { en: "He isn't afraid.", pt: 'Ele não está com medo.' },
              { en: 'Goliath has a big sword.', pt: 'Golias tem uma espada grande.' },
            ],
          },
          {
            title: 'HAVE / HAS = ter',
            html: `<table><tr><td>I / you / we / they</td><td><b>have</b></td></tr>
              <tr><td>he / she / it</td><td><b>has</b></td></tr></table>
              <p>I <b>have</b> two children. · David <b>has</b> a sling. · The soldiers <b>have</b> swords.</p>
              <p>💡 Lembre: idade, fome, sede e medo usam <b>to be</b>, não "have":<br><b>I'm</b> afraid. · <b>I'm</b> hungry.</p>`,
            examples: [
              { en: 'I have five stones.', pt: 'Eu tenho cinco pedras.' },
              { en: 'He has a sling.', pt: 'Ele tem uma funda.' },
              { en: 'They have a big problem.', pt: 'Eles têm um grande problema.' },
            ],
          },
          {
            title: "CAN / CAN'T = conseguir, poder",
            html: `<table><tr><td>I <b>can</b> do it.</td><td>Eu consigo.</td></tr>
              <tr><td>I <b>can't</b> do it.</td><td>Eu não consigo.</td></tr>
              <tr><td><b>Can you</b> help me?</td><td>Você pode me ajudar?</td></tr>
              <tr><td>Yes, I <b>can</b>. / No, I <b>can't</b>.</td><td>Posso. / Não posso.</td></tr></table>
              <p>💡 CAN é igual para todos (he <b>can</b>, sem -s) e o verbo depois fica simples, sem "to":<br>❌ <s>He can to fight.</s> &nbsp; ✅ <b>He can fight.</b></p>`,
            examples: [
              { en: 'I can fight the giant.', pt: 'Eu consigo lutar com o gigante.' },
              { en: "The soldiers can't do it.", pt: 'Os soldados não conseguem.' },
              { en: 'Can you help me?', pt: 'Você pode me ajudar?' },
            ],
          },
        ],
        quiz: [
          { gap: 'Goliath ___ very tall.', pt: 'Golias é muito alto.', opts: ['is', 'are', 'has'], a: 'is', why: 'Goliath = he → is.' },
          { gap: 'The soldiers ___ afraid.', pt: 'Os soldados estão com medo.', opts: ['are', 'is', 'have'], a: 'are', why: 'Medo usa to be, e soldiers = they → are.' },
          { gap: 'David ___ a sling.', pt: 'Davi tem uma funda.', opts: ['has', 'have', 'is'], a: 'has', why: 'David = he → has.' },
          { gap: 'I ___ five stones.', pt: 'Eu tenho cinco pedras.', opts: ['have', 'has', 'am'], a: 'have', why: 'Com I usamos have.' },
          { gap: 'I ___ do it!', pt: 'Eu consigo!', opts: ['can', 'am', 'has'], a: 'can', why: 'Conseguir = can.' },
          { gap: 'David can ___ the giant.', pt: 'Davi consegue lutar com o gigante.', opts: ['fight', 'fights', 'to fight'], a: 'fight', why: 'Depois de can o verbo fica simples: can fight.' },
          { gap: "He ___ afraid. He is brave.", pt: 'Ele não está com medo. Ele é corajoso.', opts: ["isn't", "aren't", "can't"], a: "isn't", why: 'He is not = he isn\'t.' },
          { order: 'God is with me.', pt: 'Deus está comigo.' },
          { order: 'He has a big sword.', pt: 'Ele tem uma espada grande.' },
        ],
      },
      {
        id: 'story', type: 'listen', story: true, title: { en: 'Story: David and Goliath', pt: 'História: Davi e Golias' },
        scene: { en: 'Brother Sam tells the story of a brave boy.', pt: 'O Irmão Sam conta a história de um menino corajoso.' },
        lines: [
          { who: 'colors', en: 'David is a young shepherd. He takes care of sheep.', pt: 'Davi é um jovem pastor. Ele cuida de ovelhas.' },
          { who: 'colors', en: 'He is small, but he is brave. He loves God.', pt: 'Ele é pequeno, mas é corajoso. Ele ama a Deus.' },
          { who: 'colors', en: 'There is a giant. His name is Goliath. He is very tall and very strong.', pt: 'Existe um gigante. O nome dele é Golias. Ele é muito alto e muito forte.' },
          { who: 'colors', en: 'Goliath has a big sword. He says, "Who can fight me?"', pt: 'Golias tem uma espada grande. Ele diz: "Quem consegue lutar comigo?"' },
          { who: 'colors', en: 'The soldiers are afraid. The king is afraid too.', pt: 'Os soldados estão com medo. O rei também está com medo.' },
          { who: 'colors', en: 'David says, "I can fight the giant. God is with me."', pt: 'Davi diz: "Eu consigo lutar com o gigante. Deus está comigo."' },
          { who: 'colors', en: 'The king says, "You are only a boy!"', pt: 'O rei diz: "Você é só um menino!"' },
          { who: 'colors', en: 'David has no sword. He has a sling and five small stones.', pt: 'Davi não tem espada. Ele tem uma funda e cinco pedras pequenas.' },
          { who: 'colors', en: 'David runs to the giant. He uses one stone.', pt: 'Davi corre até o gigante. Ele usa uma pedra.' },
          { who: 'colors', en: 'The stone hits Goliath. The giant falls down!', pt: 'A pedra acerta Golias. O gigante cai no chão!' },
          { who: 'colors', en: 'David wins! The soldiers are happy.', pt: 'Davi vence! Os soldados ficam felizes.' },
          { who: 'colors', en: 'David is small, but God is big.', pt: 'Davi é pequeno, mas Deus é grande.' },
        ],
        questions: [
          { q: { en: 'What does David do?', pt: 'O que Davi faz (qual é o trabalho dele)?' }, opts: ["He's a shepherd.", "He's a soldier.", "He's a king."], a: "He's a shepherd." },
          { q: { en: 'How is Goliath?', pt: 'Como Golias é?' }, opts: ['very tall and strong', 'small and weak', 'young and happy'], a: 'very tall and strong' },
          { q: { en: 'How are the soldiers?', pt: 'Como os soldados estão?' }, opts: ['afraid', 'brave', 'hungry'], a: 'afraid' },
          { q: { en: 'What does David have?', pt: 'O que Davi tem?' }, opts: ['a sling and five stones', 'a big sword', 'five loaves'], a: 'a sling and five stones' },
          { q: { en: 'Who wins?', pt: 'Quem vence?' }, opts: ['David', 'Goliath', 'the king'], a: 'David' },
        ],
      },
      {
        id: 'talk', type: 'talk', partner: 'colors', title: { en: 'Conversation', pt: 'Conversa com o Irmão Sam' },
        scene: { en: 'Brother Sam talks with you about the story.', pt: 'O Irmão Sam conversa com você sobre a história.' },
        turns: [
          { en: 'Hello, {name}! Welcome to the Story Tent. Is David tall?', pt: 'Olá! Bem-vindo(a) à Tenda das Histórias. O Davi é alto?', opts: [
            { en: "No, he isn't. He is small.", ok: true },
            { en: 'No. He is short and young.', ok: true },
            { en: 'Yes, he is very tall.', why: 'Quem é muito alto é o gigante. David is small.' }] },
          { en: 'Right! And Goliath? Is he strong?', pt: 'Certo! E o Golias? Ele é forte?', opts: [
            { en: 'Yes, he is. He is very strong.', ok: true },
            { en: 'Yes, he has.', why: 'Pergunta com IS → Yes, he IS.' },
            { en: 'Yes, he can.', why: 'Pergunta com IS → Yes, he IS.' }] },
          { en: 'What does David have?', pt: 'O que o Davi tem?', opts: [
            { en: 'He has a sling and five stones.', ok: true },
            { en: 'He have a sling.', why: 'Com he usamos HAS: He has a sling.' },
            { en: 'He is a sling.', why: 'Isso é "ele é uma funda" 😄. Ter = has: He has a sling.' }] },
          { en: 'Are the soldiers brave?', pt: 'Os soldados são corajosos?', opts: [
            { en: "No, they aren't. They are afraid.", ok: true },
            { en: "No, they isn't.", why: 'They → are / aren\'t: No, they aren\'t.' },
            { en: 'Yes, they have.', why: 'Pergunta com ARE → No, they aren\'t. They are afraid.' }] },
          { en: 'And you, {name}? Are you afraid sometimes?', pt: 'E você? Você fica com medo às vezes?', opts: [
            { en: 'Yes, sometimes. But God is with me.', ok: true },
            { en: "No, I'm not. I'm brave!", ok: true },
            { en: 'Yes, I have afraid.', why: 'Medo usa TO BE: I\'m afraid (não "have").' }] },
          { en: 'Can you tell this story to a friend?', pt: 'Você consegue contar esta história para um amigo?', opts: [
            { en: 'Yes, I can!', ok: true },
            { en: 'Yes, I can. I love this story.', ok: true },
            { en: 'Yes, I am.', why: 'Pergunta com CAN → Yes, I CAN.' }] },
          { en: "Don't be afraid, {name}. You can do it! God bless you!", pt: 'Não tenha medo. Você consegue! Deus te abençoe!', opts: [
            { en: 'Thank you, Brother Sam! God bless you too!', ok: true },
            { en: 'Amen! I can do it!', ok: true },
            { en: "I can't do it.", why: 'Não desanime 😄. Diga: I can do it!' }] },
        ],
      },
      {
        id: 'retell', type: 'mission', at: 'colors',
        title: { en: 'Mission: tell the story', pt: 'Missão: conte a história' },
        desc: 'Volte ao Irmão Sam 🐱 na STORY TENT. Os amigos da vila querem ouvir a história de Davi — conte você, em inglês!',
        talk: [
          { en: '{name}, our friends want to hear the story of David. Can you tell the story?', pt: 'Os nossos amigos querem ouvir a história de Davi. Você consegue contar?', opts: [
            { en: 'Yes, I can!', ok: true },
            { en: 'Sure! I can do it.', ok: true },
            { en: 'Yes, I am.', why: 'Pergunta com CAN → Yes, I CAN.' }] },
          { who: 'Hannah', en: 'Who is David?', pt: 'Quem é Davi?', opts: [
            { en: 'David is a young shepherd. He is small, but brave.', ok: true },
            { en: 'David is a giant. He is very tall.', why: 'O gigante é o Golias. David is a young shepherd.' },
            { en: 'David is a soldier. He has a big sword.', why: 'Davi não é soldado e não tem espada. He is a young shepherd.' }] },
          { who: 'Levi', en: 'And who is Goliath?', pt: 'E quem é Golias?', opts: [
            { en: 'Goliath is a giant. He is very tall and strong.', ok: true },
            { en: 'Goliath is a small boy.', why: 'O menino é o Davi. Goliath is a giant.' },
            { en: 'Goliath is a sheep.', why: 'Uma ovelha? 😄 Goliath is a giant.' }] },
          { who: 'Hannah', en: 'Oh! Are the soldiers afraid?', pt: 'Nossa! Os soldados ficam com medo?', opts: [
            { en: 'Yes, they are. The king is afraid too.', ok: true },
            { en: 'Yes, they is.', why: 'They → are: Yes, they are.' },
            { en: 'No. They are very happy.', why: 'No começo eles estão com medo: Yes, they are.' }] },
          { who: 'Levi', en: 'What does David say?', pt: 'O que Davi diz?', opts: [
            { en: 'He says: I can fight the giant. God is with me.', ok: true },
            { en: "He says: I can't do it.", why: 'Davi é corajoso! Ele diz: I can fight the giant.' },
            { en: "He says: I'm afraid.", why: 'Davi não tem medo. Ele diz: God is with me.' }] },
          { who: 'Hannah', en: 'Does David have a sword?', pt: 'Davi tem uma espada?', opts: [
            { en: 'No. He has a sling and five stones.', ok: true },
            { en: 'Yes. He has a big sword.', why: 'Quem tem a espada é o Golias. David has a sling and five stones.' },
            { en: 'No. He have a sling.', why: 'Com he usamos HAS: He has a sling.' }] },
          { who: 'Levi', en: 'And who wins?', pt: 'E quem vence?', opts: [
            { en: 'David wins! The giant falls down.', ok: true },
            { en: 'Goliath wins.', why: 'Não! A pedra acerta o gigante: David wins!' },
            { en: 'The king wins.', why: 'Quem luta e vence é o Davi: David wins!' }] },
          { en: 'Wonderful, {name}! You can tell a story in English!', pt: 'Maravilha! Você consegue contar uma história em inglês!', opts: [
            { en: "Thank you! I'm so happy!", ok: true },
            { en: 'Thank God! I can do it!', ok: true },
            { en: "I'm very sad.", why: 'É hora de comemorar 😄: I\'m so happy!' }] },
        ],
      },
    ],
  },
];
