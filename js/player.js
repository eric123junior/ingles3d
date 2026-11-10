// Controles (teclado, joystick de toque, arrastar para girar a câmera) e movimento do jogador.
import * as THREE from 'three';
import { ISLAND_R } from './world.js';

export const isTouch = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

export class Controls {
  constructor(dom, { onInteract }) {
    this.keys = new Set();
    this.joy = { x: 0, y: 0, id: null, ox: 0, oy: 0 };
    this.drag = { id: null, x: 0 };
    this.yaw = 0;          // ângulo da câmera
    this.dist = 13;        // zoom
    this.enabled = false;
    this.onInteract = onInteract;
    const base = document.getElementById('joyBase'), knob = document.getElementById('joyKnob');

    addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT') return;
      const k = e.key.toLowerCase();
      this.keys.add(k);
      if ((k === 'e' || k === ' ' || k === 'enter') && this.enabled) { e.preventDefault(); this.onInteract(); }
      if (k === 'q') this.yaw += 0.35;
      if (k === 'r') this.yaw -= 0.35;
    });
    addEventListener('keyup', e => this.keys.delete(e.key.toLowerCase()));
    addEventListener('blur', () => this.keys.clear());

    dom.addEventListener('pointerdown', e => {
      if (!this.enabled) return;
      if (e.pointerType === 'touch' && e.clientX < innerWidth * 0.5 && this.joy.id === null) {
        this.joy.id = e.pointerId; this.joy.ox = e.clientX; this.joy.oy = e.clientY;
        base.style.left = e.clientX + 'px'; base.style.top = e.clientY + 'px';
        knob.style.transform = 'translate(-50%,-50%)';
        base.classList.remove('hidden');
      } else if (this.drag.id === null) {
        this.drag.id = e.pointerId; this.drag.x = e.clientX;
      }
      dom.setPointerCapture?.(e.pointerId);
    });
    dom.addEventListener('pointermove', e => {
      if (e.pointerId === this.joy.id) {
        let dx = e.clientX - this.joy.ox, dy = e.clientY - this.joy.oy;
        const len = Math.hypot(dx, dy), max = 50;
        if (len > max) { dx = dx / len * max; dy = dy / len * max; }
        this.joy.x = dx / max; this.joy.y = dy / max;
        knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
      } else if (e.pointerId === this.drag.id) {
        this.yaw -= (e.clientX - this.drag.x) * 0.008;
        this.drag.x = e.clientX;
      }
    });
    const end = e => {
      if (e.pointerId === this.joy.id) { this.joy.id = null; this.joy.x = this.joy.y = 0; base.classList.add('hidden'); }
      if (e.pointerId === this.drag.id) this.drag.id = null;
    };
    dom.addEventListener('pointerup', end);
    dom.addEventListener('pointercancel', end);
    dom.addEventListener('wheel', e => { this.dist = THREE.MathUtils.clamp(this.dist + e.deltaY * 0.01, 7, 20); }, { passive: true });
  }

  reset() {
    this.keys.clear();
    this.joy.x = this.joy.y = 0; this.joy.id = null; this.drag.id = null;
    document.getElementById('joyBase').classList.add('hidden');
  }

  // vetor de entrada: x = direita, y = frente
  input() {
    if (!this.enabled) return { x: 0, y: 0 };
    let x = 0, y = 0;
    const k = this.keys;
    if (k.has('w') || k.has('arrowup')) y += 1;
    if (k.has('s') || k.has('arrowdown')) y -= 1;
    if (k.has('a') || k.has('arrowleft')) x -= 1;
    if (k.has('d') || k.has('arrowright')) x += 1;
    x += this.joy.x; y -= this.joy.y;
    const l = Math.hypot(x, y);
    if (l > 1) { x /= l; y /= l; }
    return { x, y };
  }
}

const tmp = new THREE.Vector3();

export class PlayerMover {
  constructor() {
    this.pos = new THREE.Vector3(0, 0, 7);
    this.heading = Math.PI; // olhando para a fonte
    this.speed = 0;
    this.limit = null;      // {center, radius} para prender na arena
  }

  update(dt, inp, yaw, colliders, gate) {
    const fx = -Math.sin(yaw), fz = -Math.cos(yaw);
    const rx = Math.cos(yaw), rz = -Math.sin(yaw);
    const mx = rx * inp.x + fx * inp.y, mz = rz * inp.x + fz * inp.y;
    const mag = Math.hypot(mx, mz);
    const SPEED = 6.2;
    this.speed = mag * SPEED;
    if (mag > 0.05) {
      this.pos.x += mx * SPEED * dt;
      this.pos.z += mz * SPEED * dt;
      const target = Math.atan2(mx, mz);
      let d = target - this.heading;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      this.heading += d * Math.min(1, dt * 12);
    }
    // colisões
    const PR = 0.45;
    for (let pass = 0; pass < 2; pass++) for (const c of colliders) {
      const dx = this.pos.x - c.x, dz = this.pos.z - c.z;
      const d = Math.hypot(dx, dz), min = c.r + PR;
      if (d < min && d > 0.0001) { this.pos.x = c.x + dx / d * min; this.pos.z = c.z + dz / d * min; }
    }
    // limites da ilha (com a ponte)
    const onBridge = this.pos.x < -ISLAND_R + 4 && Math.abs(this.pos.z) < 1.3;
    if (onBridge) {
      this.pos.z = THREE.MathUtils.clamp(this.pos.z, -1.15, 1.15);
      this.pos.x = Math.max(this.pos.x, gate.x + 0.7);
    } else {
      const r = Math.hypot(this.pos.x, this.pos.z), max = ISLAND_R - 1;
      if (r > max) { this.pos.x *= max / r; this.pos.z *= max / r; }
    }
    if (this.limit) {
      tmp.copy(this.pos).sub(this.limit.center); tmp.y = 0;
      if (tmp.length() > this.limit.radius) { tmp.setLength(this.limit.radius); this.pos.copy(this.limit.center).add(tmp); }
    }
  }
}
