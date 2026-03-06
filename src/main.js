import "./style.css";
import { GameState } from "./core/GameState.js";
import { Engine } from "./core/GameLoop.js";
import { UIManager } from "./ui/UIManager.js";
import { EventBus } from "./core/EventBus.js";

// Bootstrap
document.addEventListener("DOMContentLoaded", () => {
  GameState.load();

  // Create UI and Engine (no circular ref needed)
  const ui = new UIManager();
  const engine = new Engine(ui);

  // EventBus bridges UI → Engine commands
  EventBus.on('manualClick', (data) => engine.manualClick(data.power, data.x, data.y));
  EventBus.on('startTower', () => engine.startTower());
  EventBus.on('performPrestige', () => engine.performPrestige());

  engine.start();
});
