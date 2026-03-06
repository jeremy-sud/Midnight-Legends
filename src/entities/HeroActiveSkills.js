// ── Hero Active Skills ──────────────────────────────────────────────
// Each hero has ONE active skill that can be triggered (auto or manual).
// Skills have a cooldown (ms) and an effect.
// Effects: burst damage, apply status, buff party, heal, etc.

export const HeroActiveSkills = {
  // ─── COMMON ───
  h_peasant: {
    id: 'skill_harvest',
    name: 'Harvest Strike',
    icon: '🌾',
    desc: 'Deals 3× hero DPS as burst damage.',
    cooldownMs: 12000,
    type: 'burst',
    dmgMult: 3,
  },
  h_militia: {
    id: 'skill_rally',
    name: 'Rally Cry',
    icon: '📯',
    desc: 'Boosts party DPS by 20% for 5s.',
    cooldownMs: 18000,
    type: 'buff_party',
    stat: 'dps',
    value: 0.20,
    durationMs: 5000,
  },
  h_scout: {
    id: 'skill_ambush',
    name: 'Ambush',
    icon: '🗡️',
    desc: 'Guaranteed critical hit dealing 5× hero DPS.',
    cooldownMs: 15000,
    type: 'burst',
    dmgMult: 5,
    guaranteed_crit: true,
  },
  h_herbalist: {
    id: 'skill_nature_balm',
    name: 'Nature\'s Balm',
    icon: '🌿',
    desc: 'Applies Poison to enemy for 5s.',
    cooldownMs: 14000,
    type: 'apply_status',
    statusEffect: 'poison',
  },

  // ─── RARE ───
  h_ranger: {
    id: 'skill_volley',
    name: 'Arrow Volley',
    icon: '🏹',
    desc: 'Fires 5 arrows, each dealing hero DPS.',
    cooldownMs: 16000,
    type: 'multi_hit',
    hits: 5,
    dmgMult: 1,
  },
  h_elementalist: {
    id: 'skill_inferno',
    name: 'Inferno Blast',
    icon: '🔥',
    desc: 'Deals 8× DPS and applies Burn.',
    cooldownMs: 20000,
    type: 'burst_status',
    dmgMult: 8,
    statusEffect: 'burn',
  },
  h_cleric: {
    id: 'skill_divine_light',
    name: 'Divine Light',
    icon: '✨',
    desc: 'Boosts coin drops by 50% for 8s.',
    cooldownMs: 25000,
    type: 'buff_party',
    stat: 'coins',
    value: 0.50,
    durationMs: 8000,
  },
  h_chrono_mage: {
    id: 'skill_time_warp',
    name: 'Time Warp',
    icon: '⏳',
    desc: 'Freezes enemy for 3s and deals 4× DPS.',
    cooldownMs: 22000,
    type: 'burst_status',
    dmgMult: 4,
    statusEffect: 'freeze',
  },

  // ─── EPIC ───
  h_paladin: {
    id: 'skill_holy_smite',
    name: 'Holy Smite',
    icon: '⚡',
    desc: 'Massive 15× DPS burst. Stuns enemy for 2s.',
    cooldownMs: 28000,
    type: 'burst_status',
    dmgMult: 15,
    statusEffect: 'stun',
  },
  h_assassin: {
    id: 'skill_shadow_dance',
    name: 'Shadow Dance',
    icon: '💀',
    desc: 'Applies Bleed (stacking) and deals 10× DPS.',
    cooldownMs: 18000,
    type: 'burst_status',
    dmgMult: 10,
    statusEffect: 'bleed',
  },
  h_necromancer: {
    id: 'skill_soul_drain',
    name: 'Soul Drain',
    icon: '👻',
    desc: 'Deals 12× DPS. Bonus stardust on kill.',
    cooldownMs: 24000,
    type: 'burst',
    dmgMult: 12,
    bonusStardust: 3,
  },
  h_dragon_knight: {
    id: 'skill_dragon_breath',
    name: 'Dragon Breath',
    icon: '🐉',
    desc: 'Burns enemy for 20× DPS over 6s.',
    cooldownMs: 30000,
    type: 'burst_status',
    dmgMult: 20,
    statusEffect: 'burn',
  },

  // ─── LEGENDARY ───
  h_moon_king: {
    id: 'skill_moonfall',
    name: 'Moonfall',
    icon: '🌙',
    desc: 'Cataclysmic 50× DPS burst. Stuns 3s.',
    cooldownMs: 45000,
    type: 'burst_status',
    dmgMult: 50,
    statusEffect: 'stun',
  },
  h_void_empress: {
    id: 'skill_void_collapse',
    name: 'Void Collapse',
    icon: '🌀',
    desc: 'Annihilates with 80× DPS. Applies all DoTs.',
    cooldownMs: 60000,
    type: 'burst_status',
    dmgMult: 80,
    statusEffect: 'all_dots',
  },
};

/**
 * Get the active skill data for a hero
 * @param {string} heroId - e.g. 'h_paladin'
 * @returns {object|null}
 */
export function getHeroActiveSkill(heroId) {
  return HeroActiveSkills[heroId] || null;
}

/**
 * Calculate the effective DPS for a skill based on hero DPS
 * @param {object} skill - skill data from HeroActiveSkills
 * @param {number} heroDps - the hero's current DPS
 * @returns {number} total burst damage
 */
export function getSkillDamage(skill, heroDps) {
  if (!skill) return 0;
  if (skill.type === 'multi_hit') {
    return heroDps * (skill.dmgMult || 1) * (skill.hits || 1);
  }
  return heroDps * (skill.dmgMult || 0);
}
