export const AchievementDatabase = [
  // --- Combat Achievements ---
  {
    id: "ach_first_blood",
    name: "First Blood",
    desc: "Defeat your first enemy.",
    icon: "⚔️",
    category: "combat",
    reward: { coins: 500 },
    condition: (stats) => stats.enemiesDefeated >= 1,
  },
  {
    id: "ach_slayer_100",
    name: "Exterminator",
    desc: "Defeat 100 enemies.",
    icon: "💀",
    category: "combat",
    reward: { coins: 1000 },
    condition: (stats) => stats.enemiesDefeated >= 100,
  },
  {
    id: "ach_slayer_1000",
    name: "Annihilator",
    desc: "Defeat 1,000 enemies.",
    icon: "☠️",
    category: "combat",
    reward: { coins: 5000, stardust: 10 },
    condition: (stats) => stats.enemiesDefeated >= 1000,
  },
  {
    id: "ach_slayer_10000",
    name: "Apocalyptic",
    desc: "Defeat 10,000 enemies.",
    icon: "🔥",
    category: "combat",
    reward: { coins: 25000, gems: 5 },
    condition: (stats) => stats.enemiesDefeated >= 10000,
  },
  {
    id: "ach_slayer_50000",
    name: "Extinction Event",
    desc: "Defeat 50,000 enemies.",
    icon: "🌑",
    category: "combat",
    reward: { coins: 100000, gems: 15, stardust: 50 },
    condition: (stats) => stats.enemiesDefeated >= 50000,
  },
  {
    id: "ach_boss_hunter",
    name: "Boss Hunter",
    desc: "Defeat 10 bosses.",
    icon: "👑",
    category: "combat",
    reward: { coins: 2000, stardust: 5 },
    condition: (stats) => stats.bossesDefeated >= 10,
  },
  {
    id: "ach_boss_slayer",
    name: "Boss Slayer",
    desc: "Defeat 50 bosses.",
    icon: "🐉",
    category: "combat",
    reward: { coins: 5000, stardust: 15 },
    condition: (stats) => stats.bossesDefeated >= 50,
  },
  {
    id: "ach_boss_master",
    name: "Boss Vanquisher",
    desc: "Defeat 200 bosses.",
    icon: "🏴",
    category: "combat",
    reward: { coins: 25000, gems: 5 },
    condition: (stats) => stats.bossesDefeated >= 200,
  },
  {
    id: "ach_click_100",
    name: "Clicker Novice",
    desc: "Click 100 times.",
    icon: "👆",
    category: "combat",
    reward: { coins: 500 },
    condition: (stats) => stats.totalClicks >= 100,
  },
  {
    id: "ach_click_1000",
    name: "Rapid Tapper",
    desc: "Click 1,000 times.",
    icon: "👇",
    category: "combat",
    reward: { coins: 2500 },
    condition: (stats) => stats.totalClicks >= 1000,
  },
  {
    id: "ach_click_10000",
    name: "Carpal Tunnel",
    desc: "Click 10,000 times.",
    icon: "🖱️",
    category: "combat",
    reward: { coins: 10000 },
    condition: (stats) => stats.totalClicks >= 10000,
  },
  {
    id: "ach_click_50000",
    name: "Legendary Fingers",
    desc: "Click 50,000 times.",
    icon: "✋",
    category: "combat",
    reward: { coins: 50000 },
    condition: (stats) => stats.totalClicks >= 50000,
  },
  {
    id: "ach_crit_50",
    name: "Lucky Strike",
    desc: "Land 50 critical hits.",
    icon: "💥",
    category: "combat",
    reward: { coins: 1000, stardust: 5 },
    condition: (stats) => stats.criticalHits >= 50,
  },
  {
    id: "ach_crit_500",
    name: "Critical Mass",
    desc: "Land 500 critical hits.",
    icon: "⚡",
    category: "combat",
    reward: { coins: 5000, stardust: 15 },
    condition: (stats) => stats.criticalHits >= 500,
  },
  {
    id: "ach_crit_5000",
    name: "Precision Master",
    desc: "Land 5,000 critical hits.",
    icon: "🎯",
    category: "combat",
    reward: { coins: 25000, stardust: 30 },
    condition: (stats) => stats.criticalHits >= 5000,
  },
  {
    id: "ach_dmg_million",
    name: "Million Damage Club",
    desc: "Deal 1,000,000 total damage.",
    icon: "💣",
    category: "combat",
    reward: { coins: 5000, gems: 2 },
    condition: (stats) => stats.totalDamageDealt >= 1000000,
  },
  {
    id: "ach_dmg_billion",
    name: "Billion Damage Club",
    desc: "Deal 1,000,000,000 total damage.",
    icon: "🌋",
    category: "combat",
    reward: { coins: 25000, gems: 10 },
    condition: (stats) => stats.totalDamageDealt >= 1000000000,
  },
  {
    id: "ach_dmg_trillion",
    name: "Trillion Damage Club",
    desc: "Deal 1,000,000,000,000 total damage.",
    icon: "☄️",
    category: "combat",
    reward: { coins: 100000, gems: 25 },
    condition: (stats) => stats.totalDamageDealt >= 1000000000000,
  },

  // --- Progression Achievements ---
  {
    id: "ach_stage_10",
    name: "Getting Started",
    desc: "Reach Stage 10.",
    icon: "🌱",
    category: "progression",
    reward: { coins: 1000 },
    condition: (stats) => stats.highestStage >= 10,
  },
  {
    id: "ach_stage_25",
    name: "On the Road",
    desc: "Reach Stage 25.",
    icon: "🚶",
    category: "progression",
    reward: { coins: 2500, stardust: 5 },
    condition: (stats) => stats.highestStage >= 25,
  },
  {
    id: "ach_stage_50",
    name: "Adventurer",
    desc: "Reach Stage 50.",
    icon: "🗺️",
    category: "progression",
    reward: { coins: 5000, stardust: 10 },
    condition: (stats) => stats.highestStage >= 50,
  },
  {
    id: "ach_stage_100",
    name: "Veteran",
    desc: "Reach Stage 100.",
    icon: "🏅",
    category: "progression",
    reward: { coins: 10000, stardust: 15, gems: 2 },
    condition: (stats) => stats.highestStage >= 100,
  },
  {
    id: "ach_stage_250",
    name: "Legend",
    desc: "Reach Stage 250.",
    icon: "🏆",
    category: "progression",
    reward: { coins: 25000, stardust: 25, gems: 5 },
    condition: (stats) => stats.highestStage >= 250,
  },
  {
    id: "ach_stage_500",
    name: "Mythical",
    desc: "Reach Stage 500.",
    icon: "⭐",
    category: "progression",
    reward: { coins: 50000, stardust: 35, gems: 10 },
    condition: (stats) => stats.highestStage >= 500,
  },
  {
    id: "ach_stage_1000",
    name: "Transcendent",
    desc: "Reach Stage 1,000.",
    icon: "🌌",
    category: "progression",
    reward: { coins: 100000, stardust: 50, gems: 15 },
    condition: (stats) => stats.highestStage >= 1000,
  },
  {
    id: "ach_tower_3",
    name: "Tower Climber",
    desc: "Clear Eclipse Tower Floor 3.",
    icon: "🏰",
    category: "progression",
    reward: { stardust: 10, gems: 1 },
    condition: (stats) => stats.highestTowerFloor > 3,
  },
  {
    id: "ach_tower_6",
    name: "Tower Warrior",
    desc: "Clear Eclipse Tower Floor 6.",
    icon: "🗡️",
    category: "progression",
    reward: { stardust: 25, gems: 3 },
    condition: (stats) => stats.highestTowerFloor > 6,
  },
  {
    id: "ach_tower_8",
    name: "Tower Master",
    desc: "Clear Eclipse Tower Floor 8.",
    icon: "🗼",
    category: "progression",
    reward: { stardust: 40, gems: 5 },
    condition: (stats) => stats.highestTowerFloor > 8,
  },
  {
    id: "ach_tower_12",
    name: "Ascended",
    desc: "Clear all Eclipse Tower Floors.",
    icon: "🌠",
    category: "progression",
    reward: { stardust: 75, gems: 10 },
    condition: (stats) => stats.highestTowerFloor > 12,
  },

  // --- Economy Achievements ---
  {
    id: "ach_coins_10k",
    name: "Prospector",
    desc: "Earn 10,000 coins total.",
    icon: "🪙",
    category: "economy",
    reward: { stardust: 5 },
    condition: (stats) => stats.totalCoinsEarned >= 10000,
  },
  {
    id: "ach_coins_100k",
    name: "Merchant",
    desc: "Earn 100,000 coins total.",
    icon: "💵",
    category: "economy",
    reward: { stardust: 15 },
    condition: (stats) => stats.totalCoinsEarned >= 100000,
  },
  {
    id: "ach_coins_1m",
    name: "Tycoon",
    desc: "Earn 1,000,000 coins total.",
    icon: "💰",
    category: "economy",
    reward: { stardust: 30 },
    condition: (stats) => stats.totalCoinsEarned >= 1000000,
  },
  {
    id: "ach_coins_100m",
    name: "Billionaire",
    desc: "Earn 100,000,000 coins total.",
    icon: "🏦",
    category: "economy",
    reward: { stardust: 50, gems: 5 },
    condition: (stats) => stats.totalCoinsEarned >= 100000000,
  },
  {
    id: "ach_stardust_100",
    name: "Stargazer",
    desc: "Earn 100 Stardust total.",
    icon: "✨",
    category: "economy",
    reward: { gems: 2 },
    condition: (stats) => stats.totalStardustEarned >= 100,
  },
  {
    id: "ach_stardust_1k",
    name: "Star Farmer",
    desc: "Earn 1,000 Stardust total.",
    icon: "🌠",
    category: "economy",
    reward: { gems: 5 },
    condition: (stats) => stats.totalStardustEarned >= 1000,
  },
  {
    id: "ach_stardust_10k",
    name: "Celestial Collector",
    desc: "Earn 10,000 Stardust total.",
    icon: "🌟",
    category: "economy",
    reward: { gems: 15 },
    condition: (stats) => stats.totalStardustEarned >= 10000,
  },
  {
    id: "ach_gems_10",
    name: "Gem Finder",
    desc: "Earn 10 Gems total.",
    icon: "💎",
    category: "economy",
    reward: { essence: 2 },
    condition: (stats) => (stats.totalGemsEarned || 0) >= 10,
  },
  {
    id: "ach_gems_100",
    name: "Jeweler",
    desc: "Earn 100 Gems total.",
    icon: "💠",
    category: "economy",
    reward: { essence: 5 },
    condition: (stats) => (stats.totalGemsEarned || 0) >= 100,
  },
  {
    id: "ach_gems_1000",
    name: "Diamond Mogul",
    desc: "Earn 1,000 Gems total.",
    icon: "👑",
    category: "economy",
    reward: { essence: 15 },
    condition: (stats) => (stats.totalGemsEarned || 0) >= 1000,
  },
  {
    id: "ach_essence_10",
    name: "Void Touched",
    desc: "Earn 10 Essence total.",
    icon: "🌀",
    category: "economy",
    reward: { coins: 50000, stardust: 25 },
    condition: (stats) => (stats.totalEssenceEarned || 0) >= 10,
  },
  {
    id: "ach_essence_100",
    name: "Void Walker",
    desc: "Earn 100 Essence total.",
    icon: "🔮",
    category: "economy",
    reward: { coins: 100000, stardust: 50, gems: 10 },
    condition: (stats) => (stats.totalEssenceEarned || 0) >= 100,
  },

  // --- Collection Achievements ---
  {
    id: "ach_hero_1",
    name: "First Recruit",
    desc: "Recruit your first hero.",
    icon: "🙋",
    category: "collection",
    reward: { coins: 500, stardust: 3 },
    condition: (stats) => stats.heroesRecruited >= 1,
  },
  {
    id: "ach_hero_5",
    name: "Band of Five",
    desc: "Recruit 5 heroes.",
    icon: "🤝",
    category: "collection",
    reward: { coins: 1000, stardust: 5 },
    condition: (stats) => stats.heroesRecruited >= 5,
  },
  {
    id: "ach_hero_15",
    name: "Army Builder",
    desc: "Recruit 15 heroes.",
    icon: "🛡️",
    category: "collection",
    reward: { coins: 2500, stardust: 10 },
    condition: (stats) => stats.heroesRecruited >= 15,
  },
  {
    id: "ach_hero_30",
    name: "War Council",
    desc: "Recruit 30 heroes.",
    icon: "⚔️",
    category: "collection",
    reward: { coins: 5000, stardust: 20 },
    condition: (stats) => stats.heroesRecruited >= 30,
  },
  {
    id: "ach_hero_50",
    name: "Legendary Commander",
    desc: "Recruit 50 heroes.",
    icon: "🏳️",
    category: "collection",
    reward: { coins: 10000, stardust: 30 },
    condition: (stats) => stats.heroesRecruited >= 50,
  },
  {
    id: "ach_hero_100",
    name: "Hero Hoarder",
    desc: "Recruit 100 heroes.",
    icon: "🌟",
    category: "collection",
    reward: { coins: 25000, stardust: 50 },
    condition: (stats) => stats.heroesRecruited >= 100,
  },
  {
    id: "ach_items_5",
    name: "Loot Rookie",
    desc: "Find 5 items.",
    icon: "🎁",
    category: "collection",
    reward: { coins: 500, stardust: 3 },
    condition: (stats) => stats.itemsFound >= 5,
  },
  {
    id: "ach_items_10",
    name: "Treasure Hunter",
    desc: "Find 10 items.",
    icon: "🎒",
    category: "collection",
    reward: { coins: 1000, stardust: 5 },
    condition: (stats) => stats.itemsFound >= 10,
  },
  {
    id: "ach_items_25",
    name: "Collector",
    desc: "Find 25 items.",
    icon: "🏺",
    category: "collection",
    reward: { coins: 2500, stardust: 10 },
    condition: (stats) => stats.itemsFound >= 25,
  },
  {
    id: "ach_items_50",
    name: "Hoarder",
    desc: "Find 50 items.",
    icon: "📦",
    category: "collection",
    reward: { coins: 5000, stardust: 20 },
    condition: (stats) => stats.itemsFound >= 50,
  },
  {
    id: "ach_items_100",
    name: "Armory Master",
    desc: "Find 100 items.",
    icon: "🗄️",
    category: "collection",
    reward: { coins: 10000, stardust: 35 },
    condition: (stats) => stats.itemsFound >= 100,
  },

  // --- Prestige Achievements ---
  {
    id: "ach_prestige_1",
    name: "Void Rebirth",
    desc: "Perform your first Prestige.",
    icon: "♻️",
    category: "prestige",
    reward: { gems: 3, essence: 2 },
    condition: (stats, state) => (state?.prestigeCount || 0) >= 1,
  },
  {
    id: "ach_prestige_3",
    name: "Reborn Thrice",
    desc: "Perform 3 Prestiges.",
    icon: "🔄",
    category: "prestige",
    reward: { gems: 5, essence: 5 },
    condition: (stats, state) => (state?.prestigeCount || 0) >= 3,
  },
  {
    id: "ach_prestige_5",
    name: "Eternal Cycle",
    desc: "Perform 5 Prestiges.",
    icon: "🌀",
    category: "prestige",
    reward: { gems: 10, essence: 8 },
    condition: (stats, state) => (state?.prestigeCount || 0) >= 5,
  },
  {
    id: "ach_prestige_10",
    name: "Ascended Master",
    desc: "Perform 10 Prestiges.",
    icon: "🌙",
    category: "prestige",
    reward: { gems: 20, essence: 15 },
    condition: (stats, state) => (state?.prestigeCount || 0) >= 10,
  },

  // --- Bestiary Achievements ---
  {
    id: "ach_bestiary_5",
    name: "Monster Scholar",
    desc: "Discover 5 different enemies.",
    icon: "📖",
    category: "bestiary",
    reward: { coins: 1000, stardust: 5 },
    condition: (stats, state) => Object.keys(state?.bestiary || {}).length >= 5,
  },
  {
    id: "ach_bestiary_10",
    name: "Monster Expert",
    desc: "Discover 10 different enemies.",
    icon: "📚",
    category: "bestiary",
    reward: { coins: 2500, stardust: 10 },
    condition: (stats, state) => Object.keys(state?.bestiary || {}).length >= 10,
  },
  {
    id: "ach_bestiary_15",
    name: "Monster Professor",
    desc: "Discover 15 different enemies.",
    icon: "🎓",
    category: "bestiary",
    reward: { coins: 5000, stardust: 20 },
    condition: (stats, state) => Object.keys(state?.bestiary || {}).length >= 15,
  },
  {
    id: "ach_bestiary_20",
    name: "Monster Encyclopedia",
    desc: "Discover all 20 enemies!",
    icon: "🏆",
    category: "bestiary",
    reward: { coins: 10000, stardust: 35 },
    condition: (stats, state) => Object.keys(state?.bestiary || {}).length >= 20,
  },

  // --- Level Achievements ---
  {
    id: "ach_level_5",
    name: "Growing Stronger",
    desc: "Reach Profile Level 5.",
    icon: "📈",
    category: "level",
    reward: { coins: 1000, stardust: 5 },
    condition: (stats, state) => (state?.profile?.level || 1) >= 5,
  },
  {
    id: "ach_level_10",
    name: "Rising Star",
    desc: "Reach Profile Level 10.",
    icon: "⬆️",
    category: "level",
    reward: { coins: 2500, stardust: 10, gems: 1 },
    condition: (stats, state) => (state?.profile?.level || 1) >= 10,
  },
  {
    id: "ach_level_25",
    name: "Seasoned Hero",
    desc: "Reach Profile Level 25.",
    icon: "🌟",
    category: "level",
    reward: { coins: 5000, stardust: 20, gems: 3 },
    condition: (stats, state) => (state?.profile?.level || 1) >= 25,
  },
  {
    id: "ach_level_50",
    name: "Grand Champion",
    desc: "Reach Profile Level 50.",
    icon: "👑",
    category: "level",
    reward: { coins: 15000, stardust: 35, gems: 8 },
    condition: (stats, state) => (state?.profile?.level || 1) >= 50,
  },
  {
    id: "ach_level_100",
    name: "Midnight Legend",
    desc: "Reach Profile Level 100.",
    icon: "🌙",
    category: "level",
    reward: { coins: 50000, stardust: 50, gems: 15 },
    condition: (stats, state) => (state?.profile?.level || 1) >= 100,
  },

  // --- Time Achievements ---
  {
    id: "ach_time_10m",
    name: "Just Started",
    desc: "Play for 10 minutes.",
    icon: "⏱️",
    category: "time",
    reward: { coins: 500 },
    condition: (stats) => stats.totalPlayTimeMs >= 600000,
  },
  {
    id: "ach_time_1h",
    name: "Dedicated",
    desc: "Play for 1 hour total.",
    icon: "⏰",
    category: "time",
    reward: { coins: 2000 },
    condition: (stats) => stats.totalPlayTimeMs >= 3600000,
  },
  {
    id: "ach_time_10h",
    name: "Obsessed",
    desc: "Play for 10 hours total.",
    icon: "⌛",
    category: "time",
    reward: { coins: 10000 },
    condition: (stats) => stats.totalPlayTimeMs >= 36000000,
  },
  {
    id: "ach_time_24h",
    name: "Full Day Warrior",
    desc: "Play for 24 hours total.",
    icon: "📅",
    category: "time",
    reward: { coins: 25000 },
    condition: (stats) => stats.totalPlayTimeMs >= 86400000,
  },
  {
    id: "ach_time_100h",
    name: "No Life",
    desc: "Play for 100 hours total.",
    icon: "🕰️",
    category: "time",
    reward: { coins: 100000 },
    condition: (stats) => stats.totalPlayTimeMs >= 360000000,
  },

  // ── Secret Achievements ────────────────────────────────────────────
  {
    id: "ach_secret_midnight",
    name: "Midnight Gardener",
    desc: "Play the game at exactly midnight (00:00).",
    icon: "🌙",
    category: "secret",
    secret: true,
    reward: { gems: 10, essence: 5 },
    condition: () => new Date().getHours() === 0,
  },
  {
    id: "ach_secret_stage_42",
    name: "The Answer",
    desc: "Reach stage 42 — the answer to life, the universe, and everything.",
    icon: "🌌",
    category: "secret",
    secret: true,
    reward: { coins: 4242, gems: 4 },
    condition: (stats, state) => (state.currentStage || 1) >= 42,
  },
  {
    id: "ach_secret_full_party",
    name: "Dream Team",
    desc: "Have 4 legendary heroes in your party simultaneously.",
    icon: "👑",
    category: "secret",
    secret: true,
    reward: { gems: 20, essence: 10 },
    condition: (stats, state) => {
      if (!state.activeParty || state.activeParty.length < 4) return false;
      return state.activeParty.every(uid => {
        const h = state.roster.find(r => r.uid === uid);
        return h && h.id && ['h_dragon_knight', 'h_moon_king', 'h_void_empress'].some(lid => h.id === lid);
      });
    },
  },
  {
    id: "ach_secret_hoarder",
    name: "Dragon's Hoard",
    desc: "Have 50 items in your inventory at the same time.",
    icon: "💰",
    category: "secret",
    secret: true,
    reward: { coins: 10000, stardust: 25 },
    condition: (stats, state) => (state.inventory || []).length >= 50,
  },
  {
    id: "ach_secret_speed_demon",
    name: "Speed Demon",
    desc: "Click 100 times in under 30 seconds.",
    icon: "⚡",
    category: "secret",
    secret: true,
    reward: { gems: 5, coins: 5000 },
    condition: (stats) => stats.totalClicks >= 100 && stats.totalPlayTimeMs < 30000,
  },
  {
    id: "ach_secret_ascended",
    name: "Transcendence",
    desc: "Ascend any hero 3 times.",
    icon: "🔮",
    category: "secret",
    secret: true,
    reward: { gems: 15, essence: 20 },
    condition: (stats, state) => {
      const asc = state.heroAscensions || {};
      return Object.values(asc).some(level => level >= 3);
    },
  },
  {
    id: "ach_secret_boss_rush_10",
    name: "Unstoppable",
    desc: "Defeat all 10 bosses in Boss Rush mode.",
    icon: "🏴",
    category: "secret",
    secret: true,
    reward: { gems: 25, essence: 30, coins: 50000 },
    condition: (stats, state) => (state.bossRush && state.bossRush.bestWave >= 10),
  },
  {
    id: "ach_secret_no_coins",
    name: "Minimalist",
    desc: "Reach stage 20 without spending any coins on upgrades.",
    icon: "🪶",
    category: "secret",
    secret: true,
    reward: { gems: 8, stardust: 15 },
    condition: (stats, state) => {
      const upgrades = state.upgrades || {};
      const totalLevels = Object.values(upgrades).reduce((a, b) => a + b, 0);
      return (state.currentStage || 1) >= 20 && totalLevels === 0;
    },
  },

  // ── NEW ACHIEVEMENTS (Phase 2.4) ─────────────────────────────────

  // --- Combat ---
  {
    id: "ach_combat_10k_kills",
    name: "Warmonger",
    desc: "Defeat 10,000 enemies.",
    icon: "💀",
    category: "combat",
    reward: { coins: 15000, gems: 5 },
    condition: (stats) => stats.enemiesDefeated >= 10000,
  },
  {
    id: "ach_combat_50k_kills",
    name: "Extinction Event",
    desc: "Defeat 50,000 enemies.",
    icon: "☠️",
    category: "combat",
    reward: { coins: 50000, gems: 15 },
    condition: (stats) => stats.enemiesDefeated >= 50000,
  },
  {
    id: "ach_combat_500_bosses",
    name: "Boss Hunter",
    desc: "Defeat 500 bosses.",
    icon: "👑",
    category: "combat",
    reward: { coins: 30000, gems: 10 },
    condition: (stats) => stats.bossesDefeated >= 500,
  },
  {
    id: "ach_combat_1000_crits",
    name: "Precision Master",
    desc: "Land 1,000 critical hits.",
    icon: "🎯",
    category: "combat",
    reward: { coins: 10000, stardust: 20 },
    condition: (stats) => stats.criticalHits >= 1000,
  },

  // --- Progression ---
  {
    id: "ach_prog_stage_200",
    name: "Into the Abyss",
    desc: "Reach stage 200.",
    icon: "🌀",
    category: "progression",
    reward: { gems: 10, stardust: 30 },
    condition: (stats) => stats.highestStage >= 200,
  },
  {
    id: "ach_prog_stage_500",
    name: "Beyond the Veil",
    desc: "Reach stage 500.",
    icon: "🌌",
    category: "progression",
    reward: { gems: 25, stardust: 50 },
    condition: (stats) => stats.highestStage >= 500,
  },
  {
    id: "ach_prog_tower_15",
    name: "Tower Veteran",
    desc: "Clear Tower Floor 15.",
    icon: "🏰",
    category: "progression",
    reward: { stardust: 40, gems: 8 },
    condition: (stats) => stats.highestTowerFloor >= 15,
  },
  {
    id: "ach_prog_tower_22",
    name: "Tower Conqueror",
    desc: "Clear Tower Floor 22.",
    icon: "🗼",
    category: "progression",
    reward: { stardust: 80, gems: 20 },
    condition: (stats) => stats.highestTowerFloor >= 22,
  },

  // --- Economy ---
  {
    id: "ach_eco_1m_coins",
    name: "Millionaire",
    desc: "Earn 1,000,000 total coins.",
    icon: "💎",
    category: "economy",
    reward: { gems: 10, stardust: 15 },
    condition: (stats) => stats.totalCoinsEarned >= 1000000,
  },
  {
    id: "ach_eco_100_gems",
    name: "Gem Hoarder",
    desc: "Earn 100 total gems.",
    icon: "💠",
    category: "economy",
    reward: { coins: 20000, stardust: 10 },
    condition: (stats) => stats.totalGemsEarned >= 100,
  },
  {
    id: "ach_eco_500_essence",
    name: "Essence Collector",
    desc: "Earn 500 total essence.",
    icon: "🧪",
    category: "economy",
    reward: { gems: 8, coins: 15000 },
    condition: (stats) => stats.totalEssenceEarned >= 500,
  },

  // --- Collection ---
  {
    id: "ach_col_20_heroes",
    name: "Army Builder",
    desc: "Recruit 20 heroes.",
    icon: "🛡️",
    category: "collection",
    reward: { gems: 8, coins: 10000 },
    condition: (stats) => stats.heroesRecruited >= 20,
  },
  {
    id: "ach_col_30_items",
    name: "Treasure Trove",
    desc: "Find 30 items.",
    icon: "🗃️",
    category: "collection",
    reward: { gems: 5, stardust: 15 },
    condition: (stats) => stats.itemsFound >= 30,
  },
  {
    id: "ach_col_50_items",
    name: "Artifact Museum",
    desc: "Find 50 items.",
    icon: "🏛️",
    category: "collection",
    reward: { gems: 12, stardust: 25 },
    condition: (stats) => stats.itemsFound >= 50,
  },
  {
    id: "ach_col_full_party",
    name: "Legendary Five",
    desc: "Fill all 5 party slots.",
    icon: "🌟",
    category: "collection",
    reward: { coins: 8000, gems: 5 },
    condition: (stats, state) => (state.activeParty || []).length >= 5,
  },

  // --- Prestige ---
  {
    id: "ach_pres_5",
    name: "Eternal Cycle",
    desc: "Prestige 5 times.",
    icon: "🔄",
    category: "prestige",
    reward: { essence: 25, gems: 10 },
    condition: (stats, state) => (state.prestigeCount || 0) >= 5,
  },
  {
    id: "ach_pres_10",
    name: "Endless Rebirth",
    desc: "Prestige 10 times.",
    icon: "♾️",
    category: "prestige",
    reward: { essence: 50, gems: 25 },
    condition: (stats, state) => (state.prestigeCount || 0) >= 10,
  },

  // --- Level ---
  {
    id: "ach_lvl_30",
    name: "Seasoned Adventurer",
    desc: "Reach player level 30.",
    icon: "⭐",
    category: "level",
    reward: { coins: 20000, gems: 8 },
    condition: (stats, state) => (state.profile?.level || 1) >= 30,
  },
  {
    id: "ach_lvl_50",
    name: "Legendary Explorer",
    desc: "Reach player level 50.",
    icon: "🌠",
    category: "level",
    reward: { coins: 50000, gems: 20 },
    condition: (stats, state) => (state.profile?.level || 1) >= 50,
  },

  // --- Runes ---
  {
    id: "ach_rune_first",
    name: "Runekeeper",
    desc: "Obtain your first rune.",
    icon: "🔮",
    category: "collection",
    reward: { coins: 5000, stardust: 10 },
    condition: (stats, state) => {
      const runes = state.runes || [];
      // Count runes in inventory + socketed in items
      let total = runes.length;
      for (const hero of state.roster || []) {
        if (hero.equip) {
          for (const slot of ['weapon', 'armor', 'acc']) {
            if (hero.equip[slot]?.runes) {
              total += hero.equip[slot].runes.filter(Boolean).length;
            }
          }
        }
      }
      return total >= 1;
    },
  },
  {
    id: "ach_rune_5",
    name: "Rune Scholar",
    desc: "Collect 5 runes.",
    icon: "📿",
    category: "collection",
    reward: { gems: 10, stardust: 20 },
    condition: (stats, state) => {
      const runes = state.runes || [];
      let total = runes.length;
      for (const hero of state.roster || []) {
        if (hero.equip) {
          for (const slot of ['weapon', 'armor', 'acc']) {
            if (hero.equip[slot]?.runes) {
              total += hero.equip[slot].runes.filter(Boolean).length;
            }
          }
        }
      }
      return total >= 5;
    },
  },

  // --- Secret ---
  {
    id: "ach_secret_grand_rune",
    name: "Grand Discovery",
    desc: "Obtain a Grand tier rune.",
    icon: "✨",
    category: "secret",
    secret: true,
    reward: { gems: 15, essence: 15 },
    condition: (stats, state) => {
      const runes = state.runes || [];
      const hasGrand = runes.some(r => r.templateId && r.templateId.includes('grand'));
      if (hasGrand) return true;
      for (const hero of state.roster || []) {
        if (hero.equip) {
          for (const slot of ['weapon', 'armor', 'acc']) {
            if (hero.equip[slot]?.runes) {
              if (hero.equip[slot].runes.some(r => r && r.templateId && r.templateId.includes('grand'))) return true;
            }
          }
        }
      }
      return false;
    },
  },
  {
    id: "ach_secret_max_ascend",
    name: "Ascension Pinnacle",
    desc: "Ascend a hero 5 times.",
    icon: "🏆",
    category: "secret",
    secret: true,
    reward: { gems: 20, essence: 30 },
    condition: (stats, state) => {
      const asc = state.heroAscensions || {};
      return Object.values(asc).some(level => level >= 5);
    },
  },

  // ── MASTERY ACHIEVEMENTS ──
  {
    id: "ach_mastery_first",
    name: "The Student",
    desc: "Unlock your first Mastery node.",
    icon: "📖",
    category: "mastery",
    reward: { stardust: 500, gems: 5 },
    condition: (stats, state) => {
      const m = state.mastery || {};
      return Object.keys(m).some(heroId => Object.values(m[heroId] || {}).some(v => v > 0));
    },
  },
  {
    id: "ach_mastery_branch",
    name: "Branch Master",
    desc: "Complete an entire mastery branch for any hero.",
    icon: "🌳",
    category: "mastery",
    reward: { stardust: 2000, gems: 15, essence: 10 },
    condition: (stats, state) => {
      const m = state.mastery || {};
      for (const heroMastery of Object.values(m)) {
        const branchCounts = {};
        for (const [nodeId, lvl] of Object.entries(heroMastery || {})) {
          if (lvl > 0) {
            const branch = nodeId.includes('_pow_') ? 'power' : nodeId.includes('_for_') ? 'fortune' : 'guardian';
            branchCounts[branch] = (branchCounts[branch] || 0) + 1;
          }
        }
        if (Object.values(branchCounts).some(c => c >= 5)) return true;
      }
      return false;
    },
  },
  {
    id: "ach_mastery_capstone",
    name: "Capstone Unlocked",
    desc: "Unlock a tier 5 capstone mastery node.",
    icon: "💫",
    category: "mastery",
    reward: { gems: 25, essence: 20 },
    condition: (stats, state) => {
      const m = state.mastery || {};
      for (const heroMastery of Object.values(m)) {
        for (const [nodeId, lvl] of Object.entries(heroMastery || {})) {
          if (nodeId.includes('_5') && lvl > 0) return true;
        }
      }
      return false;
    },
  },

  // ── TALENT ACHIEVEMENTS ──
  {
    id: "ach_talent_first",
    name: "Talented",
    desc: "Purchase your first talent.",
    icon: "⭐",
    category: "talent",
    reward: { stardust: 300, gems: 3 },
    condition: (stats, state) => {
      const t = state.talents || {};
      return Object.values(t).some(v => v > 0);
    },
  },
  {
    id: "ach_talent_10",
    name: "Rising Star",
    desc: "Purchase 10 talent levels total.",
    icon: "🌟",
    category: "talent",
    reward: { stardust: 1000, gems: 10 },
    condition: (stats, state) => {
      const t = state.talents || {};
      return Object.values(t).reduce((sum, v) => sum + v, 0) >= 10;
    },
  },
  {
    id: "ach_talent_50",
    name: "Talent Prodigy",
    desc: "Purchase 50 talent levels total.",
    icon: "🏅",
    category: "talent",
    reward: { stardust: 5000, gems: 30, essence: 15 },
    condition: (stats, state) => {
      const t = state.talents || {};
      return Object.values(t).reduce((sum, v) => sum + v, 0) >= 50;
    },
  },
  {
    id: "ach_talent_max_branch",
    name: "Branch Specialist",
    desc: "Max out all talents in one branch.",
    icon: "🎓",
    category: "talent",
    reward: { stardust: 10000, gems: 50, essence: 30 },
    condition: (stats, state) => {
      const t = state.talents || {};
      const branchTalents = { offense: [], economy: [], utility: [] };
      const branchMap = {
        tal_raw_power: 'offense', tal_precision: 'offense', tal_devastation: 'offense', tal_combo_master: 'offense',
        tal_click_fury: 'offense', tal_element_mastery: 'offense', tal_double_strike: 'offense', tal_warlord: 'offense',
        tal_gold_rush: 'economy', tal_star_collector: 'economy', tal_gem_hunter: 'economy', tal_essence_siphon: 'economy',
        tal_loot_magnet: 'economy', tal_xp_scholar: 'economy', tal_salvage_expert: 'economy', tal_fortune: 'economy',
        tal_familiar_bond: 'utility', tal_pet_harmony: 'utility', tal_expeditionary: 'utility', tal_offline_mastery: 'utility',
        tal_tower_climber: 'utility', tal_quick_spin: 'utility', tal_quest_tracker: 'utility', tal_transcendence: 'utility',
      };
      for (const [id, branch] of Object.entries(branchMap)) {
        branchTalents[branch].push(t[id] || 0);
      }
      return Object.values(branchTalents).some(levels => levels.every(l => l >= 10));
    },
  },

  // ── CHALLENGE ACHIEVEMENTS ──
  {
    id: "ach_challenge_first",
    name: "Challenger",
    desc: "Complete your first daily challenge.",
    icon: "🏋️",
    category: "challenge",
    reward: { coins: 5000, stardust: 100 },
    condition: (stats, state) => (state.challenges?.totalCompleted || 0) >= 1,
  },
  {
    id: "ach_challenge_10",
    name: "Challenge Seeker",
    desc: "Complete 10 daily challenges.",
    icon: "💪",
    category: "challenge",
    reward: { coins: 25000, stardust: 500, gems: 10 },
    condition: (stats, state) => (state.challenges?.totalCompleted || 0) >= 10,
  },
  {
    id: "ach_challenge_nightmare",
    name: "Nightmare Survivor",
    desc: "Complete a Nightmare difficulty challenge.",
    icon: "☠️",
    category: "challenge",
    reward: { gems: 20, essence: 15 },
    condition: (stats, state) => (state.challenges?.nightmaresCompleted || 0) >= 1,
  },
  {
    id: "ach_challenge_points_100",
    name: "Diamond Challenger",
    desc: "Accumulate 100 Challenge Points.",
    icon: "🏆",
    category: "challenge",
    reward: { gems: 50, essence: 50 },
    condition: (stats, state) => (state.challenges?.totalPoints || 0) >= 100,
  },

  // ── BANNER ACHIEVEMENTS ──
  {
    id: "ach_banner_summon",
    name: "Banner Hunter",
    desc: "Summon on 3 different banners.",
    icon: "🎪",
    category: "banner",
    reward: { stardust: 1000, gems: 10 },
    condition: (stats, state) => Object.keys(state.bannerHistory || {}).length >= 3,
  },
  {
    id: "ach_pity_trigger",
    name: "Persistence Pays",
    desc: "Trigger the pity system on a banner.",
    icon: "🎰",
    category: "banner",
    reward: { gems: 25 },
    condition: (stats, state) => (state.bannerHistory?.pityTriggered || 0) >= 1,
  },

  // ── MILESTONE ACHIEVEMENTS ──
  {
    id: "ach_stage_750",
    name: "Void Walker",
    desc: "Reach stage 750.",
    icon: "⚡",
    category: "progress",
    reward: { coins: 5000000, stardust: 20000, gems: 100 },
    condition: (stats) => stats.highestStage >= 750,
  },
  {
    id: "ach_stage_1000",
    name: "Cosmic Arbiter",
    desc: "Reach stage 1000.",
    icon: "🌌",
    category: "progress",
    reward: { coins: 20000000, stardust: 100000, gems: 250, essence: 100 },
    condition: (stats) => stats.highestStage >= 1000,
  },
  {
    id: "ach_stage_2000",
    name: "The Infinite",
    desc: "Reach stage 2000.",
    icon: "💫",
    category: "progress",
    secret: true,
    reward: { coins: 100000000, stardust: 500000, gems: 1000, essence: 500 },
    condition: (stats) => stats.highestStage >= 2000,
  },

  // ── ELEMENT COLLECTION ACHIEVEMENTS ──
  {
    id: "ach_all_elements",
    name: "Rainbow Warrior",
    desc: "Own at least one hero of every element.",
    icon: "🌈",
    category: "collection",
    reward: { stardust: 3000, gems: 20 },
    condition: (stats, state) => {
      const elements = new Set();
      (state.roster || []).forEach(hero => {
        // Simple check via hero ID patterns
        const id = hero.id;
        if (id) elements.add(id);
      });
      return elements.size >= 5; // At least heroes covering 5 elements
    },
  },

  // ── PRESTIGE DEPTH ACHIEVEMENTS ──
  {
    id: "ach_prestige_5",
    name: "Void Veteran",
    desc: "Prestige 5 times.",
    icon: "🔄",
    category: "prestige",
    reward: { essence: 20, gems: 15 },
    condition: (stats, state) => (state.prestigeCount || 0) >= 5,
  },
  {
    id: "ach_prestige_10",
    name: "Void Master",
    desc: "Prestige 10 times.",
    icon: "♾️",
    category: "prestige",
    reward: { essence: 50, gems: 50 },
    condition: (stats, state) => (state.prestigeCount || 0) >= 10,
  },
  {
    id: "ach_prestige_25",
    name: "Eternal Rebirth",
    desc: "Prestige 25 times.",
    icon: "🌀",
    category: "prestige",
    secret: true,
    reward: { essence: 200, gems: 150 },
    condition: (stats, state) => (state.prestigeCount || 0) >= 25,
  },
];
