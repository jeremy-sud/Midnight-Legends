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

  // ── NEW PETS (Phase 3) ─────────────────────────────────────────────

  {
    id: 'pet_phoenix',
    name: 'Phoenix',
    species: 'Ember Hatchling',
    icon: '🔥',
    desc: 'A baby phoenix wreathed in eternal flame. Revives stronger after every rest.',
    unlockCost: { essence: 40 },
    maxLevel: 25,
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="phx1" cx="50%" cy="60%" r="50%"><stop offset="0%" stop-color="#fff176"/><stop offset="50%" stop-color="#ff9800"/><stop offset="100%" stop-color="#d84315" stop-opacity="0.3"/></radialGradient>
        <radialGradient id="phx2" cx="50%" cy="40%" r="45%"><stop offset="0%" stop-color="#ffeb3b" stop-opacity="0.7"/><stop offset="100%" stop-color="#ff5722" stop-opacity="0"/></radialGradient>
        <filter id="phxGlow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <ellipse cx="32" cy="50" rx="14" ry="4" fill="#ff5722" opacity="0.15"/>
      <path d="M32 10 Q26 18 28 28 Q22 22 20 14 Q18 24 24 32 Q18 28 14 22 Q16 32 22 38 L26 44 Q30 48 32 48 Q34 48 38 44 L42 38 Q48 32 50 22 Q46 28 40 32 Q46 24 44 14 Q42 22 36 28 Q38 18 32 10Z" fill="url(#phx1)" filter="url(#phxGlow)"/>
      <ellipse cx="32" cy="38" rx="10" ry="8" fill="url(#phx2)"/>
      <circle cx="28" cy="36" r="2.5" fill="#1a1a2e"/><circle cx="29" cy="35" r="1" fill="white"/>
      <circle cx="36" cy="36" r="2.5" fill="#1a1a2e"/><circle cx="37" cy="35" r="1" fill="white"/>
      <path d="M30 41 Q32 43 34 41" stroke="#bf360c" stroke-width="0.8" fill="none"/>
      <path d="M28 30 Q32 26 36 30" fill="#ffcc80" opacity="0.5"/>
    </svg>`,
    bonus: (level, mood) => ({
      dpsBonus: 0.025 * level * mood,
      essenceBonus: 0.015 * level * mood,
      desc: `+${(2.5 * level * mood).toFixed(0)}% DPS, +${(1.5 * level * mood).toFixed(0)}% Essence`
    }),
  },
  {
    id: 'pet_prism',
    name: 'Prism',
    species: 'Crystal Dragon',
    icon: '💎',
    desc: 'A tiny crystalline dragon that refracts light into rainbow shards. Boosts all resources.',
    unlockCost: { gems: 150 },
    maxLevel: 25,
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="prism1" x1="0" y1="0" x2="64" y2="64"><stop offset="0%" stop-color="#e040fb"/><stop offset="33%" stop-color="#40c4ff"/><stop offset="66%" stop-color="#69f0ae"/><stop offset="100%" stop-color="#ffca28"/></linearGradient>
        <filter id="prismGlow"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <ellipse cx="32" cy="52" rx="12" ry="3" fill="#7c4dff" opacity="0.12"/>
      <path d="M32 14 L44 28 L42 44 L22 44 L20 28Z" fill="url(#prism1)" opacity="0.8" stroke="url(#prism1)" stroke-width="1.5" filter="url(#prismGlow)"/>
      <path d="M32 14 L36 24 L32 20 L28 24Z" fill="white" opacity="0.35"/>
      <path d="M20 28 L28 32 L22 44" fill="white" opacity="0.1"/>
      <path d="M44 28 L36 32 L42 44" fill="white" opacity="0.15"/>
      <circle cx="28" cy="32" r="2" fill="#1a1a2e"/><circle cx="29" cy="31" r="0.8" fill="white"/>
      <circle cx="36" cy="32" r="2" fill="#1a1a2e"/><circle cx="37" cy="31" r="0.8" fill="white"/>
      <path d="M30 37 Q32 39 34 37" stroke="#7c4dff" stroke-width="0.7" fill="none"/>
      <path d="M18 30 L12 26 M16 34 L10 34 M18 38 L12 42" stroke="url(#prism1)" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
      <path d="M46 30 L52 26 M48 34 L54 34 M46 38 L52 42" stroke="url(#prism1)" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
      <path d="M26 44 Q28 50 30 48 Q32 52 34 48 Q36 50 38 44" fill="url(#prism1)" opacity="0.3"/>
    </svg>`,
    bonus: (level, mood) => ({
      coinBonus: 0.012 * level * mood,
      stardustBonus: 0.012 * level * mood,
      dpsBonus: 0.008 * level * mood,
      desc: `+${(1.2 * level * mood).toFixed(0)}% Coins/Stardust, +${(0.8 * level * mood).toFixed(0)}% DPS`
    }),
  },
  {
    id: 'pet_nebula',
    name: 'Nebula',
    species: 'Cosmic Jellyfish',
    icon: '🪼',
    desc: 'A translucent space jellyfish trailing stardust. Warps luck in your favor.',
    unlockCost: { stardust: 2000 },
    maxLevel: 25,
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="neb1" cx="50%" cy="35%" r="40%"><stop offset="0%" stop-color="#e1bee7" stop-opacity="0.9"/><stop offset="50%" stop-color="#ce93d8" stop-opacity="0.6"/><stop offset="100%" stop-color="#7b1fa2" stop-opacity="0.2"/></radialGradient>
        <filter id="nebGlow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <ellipse cx="32" cy="28" rx="16" ry="12" fill="url(#neb1)" filter="url(#nebGlow)"/>
      <ellipse cx="32" cy="28" rx="12" ry="9" fill="#e1bee7" opacity="0.3"/>
      <ellipse cx="28" cy="24" rx="5" ry="3" fill="white" opacity="0.2" transform="rotate(-15 28 24)"/>
      <circle cx="27" cy="27" r="2" fill="#1a1a2e" opacity="0.8"/><circle cx="28" cy="26" r="0.8" fill="white"/>
      <circle cx="37" cy="27" r="2" fill="#1a1a2e" opacity="0.8"/><circle cx="38" cy="26" r="0.8" fill="white"/>
      <path d="M30 32 Q32 34 34 32" stroke="#9c27b0" stroke-width="0.6" fill="none"/>
      <path d="M20 36 Q18 44 20 52 Q22 56 24 52" stroke="#ce93d8" stroke-width="2" stroke-linecap="round" opacity="0.6" fill="none"/>
      <path d="M27 38 Q26 48 28 56" stroke="#ce93d8" stroke-width="1.5" stroke-linecap="round" opacity="0.5" fill="none"/>
      <path d="M37 38 Q38 48 36 56" stroke="#ce93d8" stroke-width="1.5" stroke-linecap="round" opacity="0.5" fill="none"/>
      <path d="M44 36 Q46 44 44 52 Q42 56 40 52" stroke="#ce93d8" stroke-width="2" stroke-linecap="round" opacity="0.6" fill="none"/>
      <circle cx="20" cy="50" r="1.5" fill="#e040fb" opacity="0.4"/>
      <circle cx="42" cy="48" r="1" fill="#e040fb" opacity="0.3"/>
      <circle cx="30" cy="54" r="1.2" fill="#e040fb" opacity="0.35"/>
    </svg>`,
    bonus: (level, mood) => ({
      lootBonus: 0.01 * level * mood,
      stardustBonus: 0.02 * level * mood,
      desc: `+${(1 * level * mood).toFixed(0)}% Loot, +${(2 * level * mood).toFixed(0)}% Stardust`
    }),
  },
  {
    id: 'pet_terra',
    name: 'Terra',
    species: 'Earth Tortoise',
    icon: '🐢',
    desc: 'An ancient tortoise with a miniature garden on its shell. Slow but immensely wise.',
    unlockCost: { coins: 100000 },
    maxLevel: 25,
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="terra1" cx="50%" cy="40%" r="50%"><stop offset="0%" stop-color="#a5d6a7"/><stop offset="60%" stop-color="#66bb6a"/><stop offset="100%" stop-color="#2e7d32"/></radialGradient>
        <radialGradient id="terra2" cx="50%" cy="30%" r="50%"><stop offset="0%" stop-color="#c8e6c9" stop-opacity="0.6"/><stop offset="100%" stop-color="#388e3c" stop-opacity="0.1"/></radialGradient>
      </defs>
      <ellipse cx="32" cy="54" rx="18" ry="4" fill="#4caf50" opacity="0.1"/>
      <ellipse cx="32" cy="42" rx="18" ry="12" fill="url(#terra1)" stroke="#2e7d32" stroke-width="1.5"/>
      <ellipse cx="32" cy="40" rx="14" ry="9" fill="url(#terra2)"/>
      <path d="M24 36 L32 32 L40 36 L36 42 L28 42Z" stroke="#1b5e20" stroke-width="0.8" fill="none" opacity="0.4"/>
      <path d="M32 32 L32 42 M24 36 L40 36 M28 42 L36 42" stroke="#1b5e20" stroke-width="0.5" opacity="0.3"/>
      <ellipse cx="20" cy="40" rx="5" ry="4" fill="#8d6e63"/>
      <circle cx="18" cy="38" r="1.5" fill="#1a1a2e"/><circle cx="19" cy="37" r="0.6" fill="white"/>
      <ellipse cx="44" cy="42" rx="4" ry="3" fill="#8d6e63"/>
      <ellipse cx="22" cy="50" rx="4" ry="3" fill="#8d6e63"/>
      <ellipse cx="42" cy="50" rx="4" ry="3" fill="#8d6e63"/>
      <path d="M28 30 Q26 24 28 22" stroke="#43a047" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <circle cx="28" cy="22" r="2" fill="#66bb6a"/>
      <path d="M36 30 Q38 26 36 24 Q34 22 36 20" stroke="#43a047" stroke-width="1" stroke-linecap="round" fill="none"/>
      <circle cx="36" cy="20" r="1.5" fill="#ef5350"/>
    </svg>`,
    bonus: (level, mood) => ({
      xpBonus: 0.025 * level * mood,
      coinBonus: 0.015 * level * mood,
      desc: `+${(2.5 * level * mood).toFixed(0)}% XP, +${(1.5 * level * mood).toFixed(0)}% Coins`
    }),
  },
  {
    id: 'pet_storm',
    name: 'Storm',
    species: 'Thunder Serpent',
    icon: '⚡',
    desc: 'A tiny lightning serpent crackling with energy. Supercharges click damage.',
    unlockCost: { gems: 200 },
    maxLevel: 25,
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="storm1" x1="0" y1="0" x2="64" y2="64"><stop offset="0%" stop-color="#fff176"/><stop offset="100%" stop-color="#ffca28"/></linearGradient>
        <filter id="stormGlow"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path d="M48 12 Q52 16 50 22 Q54 26 48 30 Q52 34 46 38 Q50 42 44 46 Q42 50 38 48 Q34 52 30 48 Q26 50 24 46 Q20 48 18 44 Q14 42 18 38 Q14 34 20 30 Q16 26 22 24 Q18 20 24 18 Q22 14 28 14 Q30 10 34 12 Q38 8 42 12 Q46 10 48 12Z" fill="url(#storm1)" stroke="#f9a825" stroke-width="1" opacity="0.8" filter="url(#stormGlow)"/>
      <ellipse cx="32" cy="30" rx="12" ry="10" fill="#fff9c4" opacity="0.4"/>
      <circle cx="27" cy="28" r="2.5" fill="#1a1a2e"/><circle cx="28" cy="27" r="1" fill="white"/>
      <circle cx="37" cy="28" r="2.5" fill="#1a1a2e"/><circle cx="38" cy="27" r="1" fill="white"/>
      <path d="M30 34 Q32 36 34 34" stroke="#e65100" stroke-width="0.8" fill="none"/>
      <path d="M28 42 Q24 48 20 54 Q18 58 16 56" stroke="#ffca28" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.7"/>
      <path d="M36 42 Q40 48 44 54 Q46 58 48 56" stroke="#ffca28" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.7"/>
      <polygon points="30,18 32,12 34,18 32,16" fill="#fff176" opacity="0.6"/>
      <path d="M20 20 L16 16 M44 20 L48 16 M18 34 L12 34 M46 34 L52 34" stroke="#ffca28" stroke-width="1" opacity="0.4"/>
    </svg>`,
    bonus: (level, mood) => ({
      dpsBonus: 0.03 * level * mood,
      lootBonus: 0.005 * level * mood,
      desc: `+${(3 * level * mood).toFixed(0)}% DPS, +${(0.5 * level * mood).toFixed(1)}% Loot`
    }),
  },
];

export const PetFoods = [
  { id: 'food_basic', name: 'Trail Mix', icon: '🥜', cost: { coins: 100 }, hungerRestore: 30 },
  { id: 'food_premium', name: 'Moon Berries', icon: '🫐', cost: { stardust: 5 }, hungerRestore: 60 },
  { id: 'food_deluxe', name: 'Star Nectar', icon: '🍯', cost: { gems: 2 }, hungerRestore: 100 },
  { id: 'food_treat', name: 'Void Truffle', icon: '🍫', cost: { essence: 1 }, hungerRestore: 50, happinessRestore: 30 },
  { id: 'food_feast', name: 'Celestial Feast', icon: '🍱', cost: { gems: 5 }, hungerRestore: 100, happinessRestore: 50, energyRestore: 50 },
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
