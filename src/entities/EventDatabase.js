// Event Database - Time-limited events with bonuses
// Events cycle based on real-time day of the week

export const EventDatabase = [
  {
    id: 'evt_double_coins',
    name: 'Golden Rush',
    icon: '💰',
    desc: 'All coin rewards are doubled! Time to grind those stages.',
    color: '#ffca28',
    dayOfWeek: 1, // Monday
    bonuses: { coinMultiplier: 2.0 },
    bonusText: '×2 Coins',
  },
  {
    id: 'evt_stardust_rain',
    name: 'Stardust Rain',
    icon: '🌟',
    desc: 'Stardust drops from every enemy! Even common foes shimmer with cosmic dust.',
    color: '#ffb74d',
    dayOfWeek: 2, // Tuesday
    bonuses: { stardustMultiplier: 2.0, stardustDropChance: 0.25 },
    bonusText: '×2 Stardust + 25% drop',
  },
  {
    id: 'evt_crit_frenzy',
    name: 'Critical Frenzy',
    icon: '⚡',
    desc: 'Critical hit chance significantly increased. Strike hard and fast!',
    color: '#ff1744',
    dayOfWeek: 3, // Wednesday
    bonuses: { critChanceBonus: 0.20 },
    bonusText: '+20% Crit Chance',
  },
  {
    id: 'evt_xp_weekend',
    name: 'XP Boost Festival',
    icon: '📖',
    desc: 'All experience gains are tripled. Level up your profile faster!',
    color: '#00e5ff',
    dayOfWeek: 4, // Thursday
    bonuses: { xpMultiplier: 3.0 },
    bonusText: '×3 XP',
  },
  {
    id: 'evt_gem_hunt',
    name: 'Gem Hunt',
    icon: '💎',
    desc: 'Gem drop rates are massively increased. Every enemy could drop gems!',
    color: '#e040fb',
    dayOfWeek: 5, // Friday
    bonuses: { gemChanceBonus: 0.15 },
    bonusText: '+15% Gem Chance',
  },
  {
    id: 'evt_loot_bonanza',
    name: 'Loot Bonanza',
    icon: '🎁',
    desc: 'Item drop rates skyrocket! Boss kills guaranteed double drops.',
    color: '#76ff03',
    dayOfWeek: 6, // Saturday
    bonuses: { lootChanceBonus: 0.10 },
    bonusText: '+10% Loot Chance',
  },
  {
    id: 'evt_tower_power',
    name: 'Tower of Power',
    icon: '🏰',
    desc: 'Tower timer extended and DPS doubled during tower fights!',
    color: '#d500f9',
    dayOfWeek: 0, // Sunday
    bonuses: { dpsMultiplier: 2.0, towerTimeBonus: 15 },
    bonusText: '×2 DPS + 15s Tower',
  },
];

export function getActiveEvents() {
  const today = new Date().getDay(); // 0=Sunday, 1=Monday, ...
  return EventDatabase.filter(evt => evt.dayOfWeek === today);
}

export function getEventBonuses() {
  const active = getActiveEvents();
  const bonuses = {
    coinMultiplier: 1.0,
    stardustMultiplier: 1.0,
    xpMultiplier: 1.0,
    dpsMultiplier: 1.0,
    critChanceBonus: 0,
    gemChanceBonus: 0,
    lootChanceBonus: 0,
    stardustDropChance: 0,
    towerTimeBonus: 0,
  };

  active.forEach(evt => {
    if (evt.bonuses.coinMultiplier) bonuses.coinMultiplier *= evt.bonuses.coinMultiplier;
    if (evt.bonuses.stardustMultiplier) bonuses.stardustMultiplier *= evt.bonuses.stardustMultiplier;
    if (evt.bonuses.xpMultiplier) bonuses.xpMultiplier *= evt.bonuses.xpMultiplier;
    if (evt.bonuses.dpsMultiplier) bonuses.dpsMultiplier *= evt.bonuses.dpsMultiplier;
    if (evt.bonuses.critChanceBonus) bonuses.critChanceBonus += evt.bonuses.critChanceBonus;
    if (evt.bonuses.gemChanceBonus) bonuses.gemChanceBonus += evt.bonuses.gemChanceBonus;
    if (evt.bonuses.lootChanceBonus) bonuses.lootChanceBonus += evt.bonuses.lootChanceBonus;
    if (evt.bonuses.stardustDropChance) bonuses.stardustDropChance += evt.bonuses.stardustDropChance;
    if (evt.bonuses.towerTimeBonus) bonuses.towerTimeBonus += evt.bonuses.towerTimeBonus;
  });

  return bonuses;
}
