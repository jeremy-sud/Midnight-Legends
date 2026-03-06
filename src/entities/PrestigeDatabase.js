/**
 * Prestige (Void Rebirth) — spend Essence for permanent multipliers that persist across resets
 */

export const PrestigeUpgrades = [
  {
    id: 'pup_dps',
    name: 'Void Strength',
    icon: '💀',
    desc: 'All DPS increased by 20% per level.',
    maxLevel: 20,
    essenceCost: (lvl) => Math.floor(5 * Math.pow(1.6, lvl)),
    effect: (lvl) => 1 + lvl * 0.20,
    label: 'DPS ×',
  },
  {
    id: 'pup_coins',
    name: 'Void Avarice',
    icon: '💰',
    desc: 'All coin drops increased by 25% per level.',
    maxLevel: 20,
    essenceCost: (lvl) => Math.floor(4 * Math.pow(1.5, lvl)),
    effect: (lvl) => 1 + lvl * 0.25,
    label: 'Coins ×',
  },
  {
    id: 'pup_xp',
    name: 'Void Insight',
    icon: '📘',
    desc: 'XP gain increased by 30% per level.',
    maxLevel: 15,
    essenceCost: (lvl) => Math.floor(6 * Math.pow(1.7, lvl)),
    effect: (lvl) => 1 + lvl * 0.30,
    label: 'XP ×',
  },
  {
    id: 'pup_stardust',
    name: 'Void Radiance',
    icon: '✨',
    desc: 'Stardust drops increased by 30% per level.',
    maxLevel: 15,
    essenceCost: (lvl) => Math.floor(8 * Math.pow(1.6, lvl)),
    effect: (lvl) => 1 + lvl * 0.30,
    label: 'Stardust ×',
  },
  {
    id: 'pup_gems',
    name: 'Void Resonance',
    icon: '💎',
    desc: 'Gem drop chance increased by 2% per level.',
    maxLevel: 10,
    essenceCost: (lvl) => Math.floor(10 * Math.pow(1.8, lvl)),
    effect: (lvl) => lvl * 0.02,
    label: 'Gem Chance +',
  },
  {
    id: 'pup_click',
    name: 'Void Impact',
    icon: '🫳',
    desc: 'Click damage increased by 30% per level.',
    maxLevel: 15,
    essenceCost: (lvl) => Math.floor(5 * Math.pow(1.5, lvl)),
    effect: (lvl) => 1 + lvl * 0.30,
    label: 'Click ×',
  },
  {
    id: 'pup_start_stage',
    name: 'Void Momentum',
    icon: '🚀',
    desc: 'Start each rebirth at a higher stage (+5 per level).',
    maxLevel: 10,
    essenceCost: (lvl) => Math.floor(15 * Math.pow(2.0, lvl)),
    effect: (lvl) => lvl * 5,
    label: 'Start Stage +',
  },
  {
    id: 'pup_familiar',
    name: 'Void Companion',
    icon: '🐾',
    desc: 'Familiar damage increased by 25% per level.',
    maxLevel: 15,
    essenceCost: (lvl) => Math.floor(6 * Math.pow(1.6, lvl)),
    effect: (lvl) => 1 + lvl * 0.25,
    label: 'Familiar ×',
  },
];

/**
 * Get total prestige bonuses from current prestige upgrade levels
 */
export function getPrestigeBonuses(prestigeUpgrades) {
  const bonuses = {
    dpsMultiplier: 1,
    coinMultiplier: 1,
    xpMultiplier: 1,
    stardustMultiplier: 1,
    gemChanceBonus: 0,
    clickMultiplier: 1,
    startStageBonus: 0,
    familiarMultiplier: 1,
  };

  const mapping = {
    pup_dps: 'dpsMultiplier',
    pup_coins: 'coinMultiplier',
    pup_xp: 'xpMultiplier',
    pup_stardust: 'stardustMultiplier',
    pup_gems: 'gemChanceBonus',
    pup_click: 'clickMultiplier',
    pup_start_stage: 'startStageBonus',
    pup_familiar: 'familiarMultiplier',
  };

  PrestigeUpgrades.forEach(upg => {
    const lvl = prestigeUpgrades[upg.id] || 0;
    if (lvl > 0) {
      const key = mapping[upg.id];
      const val = upg.effect(lvl);
      if (key.includes('Multiplier')) {
        bonuses[key] = val;
      } else {
        bonuses[key] = val;
      }
    }
  });

  return bonuses;
}

/**
 * Calculate how much essence a prestige would yield based on current stage
 * Formula: floor(sqrt(stage - 49)) — minimum stage 50
 */
export function calculatePrestigeGain(currentStage) {
  if (currentStage < 50) return 0;
  return Math.floor(Math.sqrt(currentStage - 49)) + Math.floor((currentStage - 49) / 25);
}
