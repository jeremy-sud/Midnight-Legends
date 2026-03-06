/**
 * SkillDatabase — Hero skills/abilities for the Midnight Gardens RPG.
 * Each hero can have 1-2 skills (unlocked at levels 5 and 15).
 * Skills are passive bonuses that activate automatically.
 */

export const SkillDatabase = [
  // === COMMON HEROES ===
  { heroId: 'h_peasant', skills: [
    { id: 'sk_peasant_1', name: 'Moonbeam',     icon: '🌙', desc: '+15% DPS at night stages (odd)',     unlockLevel: 5,  type: 'passive', effect: { dpsBonus: 0.15, condition: 'odd_stage' } },
    { id: 'sk_peasant_2', name: 'Lunar Shield',  icon: '🛡️', desc: '+10% coins from bosses',             unlockLevel: 15, type: 'passive', effect: { bossCoinsBonus: 0.10 } },
  ]},
  { heroId: 'h_militia', skills: [
    { id: 'sk_militia_1', name: 'Flame Burst',   icon: '🔥', desc: '+20% click damage',                  unlockLevel: 5,  type: 'passive', effect: { clickDmgBonus: 0.20 } },
    { id: 'sk_militia_2', name: 'Inferno',        icon: '🌋', desc: '+5% chance to deal 3× damage',       unlockLevel: 15, type: 'passive', effect: { megaCritChance: 0.05, megaCritMult: 3 } },
  ]},
  { heroId: 'h_scout', skills: [
    { id: 'sk_scout_1', name: 'Tidal Wave',     icon: '🌊', desc: '+10% party DPS',                     unlockLevel: 5,  type: 'passive', effect: { dpsBonus: 0.10 } },
    { id: 'sk_scout_2', name: 'Healing Rain',   icon: '💧', desc: '+15% XP gain',                       unlockLevel: 15, type: 'passive', effect: { xpBonus: 0.15 } },
  ]},
  { heroId: 'h_herbalist', skills: [
    { id: 'sk_herbalist_1', name: 'Nature\'s Remedy', icon: '🌿', desc: '+20% coin income',              unlockLevel: 5,  type: 'passive', effect: { coinBonus: 0.20 } },
    { id: 'sk_herbalist_2', name: 'Spore Cloud',      icon: '💥', desc: '+8% multi-strike chance',        unlockLevel: 15, type: 'passive', effect: { multiStrikeBonus: 0.08 } },
  ]},

  // === RARE HEROES ===
  { heroId: 'h_ranger', skills: [
    { id: 'sk_ranger_1', name: 'Shadow Step',     icon: '🌑', desc: '+15% click & DPS damage',            unlockLevel: 5,  type: 'passive', effect: { clickDmgBonus: 0.15, dpsBonus: 0.15 } },
    { id: 'sk_ranger_2', name: 'Void Rend',       icon: '🕳️', desc: '+5% gem drop chance',                unlockLevel: 15, type: 'passive', effect: { gemChanceBonus: 0.05 } },
  ]},
  { heroId: 'h_elementalist', skills: [
    { id: 'sk_elem_1', name: 'Radiance',        icon: '☀️', desc: '+20% XP and coins',                  unlockLevel: 5,  type: 'passive', effect: { xpBonus: 0.20, coinBonus: 0.20 } },
    { id: 'sk_elem_2', name: 'Solar Flare',     icon: '🌟', desc: '+15% crit damage',                   unlockLevel: 15, type: 'passive', effect: { critDmgBonus: 0.15 } },
  ]},
  { heroId: 'h_cleric', skills: [
    { id: 'sk_cleric_1', name: 'Frost Armor',   icon: '❄️', desc: '+12% party DPS',                     unlockLevel: 5,  type: 'passive', effect: { dpsBonus: 0.12 } },
    { id: 'sk_cleric_2', name: 'Blizzard',      icon: '🌨️', desc: '+20% stardust income',               unlockLevel: 15, type: 'passive', effect: { stardustBonus: 0.20 } },
  ]},
  { heroId: 'h_chrono_mage', skills: [
    { id: 'sk_chrono_1', name: 'Searing Touch', icon: '🔥', desc: '+30% click damage',                  unlockLevel: 5,  type: 'passive', effect: { clickDmgBonus: 0.30 } },
    { id: 'sk_chrono_2', name: 'Pyroclasm',     icon: '☄️', desc: '+10% loot drop chance',               unlockLevel: 15, type: 'passive', effect: { lootChanceBonus: 0.10 } },
  ]},

  // === EPIC HEROES ===
  { heroId: 'h_paladin', skills: [
    { id: 'sk_paladin_1', name: 'Twilight Blade', icon: '🗡️', desc: '+25% DPS and click damage',      unlockLevel: 5,  type: 'passive', effect: { dpsBonus: 0.25, clickDmgBonus: 0.25 } },
    { id: 'sk_paladin_2', name: 'Eclipse Nova',   icon: '🌑', desc: '+15% all currency income',        unlockLevel: 15, type: 'passive', effect: { coinBonus: 0.15, stardustBonus: 0.15, gemChanceBonus: 0.03 } },
  ]},
  { heroId: 'h_assassin', skills: [
    { id: 'sk_assassin_1', name: 'Northern Lights',  icon: '🌌', desc: '+20% party DPS',                 unlockLevel: 5,  type: 'passive', effect: { dpsBonus: 0.20 } },
    { id: 'sk_assassin_2', name: 'Celestial Harmony', icon: '✨', desc: '+25% XP and +10% crit chance',  unlockLevel: 15, type: 'passive', effect: { xpBonus: 0.25, critChanceBonus: 0.10 } },
  ]},
  { heroId: 'h_necromancer', skills: [
    { id: 'sk_necro_1', name: 'Charge Up',       icon: '⚡', desc: '+35% click damage',                 unlockLevel: 5,  type: 'passive', effect: { clickDmgBonus: 0.35 } },
    { id: 'sk_necro_2', name: 'Lightning Chain', icon: '🔗', desc: '+15% multi-strike chance',           unlockLevel: 15, type: 'passive', effect: { multiStrikeBonus: 0.15 } },
  ]},
  { heroId: 'h_dragon_knight', skills: [
    { id: 'sk_dragon_1', name: 'Drake\'s Fury',   icon: '🐉', desc: '+30% DPS and +10% crit damage',    unlockLevel: 5,  type: 'passive', effect: { dpsBonus: 0.30, critDmgBonus: 0.10 } },
    { id: 'sk_dragon_2', name: 'Infernal Breath', icon: '🔥', desc: '+20% all currency income',          unlockLevel: 15, type: 'passive', effect: { coinBonus: 0.20, stardustBonus: 0.20, gemChanceBonus: 0.05 } },
  ]},

  // === LEGENDARY HEROES ===
  { heroId: 'h_moon_king', skills: [
    { id: 'sk_moonking_1', name: 'Time Warp',      icon: '⏳', desc: '+30% DPS and familiar speed',      unlockLevel: 5,  type: 'passive', effect: { dpsBonus: 0.30, familiarSpeedBonus: 0.30 } },
    { id: 'sk_moonking_2', name: 'Temporal Rift',   icon: '🕐', desc: '+25% all currency + 15% crit',    unlockLevel: 15, type: 'passive', effect: { coinBonus: 0.25, stardustBonus: 0.25, critChanceBonus: 0.15 } },
  ]},
  { heroId: 'h_void_empress', skills: [
    { id: 'sk_empress_1', name: 'Rebirth Flame',  icon: '🔥', desc: '+40% click damage',               unlockLevel: 5,  type: 'passive', effect: { clickDmgBonus: 0.40 } },
    { id: 'sk_empress_2', name: 'Eternal Fire',   icon: '🏔️', desc: '+20% all bonuses',                unlockLevel: 15, type: 'passive', effect: { dpsBonus: 0.20, coinBonus: 0.20, xpBonus: 0.20, critDmgBonus: 0.20 } },
  ]},
];

/**
 * Get all skills for a specific hero that are unlocked at their level.
 * @param {string} heroId - Hero template ID
 * @param {number} level - Hero's current level
 * @returns {Array} Array of unlocked skill objects
 */
export function getHeroSkills(heroId, level) {
  const entry = SkillDatabase.find(s => s.heroId === heroId);
  if (!entry) return [];
  return entry.skills.filter(sk => level >= sk.unlockLevel);
}

/**
 * Get all skills for a hero (including locked ones).
 * @param {string} heroId
 * @returns {Array}
 */
export function getAllHeroSkills(heroId) {
  const entry = SkillDatabase.find(s => s.heroId === heroId);
  return entry ? entry.skills : [];
}

/**
 * Calculate aggregate skill bonuses for the active party.
 * @param {Array} activeParty - Array of hero UIDs
 * @param {Array} roster - Full roster
 * @returns {Object} Aggregated bonuses
 */
export function getPartySkillBonuses(activeParty, roster) {
  const bonuses = {
    dpsBonus: 0,
    clickDmgBonus: 0,
    coinBonus: 0,
    stardustBonus: 0,
    xpBonus: 0,
    critChanceBonus: 0,
    critDmgBonus: 0,
    gemChanceBonus: 0,
    lootChanceBonus: 0,
    familiarSpeedBonus: 0,
    multiStrikeBonus: 0,
    megaCritChance: 0,
    megaCritMult: 0,
    bossCoinsBonus: 0,
  };

  activeParty.forEach(uid => {
    const hero = roster.find(h => h.uid === uid);
    if (!hero) return;
    const skills = getHeroSkills(hero.id, hero.level);
    skills.forEach(sk => {
      const eff = sk.effect;
      if (eff.dpsBonus) bonuses.dpsBonus += eff.dpsBonus;
      if (eff.clickDmgBonus) bonuses.clickDmgBonus += eff.clickDmgBonus;
      if (eff.coinBonus) bonuses.coinBonus += eff.coinBonus;
      if (eff.stardustBonus) bonuses.stardustBonus += eff.stardustBonus;
      if (eff.xpBonus) bonuses.xpBonus += eff.xpBonus;
      if (eff.critChanceBonus) bonuses.critChanceBonus += eff.critChanceBonus;
      if (eff.critDmgBonus) bonuses.critDmgBonus += eff.critDmgBonus;
      if (eff.gemChanceBonus) bonuses.gemChanceBonus += eff.gemChanceBonus;
      if (eff.lootChanceBonus) bonuses.lootChanceBonus += eff.lootChanceBonus;
      if (eff.familiarSpeedBonus) bonuses.familiarSpeedBonus += eff.familiarSpeedBonus;
      if (eff.multiStrikeBonus) bonuses.multiStrikeBonus += eff.multiStrikeBonus;
      if (eff.megaCritChance) bonuses.megaCritChance += eff.megaCritChance;
      if (eff.megaCritMult) bonuses.megaCritMult = Math.max(bonuses.megaCritMult, eff.megaCritMult);
      if (eff.bossCoinsBonus) bonuses.bossCoinsBonus += eff.bossCoinsBonus;
    });
  });

  return bonuses;
}
