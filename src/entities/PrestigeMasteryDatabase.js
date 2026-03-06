/**
 * Prestige Mastery System — Hero-specific skill trees unlocked after multiple prestiges
 * Each hero unlocks a 3-branch skill tree with 5 nodes per branch (15 nodes total per hero)
 * Mastery points are earned per prestige (1 point per prestige, starting at prestige 3)
 * Masteries persist across prestiges
 */

export const MasteryBranches = {
  POWER: 'power',     // Raw damage, crit, multi-strike
  FORTUNE: 'fortune',  // Coins, loot, stardust
  GUARDIAN: 'guardian', // Survival, familiar, party buffs
};

// Each node: { id, branch, tier (1-5), name, icon, desc, maxLevel, effect }
// tier 1 costs 1 pt, tier 2 costs 2, etc.
function makeMasteryTree(heroId) {
  return [
    // ── POWER BRANCH ──
    { id: `${heroId}_pow_1`, branch: MasteryBranches.POWER, tier: 1, name: 'Sharpened Edge', icon: '🗡️',
      desc: '+8% DPS per level', maxLevel: 5, effect: (lvl) => ({ dps: lvl * 0.08 }) },
    { id: `${heroId}_pow_2`, branch: MasteryBranches.POWER, tier: 2, name: 'Keen Instinct', icon: '🎯',
      desc: '+3% Crit Chance per level', maxLevel: 3, effect: (lvl) => ({ crit: lvl * 0.03 }) },
    { id: `${heroId}_pow_3`, branch: MasteryBranches.POWER, tier: 3, name: 'Battle Fury', icon: '⚔️',
      desc: '+15% Crit Damage per level', maxLevel: 3, effect: (lvl) => ({ critDmg: lvl * 0.15 }) },
    { id: `${heroId}_pow_4`, branch: MasteryBranches.POWER, tier: 4, name: 'Overpower', icon: '💥',
      desc: '+5% chance double-strike per level', maxLevel: 3, effect: (lvl) => ({ multiStrike: lvl * 0.05 }) },
    { id: `${heroId}_pow_5`, branch: MasteryBranches.POWER, tier: 5, name: 'Ascended Might', icon: '🌟',
      desc: '+25% total DPS (capstone)', maxLevel: 1, effect: (lvl) => ({ dps: lvl * 0.25 }) },

    // ── FORTUNE BRANCH ──
    { id: `${heroId}_for_1`, branch: MasteryBranches.FORTUNE, tier: 1, name: 'Gold Sense', icon: '💰',
      desc: '+10% Coin drops per level', maxLevel: 5, effect: (lvl) => ({ coins: lvl * 0.10 }) },
    { id: `${heroId}_for_2`, branch: MasteryBranches.FORTUNE, tier: 2, name: 'Lucky Find', icon: '🍀',
      desc: '+2% Loot chance per level', maxLevel: 3, effect: (lvl) => ({ loot: lvl * 0.02 }) },
    { id: `${heroId}_for_3`, branch: MasteryBranches.FORTUNE, tier: 3, name: 'Star Harvest', icon: '✨',
      desc: '+12% Stardust per level', maxLevel: 3, effect: (lvl) => ({ stardust: lvl * 0.12 }) },
    { id: `${heroId}_for_4`, branch: MasteryBranches.FORTUNE, tier: 4, name: 'Gem Radar', icon: '💎',
      desc: '+1% Gem chance per level', maxLevel: 3, effect: (lvl) => ({ gems: lvl * 0.01 }) },
    { id: `${heroId}_for_5`, branch: MasteryBranches.FORTUNE, tier: 5, name: 'Midas Touch', icon: '👑',
      desc: '+30% all resource drops (capstone)', maxLevel: 1, effect: (lvl) => ({ coins: lvl * 0.30, stardust: lvl * 0.30 }) },

    // ── GUARDIAN BRANCH ──
    { id: `${heroId}_gua_1`, branch: MasteryBranches.GUARDIAN, tier: 1, name: 'Iron Will', icon: '🛡️',
      desc: '+5% Familiar DPS per level', maxLevel: 5, effect: (lvl) => ({ familiar: lvl * 0.05 }) },
    { id: `${heroId}_gua_2`, branch: MasteryBranches.GUARDIAN, tier: 2, name: 'Battle Aura', icon: '🔮',
      desc: '+3% Party DPS aura per level', maxLevel: 3, effect: (lvl) => ({ partyDps: lvl * 0.03 }) },
    { id: `${heroId}_gua_3`, branch: MasteryBranches.GUARDIAN, tier: 3, name: 'Life Drain', icon: '💚',
      desc: '+2% Lifesteal per level', maxLevel: 3, effect: (lvl) => ({ lifesteal: lvl * 0.02 }) },
    { id: `${heroId}_gua_4`, branch: MasteryBranches.GUARDIAN, tier: 4, name: 'Veteran Presence', icon: '⭐',
      desc: '+8% XP gain per level', maxLevel: 3, effect: (lvl) => ({ xp: lvl * 0.08 }) },
    { id: `${heroId}_gua_5`, branch: MasteryBranches.GUARDIAN, tier: 5, name: 'Immortal Spirit', icon: '♾️',
      desc: '+20% all stats (capstone)', maxLevel: 1, effect: (lvl) => ({ dps: lvl * 0.20, coins: lvl * 0.20, familiar: lvl * 0.20 }) },
  ];
}

// Cache of generated trees per heroId
const _treeCache = {};

/**
 * Get the mastery tree for a specific hero
 */
export function getHeroMasteryTree(heroId) {
  if (!_treeCache[heroId]) {
    _treeCache[heroId] = makeMasteryTree(heroId);
  }
  return _treeCache[heroId];
}

/**
 * Get mastery points available: 1 per prestige starting at prestige 3
 */
export function getMasteryPointsAvailable(prestigeCount, spentPoints) {
  const totalEarned = Math.max(0, prestigeCount - 2); // Starts at prestige 3
  return totalEarned - spentPoints;
}

/**
 * Get cost to unlock/upgrade a mastery node
 */
export function getMasteryNodeCost(node, currentLevel) {
  if (currentLevel >= node.maxLevel) return Infinity;
  return node.tier; // tier 1 = 1 point, tier 5 = 5 points
}

/**
 * Check if a node can be unlocked (requires all lower-tier nodes in same branch to have level >= 1)
 */
export function canUnlockMasteryNode(heroId, nodeId, masteryState) {
  const tree = getHeroMasteryTree(heroId);
  const node = tree.find(n => n.id === nodeId);
  if (!node) return false;

  const heroMastery = masteryState[heroId] || {};

  // Check prerequisite: all lower tiers in same branch must have at least 1 level
  for (let t = 1; t < node.tier; t++) {
    const prereq = tree.find(n => n.branch === node.branch && n.tier === t);
    if (prereq && (heroMastery[prereq.id] || 0) < 1) return false;
  }
  return true;
}

/**
 * Get total mastery bonuses for a specific hero
 */
export function getHeroMasteryBonuses(heroId, masteryState) {
  const tree = getHeroMasteryTree(heroId);
  const heroMastery = masteryState[heroId] || {};

  const bonuses = {
    dps: 0, crit: 0, critDmg: 0, multiStrike: 0,
    coins: 0, loot: 0, stardust: 0, gems: 0,
    familiar: 0, partyDps: 0, lifesteal: 0, xp: 0,
  };

  tree.forEach(node => {
    const lvl = heroMastery[node.id] || 0;
    if (lvl > 0) {
      const fx = node.effect(lvl);
      Object.keys(fx).forEach(key => {
        if (bonuses[key] !== undefined) bonuses[key] += fx[key];
      });
    }
  });

  return bonuses;
}

/**
 * Get total mastery points spent for a hero
 */
export function getHeroMasteryPointsSpent(heroId, masteryState) {
  const tree = getHeroMasteryTree(heroId);
  const heroMastery = masteryState[heroId] || {};
  let spent = 0;
  tree.forEach(node => {
    const lvl = heroMastery[node.id] || 0;
    spent += lvl * node.tier;
  });
  return spent;
}

/**
 * Get total mastery points spent across ALL heroes
 */
export function getTotalMasteryPointsSpent(masteryState) {
  let total = 0;
  Object.keys(masteryState).forEach(heroId => {
    total += getHeroMasteryPointsSpent(heroId, masteryState);
  });
  return total;
}
