import { ItemCategories, getItemStats } from "./ItemDatabase.js";

export const Rarities = {
  COMMON: {
    id: "common",
    name: "Common",
    color: "#a0a0a0",
    statMult: 1,
    costMult: 1,
  },
  RARE: {
    id: "rare",
    name: "Rare",
    color: "#03dac6",
    statMult: 2.5,
    costMult: 3,
  },
  EPIC: {
    id: "epic",
    name: "Epic",
    color: "#bb86fc",
    statMult: 8,
    costMult: 10,
  },
  LEGENDARY: {
    id: "legendary",
    name: "Legendary",
    color: "#ffb74d",
    statMult: 25,
    costMult: 50,
  },
};

export const HeroTemplate = [
  // --- COMMON ---
  {
    id: "h_peasant",
    name: "Moon Peasant",
    rarity: Rarities.COMMON,
    baseDps: 1,
    baseCost: 50,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="mp1" cx="32" cy="32" r="30" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="currentColor" stop-opacity="0.15"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="32" r="28" fill="url(#mp1)"/><circle cx="32" cy="18" r="7" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/><circle cx="30" cy="17" r="1.2" fill="currentColor"/><circle cx="34" cy="17" r="1.2" fill="currentColor"/><line x1="32" y1="25" x2="32" y2="42" stroke="currentColor" stroke-width="2.5"/><line x1="32" y1="30" x2="22" y2="36" stroke="currentColor" stroke-width="2"/><line x1="32" y1="30" x2="42" y2="36" stroke="currentColor" stroke-width="2"/><path d="M42 36 L46 32" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="28" y1="42" x2="24" y2="56" stroke="currentColor" stroke-width="2.5"/><line x1="36" y1="42" x2="40" y2="56" stroke="currentColor" stroke-width="2.5"/><path d="M22 36 L18 42" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    desc: "A humble worker of the soil.",
  },
  {
    id: "h_militia",
    name: "Lunar Militia",
    rarity: Rarities.COMMON,
    baseDps: 2.5,
    baseCost: 150,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="16" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/><circle cx="30" cy="15" r="1" fill="currentColor"/><circle cx="34" cy="15" r="1" fill="currentColor"/><path d="M24 24h16l2 20H22Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.06"/><line x1="28" y1="44" x2="26" y2="58" stroke="currentColor" stroke-width="2.5"/><line x1="36" y1="44" x2="38" y2="58" stroke="currentColor" stroke-width="2.5"/><path d="M14 18 L14 4 L16 4 L16 18 M12 4 L18 4" stroke="currentColor" stroke-width="1.8"/><path d="M22 30 L14 22" stroke="currentColor" stroke-width="1.5"/><path d="M32 8 Q28 4 32 2 Q36 4 32 8Z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1"/></svg>',
    desc: "Armed with a pitchfork and determination.",
  },
  {
    id: "h_scout",
    name: "Dusk Scout",
    rarity: Rarities.COMMON,
    baseDps: 3.5,
    baseCost: 200,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="16" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/><circle cx="30" cy="15" r="1" fill="currentColor"/><circle cx="34" cy="15" r="1" fill="currentColor"/><path d="M26 24h12l1 16H25Z" stroke="currentColor" stroke-width="1.8" fill="currentColor" fill-opacity="0.05"/><path d="M26 24 L18 30" stroke="currentColor" stroke-width="1.5"/><path d="M38 24 L46 30" stroke="currentColor" stroke-width="1.5"/><line x1="29" y1="40" x2="27" y2="54" stroke="currentColor" stroke-width="2"/><line x1="35" y1="40" x2="37" y2="54" stroke="currentColor" stroke-width="2"/><circle cx="32" cy="32" r="14" stroke="currentColor" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.3"/><circle cx="32" cy="32" r="3" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1"/><path d="M28 10 L26 6" stroke="currentColor" stroke-width="1"/><path d="M36 10 L38 6" stroke="currentColor" stroke-width="1"/></svg>',
    desc: "Eyes sharp as starlight. Tracks enemies through the dark.",
  },

  // --- RARE ---
  {
    id: "h_ranger",
    name: "Night Ranger",
    rarity: Rarities.RARE,
    baseDps: 15,
    baseCost: 1000,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="nr1" cx="32" cy="30" r="28" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="currentColor" stop-opacity="0.12"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="30" r="26" fill="url(#nr1)"/><circle cx="32" cy="14" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/><circle cx="30" cy="13" r="1" fill="currentColor"/><circle cx="34" cy="13" r="1" fill="currentColor"/><path d="M27 10 L24 4 L28 8" stroke="currentColor" stroke-width="1.2"/><path d="M37 10 L40 4 L36 8" stroke="currentColor" stroke-width="1.2"/><path d="M25 22h14l2 18H23Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.06"/><line x1="28" y1="40" x2="26" y2="56" stroke="currentColor" stroke-width="2.5"/><line x1="36" y1="40" x2="38" y2="56" stroke="currentColor" stroke-width="2.5"/><path d="M38 28 L50 22 L52 24 L42 32" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M52 24 L54 18" stroke="currentColor" stroke-width="1" opacity="0.5"/></svg>',
    desc: "Strikes from the shadows with deadly precision.",
  },
  {
    id: "h_elementalist",
    name: "Spark Elementalist",
    rarity: Rarities.RARE,
    baseDps: 22,
    baseCost: 1800,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/><circle cx="30" cy="13" r="1" fill="currentColor"/><circle cx="34" cy="13" r="1" fill="currentColor"/><path d="M25 22h14l2 20H23Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.05"/><line x1="28" y1="42" x2="26" y2="56" stroke="currentColor" stroke-width="2.5"/><line x1="36" y1="42" x2="38" y2="56" stroke="currentColor" stroke-width="2.5"/><path d="M22 28 L12 22" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="20" r="4" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.15"/><path d="M8 18 L6 14" stroke="currentColor" stroke-width="1" opacity="0.6"/><path d="M12 18 L14 14" stroke="currentColor" stroke-width="1" opacity="0.6"/><path d="M42 28 L48 38" stroke="currentColor" stroke-width="1.5"/><polygon points="46,36 52,34 50,40 48,38" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="0.8"/></svg>',
    desc: "Weaves the residual energy of the moon into offensive spells.",
  },
  {
    id: "h_cleric",
    name: "Starweaver Cleric",
    rarity: Rarities.RARE,
    baseDps: 18,
    baseCost: 1400,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/><circle cx="30" cy="13" r="1" fill="currentColor"/><circle cx="34" cy="13" r="1" fill="currentColor"/><path d="M24 22h16l2 22H22Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.06"/><line x1="28" y1="44" x2="26" y2="58" stroke="currentColor" stroke-width="2.5"/><line x1="36" y1="44" x2="38" y2="58" stroke="currentColor" stroke-width="2.5"/><path d="M32 4 L32 0" stroke="currentColor" stroke-width="1.5"/><path d="M32 4 L28 2" stroke="currentColor" stroke-width="1"/><path d="M32 4 L36 2" stroke="currentColor" stroke-width="1"/><path d="M22 30 L14 26" stroke="currentColor" stroke-width="1.5"/><path d="M14 26 L14 18" stroke="currentColor" stroke-width="2"/><path d="M12 18 L14 14 L16 18" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.15"/><circle cx="44" cy="26" r="3" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.4"/><circle cx="48" cy="20" r="2" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.3"/></svg>',
    desc: "Channels healing starlight to bolster party damage output.",
  },

  // --- EPIC ---
  {
    id: "h_paladin",
    name: "Paladin of Eclipse",
    rarity: Rarities.EPIC,
    baseDps: 150,
    baseCost: 15000,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="pe1" cx="32" cy="28" r="26" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="currentColor" stop-opacity="0.18"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="28" r="24" fill="url(#pe1)"/><path d="M26 8h12l4 10H22Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.12"/><rect x="28" y="14" width="8" height="4" rx="1" fill="currentColor" fill-opacity="0.3"/><circle cx="31" cy="12" r="1" fill="currentColor"/><circle cx="35" cy="12" r="1" fill="currentColor"/><path d="M22 18h20l3 24H19Z" stroke="currentColor" stroke-width="2.5" fill="currentColor" fill-opacity="0.08"/><line x1="32" y1="22" x2="32" y2="36" stroke="currentColor" stroke-width="1.5" opacity="0.3"/><line x1="26" y1="28" x2="38" y2="28" stroke="currentColor" stroke-width="1.5" opacity="0.3"/><line x1="26" y1="42" x2="24" y2="58" stroke="currentColor" stroke-width="3"/><line x1="38" y1="42" x2="40" y2="58" stroke="currentColor" stroke-width="3"/><path d="M44 24 L52 18 L54 22 L46 28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M20 24 L12 20" stroke="currentColor" stroke-width="2"/><ellipse cx="10" cy="18" rx="4" ry="6" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.08"/></svg>',
    desc: "A heavy hitter clad in armor forged from fallen stars.",
  },
  {
    id: "h_assassin",
    name: "Shadow Dancer",
    rarity: Rarities.EPIC,
    baseDps: 220,
    baseCost: 28000,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="sd1" cx="32" cy="30" r="24" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="currentColor" stop-opacity="0.1"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="30" r="22" fill="url(#sd1)"/><circle cx="32" cy="14" r="5" stroke="currentColor" stroke-width="1.8" fill="currentColor" fill-opacity="0.08"/><path d="M30 12 L28 10" stroke="currentColor" stroke-width="1" opacity="0.6"/><circle cx="31" cy="13" r="0.8" fill="currentColor"/><circle cx="34" cy="13" r="0.8" fill="currentColor"/><path d="M27 20h10l1 18H26Z" stroke="currentColor" stroke-width="1.8" fill="currentColor" fill-opacity="0.04"/><line x1="30" y1="38" x2="28" y2="52" stroke="currentColor" stroke-width="2"/><line x1="34" y1="38" x2="38" y2="50" stroke="currentColor" stroke-width="2"/><path d="M38 50 L40 54" stroke="currentColor" stroke-width="1.5"/><path d="M38 26 L50 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M50 18 L54 14" stroke="currentColor" stroke-width="1.2" opacity="0.7"/><path d="M26 26 L16 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M16 20 L10 18" stroke="currentColor" stroke-width="1.5"/><path d="M10 18 L8 14 L12 16" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.1"/><path d="M36 24 L42 22" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.3"/><path d="M28 24 L22 22" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.3"/></svg>',
    desc: "Moves too fast for the naked eye. Incredibly high damage.",
  },
  {
    id: "h_necromancer",
    name: "Twilight Necromancer",
    rarity: Rarities.EPIC,
    baseDps: 180,
    baseCost: 22000,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="tn1" cx="32" cy="30" r="26" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="currentColor" stop-opacity="0.15"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="30" r="24" fill="url(#tn1)"/><circle cx="32" cy="14" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/><circle cx="30" cy="13" r="1" fill="currentColor"/><circle cx="34" cy="13" r="1" fill="currentColor"/><path d="M28 6 L26 2" stroke="currentColor" stroke-width="1.5"/><path d="M36 6 L38 2" stroke="currentColor" stroke-width="1.5"/><circle cx="26" cy="2" r="1.5" fill="currentColor" fill-opacity="0.3"/><circle cx="38" cy="2" r="1.5" fill="currentColor" fill-opacity="0.3"/><path d="M25 22h14l2 22H23Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.06"/><line x1="28" y1="44" x2="26" y2="58" stroke="currentColor" stroke-width="2.5"/><line x1="36" y1="44" x2="38" y2="58" stroke="currentColor" stroke-width="2.5"/><path d="M22 30 L12 28" stroke="currentColor" stroke-width="1.5"/><path d="M42 30 L52 28" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="26" r="3" stroke="currentColor" stroke-width="0.8" opacity="0.4" stroke-dasharray="2 1"/><circle cx="54" cy="26" r="3" stroke="currentColor" stroke-width="0.8" opacity="0.4" stroke-dasharray="2 1"/><circle cx="8" cy="36" r="2" stroke="currentColor" stroke-width="0.6" opacity="0.25" stroke-dasharray="1.5 1.5"/><circle cx="56" cy="36" r="2" stroke="currentColor" stroke-width="0.6" opacity="0.25" stroke-dasharray="1.5 1.5"/></svg>',
    desc: "Commands the spirits of fallen foes to fight alongside the party.",
  },

  // --- LEGENDARY ---
  {
    id: "h_moon_king",
    name: "The Moon King",
    rarity: Rarities.LEGENDARY,
    baseDps: 1000,
    baseCost: 250000,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="mk1" cx="32" cy="24" r="30" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="currentColor" stop-opacity="0.2"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="24" r="28" fill="url(#mk1)"/><path d="M18 20 L24 8 L28 16 L32 4 L36 16 L40 8 L46 20Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.15"/><circle cx="32" cy="6" r="2" fill="currentColor" fill-opacity="0.6"/><circle cx="24" cy="10" r="1.5" fill="currentColor" fill-opacity="0.4"/><circle cx="40" cy="10" r="1.5" fill="currentColor" fill-opacity="0.4"/><circle cx="32" cy="26" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/><circle cx="30" cy="25" r="1.2" fill="currentColor"/><circle cx="34" cy="25" r="1.2" fill="currentColor"/><path d="M22 32h20l3 18H19Z" stroke="currentColor" stroke-width="2.5" fill="currentColor" fill-opacity="0.08"/><path d="M32 36 L32 46" stroke="currentColor" stroke-width="1" opacity="0.2"/><line x1="28" y1="50" x2="26" y2="60" stroke="currentColor" stroke-width="3"/><line x1="36" y1="50" x2="38" y2="60" stroke="currentColor" stroke-width="3"/><path d="M44 38 L54 32 L56 36 L48 42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M20 38 L12 34" stroke="currentColor" stroke-width="1.5"/></svg>',
    desc: "The mythical sovereign of Midnight Gardens.",
  },
  {
    id: "h_void_empress",
    name: "Void Empress",
    rarity: Rarities.LEGENDARY,
    baseDps: 1500,
    baseCost: 500000,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="ve1" cx="32" cy="28" r="30" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="currentColor" stop-opacity="0.25"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="28" r="28" fill="url(#ve1)"/><polygon points="32,2 37,18 54,18 40,28 46,44 32,34 18,44 24,28 10,18 27,18" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.06" opacity="0.4"/><circle cx="32" cy="18" r="7" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.12"/><circle cx="30" cy="17" r="1.2" fill="currentColor"/><circle cx="34" cy="17" r="1.2" fill="currentColor"/><path d="M26 12 L22 6" stroke="currentColor" stroke-width="1.2"/><path d="M38 12 L42 6" stroke="currentColor" stroke-width="1.2"/><circle cx="22" cy="6" r="2" fill="currentColor" fill-opacity="0.3"/><circle cx="42" cy="6" r="2" fill="currentColor" fill-opacity="0.3"/><path d="M24 26h16l2 22H22Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.06"/><line x1="28" y1="48" x2="26" y2="60" stroke="currentColor" stroke-width="2.5"/><line x1="36" y1="48" x2="38" y2="60" stroke="currentColor" stroke-width="2.5"/><path d="M22 34 L10 30" stroke="currentColor" stroke-width="1.5"/><path d="M42 34 L54 30" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="28" r="3" stroke="currentColor" stroke-width="0.6" opacity="0.3" stroke-dasharray="2 2"/><circle cx="56" cy="28" r="3" stroke="currentColor" stroke-width="0.6" opacity="0.3" stroke-dasharray="2 2"/></svg>',
    desc: "Ruler of the space between stars. Her gaze shatters worlds.",
  },

  // --- EXPANDED COMMON ---
  {
    id: "h_herbalist",
    name: "Garden Herbalist",
    rarity: Rarities.COMMON,
    baseDps: 4,
    baseCost: 280,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="16" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/><circle cx="30" cy="15" r="1" fill="currentColor"/><circle cx="34" cy="15" r="1" fill="currentColor"/><path d="M26 24h12l1 18H25Z" stroke="currentColor" stroke-width="1.8" fill="currentColor" fill-opacity="0.05"/><line x1="29" y1="42" x2="27" y2="56" stroke="currentColor" stroke-width="2"/><line x1="35" y1="42" x2="37" y2="56" stroke="currentColor" stroke-width="2"/><path d="M38 30 L46 26" stroke="currentColor" stroke-width="1.5"/><path d="M44 22 Q46 18 48 22 Q50 26 46 28 Q42 26 44 22Z" stroke="currentColor" stroke-width="1.2" fill="currentColor" fill-opacity="0.15"/><path d="M46 22 L46 14" stroke="currentColor" stroke-width="1"/><path d="M44 16 L48 14" stroke="currentColor" stroke-width="0.8" opacity="0.5"/><circle cx="14" cy="38" r="3" stroke="currentColor" stroke-width="0.8" fill="currentColor" fill-opacity="0.08"/><path d="M14 35 L14 30" stroke="currentColor" stroke-width="0.8" opacity="0.4"/></svg>',
    desc: "Brews restorative tinctures from the Garden's remaining flora.",
  },

  // --- EXPANDED RARE ---
  {
    id: "h_chrono_mage",
    name: "Chrono Mage",
    rarity: Rarities.RARE,
    baseDps: 25,
    baseCost: 2200,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/><circle cx="30" cy="13" r="1" fill="currentColor"/><circle cx="34" cy="13" r="1" fill="currentColor"/><path d="M26 22h12l1 20H25Z" stroke="currentColor" stroke-width="1.8" fill="currentColor" fill-opacity="0.05"/><line x1="29" y1="42" x2="27" y2="56" stroke="currentColor" stroke-width="2"/><line x1="35" y1="42" x2="37" y2="56" stroke="currentColor" stroke-width="2"/><circle cx="48" cy="28" r="10" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.05"/><path d="M48 20 L48 28 L54 32" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M40 28 L38 28" stroke="currentColor" stroke-width="1" opacity="0.5"/><path d="M48 36 L48 38" stroke="currentColor" stroke-width="1" opacity="0.5"/><path d="M38 26 L44 24" stroke="currentColor" stroke-width="1.2"/><circle cx="12" cy="34" r="4" stroke="currentColor" stroke-width="0.6" opacity="0.25" stroke-dasharray="2 2"/></svg>',
    desc: "Bends time around enemies, accelerating the party's damage.",
  },

  // --- EXPANDED EPIC ---
  {
    id: "h_dragon_knight",
    name: "Dragon Knight",
    rarity: Rarities.EPIC,
    baseDps: 250,
    baseCost: 35000,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="dk1" cx="32" cy="30" r="28" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="currentColor" stop-opacity="0.18"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="30" r="26" fill="url(#dk1)"/><path d="M20 32 Q14 22 20 14 L26 20 L32 12 L38 20 L44 14 Q50 22 44 32Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/><circle cx="28" cy="24" r="2" fill="currentColor" fill-opacity="0.5"/><circle cx="36" cy="24" r="2" fill="currentColor" fill-opacity="0.5"/><path d="M30 30 L32 34 L34 30" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.2"/><ellipse cx="32" cy="44" rx="14" ry="8" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.06"/><circle cx="32" cy="40" r="4" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.08"/><circle cx="31" cy="39" r="0.8" fill="currentColor"/><circle cx="33" cy="39" r="0.8" fill="currentColor"/><path d="M18 36 L8 32" stroke="currentColor" stroke-width="1.5"/><path d="M46 36 L56 32" stroke="currentColor" stroke-width="1.5"/><path d="M8 32 L4 38" stroke="currentColor" stroke-width="1" opacity="0.5"/><path d="M56 32 L60 38" stroke="currentColor" stroke-width="1" opacity="0.5"/><path d="M28 52 L26 60" stroke="currentColor" stroke-width="2"/><path d="M36 52 L38 60" stroke="currentColor" stroke-width="2"/></svg>',
    desc: "Rides a spectral drake into battle with overwhelming power.",
  },

  // ── NEW HEROES (Phase 2.4) ────────────────────────────────────────

  // --- NEW COMMON ---
  {
    id: "h_torchbearer",
    name: "Torchbearer",
    rarity: Rarities.COMMON,
    baseDps: 3,
    baseCost: 200,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="16" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/><circle cx="30" cy="15" r="1" fill="currentColor"/><circle cx="34" cy="15" r="1" fill="currentColor"/><line x1="32" y1="22" x2="32" y2="42" stroke="currentColor" stroke-width="2.5"/><line x1="28" y1="42" x2="24" y2="56" stroke="currentColor" stroke-width="2.5"/><line x1="36" y1="42" x2="40" y2="56" stroke="currentColor" stroke-width="2.5"/><line x1="32" y1="30" x2="22" y2="36" stroke="currentColor" stroke-width="2"/><line x1="32" y1="30" x2="44" y2="24" stroke="currentColor" stroke-width="2"/><path d="M42 14 Q44 8 46 14 Q48 20 44 22 Q40 20 42 14Z" stroke="currentColor" stroke-width="1.2" fill="currentColor" fill-opacity="0.25"/><circle cx="44" cy="12" r="2" fill="currentColor" opacity="0.4"/></svg>',
    desc: "Carries the eternal flame that lights the darkest corners of the garden.",
  },
  {
    id: "h_frost_acolyte",
    name: "Frost Acolyte",
    rarity: Rarities.COMMON,
    baseDps: 3.5,
    baseCost: 240,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="16" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/><circle cx="30" cy="15" r="1" fill="currentColor"/><circle cx="34" cy="15" r="1" fill="currentColor"/><line x1="32" y1="22" x2="32" y2="42" stroke="currentColor" stroke-width="2.5"/><line x1="28" y1="42" x2="24" y2="56" stroke="currentColor" stroke-width="2.5"/><line x1="36" y1="42" x2="40" y2="56" stroke="currentColor" stroke-width="2.5"/><line x1="32" y1="30" x2="20" y2="36" stroke="currentColor" stroke-width="2"/><line x1="32" y1="30" x2="44" y2="36" stroke="currentColor" stroke-width="2"/><path d="M44 36 L50 30 M50 30 L50 38 M50 30 L56 30" stroke="currentColor" stroke-width="1.2" opacity="0.6"/><circle cx="50" cy="30" r="3" stroke="currentColor" stroke-width="0.8" stroke-dasharray="1.5 1.5" opacity="0.4"/></svg>',
    desc: "A young disciple of ice who freezes corruption on contact.",
  },

  // --- NEW RARE ---
  {
    id: "h_wind_dancer",
    name: "Wind Dancer",
    rarity: Rarities.RARE,
    baseDps: 18,
    baseCost: 1400,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="5.5" stroke="currentColor" stroke-width="1.8" fill="currentColor" fill-opacity="0.08"/><circle cx="30" cy="13" r="0.9" fill="currentColor"/><circle cx="34" cy="13" r="0.9" fill="currentColor"/><path d="M27 20h10l1 18H26Z" stroke="currentColor" stroke-width="1.8" fill="currentColor" fill-opacity="0.05"/><line x1="29" y1="38" x2="26" y2="50" stroke="currentColor" stroke-width="2"/><line x1="35" y1="38" x2="38" y2="50" stroke="currentColor" stroke-width="2"/><path d="M26 28 Q16 20 10 28" stroke="currentColor" stroke-width="1.2" opacity="0.5"/><path d="M38 28 Q48 20 54 28" stroke="currentColor" stroke-width="1.2" opacity="0.5"/><path d="M8 32 Q14 26 20 32" stroke="currentColor" stroke-width="0.8" opacity="0.3"/><path d="M44 32 Q50 26 56 32" stroke="currentColor" stroke-width="0.8" opacity="0.3"/></svg>',
    desc: "Moves with the wind, striking enemies before they can react.",
  },
  {
    id: "h_blood_mage",
    name: "Blood Mage",
    rarity: Rarities.RARE,
    baseDps: 22,
    baseCost: 1800,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="5.5" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/><circle cx="30" cy="13" r="1" fill="currentColor"/><circle cx="34" cy="13" r="1" fill="currentColor"/><path d="M27 20h10l1 20H26Z" stroke="currentColor" stroke-width="1.8" fill="currentColor" fill-opacity="0.06"/><line x1="29" y1="40" x2="27" y2="54" stroke="currentColor" stroke-width="2.2"/><line x1="35" y1="40" x2="37" y2="54" stroke="currentColor" stroke-width="2.2"/><path d="M24 28 L14 24" stroke="currentColor" stroke-width="1.5"/><path d="M40 28 L50 24" stroke="currentColor" stroke-width="1.5"/><path d="M12 30 Q14 22 16 30" stroke="currentColor" stroke-width="1.2" fill="currentColor" fill-opacity="0.2"/><path d="M48 30 Q50 22 52 30" stroke="currentColor" stroke-width="1.2" fill="currentColor" fill-opacity="0.2"/></svg>',
    desc: "Sacrifices vitality to unleash devastating arcane attacks.",
  },

  // --- NEW EPIC ---
  {
    id: "h_storm_warden",
    name: "Storm Warden",
    rarity: Rarities.EPIC,
    baseDps: 200,
    baseCost: 25000,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="sw1" cx="32" cy="28" r="26" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="currentColor" stop-opacity="0.15"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="28" r="24" fill="url(#sw1)"/><circle cx="32" cy="16" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/><circle cx="30" cy="15" r="1.2" fill="currentColor"/><circle cx="34" cy="15" r="1.2" fill="currentColor"/><path d="M24 24h16l2 20H22Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.06"/><line x1="28" y1="44" x2="26" y2="58" stroke="currentColor" stroke-width="2.5"/><line x1="36" y1="44" x2="38" y2="58" stroke="currentColor" stroke-width="2.5"/><path d="M40 30 L50 24 L46 34 L56 28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M24 30 L14 26" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="24" r="4" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.08"/></svg>',
    desc: "Commands lightning to smite enemies from the heavens.",
  },
  {
    id: "h_frost_queen",
    name: "Frost Queen",
    rarity: Rarities.EPIC,
    baseDps: 190,
    baseCost: 24000,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="fq1" cx="32" cy="26" r="26" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="currentColor" stop-opacity="0.15"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="26" r="24" fill="url(#fq1)"/><path d="M26 10 L28 4 L30 10 L32 2 L34 10 L36 4 L38 10" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.08"/><circle cx="32" cy="18" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/><circle cx="30" cy="17" r="1" fill="currentColor"/><circle cx="34" cy="17" r="1" fill="currentColor"/><path d="M24 26h16l2 20H22Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.06"/><line x1="28" y1="46" x2="26" y2="58" stroke="currentColor" stroke-width="2.5"/><line x1="36" y1="46" x2="38" y2="58" stroke="currentColor" stroke-width="2.5"/><path d="M22 34 L10 30" stroke="currentColor" stroke-width="1.5"/><path d="M42 34 L54 30" stroke="currentColor" stroke-width="1.5"/><path d="M8 28 L10 30 L8 32" stroke="currentColor" stroke-width="1" opacity="0.5"/><path d="M56 28 L54 30 L56 32" stroke="currentColor" stroke-width="1" opacity="0.5"/></svg>',
    desc: "Encases enemies in glacial prisons, shattering them from within.",
  },

  // --- NEW LEGENDARY ---
  {
    id: "h_celestial_arbiter",
    name: "Celestial Arbiter",
    rarity: Rarities.LEGENDARY,
    baseDps: 1200,
    baseCost: 350000,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="ca1" cx="32" cy="24" r="30" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="currentColor" stop-opacity="0.22"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="24" r="28" fill="url(#ca1)"/><circle cx="32" cy="20" r="7" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.12"/><circle cx="30" cy="19" r="1.2" fill="currentColor"/><circle cx="34" cy="19" r="1.2" fill="currentColor"/><path d="M22 28h20l3 20H19Z" stroke="currentColor" stroke-width="2.5" fill="currentColor" fill-opacity="0.08"/><line x1="28" y1="48" x2="26" y2="60" stroke="currentColor" stroke-width="3"/><line x1="36" y1="48" x2="38" y2="60" stroke="currentColor" stroke-width="3"/><path d="M18 34 L8 28" stroke="currentColor" stroke-width="2"/><path d="M46 34 L56 28" stroke="currentColor" stroke-width="2"/><path d="M8 28 L4 20 L12 24" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.1"/><path d="M56 28 L60 20 L52 24" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.1"/><circle cx="32" cy="8" r="4" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.3"/><path d="M28 6 L24 2" stroke="currentColor" stroke-width="1"/><path d="M36 6 L40 2" stroke="currentColor" stroke-width="1"/></svg>',
    desc: "Judge of all realms who balances light and shadow with absolute authority.",
  },
  {
    id: "h_eclipse_saint",
    name: "Eclipse Saint",
    rarity: Rarities.LEGENDARY,
    baseDps: 1800,
    baseCost: 750000,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="es1" cx="32" cy="26" r="30" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="currentColor" stop-opacity="0.25"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="26" r="28" fill="url(#es1)"/><circle cx="32" cy="32" r="20" stroke="currentColor" stroke-width="1" opacity="0.15" stroke-dasharray="3 3"/><circle cx="32" cy="18" r="7" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.12"/><circle cx="30" cy="17" r="1.2" fill="currentColor"/><circle cx="34" cy="17" r="1.2" fill="currentColor"/><path d="M22 26h20l3 22H19Z" stroke="currentColor" stroke-width="2.5" fill="currentColor" fill-opacity="0.08"/><line x1="28" y1="48" x2="26" y2="60" stroke="currentColor" stroke-width="3"/><line x1="36" y1="48" x2="38" y2="60" stroke="currentColor" stroke-width="3"/><path d="M20 34 L8 30" stroke="currentColor" stroke-width="2"/><path d="M44 34 L56 30" stroke="currentColor" stroke-width="2"/><path d="M32 4 L30 10 M32 4 L34 10 M32 4 L32 10" stroke="currentColor" stroke-width="1.5" opacity="0.6"/><circle cx="8" cy="30" r="4" stroke="currentColor" stroke-width="0.8" opacity="0.3" fill="currentColor" fill-opacity="0.06"/><circle cx="56" cy="30" r="4" stroke="currentColor" stroke-width="0.8" opacity="0.3" fill="currentColor" fill-opacity="0.06"/></svg>',
    desc: "Born in the moment between light and dark. The most powerful being in the Garden.",
  },

  // --- NEW COMMON ---
  {
    id: "h_void_scout",
    name: "Void Scout",
    rarity: Rarities.COMMON,
    baseDps: 2,
    baseCost: 120,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="16" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/><circle cx="30" cy="15" r="1" fill="currentColor"/><circle cx="34" cy="15" r="1" fill="currentColor"/><line x1="32" y1="22" x2="32" y2="42" stroke="currentColor" stroke-width="2.5"/><line x1="28" y1="42" x2="24" y2="56" stroke="currentColor" stroke-width="2.5"/><line x1="36" y1="42" x2="40" y2="56" stroke="currentColor" stroke-width="2.5"/><line x1="32" y1="30" x2="22" y2="36" stroke="currentColor" stroke-width="2"/><line x1="32" y1="30" x2="42" y2="36" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="36" r="5" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.4"/><circle cx="14" cy="40" r="3" stroke="currentColor" stroke-width="0.6" stroke-dasharray="1.5 1.5" opacity="0.3"/></svg>',
    desc: "Scouts the edges of the Void, mapping the unknowable.",
  },

  // --- NEW RARE ---
  {
    id: "h_shadow_priest",
    name: "Shadow Priest",
    rarity: Rarities.RARE,
    baseDps: 20,
    baseCost: 1600,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="5.5" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/><circle cx="30" cy="13" r="1" fill="currentColor"/><circle cx="34" cy="13" r="1" fill="currentColor"/><path d="M26 20h12l1 22H25Z" stroke="currentColor" stroke-width="1.8" fill="currentColor" fill-opacity="0.06"/><line x1="29" y1="42" x2="27" y2="56" stroke="currentColor" stroke-width="2"/><line x1="35" y1="42" x2="37" y2="56" stroke="currentColor" stroke-width="2"/><path d="M24 28 L14 24" stroke="currentColor" stroke-width="1.5"/><path d="M40 28 L50 24" stroke="currentColor" stroke-width="1.5"/><path d="M14 20 L14 28" stroke="currentColor" stroke-width="1.5"/><path d="M10 24 L18 24" stroke="currentColor" stroke-width="1.5"/><circle cx="50" cy="22" r="3" stroke="currentColor" stroke-width="0.8" opacity="0.4" stroke-dasharray="2 1"/></svg>',
    desc: "Channels shadow energy to heal allies and curse enemies.",
  },

  // --- NEW EPIC ---
  {
    id: "h_phoenix_knight",
    name: "Phoenix Knight",
    rarity: Rarities.EPIC,
    baseDps: 230,
    baseCost: 30000,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="pk1" cx="32" cy="28" r="26" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="currentColor" stop-opacity="0.18"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="28" r="24" fill="url(#pk1)"/><circle cx="32" cy="16" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/><circle cx="30" cy="15" r="1.2" fill="currentColor"/><circle cx="34" cy="15" r="1.2" fill="currentColor"/><path d="M24 24h16l2 20H22Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.06"/><line x1="28" y1="44" x2="26" y2="58" stroke="currentColor" stroke-width="2.5"/><line x1="36" y1="44" x2="38" y2="58" stroke="currentColor" stroke-width="2.5"/><path d="M20 30 L10 22 Q8 32 14 36" stroke="currentColor" stroke-width="1.8" fill="currentColor" fill-opacity="0.1"/><path d="M44 30 L54 22 Q56 32 50 36" stroke="currentColor" stroke-width="1.8" fill="currentColor" fill-opacity="0.1"/><path d="M28 8 Q32 2 36 8" stroke="currentColor" stroke-width="1.2" fill="currentColor" fill-opacity="0.15"/></svg>',
    desc: "Rises from ashes with each fall, growing stronger every time.",
  },

  // ── NEW HEROES (Phase 3) ──────────────────────────────────────────

  // --- COMMON ---
  {
    id: "h_mushroom_guard",
    name: "Mushroom Guard",
    rarity: Rarities.COMMON,
    baseDps: 4.5,
    baseCost: 300,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 28 Q32 4 44 28Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.12"/><circle cx="26" cy="18" r="2" fill="currentColor" fill-opacity="0.3"/><circle cx="38" cy="20" r="1.5" fill="currentColor" fill-opacity="0.2"/><circle cx="32" cy="12" r="1.8" fill="currentColor" fill-opacity="0.25"/><rect x="28" y="28" width="8" height="14" rx="2" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.06"/><circle cx="31" cy="32" r="1" fill="currentColor"/><circle cx="35" cy="32" r="1" fill="currentColor"/><line x1="30" y1="42" x2="28" y2="54" stroke="currentColor" stroke-width="2"/><line x1="34" y1="42" x2="36" y2="54" stroke="currentColor" stroke-width="2"/><path d="M24 34 L18 38" stroke="currentColor" stroke-width="1.5"/><path d="M40 34 L46 30" stroke="currentColor" stroke-width="1.5"/><path d="M44 28 L48 26" stroke="currentColor" stroke-width="1" opacity="0.4"/></svg>',
    desc: "A sentient fungal warrior from the deep garden groves.",
  },
  {
    id: "h_lantern_bearer",
    name: "Lantern Bearer",
    rarity: Rarities.COMMON,
    baseDps: 3.8,
    baseCost: 260,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="16" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/><circle cx="30" cy="15" r="1" fill="currentColor"/><circle cx="34" cy="15" r="1" fill="currentColor"/><line x1="32" y1="22" x2="32" y2="42" stroke="currentColor" stroke-width="2.5"/><line x1="28" y1="42" x2="24" y2="56" stroke="currentColor" stroke-width="2.5"/><line x1="36" y1="42" x2="40" y2="56" stroke="currentColor" stroke-width="2.5"/><line x1="32" y1="28" x2="20" y2="34" stroke="currentColor" stroke-width="2"/><line x1="32" y1="30" x2="46" y2="26" stroke="currentColor" stroke-width="2"/><rect x="42" y="20" width="8" height="12" rx="2" stroke="currentColor" stroke-width="1.2" fill="currentColor" fill-opacity="0.1"/><circle cx="46" cy="26" r="2" fill="currentColor" fill-opacity="0.4"/><path d="M44 20 L46 16 L48 20" stroke="currentColor" stroke-width="1"/></svg>',
    desc: "Guides lost souls through the darkest paths with an enchanted lantern.",
  },

  // --- RARE ---
  {
    id: "h_rune_smith",
    name: "Rune Smith",
    rarity: Rarities.RARE,
    baseDps: 24,
    baseCost: 2000,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/><circle cx="30" cy="13" r="1" fill="currentColor"/><circle cx="34" cy="13" r="1" fill="currentColor"/><path d="M26 22h12l1 20H25Z" stroke="currentColor" stroke-width="1.8" fill="currentColor" fill-opacity="0.06"/><line x1="29" y1="42" x2="27" y2="56" stroke="currentColor" stroke-width="2"/><line x1="35" y1="42" x2="37" y2="56" stroke="currentColor" stroke-width="2"/><path d="M24 28 L14 26" stroke="currentColor" stroke-width="1.5"/><rect x="6" y="22" width="10" height="8" rx="1" stroke="currentColor" stroke-width="1.2" fill="currentColor" fill-opacity="0.08"/><path d="M9 24 L9 28 M11 24 L13 28 M13 24 L11 28" stroke="currentColor" stroke-width="0.8" opacity="0.6"/><path d="M40 28 L50 26" stroke="currentColor" stroke-width="1.5"/></svg>',
    desc: "Inscribes ancient runes onto weapons to enhance their power.",
  },
  {
    id: "h_tide_caller",
    name: "Tide Caller",
    rarity: Rarities.RARE,
    baseDps: 20,
    baseCost: 1700,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="5.5" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/><circle cx="30" cy="13" r="1" fill="currentColor"/><circle cx="34" cy="13" r="1" fill="currentColor"/><path d="M27 20h10l1 22H26Z" stroke="currentColor" stroke-width="1.8" fill="currentColor" fill-opacity="0.06"/><line x1="29" y1="42" x2="27" y2="56" stroke="currentColor" stroke-width="2"/><line x1="35" y1="42" x2="37" y2="56" stroke="currentColor" stroke-width="2"/><path d="M8 44 Q14 38 20 44 Q26 50 32 44 Q38 38 44 44 Q50 50 56 44" stroke="currentColor" stroke-width="1.5" opacity="0.4"/><path d="M8 48 Q14 42 20 48 Q26 54 32 48 Q38 42 44 48 Q50 54 56 48" stroke="currentColor" stroke-width="1" opacity="0.25"/></svg>',
    desc: "Commands the tides of cosmic energy to drown enemies.",
  },
  {
    id: "h_plague_doctor",
    name: "Plague Doctor",
    rarity: Rarities.RARE,
    baseDps: 23,
    baseCost: 1900,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 8 Q32 4 36 8 L36 16 Q34 20 30 20 L28 16Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/><path d="M36 12 L44 10" stroke="currentColor" stroke-width="1.5"/><circle cx="31" cy="12" r="1.2" fill="currentColor"/><path d="M26 20h12l1 22H25Z" stroke="currentColor" stroke-width="1.8" fill="currentColor" fill-opacity="0.06"/><line x1="29" y1="42" x2="27" y2="56" stroke="currentColor" stroke-width="2"/><line x1="35" y1="42" x2="37" y2="56" stroke="currentColor" stroke-width="2"/><path d="M24 28 L16 26" stroke="currentColor" stroke-width="1.5"/><path d="M40 28 L48 26" stroke="currentColor" stroke-width="1.5"/><circle cx="14" cy="34" r="2" stroke="currentColor" stroke-width="0.8" opacity="0.3" stroke-dasharray="1.5 1.5"/><circle cx="50" cy="32" r="2.5" stroke="currentColor" stroke-width="0.8" opacity="0.3" stroke-dasharray="1.5 1.5"/></svg>',
    desc: "Spreads toxic miasma that weakens all enemies in range.",
  },

  // --- EPIC ---
  {
    id: "h_void_weaver",
    name: "Void Weaver",
    rarity: Rarities.EPIC,
    baseDps: 210,
    baseCost: 26000,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="vw1" cx="32" cy="28" r="26" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="currentColor" stop-opacity="0.15"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="28" r="24" fill="url(#vw1)"/><circle cx="32" cy="16" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.1"/><circle cx="30" cy="15" r="1.2" fill="currentColor"/><circle cx="34" cy="15" r="1.2" fill="currentColor"/><path d="M24 24h16l2 20H22Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.06"/><line x1="28" y1="44" x2="26" y2="58" stroke="currentColor" stroke-width="2.5"/><line x1="36" y1="44" x2="38" y2="58" stroke="currentColor" stroke-width="2.5"/><circle cx="32" cy="32" r="12" stroke="currentColor" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.3"/><circle cx="32" cy="32" r="6" stroke="currentColor" stroke-width="0.6" stroke-dasharray="2 2" opacity="0.2"/><path d="M22 30 L12 26" stroke="currentColor" stroke-width="1.5"/><path d="M42 30 L52 26" stroke="currentColor" stroke-width="1.5"/></svg>',
    desc: "Weaves threads of void energy into devastating patterns.",
  },
  {
    id: "h_crystal_sentinel",
    name: "Crystal Sentinel",
    rarity: Rarities.EPIC,
    baseDps: 240,
    baseCost: 32000,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="cs1" cx="32" cy="28" r="26" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="currentColor" stop-opacity="0.18"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="28" r="24" fill="url(#cs1)"/><path d="M26 6 L32 2 L38 6 L38 16 L32 20 L26 16Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.12"/><circle cx="31" cy="11" r="1" fill="currentColor"/><circle cx="34" cy="11" r="1" fill="currentColor"/><path d="M22 22h20l3 22H19Z" stroke="currentColor" stroke-width="2.5" fill="currentColor" fill-opacity="0.08"/><line x1="28" y1="44" x2="26" y2="58" stroke="currentColor" stroke-width="2.5"/><line x1="36" y1="44" x2="38" y2="58" stroke="currentColor" stroke-width="2.5"/><path d="M18 30 L8 26" stroke="currentColor" stroke-width="2"/><path d="M46 30 L56 26" stroke="currentColor" stroke-width="2"/><path d="M6 24 L10 20 L12 26" stroke="currentColor" stroke-width="1.2" fill="currentColor" fill-opacity="0.1"/><path d="M58 24 L54 20 L52 26" stroke="currentColor" stroke-width="1.2" fill="currentColor" fill-opacity="0.1"/></svg>',
    desc: "A guardian made of living crystal, nearly indestructible.",
  },

  // --- LEGENDARY ---
  {
    id: "h_astral_dragon",
    name: "Astral Dragon",
    rarity: Rarities.LEGENDARY,
    baseDps: 2200,
    baseCost: 900000,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="ad1" cx="32" cy="24" r="30" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="currentColor" stop-opacity="0.25"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="24" r="28" fill="url(#ad1)"/><path d="M18 24 Q14 14 22 10 L28 18 L32 8 L36 18 L42 10 Q50 14 46 24Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.15"/><circle cx="28" cy="20" r="2.5" fill="currentColor" fill-opacity="0.5"/><circle cx="36" cy="20" r="2.5" fill="currentColor" fill-opacity="0.5"/><path d="M30 26 L32 30 L34 26" stroke="currentColor" stroke-width="1.5" fill="currentColor" fill-opacity="0.2"/><ellipse cx="32" cy="42" rx="16" ry="10" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.06"/><path d="M16 36 L4 28 Q2 38 10 42" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/><path d="M48 36 L60 28 Q62 38 54 42" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.08"/><path d="M26 52 L24 60" stroke="currentColor" stroke-width="2.5"/><path d="M38 52 L40 60" stroke="currentColor" stroke-width="2.5"/><path d="M32 32 L32 38" stroke="currentColor" stroke-width="1" opacity="0.3"/></svg>',
    desc: "An ancient dragon from the astral plane. Its breath dissolves reality.",
  },
  {
    id: "h_garden_oracle",
    name: "Garden Oracle",
    rarity: Rarities.LEGENDARY,
    baseDps: 1600,
    baseCost: 600000,
    svg: '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="go1" cx="32" cy="24" r="30" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="currentColor" stop-opacity="0.22"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="32" cy="24" r="28" fill="url(#go1)"/><circle cx="32" cy="18" r="7" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.12"/><circle cx="30" cy="17" r="1.2" fill="currentColor"/><circle cx="34" cy="17" r="1.2" fill="currentColor"/><path d="M32 8 L32 4" stroke="currentColor" stroke-width="1.5"/><circle cx="32" cy="3" r="2" fill="currentColor" fill-opacity="0.4"/><path d="M22 26h20l3 22H19Z" stroke="currentColor" stroke-width="2.5" fill="currentColor" fill-opacity="0.08"/><line x1="28" y1="48" x2="26" y2="60" stroke="currentColor" stroke-width="3"/><line x1="36" y1="48" x2="38" y2="60" stroke="currentColor" stroke-width="3"/><path d="M20 34 L8 28" stroke="currentColor" stroke-width="2"/><path d="M44 34 L56 28" stroke="currentColor" stroke-width="2"/><circle cx="8" cy="28" r="5" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.08"/><circle cx="56" cy="28" r="5" stroke="currentColor" stroke-width="1" fill="currentColor" fill-opacity="0.08"/><path d="M6 26 L10 30 M56 26 L52 30" stroke="currentColor" stroke-width="0.8" opacity="0.5"/></svg>',
    desc: "The first being to awaken in the Garden. Sees all timelines at once.",
  },
];

export function getHeroLevelCost(heroId, level) {
  const hero = HeroTemplate.find((h) => h.id === heroId);
  return Math.floor(hero.baseCost * Math.pow(1.3, level - 1));
}

// ── Hero Element assignments ────────────────────────────────────────
const HERO_ELEMENTS = {
  h_peasant: 'light',     h_militia: 'fire',
  h_scout: 'shadow',      h_herbalist: 'light',
  h_ranger: 'shadow',     h_elementalist: 'fire',
  h_cleric: 'light',      h_chrono_mage: 'void',
  h_paladin: 'light',     h_assassin: 'shadow',
  h_necromancer: 'void',  h_dragon_knight: 'fire',
  h_moon_king: 'light',   h_void_empress: 'void',
  // New heroes (Phase 2)
  h_torchbearer: 'fire',  h_frost_acolyte: 'ice',
  h_void_scout: 'void',   h_wind_dancer: 'ice',
  h_blood_mage: 'shadow', h_shadow_priest: 'shadow',
  h_storm_warden: 'fire', h_frost_queen: 'ice',
  h_phoenix_knight: 'fire', h_celestial_arbiter: 'light',
  h_eclipse_saint: 'shadow',
  // New heroes (Phase 3)
  h_mushroom_guard: 'light', h_lantern_bearer: 'fire',
  h_rune_smith: 'fire',     h_tide_caller: 'ice',
  h_plague_doctor: 'void',  h_void_weaver: 'void',
  h_crystal_sentinel: 'light', h_astral_dragon: 'fire',
  h_garden_oracle: 'light',
};

export function getHeroElement(heroId) {
  return HERO_ELEMENTS[heroId] || null;
}

export function getHeroStats(heroInstance) {
  const template = HeroTemplate.find((h) => h.id === heroInstance.id);

  let baseDps = template.baseDps * Math.pow(1.2, heroInstance.level - 1);
  let dpsMult = 1;
  let critChance = 0;

  if (heroInstance.equip) {
    const slots = ['weapon', 'armor', 'acc'];
    if (heroInstance.equip.weapon) {
      const wStats = getItemStats(heroInstance.equip.weapon);
      baseDps += wStats.computedValue;
    }
    if (heroInstance.equip.armor) {
      const aStats = getItemStats(heroInstance.equip.armor);
      dpsMult += aStats.computedValue;
    }
    if (heroInstance.equip.acc) {
      const accStats = getItemStats(heroInstance.equip.acc);
      critChance += accStats.computedValue;
    }
    // Apply prefix bonuses from all equipped items
    for (const slot of slots) {
      const item = heroInstance.equip[slot];
      if (item) {
        const st = getItemStats(item);
        if (st.prefix && st.prefix.bonus) {
          if (st.prefix.bonus.type === 'dps') dpsMult += st.prefix.bonus.value;
          if (st.prefix.bonus.type === 'crit') critChance += st.prefix.bonus.value / 100;
        }
      }
    }
  }

  // Ascension bonus: +10% DPS, +10% coins, +5% crit por ascensión
  const ascension = heroInstance.ascensionLevel || 0;
  dpsMult *= 1 + 0.10 * ascension;
  critChance += 0.05 * ascension;

  return {
    dps: baseDps * dpsMult,
    critChance: critChance,
    element: HERO_ELEMENTS[heroInstance.id] || null,
    ascensionLevel: ascension,
  };
}

export function getHeroDps(heroId, level) {
  const hero = HeroTemplate.find((h) => h.id === heroId);
  return hero.baseDps * Math.pow(1.2, level - 1);
}
