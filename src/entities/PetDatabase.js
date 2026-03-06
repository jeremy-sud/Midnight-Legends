/**
 * Pet / Tamagotchi System
 * Cute companions that provide passive bonuses when well-cared
 */

export const PetDatabase = [
  {
    id: 'pet_luna',
    name: 'Luna',
    species: 'Moon Kitten',
    icon: '🐱',
    desc: 'A curious kitten born from moonlight. Loves fish treats and stargazing.',
    unlockCost: { coins: 5000 },
    maxLevel: 20,
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="42" rx="16" ry="14" fill="#b39ddb"/>
      <ellipse cx="32" cy="42" rx="14" ry="12" fill="#d1c4e9"/>
      <polygon points="18,32 14,18 24,28" fill="#b39ddb"/>
      <polygon points="46,32 50,18 40,28" fill="#b39ddb"/>
      <polygon points="18,32 16,20 24,28" fill="#d1c4e9"/>
      <polygon points="46,32 48,20 40,28" fill="#d1c4e9"/>
      <circle cx="26" cy="38" r="3" fill="#1a1a2e"/>
      <circle cx="38" cy="38" r="3" fill="#1a1a2e"/>
      <circle cx="27" cy="37" r="1" fill="white"/>
      <circle cx="39" cy="37" r="1" fill="white"/>
      <ellipse cx="32" cy="42" rx="2" ry="1" fill="#f48fb1"/>
      <path d="M30 43 Q32 45 34 43" stroke="#1a1a2e" stroke-width="0.8" fill="none"/>
      <path d="M22 50 Q16 56 12 58" stroke="#b39ddb" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <circle cx="42" cy="22" r="2" fill="#ffca28" opacity="0.6"/>
      <circle cx="46" cy="18" r="1.5" fill="#ffca28" opacity="0.4"/>
    </svg>`,
    bonus: (level, mood) => ({
      coinBonus: 0.02 * level * mood,
      desc: `+${(2 * level * mood).toFixed(0)}% Coins`
    }),
  },
  {
    id: 'pet_ember',
    name: 'Ember',
    species: 'Fire Fox',
    icon: '🦊',
    desc: 'A playful fox with a warm flame dancing on its tail. Loves berries.',
    unlockCost: { stardust: 200 },
    maxLevel: 20,
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="44" rx="15" ry="13" fill="#ff7043"/>
      <ellipse cx="32" cy="44" rx="12" ry="10" fill="#ffab91"/>
      <polygon points="18,34 12,18 24,30" fill="#ff7043"/>
      <polygon points="46,34 52,18 40,30" fill="#ff7043"/>
      <circle cx="26" cy="40" r="2.5" fill="#1a1a2e"/>
      <circle cx="38" cy="40" r="2.5" fill="#1a1a2e"/>
      <circle cx="27" cy="39" r="1" fill="white"/>
      <circle cx="39" cy="39" r="1" fill="white"/>
      <ellipse cx="32" cy="43" rx="2" ry="1" fill="#1a1a2e"/>
      <ellipse cx="32" cy="48" rx="8" ry="5" fill="white" opacity="0.5"/>
      <path d="M44 48 Q52 44 54 50 Q56 54 50 52 Q48 52 46 50" fill="#ff5722"/>
      <path d="M46 48 Q52 46 52 50 Q54 52 50 50" fill="#ffca28"/>
    </svg>`,
    bonus: (level, mood) => ({
      dpsBonus: 0.015 * level * mood,
      desc: `+${(1.5 * level * mood).toFixed(0)}% DPS`
    }),
  },
  {
    id: 'pet_bubbles',
    name: 'Bubbles',
    species: 'Water Sprite',
    icon: '🐟',
    desc: 'A tiny aquatic spirit that floats around happily. Loves seaweed.',
    unlockCost: { coins: 15000 },
    maxLevel: 20,
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="38" rx="18" ry="14" fill="#4fc3f7"/>
      <ellipse cx="32" cy="38" rx="15" ry="11" fill="#81d4fa"/>
      <circle cx="26" cy="35" r="3" fill="white"/>
      <circle cx="38" cy="35" r="3" fill="white"/>
      <circle cx="26" cy="35" r="1.5" fill="#1a1a2e"/>
      <circle cx="38" cy="35" r="1.5" fill="#1a1a2e"/>
      <path d="M28 42 Q32 45 36 42" stroke="#1565c0" stroke-width="1" fill="none"/>
      <path d="M14 38 Q8 34 10 42" fill="#4fc3f7"/>
      <path d="M50 38 Q56 34 54 42" fill="#4fc3f7"/>
      <path d="M26 52 Q32 58 38 52" fill="#4fc3f7"/>
      <circle cx="20" cy="24" r="3" fill="#e1f5fe" opacity="0.6"/>
      <circle cx="44" cy="22" r="2" fill="#e1f5fe" opacity="0.5"/>
      <circle cx="36" cy="20" r="1.5" fill="#e1f5fe" opacity="0.4"/>
    </svg>`,
    bonus: (level, mood) => ({
      stardustBonus: 0.025 * level * mood,
      desc: `+${(2.5 * level * mood).toFixed(0)}% Stardust`
    }),
  },
  {
    id: 'pet_mochi',
    name: 'Mochi',
    species: 'Cloud Bunny',
    icon: '🐰',
    desc: 'A fluffy bunny made of clouds. Loves carrots and naps.',
    unlockCost: { gems: 50 },
    maxLevel: 20,
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="44" rx="16" ry="13" fill="#f8bbd0"/>
      <ellipse cx="32" cy="44" rx="14" ry="11" fill="#fce4ec"/>
      <path d="M24 32 Q22 12 20 8 Q18 4 24 14 Q26 20 24 32" fill="#f8bbd0"/>
      <path d="M40 32 Q42 12 44 8 Q46 4 40 14 Q38 20 40 32" fill="#f8bbd0"/>
      <path d="M25 32 Q24 16 22 10 Q26 18 25 32" fill="#fce4ec"/>
      <path d="M39 32 Q40 16 42 10 Q38 18 39 32" fill="#fce4ec"/>
      <circle cx="26" cy="40" r="2.5" fill="#1a1a2e"/>
      <circle cx="38" cy="40" r="2.5" fill="#1a1a2e"/>
      <circle cx="27" cy="39" r="1" fill="white"/>
      <circle cx="39" cy="39" r="1" fill="white"/>
      <ellipse cx="32" cy="44" rx="2" ry="1.5" fill="#f48fb1"/>
      <path d="M30 45 Q32 47 34 45" stroke="#e91e63" stroke-width="0.6" fill="none"/>
      <ellipse cx="22" cy="44" rx="4" ry="3" fill="#f48fb1" opacity="0.3"/>
      <ellipse cx="42" cy="44" rx="4" ry="3" fill="#f48fb1" opacity="0.3"/>
    </svg>`,
    bonus: (level, mood) => ({
      xpBonus: 0.02 * level * mood,
      desc: `+${(2 * level * mood).toFixed(0)}% XP`
    }),
  },
  {
    id: 'pet_shadow',
    name: 'Shadow',
    species: 'Void Bat',
    icon: '🦇',
    desc: 'A tiny bat from the void dimension. Loves darkness and candy.',
    unlockCost: { essence: 10 },
    maxLevel: 20,
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 30 Q8 22 16 26 Q20 20 26 28 L32 36 L38 28 Q44 20 48 26 Q56 22 60 30 Q56 38 48 36 L32 46 L16 36 Q8 38 4 30Z" fill="#7e57c2"/>
      <path d="M8 30 Q12 24 18 28 Q22 22 28 30 L32 36 L36 30 Q42 22 46 28 Q52 24 56 30 Q52 36 46 34 L32 42 L18 34 Q12 36 8 30Z" fill="#9575cd"/>
      <ellipse cx="32" cy="38" rx="8" ry="7" fill="#311b92"/>
      <circle cx="28" cy="36" r="2" fill="#e040fb"/>
      <circle cx="36" cy="36" r="2" fill="#e040fb"/>
      <circle cx="28" cy="36" r="0.8" fill="white"/>
      <circle cx="36" cy="36" r="0.8" fill="white"/>
      <path d="M30 40 L31 42 L32 40 L33 42 L34 40" stroke="white" stroke-width="0.6" fill="none"/>
    </svg>`,
    bonus: (level, mood) => ({
      essenceBonus: 0.03 * level * mood,
      lootBonus: 0.005 * level * mood,
      desc: `+${(3 * level * mood).toFixed(0)}% Essence, +${(0.5 * level * mood).toFixed(1)}% Loot`
    }),
  },
  {
    id: 'pet_sprout',
    name: 'Sprout',
    species: 'Garden Sprite',
    icon: '🌱',
    desc: 'A tiny nature spirit from the Midnight Garden. Loves sunlight and water.',
    unlockCost: { stardust: 500 },
    maxLevel: 20,
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="46" rx="12" ry="10" fill="#66bb6a"/>
      <ellipse cx="32" cy="46" rx="10" ry="8" fill="#a5d6a7"/>
      <path d="M32 36 Q28 24 22 20 Q28 22 32 30 Q36 22 42 20 Q36 24 32 36" fill="#43a047"/>
      <path d="M32 30 Q30 22 26 18 Q30 20 32 28 Q34 20 38 18 Q34 22 32 30" fill="#66bb6a"/>
      <circle cx="28" cy="44" r="2" fill="#1a1a2e"/>
      <circle cx="36" cy="44" r="2" fill="#1a1a2e"/>
      <circle cx="29" cy="43" r="0.8" fill="white"/>
      <circle cx="37" cy="43" r="0.8" fill="white"/>
      <path d="M30 48 Q32 50 34 48" stroke="#2e7d32" stroke-width="0.8" fill="none"/>
      <circle cx="22" cy="42" r="2.5" fill="#f48fb1" opacity="0.25"/>
      <circle cx="42" cy="42" r="2.5" fill="#f48fb1" opacity="0.25"/>
    </svg>`,
    bonus: (level, mood) => ({
      coinBonus: 0.01 * level * mood,
      dpsBonus: 0.01 * level * mood,
      desc: `+${(1 * level * mood).toFixed(0)}% Coins & DPS`
    }),
  },

  // ── NEW PETS (Phase 2.4) ──────────────────────────────────────────

  {
    id: 'pet_frost',
    name: 'Frost',
    species: 'Ice Wisp',
    icon: '❄️',
    desc: 'A tiny fragment of eternal winter. Chills enemies and boosts critical strikes.',
    unlockCost: { gems: 80 },
    maxLevel: 20,
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="34" r="14" fill="#4fc3f7"/>
      <circle cx="32" cy="34" r="11" fill="#b3e5fc"/>
      <circle cx="28" cy="32" r="2" fill="#1a1a2e"/>
      <circle cx="36" cy="32" r="2" fill="#1a1a2e"/>
      <circle cx="29" cy="31" r="0.8" fill="white"/>
      <circle cx="37" cy="31" r="0.8" fill="white"/>
      <path d="M30 37 Q32 39 34 37" stroke="#0288d1" stroke-width="0.8" fill="none"/>
      <path d="M32 18v6M32 48v-6" stroke="#4fc3f7" stroke-width="1.5"/>
      <path d="M22 24l4 4M42 24l-4 4" stroke="#4fc3f7" stroke-width="1.5"/>
      <path d="M22 44l4-4M42 44l-4-4" stroke="#4fc3f7" stroke-width="1.5"/>
      <circle cx="32" cy="18" r="2" fill="#e1f5fe"/>
      <circle cx="22" cy="24" r="1.5" fill="#e1f5fe"/>
      <circle cx="42" cy="24" r="1.5" fill="#e1f5fe"/>
    </svg>`,
    bonus: (level, mood) => ({
      dpsBonus: 0.008 * level * mood,
      lootBonus: 0.006 * level * mood,
      desc: `+${(0.8 * level * mood).toFixed(0)}% DPS, +${(0.6 * level * mood).toFixed(1)}% Loot`
    }),
  },
  {
    id: 'pet_flicker',
    name: 'Flicker',
    species: 'Star Firefly',
    icon: '✨',
    desc: 'A luminous insect born from starlight. Its glow attracts stardust.',
    unlockCost: { stardust: 800 },
    maxLevel: 20,
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="38" rx="10" ry="12" fill="#ffd54f"/>
      <ellipse cx="32" cy="38" rx="8" ry="10" fill="#fff9c4"/>
      <circle cx="29" cy="36" r="1.5" fill="#1a1a2e"/>
      <circle cx="35" cy="36" r="1.5" fill="#1a1a2e"/>
      <path d="M30 41 Q32 43 34 41" stroke="#f9a825" stroke-width="0.8" fill="none"/>
      <path d="M24 28 Q28 22 32 28 Q36 22 40 28" stroke="#ffd54f" stroke-width="1" fill="none" opacity="0.6"/>
      <circle cx="32" cy="20" r="3" fill="#fff176" opacity="0.5"/>
      <circle cx="24" cy="26" r="2" fill="#fff176" opacity="0.3"/>
      <circle cx="40" cy="26" r="2" fill="#fff176" opacity="0.3"/>
      <circle cx="32" cy="52" r="4" fill="#ffeb3b" opacity="0.3"/>
    </svg>`,
    bonus: (level, mood) => ({
      stardustBonus: 0.025 * level * mood,
      xpBonus: 0.01 * level * mood,
      desc: `+${(2.5 * level * mood).toFixed(0)}% Stardust, +${(1 * level * mood).toFixed(0)}% XP`
    }),
  },
  {
    id: 'pet_rumble',
    name: 'Rumble',
    species: 'Rock Golem',
    icon: '🪨',
    desc: 'A miniature golem made of ancient moonstone. Slow but absurdly strong.',
    unlockCost: { coins: 50000 },
    maxLevel: 20,
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="26" width="24" height="22" rx="4" fill="#8d6e63"/>
      <rect x="22" y="28" width="20" height="18" rx="3" fill="#a1887f"/>
      <circle cx="28" cy="35" r="2.5" fill="#1a1a2e"/>
      <circle cx="36" cy="35" r="2.5" fill="#1a1a2e"/>
      <circle cx="29" cy="34" r="1" fill="white"/>
      <circle cx="37" cy="34" r="1" fill="white"/>
      <path d="M30 41 L34 41" stroke="#5d4037" stroke-width="1.5"/>
      <rect x="16" y="32" width="6" height="10" rx="3" fill="#8d6e63"/>
      <rect x="42" y="32" width="6" height="10" rx="3" fill="#8d6e63"/>
      <rect x="24" y="48" width="6" height="6" rx="2" fill="#8d6e63"/>
      <rect x="34" y="48" width="6" height="6" rx="2" fill="#8d6e63"/>
      <path d="M26 26 L30 22 L34 22 L38 26" fill="#795548"/>
    </svg>`,
    bonus: (level, mood) => ({
      dpsBonus: 0.02 * level * mood,
      desc: `+${(2 * level * mood).toFixed(0)}% DPS`
    }),
  },
  {
    id: 'pet_whisper',
    name: 'Whisper',
    species: 'Phantom Cat',
    icon: '👻',
    desc: 'A ghostly feline that phases between dimensions. Brings rare treasures from the other side.',
    unlockCost: { essence: 25 },
    maxLevel: 20,
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="40" rx="14" ry="12" fill="#b0bec5" opacity="0.7"/>
      <ellipse cx="32" cy="40" rx="12" ry="10" fill="#eceff1" opacity="0.6"/>
      <path d="M20 34 L22 24 L28 30" fill="#b0bec5" opacity="0.7"/>
      <path d="M44 34 L42 24 L36 30" fill="#b0bec5" opacity="0.7"/>
      <circle cx="28" cy="38" r="2.5" fill="#7c4dff"/>
      <circle cx="36" cy="38" r="2.5" fill="#7c4dff"/>
      <circle cx="29" cy="37" r="1" fill="white"/>
      <circle cx="37" cy="37" r="1" fill="white"/>
      <path d="M30 43 Q32 45 34 43" stroke="#78909c" stroke-width="0.8" fill="none"/>
      <path d="M22 42 L18 44" stroke="#b0bec5" stroke-width="0.8" opacity="0.5"/>
      <path d="M22 44 L18 46" stroke="#b0bec5" stroke-width="0.8" opacity="0.5"/>
      <path d="M42 42 L46 44" stroke="#b0bec5" stroke-width="0.8" opacity="0.5"/>
      <path d="M42 44 L46 46" stroke="#b0bec5" stroke-width="0.8" opacity="0.5"/>
      <path d="M38 50 Q40 54 42 52 Q44 56 40 56" stroke="#b0bec5" stroke-width="1" fill="none" opacity="0.5"/>
    </svg>`,
    bonus: (level, mood) => ({
      essenceBonus: 0.02 * level * mood,
      lootBonus: 0.008 * level * mood,
      desc: `+${(2 * level * mood).toFixed(0)}% Essence, +${(0.8 * level * mood).toFixed(1)}% Loot`
    }),
  },
];

export const PetFoods = [
  { id: 'food_basic', name: 'Trail Mix', icon: '🥜', cost: { coins: 100 }, hungerRestore: 30 },
  { id: 'food_premium', name: 'Moon Berries', icon: '🫐', cost: { stardust: 5 }, hungerRestore: 60 },
  { id: 'food_deluxe', name: 'Star Nectar', icon: '🍯', cost: { gems: 2 }, hungerRestore: 100 },
];

/**
 * Calculate pet mood (0-1) based on needs
 */
export function getPetMood(petState) {
  if (!petState) return 0;
  const hunger = Math.max(0, petState.hunger || 0);
  const happiness = Math.max(0, petState.happiness || 0);
  const energy = Math.max(0, petState.energy || 0);
  return Math.min(1, (hunger + happiness + energy) / 300);
}

/**
 * Get combined bonuses from all active pets
 */
export function getPetBonuses(petsState) {
  const bonuses = {
    coinBonus: 0,
    dpsBonus: 0,
    stardustBonus: 0,
    xpBonus: 0,
    essenceBonus: 0,
    lootBonus: 0,
  };
  if (!petsState || !petsState.owned) return bonuses;

  petsState.owned.forEach(ps => {
    if (!ps.active) return;
    const template = PetDatabase.find(p => p.id === ps.id);
    if (!template) return;
    const mood = getPetMood(ps);
    const b = template.bonus(ps.level || 1, mood);
    Object.keys(b).forEach(k => {
      if (k !== 'desc' && bonuses[k] !== undefined) bonuses[k] += b[k];
    });
  });

  return bonuses;
}

/**
 * Decay pet needs over time (called in game tick)
 */
export function decayPetNeeds(petsState, deltaMs) {
  if (!petsState || !petsState.owned) return;
  const decayRate = deltaMs / 1000 / 60; // per minute
  petsState.owned.forEach(ps => {
    if (!ps.active) return;
    ps.hunger = Math.max(0, (ps.hunger || 100) - 0.5 * decayRate);
    ps.happiness = Math.max(0, (ps.happiness || 100) - 0.3 * decayRate);
    ps.energy = Math.max(0, (ps.energy || 100) - 0.2 * decayRate);
  });
}
