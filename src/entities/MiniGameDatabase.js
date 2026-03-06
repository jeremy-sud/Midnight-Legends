/**
 * Mini-Games — Quick games for extra rewards
 * Each mini-game has a cooldown, cost, and reward scheme
 */

export const MiniGameDatabase = [
  {
    id: 'mg_number_guess',
    name: 'Mystic Oracle',
    icon: '🔮',
    desc: 'Guess the magic number between 1 and 20. Fewer attempts = bigger rewards!',
    color: '#ce93d8',
    cooldownMs: 5 * 60 * 1000, // 5 minutes
    cost: { coins: 200 },
    maxAttempts: 5,
    targetRange: 20,
    rewardTiers: [
      { attempts: 1, coins: 5000, gems: 5, label: 'Perfect! 🌟' },
      { attempts: 2, coins: 2000, gems: 2, label: 'Amazing! ✨' },
      { attempts: 3, coins: 1000, gems: 1, label: 'Good! 👍' },
      { attempts: 4, coins: 500, gems: 0, label: 'Close! 😅' },
      { attempts: 5, coins: 200, gems: 0, label: 'Just made it! 😮‍💨' },
    ],
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="26" fill="#311b92" opacity="0.3"/>
      <circle cx="32" cy="32" r="22" stroke="#ce93d8" stroke-width="2" fill="none"/>
      <circle cx="32" cy="32" r="16" stroke="#ce93d8" stroke-width="1" fill="none" opacity="0.5"/>
      <text x="32" y="38" text-anchor="middle" fill="#e1bee7" font-size="20" font-weight="bold">?</text>
      <circle cx="18" cy="16" r="2" fill="#ffca28" opacity="0.5"/>
      <circle cx="48" cy="14" r="1.5" fill="#ffca28" opacity="0.3"/>
      <circle cx="50" cy="46" r="2" fill="#ffca28" opacity="0.4"/>
    </svg>`,
  },
  {
    id: 'mg_memory',
    name: 'Shadow Match',
    icon: '🃏',
    desc: 'Match pairs of hidden cards! Find all pairs to win rewards.',
    color: '#4fc3f7',
    cooldownMs: 10 * 60 * 1000, // 10 minutes
    cost: { stardust: 10 },
    gridSize: 4, // 4x3 = 12 cards = 6 pairs
    pairs: 6,
    symbols: ['⚔️', '🛡️', '💎', '🔥', '🌟', '🌙'],
    rewardTiers: [
      { moves: 8, coins: 3000, stardust: 20, label: 'Memory Master! 🧠' },
      { moves: 12, coins: 1500, stardust: 10, label: 'Sharp Mind! 🎯' },
      { moves: 18, coins: 800, stardust: 5, label: 'Good Memory! 👍' },
      { moves: 99, coins: 300, stardust: 2, label: 'Completed! ✅' },
    ],
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="10" width="22" height="28" rx="3" fill="#1565c0" opacity="0.6"/>
      <rect x="36" y="10" width="22" height="28" rx="3" fill="#1565c0" opacity="0.6"/>
      <rect x="6" y="10" width="22" height="28" rx="3" stroke="#4fc3f7" stroke-width="1.5" fill="none"/>
      <rect x="36" y="10" width="22" height="28" rx="3" stroke="#4fc3f7" stroke-width="1.5" fill="none"/>
      <text x="17" y="29" text-anchor="middle" fill="#81d4fa" font-size="14">?</text>
      <text x="47" y="29" text-anchor="middle" fill="#81d4fa" font-size="14">?</text>
      <rect x="16" y="44" width="32" height="6" rx="2" fill="#0d47a1" opacity="0.3"/>
      <rect x="16" y="44" width="20" height="6" rx="2" fill="#4fc3f7" opacity="0.5"/>
    </svg>`,
  },
  {
    id: 'mg_reaction',
    name: 'Lightning Reflexes',
    icon: '⚡',
    desc: 'Click the target as fast as you can! Speed determines your reward.',
    color: '#ffca28',
    cooldownMs: 3 * 60 * 1000, // 3 minutes
    cost: { coins: 100 },
    rounds: 5,
    rewardTiers: [
      { avgMs: 300, coins: 4000, gems: 3, label: 'Lightning Fast! ⚡' },
      { avgMs: 500, coins: 2000, gems: 1, label: 'Quick! 💨' },
      { avgMs: 800, coins: 800, gems: 0, label: 'Decent! 👌' },
      { avgMs: 9999, coins: 300, gems: 0, label: 'Slow but steady! 🐢' },
    ],
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="24" fill="#f57f17" opacity="0.2"/>
      <circle cx="32" cy="32" r="18" fill="#f57f17" opacity="0.3"/>
      <circle cx="32" cy="32" r="10" fill="#ffca28" opacity="0.6"/>
      <circle cx="32" cy="32" r="4" fill="#fff"/>
      <path d="M30 14 L28 28 L34 26 L30 50 L38 30 L32 32 L36 14Z" fill="#ff6f00" opacity="0.5"/>
    </svg>`,
  },
];

/**
 * Check if a mini-game is on cooldown
 */
export function isMiniGameReady(gameId, miniGameState) {
  if (!miniGameState || !miniGameState[gameId]) return true;
  const lastPlayed = miniGameState[gameId].lastPlayed || 0;
  const game = MiniGameDatabase.find(g => g.id === gameId);
  if (!game) return false;
  return Date.now() - lastPlayed >= game.cooldownMs;
}

/**
 * Get remaining cooldown in ms
 */
export function getMiniGameCooldown(gameId, miniGameState) {
  if (!miniGameState || !miniGameState[gameId]) return 0;
  const lastPlayed = miniGameState[gameId].lastPlayed || 0;
  const game = MiniGameDatabase.find(g => g.id === gameId);
  if (!game) return 0;
  return Math.max(0, game.cooldownMs - (Date.now() - lastPlayed));
}
