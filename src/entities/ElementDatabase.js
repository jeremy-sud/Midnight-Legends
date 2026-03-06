// ── Element & Status Effect System ──────────────────────────────────
// 5 elements with a weakness wheel:
//   Fire  → Ice  → Shadow → Light → Void → Fire
// Hitting a weakness = 1.5× dmg, resisting = 0.7× dmg, neutral = 1.0×

export const Elements = {
  FIRE:   { id: 'fire',   name: 'Fire',   icon: '🔥', color: '#ff5722' },
  ICE:    { id: 'ice',    name: 'Ice',    icon: '❄️', color: '#40c4ff' },
  SHADOW: { id: 'shadow', name: 'Shadow', icon: '🌑', color: '#7e57c2' },
  LIGHT:  { id: 'light',  name: 'Light',  icon: '✨', color: '#ffeb3b' },
  VOID:   { id: 'void',   name: 'Void',   icon: '🌀', color: '#ea80fc' },
};

// Attacker element → defender element → multiplier
const WEAKNESS_MAP = {
  fire:   { ice: 1.5,    shadow: 1.0, light: 1.0, void: 0.7,  fire: 1.0 },
  ice:    { shadow: 1.5, light: 1.0,  void: 1.0,  fire: 0.7,  ice: 1.0 },
  shadow: { light: 1.5,  void: 1.0,   fire: 1.0,  ice: 0.7,   shadow: 1.0 },
  light:  { void: 1.5,   fire: 1.0,   ice: 1.0,   shadow: 0.7, light: 1.0 },
  void:   { fire: 1.5,   ice: 1.0,    shadow: 1.0, light: 0.7, void: 1.0 },
};

/**
 * Get damage multiplier for attacker element vs defender element
 * @param {string} attackEl  - attacker element id (e.g. 'fire')
 * @param {string} defendEl  - defender element id
 * @returns {{ mult: number, label: string }}
 */
export function getElementMultiplier(attackEl, defendEl) {
  if (!attackEl || !defendEl) return { mult: 1, label: '' };
  const row = WEAKNESS_MAP[attackEl];
  if (!row) return { mult: 1, label: '' };
  const mult = row[defendEl] ?? 1;
  if (mult > 1) return { mult, label: 'Super Effective!' };
  if (mult < 1) return { mult, label: 'Resisted...' };
  return { mult: 1, label: '' };
}

/**
 * Given a party of heroes (with element ids), find the best element multiplier
 * against a target element. Returns the weighted average across party.
 */
export function getPartyElementMultiplier(partyElements, enemyElement) {
  if (!enemyElement || !partyElements || partyElements.length === 0) return 1;
  let totalMult = 0;
  let count = 0;
  for (const el of partyElements) {
    const { mult } = getElementMultiplier(el, enemyElement);
    totalMult += mult;
    count++;
  }
  return count > 0 ? totalMult / count : 1;
}

// ── Status Effects ──────────────────────────────────────────────────
export const StatusEffects = {
  BURN:    { id: 'burn',    name: 'Burn',    icon: '🔥', color: '#ff5722', desc: 'Takes fire damage over time', durationMs: 4000, tickMs: 1000, dmgPercent: 0.03 },
  FREEZE:  { id: 'freeze',  name: 'Freeze',  icon: '🧊', color: '#40c4ff', desc: 'Attack speed reduced by 50%', durationMs: 3000, tickMs: 0,    slowMult: 0.5 },
  POISON:  { id: 'poison',  name: 'Poison',  icon: '☠️', color: '#76ff03', desc: 'Loses HP over time',          durationMs: 5000, tickMs: 1000, dmgPercent: 0.02 },
  BLEED:   { id: 'bleed',   name: 'Bleed',   icon: '🩸', color: '#ff1744', desc: 'Stacking damage over time',   durationMs: 6000, tickMs: 1500, dmgPercent: 0.015 },
  STUN:    { id: 'stun',    name: 'Stun',    icon: '💫', color: '#ffeb3b', desc: 'Cannot act for duration',      durationMs: 2000, tickMs: 0,    stopAction: true },
  SHIELD:  { id: 'shield',  name: 'Shield',  icon: '🛡️', color: '#2196f3', desc: 'Reduces damage taken by 40%', durationMs: 5000, tickMs: 0,    dmgReduction: 0.4 },
  ENRAGE:  { id: 'enrage',  name: 'Enrage',  icon: '😤', color: '#ff9100', desc: 'Deals 2x damage but takes 1.5x', durationMs: 4000, tickMs: 0, dmgBoost: 2.0, dmgTaken: 1.5 },
  REGEN:   { id: 'regen',   name: 'Regen',   icon: '💚', color: '#69f0ae', desc: 'Heals over time',             durationMs: 5000, tickMs: 1000, healPercent: 0.02 },
};

/**
 * Create a new status effect instance
 */
export function createStatusEffect(effectId, sourceLevel = 1) {
  const template = StatusEffects[effectId.toUpperCase()];
  if (!template) return null;
  return {
    ...template,
    remainingMs: template.durationMs,
    lastTickMs: 0,
    stacks: 1,
    sourceLevel,
  };
}

/**
 * Process all active status effects on a target, returning aggregated modifiers.
 * Mutates the effects array (decays durations, removes expired).
 * @param {Array} effects - array of active status effect instances
 * @param {number} deltaMs - time elapsed since last tick
 * @param {number} maxHp - target's max HP for % calculations
 * @returns {{ dotDamage: number, healAmount: number, dmgTakenMult: number, speedMult: number, stunned: boolean, expired: string[] }}
 */
export function processStatusEffects(effects, deltaMs, maxHp) {
  const result = {
    dotDamage: 0,
    healAmount: 0,
    dmgTakenMult: 1,
    speedMult: 1,
    stunned: false,
    expired: [],
  };

  for (let i = effects.length - 1; i >= 0; i--) {
    const eff = effects[i];
    eff.remainingMs -= deltaMs;

    if (eff.remainingMs <= 0) {
      result.expired.push(eff.id);
      effects.splice(i, 1);
      continue;
    }

    // Tick-based effects (DoT / HoT)
    if (eff.tickMs > 0) {
      eff.lastTickMs += deltaMs;
      while (eff.lastTickMs >= eff.tickMs) {
        eff.lastTickMs -= eff.tickMs;
        if (eff.dmgPercent) {
          result.dotDamage += maxHp * eff.dmgPercent * (eff.stacks || 1);
        }
        if (eff.healPercent) {
          result.healAmount += maxHp * eff.healPercent * (eff.stacks || 1);
        }
      }
    }

    // Instant modifiers
    if (eff.slowMult) result.speedMult *= eff.slowMult;
    if (eff.stopAction) result.stunned = true;
    if (eff.dmgReduction) result.dmgTakenMult *= (1 - eff.dmgReduction);
    if (eff.dmgTaken) result.dmgTakenMult *= eff.dmgTaken;
  }

  return result;
}

// ── Enemy Auras ─────────────────────────────────────────────────────
// Auras are passive abilities enemies can have. They activate under certain conditions.
export const EnemyAuras = {
  SHIELD_BASH:   { id: 'shield_bash',   name: 'Shield Bash',   icon: '🛡️', desc: 'Gains a shield at 50% HP',      triggerHpPercent: 0.5, effect: 'shield' },
  ENRAGED_FURY:  { id: 'enraged_fury',  name: 'Enraged Fury',  icon: '🔥', desc: 'Enrages below 25% HP',          triggerHpPercent: 0.25, effect: 'enrage' },
  TOXIC_CLOUD:   { id: 'toxic_cloud',   name: 'Toxic Cloud',   icon: '☠️', desc: 'Poisons attackers periodically', triggerHpPercent: 1.0, effect: 'poison_aura', intervalMs: 8000 },
  FROST_ARMOR:   { id: 'frost_armor',   name: 'Frost Armor',   icon: '❄️', desc: 'Slows attackers on contact',     triggerHpPercent: 1.0, effect: 'freeze_aura' },
  REGENERATION:  { id: 'regeneration',  name: 'Regeneration',  icon: '💚', desc: 'Slowly heals over time',         triggerHpPercent: 1.0, effect: 'regen' },
  VOID_BARRIER:  { id: 'void_barrier',  name: 'Void Barrier',  icon: '🌀', desc: 'Absorbs first 30% of HP as shield', triggerHpPercent: 1.0, effect: 'void_shield', shieldPercent: 0.3 },
};

// ── Combo System ────────────────────────────────────────────────────
export const ComboTiers = [
  { minHits: 5,   name: 'Nice!',       mult: 1.1,  color: '#69f0ae' },
  { minHits: 15,  name: 'Great!',      mult: 1.25, color: '#40c4ff' },
  { minHits: 30,  name: 'Amazing!',    mult: 1.5,  color: '#ea80fc' },
  { minHits: 50,  name: 'LEGENDARY!',  mult: 2.0,  color: '#ffeb3b' },
  { minHits: 100, name: 'GODLIKE!!',   mult: 3.0,  color: '#ff1744' },
];

/**
 * Get the current combo tier and multiplier based on hit count
 */
export function getComboTier(hitCount) {
  let best = null;
  for (const tier of ComboTiers) {
    if (hitCount >= tier.minHits) best = tier;
  }
  return best;
}
