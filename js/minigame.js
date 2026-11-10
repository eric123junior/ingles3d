// Word Run: o jogo fala uma palavra em inglês e você corre até o objeto certo.
import * as THREE from 'three';
import { makeGem, makeNumberBlock, makeFruit } from './models.js';
import { LESSONS } from './content.js';
import { speak, sfx } from './audio.js';
import { $, toast, label } from './ui.js';

const FRUIT_KIND = { apple: 'redApple', banana: 'banana', orange: 'orange', grapes: 'grapes', strawberry: 'strawberry', watermelon: 'watermelon', pear: 'pear' };
const DURATION = 60;

function objFor(cat, w) {
  if (cat === 'colors') { const g = makeGem(w.color); g.scale.setScalar(1.3); return g; }
  if (cat === 'numbers') { const g = new THREE.Group(); const b = makeNumberBlock(w.digit); b.position.y = 0.75; b.scale.setScalar(1.25); g.add(b); return g; }
  const g = makeFruit(FRUIT_KIND[w.en], 1.6); g.position.y = 0.2; const h = new THREE.Group(); h.add(g); return h;
}

export class WordRun {
  constructor(scene, arena) {
    this.scene = scene;
    this.arena = arena;
    this.active = false;
    this.items = [];
  }

  // categorias liberadas = lições com objetos que o jogador já fez
  start(categories, mover, onEnd) {
    this.cats = categories;
    this.mover = mover;
    this.onEnd = onEnd;
    this.score = 0; this.time = DURATION; this.rounds = 0; this.hits = 0;
    this.active = true; this.running = false;
    mover.pos.copy(this.arena.center); mover.heading = 0;
    mover.limit = { center: this.arena.center, radius: this.arena.radius - 0.3 };
    $('mgHud').classList.remove('hidden');
    $('mgScore').textContent = '0'; $('mgTime').textContent = DURATION; $('mgWord').textContent = '?';
    $('mgSay').onclick = () => this.target && speak(this.target.en, { pitch: 1.25 });
    $('mgQuit').onclick = () => { sfx.click(); this.end(true); };
    // contagem regressiva
    const cd = $('countdown');
    cd.classList.remove('hidden');
    const steps = ['3', '2', '1', 'GO!'];
    let i = 0;
    const tick = () => {
      if (!this.active) { cd.classList.add('hidden'); return; }
      if (i < steps.length) {
        cd.innerHTML = `<span>${steps[i]}</span>`;
        i === 3 ? sfx.right() : sfx.tick();
        i++;
        setTimeout(tick, 750);
      } else {
        cd.classList.add('hidden');
        this.running = true;
        this.newRound();
      }
    };
    tick();
  }

  clearItems() { for (const it of this.items) this.scene.remove(it.obj); this.items = []; }

  newRound() {
    this.clearItems();
    const cat = this.cats[Math.floor(Math.random() * this.cats.length)];
    const words = LESSONS.find(l => l.id === cat).words.slice().sort(() => Math.random() - 0.5).slice(0, 4);
    const spots = this.arena.spots
      .filter(s => s.distanceTo(this.mover.pos) > 1.8)
      .sort(() => Math.random() - 0.5).slice(0, 4);
    words.slice(0, spots.length).forEach((w, i) => {
      const obj = objFor(cat, w);
      obj.position.copy(spots[i]).setY(0.3);
      obj.userData.spin = Math.random() * 6;
      this.scene.add(obj);
      this.items.push({ w, obj, pos: spots[i], dead: false, pop: 0 });
    });
    this.target = this.items[Math.floor(Math.random() * this.items.length)].w;
    this.hintAt = 4;
    this.roundT = 0;
    $('mgWord').textContent = '?';
    this.rounds++;
    setTimeout(() => this.active && speak(this.target.en, { pitch: 1.25 }), 250);
  }

  update(dt, t) {
    if (!this.active) return;
    for (const it of this.items) {
      it.obj.rotation.y = t * 1.5 + it.obj.userData.spin;
      if (it.pop > 0) {
        it.pop -= dt * 3;
        it.obj.scale.setScalar(Math.max(0.01, it.pop));
        if (it.pop <= 0) this.scene.remove(it.obj);
      } else if (!it.dead) it.obj.position.y = 0.3 + Math.sin(t * 3 + it.obj.userData.spin) * 0.12;
    }
    if (!this.running) return;
    this.time -= dt;
    this.roundT += dt;
    $('mgTime').textContent = Math.max(0, Math.ceil(this.time));
    if (this.roundT > this.hintAt && $('mgWord').textContent === '?') $('mgWord').textContent = this.target.en;
    if (this.time <= 0) return this.end(false);
    // tocou em algum objeto?
    for (const it of this.items) {
      if (it.dead) continue;
      const d = Math.hypot(this.mover.pos.x - it.pos.x, this.mover.pos.z - it.pos.z);
      if (d > 0.95) continue;
      it.dead = true; it.pop = 1;
      if (it.w === this.target) {
        const pts = this.roundT <= this.hintAt ? 10 : 5;
        this.score += pts; this.hits++;
        $('mgScore').textContent = this.score;
        sfx.right();
        toast(`✅ <b>${it.w.en}</b> +${pts}`, 1100);
        this.items.forEach(o => { if (!o.dead) { o.dead = true; o.pop = 1; } });
        this.running = false;
        setTimeout(() => { if (this.active) { this.running = true; this.newRound(); } }, 700);
      } else {
        sfx.wrong();
        this.time -= 3;
        toast(`❌ ${label('This is', 'Isto é')} <b>${it.w.en}</b> (−3s)`, 1300);
        speak(it.w.en, { pitch: 1.25 });
      }
      break;
    }
  }

  end(quit) {
    if (!this.active) return;
    this.active = false; this.running = false;
    this.clearItems();
    this.mover.limit = null;
    $('mgHud').classList.add('hidden');
    $('countdown').classList.add('hidden');
    this.onEnd({ score: this.score, hits: this.hits, quit });
  }
}
