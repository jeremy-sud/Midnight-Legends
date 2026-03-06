/**
 * Daily Spin Wheel — Roulette with prizes
 * One free spin per day, extra spins cost gems
 */

export const SpinWheelPrizes = [
  {
    id: 'spin_coins_small',
    name: 'Coin Pouch',
    icon: '🪙',
    color: '#ffca28',
    weight: 25,
    reward: (stage) => ({ coins: Math.floor(50 + stage * 20) }),
    label: (stage) => `+${Math.floor(50 + stage * 20)} Coins`,
  },
  {
    id: 'spin_coins_big',
    name: 'Gold Chest',
    icon: '💰',
    color: '#ffd54f',
    weight: 10,
    reward: (stage) => ({ coins: Math.floor(500 + stage * 100) }),
    label: (stage) => `+${Math.floor(500 + stage * 100)} Coins`,
  },
  {
    id: 'spin_stardust',
    name: 'Stardust Cloud',
    icon: '✨',
    color: '#ffb74d',
    weight: 18,
    reward: (stage) => ({ stardust: Math.floor(5 + stage * 2) }),
    label: (stage) => `+${Math.floor(5 + stage * 2)} Stardust`,
  },
  {
    id: 'spin_gems_small',
    name: 'Gem Shard',
    icon: '💎',
    color: '#4fc3f7',
    weight: 12,
    reward: () => ({ gems: 3 }),
    label: () => '+3 Gems',
  },
  {
    id: 'spin_gems_big',
    name: 'Gem Cluster',
    icon: '💠',
    color: '#00e5ff',
    weight: 5,
    reward: () => ({ gems: 10 }),
    label: () => '+10 Gems',
  },
  {
    id: 'spin_essence',
    name: 'Void Fragment',
    icon: '🌀',
    color: '#ce93d8',
    weight: 8,
    reward: () => ({ essence: 2 }),
    label: () => '+2 Essence',
  },
  {
    id: 'spin_xp',
    name: 'XP Scroll',
    icon: '📜',
    color: '#76ff03',
    weight: 15,
    reward: (stage) => ({ xp: Math.floor(100 + stage * 15) }),
    label: (stage) => `+${Math.floor(100 + stage * 15)} XP`,
  },
  {
    id: 'spin_jackpot',
    name: 'JACKPOT!',
    icon: '🎰',
    color: '#ff1744',
    weight: 2,
    reward: (stage) => ({
      coins: Math.floor(2000 + stage * 300),
      gems: 15,
      stardust: Math.floor(20 + stage * 5),
    }),
    label: (stage) => 'JACKPOT! 🎉',
  },
];

export const SPIN_COST_GEMS = 15;

/**
 * Weighted random prize selection
 */
export function spinWheel() {
  const totalWeight = SpinWheelPrizes.reduce((sum, p) => sum + p.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const prize of SpinWheelPrizes) {
    roll -= prize.weight;
    if (roll <= 0) return prize;
  }
  return SpinWheelPrizes[0];
}

/**
 * Check if player can spin for free today
 */
export function canFreeSpin(state) {
  const spinData = state.spinWheel || {};
  if (!spinData.lastFreeSpinDate) return true;
  const today = new Date().toDateString();
  return spinData.lastFreeSpinDate !== today;
}
