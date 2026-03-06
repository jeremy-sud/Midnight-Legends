import { ItemRarities, ItemTemplate, getItemStats } from './ItemDatabase.js';

/** Number of identical items needed to fuse into the next rarity */
export const CRAFT_COST = 3;

/** Rarity upgrade chain */
const RARITY_CHAIN = [
  ItemRarities.COMMON,
  ItemRarities.RARE,
  ItemRarities.EPIC,
  ItemRarities.LEGENDARY,
];

/** Essence earned when dismantling an item (by rarity) */
const DISMANTLE_VALUES = {
  common: 1,
  rare: 5,
  epic: 20,
  legendary: 100,
};

/**
 * Returns the next rarity in the chain, or null if already max.
 */
export function getNextRarity(currentRarity) {
  const idx = RARITY_CHAIN.findIndex(r => r.id === currentRarity.id);
  return idx >= 0 && idx < RARITY_CHAIN.length - 1 ? RARITY_CHAIN[idx + 1] : null;
}

/**
 * Groups inventory items by (templateId + rarity.id).
 * Returns an array of { templateId, rarity, items[] } objects,
 * each with at least 1 item, sorted so craftable groups (>=3) come first.
 */
export function getCraftableGroups(inventory) {
  const map = {};
  for (const item of inventory) {
    const key = `${item.templateId}__${item.rarity.id}`;
    if (!map[key]) {
      map[key] = { templateId: item.templateId, rarity: item.rarity, items: [] };
    }
    map[key].items.push(item);
  }
  return Object.values(map)
    .filter(g => getNextRarity(g.rarity) !== null) // hide max-rarity groups
    .sort((a, b) => b.items.length - a.items.length);
}

/**
 * Performs fusion: removes `CRAFT_COST` items from inventory and returns a new
 * item instance at the next rarity. Returns null if not enough items.
 */
export function fuseItems(inventory, templateId, rarityId) {
  const matching = inventory.filter(
    i => i.templateId === templateId && i.rarity.id === rarityId
  );
  if (matching.length < CRAFT_COST) return null;

  const nextRarity = getNextRarity(matching[0].rarity);
  if (!nextRarity) return null;

  // Remove first CRAFT_COST items from inventory (by uid)
  const toRemove = new Set(matching.slice(0, CRAFT_COST).map(i => i.uid));
  for (let idx = inventory.length - 1; idx >= 0; idx--) {
    if (toRemove.has(inventory[idx].uid)) inventory.splice(idx, 1);
  }

  // Create upgraded item
  return {
    uid: 'i_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    templateId,
    rarity: nextRarity,
  };
}

/**
 * Returns the essence value for dismantling a given item.
 */
export function getDismantleValue(item) {
  return DISMANTLE_VALUES[item.rarity.id] || 1;
}
