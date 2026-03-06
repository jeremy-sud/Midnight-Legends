export const UpgradeTypes = {
  GLOBAL_DPS: "GLOBAL_DPS",
  COIN_MULT: "COIN_MULT",
  CRIT_CHANCE: "CRIT_CHANCE",
  CRIT_DAMAGE: "CRIT_DAMAGE",
  STARDUST_CHANCE: "STARDUST_CHANCE",
};

export const UpgradeDatabase = [
  {
    id: "upg_global_dps",
    name: "Midnight Echoes",
    type: UpgradeTypes.GLOBAL_DPS,
    baseCost: 50,
    costMultiplier: 1.5,
    effectPerLevel: 0.1, // +10% Party DPS per level
    maxLevel: 100,
    desc: "Increases total Party DPS by 10% per level.",
    color: "#d500f9",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',
  },
  {
    id: "upg_coin_mult",
    name: "Golden Veins",
    type: UpgradeTypes.COIN_MULT,
    baseCost: 100,
    costMultiplier: 1.8,
    effectPerLevel: 0.25, // +25% Coins per level
    maxLevel: 50,
    desc: "Increases Coin drops from all enemies by 25% per level.",
    color: "#ffca28",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
  },
  {
    id: "upg_crit_chance",
    name: "Assassin's Eye",
    type: UpgradeTypes.CRIT_CHANCE,
    baseCost: 200,
    costMultiplier: 2.5,
    effectPerLevel: 1, // +1% Crit Chance per level
    maxLevel: 25,
    desc: "Increases global Critical Hit Chance by 1% per level.",
    color: "#00e5ff",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  },
  {
    id: "upg_crit_damage",
    name: "Lethal Strike",
    type: UpgradeTypes.CRIT_DAMAGE,
    baseCost: 250,
    costMultiplier: 2.2,
    effectPerLevel: 0.5, // +50% Crit Damage Mult
    maxLevel: 20,
    desc: "Increases Critical Damage multiplier by 50% per level. Base is 200%.",
    color: "#ff1744",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 22 8-8"/><path d="M14 2 2 14"/><path d="M22 2 10 14"/><path d="m14 10 8 8"/><path d="M18 14 14 18"/><path d="M6 10 10 6"/></svg>',
  },
  {
    id: "upg_stardust_chance",
    name: "Astral Harvest",
    type: UpgradeTypes.STARDUST_CHANCE,
    baseCost: 500,
    costMultiplier: 3.0,
    effectPerLevel: 2, // +2% Stardust drop chance per level on non-boss kills
    maxLevel: 15,
    desc: "Grants a 2% chance per level to earn bonus Stardust from any enemy.",
    color: "#ffb74d",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>',
  },
  {
    id: "upg_click_power",
    name: "Iron Fist",
    type: "CLICK_POWER",
    baseCost: 75,
    costMultiplier: 1.6,
    effectPerLevel: 0.15, // +15% Click Power per level
    maxLevel: 50,
    desc: "Increases manual click damage by 15% per level.",
    color: "#76ff03",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4l-4 4 4 4"/><path d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"/></svg>',
  },
  {
    id: "upg_familiar_speed",
    name: "Familiar Bond",
    type: "FAMILIAR_SPEED",
    baseCost: 300,
    costMultiplier: 2.0,
    effectPerLevel: 0.2, // +20% Familiar efficiency per level
    maxLevel: 30,
    desc: "Increases Familiar auto-click damage by 20% per level.",
    color: "#00b0ff",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  },
  {
    id: "upg_loot_luck",
    name: "Fortune's Favor",
    type: "LOOT_LUCK",
    baseCost: 800,
    costMultiplier: 2.5,
    effectPerLevel: 1, // +1% better item rarity chance per level
    maxLevel: 20,
    desc: "Increases loot drop chance by 1% per level. Better loot from all enemies.",
    color: "#ff6e40",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  },
  // --- NEW UPGRADES ---
  {
    id: "upg_hp_drain",
    name: "Soul Siphon",
    type: "HP_DRAIN",
    baseCost: 400,
    costMultiplier: 2.0,
    effectPerLevel: 0.05, // +5% passive healing (flavor)
    maxLevel: 20,
    desc: "Each kill grants a small passive bonus (+5% coin bonus per level).",
    color: "#e040fb",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  },
  {
    id: "upg_xp_boost",
    name: "Knowledge Tome",
    type: "XP_BOOST",
    baseCost: 350,
    costMultiplier: 1.8,
    effectPerLevel: 0.10, // +10% XP per level
    maxLevel: 30,
    desc: "Increases XP gained from all sources by 10% per level.",
    color: "#64ffda",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  },
  {
    id: "upg_multi_strike",
    name: "Phantom Blades",
    type: "MULTI_STRIKE",
    baseCost: 600,
    costMultiplier: 2.2,
    effectPerLevel: 0.08, // +8% chance for double hit
    maxLevel: 15,
    desc: "Each click has an 8% chance per level to strike twice.",
    color: "#ff80ab",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14,2 14,8 20,8"/><path d="M8 13h2"/><path d="M8 17h2"/><path d="M14 13h2"/><path d="M14 17h2"/></svg>',
  },
  {
    id: "upg_gem_magnet",
    name: "Gem Magnet",
    type: "GEM_MAGNET",
    baseCost: 1000,
    costMultiplier: 3.0,
    effectPerLevel: 0.5, // +0.5% gem drop chance per level
    maxLevel: 10,
    desc: "Increases Gem drop chance by 0.5% per level from all enemies.",
    color: "#e040fb",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 20,9 12,22 4,9"/><line x1="12" y1="2" x2="12" y2="22" stroke-width="1" opacity="0.3"/></svg>',
  },
  {
    id: "upg_base_power",
    name: "Inner Strength",
    type: "BASE_POWER",
    baseCost: 25,
    costMultiplier: 1.4,
    effectPerLevel: 3, // +3 base click damage per level
    maxLevel: 100,
    desc: "Increases your base click damage by 3 per level. A fundamental improvement.",
    color: "#ff9100",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
  },
  {
    id: "upg_idle_coins",
    name: "Coin Fountain",
    type: "IDLE_COINS",
    baseCost: 500,
    costMultiplier: 2.0,
    effectPerLevel: 1, // +1 coin per second per level
    maxLevel: 50,
    desc: "Passively generates 1 coin per second per level, even without clicking.",
    color: "#ffd740",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6"/><path d="M12 22v-6"/><path d="M4.93 4.93l4.24 4.24"/><path d="M14.83 14.83l4.24 4.24"/><path d="M2 12h6"/><path d="M16 12h6"/><path d="M4.93 19.07l4.24-4.24"/><path d="M14.83 9.17l4.24-4.24"/></svg>',
  },
];

export function getUpgradeCost(templateId, currentLevel) {
  const template = UpgradeDatabase.find((u) => u.id === templateId);
  if (!template) return 0;
  return Math.floor(
    template.baseCost * Math.pow(template.costMultiplier, currentLevel)
  );
}

export function getUpgradeEffect(templateId, currentLevel) {
  const template = UpgradeDatabase.find((u) => u.id === templateId);
  if (!template) return 0;
  return template.effectPerLevel * currentLevel;
}
