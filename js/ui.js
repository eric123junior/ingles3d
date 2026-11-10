// Interface: avisos, confete, diálogos com bichinhos, janelas e textos com apoio em português.
import { speak, sfx } from './audio.js';
import { support } from './state.js';

const $ = id => document.getElementById(id);
export { $ };

export function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Tradução em português conforme o nível: visível, menor, ou escondida (toque para ver)
export function ptHtml(pt, cls = 'pt') {
  const m = support();
  if (m === 'low') return `<span class="${cls} pt-hidden" onclick="this.classList.add('show')">${esc(pt)}</span>`;
  return `<span class="${cls}" style="${m === 'mid' ? 'opacity:.75;font-size:.9em' : ''}">${esc(pt)}</span>`;
}

// Instruções: português no começo, inglês depois
export function instr({ en, pt }) {
  const m = support();
  if (m === 'full') return `<div class="ls-q">${esc(pt)}</div>`;
  return `<div class="ls-q">${esc(en)}</div><div class="ls-qpt">${ptHtml(pt, '')}</div>`;
}
export function label(en, pt) { return support() === 'full' ? pt : en; }

// ---------- Avisos ----------
export function toast(html, ms = 2600) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = html;
  $('toasts').appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, ms);
}

export function confetti(n = 70) {
  const box = $('confetti');
  const cols = ['#ff8fab', '#ffc94d', '#7be0ad', '#8ec5ff', '#b388ff', '#ff9f6b'];
  for (let i = 0; i < n; i++) {
    const c = document.createElement('div');
    c.className = 'cf';
    c.style.left = Math.random() * 100 + '%';
    c.style.background = cols[i % cols.length];
    c.style.animationDuration = 1.6 + Math.random() * 1.6 + 's';
    c.style.animationDelay = Math.random() * 0.4 + 's';
    box.appendChild(c);
    setTimeout(() => c.remove(), 3800);
  }
}

// ---------- Diálogo ----------
// lines: [{en, pt}], choices: [{label, value, cls}]
export function dialog({ name, pitch = 1.15, lines, choices }) {
  return new Promise(resolve => {
    const box = $('dialog'), btns = $('dlgBtns');
    let i = 0;
    box.classList.remove('hidden');
    $('dlgName').textContent = name;
    const onKey = e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const b = btns.querySelector('button.primary, button.go') || btns.querySelector('button');
        b && b.click();
      }
    };
    addEventListener('keydown', onKey);
    const close = v => {
      removeEventListener('keydown', onKey);
      box.classList.add('hidden');
      resolve(v);
    };
    const show = () => {
      const ln = lines[i];
      $('dlgEn').textContent = ln.en;
      $('dlgPt').innerHTML = ln.pt ? ptHtml(ln.pt, '') : '';
      $('dlgSay').onclick = () => speak(ln.en, { pitch });
      speak(ln.en, { pitch });
      btns.innerHTML = '';
      if (i < lines.length - 1) {
        const b = document.createElement('button');
        b.className = 'primary'; b.textContent = '▶';
        b.onclick = () => { sfx.click(); i++; show(); };
        btns.appendChild(b);
      } else {
        for (const c of (choices || [{ label: 'OK', value: true, cls: 'primary' }])) {
          const b = document.createElement('button');
          b.className = c.cls || '';
          b.innerHTML = c.label;
          b.onclick = () => { sfx.click(); close(c.value); };
          btns.appendChild(b);
        }
      }
    };
    show();
  });
}

// ---------- Janela genérica ----------
let modalClose = null;
export function modal(html, { onMount, onClose } = {}) {
  if (modalClose) modalClose(true); // troca de janela sem avisar a anterior
  const m = $('modal'), p = $('modalPanel');
  p.innerHTML = html;
  m.classList.remove('hidden');
  const close = (silent) => {
    if (modalClose !== close) return;
    modalClose = null;
    m.classList.add('hidden');
    p.innerHTML = '';
    if (!silent && onClose) onClose();
  };
  modalClose = close;
  p.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => { sfx.click(); close(); }));
  onMount && onMount(p, close);
  return close;
}
export function isModalOpen() { return !!modalClose; }

// Visual de uma palavra (emoji, cor ou número)
export function picHtml(w, cls = '') {
  if (w.color) return `<div class="pic ${cls}"><div class="swatch" style="background:${w.color}"></div></div>`;
  if (w.digit) return `<div class="pic ${cls}"><span class="digit">${w.digit}</span></div>`;
  return `<div class="pic ${cls}">${w.pic || w.show || ''}</div>`;
}
