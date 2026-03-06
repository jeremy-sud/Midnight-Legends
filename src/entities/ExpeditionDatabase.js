import { ItemTemplate, ItemRarities } from './ItemDatabase.js';
import { getHeroElement } from './HeroDatabase.js';

/**
 * Available expedition regions.
 * Each region has an element affinity — sending a hero whose element matches
 * the region grants a 30 % bonus to all rewards.
 */
export const ExpeditionRegions = [
  { id: 'exp_sunlit_grove',   name: 'Sunlit Grove',   element: 'light',  minStage: 1,   durationMs: 1 * 3600_000, icon: '🌿' },
  { id: 'exp_ember_caves',    name: 'Ember Caves',    element: 'fire',   minStage: 20,  durationMs: 1 * 3600_000, icon: '🔥' },
  { id: 'exp_frozen_lake',    name: 'Frozen Lake',    element: 'ice',    minStage: 50,  durationMs: 4 * 3600_000, icon: '❄️' },
  { id: 'exp_shadow_marsh',   name: 'Shadow Marsh',   element: 'shadow', minStage: 80,  durationMs: 4 * 3600_000, icon: '🌑' },
  { id: 'exp_void_rift',      name: 'Void Rift',      element: 'void',   minStage: 120, durationMs: 8 * 3600_000, icon: '🌀' },
  { id: 'exp_astral_summit',  name: 'Astral Summit',  element: null,     minStage: 200, durationMs: 8 * 3600_000, icon: '✨' },
];

/** Base reward table — actual amounts are multiplied by (1 + 0.3 * elementMatch) */
const BASE_REWARDS = {
  1:  { coins: 500,   stardust: 20,  lootChance: 0.25 },
  4:  { coins: 2500,  stardust: 80,  lootChance: 0.40 },
  8:  { coins: 8000,  stardust: 200, lootChance: 0.60 },
};

function getBaseReward(durationMs) {
  const hours = durationMs / 3600_000;
  if (hours >= 8) return BASE_REWARDS[8];
  if (hours >= 4) return BASE_REWARDS[4];
  return BASE_REWARDS[1];
}

/**
 * Returns unlocked regions based on current stage.
 */
export function getUnlockedRegions(currentStage) {
  return ExpeditionRegions.filter(r => currentStage >= r.minStage);
}

/**
 * Start an expedition. Mutates the `expeditions` state array.
 * @param {object} state - GameState.data
 * @param {string} heroUid - UID of the hero to send
 * @param {string} regionId - ID of the region
 * @returns {{ ok: boolean, error?: string }}
 */
export function startExpedition(state, heroUid, regionId) {
  if (!state.expeditions) state.expeditions = [];
  
  // Max 3 concurrent expeditions
  const active = state.expeditions.filter(e => !e.completed);
  if (active.length >= 3) return { ok: false, error: 'Max 3 expeditions at a time.' };

  // Hero must be in roster but NOT in activeParty
  const hero = state.roster.find(h => h.uid === heroUid);
  if (!hero) return { ok: false, error: 'Hero not found.' };
  if (state.activeParty.includes(heroUid)) return { ok: false, error: 'Hero is in active party.' };

  // Hero not already on an expedition
  if (active.some(e => e.heroUid === heroUid)) return { ok: false, error: 'Hero already on expedition.' };

  const region = ExpeditionRegions.find(r => r.id === regionId);
  if (!region) return { ok: false, error: 'Invalid region.' };
  if (state.currentStage < region.minStage) return { ok: false, error: `Requires stage ${region.minStage}.` };

  state.expeditions.push({
    id: 'exped_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    heroUid,
    regionId,
    startTime: Date.now(),
    durationMs: region.durationMs,
    completed: false,
    claimed: false,
  });

  return { ok: true };
}

/**
 * Calculate rewards for a completed expedition.
 */
export function calculateExpeditionRewards(expedition, state) {
  const region = ExpeditionRegions.find(r => r.id === expedition.regionId);
  if (!region) return null;
  const hero = state.roster.find(h => h.uid === expedition.heroUid);
  const heroElement = hero ? getHeroElement(hero.id) : null;
  const elementMatch = region.element && heroElement === region.element;
  const mult = elementMatch ? 1.3 : 1.0;

  const base = getBaseReward(region.durationMs);
  const coins = Math.floor(base.coins * mult);
  const stardust = Math.floor(base.stardust * mult);

  const rewards = { coins, stardust, items: [], elementBonus: elementMatch };

  // Loot roll
  if (Math.random() < base.lootChance * mult) {
    const template = ItemTemplate[Math.floor(Math.random() * ItemTemplate.length)];
    const rand = Math.random();
    let rarity = ItemRarities.COMMON;
    if (rand > 0.95) rarity = ItemRarities.EPIC;
    else if (rand > 0.70) rarity = ItemRarities.RARE;
    rewards.items.push({
      uid: 'i_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      templateId: template.id,
      rarity,
    });
  }

  return rewards;
}

/**
 * Check and mark completed expeditions.
 */
export function tickExpeditions(state) {
  if (!state.expeditions) return;
  const now = Date.now();
  for (const exp of state.expeditions) {
    if (!exp.completed && now >= exp.startTime + exp.durationMs) {
      exp.completed = true;
    }
  }
}

/**
 * Format remaining time for display.
 */
export function getExpeditionTimeLeft(expedition) {
  const end = expedition.startTime + expedition.durationMs;
  const left = Math.max(0, end - Date.now());
  if (left === 0) return 'Complete!';
  const h = Math.floor(left / 3600_000);
  const m = Math.floor((left % 3600_000) / 60_000);
  const s = Math.floor((left % 60_000) / 1000);
  return `${h}h ${m}m ${s}s`;
}
