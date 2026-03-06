export const ItemRarities = {
  COMMON: { id: "common", name: "Common", color: "#a0a0a0", statMult: 1 },
  RARE: { id: "rare", name: "Rare", color: "#03dac6", statMult: 2 },
  EPIC: { id: "epic", name: "Epic", color: "#bb86fc", statMult: 5 },
  LEGENDARY: {
    id: "legendary",
    name: "Legendary",
    color: "#ffb74d",
    statMult: 15,
  },
};

export const ItemCategories = {
  WEAPON: "weapon", // Gives +Flat Base DPS
  ARMOR: "armor", // Gives +% DPS Multiplier
  ACCESSORY: "accessory", // Gives +% Crit Chance
};

export const ItemTemplate = [
  // --- WEAPONS ---
  {
    id: "i_iron_sword",
    name: "Iron Sword",
    category: ItemCategories.WEAPON,
    baseValue: 5,
    desc: "A basic but sturdy blade.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m14.5 9.5-2.5-2.5"/><path d="m5 19-2 2a2.83 2.83 0 0 0 4 4l2-2"/><path d="m7 17 8-8c1-1 3-1 4 0s1 3 0 4l-8 8"/><path d="m10 20 3 3"/><path d="m15 4-2 2"/></svg>',
  },
  {
    id: "i_lunar_blade",
    name: "Lunar Blade",
    category: ItemCategories.WEAPON,
    baseValue: 20,
    desc: "Forged from the light of the moon.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/></svg>',
  },
  {
    id: "i_void_dagger",
    name: "Void Dagger",
    category: ItemCategories.WEAPON,
    baseValue: 45,
    desc: "A blade that cuts through dimensions.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22L18 2"/><path d="M4 18l4-2"/><path d="M8 20l2-4"/><circle cx="17" cy="5" r="2"/></svg>',
  },
  {
    id: "i_starfall_axe",
    name: "Starfall Axe",
    category: ItemCategories.WEAPON,
    baseValue: 80,
    desc: "Heavy weapon that fell from the heavens.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V8"/><path d="M5 12l7-8 7 8"/><path d="M3 10l4 2v4"/><path d="M21 10l-4 2v4"/></svg>',
  },

  // --- ARMOR ---
  {
    id: "i_leather_tunic",
    name: "Leather Tunic",
    category: ItemCategories.ARMOR,
    baseValue: 0.1,
    desc: "Offers basic protection and a slight confidence boost.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  },
  {
    id: "i_starlight_mail",
    name: "Starlight Mail",
    category: ItemCategories.ARMOR,
    baseValue: 0.35,
    desc: "Armor woven from the fabric of the night sky.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  },
  {
    id: "i_eclipse_plate",
    name: "Eclipse Plate",
    category: ItemCategories.ARMOR,
    baseValue: 0.6,
    desc: "Forged during a lunar eclipse — absorbs dark energy.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a8 8 0 0 0 0 20 10 10 0 0 1 0-20"/></svg>',
  },
  {
    id: "i_voidweave_robe",
    name: "Voidweave Robe",
    category: ItemCategories.ARMOR,
    baseValue: 1.0,
    desc: "Robes threaded with strands of pure void energy.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l4 16h8l4-16"/><path d="M8 4l4 6 4-6"/><path d="M6 12h12"/></svg>',
  },

  // --- ACCESSORIES ---
  {
    id: "i_copper_ring",
    name: "Copper Ring",
    category: ItemCategories.ACCESSORY,
    baseValue: 2,
    desc: "A simple ring that brings a little luck.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12a4 4 0 0 1 8 0"/></svg>',
  },
  {
    id: "i_galaxy_pendant",
    name: "Galaxy Pendant",
    category: ItemCategories.ACCESSORY,
    baseValue: 10,
    desc: "Contains a miniature swirling galaxy inside.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
  },
  {
    id: "i_moonstone_amulet",
    name: "Moonstone Amulet",
    category: ItemCategories.ACCESSORY,
    baseValue: 18,
    desc: "Pulses with silvery light under the full moon.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"/></svg>',
  },
  {
    id: "i_chaos_eye",
    name: "Eye of Chaos",
    category: ItemCategories.ACCESSORY,
    baseValue: 30,
    desc: "Sees the critical weakness in every foe.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  },

  // --- EXPANDED WEAPONS ---
  {
    id: "i_eclipse_scythe",
    name: "Eclipse Scythe",
    category: ItemCategories.WEAPON,
    baseValue: 150,
    desc: "Harvests souls under the eclipsed moon.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3L6 21"/><path d="M18 3c3 3 3 8 0 11-2 2-5 2-7 1"/></svg>',
  },
  {
    id: "i_stellar_bow",
    name: "Stellar Bow",
    category: ItemCategories.WEAPON,
    baseValue: 120,
    desc: "Fires arrows woven from pure starlight.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3c0 0-2 8 0 18"/><path d="M6 3L20 12L6 21"/><path d="M10 12h10"/></svg>',
  },

  // --- EXPANDED ARMOR ---
  {
    id: "i_astral_ward",
    name: "Astral Ward",
    category: ItemCategories.ARMOR,
    baseValue: 1.5,
    desc: "A barrier of compressed starlight that amplifies all damage.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5.5-3.8 10-8 12-4.2-2-8-6.5-8-12V6l8-4z"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>',
  },

  // --- EXPANDED ACCESSORIES ---
  {
    id: "i_crown_shard",
    name: "Crown Shard",
    category: ItemCategories.ACCESSORY,
    baseValue: 50,
    desc: "A fragment of the Moon King's lost crown. Radiates ancient power.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18L6 8 12 14 18 8 21 18Z"/><path d="M3 18h18"/><circle cx="12" cy="14" r="2" fill="currentColor"/></svg>',
  },

  // ── NEW ITEMS (Phase 2.4) ─────────────────────────────────────────

  // --- WEAPONS with special effects ---
  {
    id: "i_vampiric_fang",
    name: "Vampiric Fang",
    category: ItemCategories.WEAPON,
    baseValue: 60,
    desc: "Drains the life essence of every foe it strikes.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L8 12h3v8l5-10h-3z"/></svg>',
    effect: { type: 'lifesteal', value: 0.02, desc: '+2% Lifesteal' },
  },
  {
    id: "i_inferno_blade",
    name: "Inferno Blade",
    category: ItemCategories.WEAPON,
    baseValue: 100,
    desc: "Burns with an eternal flame that ignites everything it touches.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c-4-3-8-7-8-12a8 8 0 0 1 16 0c0 5-4 9-8 12z"/><path d="M12 22c-1.5-2-3-4.5-3-7a3 3 0 0 1 6 0c0 2.5-1.5 5-3 7z"/></svg>',
    effect: { type: 'dot', value: 0.05, desc: '+5% Burn DoT' },
  },
  {
    id: "i_glacial_hammer",
    name: "Glacial Hammer",
    category: ItemCategories.WEAPON,
    baseValue: 90,
    desc: "Freezes enemies on impact, slowing their defenses.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v4M14 2v4M6 6h12v4l-3 4v4H9v-4L6 10V6z"/><path d="M10 18v4M14 18v4"/></svg>',
    effect: { type: 'slow', value: 0.10, desc: '+10% enemy slow' },
  },
  {
    id: "i_splinter_glaive",
    name: "Splinter Glaive",
    category: ItemCategories.WEAPON,
    baseValue: 110,
    desc: "Shatters into fragments on impact, hitting multiple targets.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20L20 4"/><path d="M15 4h5v5"/><path d="M4 20l4-1 1-4"/><path d="M9 9l-3 3M15 15l3-3"/></svg>',
    effect: { type: 'splash', value: 0.15, desc: '+15% Splash damage' },
  },

  // --- ARMOR with special effects ---
  {
    id: "i_thornmail",
    name: "Thornmail",
    category: ItemCategories.ARMOR,
    baseValue: 0.45,
    desc: "Reflects a portion of incoming aura damage back to enemies.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M8 10l3-3M16 10l-3-3M12 16v-4"/></svg>',
    effect: { type: 'reflect', value: 0.05, desc: '+5% Damage reflect' },
  },
  {
    id: "i_phantom_cloak",
    name: "Phantom Cloak",
    category: ItemCategories.ARMOR,
    baseValue: 0.8,
    desc: "Phases between dimensions, avoiding damage entirely.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" stroke-dasharray="3 3"/><circle cx="12" cy="12" r="4"/></svg>',
    effect: { type: 'dodge', value: 0.08, desc: '+8% Dodge chance' },
  },
  {
    id: "i_sunforged_plate",
    name: "Sunforged Plate",
    category: ItemCategories.ARMOR,
    baseValue: 1.2,
    desc: "Forged in the heart of a dying star. Nearly indestructible.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5.5-3.8 10-8 12-4.2-2-8-6.5-8-12V6l8-4z"/><circle cx="12" cy="10" r="3"/><path d="M12 13v4"/></svg>',
    effect: { type: 'dps_aura', value: 0.10, desc: '+10% Party DPS aura' },
  },

  // --- ACCESSORIES with special effects ---
  {
    id: "i_lucky_clover",
    name: "Lucky Clover",
    category: ItemCategories.ACCESSORY,
    baseValue: 15,
    desc: "Makes the impossible possible. Lucky drops guaranteed.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12c-2-2-5-2-5 1s3 3 5 5c2-2 5-2 5-5s-3-3-5-1z"/><path d="M12 12c-2 2-2 5 1 5s3-3 5-5"/><path d="M12 12c2-2 2-5-1-5s-3 3-5 5"/><path d="M12 17v5"/></svg>',
    effect: { type: 'loot_bonus', value: 0.05, desc: '+5% Loot chance' },
  },
  {
    id: "i_berserker_totem",
    name: "Berserker Totem",
    category: ItemCategories.ACCESSORY,
    baseValue: 25,
    desc: "The lower your enemy's health, the harder you hit.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><circle cx="12" cy="8" r="3"/><path d="M9 14h6M9 17h6"/></svg>',
    effect: { type: 'execute', value: 0.20, desc: '+20% DMG below 30% HP' },
  },
  {
    id: "i_chrono_lens",
    name: "Chrono Lens",
    category: ItemCategories.ACCESSORY,
    baseValue: 35,
    desc: "Bends time around the wearer, accelerating all actions.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 4"/><path d="M2 12h2M20 12h2M12 2v2M12 20v2"/></svg>',
    effect: { type: 'speed', value: 0.10, desc: '+10% Attack speed' },
  },
  {
    id: "i_void_heart",
    name: "Void Heart",
    category: ItemCategories.ACCESSORY,
    baseValue: 45,
    desc: "Pulses with raw void energy. Amplifies all damage sources.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/><circle cx="12" cy="12" r="3" stroke-dasharray="2 2"/></svg>',
    effect: { type: 'dmg_amp', value: 0.12, desc: '+12% All DMG amp' },
  },

  // ── NEW ITEMS (Phase 3) ───────────────────────────────────────────

  // --- WEAPONS ---
  {
    id: "i_soul_reaper",
    name: "Soul Reaper",
    category: ItemCategories.WEAPON,
    baseValue: 130,
    desc: "Harvests souls to fuel devastating strikes.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8"/><path d="M4 10c0-2 4-4 8-4s8 2 8 4"/><path d="M4 10c0 4 3 8 8 10 5-2 8-6 8-10"/><path d="M12 22v-4"/></svg>',
    effect: { type: 'lifesteal', value: 0.04, desc: '+4% Lifesteal' },
  },
  {
    id: "i_thunder_spear",
    name: "Thunder Spear",
    category: ItemCategories.WEAPON,
    baseValue: 140,
    desc: "Crackles with raw lightning, paralyzing enemies.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    effect: { type: 'dot', value: 0.08, desc: '+8% Lightning DoT' },
  },
  {
    id: "i_abyssal_scythe",
    name: "Abyssal Scythe",
    category: ItemCategories.WEAPON,
    baseValue: 160,
    desc: "A curved blade that cuts through the veil between worlds.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20L18 4"/><path d="M18 4c2 2 3 6-1 10"/><path d="M14 8c-4 4-8 3-10 1"/></svg>',
    effect: { type: 'execute', value: 0.25, desc: '+25% DMG below 30% HP' },
  },
  {
    id: "i_celestial_bow",
    name: "Celestial Bow",
    category: ItemCategories.WEAPON,
    baseValue: 120,
    desc: "Shoots arrows made of condensed starlight.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2l4 4-8 8-4-4 8-8z"/><path d="M10 10L3 17v4h4l7-7"/><path d="M14 6l4 4"/></svg>',
    effect: { type: 'speed', value: 0.08, desc: '+8% Attack speed' },
  },

  // --- ARMOR ---
  {
    id: "i_dragon_scale",
    name: "Dragon Scale Armor",
    category: ItemCategories.ARMOR,
    baseValue: 1.5,
    desc: "Crafted from the scales of an ancient void dragon.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5.5-3.8 10-8 12-4.2-2-8-6.5-8-12V6l8-4z"/><path d="M8 8l4 2 4-2"/><path d="M8 12l4 2 4-2"/><path d="M8 16l4 2 4-2"/></svg>',
    effect: { type: 'reflect', value: 0.08, desc: '+8% Damage reflect' },
  },
  {
    id: "i_shadow_mantle",
    name: "Shadow Mantle",
    category: ItemCategories.ARMOR,
    baseValue: 1.0,
    desc: "Woven from shadows themselves. Nearly invisible.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 2 4 6 4 12c0 4 2 7 4 9l4 1 4-1c2-2 4-5 4-9 0-6-4-10-8-10z"/><path d="M8 8c2 1 6 1 8 0" opacity="0.5"/></svg>',
    effect: { type: 'dodge', value: 0.12, desc: '+12% Dodge chance' },
  },
  {
    id: "i_frost_aegis",
    name: "Frost Aegis",
    category: ItemCategories.ARMOR,
    baseValue: 0.9,
    desc: "An icy shield that freezes attackers on contact.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5.5-3.8 10-8 12-4.2-2-8-6.5-8-12V6l8-4z"/><path d="M12 6v12M8 9l4 3-4 3M16 9l-4 3 4 3"/></svg>',
    effect: { type: 'slow', value: 0.15, desc: '+15% enemy slow' },
  },

  // --- ACCESSORIES ---
  {
    id: "i_moonstone_ring",
    name: "Moonstone Ring",
    category: ItemCategories.ACCESSORY,
    baseValue: 40,
    desc: "Pulses with the rhythm of the moon, amplifying power at night.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="8" r="1.5" fill="currentColor"/></svg>',
    effect: { type: 'dps_aura', value: 0.08, desc: '+8% Party DPS aura' },
  },
  {
    id: "i_thieves_charm",
    name: "Thief\'s Charm",
    category: ItemCategories.ACCESSORY,
    baseValue: 30,
    desc: "Increases coin drops from defeated enemies.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9 9.5c0-1.5 1-2.5 3-2.5s3 1 3 2.5-1 2-3 2.5-3 1-3 2.5 1 2.5 3 2.5 3-1 3-2.5"/></svg>',
    effect: { type: 'loot_bonus', value: 0.08, desc: '+8% Loot chance' },
  },
  {
    id: "i_eclipse_pendant",
    name: "Eclipse Pendant",
    category: ItemCategories.ACCESSORY,
    baseValue: 55,
    desc: "Contains the power of a total solar eclipse. Devastating crits.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5" fill="currentColor" opacity="0.15"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/></svg>',
    effect: { type: 'dmg_amp', value: 0.15, desc: '+15% All DMG amp' },
  },
];

// Factory to generate an instanced item
export function generateRandomLootDrop(stage) {
  // Rarity weighting based on stage loops
  const loop = Math.floor(stage / 10);

  const rand = Math.random();
  let rarity = ItemRarities.COMMON;

  if (loop >= 5) {
    if (rand > 0.95) rarity = ItemRarities.LEGENDARY;
    else if (rand > 0.7) rarity = ItemRarities.EPIC;
    else rarity = ItemRarities.RARE;
  } else if (loop >= 2) {
    if (rand > 0.98) rarity = ItemRarities.LEGENDARY;
    else if (rand > 0.85) rarity = ItemRarities.EPIC;
    else if (rand > 0.4) rarity = ItemRarities.RARE;
  } else {
    if (rand > 0.99) rarity = ItemRarities.EPIC;
    else if (rand > 0.85) rarity = ItemRarities.RARE;
  }

  // Pick random template
  const template =
    ItemTemplate[Math.floor(Math.random() * ItemTemplate.length)];

  // Roll for prefix (30% chance on Rare+, 60% on Epic+, 100% on Legendary)
  let prefix = null;
  const prefixRoll = Math.random();
  if (rarity === ItemRarities.LEGENDARY || 
      (rarity === ItemRarities.EPIC && prefixRoll < 0.6) ||
      (rarity === ItemRarities.RARE && prefixRoll < 0.3)) {
    prefix = ItemPrefixes[Math.floor(Math.random() * ItemPrefixes.length)];
  }

  return {
    uid: "i_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    templateId: template.id,
    rarity: rarity,
    prefix: prefix ? prefix.id : null,
  };
}

// ── Item Prefixes ──────────────────────────────────────────────────
export const ItemPrefixes = [
  { id: 'blazing',   name: 'Blazing',   bonus: { type: 'dps',      value: 0.10 }, color: '#ff6b35' },
  { id: 'frozen',    name: 'Frozen',    bonus: { type: 'dps',      value: 0.08 }, color: '#4fc3f7' },
  { id: 'shadow',    name: 'Shadow',    bonus: { type: 'crit',     value: 3 },    color: '#9575cd' },
  { id: 'blessed',   name: 'Blessed',   bonus: { type: 'coins',    value: 0.15 }, color: '#ffd54f' },
  { id: 'ancient',   name: 'Ancient',   bonus: { type: 'dps',      value: 0.15 }, color: '#8d6e63' },
  { id: 'void',      name: 'Void',      bonus: { type: 'crit',     value: 5 },    color: '#ce93d8' },
  { id: 'stellar',   name: 'Stellar',   bonus: { type: 'dps',      value: 0.12 }, color: '#81d4fa' },
  { id: 'cursed',    name: 'Cursed',    bonus: { type: 'dps',      value: 0.20 }, color: '#ef5350' },
  { id: 'radiant',   name: 'Radiant',   bonus: { type: 'coins',    value: 0.20 }, color: '#fff176' },
  { id: 'spectral',  name: 'Spectral',  bonus: { type: 'crit',     value: 4 },    color: '#b0bec5' },
];

export function getPrefix(prefixId) {
  return ItemPrefixes.find(p => p.id === prefixId) || null;
}

export function getItemStats(itemInstance) {
  const template = ItemTemplate.find((t) => t.id === itemInstance.templateId);
  const value = template.baseValue * itemInstance.rarity.statMult;
  const prefix = itemInstance.prefix ? getPrefix(itemInstance.prefix) : null;
  return {
    ...template,
    rarity: itemInstance.rarity,
    computedValue: value,
    prefix,
    displayName: prefix ? `${prefix.name} ${template.name}` : template.name,
  };
}
