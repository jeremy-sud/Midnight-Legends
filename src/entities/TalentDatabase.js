/**
 * Global Talent System — Passive talent tree unlocked at profile level 10
 * Talents provide permanent global bonuses purchased with Stardust
 * Three branches: Offense, Economy, Utility (8 talents each = 24 total)
 * Each talent has 10 levels
 */

export const TalentBranches = {
  OFFENSE: 'offense',
  ECONOMY: 'economy',
  UTILITY: 'utility',
};

export const TalentDatabase = [
  // ── OFFENSE BRANCH ──
  { id: 'tal_raw_power', branch: TalentBranches.OFFENSE, tier: 1,
    name: 'Raw Power', icon: '⚔️', color: '#ff1744',
    desc: '+5% global DPS per level',
    maxLevel: 10, baseCost: 500, costMult: 1.8,
    effect: (lvl) => ({ dpsMultiplier: 1 + lvl * 0.05 }),
  },
  { id: 'tal_precision', branch: TalentBranches.OFFENSE, tier: 2,
    name: 'Precision', icon: '🎯', color: '#ff5252',
    desc: '+2% Crit Chance per level',
    maxLevel: 10, baseCost: 800, costMult: 2.0,
    effect: (lvl) => ({ critChanceBonus: lvl * 0.02 }),
  },
  { id: 'tal_devastation', branch: TalentBranches.OFFENSE, tier: 3,
    name: 'Devastation', icon: '💀', color: '#d50000',
    desc: '+20% Crit Damage per level',
    maxLevel: 10, baseCost: 1200, costMult: 2.2,
    effect: (lvl) => ({ critDmgBonus: lvl * 0.20 }),
  },
  { id: 'tal_combo_master', branch: TalentBranches.OFFENSE, tier: 4,
    name: 'Combo Master', icon: '🔥', color: '#ff6e40',
    desc: '+10% Combo decay time per level',
    maxLevel: 10, baseCost: 1500, costMult: 2.0,
    effect: (lvl) => ({ comboDecayReduction: lvl * 0.10 }),
  },
  { id: 'tal_click_fury', branch: TalentBranches.OFFENSE, tier: 5,
    name: 'Click Fury', icon: '👊', color: '#ff3d00',
    desc: '+8% Click Damage per level',
    maxLevel: 10, baseCost: 2000, costMult: 2.0,
    effect: (lvl) => ({ clickMultiplier: 1 + lvl * 0.08 }),
  },
  { id: 'tal_element_mastery', branch: TalentBranches.OFFENSE, tier: 6,
    name: 'Elemental Mastery', icon: '🌀', color: '#e040fb',
    desc: '+5% Element advantage bonus per level',
    maxLevel: 10, baseCost: 3000, costMult: 2.5,
    effect: (lvl) => ({ elementBonus: lvl * 0.05 }),
  },
  { id: 'tal_double_strike', branch: TalentBranches.OFFENSE, tier: 7,
    name: 'Double Strike', icon: '⚡', color: '#ffab00',
    desc: '+3% Multi-strike chance per level',
    maxLevel: 10, baseCost: 5000, costMult: 2.5,
    effect: (lvl) => ({ multiStrikeBonus: lvl * 0.03 }),
  },
  { id: 'tal_warlord', branch: TalentBranches.OFFENSE, tier: 8,
    name: 'Warlord', icon: '🏴', color: '#b71c1c',
    desc: '+3% all damage per level (multiplicative)',
    maxLevel: 10, baseCost: 10000, costMult: 3.0,
    effect: (lvl) => ({ allDmgAmp: lvl * 0.03 }),
  },

  // ── ECONOMY BRANCH ──
  { id: 'tal_gold_rush', branch: TalentBranches.ECONOMY, tier: 1,
    name: 'Gold Rush', icon: '💰', color: '#ffd54f',
    desc: '+8% Coin drops per level',
    maxLevel: 10, baseCost: 500, costMult: 1.8,
    effect: (lvl) => ({ coinMultiplier: 1 + lvl * 0.08 }),
  },
  { id: 'tal_star_collector', branch: TalentBranches.ECONOMY, tier: 2,
    name: 'Star Collector', icon: '✨', color: '#ffab40',
    desc: '+6% Stardust drops per level',
    maxLevel: 10, baseCost: 800, costMult: 2.0,
    effect: (lvl) => ({ stardustMultiplier: 1 + lvl * 0.06 }),
  },
  { id: 'tal_gem_hunter', branch: TalentBranches.ECONOMY, tier: 3,
    name: 'Gem Hunter', icon: '💎', color: '#4fc3f7',
    desc: '+1% Gem chance per level',
    maxLevel: 10, baseCost: 1200, costMult: 2.2,
    effect: (lvl) => ({ gemChanceBonus: lvl * 0.01 }),
  },
  { id: 'tal_essence_siphon', branch: TalentBranches.ECONOMY, tier: 4,
    name: 'Essence Siphon', icon: '🌀', color: '#ce93d8',
    desc: '+5% Essence from prestige per level',
    maxLevel: 10, baseCost: 2000, costMult: 2.5,
    effect: (lvl) => ({ essenceMultiplier: 1 + lvl * 0.05 }),
  },
  { id: 'tal_loot_magnet', branch: TalentBranches.ECONOMY, tier: 5,
    name: 'Loot Magnet', icon: '🧲', color: '#ff6d00',
    desc: '+2% Loot drop chance per level',
    maxLevel: 10, baseCost: 3000, costMult: 2.5,
    effect: (lvl) => ({ lootChanceBonus: lvl * 0.02 }),
  },
  { id: 'tal_xp_scholar', branch: TalentBranches.ECONOMY, tier: 6,
    name: 'XP Scholar', icon: '📚', color: '#64ffda',
    desc: '+10% XP gains per level',
    maxLevel: 10, baseCost: 4000, costMult: 2.0,
    effect: (lvl) => ({ xpMultiplier: 1 + lvl * 0.10 }),
  },
  { id: 'tal_salvage_expert', branch: TalentBranches.ECONOMY, tier: 7,
    name: 'Salvage Expert', icon: '🔧', color: '#a1887f',
    desc: '+15% materials from dismantling per level',
    maxLevel: 10, baseCost: 5000, costMult: 2.5,
    effect: (lvl) => ({ salvageBonus: lvl * 0.15 }),
  },
  { id: 'tal_fortune', branch: TalentBranches.ECONOMY, tier: 8,
    name: 'Fortune', icon: '🏆', color: '#ffd740',
    desc: '+4% all resource gains per level (multiplicative)',
    maxLevel: 10, baseCost: 10000, costMult: 3.0,
    effect: (lvl) => ({ allResourceAmp: lvl * 0.04 }),
  },

  // ── UTILITY BRANCH ──
  { id: 'tal_familiar_bond', branch: TalentBranches.UTILITY, tier: 1,
    name: 'Familiar Bond', icon: '🐾', color: '#81c784',
    desc: '+8% Familiar DPS per level',
    maxLevel: 10, baseCost: 500, costMult: 1.8,
    effect: (lvl) => ({ familiarMultiplier: 1 + lvl * 0.08 }),
  },
  { id: 'tal_pet_harmony', branch: TalentBranches.UTILITY, tier: 2,
    name: 'Pet Harmony', icon: '💚', color: '#69f0ae',
    desc: '+5% Pet mood decay reduction per level',
    maxLevel: 10, baseCost: 800, costMult: 2.0,
    effect: (lvl) => ({ petMoodReduction: lvl * 0.05 }),
  },
  { id: 'tal_expeditionary', branch: TalentBranches.UTILITY, tier: 3,
    name: 'Expeditionary', icon: '🗺️', color: '#4db6ac',
    desc: '-5% Expedition time per level',
    maxLevel: 10, baseCost: 1200, costMult: 2.0,
    effect: (lvl) => ({ expeditionTimeReduction: lvl * 0.05 }),
  },
  { id: 'tal_offline_mastery', branch: TalentBranches.UTILITY, tier: 4,
    name: 'Offline Mastery', icon: '🌙', color: '#80cbc4',
    desc: '+3% Offline progress efficiency per level',
    maxLevel: 10, baseCost: 2000, costMult: 2.5,
    effect: (lvl) => ({ offlineEfficiency: lvl * 0.03 }),
  },
  { id: 'tal_tower_climber', branch: TalentBranches.UTILITY, tier: 5,
    name: 'Tower Climber', icon: '🏰', color: '#b388ff',
    desc: '+2s Tower timer per level',
    maxLevel: 10, baseCost: 3000, costMult: 2.5,
    effect: (lvl) => ({ towerTimeBonus: lvl * 2 }),
  },
  { id: 'tal_quick_spin', branch: TalentBranches.UTILITY, tier: 6,
    name: 'Quick Spin', icon: '🎰', color: '#f48fb1',
    desc: '+5% better Spin Wheel weights per level',
    maxLevel: 10, baseCost: 4000, costMult: 2.0,
    effect: (lvl) => ({ spinBonus: lvl * 0.05 }),
  },
  { id: 'tal_quest_tracker', branch: TalentBranches.UTILITY, tier: 7,
    name: 'Quest Tracker', icon: '📋', color: '#90caf9',
    desc: '+10% Quest reward bonus per level',
    maxLevel: 10, baseCost: 5000, costMult: 2.5,
    effect: (lvl) => ({ questRewardBonus: lvl * 0.10 }),
  },
  { id: 'tal_transcendence', branch: TalentBranches.UTILITY, tier: 8,
    name: 'Transcendence', icon: '♾️', color: '#e1bee7',
    desc: '+2% all non-combat bonuses per level (multiplicative)',
    maxLevel: 10, baseCost: 10000, costMult: 3.0,
    effect: (lvl) => ({ allUtilityAmp: lvl * 0.02 }),
  },
];

/**
 * Get stardust cost for a talent level
 */
export function getTalentCost(talentId, currentLevel) {
  const talent = TalentDatabase.find(t => t.id === talentId);
  if (!talent || currentLevel >= talent.maxLevel) return Infinity;
  return Math.floor(talent.baseCost * Math.pow(talent.costMult, currentLevel));
}

/**
 * Check if a talent can be unlocked (tier requirement: previous tier >= 1)
 */
export function canUnlockTalent(talentId, talentState) {
  const talent = TalentDatabase.find(t => t.id === talentId);
  if (!talent) return false;
  if (talent.tier <= 1) return true;

  // Find previous tier talent in same branch
  const prevTierTalent = TalentDatabase.find(
    t => t.branch === talent.branch && t.tier === talent.tier - 1
  );
  if (!prevTierTalent) return true;
  return (talentState[prevTierTalent.id] || 0) >= 1;
}

/**
 * Get total bonuses from all purchased talents
 */
export function getTalentBonuses(talentState) {
  const bonuses = {
    dpsMultiplier: 1, critChanceBonus: 0, critDmgBonus: 0,
    comboDecayReduction: 0, clickMultiplier: 1, elementBonus: 0,
    multiStrikeBonus: 0, allDmgAmp: 0,
    coinMultiplier: 1, stardustMultiplier: 1, gemChanceBonus: 0,
    essenceMultiplier: 1, lootChanceBonus: 0, xpMultiplier: 1,
    salvageBonus: 0, allResourceAmp: 0,
    familiarMultiplier: 1, petMoodReduction: 0, expeditionTimeReduction: 0,
    offlineEfficiency: 0, towerTimeBonus: 0, spinBonus: 0,
    questRewardBonus: 0, allUtilityAmp: 0,
  };

  TalentDatabase.forEach(talent => {
    const lvl = talentState[talent.id] || 0;
    if (lvl > 0) {
      const fx = talent.effect(lvl);
      Object.keys(fx).forEach(key => {
        if (bonuses[key] !== undefined) {
          // Multipliers compound, flat bonuses add
          if (key.includes('Multiplier')) {
            bonuses[key] *= fx[key];
          } else {
            bonuses[key] += fx[key];
          }
        }
      });
    }
  });

  return bonuses;
}

/**
 * Get total stardust spent on talents
 */
export function getTotalTalentStardustSpent(talentState) {
  let total = 0;
  TalentDatabase.forEach(talent => {
    const lvl = talentState[talent.id] || 0;
    for (let i = 0; i < lvl; i++) {
      total += Math.floor(talent.baseCost * Math.pow(talent.costMult, i));
    }
  });
  return total;
}
