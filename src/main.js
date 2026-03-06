import "./style.css";
import { GameState } from "./core/GameState.js";
import { Engine } from "./core/GameLoop.js";
import { UIManager } from "./ui/UIManager.js";
import { EventBus } from "./core/EventBus.js";
import { AudioManager } from "./core/AudioManager.js";

// Bootstrap
document.addEventListener("DOMContentLoaded", () => {
  GameState.load();

  // Initialize audio from saved settings
  AudioManager.init(GameState.data.settings);

  // Create UI and Engine (no circular ref needed)
  const ui = new UIManager();
  const engine = new Engine(ui);

  // EventBus bridges UI → Engine commands
  EventBus.on('manualClick', (data) => engine.manualClick(data.power, data.x, data.y));
  EventBus.on('startTower', () => engine.startTower());
  EventBus.on('performPrestige', () => engine.performPrestige());

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

  engine.start();
});
