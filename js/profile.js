// Quem está jogando. Cada pessoa tem o seu módulo (curso + cenário) e o seu progresso salvo.

export const PROFILES = [
  { id: 'junior', name: 'Junior', emoji: '💻', title: 'Trabalho e TI', desc: 'Vila dos bichinhos · reuniões e dia a dia' },
  { id: 'eric', name: 'Eric', emoji: '🌳', title: 'Jardinagem', desc: 'Jardim botânico · plantas, paisagismo e árvores' },
  { id: 'ellen', name: 'Ellen', emoji: '☕', title: 'Turma de amigos', desc: 'Rua do café · conversa do dia a dia entre amigos' },
  { id: 'carla', name: 'Carla', emoji: '📖', title: 'Histórias da Bíblia', desc: 'Vila bíblica · histórias contadas em inglês' },
];

const KEY = 'bichinhosEnglish.profile';

let stored = null;
try { stored = localStorage.getItem(KEY); } catch (e) { /* sem storage (ou fora do navegador) */ }

// null = ninguém escolheu ainda (mostra a tela "Quem vai jogar?")
export const profileId = PROFILES.some(p => p.id === stored) ? stored : null;
export const activeId = profileId || 'junior';
export const PROFILE = PROFILES.find(p => p.id === activeId);

export function chooseProfile(id) {
  try { if (id) localStorage.setItem(KEY, id); else localStorage.removeItem(KEY); } catch (e) { /* ignora */ }
  location.reload();
}
