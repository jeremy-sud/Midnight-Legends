/**
 * Shop — items purchasable with different currencies
 * Types: boost (permanent multiplier), consumable (one-time effect), unlock (feature/slot)
 * Currency types: gems, coins, stardust, essence
 */

export const ShopDatabase = [
  // === GEM SHOP ===
  {
    id: 'shop_dps_boost',
    name: 'Arcane Amplifier',
    icon: '⚡',
    desc: 'Permanently increases all DPS by 25% per purchase.',
    cost: 50,
    currency: 'gems',
    maxPurchases: 10,
    type: 'boost',
    color: '#00e5ff',
    effect: (count) => ({ dpsMultiplier: 1 + count * 0.25 }),
  },
  {
    id: 'shop_coin_boost',
    name: 'Golden Chalice',
    icon: '🏆',
    desc: 'Permanently increases all coin drops by 30% per purchase.',
    cost: 40,
    currency: 'gems',
    maxPurchases: 10,
    type: 'boost',
    color: '#ffca28',
    effect: (count) => ({ coinMultiplier: 1 + count * 0.30 }),
  },
  {
    id: 'shop_xp_boost',
    name: 'Tome of Wisdom',
    icon: '📖',
    desc: 'Permanently increases XP gain by 50% per purchase.',
    cost: 60,
    currency: 'gems',
    maxPurchases: 5,
    type: 'boost',
    color: '#76ff03',
    effect: (count) => ({ xpMultiplier: 1 + count * 0.50 }),
  },
  {
    id: 'shop_stardust_boost',
    name: 'Celestial Prism',
    icon: '🌟',
    desc: 'Permanently increases Stardust drops by 40% per purchase.',
    cost: 75,
    currency: 'gems',
    maxPurchases: 5,
    type: 'boost',
    color: '#ffb74d',
    effect: (count) => ({ stardustMultiplier: 1 + count * 0.40 }),
  },
  {
    id: 'shop_crit_boost',
    name: 'Eye of Precision',
    icon: '🎯',
    desc: 'Permanently increases critical hit chance by 5% per purchase.',
    cost: 80,
    currency: 'gems',
    maxPurchases: 5,
    type: 'boost',
    color: '#ff1744',
    effect: (count) => ({ critChanceBonus: count * 0.05 }),
  },
  {
    id: 'shop_click_boost',
    name: 'Gauntlet of Power',
    icon: '👊',
    desc: 'Permanently increases click damage by 50% per purchase.',
    cost: 45,
    currency: 'gems',
    maxPurchases: 8,
    type: 'boost',
    color: '#e040fb',
    effect: (count) => ({ clickMultiplier: 1 + count * 0.50 }),
  },
  {
    id: 'shop_loot_boost',
    name: 'Fortunate Amulet',
    icon: '🍀',
    desc: 'Permanently increases loot drop chance by 3% per purchase.',
    cost: 100,
    currency: 'gems',
    maxPurchases: 5,
    type: 'boost',
    color: '#69f0ae',
    effect: (count) => ({ lootChanceBonus: count * 0.03 }),
  },
  {
    id: 'shop_auto_boost',
    name: 'Clockwork Heart',
    icon: '⚙️',
    desc: 'Permanently increases Familiar damage by 35% per purchase.',
    cost: 55,
    currency: 'gems',
    maxPurchases: 8,
    type: 'boost',
    color: '#40c4ff',
    effect: (count) => ({ familiarMultiplier: 1 + count * 0.35 }),
  },

  // === COIN SHOP ===
  {
    id: 'shop_coin_shield',
    name: 'Iron Bulwark',
    icon: '🛡️',
    desc: 'Your heroes take 10% less damage (more HP effective). +10% per level.',
    cost: 10000,
    currency: 'coins',
    maxPurchases: 10,
    type: 'boost',
    color: '#78909c',
    effect: (count) => ({ defenseMultiplier: 1 + count * 0.10 }),
  },
  {
    id: 'shop_coin_magnet',
    name: 'Coin Magnet',
    icon: '🧲',
    desc: 'Attract +15% more coins from every kill.',
    cost: 25000,
    currency: 'coins',
    maxPurchases: 10,
    type: 'boost',
    color: '#ffd54f',
    effect: (count) => ({ coinMultiplier: 1 + count * 0.15 }),
  },
  {
    id: 'shop_coin_speed',
    name: 'Swift Boots',
    icon: '👟',
    desc: 'Familiar attacks 20% faster per purchase.',
    cost: 50000,
    currency: 'coins',
    maxPurchases: 5,
    type: 'boost',
    color: '#80cbc4',
    effect: (count) => ({ familiarMultiplier: 1 + count * 0.20 }),
  },

  // === STARDUST SHOP ===
  {
    id: 'shop_star_exp',
    name: 'Astral Wisdom',
    icon: '🌠',
    desc: 'Heroes gain 20% more XP per purchase.',
    cost: 50,
    currency: 'stardust',
    maxPurchases: 10,
    type: 'boost',
    color: '#ffcc80',
    effect: (count) => ({ xpMultiplier: 1 + count * 0.20 }),
  },
  {
    id: 'shop_star_luck',
    name: 'Star Compass',
    icon: '🧭',
    desc: 'Increases rare loot chance by 2% per purchase.',
    cost: 100,
    currency: 'stardust',
    maxPurchases: 5,
    type: 'boost',
    color: '#e1bee7',
    effect: (count) => ({ lootChanceBonus: count * 0.02 }),
  },
  {
    id: 'shop_star_crit_dmg',
    name: 'Nova Core',
    icon: '💫',
    desc: 'Critical hits deal 30% more damage per purchase.',
    cost: 150,
    currency: 'stardust',
    maxPurchases: 5,
    type: 'boost',
    color: '#fff176',
    effect: (count) => ({ critDmgBonus: count * 0.30 }),
  },

  // === ESSENCE SHOP ===
  {
    id: 'shop_ess_void_power',
    name: 'Void Conduit',
    icon: '🌑',
    desc: 'All damage increased by 50% per purchase. Immense power.',
    cost: 15,
    currency: 'essence',
    maxPurchases: 10,
    type: 'boost',
    color: '#b388ff',
    effect: (count) => ({ dpsMultiplier: 1 + count * 0.50 }),
  },
  {
    id: 'shop_ess_gem_forge',
    name: 'Gem Forge',
    icon: '🔷',
    desc: 'Increases gem drop rate by 5% per purchase.',
    cost: 20,
    currency: 'essence',
    maxPurchases: 5,
    type: 'boost',
    color: '#80d8ff',
    effect: (count) => ({ gemChanceBonus: count * 0.05 }),
  },
  {
    id: 'shop_ess_star_well',
    name: 'Stardust Well',
    icon: '⭐',
    desc: 'Stardust drops increased by 60% per purchase.',
    cost: 25,
    currency: 'essence',
    maxPurchases: 5,
    type: 'boost',
    color: '#ffe082',
    effect: (count) => ({ stardustMultiplier: 1 + count * 0.60 }),
  },
];

/**
 * Get total shop bonuses based on current purchases
 */
export function getShopBonuses(shopPurchases) {
  const bonuses = {
    dpsMultiplier: 1,
    coinMultiplier: 1,
    xpMultiplier: 1,
    stardustMultiplier: 1,
    critChanceBonus: 0,
    critDmgBonus: 0,
    clickMultiplier: 1,
    lootChanceBonus: 0,
    familiarMultiplier: 1,
    defenseMultiplier: 1,
    gemChanceBonus: 0,
  };

  ShopDatabase.forEach(item => {
    const count = shopPurchases[item.id] || 0;
    if (count > 0) {
      const fx = item.effect(count);
      Object.keys(fx).forEach(key => {
        if (key.includes('Multiplier')) {
          bonuses[key] *= fx[key];
        } else {
          bonuses[key] += fx[key];
        }
      });
    }
  });

  return bonuses;
}
