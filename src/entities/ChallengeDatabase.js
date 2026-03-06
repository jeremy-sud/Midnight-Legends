/**
 * Challenge System — Rotating special combat modifiers with unique rewards
 * Challenges reset daily and offer 3 options of varying difficulty
 * Completing challenges awards Challenge Points that unlock exclusive rewards
 */

export const ChallengeDifficulty = {
  NORMAL: { id: 'normal', name: 'Normal', color: '#81c784', pointReward: 1, rewardMult: 1.0 },
  HARD: { id: 'hard', name: 'Hard', color: '#ffb74d', pointReward: 3, rewardMult: 1.5 },
  NIGHTMARE: { id: 'nightmare', name: 'Nightmare', color: '#ff1744', pointReward: 5, rewardMult: 2.5 },
};

export const ChallengeModifiers = [
  { id: 'cmod_glass', name: 'Glass Cannon', icon: '💥', desc: 'DPS ×3 but enemies have ×5 HP',
    dpsMultiplier: 3.0, enemyHpMultiplier: 5.0 },
  { id: 'cmod_speed', name: 'Speed Demon', icon: '⚡', desc: '60 second timer to clear 50 stages',
    timeLimit: 60, stageGoal: 50 },
  { id: 'cmod_no_click', name: 'Idle Master', icon: '🧘', desc: 'Click damage disabled, familiar only',
    disableClick: true },
  { id: 'cmod_one_hero', name: 'Lone Wolf', icon: '🐺', desc: 'Only 1 hero allowed in party, DPS ×2',
    maxPartySize: 1, dpsMultiplier: 2.0 },
  { id: 'cmod_element_lock', name: 'Elemental Trial', icon: '🔥', desc: 'Only heroes of one element deal damage',
    elementLock: true },
  { id: 'cmod_no_items', name: 'Naked Run', icon: '🏃', desc: 'All equipment bonuses disabled, rewards ×2',
    disableItems: true, rewardMultiplier: 2.0 },
  { id: 'cmod_regen', name: 'Regenerator', icon: '💚', desc: 'Enemies regenerate 5% HP/sec',
    enemyRegenPct: 0.05 },
  { id: 'cmod_reflect', name: 'Mirror Shield', icon: '🪞', desc: 'Enemies reflect 10% of damage dealt',
    damageReflect: 0.10 },
  { id: 'cmod_cursed', name: 'Cursed Lands', icon: '☠️', desc: 'Coins disabled but ×3 Stardust & Gems',
    disableCoins: true, stardustMult: 3.0, gemMult: 3.0 },
  { id: 'cmod_ascend', name: 'Ascending Trial', icon: '📈', desc: 'Enemy HP increases ×1.5 per kill',
    escalatingHp: 1.5 },
  { id: 'cmod_timer', name: 'Against the Clock', icon: '⏰', desc: '3 min timer, maximize stage reached',
    timeLimit: 180 },
  { id: 'cmod_boss_gauntlet', name: 'Boss Gauntlet', icon: '👹', desc: 'Every enemy is a boss, ×3 rewards',
    allBosses: true, rewardMultiplier: 3.0 },
];

/**
 * Challenge reward tiers based on accumulated Challenge Points
 */
export const ChallengeRewards = [
  { points: 5, name: 'Bronze Medal', icon: '🥉', reward: { coins: 50000, stardust: 500 } },
  { points: 15, name: 'Silver Medal', icon: '🥈', reward: { coins: 200000, stardust: 2000, gems: 20 } },
  { points: 30, name: 'Gold Medal', icon: '🥇', reward: { coins: 500000, stardust: 5000, gems: 50, essence: 10 } },
  { points: 50, name: 'Platinum Medal', icon: '🏅', reward: { coins: 1000000, stardust: 10000, gems: 100, essence: 25 } },
  { points: 100, name: 'Diamond Trophy', icon: '🏆', reward: { coins: 5000000, stardust: 50000, gems: 250, essence: 100 } },
  { points: 200, name: 'Void Champion', icon: '♾️', reward: { coins: 20000000, stardust: 200000, gems: 500, essence: 500 } },
];

/**
 * Generate daily challenges (3 per day, seeded by date)
 */
export function generateDailyChallenges(dateString) {
  // Use date string as seed for deterministic daily selection
  let seed = 0;
  for (let i = 0; i < dateString.length; i++) {
    seed = ((seed << 5) - seed + dateString.charCodeAt(i)) | 0;
  }

  // Simple seeded random
  function seededRandom() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  }

  const available = [...ChallengeModifiers];
  const selected = [];
  const difficulties = [ChallengeDifficulty.NORMAL, ChallengeDifficulty.HARD, ChallengeDifficulty.NIGHTMARE];

  for (let i = 0; i < 3 && available.length > 0; i++) {
    const idx = Math.floor(seededRandom() * available.length);
    selected.push({
      modifier: available.splice(idx, 1)[0],
      difficulty: difficulties[i],
    });
  }

  return selected;
}

/**
 * Get unclaimed challenge rewards
 */
export function getUnclaimedChallengeRewards(totalPoints, claimedRewards) {
  return ChallengeRewards.filter(
    r => totalPoints >= r.points && !claimedRewards.includes(r.points)
  );
}

/**
 * Calculate challenge completion reward
 */
export function getChallengeReward(challenge, currentStage) {
  const baseReward = {
    coins: Math.floor(5000 + currentStage * 100),
    stardust: Math.floor(50 + currentStage * 5),
    gems: Math.floor(3 + currentStage * 0.1),
  };

  const mult = challenge.difficulty.rewardMult;
  return {
    coins: Math.floor(baseReward.coins * mult),
    stardust: Math.floor(baseReward.stardust * mult),
    gems: Math.floor(baseReward.gems * mult),
    challengePoints: challenge.difficulty.pointReward,
  };
}
