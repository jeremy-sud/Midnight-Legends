import "./style.css";
import { GameState } from "./core/GameState.js";
import { Engine } from "./core/GameLoop.js";
import { UIManager } from "./ui/UIManager.js";
import { EventBus } from "./core/EventBus.js";
import { AudioManager } from "./core/AudioManager.js";
import { HeroTemplate } from "./entities/HeroDatabase.js";
import { EnemyDatabase } from "./entities/EnemyDatabase.js";

// ═══ Loading Screen Orchestration ═══
function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  // ── Starfield ──
  const starfield = document.getElementById('ls-starfield');
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'ls-star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.setProperty('--dur', (1.5 + Math.random() * 3) + 's');
    star.style.setProperty('--peak', (0.4 + Math.random() * 0.6).toString());
    star.style.animationDelay = (Math.random() * 3) + 's';
    const size = 1 + Math.random() * 2.5;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    starfield.appendChild(star);
  }

  // ── Floating entities (heroes + enemies orbiting around) ──
  const entContainer = document.getElementById('ls-entities');
  const heroSvgs = HeroTemplate.slice(0, 12).map(h => ({ svg: h.svg, color: h.rarity.color, name: h.name }));
  const enemySvgs = EnemyDatabase.slice(0, 8).map(e => ({ svg: e.svg, color: e.color, name: e.name }));
  const allEntities = [...heroSvgs, ...enemySvgs];

  allEntities.forEach((ent, i) => {
    const el = document.createElement('div');
    el.className = 'ls-entity';
    el.innerHTML = ent.svg;
    el.style.setProperty('--entity-color', ent.color);
    el.style.setProperty('--orbit-dur', (6 + Math.random() * 10) + 's');
    el.style.setProperty('--delay', (i * 0.4 + Math.random() * 2) + 's');

    // Random orbit paths across the screen
    const angle1 = Math.random() * Math.PI * 2;
    const angle2 = angle1 + Math.PI + (Math.random() - 0.5);
    const radius = 35 + Math.random() * 45;
    const cx = 50, cy = 50;

    el.style.setProperty('--sx', (cx + Math.cos(angle1) * radius) + 'vw');
    el.style.setProperty('--sy', (cy + Math.sin(angle1) * radius * 0.5) + 'vh');
    el.style.setProperty('--mx', (cx + (Math.random() - 0.5) * 30) + 'vw');
    el.style.setProperty('--my', (cy + (Math.random() - 0.5) * 30) + 'vh');
    el.style.setProperty('--ex', (cx + Math.cos(angle2) * radius) + 'vw');
    el.style.setProperty('--ey', (cy + Math.sin(angle2) * radius * 0.5) + 'vh');

    el.style.left = '0';
    el.style.top = '0';
    entContainer.appendChild(el);
  });

  // ── Rising particles ──
  const particleContainer = document.getElementById('ls-particles');
  const colors = ['#d500f9', '#00e5ff', '#76ff03', '#ffb74d', '#ff1744', '#bb86fc'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'ls-particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '-10px';
    p.style.width = (3 + Math.random() * 6) + 'px';
    p.style.height = p.style.width;
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.setProperty('--pdur', (3 + Math.random() * 5) + 's');
    p.style.setProperty('--pdelay', (Math.random() * 6) + 's');
    particleContainer.appendChild(p);
  }

  // ── Rotating tips ──
  const tips = [
    "Tip: Complete collections to unlock powerful Relics!",
    "Tip: Prestige at stage 50+ to earn Void Essence.",
    "Tip: Keep your pet happy for maximum bonus!",
    "Tip: Boss Rush resets every 30 minutes.",
    "Tip: Socket runes into items for extra power.",
    "Tip: Weekly Dungeon has unique modifiers each floor!",
    "Tip: Send idle heroes on expeditions for rewards.",
    "Tip: Ascend heroes at max level for permanent buffs.",
    "Tip: Element advantages deal 1.5× damage!",
    "Tip: Higher kill streaks give better multipliers.",
  ];
  const tipEl = document.getElementById('ls-tip');
  let tipIdx = 0;
  const tipInterval = setInterval(() => {
    tipIdx = (tipIdx + 1) % tips.length;
    tipEl.style.opacity = '0';
    setTimeout(() => {
      tipEl.textContent = tips[tipIdx];
      tipEl.style.opacity = '';
    }, 300);
  }, 4000);

  return { screen, tipInterval };
}

function updateLoadingProgress(pct, text) {
  const bar = document.getElementById('ls-progress');
  const label = document.getElementById('ls-progress-text');
  if (bar) bar.style.width = pct + '%';
  if (label) label.textContent = text;
}

const MIN_LOADING_MS = 5000;

function dismissLoadingScreen(loader) {
  if (!loader) return;
  const elapsed = Date.now() - loader.startTime;
  const remaining = Math.max(0, MIN_LOADING_MS - elapsed);

  // Animate progress smoothly during remaining wait
  if (remaining > 0) {
    updateLoadingProgress(95, 'Starting game...');
    const rampStart = Date.now();
    const rampInterval = setInterval(() => {
      const t = Math.min((Date.now() - rampStart) / remaining, 1);
      updateLoadingProgress(95 + t * 5, t < 1 ? 'Starting game...' : 'Ready!');
      if (t >= 1) clearInterval(rampInterval);
    }, 50);
  }

  setTimeout(() => {
    clearInterval(loader.tipInterval);
    updateLoadingProgress(100, 'Ready!');
    setTimeout(() => {
      loader.screen.classList.add('ls-fade-out');
      document.getElementById('app').style.display = '';
      setTimeout(() => {
        loader.screen.remove();
      }, 900);
    }, 400);
  }, remaining);
}

// Bootstrap
document.addEventListener("DOMContentLoaded", () => {
  const loader = initLoadingScreen();
  if (loader) loader.startTime = Date.now();

  updateLoadingProgress(10, 'Loading save data...');
  GameState.load();

  updateLoadingProgress(30, 'Initializing audio...');
  AudioManager.init(GameState.data.settings);

  updateLoadingProgress(50, 'Building interface...');
  const ui = new UIManager();

  updateLoadingProgress(70, 'Starting engine...');
  const engine = new Engine(ui);

  // EventBus bridges UI → Engine commands
  EventBus.on('manualClick', (data) => engine.manualClick(data.power, data.x, data.y));
  EventBus.on('startTower', () => engine.startTower());
  EventBus.on('performPrestige', () => engine.performPrestige());

  updateLoadingProgress(85, 'Preparing world...');

  // Unlock audio on first user interaction (browser policy)
  const unlockAudio = () => {
    AudioManager.unlock();
    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('touchstart', unlockAudio);
  };
  document.addEventListener('click', unlockAudio);
  document.addEventListener('touchstart', unlockAudio);

  // Global click sound for all buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('button, .nav-item, .sub-tab-item, .sort-btn, .setting-toggle, .hero-card .equip-slot')) {
      AudioManager.playClick();
    }
  });

  updateLoadingProgress(95, 'Starting game...');
  engine.start();

  // Dismiss loading screen
  dismissLoadingScreen(loader);
});
