// Collection Database - Complete sets for permanent bonuses
import { getHeroElement } from './HeroDatabase.js';

export const CollectionDatabase = [
  {
    id: 'col_common_heroes',
    name: 'Common Brigade',
    desc: 'Recruit all Common heroes for a permanent coin bonus.',
    color: '#a0a0a0',
    type: 'hero',
    requiredIds: ['h_peasant', 'h_militia', 'h_scout', 'h_herbalist'],
    reward: { type: 'coinMultiplier', value: 1.15, text: '+15% Coins' },
    icon: '🛡️',
  },
  {
    id: 'col_rare_heroes',
    name: 'Rare Fellowship',
    desc: 'Recruit all Rare heroes for a permanent DPS bonus.',
    color: '#03dac6',
    type: 'hero',
    requiredIds: ['h_ranger', 'h_elementalist', 'h_cleric', 'h_chrono_mage'],
    reward: { type: 'dpsMultiplier', value: 1.20, text: '+20% DPS' },
    icon: '⚔️',
  },
  {
    id: 'col_epic_heroes',
    name: 'Epic Legends',
    desc: 'Recruit all Epic heroes for a permanent XP bonus.',
    color: '#bb86fc',
    type: 'hero',
    requiredIds: ['h_paladin', 'h_assassin', 'h_necromancer', 'h_dragon_knight'],
    reward: { type: 'xpMultiplier', value: 1.50, text: '+50% XP' },
    icon: '🌟',
  },
  {
    id: 'col_legendary_heroes',
    name: 'Legendary Council',
    desc: 'Recruit all Legendary heroes for a massive power surge.',
    color: '#ffb74d',
    type: 'hero',
    requiredIds: ['h_moon_king', 'h_void_empress'],
    reward: { type: 'dpsMultiplier', value: 1.50, text: '+50% DPS' },
    icon: '👑',
  },
  {
    id: 'col_bestiary_10',
    name: 'Monster Hunter',
    desc: 'Discover 10 different enemies in your bestiary.',
    color: '#ff1744',
    type: 'bestiary',
    requiredCount: 10,
    reward: { type: 'lootChanceBonus', value: 0.05, text: '+5% Loot Chance' },
    icon: '📖',
  },
  {
    id: 'col_items_all_types',
    name: 'Arms Collector',
    desc: 'Own at least one weapon, one armor, and one accessory.',
    color: '#e040fb',
    type: 'itemCategories',
    requiredCategories: ['weapon', 'armor', 'accessory'],
    reward: { type: 'stardustMultiplier', value: 1.10, text: '+10% Stardust' },
    icon: '🎒',
  },
  // ── EXPANDED COLLECTIONS ──
  {
    id: 'col_fire_warriors',
    name: 'Fire Warriors',
    desc: 'Recruit 3 Fire element heroes.',
    color: '#ff6d00',
    type: 'element',
    elementName: 'Fire',
    requiredCount: 3,
    reward: { type: 'dpsMultiplier', value: 1.15, text: '+15% DPS' },
    icon: '🔥',
  },
  {
    id: 'col_shadow_guild',
    name: 'Shadow Guild',
    desc: 'Recruit 3 Shadow element heroes.',
    color: '#9575cd',
    type: 'element',
    elementName: 'Shadow',
    requiredCount: 3,
    reward: { type: 'coinMultiplier', value: 1.20, text: '+20% Coins' },
    icon: '🌑',
  },
  {
    id: 'col_void_council',
    name: 'Void Council',
    desc: 'Recruit 3 Void element heroes.',
    color: '#ce93d8',
    type: 'element',
    elementName: 'Void',
    requiredCount: 3,
    reward: { type: 'stardustMultiplier', value: 1.25, text: '+25% Stardust' },
    icon: '🌀',
  },
  {
    id: 'col_prestige_master',
    name: 'Prestige Master',
    desc: 'Prestige 10 times.',
    color: '#b388ff',
    type: 'prestige',
    requiredCount: 10,
    reward: { type: 'dpsMultiplier', value: 1.30, text: '+30% DPS' },
    icon: '♾️',
  },
];

export function getCollectionStatus(collection, gameData) {
  if (collection.type === 'hero') {
    const ownedIds = new Set(gameData.roster.map(h => h.id));
    const owned = collection.requiredIds.filter(id => ownedIds.has(id));
    return { owned: owned.length, total: collection.requiredIds.length, completed: owned.length >= collection.requiredIds.length, ownedIds: owned };
  } else if (collection.type === 'bestiary') {
    const discovered = Object.keys(gameData.bestiary || {}).length;
    return { owned: discovered, total: collection.requiredCount, completed: discovered >= collection.requiredCount, ownedIds: [] };
  } else if (collection.type === 'itemCategories') {
    const cats = new Set();
    // Import-free: check inventory items by looking up their category from templateId
    const categoryMap = { 'i_iron_sword': 'weapon', 'i_lunar_blade': 'weapon', 'i_void_dagger': 'weapon', 'i_starfall_axe': 'weapon', 'i_eclipse_lance': 'weapon', 'i_nebula_staff': 'weapon', 'i_leather_tunic': 'armor', 'i_chainmail': 'armor', 'i_shadow_cloak': 'armor', 'i_starplate': 'armor', 'i_copper_ring': 'accessory', 'i_silver_amulet': 'accessory', 'i_moonstone_charm': 'accessory', 'i_void_pendant': 'accessory', 'i_crystal_eye': 'accessory', 'i_eclipse_crown': 'accessory' };
    (gameData.inventory || []).forEach(item => {
      if (item.templateId && categoryMap[item.templateId]) {
        cats.add(categoryMap[item.templateId]);
      }
    });
    // Check equipped items too
    (gameData.roster || []).forEach(hero => {
      if (hero.equip) {
        if (hero.equip.weapon) cats.add('weapon');
        if (hero.equip.armor) cats.add('armor');
        if (hero.equip.acc) cats.add('accessory');
      }
    });
    const owned = collection.requiredCategories.filter(c => cats.has(c));
    return { owned: owned.length, total: collection.requiredCategories.length, completed: owned.length >= collection.requiredCategories.length, ownedIds: owned };
  } else if (collection.type === 'element') {
    // Count heroes of the required element
    let count = 0;
    (gameData.roster || []).forEach(hero => {
      const el = getHeroElement(hero.id);
      if (el === collection.elementName) count++;
    });
    return { owned: count, total: collection.requiredCount, completed: count >= collection.requiredCount, ownedIds: [] };
  } else if (collection.type === 'prestige') {
    const count = gameData.prestigeCount || 0;
    return { owned: count, total: collection.requiredCount, completed: count >= collection.requiredCount, ownedIds: [] };
  }
  return { owned: 0, total: 1, completed: false, ownedIds: [] };
}

export function getCollectionBonuses(gameData) {
  const bonuses = {
    coinMultiplier: 1.0,
    dpsMultiplier: 1.0,
    xpMultiplier: 1.0,
    stardustMultiplier: 1.0,
    lootChanceBonus: 0,
  };

  CollectionDatabase.forEach(col => {
    const status = getCollectionStatus(col, gameData);
    if (status.completed) {
      const r = col.reward;
      if (r.type === 'coinMultiplier') bonuses.coinMultiplier *= r.value;
      if (r.type === 'dpsMultiplier') bonuses.dpsMultiplier *= r.value;
      if (r.type === 'xpMultiplier') bonuses.xpMultiplier *= r.value;
      if (r.type === 'stardustMultiplier') bonuses.stardustMultiplier *= r.value;
      if (r.type === 'lootChanceBonus') bonuses.lootChanceBonus += r.value;
    }
  });

  return bonuses;
}
