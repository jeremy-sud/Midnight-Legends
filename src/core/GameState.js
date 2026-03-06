import { Config } from "./Config.js";
import { HeroTemplate } from "../entities/HeroDatabase.js";

class StateManager {
  constructor() {
    this.reset();
  }

  reset() {
    this.data = {
      coins: 0,
      stardust: 0,
      gems: 0,
      essence: 0,
      inventory: [], // Array of item instances: { uid: '...', templateId: '...', rarity: { ... } }
      roster: [], // Array of hero instances: { id: 'hero1', uid: 'uuid', level: 1, equip: {weapon:null, armor:null, acc:null} }
      activeParty: [], // Array of hero UIDs currently in the party (max 4)
      currentStage: 1,
      currentEnemyHp: 100,
      currentEnemyMaxHp: 100,
      towerFloor: 1,
      autoclickerLevel: 0,
      upgrades: {}, // e.g. { 'upg_global_dps': 5 }
      unlockedAchievements: [], // Array of achievement IDs
      bestiary: {}, // { enemy_id: { kills: N } }
      shopPurchases: {}, // { shop_item_id: count }
      prestigeUpgrades: {}, // { prestige_upg_id: level }
      prestigeCount: 0, // Number of times prestiged
      storage: [], // Warehouse storage for items
      welcomeGiftClaimed: false, // Welcome gift tracking
      lastOnlineTimestamp: Date.now(), // For offline progress calculation
      claimedMilestones: [], // Stages where milestone was claimed
      dailyLogin: {             // Daily login reward tracking
        lastClaimDate: null,
        streakDay: 0,
      },
      spinWheel: {              // Spin wheel tracking
        lastFreeSpinDate: null,
        history: [],
      },
      pets: {                   // Pet / Tamagotchi system
        owned: [],              // Array of { id, level, hunger, happiness, energy, active }
        activePetId: null,
      },
      miniGames: {},            // { game_id: { lastPlayed, bestScore } }
      profile: {
        name: 'Adventurer',
        level: 1,
        xp: 0,
        avatarId: 0,
      },
      settings: {
        showDamageNumbers: true,
        showNotifications: true,
        autoSaveEnabled: true,
        particleEffects: true,
        compactMode: false,
        autoProgress: true,
        autoBuy: false,
        reduceAnimations: false,
        lowQuality: false,
        noGlow: false,
        reduceRenders: false,
        noFloatText: false,
      },
      playerDamageStats: {
        totalDamageDealt: 0,
        enemiesDefeated: 0,
        bossesDefeated: 0,
        totalCoinsEarned: 0,
        totalStardustEarned: 0,
        totalGemsEarned: 0,
        totalEssenceEarned: 0,
        totalClicks: 0,
        criticalHits: 0,
        highestStage: 1,
        highestTowerFloor: 1,
        itemsFound: 0,
        heroesRecruited: 0,
        totalPlayTimeMs: 0,
      },
      sessionStartTime: Date.now(),
        heroAscensions: {}, // { heroUid: ascensionLevel }
        expeditions: [],            // Active expeditions
        dailyQuests: {              // Daily quest tracking
          date: null,               // Date string 'YYYY-MM-DD'
          completed: [],            // Array of quest IDs completed today
          snapshots: {},            // Stat snapshots at quest reset
          streak: 0,               // Consecutive days all dailies completed
          lastStreakDate: null,     // Last date streak was awarded
        },
        weeklyQuests: {             // Weekly quest tracking
          week: null,               // Week key 'YYYY-Wnn'
          completed: [],
          snapshots: {},
        },
        bossRush: {                 // Boss Rush mode state
          lastPlayed: null,
          bestWave: 0,
        },
    };
  }
  /**
   * Ascend a hero (reset level, grant permanent bonus)
   * @param {string} heroUid
   */
  ascendHero(heroUid) {
    const hero = this.data.roster.find(h => h.uid === heroUid);
    if (!hero) return false;
    const template = HeroTemplate.find(t => t.id === hero.id);
    if (!template) return false;
    const maxLevel = template.rarity.id === 'legendary' ? 100 : 50;
    if (hero.level < maxLevel) return false;
    // Reset level, increment ascension
    hero.level = 1;
    hero.ascensionLevel = (hero.ascensionLevel || 0) + 1;
    this.data.heroAscensions[heroUid] = hero.ascensionLevel;
    return template; // Return template so caller can show notification
  }

  load() {
    const saved = localStorage.getItem(Config.saveKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.data = { ...this.data, ...parsed };
      } catch (e) {
        console.error("Save state corrupt. Starting fresh.", e);
        this.reset();
      }
    }
  }

  save() {
    this.data.lastOnlineTimestamp = Date.now();
    localStorage.setItem(Config.saveKey, JSON.stringify(this.data));
  }

  // Helper getters/setters
  addCoins(amount) {
    this.data.coins += amount;
    this.data.playerDamageStats.totalCoinsEarned += amount;
  }
  spendCoins(amount) {
    if (this.data.coins >= amount) {
      this.data.coins -= amount;
      return true;
    }
    return false;
  }

  addStardust(amount) {
    this.data.stardust += amount;
    this.data.playerDamageStats.totalStardustEarned += amount;
  }
  spendStardust(amount) {
    if (this.data.stardust >= amount) {
      this.data.stardust -= amount;
      return true;
    }
    return false;
  }

  addGems(amount) {
    this.data.gems = (this.data.gems || 0) + amount;
    if (!this.data.playerDamageStats.totalGemsEarned) this.data.playerDamageStats.totalGemsEarned = 0;
    this.data.playerDamageStats.totalGemsEarned += amount;
  }
  spendGems(amount) {
    if ((this.data.gems || 0) >= amount) {
      this.data.gems -= amount;
      return true;
    }
    return false;
  }

  addEssence(amount) {
    this.data.essence = (this.data.essence || 0) + amount;
    if (!this.data.playerDamageStats.totalEssenceEarned) this.data.playerDamageStats.totalEssenceEarned = 0;
    this.data.playerDamageStats.totalEssenceEarned += amount;
  }
  spendEssence(amount) {
    if ((this.data.essence || 0) >= amount) {
      this.data.essence -= amount;
      return true;
    }
    return false;
  }

  addHero(heroId) {
    const uid = "h_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
    this.data.roster.push({
      id: heroId,
      uid: uid,
      level: 1,
      equip: { weapon: null, armor: null, acc: null },
    });
    this.data.playerDamageStats.heroesRecruited++;
    return uid;
  }

  addItem(itemInstance) {
    this.data.inventory.push(itemInstance);
    this.data.playerDamageStats.itemsFound++;
  }

  equipItem(heroUid, itemUid, slot) {
    const hero = this.data.roster.find((h) => h.uid === heroUid);
    const itemIdx = this.data.inventory.findIndex((i) => i.uid === itemUid);

    if (hero && itemIdx !== -1) {
      // Return currently equipped item to inventory
      if (hero.equip[slot]) {
        this.data.inventory.push(hero.equip[slot]);
      }
      hero.equip[slot] = this.data.inventory.splice(itemIdx, 1)[0];
    }
  }

  unequipItem(heroUid, slot) {
    const hero = this.data.roster.find((h) => h.uid === heroUid);
    if (hero && hero.equip[slot]) {
      this.data.inventory.push(hero.equip[slot]);
      hero.equip[slot] = null;
    }
  }
}

export const GameState = new StateManager();
