// Central dos cursos: cada jogador tem o seu módulo (js/courses/*.js).
// Todos seguem o mesmo formato (veja o topo de courses/junior.js) e a mesma convenção:
// unidades u1..u4; números em 'u2.n1', cores em 'u2.colors', frutas em 'u3.fruits'.
import { activeId } from './profile.js';
import { COLORS, NUMBERS, FRUITS, UNITS as JUNIOR } from './courses/junior.js';
import { UNITS as ERIC } from './courses/eric.js';
import { UNITS as ELLEN } from './courses/ellen.js';
import { UNITS as CARLA } from './courses/carla.js';

export const COURSES = { junior: JUNIOR, eric: ERIC, ellen: ELLEN, carla: CARLA };
export const UNITS = COURSES[activeId];

// Categorias do minijogo Word Run (liberadas pelas etapas do curso)
export const WORDBANK = { numbers: NUMBERS, colors: COLORS, fruits: FRUITS };
export const WORDBANK_STAGE = { numbers: 'u2.n1', colors: 'u2.colors', fruits: 'u3.fruits' };

export const stageKey = (u, s) => `${u.id}.${s.id}`;
const STAGE_ICON = { words: '📖', grammar: '🧩', listen: '🎧', talk: '🗣️', mission: '🎯' };
const STAGE_LABEL = { words: 'Palavras e frases', grammar: 'Gramática', listen: 'Escuta', talk: 'Conversa', mission: 'Missão' };
// etapa de escuta com "story: true" = historinha contada por um só bichinho
export const stageIcon = s => s.story ? '📜' : STAGE_ICON[s.type];
export const stageLabel = s => s.story ? 'História' : STAGE_LABEL[s.type];
