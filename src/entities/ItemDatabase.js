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

  return {
    uid: "i_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    templateId: template.id,
    rarity: rarity,
  };
}

export function getItemStats(itemInstance) {
  const template = ItemTemplate.find((t) => t.id === itemInstance.templateId);
  const value = template.baseValue * itemInstance.rarity.statMult;
  return {
    ...template,
    rarity: itemInstance.rarity,
    computedValue: value,
  };
}
