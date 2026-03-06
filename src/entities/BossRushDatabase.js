/**
 * Boss Rush Mode — Fight 10 bosses in sequence with a 60-second timer.
 * The timer resets with each boss killed.
 * Rewards scale with how many bosses you defeat.
 * Cooldown: 30 minutes between attempts.
 */

export const BOSS_RUSH_CONFIG = {
  totalBosses: 10,
  timerPerBoss: 60_000,       // 60 seconds per boss
  cooldownMs: 30 * 60_000,    // 30 min cooldown
  hpScaling: 1.4,             // Each boss has 40% more HP than previous
  baseHp: 500,                // Base HP of first boss
};

export const BOSS_RUSH_REWARDS = [
  { bosses: 1,  coins: 1000,  stardust: 10,  gems: 0,  essence: 0  },
  { bosses: 3,  coins: 3000,  stardust: 30,  gems: 2,  essence: 0  },
  { bosses: 5,  coins: 8000,  stardust: 60,  gems: 5,  essence: 5  },
  { bosses: 7,  coins: 15000, stardust: 100, gems: 8,  essence: 10 },
  { bosses: 10, coins: 30000, stardust: 200, gems: 15, essence: 25 },
];

/**
 * Calculate boss HP for a given wave (0-indexed).
 */
export function getBossRushHp(wave, playerStage) {
  const stageScale = 1 + playerStage * 0.02;
  return Math.floor(
    BOSS_RUSH_CONFIG.baseHp * Math.pow(BOSS_RUSH_CONFIG.hpScaling, wave) * stageScale
  );
}

/**
 * Get the reward tier earned for defeating N bosses.
 */
export function getBossRushReward(bossesKilled) {
  let tier = null;
  for (const r of BOSS_RUSH_REWARDS) {
    if (bossesKilled >= r.bosses) tier = r;
  }
  return tier;
}

/**
 * Check if boss rush is on cooldown.
 */
export function isBossRushReady(lastPlayedTime) {
  if (!lastPlayedTime) return true;
  return Date.now() - lastPlayedTime >= BOSS_RUSH_CONFIG.cooldownMs;
}

/**
 * Get cooldown remaining in ms.
 */
export function getBossRushCooldown(lastPlayedTime) {
  if (!lastPlayedTime) return 0;
  return Math.max(0, BOSS_RUSH_CONFIG.cooldownMs - (Date.now() - lastPlayedTime));
}

/** Boss names for the rush (themed mini-bosses) */
export const BOSS_RUSH_NAMES = [
  '🗡️ Shadow Sentinel',
  '🔥 Ember Drake',
  '❄️ Frost Titan',
  '⚡ Storm Herald',
  '🌑 Void Specter',
  '🌿 Thorn Golem',
  '💀 Bone Colossus',
  '🌟 Astral Warden',
  '🩸 Blood Revenant',
  '👑 the Moon Tyrant',
];
