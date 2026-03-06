/**
 * Weekly Dungeon — Infinite-scaling floors with modifiers.
 * Resets every Monday. Climb as high as possible for milestone rewards.
 * Each floor has a random modifier and scaled HP.
 */

export const DUNGEON_CONFIG = {
  timerPerFloor: 45_000,    // 45 seconds per floor
  baseHp: 300,              // Floor 1 base HP
  hpScaling: 1.25,          // Each floor +25% HP
  cooldownMs: 0,            // No cooldown — but limited to once per weekly reset
};

export const DUNGEON_MODIFIERS = [
  { id: 'mod_double_hp',     name: '💀 Fortified',      desc: 'Enemy HP ×2',             hpMult: 2.0, timeMult: 1.0, rewardMult: 1.5 },
  { id: 'mod_speed',         name: '⏩ Blitz',           desc: 'Timer halved (22s)',      hpMult: 1.0, timeMult: 0.5, rewardMult: 1.8 },
  { id: 'mod_regen',         name: '🩹 Regenerating',    desc: 'Enemy heals 3% HP/s',     hpMult: 1.0, timeMult: 1.0, rewardMult: 1.4, regen: 0.03 },
  { id: 'mod_armored',       name: '🛡️ Armored',        desc: 'Damage reduced 30%',      hpMult: 1.0, timeMult: 1.0, rewardMult: 1.6, damageReduction: 0.3 },
  { id: 'mod_berserk',       name: '🔥 Berserk',        desc: 'HP ×1.5, timer ×1.5',     hpMult: 1.5, timeMult: 1.5, rewardMult: 1.3 },
  { id: 'mod_standard',      name: '⚔️ Standard',       desc: 'No modifiers',            hpMult: 1.0, timeMult: 1.0, rewardMult: 1.0 },
  { id: 'mod_glass_cannon',  name: '💥 Glass Cannon',   desc: 'HP ×0.5, timer 20s',      hpMult: 0.5, timeMult: 0.44, rewardMult: 1.2 },
  { id: 'mod_cursed',        name: '🌑 Cursed',         desc: 'HP ×3, timer ×2',         hpMult: 3.0, timeMult: 2.0, rewardMult: 2.0 },
];

export const DUNGEON_FLOOR_NAMES = [
  '🏚️ Sunken Vestibule',
  '🕸️ Cobweb Passage',
  '🦇 Bat Cavern',
  '💀 Bone Corridor',
  '🔥 Ember Hall',
  '❄️ Frost Chamber',
  '⚡ Lightning Vault',
  '🌿 Overgrown Sanctum',
  '🩸 Blood Shrine',
  '🌑 Void Abyss',
  '👁️ Eye of Shadows',
  '💎 Crystal Depths',
  '🐉 Dragon\'s Lair',
  '👑 Throne of Echoes',
  '🌟 Astral Core',
];

/** Rewards graduated by floor milestones. */
export const DUNGEON_REWARDS = [
  { floor: 3,   coins: 2000,   stardust: 20,  gems: 1,  essence: 0  },
  { floor: 5,   coins: 5000,   stardust: 50,  gems: 3,  essence: 2  },
  { floor: 10,  coins: 15000,  stardust: 100, gems: 8,  essence: 10 },
  { floor: 15,  coins: 30000,  stardust: 200, gems: 15, essence: 20 },
  { floor: 20,  coins: 60000,  stardust: 400, gems: 25, essence: 40 },
  { floor: 30,  coins: 120000, stardust: 800, gems: 50, essence: 80 },
];

/**
 * Calculate floor enemy HP for a given floor (0-indexed internally, display is 1-indexed).
 */
export function getDungeonFloorHp(floor, playerStage, modifier) {
  const stageScale = 1 + playerStage * 0.015;
  const base = DUNGEON_CONFIG.baseHp * Math.pow(DUNGEON_CONFIG.hpScaling, floor) * stageScale;
  return Math.floor(base * (modifier ? modifier.hpMult : 1));
}

/**
 * Get timer for a floor in ms.
 */
export function getDungeonFloorTimer(floor, modifier) {
  const base = DUNGEON_CONFIG.timerPerFloor;
  return Math.floor(base * (modifier ? modifier.timeMult : 1));
}

/**
 * Get a pseudo-random modifier for a given floor number.
 * Uses the floor number as seed so it's deterministic per week.
 */
export function getDungeonModifier(floor, weekSeed) {
  const idx = (floor * 7 + weekSeed) % DUNGEON_MODIFIERS.length;
  return DUNGEON_MODIFIERS[idx];
}

/**
 * Get the weekly reset key (ISO week-based: 'YYYY-Wnn').
 */
export function getDungeonWeekKey() {
  const now = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now - jan1) / 86400000);
  const weekNum = Math.ceil((days + jan1.getDay() + 1) / 7);
  return `${now.getFullYear()}-DW${String(weekNum).padStart(2, '0')}`;
}

/**
 * Check if dungeon can be entered this week (one attempt per week).
 */
export function isDungeonReady(dungeonState) {
  if (!dungeonState || !dungeonState.lastWeek) return true;
  return dungeonState.lastWeek !== getDungeonWeekKey();
}

/**
 * Get best reward tier earned for a given floor count.
 */
export function getDungeonReward(floorsCleared) {
  let best = null;
  for (const r of DUNGEON_REWARDS) {
    if (floorsCleared >= r.floor) best = r;
  }
  return best;
}

/**
 * Compute a numeric seed from the week key for modifier generation.
 */
export function getWeekSeed() {
  const key = getDungeonWeekKey();
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash) + key.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Get the floor display name (cycles through names).
 */
export function getDungeonFloorName(floor) {
  return DUNGEON_FLOOR_NAMES[floor % DUNGEON_FLOOR_NAMES.length];
}
