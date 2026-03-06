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

// ── Crafting Recipes (unlocked by stage/collection) ─────────────────

export const CraftingRecipes = [
  {
    id: 'recipe_lunar_blade',
    name: 'Forge Lunar Blade',
    result: { templateId: 'i_lunar_blade', rarity: 'rare' },
    ingredients: [
      { templateId: 'i_iron_sword', rarity: 'common', qty: 2 },
    ],
    cost: { coins: 2000, stardust: 10 },
    unlockStage: 15,
    desc: 'Combine 2 Iron Swords with moonlight to forge a Lunar Blade.',
  },
  {
    id: 'recipe_eclipse_plate',
    name: 'Forge Eclipse Plate',
    result: { templateId: 'i_eclipse_plate', rarity: 'epic' },
    ingredients: [
      { templateId: 'i_starlight_mail', rarity: 'rare', qty: 2 },
      { templateId: 'i_leather_tunic', rarity: 'common', qty: 1 },
    ],
    cost: { coins: 15000, stardust: 50 },
    unlockStage: 50,
    desc: 'Layer Starlight Mail with leather during a lunar eclipse.',
  },
  {
    id: 'recipe_void_dagger',
    name: 'Forge Void Dagger',
    result: { templateId: 'i_void_dagger', rarity: 'epic' },
    ingredients: [
      { templateId: 'i_iron_sword', rarity: 'rare', qty: 1 },
    ],
    cost: { coins: 8000, essence: 5 },
    unlockStage: 40,
    desc: 'Infuse a Rare Iron Sword with Void essence.',
  },
  {
    id: 'recipe_vampiric_fang',
    name: 'Forge Vampiric Fang',
    result: { templateId: 'i_vampiric_fang', rarity: 'epic' },
    ingredients: [
      { templateId: 'i_void_dagger', rarity: 'rare', qty: 1 },
      { templateId: 'i_copper_ring', rarity: 'common', qty: 2 },
    ],
    cost: { coins: 12000, essence: 8 },
    unlockStage: 60,
    desc: 'Combine a Void Dagger with blood-enchanted rings.',
  },
  {
    id: 'recipe_inferno_blade',
    name: 'Forge Inferno Blade',
    result: { templateId: 'i_inferno_blade', rarity: 'epic' },
    ingredients: [
      { templateId: 'i_starfall_axe', rarity: 'rare', qty: 1 },
    ],
    cost: { coins: 20000, stardust: 80 },
    unlockStage: 75,
    desc: 'Reforge a Starfall Axe in eternal flames.',
  },
  {
    id: 'recipe_sunforged_plate',
    name: 'Forge Sunforged Plate',
    result: { templateId: 'i_sunforged_plate', rarity: 'legendary' },
    ingredients: [
      { templateId: 'i_eclipse_plate', rarity: 'epic', qty: 1 },
      { templateId: 'i_astral_ward', rarity: 'epic', qty: 1 },
    ],
    cost: { coins: 100000, essence: 30, stardust: 200 },
    unlockStage: 150,
    desc: 'Merge two epic armors in the heart of a collapsing star.',
  },
  {
    id: 'recipe_crown_shard',
    name: 'Restore Crown Shard',
    result: { templateId: 'i_crown_shard', rarity: 'legendary' },
    ingredients: [
      { templateId: 'i_galaxy_pendant', rarity: 'epic', qty: 1 },
      { templateId: 'i_moonstone_amulet', rarity: 'epic', qty: 1 },
    ],
    cost: { coins: 80000, essence: 25, stardust: 150 },
    unlockStage: 120,
    desc: 'Reunite two celestial accessories to restore a Crown Shard.',
  },
  {
    id: 'recipe_void_heart',
    name: 'Forge Void Heart',
    result: { templateId: 'i_void_heart', rarity: 'legendary' },
    ingredients: [
      { templateId: 'i_chaos_eye', rarity: 'epic', qty: 1 },
    ],
    cost: { coins: 150000, essence: 50 },
    unlockStage: 200,
    desc: 'Channel pure Void energy into the Eye of Chaos.',
  },
];

/**
 * Returns recipes unlocked at or below the current stage.
 */
export function getUnlockedRecipes(currentStage) {
  return CraftingRecipes.filter(r => currentStage >= r.unlockStage);
}

/**
 * Check if player has all ingredients for a recipe.
 */
export function canCraftRecipe(recipe, inventory, state) {
  // Check currency costs
  if (recipe.cost.coins && (state.coins || 0) < recipe.cost.coins) return false;
  if (recipe.cost.stardust && (state.stardust || 0) < recipe.cost.stardust) return false;
  if (recipe.cost.essence && (state.essence || 0) < recipe.cost.essence) return false;

  // Check item ingredients
  for (const ing of recipe.ingredients) {
    const matching = inventory.filter(
      i => i.templateId === ing.templateId && i.rarity.id === ing.rarity
    );
    if (matching.length < ing.qty) return false;
  }
  return true;
}

/**
 * Execute a recipe: consume ingredients + currency, return new item instance.
 */
export function craftRecipe(recipe, inventory, state) {
  if (!canCraftRecipe(recipe, inventory, state)) return null;

  // Deduct currency
  if (recipe.cost.coins) state.coins -= recipe.cost.coins;
  if (recipe.cost.stardust) state.stardust -= recipe.cost.stardust;
  if (recipe.cost.essence) state.essence -= recipe.cost.essence;

  // Remove ingredient items
  for (const ing of recipe.ingredients) {
    let removed = 0;
    for (let idx = inventory.length - 1; idx >= 0 && removed < ing.qty; idx--) {
      if (inventory[idx].templateId === ing.templateId && inventory[idx].rarity.id === ing.rarity) {
        inventory.splice(idx, 1);
        removed++;
      }
    }
  }

  // Determine result rarity
  const rarityMap = { common: ItemRarities.COMMON, rare: ItemRarities.RARE, epic: ItemRarities.EPIC, legendary: ItemRarities.LEGENDARY };

  return {
    uid: 'i_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    templateId: recipe.result.templateId,
    rarity: rarityMap[recipe.result.rarity],
  };
}
