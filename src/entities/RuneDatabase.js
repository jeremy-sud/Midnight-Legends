// ── Rune Database ─────────────────────────────────────────────────
// Runes are socketable enhancements obtained from Tower victories.
// Each item can hold 0-2 rune slots based on rarity:
//   Common = 0, Rare = 1, Epic = 1, Legendary = 2

export const RuneTiers = {
  MINOR:  { id: 'minor',  name: 'Minor',  color: '#78909c', mult: 1 },
  MAJOR:  { id: 'major',  name: 'Major',  color: '#7c4dff', mult: 2 },
  GRAND:  { id: 'grand',  name: 'Grand',  color: '#ffab00', mult: 3.5 },
};

export const RuneTypes = {
  POWER:    { id: 'power',    name: 'Power',    icon: '⚔️', color: '#ef5350' },
  FORTUNE:  { id: 'fortune',  name: 'Fortune',  icon: '💰', color: '#ffd54f' },
  PRECISION:{ id: 'precision',name: 'Precision', icon: '🎯', color: '#4fc3f7' },
  VITALITY: { id: 'vitality', name: 'Vitality', icon: '💚', color: '#66bb6a' },
  ARCANE:   { id: 'arcane',   name: 'Arcane',   icon: '🔮', color: '#ce93d8' },
};

// Rune templates: 5 types × 3 tiers = 15 templates
export const RuneTemplate = [
  // ── POWER (DPS bonus) ──
  { id: 'r_power_minor',    type: 'power',    tier: 'minor', name: 'Minor Rune of Power',       baseBonus: { stat: 'dps',   value: 0.05 }, desc: '+5% DPS',  svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12,2 15,9 22,9 17,14 19,22 12,18 5,22 7,14 2,9 9,9" /></svg>' },
  { id: 'r_power_major',    type: 'power',    tier: 'major', name: 'Major Rune of Power',       baseBonus: { stat: 'dps',   value: 0.05 }, desc: '+10% DPS', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12,2 15,9 22,9 17,14 19,22 12,18 5,22 7,14 2,9 9,9" /><circle cx="12" cy="12" r="3" /></svg>' },
  { id: 'r_power_grand',    type: 'power',    tier: 'grand', name: 'Grand Rune of Power',       baseBonus: { stat: 'dps',   value: 0.05 }, desc: '+17% DPS', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12,2 15,9 22,9 17,14 19,22 12,18 5,22 7,14 2,9 9,9" /><circle cx="12" cy="12" r="3" fill="currentColor" /></svg>' },

  // ── FORTUNE (Coin bonus) ──
  { id: 'r_fortune_minor',  type: 'fortune',  tier: 'minor', name: 'Minor Rune of Fortune',     baseBonus: { stat: 'coins', value: 0.08 }, desc: '+8% Coins',  svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 9.5c0-2 1.5-2.5 4-2.5s4 .5 4 2.5-2 2.5-4 3-4 1-4 3 1.5 2.5 4 2.5 4-.5 4-2.5"/></svg>' },
  { id: 'r_fortune_major',  type: 'fortune',  tier: 'major', name: 'Major Rune of Fortune',     baseBonus: { stat: 'coins', value: 0.08 }, desc: '+16% Coins', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 9.5c0-2 1.5-2.5 4-2.5s4 .5 4 2.5-2 2.5-4 3-4 1-4 3 1.5 2.5 4 2.5 4-.5 4-2.5"/><circle cx="12" cy="12" r="4" /></svg>' },
  { id: 'r_fortune_grand',  type: 'fortune',  tier: 'grand', name: 'Grand Rune of Fortune',     baseBonus: { stat: 'coins', value: 0.08 }, desc: '+28% Coins', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 9.5c0-2 1.5-2.5 4-2.5s4 .5 4 2.5-2 2.5-4 3-4 1-4 3 1.5 2.5 4 2.5 4-.5 4-2.5"/><circle cx="12" cy="12" r="4" fill="currentColor" /></svg>' },

  // ── PRECISION (Crit bonus) ──
  { id: 'r_prec_minor',     type: 'precision',tier: 'minor', name: 'Minor Rune of Precision',   baseBonus: { stat: 'crit',  value: 3 },    desc: '+3% Crit',  svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>' },
  { id: 'r_prec_major',     type: 'precision',tier: 'major', name: 'Major Rune of Precision',   baseBonus: { stat: 'crit',  value: 3 },    desc: '+6% Crit',  svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>' },
  { id: 'r_prec_grand',     type: 'precision',tier: 'grand', name: 'Grand Rune of Precision',   baseBonus: { stat: 'crit',  value: 3 },    desc: '+10.5% Crit', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6" fill="currentColor" opacity="0.15"/><circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>' },

  // ── VITALITY (Lifesteal / healing) ──
  { id: 'r_vital_minor',    type: 'vitality', tier: 'minor', name: 'Minor Rune of Vitality',    baseBonus: { stat: 'lifesteal', value: 0.01 }, desc: '+1% Lifesteal', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>' },
  { id: 'r_vital_major',    type: 'vitality', tier: 'major', name: 'Major Rune of Vitality',    baseBonus: { stat: 'lifesteal', value: 0.01 }, desc: '+2% Lifesteal', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/><circle cx="12" cy="12" r="3"/></svg>' },
  { id: 'r_vital_grand',    type: 'vitality', tier: 'grand', name: 'Grand Rune of Vitality',    baseBonus: { stat: 'lifesteal', value: 0.01 }, desc: '+3.5% Lifesteal', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>' },

  // ── ARCANE (All damage amp) ──
  { id: 'r_arcane_minor',   type: 'arcane',   tier: 'minor', name: 'Minor Rune of Arcane',      baseBonus: { stat: 'dmg_amp', value: 0.03 }, desc: '+3% All DMG',  svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>' },
  { id: 'r_arcane_major',   type: 'arcane',   tier: 'major', name: 'Major Rune of Arcane',      baseBonus: { stat: 'dmg_amp', value: 0.03 }, desc: '+6% All DMG',  svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/><circle cx="12" cy="10" r="2"/></svg>' },
  { id: 'r_arcane_grand',   type: 'arcane',   tier: 'grand', name: 'Grand Rune of Arcane',      baseBonus: { stat: 'dmg_amp', value: 0.03 }, desc: '+10.5% All DMG', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/><circle cx="12" cy="10" r="2" fill="currentColor"/></svg>' },
];

// How many rune slots each item rarity grants
export function getRuneSlots(rarity) {
  switch (rarity.id) {
    case 'legendary': return 2;
    case 'epic':      return 1;
    case 'rare':      return 1;
    default:          return 0;
  }
}

// Get the computed bonus of a rune instance
export function getRuneBonus(runeInstance) {
  const template = RuneTemplate.find(r => r.id === runeInstance.templateId);
  if (!template) return null;
  const tierData = Object.values(RuneTiers).find(t => t.id === template.tier);
  return {
    stat:  template.baseBonus.stat,
    value: template.baseBonus.value * tierData.mult,
  };
}

// Get display info for a rune instance
export function getRuneInfo(runeInstance) {
  const template = RuneTemplate.find(r => r.id === runeInstance.templateId);
  if (!template) return null;
  const tierData = Object.values(RuneTiers).find(t => t.id === template.tier);
  const typeData = Object.values(RuneTypes).find(t => t.id === template.type);
  const bonus = getRuneBonus(runeInstance);
  return {
    ...template,
    tierData,
    typeData,
    computedBonus: bonus,
    displayName: template.name,
  };
}

// Generate a random rune drop (from Tower victories)
export function generateRuneDrop(towerFloor) {
  // Higher floors → better tier chance
  const rand = Math.random();
  let tier;
  if (towerFloor >= 18) {
    tier = rand < 0.20 ? 'grand' : rand < 0.55 ? 'major' : 'minor';
  } else if (towerFloor >= 10) {
    tier = rand < 0.08 ? 'grand' : rand < 0.40 ? 'major' : 'minor';
  } else {
    tier = rand < 0.02 ? 'grand' : rand < 0.20 ? 'major' : 'minor';
  }

  // Pick random type
  const types = Object.values(RuneTypes);
  const type = types[Math.floor(Math.random() * types.length)];

  // Find matching template
  const template = RuneTemplate.find(r => r.type === type.id && r.tier === tier);

  return {
    uid: 'rn_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    templateId: template.id,
  };
}
