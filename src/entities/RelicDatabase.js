// ── Relic Database ────────────────────────────────────────────────
// Relics are permanent artifacts unlocked by completing collections.
// Their bonuses scale with prestige count.

export const RelicDatabase = [
  {
    id: 'rel_moonstone_crown',
    name: 'Moonstone Crown',
    desc: 'A crown forged from pure moonstone. Amplifies all damage.',
    icon: '👑',
    color: '#ffb74d',
    unlockCondition: 'col_legendary_heroes',
    unlockDesc: 'Complete "Legendary Council" collection',
    bonus: { stat: 'dps', base: 0.10, perPrestige: 0.03 },
    bonusDesc: (val) => `+${(val * 100).toFixed(0)}% DPS`,
  },
  {
    id: 'rel_void_shard',
    name: 'Void Shard',
    desc: 'A fragment of pure void energy. Increases essence gains.',
    icon: '🔮',
    color: '#7c4dff',
    unlockCondition: 'col_epic_heroes',
    unlockDesc: 'Complete "Epic Legends" collection',
    bonus: { stat: 'essence', base: 0.15, perPrestige: 0.05 },
    bonusDesc: (val) => `+${(val * 100).toFixed(0)}% Essence`,
  },
  {
    id: 'rel_golden_scales',
    name: 'Golden Scales',
    desc: 'Scales of an ancient dragon. Multiplies coin earnings.',
    icon: '⚖️',
    color: '#ffd54f',
    unlockCondition: 'col_common_heroes',
    unlockDesc: 'Complete "Common Brigade" collection',
    bonus: { stat: 'coins', base: 0.12, perPrestige: 0.04 },
    bonusDesc: (val) => `+${(val * 100).toFixed(0)}% Coins`,
  },
  {
    id: 'rel_star_compass',
    name: 'Star Compass',
    desc: 'Points toward hidden treasures. Boosts loot drops.',
    icon: '🧭',
    color: '#4fc3f7',
    unlockCondition: 'col_bestiary_10',
    unlockDesc: 'Complete "Monster Hunter" collection',
    bonus: { stat: 'loot', base: 0.05, perPrestige: 0.02 },
    bonusDesc: (val) => `+${(val * 100).toFixed(0)}% Loot Chance`,
  },
  {
    id: 'rel_crystal_hourglass',
    name: 'Crystal Hourglass',
    desc: 'Bends time itself. Accelerates XP gains.',
    icon: '⏳',
    color: '#ce93d8',
    unlockCondition: 'col_rare_heroes',
    unlockDesc: 'Complete "Rare Fellowship" collection',
    bonus: { stat: 'xp', base: 0.15, perPrestige: 0.05 },
    bonusDesc: (val) => `+${(val * 100).toFixed(0)}% XP`,
  },
  {
    id: 'rel_eclipse_mirror',
    name: 'Eclipse Mirror',
    desc: 'Reflects starlight into pure energy. Boosts stardust.',
    icon: '🪞',
    color: '#81d4fa',
    unlockCondition: 'col_items_all_types',
    unlockDesc: 'Complete "Arms Collector" collection',
    bonus: { stat: 'stardust', base: 0.12, perPrestige: 0.04 },
    bonusDesc: (val) => `+${(val * 100).toFixed(0)}% Stardust`,
  },
  {
    id: 'rel_phantom_quill',
    name: 'Phantom Quill',
    desc: 'Writes destiny into existence. Improves critical strikes.',
    icon: '🪶',
    color: '#b0bec5',
    unlockCondition: { type: 'prestige', count: 3 },
    unlockDesc: 'Prestige 3 times',
    bonus: { stat: 'crit', base: 5, perPrestige: 1 },
    bonusDesc: (val) => `+${val.toFixed(0)}% Crit Chance`,
  },
  {
    id: 'rel_ember_heart',
    name: 'Ember Heart',
    desc: 'A beating heart of eternal flame. Click power surges.',
    icon: '❤️‍🔥',
    color: '#ef5350',
    unlockCondition: { type: 'stage', value: 200 },
    unlockDesc: 'Reach Stage 200',
    bonus: { stat: 'click', base: 0.20, perPrestige: 0.05 },
    bonusDesc: (val) => `+${(val * 100).toFixed(0)}% Click DMG`,
  },
  {
    id: 'rel_nebula_core',
    name: 'Nebula Core',
    desc: 'Contains the energy of a dying star. Boosts gem drops.',
    icon: '💫',
    color: '#ff80ab',
    unlockCondition: { type: 'tower', floor: 15 },
    unlockDesc: 'Clear Tower Floor 15',
    bonus: { stat: 'gems', base: 0.03, perPrestige: 0.01 },
    bonusDesc: (val) => `+${(val * 100).toFixed(0)}% Gem Chance`,
  },
  {
    id: 'rel_ancient_codex',
    name: 'Ancient Codex',
    desc: 'Contains all knowledge of the Midnight Gardens. Universal bonus.',
    icon: '📜',
    color: '#a5d6a7',
    unlockCondition: { type: 'achievements', count: 50 },
    unlockDesc: 'Unlock 50 achievements',
    bonus: { stat: 'all', base: 0.05, perPrestige: 0.02 },
    bonusDesc: (val) => `+${(val * 100).toFixed(0)}% All Stats`,
  },
];

// Check if a relic is unlocked
export function isRelicUnlocked(relic, gameData) {
  const cond = relic.unlockCondition;

  // Collection-based unlock
  if (typeof cond === 'string') {
    // It's a collection ID — import-free check
    const completedCollections = gameData.completedCollections || [];
    return completedCollections.includes(cond);
  }

  // Object-based conditions
  if (cond.type === 'prestige') {
    return (gameData.prestigeCount || 0) >= cond.count;
  }
  if (cond.type === 'stage') {
    return (gameData.playerDamageStats?.highestStage || 1) >= cond.value;
  }
  if (cond.type === 'tower') {
    return (gameData.playerDamageStats?.highestTowerFloor || 1) >= cond.floor;
  }
  if (cond.type === 'achievements') {
    return (gameData.unlockedAchievements || []).length >= cond.count;
  }
  return false;
}

// Compute the bonus value factoring prestige count
export function getRelicBonusValue(relic, prestigeCount) {
  return relic.bonus.base + relic.bonus.perPrestige * prestigeCount;
}

// Get all relic bonuses for the current game state
export function getRelicBonuses(gameData) {
  const bonuses = {
    dpsMultiplier: 1.0,
    coinMultiplier: 1.0,
    xpMultiplier: 1.0,
    stardustMultiplier: 1.0,
    essenceMultiplier: 1.0,
    lootChanceBonus: 0,
    critBonus: 0,
    clickMultiplier: 1.0,
    gemChanceBonus: 0,
  };

  const prestige = gameData.prestigeCount || 0;

  for (const relic of RelicDatabase) {
    if (!isRelicUnlocked(relic, gameData)) continue;
    const val = getRelicBonusValue(relic, prestige);
    const stat = relic.bonus.stat;

    if (stat === 'dps')      bonuses.dpsMultiplier *= (1 + val);
    if (stat === 'coins')    bonuses.coinMultiplier *= (1 + val);
    if (stat === 'xp')       bonuses.xpMultiplier *= (1 + val);
    if (stat === 'stardust') bonuses.stardustMultiplier *= (1 + val);
    if (stat === 'essence')  bonuses.essenceMultiplier *= (1 + val);
    if (stat === 'loot')     bonuses.lootChanceBonus += val;
    if (stat === 'crit')     bonuses.critBonus += val / 100;
    if (stat === 'click')    bonuses.clickMultiplier *= (1 + val);
    if (stat === 'gems')     bonuses.gemChanceBonus += val;
    if (stat === 'all') {
      bonuses.dpsMultiplier *= (1 + val);
      bonuses.coinMultiplier *= (1 + val);
      bonuses.xpMultiplier *= (1 + val);
      bonuses.stardustMultiplier *= (1 + val);
    }
  }

  return bonuses;
}
