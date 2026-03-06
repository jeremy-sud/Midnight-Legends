import { GameState } from "../core/GameState.js";
import { AudioManager } from "../core/AudioManager.js";
import {
  HeroTemplate,
  getHeroLevelCost,
  getHeroStats,
  getHeroElement,
  Rarities,
} from "../entities/HeroDatabase.js";
import {
  ItemTemplate,
  ItemCategories,
  getItemStats,
} from "../entities/ItemDatabase.js";
import {
  UpgradeDatabase,
  getUpgradeCost,
  getUpgradeEffect,
} from "../entities/UpgradeDatabase.js";
import { LoreDatabase } from "../entities/LoreDatabase.js";
import { TowerDatabase } from "../entities/TowerDatabase.js";
import { AchievementDatabase } from "../entities/AchievementDatabase.js";
import { EnemyDatabase } from "../entities/EnemyDatabase.js";
import { SynergyDatabase, getActiveSynergies, getSynergyBonuses } from "../entities/SynergyDatabase.js";
import { ShopDatabase, getShopBonuses } from "../entities/ShopDatabase.js";
import { PrestigeUpgrades, getPrestigeBonuses, calculatePrestigeGain } from "../entities/PrestigeDatabase.js";
import { GuideTips } from "../entities/GuideDatabase.js";
import { EventDatabase, getActiveEvents, getEventBonuses } from "../entities/EventDatabase.js";
import { CollectionDatabase, getCollectionStatus, getCollectionBonuses } from "../entities/CollectionDatabase.js";
import { Config } from "../core/Config.js";
import { formatNumber, formatTime } from "../core/Utils.js";
import { DailyLoginRewards, getDailyLoginStatus } from "../entities/DailyLoginDatabase.js";
import { EventBus } from "../core/EventBus.js";
import { getAllHeroSkills, getHeroSkills, getPartySkillBonuses } from "../entities/SkillDatabase.js";
import { SpinWheelPrizes, SPIN_COST_GEMS, spinWheel, canFreeSpin } from "../entities/SpinWheelDatabase.js";
import { PetDatabase, PetFoods, getPetMood, getPetBonuses } from "../entities/PetDatabase.js";
import { MiniGameDatabase, isMiniGameReady, getMiniGameCooldown } from "../entities/MiniGameDatabase.js";
import { getDailyQuests, getQuestProgress, getWeeklyQuests, getWeekKey, getStreakBonus } from "../entities/QuestDatabase.js";
import { getCraftableGroups, fuseItems, getDismantleValue, CRAFT_COST, getNextRarity, getUnlockedRecipes, canCraftRecipe, craftRecipe } from "../entities/CraftingDatabase.js";
import { getUnlockedRegions, ExpeditionRegions, startExpedition, calculateExpeditionRewards, getExpeditionTimeLeft } from "../entities/ExpeditionDatabase.js";
import { BOSS_RUSH_CONFIG, BOSS_RUSH_NAMES, getBossRushHp, getBossRushReward, BOSS_RUSH_REWARDS, isBossRushReady, getBossRushCooldown } from "../entities/BossRushDatabase.js";
import { RuneTemplate, RuneTypes, RuneTiers, getRuneInfo, getRuneBonus, getRuneSlots } from "../entities/RuneDatabase.js";
import { RelicDatabase, isRelicUnlocked, getRelicBonusValue } from "../entities/RelicDatabase.js";
import { DUNGEON_REWARDS, getDungeonFloorHp, getDungeonFloorTimer, getDungeonModifier, getDungeonWeekKey, isDungeonReady, getDungeonReward, getWeekSeed, getDungeonFloorName, DUNGEON_CONFIG } from "../entities/DungeonDatabase.js";
import { getHeroMasteryTree, getHeroMasteryBonuses, getMasteryPointsAvailable, getMasteryNodeCost, canUnlockMasteryNode, getTotalMasteryPointsSpent } from "../entities/PrestigeMasteryDatabase.js";
import { TalentDatabase, TalentBranches, getTalentCost, canUnlockTalent, getTalentBonuses } from "../entities/TalentDatabase.js";
import { generateDailyChallenges, ChallengeRewards, getUnclaimedChallengeRewards, getChallengeReward } from "../entities/ChallengeDatabase.js";
import { BannerDatabase, getActiveBanner, isHeroFeatured, getPityProgress } from "../entities/BannerDatabase.js";

export class UIManager {
  constructor() {
    this.battleLog = []; // Transient battle log entries
    this._logRenderQueued = false; // Throttle battle log renders
    this._lastLogTime = 0; // Rate-limit log entries
    this.guideIndex = 0; // Current guide tip index
    this.buyAmount = 1; // Academy buy mode: 1, 5, 10, or 'max'
    this.killStreak = 0; // Current kill streak counter
    this.lastKillTime = 0; // Timestamp of last kill
    this.rosterSort = 'rarity'; // Current roster sort mode

    // DOM Cache
    this.dom = {
      coinsDisplay: document.getElementById("coins-display"),
      stardustDisplay: document.getElementById("stardust-display"),
      gemsDisplay: document.getElementById("gems-display"),
      essenceDisplay: document.getElementById("essence-display"),
      currentStage: document.getElementById("current-stage"),

      enemyContainer: document.getElementById("enemy-container"),
      enemyName: document.getElementById("enemy-name"),
      enemyHpFill: document.getElementById("enemy-hp-fill"),
      enemyHpText: document.getElementById("enemy-hp-text"),

      activeParty: document.getElementById("active-party-container"),

      feedbackLayer: document.getElementById("feedback-layer"),
      notifBubble: document.getElementById("notification-bubble"),
      notifToast: document.getElementById("notif-toast"),
      notifBell: document.getElementById("notif-bell"),
      notifBadge: document.getElementById("notif-badge"),
      notifDropdown: document.getElementById("notif-dropdown"),
      notifList: document.getElementById("notif-list"),
      notifClear: document.getElementById("notif-clear"),

      // Tabs → Bottom Nav + Sub-tabs
      navItems: document.querySelectorAll(".nav-item"),
      subTabBar: document.getElementById("sub-tab-bar"),
      tabContents: document.querySelectorAll(".tab-content"),

      // Hero Screen
      rosterGrid: document.getElementById("roster-grid"),

      // Inventory Screen
      invWeapons: document.getElementById("inv-weapons"),
      invArmor: document.getElementById("inv-armor"),
      invAccessories: document.getElementById("inv-accessories"),

      // Tavern Screen
      summonBtnCoin: document.getElementById("summon-btn-coin"),
      summonBtnStar: document.getElementById("summon-btn-star"),

      // Academy & Familiar
      academyGrid: document.getElementById("academy-grid"),
      familiarBtn: document.getElementById("familiar-btn"),
      familiarTitle: document.getElementById("familiar-title"),
      familiarCost: document.getElementById("familiar-cost"),

      // Tower
      towerFloorDisplay: document.getElementById("tower-floor-display"),
      towerStartBtn: document.getElementById("tower-start-btn"),
      towerCombatArea: document.getElementById("tower-combat-area"),
      towerBossName: document.getElementById("tower-boss-name"),
      towerBossVisual: document.getElementById("tower-boss-visual"),
      towerHpFill: document.getElementById("tower-hp-fill"),
      towerHpText: document.getElementById("tower-hp-text"),
      towerTimer: document.getElementById("tower-timer"),

      // Hero combat
      heroCombatVisual: document.getElementById("hero-combat-visual"),
      heroCombatName: document.getElementById("hero-combat-name"),
      enemyVisual: document.getElementById("enemy-visual"),

      // Combat extras: combo, shield, status
      comboDisplay: document.getElementById("combo-display"),
      comboHits: document.getElementById("combo-hits"),
      comboTier: document.getElementById("combo-tier"),
      shieldBar: document.getElementById("shield-bar"),
      shieldBarFill: document.getElementById("shield-bar-fill"),
      shieldBarText: document.getElementById("shield-bar-text"),
      enemyStatusRow: document.getElementById("enemy-status-row"),

      // Hero Stats Panel
      heroStatsPanel: document.getElementById("hero-stats-panel"),
      hspHeroName: document.getElementById("hsp-hero-name"),
      hspHeroLevel: document.getElementById("hsp-hero-level"),
      hspStatsRow: document.getElementById("hsp-stats-row"),
      hspEquipRow: document.getElementById("hsp-equip-row"),

      // Party info
      dpsDisplay: document.getElementById("dps-display"),
      clickDmgDisplay: document.getElementById("click-dmg-display"),
      killsDisplay: document.getElementById("kills-display"),
      streakBar: document.getElementById("streak-bar"),
      streakCount: document.getElementById("streak-count"),
      streakMult: document.getElementById("streak-mult"),
      streakTimer: document.getElementById("streak-timer"),
      stageProgressFill: document.getElementById("stage-progress-fill"),
      stageLabel: document.getElementById("stage-label"),
      synergyBar: document.getElementById("synergy-bar"),
      battleLog: document.getElementById("battle-log"),

      // Lore
      loreContainer: document.getElementById("lore-container"),

      // Multi-summon
      summonBtnCoin10: document.getElementById("summon-btn-coin-10"),
      summonBtnStar10: document.getElementById("summon-btn-star-10"),
      tavernPoolGrid: document.getElementById("tavern-pool-grid"),

      // Storage
      btnStoreAll: document.getElementById("btn-store-all"),
      btnRetrieveAll: document.getElementById("btn-retrieve-all"),
      storageWeapons: document.getElementById("storage-weapons"),
      storageArmor: document.getElementById("storage-armor"),
      storageAccessories: document.getElementById("storage-accessories"),
      storageCapacity: document.getElementById("storage-capacity"),

      // Quick equip & level all
      btnQuickEquip: document.getElementById("btn-quick-equip"),
      btnLevelAll: document.getElementById("btn-level-all"),
      btnAutoFuseHeroes: document.getElementById("btn-auto-fuse-heroes"),
      btnAutoFuseItems: document.getElementById("btn-auto-fuse-items"),

      // Sell
      btnSellCommons: document.getElementById("btn-sell-commons"),
      btnSellSelected: document.getElementById("btn-sell-selected"),

      // Daily login
      dailyLoginBar: document.getElementById("daily-login-bar"),
      dailyClaimBtn: document.getElementById("daily-claim-btn"),

      // Spin Wheel
      spinWheelEl: document.getElementById("spin-wheel"),
      spinResult: document.getElementById("spin-result"),
      spinPrizeIcon: document.getElementById("spin-prize-icon"),
      spinPrizeName: document.getElementById("spin-prize-name"),
      spinPrizeLabel: document.getElementById("spin-prize-label"),
      btnFreeSpin: document.getElementById("btn-free-spin"),
      btnGemSpin: document.getElementById("btn-gem-spin"),
      spinHistory: document.getElementById("spin-history"),

      // Pets
      petActiveArea: document.getElementById("pet-active-area"),
      petActions: document.getElementById("pet-actions"),
      btnFeedPet: document.getElementById("btn-feed-pet"),
      btnPlayPet: document.getElementById("btn-play-pet"),
      btnRestPet: document.getElementById("btn-rest-pet"),
      petGrid: document.getElementById("pet-grid"),

      // Mini-games
      minigameContainer: document.getElementById("minigame-container"),
      minigamePlayArea: document.getElementById("minigame-play-area"),

      // Shop
      shopGrid: document.getElementById("shop-grid"),
      shopGems: document.getElementById("shop-gems"),

      // Prestige
      prestigeEssenceCurrent: document.getElementById("prestige-essence-current"),
      prestigeGainPreview: document.getElementById("prestige-gain-preview"),
      prestigeRequirement: document.getElementById("prestige-requirement"),
      prestigeBtn: document.getElementById("prestige-btn"),
      prestigeBonusesGrid: document.getElementById("prestige-bonuses-grid"),
      prestigeMultipliers: document.getElementById("prestige-multipliers"),

      // Events
      eventsContainer: document.getElementById("events-container"),

      // Collections
      collectionsContainer: document.getElementById("collections-container"),
      relicsContainer: document.getElementById("relics-container"),

      // Stats
      statsCombat: document.getElementById("stats-combat"),
      statsEconomy: document.getElementById("stats-economy"),
      statsProgression: document.getElementById("stats-progression"),
      statsParty: document.getElementById("stats-party"),

      // Achievements
      achievementsContainer: document.getElementById("achievements-container"),
      achCounter: document.getElementById("ach-counter"),

      // Profile
      profileName: document.getElementById("profile-name"),
      profileLevel: document.getElementById("profile-level"),
      profileTitle: document.getElementById("profile-title"),
      profileAvatar: document.getElementById("profile-avatar"),
      profileStats: document.getElementById("profile-stats"),
      xpBarFill: document.getElementById("xp-bar-fill"),
      xpBarText: document.getElementById("xp-bar-text"),
      avatarGrid: document.getElementById("avatar-grid"),
      hudAvatar: document.getElementById("hud-avatar"),
      hudName: document.getElementById("hud-name"),
      hudLevel: document.getElementById("hud-level"),
      hudTitle: document.getElementById("hud-title"),
      hudXpFill: document.getElementById("hud-xp-fill"),

      // Bestiary
      bestiaryGrid: document.getElementById("bestiary-grid"),
      bestiaryCounter: document.getElementById("bestiary-counter"),

      // Settings
      settingDamageNumbers: document.getElementById("setting-damage-numbers"),
      settingNotifications: document.getElementById("setting-notifications"),
      settingAutosave: document.getElementById("setting-autosave"),
      settingParticles: document.getElementById("setting-particles"),
      settingCompact: document.getElementById("setting-compact"),
      settingAutoProgress: document.getElementById("setting-auto-progress"),
      settingAutoBuy: document.getElementById("setting-auto-buy"),

      // Game info
      infoEnemies: document.getElementById("info-enemies"),
      infoHeroes: document.getElementById("info-heroes"),
      infoItems: document.getElementById("info-items"),
      infoUpgrades: document.getElementById("info-upgrades"),
      infoFloors: document.getElementById("info-floors"),
      infoLore: document.getElementById("info-lore"),
      infoAchievements: document.getElementById("info-achievements"),

      // Guide
      guideText: document.getElementById("guide-text"),
      guideCounter: document.getElementById("guide-counter"),
      guidePrev: document.getElementById("guide-prev"),
      guideNext: document.getElementById("guide-next"),

      // Save management
      btnSaveNow: document.getElementById("btn-save-now"),
      btnExportSave: document.getElementById("btn-export-save"),
      btnImportSave: document.getElementById("btn-import-save"),
      btnHardReset: document.getElementById("btn-hard-reset"),
      settingReduceAnimations: document.getElementById('setting-reduce-animations'),
      settingLowQuality: document.getElementById('setting-low-quality'),
      settingNoGlow: document.getElementById('setting-no-glow'),
      settingReduceRenders: document.getElementById('setting-reduce-renders'),
      settingNoFloatText: document.getElementById('setting-no-float-text'),
      settingMusic: document.getElementById('setting-music'),
      settingMusicVol: document.getElementById('setting-music-vol'),
      settingSfx: document.getElementById('setting-sfx'),
      settingSfxVol: document.getElementById('setting-sfx-vol'),
    };

    // Sell mode state
    this.sellMode = false;

    // Item selector overlay
    this.selectOverlay = document.getElementById("select-overlay");
    const selectCloseBtn = document.getElementById("select-modal-close");
    if (selectCloseBtn) {
      selectCloseBtn.onclick = () => {
        this.selectOverlay.classList.remove("active");
        this.pendingEquip = null;
      };
    }

    // Header profile click → navigate to Profile tab
    const headerHud = document.getElementById('header-profile-hud');
    if (headerHud) {
      headerHud.onclick = () => {
        this.dom.navItems.forEach(n => n.classList.remove('active'));
        const moreNav = Array.from(this.dom.navItems).find(n => n.dataset.category === 'more');
        if (moreNav) moreNav.classList.add('active');
        const tabs = UIManager.CATEGORY_TABS['more'] || [];
        this._renderSubTabs('more', tabs);
        this._showTab('tab-profile');
        // Highlight the Profile sub-tab
        if (this.dom.subTabBar) {
          this.dom.subTabBar.querySelectorAll('.sub-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.tabId === 'tab-profile');
          });
        }
      };
    }

    // Notification queue state
    this._notifHistory = [];       // All notification messages
    this._notifUnread = 0;         // Unread count
    this._toastTimer = null;       // Current toast auto-hide timer
    this._dropdownOpen = false;    // Is dropdown expanded

    // Notification bell handlers
    if (this.dom.notifBell) {
      this.dom.notifBell.onclick = () => this._toggleNotifDropdown();
    }
    if (this.dom.notifClear) {
      this.dom.notifClear.onclick = (e) => {
        e.stopPropagation();
        this._clearNotifHistory();
      };
    }
    // Close dropdown when clicking elsewhere
    document.addEventListener('click', (e) => {
      if (this._dropdownOpen && this.dom.notifBubble && !this.dom.notifBubble.contains(e.target)) {
        this._closeNotifDropdown();
      }
    });

    if (this.dom.summonBtnCoin)
      this.dom.summonBtnCoin.onclick = () => this.summonHero("coin");
    if (this.dom.summonBtnStar)
      this.dom.summonBtnStar.onclick = () => this.summonHero("star");

    // ×10 Multi-summon
    if (this.dom.summonBtnCoin10)
      this.dom.summonBtnCoin10.onclick = () => this._confirmAction('Summon ×10 (Coins)', `Spend ${formatNumber(Config.coinSummonCost * 10)} coins to summon 10 heroes?`, () => this.multiSummon("coin", 10));
    if (this.dom.summonBtnStar10)
      this.dom.summonBtnStar10.onclick = () => this._confirmAction('Summon ×10 (Stardust)', `Spend ${formatNumber(Config.gachaCost * 10)} stardust to summon 10 heroes?`, () => this.multiSummon("star", 10));

    // Storage buttons
    if (this.dom.btnStoreAll)
      this.dom.btnStoreAll.onclick = () => this.storeAllItems();
    if (this.dom.btnRetrieveAll)
      this.dom.btnRetrieveAll.onclick = () => this.retrieveAllItems();

    // Quick equip
    if (this.dom.btnQuickEquip)
      this.dom.btnQuickEquip.onclick = () => this.quickEquipBestItems();

    // Bulk level-up
    if (this.dom.btnLevelAll)
      this.dom.btnLevelAll.onclick = () => this.levelAllPartyHeroes();

    // Auto-fuse heroes
    if (this.dom.btnAutoFuseHeroes)
      this.dom.btnAutoFuseHeroes.onclick = () => this.autoFuseHeroes();

    // Auto-fuse items
    if (this.dom.btnAutoFuseItems)
      this.dom.btnAutoFuseItems.onclick = () => this.autoFuseItems();

    // Roster sort buttons
    document.querySelectorAll('.sort-btn[data-sort]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.rosterSort = btn.dataset.sort;
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderRoster();
      });
    });

    // Item sell buttons
    if (this.dom.btnSellCommons)
      this.dom.btnSellCommons.onclick = () => this.sellByRarity('Common');
    if (this.dom.btnSellSelected)
      this.dom.btnSellSelected.onclick = () => this.toggleSellMode();

    // Sell rares button
    const btnSellRares = document.getElementById('btn-sell-rares');
    if (btnSellRares)
      btnSellRares.onclick = () => this.sellByRarity('Rare');

    // Daily login claim
    if (this.dom.dailyClaimBtn)
      this.dom.dailyClaimBtn.onclick = () => this.claimDailyLogin();

    // Spin Wheel
    if (this.dom.btnFreeSpin)
      this.dom.btnFreeSpin.onclick = () => this.doSpin('free');
    if (this.dom.btnGemSpin)
      this.dom.btnGemSpin.onclick = () => this.doSpin('gem');

    // Pet actions
    if (this.dom.btnFeedPet)
      this.dom.btnFeedPet.onclick = () => this.feedPet();
    if (this.dom.btnPlayPet)
      this.dom.btnPlayPet.onclick = () => this.playWithPet();
    if (this.dom.btnRestPet)
      this.dom.btnRestPet.onclick = () => this.restPet();

    // Pet grid delegation
    if (this.dom.petGrid) {
      this.dom.petGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-pet-action]');
        if (!btn) return;
        const action = btn.dataset.petAction;
        const petId = btn.dataset.petId;
        if (action === 'adopt') this.adoptPet(petId);
        else if (action === 'activate') this.activatePet(petId);
      });
    }

    // Mini-game delegation
    if (this.dom.minigameContainer) {
      this.dom.minigameContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-mg-id]');
        if (!btn || btn.classList.contains('on-cooldown')) return;
        this.startMiniGame(btn.dataset.mgId);
      });
    }

    // Item tooltip
    this._itemTooltip = null;

    // Ascension event handler
    document.addEventListener('heroAscended', (e) => {
      const { template, ascLevel } = e.detail;
      this.showNotification(`⭐ Ascension! ${template.name} → Ascension ${ascLevel}`);
      this.renderHeroStatsPanel();
      this.renderRoster();
      this.renderActiveParty();
    });

    // Tower start button
    if (this.dom.towerStartBtn) {
      this.dom.towerStartBtn.onclick = () => EventBus.emit('startTower');
    }

    // Prestige button with confirmation
    if (this.dom.prestigeBtn) {
      this.dom.prestigeBtn.onclick = () => {
        const gain = calculatePrestigeGain(GameState.data.currentStage);
        if (gain <= 0) {
          this.showNotification('Need stage 50+ to prestige!');
          return;
        }
        this._confirmAction('Void Rebirth', `Prestige to earn +${gain} Essence? All stage progress and currencies will be reset.`, () => EventBus.emit('performPrestige'));
      };
    }

    // Guide navigation
    if (this.dom.guidePrev) {
      this.dom.guidePrev.onclick = () => {
        this.guideIndex = (this.guideIndex - 1 + GuideTips.length) % GuideTips.length;
        this.renderGuide();
      };
    }
    if (this.dom.guideNext) {
      this.dom.guideNext.onclick = () => {
        this.guideIndex = (this.guideIndex + 1) % GuideTips.length;
        this.renderGuide();
      };
    }

    // Profile name editing
    if (this.dom.profileName) {
      this.dom.profileName.addEventListener('blur', () => {
        const name = this.dom.profileName.textContent.trim().slice(0, 20) || 'Adventurer';
        if (!GameState.data.profile) GameState.data.profile = { name: 'Adventurer', level: 1, xp: 0, avatarId: 0 };
        GameState.data.profile.name = name;
        this.renderProfile();
      });
    }

    // Save management buttons
    if (this.dom.btnSaveNow) {
      this.dom.btnSaveNow.onclick = () => { GameState.save(); this.showNotification('Game saved!'); };
    }
    if (this.dom.btnExportSave) {
      this.dom.btnExportSave.onclick = () => {
        const data = btoa(JSON.stringify(GameState.data));
        navigator.clipboard.writeText(data).then(() => this.showNotification('Save copied to clipboard!'));
      };
    }
    if (this.dom.btnImportSave) {
      this.dom.btnImportSave.onclick = () => {
        const input = prompt('Paste your save data:');
        if (input) {
          try {
            GameState.data = JSON.parse(atob(input));
            GameState.save();
            location.reload();
          } catch { this.showNotification('Invalid save data!'); }
        }
      };
    }
    if (this.dom.btnHardReset) {
      this.dom.btnHardReset.onclick = () => {
        if (confirm('Are you sure? This will DELETE ALL progress!')) {
          localStorage.removeItem(Config.saveKey);
          location.reload();
        }
      };
    }

    // --- Event Delegation for dynamically-rebuilt grids ---
    // Academy buy mode buttons
    document.querySelectorAll('.buy-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.buy-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const val = btn.dataset.amount;
        this.buyAmount = val === 'max' ? 'max' : parseInt(val);
        this._lastUpgradeHash = null; // Force re-render
        this.renderUpgrades();
      });
    });

    // Academy upgrades (rebuilt every tick)
    if (this.dom.academyGrid) {
      this.dom.academyGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.upgrade-btn');
        if (!btn || btn.classList.contains('maxed')) return;
        const upgradeId = btn.dataset.upgradeId;
        if (!upgradeId) return;

        const template = UpgradeDatabase.find(u => u.id === upgradeId);
        if (!template) return;

        // Determine how many levels to buy
        let levelsToBuy = 1;
        const currentLvl = GameState.data.upgrades[upgradeId] || 0;
        const remaining = template.maxLevel - currentLvl;

        if (this.buyAmount === 'max') {
          // Buy as many as we can afford
          levelsToBuy = 0;
          let testLvl = currentLvl;
          let testCoins = GameState.data.coins;
          while (testLvl < template.maxLevel) {
            const c = getUpgradeCost(upgradeId, testLvl);
            if (testCoins < c) break;
            testCoins -= c;
            testLvl++;
            levelsToBuy++;
          }
        } else {
          levelsToBuy = Math.min(this.buyAmount, remaining);
        }

        if (levelsToBuy <= 0) return;

        // Calculate total cost and verify
        let totalCost = 0;
        let lvl = currentLvl;
        for (let i = 0; i < levelsToBuy; i++) {
          totalCost += getUpgradeCost(upgradeId, lvl + i);
        }

        if (GameState.data.coins >= totalCost) {
          GameState.data.coins -= totalCost;
          GameState.data.upgrades[upgradeId] = currentLvl + levelsToBuy;
          if (levelsToBuy > 1) {
            this.showNotification(`${template.name} +${levelsToBuy} levels!`);
          }
          this.updateStats();
        }
      });
    }

    // Shop (rebuilt every 3s) — multi-currency
    if (this.dom.shopGrid) {
      this.dom.shopGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.shop-buy-btn');
        if (!btn || btn.classList.contains('sold-out')) return;
        const shopId = btn.dataset.shopId;
        if (!shopId) return;
        const item = ShopDatabase.find(s => s.id === shopId);
        if (!item) return;
        const currency = item.currency || 'gems';
        let success = false;
        if (currency === 'gems') success = GameState.spendGems(item.cost);
        else if (currency === 'coins') success = GameState.spendCoins(item.cost);
        else if (currency === 'stardust') success = GameState.spendStardust(item.cost);
        else if (currency === 'essence') success = GameState.spendEssence(item.cost);
        if (success) {
          if (!GameState.data.shopPurchases) GameState.data.shopPurchases = {};
          GameState.data.shopPurchases[item.id] = (GameState.data.shopPurchases[item.id] || 0) + 1;
          this.showNotification(`Purchased ${item.icon} ${item.name}!`);
          this.renderShop();
          this.updateStats();
        }
      });
    }

    // Prestige upgrades (rebuilt every 3s)
    if (this.dom.prestigeBonusesGrid) {
      this.dom.prestigeBonusesGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.prestige-upg-btn');
        if (!btn || btn.disabled) return;
        const upgId = btn.dataset.prestigeId;
        if (!upgId) return;
        const upg = PrestigeUpgrades.find(u => u.id === upgId);
        if (!upg) return;
        const lvl = (GameState.data.prestigeUpgrades || {})[upgId] || 0;
        const cost = upg.essenceCost(lvl);
        if (GameState.spendEssence(cost)) {
          if (!GameState.data.prestigeUpgrades) GameState.data.prestigeUpgrades = {};
          GameState.data.prestigeUpgrades[upgId] = lvl + 1;
          this.showNotification(`${upg.icon} ${upg.name} upgraded to Lv.${GameState.data.prestigeUpgrades[upgId]}!`);
          this.renderPrestige();
        }
      });
    }

    // Enemy Click
    if (this.dom.enemyContainer) {
      this.dom.enemyContainer.onclick = (e) => {
        // Incremental click power: scales with level, stage, and party
        const profile = GameState.data.profile || { level: 1 };
        const stage = GameState.data.currentStage;
        const basePowerUpg = getUpgradeEffect("upg_base_power", GameState.data.upgrades["upg_base_power"] || 0);
        const baseDmg = 1 + (profile.level - 1) * 2 + Math.floor(stage / 3) + basePowerUpg;
        const clickPower = baseDmg + this.getPartyDps() * 0.15;
        EventBus.emit('manualClick', { power: clickPower, x: e.clientX, y: e.clientY });
      };
    }
  }

  // ============================================
  // CATEGORY → TAB MAPPING & TAB SWITCHING
  // ============================================
  static CATEGORY_TABS = {
    combat: [
      { id: 'tab-combat', label: 'Combat' },
    ],
    heroes: [
      { id: 'tab-roster', label: 'Roster' },
      { id: 'tab-tavern', label: 'Tavern' },
      { id: 'tab-inventory', label: 'Inventory' },
      { id: 'tab-runes', label: 'Runes' },
      { id: 'tab-crafting', label: 'Crafting' },
      { id: 'tab-storage', label: 'Storage' },
    ],
    power: [
      { id: 'tab-academy', label: 'Academy' },
      { id: 'tab-tower', label: 'Tower' },
      { id: 'tab-shop', label: 'Shop' },
      { id: 'tab-prestige', label: 'Prestige' },
      { id: 'tab-spin', label: 'Wheel' },
      { id: 'tab-talents', label: 'Talents' },
    ],
    world: [
      { id: 'tab-events', label: 'Events' },
      { id: 'tab-quests', label: 'Quests' },
      { id: 'tab-expeditions', label: 'Expeditions' },
      { id: 'tab-collections', label: 'Collections' },
      { id: 'tab-lore', label: 'Codex' },
      { id: 'tab-bestiary', label: 'Bestiary' },
      { id: 'tab-pets', label: 'Pets' },
      { id: 'tab-bossrush', label: 'Boss Rush' },
      { id: 'tab-dungeon', label: 'Dungeon' },
      { id: 'tab-minigames', label: 'Arcade' },
      { id: 'tab-challenges', label: 'Challenges' },
      { id: 'tab-banners', label: 'Banners' },
    ],
    more: [
      { id: 'tab-profile', label: 'Profile' },
      { id: 'tab-stats', label: 'Stats' },
      { id: 'tab-achievements', label: 'Achievements' },
      { id: 'tab-mastery', label: 'Mastery' },
      { id: 'tab-settings', label: 'Settings' },
    ],
  };

  _setupTabs() {
    this.dom.navItems.forEach(navItem => {
      navItem.addEventListener('click', () => {
        const category = navItem.dataset.category;
        // Update active nav
        this.dom.navItems.forEach(n => n.classList.remove('active'));
        navItem.classList.add('active');
        // Get tabs for this category
        const tabs = UIManager.CATEGORY_TABS[category] || [];
        // Render sub-tab bar
        this._renderSubTabs(category, tabs);
        // Show first tab
        if (tabs.length > 0) {
          this._showTab(tabs[0].id);
        }
      });
    });
  }

  _renderSubTabs(category, tabs) {
    if (!this.dom.subTabBar) return;
    if (tabs.length <= 1) {
      this.dom.subTabBar.innerHTML = '';
      this.dom.subTabBar.style.display = 'none';
      return;
    }
    this.dom.subTabBar.style.display = 'flex';
    this.dom.subTabBar.innerHTML = tabs.map((t, i) =>
      `<button class="sub-tab-btn ${i === 0 ? 'active' : ''}" data-tab-id="${t.id}">${t.label}</button>`
    ).join('');
    this.dom.subTabBar.querySelectorAll('.sub-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.dom.subTabBar.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this._showTab(btn.dataset.tabId);
      });
    });
  }

  _showTab(tabId) {
    this.dom.tabContents.forEach(tc => tc.classList.remove('active'));
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');
    // Render content for the newly shown tab
    this._onTabShown(tabId);
  }

  _onTabShown(tabId) {
    switch (tabId) {
      case 'tab-combat': this.renderHeroCombat(); this.renderActiveParty(); this.renderSynergies(); this.renderStageProgress(); this.renderHeroStatsPanel(); break;
      case 'tab-roster': this.renderRoster(); break;
      case 'tab-tavern': this.renderTavernPool(); break;
      case 'tab-inventory': this.renderInventory(); break;
      case 'tab-runes': this.renderRunes(); break;
      case 'tab-storage': this.renderStorage(); break;
      case 'tab-crafting': this.renderCrafting(); break;
      case 'tab-academy': this._lastUpgradeHash = null; this.renderUpgrades(); break;
      case 'tab-tower': this.renderTower(); break;
      case 'tab-shop': this.renderShop(); break;
      case 'tab-prestige': this.renderPrestige(); break;
      case 'tab-spin': this.renderSpinWheel(); break;
      case 'tab-events': this.renderEvents(); this.renderDailyLogin(); break;
      case 'tab-quests': this.renderDailyQuests(); break;
      case 'tab-expeditions': this.renderExpeditions(); break;
      case 'tab-collections': this.renderCollections(); break;
      case 'tab-lore': this.renderLore(); break;
      case 'tab-bestiary': this.renderBestiary(); break;
      case 'tab-pets': this.renderPets(); break;
      case 'tab-bossrush': this.renderBossRush(); break;
      case 'tab-dungeon': this.renderDungeon(); break;
      case 'tab-minigames': this.renderMiniGames(); break;
      case 'tab-profile': this.renderProfile(); this.renderAvatarGrid(); break;
      case 'tab-stats': this.renderStats(); break;
      case 'tab-achievements': this.renderAchievements(); break;
      case 'tab-settings': this.initSettings(); break;
      case 'tab-talents': this.renderTalents(); break;
      case 'tab-mastery': this.renderMastery(); break;
      case 'tab-challenges': this.renderChallenges(); break;
      case 'tab-banners': this.renderBanners(); break;
    }
  }

  // ============================================
  // INIT — Called by Engine.start()
  // ============================================
  init() {
    this._setupTabs();
    this.initSettings();
    this.updateStats();
    this.renderActiveParty();
    this.renderHeroCombat();
    this.renderHeroStatsPanel();
    this.renderUpgrades();
    this.renderRoster();
    this.renderFamiliar();
    this.renderGuide();
    this.renderSynergies();
    this.renderStageProgress();
    this.renderTower();
    this.renderProfile();
    this.renderAvatarGrid();
    this.renderDailyLogin();
    this.checkAchievements();
    this.updateTabBadges();
    this.showWelcomeGifts();

    // Periodic render updates (less frequent)
    this._slowRenderTimer = setInterval(() => {
      this.renderUpgrades();
      this.renderFamiliar();
      this.renderStageProgress();
      this.renderProfile();
      this.checkAchievements();
      this.updateTabBadges();
    }, 3000);
  }

  // ============================================
  // RENDER ENEMY — Called by Engine
  // ============================================
  renderEnemy(enemyInfo, element, aura) {
    if (this.dom.enemyName) this.dom.enemyName.textContent = enemyInfo.name;
    if (this.dom.enemyVisual) {
      this.dom.enemyVisual.innerHTML = enemyInfo.svg || '';
      const svgEl = this.dom.enemyVisual.querySelector('svg');
      if (svgEl) {
        svgEl.classList.add('enemy-blob');
        if (enemyInfo.isBoss) svgEl.classList.add('boss-true');
        if (enemyInfo.isElite) svgEl.classList.add('elite-true');
        svgEl.style.color = enemyInfo.color || '#fff';
        if (enemyInfo.isBoss) {
          svgEl.style.filter = `drop-shadow(0 0 12px ${enemyInfo.color || '#ff0'})`;
        }
        if (enemyInfo.isElite) {
          svgEl.style.filter = `drop-shadow(0 0 10px #ffca28) drop-shadow(0 0 20px #ff9100)`;
        }
      }
    }
    // Element indicator
    if (element) {
      const ELEM_COLORS = { fire: '#ff5722', ice: '#00e5ff', shadow: '#9c27b0', light: '#ffca28', void: '#7c4dff' };
      const ELEM_ICONS = { fire: '🔥', ice: '❄️', shadow: '🌑', light: '✨', void: '🌀' };
      const elemIndicator = document.getElementById('enemy-element-indicator');
      if (elemIndicator) {
        elemIndicator.style.display = '';
        elemIndicator.innerHTML = `<span style="color:${ELEM_COLORS[element] || '#fff'}">${ELEM_ICONS[element] || ''} ${element}</span>`;
      }
    } else {
      const elemIndicator = document.getElementById('enemy-element-indicator');
      if (elemIndicator) elemIndicator.style.display = 'none';
    }
    if (this.dom.currentStage) this.dom.currentStage.textContent = GameState.data.currentStage;
    this.updateHealthBar(GameState.data.currentEnemyHp, GameState.data.currentEnemyMaxHp);
  }

  // ============================================
  // UPDATE HEALTH BAR — Called by Engine
  // ============================================
  updateHealthBar(hp, maxHp) {
    const pct = maxHp > 0 ? Math.max(0, Math.min(100, (hp / maxHp) * 100)) : 0;
    if (this.dom.enemyHpFill) this.dom.enemyHpFill.style.width = `${pct}%`;
    if (this.dom.enemyHpText) this.dom.enemyHpText.textContent = `${formatNumber(Math.max(0, Math.ceil(hp)))} / ${formatNumber(Math.ceil(maxHp))}`;
  }

  // ============================================
  // UPDATE STATS — Called every tick by Engine
  // ============================================
  updateStats() {
    const state = GameState.data;
    if (this.dom.coinsDisplay) this.dom.coinsDisplay.textContent = formatNumber(Math.floor(state.coins));
    if (this.dom.stardustDisplay) this.dom.stardustDisplay.textContent = formatNumber(Math.floor(state.stardust));
    if (this.dom.gemsDisplay) this.dom.gemsDisplay.textContent = formatNumber(Math.floor(state.gems || 0));
    if (this.dom.essenceDisplay) this.dom.essenceDisplay.textContent = formatNumber(Math.floor(state.essence || 0));
    if (this.dom.currentStage) this.dom.currentStage.textContent = state.currentStage;

    // DPS display
    const partyDps = this.getPartyDps();
    if (this.dom.dpsDisplay) this.dom.dpsDisplay.textContent = `DPS: ${formatNumber(partyDps.toFixed(1))}`;

    // Click dmg display
    const profile = state.profile || { level: 1 };
    const basePowerUpg = getUpgradeEffect("upg_base_power", state.upgrades["upg_base_power"] || 0);
    const baseDmg = 1 + (profile.level - 1) * 2 + Math.floor(state.currentStage / 3) + basePowerUpg;
    const clickDmg = baseDmg + partyDps * 0.15;
    if (this.dom.clickDmgDisplay) this.dom.clickDmgDisplay.textContent = `Click: ${formatNumber(clickDmg.toFixed(1))}`;

    // Kills display
    if (this.dom.killsDisplay) this.dom.killsDisplay.textContent = `Kills: ${formatNumber(state.playerDamageStats.enemiesDefeated)}`;
  }

  // ============================================
  // UPDATE COMBO — Called by Engine
  // ============================================
  updateCombo(hits, tier) {
    if (!this.dom.comboDisplay) return;
    if (!hits || hits < 2) {
      this.dom.comboDisplay.style.display = 'none';
      return;
    }
    this.dom.comboDisplay.style.display = '';
    if (this.dom.comboHits) this.dom.comboHits.textContent = hits;
    if (this.dom.comboTier) {
      const tierNames = ['', 'Nice!', 'Great!', 'Amazing!', 'LEGENDARY!'];
      const tierColors = ['', 'var(--neon-green)', 'var(--neon-blue)', 'var(--neon-purple)', 'var(--neon-orange)'];
      const t = Math.min(tier || 0, tierNames.length - 1);
      this.dom.comboTier.textContent = tierNames[t] || '';
      this.dom.comboTier.style.color = tierColors[t] || '';
    }
  }

  // ============================================
  // UPDATE ENEMY STATUS EFFECTS — Called by Engine
  // ============================================
  updateEnemyStatusEffects(effects) {
    if (!this.dom.enemyStatusRow) return;
    if (!effects || effects.length === 0) {
      this.dom.enemyStatusRow.innerHTML = '';
      return;
    }
    this.dom.enemyStatusRow.innerHTML = effects.map(eff =>
      `<span class="status-effect-tag" style="border-color:${eff.color || '#888'};color:${eff.color || '#888'}" title="${eff.name || ''}">${eff.icon || '✦'}</span>`
    ).join('');
  }

  // ============================================
  // UPDATE ENEMY SHIELD — Called by Engine
  // ============================================
  updateEnemyShield(shieldHp) {
    if (!this.dom.shieldBar) return;
    if (!shieldHp || shieldHp <= 0) {
      this.dom.shieldBar.style.display = 'none';
      return;
    }
    this.dom.shieldBar.style.display = '';
    if (this.dom.shieldBarFill) this.dom.shieldBarFill.style.width = '100%';
    if (this.dom.shieldBarText) this.dom.shieldBarText.textContent = `🛡 ${formatNumber(Math.ceil(shieldHp))}`;
  }

  // ============================================
  // UPDATE ELEMENT INDICATOR — Shows advantage/disadvantage
  // ============================================
  updateElementIndicator(elMult, partyElements, enemyElement) {
    const indicator = document.getElementById('enemy-element-indicator');
    if (!indicator) return;
    if (!enemyElement) { indicator.style.display = 'none'; return; }

    const ELEM_ICONS = { fire: '🔥', ice: '❄️', shadow: '🌑', light: '✨', void: '🌀' };
    const ELEM_COLORS = { fire: '#ff5722', ice: '#00e5ff', shadow: '#9c27b0', light: '#ffca28', void: '#7c4dff' };

    let label = '';
    let color = ELEM_COLORS[enemyElement] || '#fff';
    if (elMult > 1.1) {
      label = `⚡ Super Effective! ×${elMult.toFixed(1)}`;
      color = 'var(--neon-green)';
    } else if (elMult < 0.9) {
      label = `🛡️ Resisted ×${elMult.toFixed(1)}`;
      color = 'var(--hp-red)';
    } else {
      label = `${ELEM_ICONS[enemyElement] || ''} ${enemyElement}`;
    }

    indicator.style.display = '';
    indicator.innerHTML = `<span style="color:${color}">${label}</span>`;
  }

  // ============================================
  // GET PARTY DPS — Used by constructor click handler & updateStats
  // ============================================
  getPartyDps() {
    const state = GameState.data;
    let partyDps = 0;
    state.activeParty.forEach(uid => {
      const heroData = state.roster.find(h => h.uid === uid);
      if (heroData) partyDps += getHeroStats(heroData).dps;
    });
    return partyDps;
  }

  // --- Skill Activation Visual ---
  showSkillActivation(heroData, skill) {
    // Flash skill icon on the party member
    const partyMembers = document.querySelectorAll('.party-member');
    const state = GameState.data;
    const idx = state.activeParty.indexOf(heroData.uid);
    if (idx >= 0 && partyMembers[idx]) {
      const member = partyMembers[idx];
      member.classList.add('skill-flash');
      setTimeout(() => member.classList.remove('skill-flash'), 600);

      // Show skill icon popup
      let popup = member.querySelector('.skill-popup');
      if (!popup) {
        popup = document.createElement('div');
        popup.className = 'skill-popup';
        member.appendChild(popup);
      }
      popup.innerHTML = `${skill.icon}`;
      popup.style.opacity = '1';
      popup.style.transform = 'translateY(-10px) scale(1.3)';
      setTimeout(() => {
        popup.style.opacity = '0';
        popup.style.transform = 'translateY(-30px) scale(0.8)';
      }, 500);
    }
  }

  // --- Tower UI Logic ---
  renderTower() {
    if (!this.dom.towerFloorDisplay) return;
    this.dom.towerFloorDisplay.textContent = `Floor: ${GameState.data.towerFloor}`;
  }

  renderTowerCombat(bossInfo) {
    this.dom.towerStartBtn.style.display = "none";
    this.dom.towerCombatArea.style.display = "flex";

    this.dom.towerBossName.textContent = bossInfo.name;
    this.dom.towerBossName.style.color = bossInfo.color;
    this.dom.towerBossVisual.innerHTML = bossInfo.svg;

    const svgEl = this.dom.towerBossVisual.querySelector("svg");
    if (svgEl) {
      svgEl.classList.add("enemy-blob");
      svgEl.classList.add("boss-true");
      svgEl.style.color = bossInfo.color;
      svgEl.style.filter = `drop-shadow(0 0 15px ${bossInfo.color})`;
    }

    this.updateTowerHealthBar(bossInfo.hp, bossInfo.hp);
    this.updateTowerTimer(bossInfo.timeLimit);
  }

  stopTowerCombat() {
    this.dom.towerStartBtn.style.display = "block";
    this.dom.towerCombatArea.style.display = "none";
    this.renderTower();
  }

  updateTowerHealthBar(currentHp, maxHp) {
    if (!maxHp) return;
    const pct = Math.max(0, (currentHp / maxHp) * 100);
    this.dom.towerHpFill.style.width = `${pct}%`;
    this.dom.towerHpText.textContent = `${formatNumber(Math.ceil(currentHp))} / ${formatNumber(maxHp)}`;

    const visual = this.dom.towerBossVisual.querySelector("svg");
    if (visual && currentHp > 0 && currentHp < maxHp) {
      visual.style.filter = "brightness(200%)";
      setTimeout(() => (visual.style.filter = ""), 100);
    }
  }

  updateTowerTimer(timeRemaining) {
    if (!this.dom.towerTimer) return;
    this.dom.towerTimer.textContent = `${Math.max(0, timeRemaining).toFixed(
      1
    )}s`;
  }

  // --- Lore UI Logic ---
  renderLore() {
    if (!this.dom.loreContainer) return;
    this.dom.loreContainer.innerHTML = "";

    LoreDatabase.forEach((entry) => {
      const unlocked = GameState.data.currentStage >= entry.unlockStage;
      const el = document.createElement("div");
      el.className = `lore-entry ${unlocked ? "" : "lore-locked"}`;

      el.innerHTML = `
              <div class="lore-title">${
                unlocked
                  ? entry.title
                  : `Locked - Reach Stage ${entry.unlockStage}`
              }</div>
              <div class="lore-text">${
                unlocked ? entry.text : `The pages of the Codex remain blank...`
              }</div>
          `;

      this.dom.loreContainer.appendChild(el);
    });
  }

  renderActiveParty() {
    this.dom.activeParty.innerHTML = "";
    const ELEM_ICONS = { fire: '🔥', ice: '❄️', shadow: '🌑', light: '✨', void: '🌀' };
    GameState.data.activeParty.forEach((uid) => {
      const hData = GameState.data.roster.find((h) => h.uid === uid);
      if (!hData) return;
      const template = HeroTemplate.find((t) => t.id === hData.id);
      const heroEl = getHeroElement(hData.id);
      const elIcon = heroEl ? `<span class="p-elem">${ELEM_ICONS[heroEl] || ''}</span>` : '';

      const el = document.createElement("div");
      el.className = "party-member";
      el.innerHTML = `
        <div class="p-svg" style="color: ${template.rarity.color}">${template.svg}</div>
        <div class="p-lvl">${elIcon}Lv.${hData.level}</div>
      `;
      this.dom.activeParty.appendChild(el);
    });
  }

  getFamiliarCost() {
    return Math.floor(100 * Math.pow(1.5, GameState.data.autoclickerLevel));
  }

  upgradeFamiliar() {
    const cost = this.getFamiliarCost();
    if (GameState.spendCoins(cost)) {
      GameState.data.autoclickerLevel++;
      this.updateStats();
    }
  }

  renderFamiliar() {
    if (!this.dom.familiarTitle) return;
    const lvl = GameState.data.autoclickerLevel;
    this.dom.familiarTitle.textContent = `Neon Familiar Lv.${lvl}`;
    this.dom.familiarCost.textContent = `Cost: ${formatNumber(this.getFamiliarCost())} C`;

    if (GameState.data.coins >= this.getFamiliarCost()) {
      this.dom.familiarBtn.style.opacity = "1";
    } else {
      this.dom.familiarBtn.style.opacity = "0.6";
    }
  }

  renderUpgrades() {
    if (!this.dom.academyGrid) return;

    // Dirty check — only rebuild if coins, upgrade levels, or buy mode changed
    const upgHash = JSON.stringify(GameState.data.upgrades) + '|' + Math.floor(GameState.data.coins) + '|' + this.buyAmount;
    if (this._lastUpgradeHash === upgHash) return;
    this._lastUpgradeHash = upgHash;

    this.dom.academyGrid.innerHTML = "";

    UpgradeDatabase.forEach((template) => {
      const lvl = GameState.data.upgrades[template.id] || 0;
      const isMaxed = lvl >= template.maxLevel;
      const remaining = template.maxLevel - lvl;

      // Calculate total cost based on buy mode
      let buyCount = 1;
      if (this.buyAmount === 'max') {
        buyCount = 0;
        let testLvl = lvl;
        let testCoins = GameState.data.coins;
        while (testLvl < template.maxLevel) {
          const c = getUpgradeCost(template.id, testLvl);
          if (testCoins < c) break;
          testCoins -= c;
          testLvl++;
          buyCount++;
        }
      } else {
        buyCount = Math.min(this.buyAmount, remaining);
      }

      let totalCost = 0;
      for (let i = 0; i < buyCount; i++) {
        totalCost += getUpgradeCost(template.id, lvl + i);
      }
      const canAfford = !isMaxed && buyCount > 0 && GameState.data.coins >= totalCost;
      const buyLabel = this.buyAmount === 'max' ? (buyCount > 0 ? `×${buyCount}` : '') : (this.buyAmount > 1 ? `×${buyCount}` : '');

      const card = document.createElement("div");
      card.className = "upgrade-card";
      card.style.borderColor = template.color;
      card.innerHTML = `
           <div class="upgrade-header">
               <div class="upgrade-icon" style="color: ${template.color}">${
        template.svg
      }</div>
               <div class="upgrade-title" style="color: ${template.color}">${
        template.name
      }</div>
           </div>
           <div class="upgrade-lvl">Lv.${lvl} / ${template.maxLevel}</div>
           <div class="upgrade-desc">${
             template.desc
           }<br/>Current Bonus: <span style="color: #fff">+${(
        getUpgradeEffect(template.id, lvl) *
        (template.effectPerLevel < 1 ? 100 : 1)
      ).toFixed(1)}%</span></div>
           <button class="upgrade-btn ${isMaxed ? "maxed" : ""} ${
        canAfford ? "can-buy" : ""
      }" data-upgrade-id="${template.id}">
               ${isMaxed ? "MAX LEVEL" : `Upgrade ${buyLabel} (${formatNumber(totalCost)} C)`}
           </button>
        `;

      this.dom.academyGrid.appendChild(card);
    });
  }

  renderRoster() {
    this.dom.rosterGrid.innerHTML = "";

    // Sort roster based on current sort mode
    const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 };
    const elemOrder = { fire: 0, ice: 1, shadow: 2, light: 3, void: 4 };
    const sorted = [...GameState.data.roster].sort((a, b) => {
      const tA = HeroTemplate.find(t => t.id === a.id);
      const tB = HeroTemplate.find(t => t.id === b.id);
      if (!tA || !tB) return 0;
      switch (this.rosterSort) {
        case 'rarity': {
          const d = (rarityOrder[tA.rarity.id] || 99) - (rarityOrder[tB.rarity.id] || 99);
          return d !== 0 ? d : b.level - a.level;
        }
        case 'level': return b.level - a.level;
        case 'dps': return getHeroStats(b).dps - getHeroStats(a).dps;
        case 'element': {
          const eA = getHeroElement(a.id) || 'zzz';
          const eB = getHeroElement(b.id) || 'zzz';
          const d = (elemOrder[eA] ?? 99) - (elemOrder[eB] ?? 99);
          return d !== 0 ? d : (rarityOrder[tA.rarity.id] || 99) - (rarityOrder[tB.rarity.id] || 99);
        }
        case 'recent': return b.uid.localeCompare(a.uid); // UIDs contain timestamps
        case 'equipped': {
          const aEq = GameState.data.activeParty.includes(a.uid) ? 0 : 1;
          const bEq = GameState.data.activeParty.includes(b.uid) ? 0 : 1;
          return aEq !== bEq ? aEq - bEq : (rarityOrder[tA.rarity.id] || 99) - (rarityOrder[tB.rarity.id] || 99);
        }
        default: return 0;
      }
    });

    sorted.forEach((hData) => {
      const template = HeroTemplate.find((t) => t.id === hData.id);
      if (!template) return;

      const isEquipped = GameState.data.activeParty.includes(hData.uid);
      const cost = getHeroLevelCost(hData.id, hData.level);
      const heroStats = getHeroStats(hData);
      const canAfford = GameState.data.coins >= cost;

      const card = document.createElement("div");
      card.className = `hero-card ${isEquipped ? "equipped" : ""}`;
      card.style.borderColor = template.rarity.color;

      // Ascension badge
      const ascLevel = hData.ascensionLevel || 0;
      const ascBadge = ascLevel > 0 ? `<span class="hero-ascension-badge">⭐${ascLevel}</span>` : '';

      // Build Equip Slots HTML
      const renderSlot = (slotName, categoryStr) => {
        const equipped = hData.equip[slotName];
        if (equipped) {
          const iStats = getItemStats(equipped);
          const runeCount = getRuneSlots(equipped.rarity);
          const socketedCount = equipped.runes ? equipped.runes.filter(Boolean).length : 0;
          const runeDots = runeCount > 0 ? `<div class="equip-rune-dots">${Array.from({length: runeCount}, (_, i) =>
            `<span class="rune-dot ${equipped.runes && equipped.runes[i] ? 'filled' : ''}">${equipped.runes && equipped.runes[i] ? '◆' : '◇'}</span>`
          ).join('')}</div>` : '';
          return `
               <div class="equip-slot filled" style="border-color:${iStats.rarity.color}; color:${iStats.rarity.color}" data-slot="${slotName}" data-cat="${categoryStr}">
                  ${iStats.svg}
                  <div class="equip-tooltip">${iStats.displayName || iStats.name}</div>
                  ${runeDots}
               </div>
             `;
        } else {
          return `
               <div class="equip-slot" data-slot="${slotName}" data-cat="${categoryStr}">
                 <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/></svg>
                 <div class="equip-tooltip">Equip ${categoryStr}</div>
               </div>
             `;
        }
      };

      // Build hero skills HTML
      const allSkills = getAllHeroSkills(hData.id);
      const skillsHtml = allSkills.length > 0 ? `
        <div class="hero-skills">
          ${allSkills.map(sk => {
            const unlocked = hData.level >= sk.unlockLevel;
            return `<div class="hero-skill ${unlocked ? 'unlocked' : 'locked'}" title="${sk.name}: ${sk.description}">
              <span class="skill-icon">${sk.icon}</span>
              <span class="skill-name">${sk.name}</span>
              ${unlocked ? '' : `<span class="skill-lock">Lv.${sk.unlockLevel}</span>`}
            </div>`;
          }).join('')}
        </div>` : '';

      card.innerHTML = `
        <div class="hero-header">
           <span style="color:${template.rarity.color}; font-weight:bold;">${template.name}</span>
           <span class="hero-lvl">Lv.${hData.level} ${ascBadge}</span>
        </div>
        <div class="hero-visual">${template.svg}</div>
        <div class="hero-stats">
           <span>DPS: ${heroStats.dps.toFixed(1)}</span>
           <span style="color:${template.rarity.color}; font-size:0.7em;">${
        template.rarity.name
      }</span>
        </div>
        <div class="hero-equip-slots">
           ${renderSlot("weapon", ItemCategories.WEAPON)}
           ${renderSlot("armor", ItemCategories.ARMOR)}
           ${renderSlot("acc", ItemCategories.ACCESSORY)}
        </div>
        ${skillsHtml}
        <div class="hero-actions">
           <button class="action-btn equip-btn">${
             isEquipped ? "Unequip" : "Equip"
           }</button>
           <button class="action-btn lvl-btn ${canAfford ? "can-buy" : ""}" ${
        !canAfford ? "disabled" : ""
      }>
              Lvl Up (${cost} C)
           </button>
        </div>
      `;

      // Equip Logic (Hero to Party)
      card.querySelector(".equip-btn").onclick = () => {
        if (isEquipped) {
          GameState.data.activeParty = GameState.data.activeParty.filter(
            (u) => u !== hData.uid
          );
        } else {
          if (GameState.data.activeParty.length < 5) {
            GameState.data.activeParty.push(hData.uid);
          } else {
            this.showNotification("Party is full! (Max 5)");
            return;
          }
        }
        this.renderRoster();
        this.renderActiveParty();
      };

      // Level up logic
      card.querySelector(".lvl-btn").onclick = () => {
        if (GameState.spendCoins(cost)) {
          hData.level++;
          this.updateStats();
          this.renderRoster();
        }
      };

      // Slot clicking
      card.querySelectorAll(".equip-slot").forEach((slotEl) => {
        slotEl.onclick = () => {
          this.pendingEquip = {
            heroUid: hData.uid,
            slot: slotEl.dataset.slot,
            category: slotEl.dataset.cat,
          };
          this.openItemSelector();
        };
      });

      this.dom.rosterGrid.appendChild(card);
    });
  }

  openItemSelector() {
    this.selectOverlay.classList.add("active");
    const grid = document.getElementById("select-modal-grid");
    grid.innerHTML = "";

    const validItems = GameState.data.inventory.filter((item) => {
      const t = ItemTemplate.find((tmp) => tmp.id === item.templateId);
      return t && t.category === this.pendingEquip.category;
    });

    if (validItems.length === 0) {
      grid.innerHTML = `<p>No items in inventory for this slot.</p>`;
      return;
    }

    validItems.forEach((item) => {
      const stats = getItemStats(item);
      const el = document.createElement("div");
      el.className = "inv-item";
      el.style.borderColor = stats.rarity.color;
      el.style.color = stats.rarity.color;
      el.innerHTML = stats.svg;

      el.onclick = () => {
        GameState.equipItem(
          this.pendingEquip.heroUid,
          item.uid,
          this.pendingEquip.slot
        );
        this.selectOverlay.classList.remove("active");
        this.pendingEquip = null;
        this.updateStats();
        this.renderRoster();
        this.renderInventory();
      };
      grid.appendChild(el);
    });
  }

  renderInventory() {
    this.dom.invWeapons.innerHTML = "";
    this.dom.invArmor.innerHTML = "";
    this.dom.invAccessories.innerHTML = "";

    // Check if items are equipped
    const equippedUids = new Set();
    GameState.data.roster.forEach(h => {
      Object.values(h.equip || {}).forEach(e => { if (e) equippedUids.add(e.uid); });
    });

    GameState.data.inventory.forEach((item) => {
      const stats = getItemStats(item);
      const isEquipped = equippedUids.has(item.uid);
      const el = document.createElement("div");
      el.className = "inv-item";
      el.style.borderColor = stats.rarity.color;
      el.style.color = stats.rarity.color;

      // Sell mode: show value and toggle select
      if (this.sellMode && !isEquipped) {
        const sellVal = this.getItemSellValue(item);
        const isSelected = this._selectedForSale && this._selectedForSale.has(item.uid);
        el.classList.toggle('sell-selected', isSelected);
        el.innerHTML = `${stats.svg}<span class="sell-value">${sellVal}c</span>`;
        el.onclick = () => {
          if (this._selectedForSale.has(item.uid)) {
            this._selectedForSale.delete(item.uid);
            el.classList.remove('sell-selected');
          } else {
            this._selectedForSale.add(item.uid);
            el.classList.add('sell-selected');
          }
        };
      } else {
        el.innerHTML = stats.svg;
        el.title = `${stats.displayName || stats.name} (${stats.rarity.name})`;
        // Hover tooltip
        el.addEventListener('mouseenter', (e) => this.showItemTooltip(e, item));
        el.addEventListener('mouseleave', () => this.hideItemTooltip());
      }

      if (stats.category === ItemCategories.WEAPON)
        this.dom.invWeapons.appendChild(el);
      else if (stats.category === ItemCategories.ARMOR)
        this.dom.invArmor.appendChild(el);
      else if (stats.category === ItemCategories.ACCESSORY)
        this.dom.invAccessories.appendChild(el);
    });

    // If sell mode is active and items selected, show "Sell Selected" floating button
    if (this.sellMode && this._selectedForSale && this._selectedForSale.size > 0) {
      // Append sell confirm button to inventory section
      const confirmBtn = document.createElement('button');
      confirmBtn.className = 'glow-btn sell-confirm-btn';
      confirmBtn.textContent = `Sell ${this._selectedForSale.size} Items`;
      confirmBtn.onclick = () => this.sellSelectedItems();
      const invSection = document.getElementById('tab-inventory');
      if (invSection) {
        const existing = invSection.querySelector('.sell-confirm-btn');
        if (existing) existing.remove();
        invSection.appendChild(confirmBtn);
      }
    } else {
      const invSection = document.getElementById('tab-inventory');
      if (invSection) {
        const existing = invSection.querySelector('.sell-confirm-btn');
        if (existing) existing.remove();
      }
    }
  }

  // ============================================
  // RUNES TAB
  // ============================================
  renderRunes() {
    const state = GameState.data;
    const runes = state.runes || [];
    const grid = document.getElementById('rune-inv-grid');
    const emptyMsg = document.getElementById('rune-inv-empty');
    const socketPanel = document.getElementById('rune-socket-panel');
    if (!grid) return;

    // Render rune inventory
    if (runes.length === 0) {
      grid.innerHTML = '';
      if (emptyMsg) emptyMsg.style.display = '';
    } else {
      if (emptyMsg) emptyMsg.style.display = 'none';
      grid.innerHTML = runes.map(rune => {
        const info = getRuneInfo(rune);
        if (!info) return '';
        return `<div class="rune-item" data-rune-uid="${rune.uid}" style="border-color:${info.tierData.color}; color:${info.typeData.color}" title="${info.displayName}\n${info.desc}">
          <div class="rune-icon">${info.typeData.icon}</div>
          <div class="rune-svg" style="color:${info.tierData.color}">${info.svg}</div>
          <div class="rune-name">${info.tierData.name}</div>
          <div class="rune-stat">${info.desc}</div>
        </div>`;
      }).join('');
    }

    // Render socket panel: show all equipped items across all heroes
    if (!socketPanel) return;
    const equippedItems = [];
    for (const hero of state.roster) {
      if (!hero.equip) continue;
      const template = HeroTemplate.find(h => h.id === hero.id);
      for (const slot of ['weapon', 'armor', 'acc']) {
        if (hero.equip[slot]) {
          const item = hero.equip[slot];
          const stats = getItemStats(item);
          const slots = getRuneSlots(item.rarity);
          equippedItems.push({ hero, heroName: template?.name || hero.id, item, stats, slots, slot });
        }
      }
    }

    if (equippedItems.length === 0) {
      socketPanel.innerHTML = '<p class="empty-msg">No equipped items found. Equip items on heroes first.</p>';
      return;
    }

    socketPanel.innerHTML = equippedItems.map(({ hero, heroName, item, stats, slots, slot }) => {
      if (slots === 0) return `<div class="rune-socket-card no-slots">
        <div class="rune-socket-header">${heroName} — <span style="color:${stats.rarity.color}">${stats.displayName}</span></div>
        <div class="rune-no-slots">No rune slots (requires Rare+)</div>
      </div>`;

      const runeSlots = [];
      for (let i = 0; i < slots; i++) {
        const socketed = item.runes && item.runes[i];
        if (socketed) {
          const ri = getRuneInfo(socketed);
          runeSlots.push(`<div class="rune-slot filled" data-item-uid="${item.uid}" data-slot-idx="${i}" title="Click to unsocket">
            <span class="rune-slot-icon" style="color:${ri.typeData.color}">${ri.typeData.icon}</span>
            <span class="rune-slot-name">${ri.tierData.name} ${ri.typeData.name}</span>
            <span class="rune-slot-bonus">${ri.desc}</span>
          </div>`);
        } else {
          runeSlots.push(`<div class="rune-slot empty" data-item-uid="${item.uid}" data-slot-idx="${i}" title="Click to socket a rune">
            <span class="rune-slot-icon">◇</span>
            <span class="rune-slot-name">Empty Slot</span>
          </div>`);
        }
      }

      return `<div class="rune-socket-card">
        <div class="rune-socket-header">${heroName} — <span style="color:${stats.rarity.color}">${stats.displayName}</span></div>
        <div class="rune-slots-row">${runeSlots.join('')}</div>
      </div>`;
    }).join('');

    // Bind events: click empty slot → pick rune from inventory
    socketPanel.querySelectorAll('.rune-slot.empty').forEach(el => {
      el.onclick = () => {
        const itemUid = el.dataset.itemUid;
        const slotIdx = parseInt(el.dataset.slotIdx);
        this.openRuneSelector(itemUid, slotIdx);
      };
    });

    // Bind events: click filled slot → unsocket
    socketPanel.querySelectorAll('.rune-slot.filled').forEach(el => {
      el.onclick = () => {
        const itemUid = el.dataset.itemUid;
        const slotIdx = parseInt(el.dataset.slotIdx);
        GameState.unsocketRune(itemUid, slotIdx);
        this.renderRunes();
        this.showNotification('Rune unsocketed!');
      };
    });
  }

  openRuneSelector(itemUid, slotIndex) {
    const runes = GameState.data.runes || [];
    if (runes.length === 0) {
      this.showNotification('No runes available to socket!');
      return;
    }
    const overlay = document.getElementById('select-overlay');
    const grid = document.getElementById('select-modal-grid');
    const closeBtn = document.getElementById('select-modal-close');
    if (!overlay || !grid) return;

    grid.innerHTML = runes.map(rune => {
      const info = getRuneInfo(rune);
      if (!info) return '';
      return `<div class="inv-item rune-select-item" data-rune-uid="${rune.uid}" style="background:rgba(0,0,0,0.4);border:2px solid ${info.tierData.color};cursor:pointer" title="${info.displayName}\n${info.desc}">
        <div style="font-size:1.4rem">${info.typeData.icon}</div>
        <div style="font-size:0.7rem;color:${info.tierData.color}">${info.tierData.name}</div>
        <div style="font-size:0.65rem;color:${info.typeData.color}">${info.desc}</div>
      </div>`;
    }).join('');

    overlay.classList.add('active');

    grid.querySelectorAll('.rune-select-item').forEach(el => {
      el.onclick = () => {
        const runeUid = el.dataset.runeUid;
        GameState.socketRune(itemUid, runeUid, slotIndex);
        overlay.classList.remove('active');
        this.renderRunes();
        this.showNotification('Rune socketed!');
      };
    });

    closeBtn.onclick = () => overlay.classList.remove('active');
  }

  summonHero(type) {
    if (type === "coin") {
      if (!GameState.spendCoins(Config.coinSummonCost)) return;
    } else {
      if (!GameState.spendStardust(Config.gachaCost)) return;
    }

    // Gacha Logic
    const rand = Math.random();
    let rarityPool = Rarities.COMMON;

    if (type === "coin") {
      if (rand > 0.9) rarityPool = Rarities.RARE; // 10% rare
    } else {
      // Star summon: Rare+, 20% Epic, 2% Legendary
      if (rand > 0.98) rarityPool = Rarities.LEGENDARY;
      else if (rand > 0.8) rarityPool = Rarities.EPIC;
      else rarityPool = Rarities.RARE;
    }

    const possibleHeros = HeroTemplate.filter((h) => h.rarity === rarityPool);
    const chosen =
      possibleHeros[Math.floor(Math.random() * possibleHeros.length)];

    GameState.addHero(chosen.id);

    AudioManager.playSummon();
    this.showNotification(`Summoned ${chosen.name} (${rarityPool.name})!`);
    this.updateStats();
    this.renderRoster();
  }

  // --- Stats Dashboard ---
  renderStats() {
    const s = GameState.data.playerDamageStats;
    const elapsed = s.totalPlayTimeMs / 1000;

    if (this.dom.statsCombat) {
      const critRate = s.totalClicks > 0 ? ((s.criticalHits / s.totalClicks) * 100).toFixed(1) : '0.0';
      this.dom.statsCombat.innerHTML = `
          <div class="stat-card"><span class="stat-value">${formatNumber(s.totalDamageDealt)}</span><span class="stat-label">Total Damage</span></div>
          <div class="stat-card"><span class="stat-value">${formatNumber(s.enemiesDefeated)}</span><span class="stat-label">Enemies Defeated</span></div>
          <div class="stat-card"><span class="stat-value">${formatNumber(s.bossesDefeated)}</span><span class="stat-label">Bosses Defeated</span></div>
          <div class="stat-card"><span class="stat-value">${formatNumber(s.totalClicks)}</span><span class="stat-label">Total Clicks</span></div>
          <div class="stat-card"><span class="stat-value">${formatNumber(s.criticalHits)}</span><span class="stat-label">Critical Hits</span></div>
          <div class="stat-card"><span class="stat-value">${critRate}%</span><span class="stat-label">Crit Rate</span></div>
      `;
    }

    if (this.dom.statsEconomy) {
      this.dom.statsEconomy.innerHTML = `
          <div class="stat-card"><span class="stat-value">${formatNumber(Math.floor(GameState.data.coins))}</span><span class="stat-label">Current Coins</span></div>
          <div class="stat-card"><span class="stat-value">${formatNumber(s.totalCoinsEarned)}</span><span class="stat-label">Coins Earned (All Time)</span></div>
          <div class="stat-card"><span class="stat-value">${formatNumber(Math.floor(GameState.data.stardust))}</span><span class="stat-label">Current Stardust</span></div>
          <div class="stat-card"><span class="stat-value">${formatNumber(s.totalStardustEarned)}</span><span class="stat-label">Stardust Earned (All Time)</span></div>
          <div class="stat-card"><span class="stat-value">${formatNumber(Math.floor(GameState.data.gems || 0))}</span><span class="stat-label">Current Gems</span></div>
          <div class="stat-card"><span class="stat-value">${formatNumber(s.totalGemsEarned || 0)}</span><span class="stat-label">Gems Earned (All Time)</span></div>
          <div class="stat-card"><span class="stat-value">${formatNumber(Math.floor(GameState.data.essence || 0))}</span><span class="stat-label">Current Essence</span></div>
          <div class="stat-card"><span class="stat-value">${formatNumber(s.totalEssenceEarned || 0)}</span><span class="stat-label">Essence Earned (All Time)</span></div>
      `;
    }

    if (this.dom.statsProgression) {
      const completedCollections = CollectionDatabase.filter(col => {
        const gameData = { roster: GameState.data.roster, bestiary: GameState.data.bestiary || {}, inventory: GameState.data.inventory };
        return getCollectionStatus(col, gameData).completed;
      }).length;
      const activeEvts = getActiveEvents().length;
      const storageCount = (GameState.data.storage || []).length;

      this.dom.statsProgression.innerHTML = `
          <div class="stat-card"><span class="stat-value">${GameState.data.currentStage}</span><span class="stat-label">Current Stage</span></div>
          <div class="stat-card"><span class="stat-value">${s.highestStage}</span><span class="stat-label">Highest Stage</span></div>
          <div class="stat-card"><span class="stat-value">${s.highestTowerFloor}</span><span class="stat-label">Highest Tower Floor</span></div>
          <div class="stat-card"><span class="stat-value">${s.heroesRecruited}</span><span class="stat-label">Heroes Recruited</span></div>
          <div class="stat-card"><span class="stat-value">${s.itemsFound}</span><span class="stat-label">Items Found</span></div>
          <div class="stat-card"><span class="stat-value">${formatTime(Math.floor(elapsed))}</span><span class="stat-label">Total Play Time</span></div>
          <div class="stat-card"><span class="stat-value">${GameState.data.prestigeCount || 0}</span><span class="stat-label">Prestiges</span></div>
          <div class="stat-card"><span class="stat-value">${completedCollections}/${CollectionDatabase.length}</span><span class="stat-label">Collections</span></div>
          <div class="stat-card"><span class="stat-value">${activeEvts}</span><span class="stat-label">Active Events</span></div>
          <div class="stat-card"><span class="stat-value">${storageCount}/50</span><span class="stat-label">Storage Used</span></div>
      `;
    }

    if (this.dom.statsParty) {
      const partyDps = this.getPartyDps();
      const dpsMult = 1 + getUpgradeEffect("upg_global_dps", GameState.data.upgrades["upg_global_dps"] || 0);
      const synBonuses = getSynergyBonuses(GameState.data.activeParty, GameState.data.roster);
      const skillBonuses = getPartySkillBonuses(GameState.data.activeParty, GameState.data.roster);
      const totalDps = partyDps * dpsMult * (1 + synBonuses.dpsBonus) * (1 + (skillBonuses.dpsBonus || 0));
      const rosterCount = GameState.data.roster.length;
      const partyCount = GameState.data.activeParty.length;
      const invCount = GameState.data.inventory.length;
      const activeSynCount = synBonuses.active.length;

      // Current loop/tier info
      const currentLoop = Math.floor((GameState.data.currentStage - 1) / EnemyDatabase.length);
      const activeSkills = Object.values(skillBonuses).filter(v => v > 0).length;

      let partyHtml = `
        <div class="stat-card"><span class="stat-value">${formatNumber(totalDps)}</span><span class="stat-label">Total DPS</span></div>
        <div class="stat-card"><span class="stat-value">${partyCount} / 5</span><span class="stat-label">Active Party</span></div>
        <div class="stat-card"><span class="stat-value">${rosterCount}</span><span class="stat-label">Heroes Owned</span></div>
        <div class="stat-card"><span class="stat-value">${invCount}</span><span class="stat-label">Items Owned</span></div>
        <div class="stat-card"><span class="stat-value">Lv.${GameState.data.autoclickerLevel}</span><span class="stat-label">Familiar Level</span></div>
        <div class="stat-card"><span class="stat-value">${activeSynCount}</span><span class="stat-label">Active Synergies</span></div>
        <div class="stat-card"><span class="stat-value">${activeSkills}</span><span class="stat-label">Active Skills</span></div>
        <div class="stat-card"><span class="stat-value">${currentLoop > 0 ? 'Tier ' + currentLoop : '—'}</span><span class="stat-label">Enemy Tier</span></div>
      `;

      this.dom.statsParty.innerHTML = partyHtml;
    }
  }

  showClickFeedback(x, y, amount, isCrit) {
    if (!GameState.data.settings.showDamageNumbers) return;
    if (GameState.data.settings.noFloatText) return;

    // Limit max concurrent floating texts to prevent spam
    const existing = this.dom.feedbackLayer.children.length;
    if (existing > 12) {
      // Remove oldest ones
      while (this.dom.feedbackLayer.children.length > 8) {
        this.dom.feedbackLayer.firstChild.remove();
      }
    }

    const fb = document.createElement("div");
    fb.className = `floating-text ${isCrit ? "crit" : ""}`;
    fb.textContent = `${isCrit ? "CRIT " : ""}${formatNumber(amount)}`;

    const ox = x - 20 + (Math.random() * 40 - 20);
    const oy = y - 20 + (Math.random() * 20 - 10);

    fb.style.left = `${ox}px`;
    fb.style.top = `${oy}px`;
    this.dom.feedbackLayer.appendChild(fb);

    // Ensure cleanup
    const removeTimeout = isCrit ? 1200 : 900;
    setTimeout(() => {
      if (fb.parentNode) fb.remove();
    }, removeTimeout);

    // Screen shake on crit
    if (isCrit) this.triggerScreenShake();
  }

  showNotification(msg) {
    if (!GameState.data.settings.showNotifications) return;

    // Add to history (cap at 30)
    const now = Date.now();
    this._notifHistory.unshift({ msg, time: now });
    if (this._notifHistory.length > 30) this._notifHistory.length = 30;

    // Update unread badge
    this._notifUnread++;
    this._updateNotifBadge();

    // Show toast (latest message)
    this._showToast(msg);

    // If dropdown is open, refresh its list
    if (this._dropdownOpen) this._renderNotifList();
  }

  _showToast(msg) {
    const toast = this.dom.notifToast;
    if (!toast) return;
    clearTimeout(this._toastTimer);
    toast.textContent = msg;
    toast.classList.remove("hidden");
    // Re-trigger animation
    toast.style.animation = "none";
    toast.offsetHeight; // reflow
    toast.style.animation = "";
    this._toastTimer = setTimeout(() => {
      toast.classList.add("hidden");
    }, 3000);
  }

  _updateNotifBadge() {
    const badge = this.dom.notifBadge;
    if (!badge) return;
    if (this._notifUnread > 0) {
      badge.textContent = this._notifUnread > 99 ? "99+" : this._notifUnread;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }

  _toggleNotifDropdown() {
    if (this._dropdownOpen) {
      this._closeNotifDropdown();
    } else {
      this._openNotifDropdown();
    }
  }

  _openNotifDropdown() {
    this._dropdownOpen = true;
    this._notifUnread = 0;
    this._updateNotifBadge();
    this._renderNotifList();
    this.dom.notifDropdown.classList.remove("hidden");
    // Hide toast when dropdown is open
    this.dom.notifToast.classList.add("hidden");
    clearTimeout(this._toastTimer);
  }

  _closeNotifDropdown() {
    this._dropdownOpen = false;
    this.dom.notifDropdown.classList.add("hidden");
  }

  _renderNotifList() {
    const list = this.dom.notifList;
    if (!list) return;
    if (this._notifHistory.length === 0) {
      list.innerHTML = '<div class="notif-empty">Sin notificaciones</div>';
      return;
    }
    const now = Date.now();
    list.innerHTML = this._notifHistory.map(n => {
      const ago = this._formatTimeAgo(now - n.time);
      return `<div class="notif-item">${n.msg}<span class="notif-time">${ago}</span></div>`;
    }).join("");
  }

  _formatTimeAgo(ms) {
    const s = Math.floor(ms / 1000);
    if (s < 5) return "ahora";
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m`;
    return `${Math.floor(m / 60)}h`;
  }

  _clearNotifHistory() {
    this._notifHistory = [];
    this._notifUnread = 0;
    this._updateNotifBadge();
    this._renderNotifList();
  }

  // --- Kill Streak ---
  registerKill() {
    const now = Date.now();
    const streakWindow = 3000; // 3 seconds to maintain streak
    if (now - this.lastKillTime < streakWindow) {
      this.killStreak++;
    } else {
      this.killStreak = 1;
    }
    this.lastKillTime = now;
    this.updateStreakDisplay();
  }

  getStreakMultiplier() {
    if (this.killStreak < 3) return 1.0;
    // +5% per streak kill after 3, capped at +200% (×3.0)
    return Math.min(3.0, 1.0 + (this.killStreak - 2) * 0.05);
  }

  updateStreakDisplay() {
    if (!this.dom.streakBar) return;
    if (this.killStreak >= 3) {
      this.dom.streakBar.style.display = '';
      this.dom.streakCount.textContent = this.killStreak;
      this.dom.streakMult.textContent = `×${this.getStreakMultiplier().toFixed(2)}`;
      if (this.dom.streakTimer) this.dom.streakTimer.style.width = '100%';
    } else {
      this.dom.streakBar.style.display = 'none';
    }
  }

  checkStreakExpiry() {
    if (this.killStreak > 0 && Date.now() - this.lastKillTime > 3000) {
      this.killStreak = 0;
      this.updateStreakDisplay();
    } else if (this.killStreak >= 3 && this.dom.streakTimer) {
      const elapsed = Date.now() - this.lastKillTime;
      const remaining = Math.max(0, 1 - elapsed / 3000);
      this.dom.streakTimer.style.width = (remaining * 100) + '%';
    }
  }

  // --- Auto-Buy Cheapest Upgrade ---
  processAutoBuy() {
    if (!GameState.data.settings.autoBuy) return;

    // Find cheapest affordable upgrade that isn't maxed
    let cheapest = null;
    let cheapestCost = Infinity;

    UpgradeDatabase.forEach(template => {
      const lvl = GameState.data.upgrades[template.id] || 0;
      if (lvl >= template.maxLevel) return;
      const cost = getUpgradeCost(template.id, lvl);
      if (cost < cheapestCost && GameState.data.coins >= cost) {
        cheapest = template;
        cheapestCost = cost;
      }
    });

    if (cheapest && GameState.data.coins >= cheapestCost) {
      GameState.data.coins -= cheapestCost;
      const lvl = GameState.data.upgrades[cheapest.id] || 0;
      GameState.data.upgrades[cheapest.id] = lvl + 1;
      this.addBattleLog(`🤖 Auto-buy: ${cheapest.icon} ${cheapest.name} Lv.${lvl + 1}`, 'info');
    }
  }

  // --- Milestone Reward Modal ---
  showMilestoneReward(milestone) {
    AudioManager.playMilestone();
    const overlay = document.createElement('div');
    overlay.className = 'milestone-overlay';

    const rewardsList = [];
    if (milestone.rewards.coins) rewardsList.push(`🪙 ${formatNumber(milestone.rewards.coins)} Coins`);
    if (milestone.rewards.stardust) rewardsList.push(`✨ ${formatNumber(milestone.rewards.stardust)} Stardust`);
    if (milestone.rewards.gems) rewardsList.push(`💎 ${milestone.rewards.gems} Gems`);
    if (milestone.rewards.essence) rewardsList.push(`🌀 ${milestone.rewards.essence} Essence`);

    overlay.innerHTML = `
      <div class="milestone-modal">
        <div class="milestone-icon">${milestone.icon}</div>
        <h2 style="color:var(--neon-orange);margin-bottom:4px;">Stage ${milestone.stage} Milestone!</h2>
        <h3 style="color:var(--text-bright);margin-bottom:8px;">${milestone.title}</h3>
        <p style="color:var(--text-muted);margin-bottom:16px;">${milestone.desc}</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:16px;">
          ${rewardsList.map(r => `<span style="background:rgba(255,255,255,0.08);padding:6px 12px;border-radius:8px;font-size:0.9rem;">${r}</span>`).join('')}
        </div>
        <button class="welcome-claim-btn" style="background:linear-gradient(135deg, var(--neon-orange, #ff9100), #ff5722);">Claim!</button>
      </div>
    `;

    document.body.appendChild(overlay);
    overlay.querySelector('.welcome-claim-btn').onclick = () => overlay.remove();
  }

  // --- Settings Logic ---
  initSettings() {
    const s = GameState.data.settings;

    // Initialize checkbox states from saved settings
    if (this.dom.settingDamageNumbers) this.dom.settingDamageNumbers.checked = s.showDamageNumbers;
    if (this.dom.settingNotifications) this.dom.settingNotifications.checked = s.showNotifications;
    if (this.dom.settingAutosave) this.dom.settingAutosave.checked = s.autoSaveEnabled;
    if (this.dom.settingParticles) this.dom.settingParticles.checked = s.particleEffects;
    if (this.dom.settingCompact) this.dom.settingCompact.checked = s.compactMode;
    if (this.dom.settingAutoProgress) this.dom.settingAutoProgress.checked = s.autoProgress !== false;
    if (this.dom.settingAutoBuy) this.dom.settingAutoBuy.checked = s.autoBuy === true;

    // Graphics settings
    if (this.dom.settingReduceAnimations) this.dom.settingReduceAnimations.checked = s.reduceAnimations === true;
    if (this.dom.settingLowQuality) this.dom.settingLowQuality.checked = s.lowQuality === true;
    if (this.dom.settingNoGlow) this.dom.settingNoGlow.checked = s.noGlow === true;
    if (this.dom.settingReduceRenders) this.dom.settingReduceRenders.checked = s.reduceRenders === true;
    if (this.dom.settingNoFloatText) this.dom.settingNoFloatText.checked = s.noFloatText === true;

    // Bind change listeners
    const bind = (el, key) => {
      if (el) el.onchange = () => {
        GameState.data.settings[key] = el.checked;
        if (key === "compactMode") document.body.classList.toggle("compact", el.checked);
      };
    };
    bind(this.dom.settingDamageNumbers, "showDamageNumbers");
    bind(this.dom.settingNotifications, "showNotifications");
    bind(this.dom.settingAutosave, "autoSaveEnabled");
    bind(this.dom.settingParticles, "particleEffects");
    bind(this.dom.settingCompact, "compactMode");
    bind(this.dom.settingAutoProgress, "autoProgress");
    bind(this.dom.settingAutoBuy, "autoBuy");

    // Graphics-specific bindings with CSS class toggles
    const bindGfx = (el, key, cssClass) => {
      if (el) el.onchange = () => {
        GameState.data.settings[key] = el.checked;
        document.body.classList.toggle(cssClass, el.checked);
      };
    };
    bindGfx(this.dom.settingReduceAnimations, "reduceAnimations", "reduce-animations");
    bindGfx(this.dom.settingLowQuality, "lowQuality", "low-quality");
    bindGfx(this.dom.settingNoGlow, "noGlow", "no-glow");
    bindGfx(this.dom.settingReduceRenders, "reduceRenders", "reduce-renders");
    bindGfx(this.dom.settingNoFloatText, "noFloatText", "no-float-text");

    // Sound settings
    if (this.dom.settingMusic) {
      this.dom.settingMusic.checked = s.musicEnabled !== false;
      this.dom.settingMusic.onchange = () => {
        GameState.data.settings.musicEnabled = this.dom.settingMusic.checked;
        AudioManager.toggleMusic(this.dom.settingMusic.checked);
      };
    }
    if (this.dom.settingMusicVol) {
      this.dom.settingMusicVol.value = Math.round((s.musicVolume ?? 0.3) * 100);
      this.dom.settingMusicVol.oninput = () => {
        const v = parseInt(this.dom.settingMusicVol.value) / 100;
        GameState.data.settings.musicVolume = v;
        AudioManager.setMusicVolume(v);
      };
    }
    if (this.dom.settingSfx) {
      this.dom.settingSfx.checked = s.sfxEnabled !== false;
      this.dom.settingSfx.onchange = () => {
        GameState.data.settings.sfxEnabled = this.dom.settingSfx.checked;
        AudioManager.toggleSfx(this.dom.settingSfx.checked);
      };
    }
    if (this.dom.settingSfxVol) {
      this.dom.settingSfxVol.value = Math.round((s.sfxVolume ?? 0.4) * 100);
      this.dom.settingSfxVol.oninput = () => {
        const v = parseInt(this.dom.settingSfxVol.value) / 100;
        GameState.data.settings.sfxVolume = v;
        AudioManager.setSfxVolume(v);
      };
    }

    // Apply compact mode if was saved
    if (s.compactMode) document.body.classList.add("compact");

    // Apply saved graphics settings
    if (s.reduceAnimations) document.body.classList.add("reduce-animations");
    if (s.lowQuality) document.body.classList.add("low-quality");
    if (s.noGlow) document.body.classList.add("no-glow");
    if (s.reduceRenders) document.body.classList.add("reduce-renders");
    if (s.noFloatText) document.body.classList.add("no-float-text");

    // Populate game info
    if (this.dom.infoEnemies) this.dom.infoEnemies.textContent = EnemyDatabase.length;
    if (this.dom.infoHeroes) this.dom.infoHeroes.textContent = HeroTemplate.length;
    if (this.dom.infoItems) this.dom.infoItems.textContent = ItemTemplate.length;
    if (this.dom.infoUpgrades) this.dom.infoUpgrades.textContent = UpgradeDatabase.length;
    if (this.dom.infoFloors) this.dom.infoFloors.textContent = TowerDatabase.length;
    if (this.dom.infoLore) this.dom.infoLore.textContent = LoreDatabase.length;
    if (this.dom.infoAchievements) this.dom.infoAchievements.textContent = AchievementDatabase.length;
  }

  // --- Achievements Logic ---
  checkAchievements() {
    const stats = GameState.data.playerDamageStats;
    const state = GameState.data;
    const unlocked = GameState.data.unlockedAchievements || [];
    let newUnlocks = false;

    AchievementDatabase.forEach((ach) => {
      if (!unlocked.includes(ach.id) && ach.condition(stats, state)) {
        unlocked.push(ach.id);
        newUnlocks = true;

        // Grant achievement rewards
        if (ach.reward) {
          let rewardText = '';
          if (ach.reward.coins) { GameState.addCoins(ach.reward.coins); rewardText += ` +${formatNumber(ach.reward.coins)} Coins`; }
          if (ach.reward.stardust) { GameState.addStardust(ach.reward.stardust); rewardText += ` +${ach.reward.stardust} Stardust`; }
          if (ach.reward.gems) { GameState.addGems(ach.reward.gems); rewardText += ` +${ach.reward.gems} Gems`; }
          if (ach.reward.essence) { GameState.addEssence(ach.reward.essence); rewardText += ` +${ach.reward.essence} Essence`; }
          this.showNotification(`Achievement Unlocked: ${ach.icon} ${ach.name}!${rewardText}`);
          AudioManager.playAchievement();
        } else {
          this.showNotification(`Achievement Unlocked: ${ach.icon} ${ach.name}!`);
          AudioManager.playAchievement();
        }
      }
    });

    if (newUnlocks) {
      GameState.data.unlockedAchievements = unlocked;
    }
  }

  renderAchievements() {
    if (!this.dom.achievementsContainer) return;
    const unlocked = GameState.data.unlockedAchievements || [];
    const visibleCount = AchievementDatabase.filter(a => !a.secret || unlocked.includes(a.id)).length;

    if (this.dom.achCounter) {
      this.dom.achCounter.textContent = `${unlocked.length} / ${visibleCount}`;
    }

    this.dom.achievementsContainer.innerHTML = "";

    AchievementDatabase.forEach((ach) => {
      const isUnlocked = unlocked.includes(ach.id);

      // Secret achievements: completely hidden until unlocked
      if (ach.secret && !isUnlocked) return;

      const card = document.createElement("div");
      card.className = `achievement-card ${isUnlocked ? "unlocked" : "locked"}`;

      let rewardHtml = '';
      if (ach.reward) {
        const parts = [];
        if (ach.reward.coins) parts.push(`🪙${formatNumber(ach.reward.coins)}`);
        if (ach.reward.stardust) parts.push(`✨${ach.reward.stardust}`);
        if (ach.reward.gems) parts.push(`💎${ach.reward.gems}`);
        if (ach.reward.essence) parts.push(`🌀${ach.reward.essence}`);
        rewardHtml = `<div class="ach-reward ${isUnlocked ? 'claimed' : ''}">${isUnlocked ? '✅ ' : '🎁 '}${parts.join(' ')}</div>`;
      }

      card.innerHTML = `
        <div class="ach-icon">${isUnlocked ? ach.icon : "🔒"}</div>
        <div class="ach-info">
          <div class="ach-name">${isUnlocked ? ach.name : "???"}</div>
          <div class="ach-desc">${isUnlocked ? ach.desc : "Keep playing to unlock..."}</div>
          ${rewardHtml}
        </div>
      `;

      this.dom.achievementsContainer.appendChild(card);
    });
  }

  // --- Battle Log ---
  addBattleLog(msg, type = 'info') {
    // Rate-limit: max 4 entries per second to avoid spam
    const now = Date.now();
    if (now - this._lastLogTime < 250 && type !== 'kill' && type !== 'loot') return;
    this._lastLogTime = now;

    this.battleLog.push({ msg, type, time: now });
    if (this.battleLog.length > 30) this.battleLog.shift();

    // Throttle DOM renders to max once per 400ms
    if (!this._logRenderQueued) {
      this._logRenderQueued = true;
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.renderBattleLog();
          this._logRenderQueued = false;
        }, 400);
      });
    }
  }

  renderBattleLog() {
    if (!this.dom.battleLog) return;
    const recent = this.battleLog.slice(-5);
    this.dom.battleLog.innerHTML = recent.map((entry, i) => {
      const opacity = 0.4 + (i / (recent.length - 1 || 1)) * 0.6;
      return `<div class="log-entry log-${entry.type}" style="opacity:${opacity.toFixed(2)}">${entry.msg}</div>`;
    }).join('');
    this.dom.battleLog.scrollTop = this.dom.battleLog.scrollHeight;
  }

  // --- Synergy Display ---
  renderSynergies() {
    if (!this.dom.synergyBar) return;
    const { active } = getSynergyBonuses(
      GameState.data.activeParty,
      GameState.data.roster
    );

    if (active.length === 0) {
      this.dom.synergyBar.innerHTML = '<span class="no-synergy">No active synergies</span>';
      return;
    }

    this.dom.synergyBar.innerHTML = active.map(syn =>
      `<span class="synergy-tag" style="border-color:${syn.color}; color:${syn.color}">
        ${syn.icon} ${syn.name} <small>${syn.effect}</small>
      </span>`
    ).join('');
  }

  // --- Death & Shake Effects ---
  triggerDeathEffect(callback) {
    const visual = document.getElementById('enemy-visual');
    if (visual && GameState.data.settings.particleEffects) {
      visual.classList.add('enemy-dying');
      setTimeout(() => {
        visual.classList.remove('enemy-dying');
        if (callback) callback();
      }, 350);
    } else {
      if (callback) callback();
    }
  }

  triggerScreenShake() {
    const arena = document.getElementById('tab-combat');
    if (arena && GameState.data.settings.particleEffects) {
      arena.classList.remove('screen-shake');
      arena.offsetHeight;
      arena.classList.add('screen-shake');
      setTimeout(() => arena.classList.remove('screen-shake'), 300);
    }
  }

  // --- Profile ---
  AVATARS = [
    '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="32" cy="20" r="12"/><path d="M20 35 L44 35 L48 58 L16 58 Z"/><path d="M25 17 L32 8 L39 17"/><circle cx="28" cy="19" r="2" fill="currentColor"/><circle cx="36" cy="19" r="2" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="32" cy="22" r="10"/><path d="M22 35 L42 35 L45 58 L19 58 Z"/><path d="M32 2 L35 12 L32 10 L29 12 Z" fill="currentColor"/><circle cx="29" cy="21" r="2" fill="currentColor"/><circle cx="35" cy="21" r="2" fill="currentColor"/><path d="M15 40 L10 30" stroke-width="3"/></svg>',
    '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="32" cy="20" r="10"/><path d="M22 33 L42 33 L44 58 L20 58 Z"/><path d="M48 15 L48 45" stroke-width="2"/><path d="M48 15 C 42 20 42 40 48 45"/><path d="M48 30 L56 30" stroke-width="1.5"/><circle cx="29" cy="19" r="2" fill="currentColor"/><circle cx="35" cy="19" r="2" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="32" cy="22" r="10"/><path d="M22 35 L42 35 L44 58 L20 58 Z"/><path d="M26 18 L22 14"/><path d="M38 18 L42 14"/><path d="M30 27 Q32 30 34 27"/><circle cx="29" cy="21" r="2" fill="currentColor"/><circle cx="35" cy="21" r="2" fill="currentColor"/></svg>',
    '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="32" cy="32" r="22"/><path d="M32 10 C 22 10 14 22 14 32 C 14 44 22 56 32 56 C 28 48 28 42 32 32 C 36 22 40 16 32 10 Z" fill="currentColor" opacity="0.3"/><circle cx="42" cy="18" r="2" fill="currentColor"/><circle cx="46" cy="28" r="1.5" fill="currentColor" opacity="0.6"/></svg>',
    '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="32,4 38,24 58,24 42,36 48,56 32,44 16,56 22,36 6,24 26,24" fill="currentColor" opacity="0.2"/><polygon points="32,4 38,24 58,24 42,36 48,56 32,44 16,56 22,36 6,24 26,24"/></svg>',
  ];

  getTitle(level) {
    if (level >= 100) return '🌙 Midnight Legend';
    if (level >= 75) return '👑 Grandmaster';
    if (level >= 50) return '⭐ Master';
    if (level >= 30) return '🏆 Champion';
    if (level >= 20) return '⚔️ Veteran';
    if (level >= 10) return '🗡️ Warrior';
    if (level >= 5) return '📖 Apprentice';
    return '🌱 Novice';
  }

  renderProfile() {
    const p = GameState.data.profile || { name: 'Adventurer', level: 1, xp: 0, avatarId: 0 };
    const s = GameState.data.playerDamageStats;

    if (this.dom.profileName) this.dom.profileName.textContent = p.name;
    if (this.dom.profileLevel) this.dom.profileLevel.textContent = p.level;
    if (this.dom.profileTitle) this.dom.profileTitle.textContent = this.getTitle(p.level);

    // XP bar
    const xpNeeded = Math.floor(100 * Math.pow(1.5, p.level - 1));
    const xpPct = Math.min(100, (p.xp / xpNeeded) * 100);
    if (this.dom.xpBarFill) this.dom.xpBarFill.style.width = `${xpPct}%`;
    if (this.dom.xpBarText) this.dom.xpBarText.textContent = `${formatNumber(p.xp)} / ${formatNumber(xpNeeded)} XP`;

    // Avatar
    if (this.dom.profileAvatar) {
      this.dom.profileAvatar.innerHTML = this.AVATARS[p.avatarId] || this.AVATARS[0];
    }

    // Header HUD
    if (this.dom.hudAvatar) this.dom.hudAvatar.innerHTML = this.AVATARS[p.avatarId] || this.AVATARS[0];
    if (this.dom.hudName) this.dom.hudName.textContent = p.name;
    if (this.dom.hudLevel) this.dom.hudLevel.textContent = `Lv.${p.level}`;
    if (this.dom.hudTitle) this.dom.hudTitle.textContent = this.getTitle(p.level);
    if (this.dom.hudXpFill) this.dom.hudXpFill.style.width = `${xpPct}%`;

    // Profile stats summary
    if (this.dom.profileStats) {
      const elapsed = s.totalPlayTimeMs / 1000;
      const bestiaryCount = Object.keys(GameState.data.bestiary || {}).length;
      this.dom.profileStats.innerHTML = `
        <div class="profile-stat"><span class="profile-stat-value">${formatNumber(s.totalDamageDealt)}</span><span class="profile-stat-label">Total Damage</span></div>
        <div class="profile-stat"><span class="profile-stat-value">${formatNumber(s.enemiesDefeated)}</span><span class="profile-stat-label">Enemies Slain</span></div>
        <div class="profile-stat"><span class="profile-stat-value">${GameState.data.currentStage}</span><span class="profile-stat-label">Current Stage</span></div>
        <div class="profile-stat"><span class="profile-stat-value">${GameState.data.roster.length}</span><span class="profile-stat-label">Heroes</span></div>
        <div class="profile-stat"><span class="profile-stat-value">${GameState.data.inventory.length}</span><span class="profile-stat-label">Items</span></div>
        <div class="profile-stat"><span class="profile-stat-value">${(GameState.data.unlockedAchievements || []).length}</span><span class="profile-stat-label">Achievements</span></div>
        <div class="profile-stat"><span class="profile-stat-value">${formatTime(Math.floor(elapsed))}</span><span class="profile-stat-label">Play Time</span></div>
        <div class="profile-stat"><span class="profile-stat-value">${bestiaryCount} / ${EnemyDatabase.length}</span><span class="profile-stat-label">Bestiary</span></div>
      `;
    }
  }

  renderAvatarGrid() {
    if (!this.dom.avatarGrid) return;
    this.dom.avatarGrid.innerHTML = '';
    const currentId = (GameState.data.profile || {}).avatarId || 0;

    this.AVATARS.forEach((svg, idx) => {
      const el = document.createElement('div');
      el.className = `avatar-option ${idx === currentId ? 'selected' : ''}`;
      el.innerHTML = svg;
      el.onclick = () => {
        if (!GameState.data.profile) GameState.data.profile = { name: 'Adventurer', level: 1, xp: 0, avatarId: 0 };
        GameState.data.profile.avatarId = idx;
        this.renderAvatarGrid();
        this.renderProfile();
      };
      this.dom.avatarGrid.appendChild(el);
    });
  }

  // --- Bestiary ---
  renderBestiary() {
    if (!this.dom.bestiaryGrid) return;
    const bestiary = GameState.data.bestiary || {};
    const discovered = Object.keys(bestiary).length;

    if (this.dom.bestiaryCounter) {
      this.dom.bestiaryCounter.textContent = `${discovered} / ${EnemyDatabase.length}`;
    }

    this.dom.bestiaryGrid.innerHTML = '';

    EnemyDatabase.forEach(enemy => {
      const data = bestiary[enemy.id];
      const isDiscovered = !!data;

      const card = document.createElement('div');
      card.className = `bestiary-card ${isDiscovered ? 'discovered' : 'undiscovered'}`;

      if (isDiscovered) {
        const tierText = data.highestTier > 0 ? `<div class="bestiary-detail" style="color:var(--neon-orange)">Highest Tier: ${data.highestTier}</div>` : '';
        card.innerHTML = `
          <div class="bestiary-visual" style="color:${enemy.color}">${enemy.svg}</div>
          <div class="bestiary-info">
            <div class="bestiary-name" style="color:${enemy.color}">${enemy.name}</div>
            <div class="bestiary-detail">Base HP: ${enemy.baseHp} | Reward: ${enemy.baseCoinReward}c</div>
            <div class="bestiary-detail">Kills: ${formatNumber(data.kills)}</div>
            ${tierText}
            ${enemy.isBoss ? '<div class="bestiary-badge">BOSS</div>' : ''}
          </div>
        `;
      } else {
        card.innerHTML = `
          <div class="bestiary-visual undiscovered-visual">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" opacity="0.3"><circle cx="50" cy="50" r="25"/><text x="50" y="58" text-anchor="middle" font-size="24" fill="currentColor">?</text></svg>
          </div>
          <div class="bestiary-info">
            <div class="bestiary-name" style="color:var(--text-muted)">???</div>
            <div class="bestiary-detail">Defeat this enemy to discover it.</div>
          </div>
        `;
      }

      this.dom.bestiaryGrid.appendChild(card);
    });
  }

  // --- Guide Bar ---
  renderGuide() {
    if (!this.dom.guideText) return;
    const tip = GuideTips[this.guideIndex] || GuideTips[0];
    this.dom.guideText.textContent = tip.text;
    if (this.dom.guideCounter) {
      this.dom.guideCounter.textContent = `${this.guideIndex + 1}/${GuideTips.length}`;
    }
  }

  // --- Gem Shop ---
  renderShop() {
    if (!this.dom.shopGrid) return;
    const purchases = GameState.data.shopPurchases || {};
    const state = GameState.data;

    if (this.dom.shopGems) this.dom.shopGems.textContent = formatNumber(state.gems || 0);

    this.dom.shopGrid.innerHTML = '';

    const currencyIcons = { gems: '💎', coins: '🪙', stardust: '✨', essence: '🌀' };
    const currencyBalances = {
      gems: state.gems || 0,
      coins: state.coins || 0,
      stardust: state.stardust || 0,
      essence: state.essence || 0,
    };

    ShopDatabase.forEach(item => {
      const owned = purchases[item.id] || 0;
      const isMaxed = owned >= item.maxPurchases;
      const currency = item.currency || 'gems';
      const icon = currencyIcons[currency];
      const canAfford = !isMaxed && currencyBalances[currency] >= item.cost;

      const card = document.createElement('div');
      card.className = 'shop-card';
      card.style.borderColor = item.color;

      card.innerHTML = `
        <div class="shop-card-header">
          <div class="shop-card-icon">${item.icon}</div>
          <div class="shop-card-title" style="color:${item.color}">${item.name}</div>
        </div>
        <div class="shop-card-desc">${item.desc}</div>
        <div class="shop-card-footer">
          <span class="shop-card-owned" style="color:${item.color}">Owned: ${owned}/${item.maxPurchases}</span>
          <button class="shop-buy-btn ${isMaxed ? 'sold-out' : ''}" data-shop-id="${item.id}" ${!canAfford && !isMaxed ? 'style="opacity:0.5"' : ''}>
            ${isMaxed ? 'SOLD OUT' : `${formatNumber(item.cost)} ${icon}`}
          </button>
        </div>
      `;

      this.dom.shopGrid.appendChild(card);
    });
  }

  // --- Prestige (Void Rebirth) ---
  renderPrestige() {
    const state = GameState.data;
    const currentEssence = state.essence || 0;
    const gain = calculatePrestigeGain(state.currentStage);
    const upgrades = state.prestigeUpgrades || {};

    // Update display
    if (this.dom.prestigeEssenceCurrent) this.dom.prestigeEssenceCurrent.textContent = formatNumber(currentEssence);
    if (this.dom.prestigeGainPreview) this.dom.prestigeGainPreview.textContent = `+${formatNumber(gain)} Essence`;

    // Update button state
    if (this.dom.prestigeBtn) {
      this.dom.prestigeBtn.disabled = gain <= 0;
    }
    if (this.dom.prestigeRequirement) {
      if (gain > 0) {
        this.dom.prestigeRequirement.textContent = `Prestiges: ${state.prestigeCount || 0}`;
        this.dom.prestigeRequirement.style.color = 'var(--neon-green)';
      } else {
        this.dom.prestigeRequirement.textContent = `Reach Stage 50 to unlock Prestige (current: ${state.currentStage})`;
        this.dom.prestigeRequirement.style.color = 'var(--hp-red)';
      }
    }

    // Render prestige upgrades
    if (this.dom.prestigeBonusesGrid) {
      this.dom.prestigeBonusesGrid.innerHTML = '';
      PrestigeUpgrades.forEach(upg => {
        const lvl = upgrades[upg.id] || 0;
        const isMaxed = lvl >= upg.maxLevel;
        const cost = upg.essenceCost(lvl);
        const canAfford = !isMaxed && currentEssence >= cost;

        const card = document.createElement('div');
        card.className = 'prestige-upgrade-card';
        card.innerHTML = `
          <div class="prestige-upg-icon">${upg.icon}</div>
          <div class="prestige-upg-info">
            <div class="prestige-upg-name">${upg.name}</div>
            <div class="prestige-upg-desc">${upg.desc}</div>
            <div class="prestige-upg-lvl">Lv.${lvl}/${upg.maxLevel}</div>
          </div>
          <button class="prestige-upg-btn" data-prestige-id="${upg.id}" ${!canAfford || isMaxed ? 'disabled' : ''}>
            ${isMaxed ? 'MAX' : `${cost} E`}
          </button>
        `;

        this.dom.prestigeBonusesGrid.appendChild(card);
      });
    }

    // Render current multipliers
    if (this.dom.prestigeMultipliers) {
      const bonuses = getPrestigeBonuses(upgrades);
      const shopBon = getShopBonuses(state.shopPurchases || {});

      this.dom.prestigeMultipliers.innerHTML = `
        <div class="prestige-mult-card"><span class="prestige-mult-value">×${(bonuses.dpsMultiplier * shopBon.dpsMultiplier).toFixed(2)}</span><span class="prestige-mult-label">Total DPS</span></div>
        <div class="prestige-mult-card"><span class="prestige-mult-value">×${(bonuses.coinMultiplier * shopBon.coinMultiplier).toFixed(2)}</span><span class="prestige-mult-label">Coins</span></div>
        <div class="prestige-mult-card"><span class="prestige-mult-value">×${(bonuses.xpMultiplier * shopBon.xpMultiplier).toFixed(2)}</span><span class="prestige-mult-label">XP</span></div>
        <div class="prestige-mult-card"><span class="prestige-mult-value">×${(bonuses.stardustMultiplier * shopBon.stardustMultiplier).toFixed(2)}</span><span class="prestige-mult-label">Stardust</span></div>
        <div class="prestige-mult-card"><span class="prestige-mult-value">×${(bonuses.clickMultiplier * shopBon.clickMultiplier).toFixed(2)}</span><span class="prestige-mult-label">Click DMG</span></div>
        <div class="prestige-mult-card"><span class="prestige-mult-value">×${(bonuses.familiarMultiplier * shopBon.familiarMultiplier).toFixed(2)}</span><span class="prestige-mult-label">Familiar</span></div>
        <div class="prestige-mult-card"><span class="prestige-mult-value">+${((bonuses.gemChanceBonus) * 100).toFixed(0)}%</span><span class="prestige-mult-label">Gem Chance</span></div>
        <div class="prestige-mult-card"><span class="prestige-mult-value">+${bonuses.startStageBonus}</span><span class="prestige-mult-label">Start Stage</span></div>
      `;
    }
  }

  // --- Hero Combat Visual (main character on combat screen) ---
  MAIN_HERO_SVG = `<svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="cloakGrad" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stop-color="currentColor" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#0a0a15" stop-opacity="0.8"/>
      </radialGradient>
      <radialGradient id="armorGrad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stop-color="#2a2a4e" stop-opacity="1"/>
        <stop offset="100%" stop-color="#0f0f1a" stop-opacity="1"/>
      </radialGradient>
      <radialGradient id="headGrad" cx="40%" cy="35%" r="55%">
        <stop offset="0%" stop-color="#252545"/>
        <stop offset="100%" stop-color="#0f0f1a"/>
      </radialGradient>
      <linearGradient id="swordGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#c0caf5"/>
        <stop offset="50%" stop-color="#8892b0"/>
        <stop offset="100%" stop-color="#5c6680"/>
      </linearGradient>
      <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1e2640"/>
        <stop offset="100%" stop-color="#0a0e1a"/>
      </linearGradient>
    </defs>
    <!-- Ground shadow -->
    <ellipse cx="60" cy="136" rx="30" ry="4" fill="#000" opacity="0.25"/>
    <!-- Cloak / Cape -->
    <path d="M30 55 Q25 90 20 130 L100 130 Q95 90 90 55 Z" fill="url(#cloakGrad)" opacity="0.7"/>
    <path d="M35 60 Q32 88 28 125" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
    <path d="M85 60 Q88 88 92 125" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
    <!-- Body Armor -->
    <path d="M40 50 L80 50 L85 95 L35 95 Z" fill="url(#armorGrad)" stroke="currentColor" stroke-width="2"/>
    <path d="M45 55 L75 55 L78 90 L42 90 Z" fill="#16213e" stroke="currentColor" stroke-width="1" opacity="0.8"/>
    <!-- Armor highlights -->
    <path d="M48 56 L52 56 L54 88 L46 88 Z" fill="white" opacity="0.04"/>
    <!-- Chest Emblem -->
    <path d="M55 62 L60 56 L65 62 L60 75 Z" fill="currentColor" opacity="0.6"/>
    <circle cx="60" cy="65" r="3" fill="currentColor" opacity="0.9"/>
    <circle cx="59" cy="64" r="1.2" fill="white" opacity="0.3"/>
    <!-- Head -->
    <circle cx="60" cy="32" r="16" fill="url(#headGrad)" stroke="currentColor" stroke-width="2"/>
    <!-- Head specular -->
    <ellipse cx="54" cy="24" rx="6" ry="4" fill="white" opacity="0.04"/>
    <!-- Helmet/Hood -->
    <path d="M44 32 Q44 14 60 12 Q76 14 76 32" fill="#0f0f1a" stroke="currentColor" stroke-width="1.5"/>
    <path d="M48 18 Q60 14 72 18" stroke="white" stroke-width="0.5" opacity="0.08"/>
    <path d="M44 32 L48 36 L72 36 L76 32" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/>
    <!-- Eyes (glowing) -->
    <ellipse cx="53" cy="30" rx="3" ry="2.5" fill="currentColor"/>
    <ellipse cx="67" cy="30" rx="3" ry="2.5" fill="currentColor"/>
    <ellipse cx="53" cy="30" rx="1.5" ry="1.2" fill="#fff" opacity="0.8"/>
    <ellipse cx="67" cy="30" rx="1.5" ry="1.2" fill="#fff" opacity="0.8"/>
    <!-- Mouth -->
    <path d="M56 37 Q60 39 64 37" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>
    <!-- Left Arm + Sword -->
    <path d="M40 55 L25 75 L30 78 L42 60 Z" fill="url(#armorGrad)" stroke="currentColor" stroke-width="1.5"/>
    <rect x="16" y="30" width="3" height="48" rx="1" fill="url(#swordGrad)" stroke="currentColor" stroke-width="0.5" transform="rotate(-15, 20, 55)"/>
    <path d="M14 28 L20 22 L26 28 L20 32 Z" fill="currentColor" stroke="currentColor" stroke-width="0.5" transform="rotate(-15, 20, 30)"/>
    <!-- Sword specular -->
    <rect x="17" y="32" width="1" height="44" rx="0.5" fill="white" opacity="0.12" transform="rotate(-15, 20, 55)"/>
    <!-- Right Arm + Shield -->
    <path d="M80 55 L95 70 L90 75 L78 60 Z" fill="url(#armorGrad)" stroke="currentColor" stroke-width="1.5"/>
    <ellipse cx="100" cy="68" rx="12" ry="16" fill="url(#shieldGrad)" stroke="currentColor" stroke-width="2"/>
    <ellipse cx="96" cy="62" rx="5" ry="8" fill="white" opacity="0.04"/>
    <path d="M96 58 L100 54 L104 58 L100 78 Z" fill="currentColor" opacity="0.4"/>
    <circle cx="100" cy="66" r="3" fill="currentColor" opacity="0.6"/>
    <circle cx="99" cy="65" r="1" fill="white" opacity="0.3"/>
    <!-- Legs -->
    <rect x="42" y="95" width="14" height="30" rx="3" fill="#0f0f1a" stroke="currentColor" stroke-width="1.5"/>
    <rect x="64" y="95" width="14" height="30" rx="3" fill="#0f0f1a" stroke="currentColor" stroke-width="1.5"/>
    <!-- Leg highlights -->
    <rect x="44" y="97" width="3" height="26" rx="1" fill="white" opacity="0.03"/>
    <rect x="66" y="97" width="3" height="26" rx="1" fill="white" opacity="0.03"/>
    <!-- Boots -->
    <path d="M40 122 L56 122 L58 132 L38 132 Z" fill="#1a1a2e" stroke="currentColor" stroke-width="1.5"/>
    <path d="M62 122 L78 122 L80 132 L60 132 Z" fill="#1a1a2e" stroke="currentColor" stroke-width="1.5"/>
    <!-- Boot highlights -->
    <path d="M42 123 L50 123 L51 130 L41 130 Z" fill="white" opacity="0.03"/>
    <!-- Belt -->
    <rect x="38" y="92" width="44" height="5" rx="2" fill="#2a1a0a" stroke="currentColor" stroke-width="1"/>
    <rect x="39" y="93" width="20" height="2" rx="1" fill="white" opacity="0.04"/>
    <circle cx="60" cy="94.5" r="2.5" fill="currentColor"/>
    <circle cx="59" cy="93.5" r="0.8" fill="white" opacity="0.3"/>
    <!-- Shoulder pads -->
    <ellipse cx="38" cy="53" rx="8" ry="5" fill="#16213e" stroke="currentColor" stroke-width="1.5"/>
    <ellipse cx="82" cy="53" rx="8" ry="5" fill="#16213e" stroke="currentColor" stroke-width="1.5"/>
    <!-- Shoulder highlights -->
    <ellipse cx="36" cy="51" rx="4" ry="2.5" fill="white" opacity="0.04"/>
    <ellipse cx="80" cy="51" rx="4" ry="2.5" fill="white" opacity="0.04"/>
  </svg>`;

  renderHeroCombat() {
    if (!this.dom.heroCombatVisual) return;

    // Get first equipped hero
    const firstUid = GameState.data.activeParty[0];
    let heroSvg = this.MAIN_HERO_SVG;
    let heroName = 'Midnight Guardian';
    let heroColor = '#a78bfa';

    if (firstUid) {
      const hData = GameState.data.roster.find(h => h.uid === firstUid);
      if (hData) {
        const template = HeroTemplate.find(t => t.id === hData.id);
        if (template) {
          heroSvg = template.svg;
          heroName = template.name;
          heroColor = template.rarity.color;
        }
      }
    }

    this.dom.heroCombatVisual.innerHTML = heroSvg;
    this.dom.heroCombatVisual.style.color = heroColor;
    if (this.dom.heroCombatName) {
      this.dom.heroCombatName.textContent = heroName;
      this.dom.heroCombatName.style.color = heroColor;
    }
  }

  // --- Hero Stats Panel (below combat) ---
  renderHeroStatsPanel() {
    if (!this.dom.heroStatsPanel) return;

    const firstUid = GameState.data.activeParty[0];
    if (!firstUid) {
      this.dom.heroStatsPanel.style.display = 'none';
      return;
    }

    const hData = GameState.data.roster.find(h => h.uid === firstUid);
    if (!hData) { this.dom.heroStatsPanel.style.display = 'none'; return; }

    const template = HeroTemplate.find(t => t.id === hData.id);
    if (!template) { this.dom.heroStatsPanel.style.display = 'none'; return; }

    this.dom.heroStatsPanel.style.display = 'block';
    const stats = getHeroStats(hData);

    if (this.dom.hspHeroName) {
      this.dom.hspHeroName.textContent = template.name;
      this.dom.hspHeroName.style.color = template.rarity.color;
    }
    if (this.dom.hspHeroLevel) {
      this.dom.hspHeroLevel.textContent = `Lv.${hData.level} • ${template.rarity.name}`;
      this.dom.hspHeroLevel.style.color = template.rarity.color;
    }

    // Stats row
    if (this.dom.hspStatsRow) {
      const ELEM_ICONS = { fire: '🔥', ice: '❄️', shadow: '🌑', light: '✨', void: '🌀' };
      const heroElement = getHeroElement(hData.id);
      const elemDisplay = heroElement ? ELEM_ICONS[heroElement] + ' ' + heroElement.charAt(0).toUpperCase() + heroElement.slice(1) : '—';
      let ascensionBtn = '';
      const maxLevel = template.rarity.id === 'legendary' ? 100 : 50;
      const ascLevel = hData.ascensionLevel || 0;
      if (hData.level >= maxLevel) {
        ascensionBtn = `<button class="ascend-btn glow-btn" data-ascend-uid="${hData.uid}">⭐ Ascend</button>`;
      }
      const ascensionDisplay = ascLevel > 0 ? `<span class="ascension-star">⭐${ascLevel}</span>` : '';
      this.dom.hspStatsRow.innerHTML = `
        <div class="hsp-stat"><span class="hsp-stat-value">${stats.dps.toFixed(1)}</span><span style="font-size:0.65em;color:var(--text-muted)">DPS</span></div>
        <div class="hsp-stat"><span class="hsp-stat-value">${template.baseDps}</span><span style="font-size:0.65em;color:var(--text-muted)">Base</span></div>
        <div class="hsp-stat"><span class="hsp-stat-value">${elemDisplay}</span><span style="font-size:0.65em;color:var(--text-muted)">Element</span></div>
        <div class="hsp-stat"><span class="hsp-stat-value">${getHeroLevelCost(hData.id, hData.level)}</span><span style="font-size:0.65em;color:var(--text-muted)">Lvl Cost</span></div>
        <div class="hsp-stat"><span class="hsp-stat-value">${ascensionDisplay || 'Ascension 0'}</span><span style="font-size:0.65em;color:var(--text-muted)">Ascension</span></div>
        ${ascensionBtn}
      `;

      // Bind ascension button with confirmation dialog
      const ascBtn = this.dom.hspStatsRow.querySelector('.ascend-btn');
      if (ascBtn) {
        ascBtn.onclick = () => this.showAscensionConfirm(hData.uid);
      }
    }

    // Equip row
    if (this.dom.hspEquipRow) {
      const renderEquipSlot = (slotName, label) => {
        const equipped = hData.equip[slotName];
        if (equipped) {
          const iStats = getItemStats(equipped);
          return `<div class="hsp-equip-item" style="border-color:${iStats.rarity.color};color:${iStats.rarity.color}" title="${iStats.displayName || iStats.name} (${iStats.rarity.name})">${iStats.svg}</div>`;
        }
        return `<div class="hsp-equip-item hsp-equip-empty" title="No ${label}">${label[0]}</div>`;
      };

      this.dom.hspEquipRow.innerHTML =
        renderEquipSlot('weapon', 'Weapon') +
        renderEquipSlot('armor', 'Armor') +
        renderEquipSlot('acc', 'Accessory');
    }
  }

  // --- Ascension Confirmation Dialog ---
  showAscensionConfirm(heroUid) {
    const hero = GameState.data.roster.find(h => h.uid === heroUid);
    if (!hero) return;
    const template = HeroTemplate.find(t => t.id === hero.id);
    if (!template) return;
    const currentAsc = hero.ascensionLevel || 0;
    const nextAsc = currentAsc + 1;
    const bonusDps = `+${(nextAsc * 20)}%`;
    const bonusCrit = `+${(nextAsc * 5)}%`;

    const overlay = document.createElement('div');
    overlay.className = 'welcome-overlay ascension-overlay';
    overlay.innerHTML = `
      <div class="welcome-modal ascension-modal">
        <div class="ascension-hero-visual" style="color:${template.rarity.color}">${template.svg}</div>
        <h2 style="color:var(--neon-cyan);margin-bottom:4px;">⭐ Ascender Héroe</h2>
        <h3 style="color:${template.rarity.color};margin-bottom:8px;">${template.name}</h3>
        <p style="color:var(--text-muted);margin-bottom:12px;">El nivel se reiniciará a 1, pero obtendrás bonos permanentes.</p>
        <div class="ascension-bonuses">
          <div class="ascension-bonus-item"><span class="ascension-bonus-label">Ascensión</span><span class="ascension-bonus-value">${currentAsc} → ${nextAsc}</span></div>
          <div class="ascension-bonus-item"><span class="ascension-bonus-label">DPS Bonus</span><span class="ascension-bonus-value">${bonusDps}</span></div>
          <div class="ascension-bonus-item"><span class="ascension-bonus-label">Crit Chance</span><span class="ascension-bonus-value">${bonusCrit}</span></div>
        </div>
        <div style="display:flex;gap:8px;justify-content:center;margin-top:16px;">
          <button class="ascension-cancel-btn">Cancelar</button>
          <button class="ascension-confirm-btn">⭐ ¡Ascender!</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    overlay.querySelector('.ascension-cancel-btn').onclick = () => overlay.remove();
    overlay.querySelector('.ascension-confirm-btn').onclick = () => {
      overlay.remove();
      window.ascendHero(heroUid);
    };
  }

  // --- Events Tab ---
  renderEvents() {
    if (!this.dom.eventsContainer) return;
    const activeEvents = getActiveEvents();
    const allEvents = EventDatabase;
    const today = new Date().getDay();

    this.dom.eventsContainer.innerHTML = '';

    allEvents.forEach(evt => {
      const isActive = evt.dayOfWeek === today;
      const card = document.createElement('div');
      card.className = `event-card ${isActive ? 'active' : 'expired'}`;

      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      card.innerHTML = `
        <div class="event-icon" style="color:${evt.color}">${evt.icon}</div>
        <div class="event-info">
          <div class="event-name" style="color:${isActive ? evt.color : 'var(--text-muted)'}">${evt.name}</div>
          <div class="event-desc">${evt.desc}</div>
          <div class="event-timer">${isActive ? '🟢 Active Today' : `📅 ${days[evt.dayOfWeek]}`}</div>
          <div class="event-bonus">${evt.bonusText}</div>
        </div>
      `;

      this.dom.eventsContainer.appendChild(card);
    });
  }

  // --- Crafting / Forge Tab ---
  renderCrafting() {
    const container = document.getElementById('crafting-container');
    if (!container) return;

    const inv = GameState.data.inventory;
    // Exclude items currently equipped
    const equippedUids = new Set();
    GameState.data.roster.forEach(h => {
      Object.values(h.equip || {}).forEach(e => { if (e) equippedUids.add(e.uid); });
    });
    const freeItems = inv.filter(i => !equippedUids.has(i.uid));
    const groups = getCraftableGroups(freeItems);

    if (groups.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:var(--text-muted);">No craftable items. Collect more loot!</p>';
      return;
    }

    container.innerHTML = groups.map(g => {
      const tpl = getItemStats({ templateId: g.templateId, rarity: g.rarity, uid: '_preview' });
      const next = getNextRarity(g.rarity);
      const canCraft = g.items.length >= CRAFT_COST;
      const dismantleVal = getDismantleValue(g.items[0]);
      return `
        <div class="craft-row">
          <div class="craft-item-icon" style="color:${g.rarity.color};border-color:${g.rarity.color}">
            ${tpl.svg}
          </div>
          <div class="craft-info">
            <span class="craft-name" style="color:${g.rarity.color}">${tpl.name} (${g.rarity.name})</span>
            <span class="craft-count">${g.items.length} / ${CRAFT_COST} needed</span>
          </div>
          <div class="craft-actions">
            ${next ? `<button class="craft-btn ${canCraft ? '' : 'disabled'}" data-tpl="${g.templateId}" data-rar="${g.rarity.id}">
              Forge → <span style="color:${next.color}">${next.name}</span>
            </button>` : ''}
            <button class="dismantle-btn" data-tpl="${g.templateId}" data-rar="${g.rarity.id}">
              Dismantle (+${dismantleVal} ess)
            </button>
          </div>
        </div>`;
    }).join('');

    // Bind forge buttons
    container.querySelectorAll('.craft-btn:not(.disabled)').forEach(btn => {
      btn.onclick = () => {
        const newItem = fuseItems(GameState.data.inventory, btn.dataset.tpl, btn.dataset.rar);
        if (newItem) {
          GameState.data.inventory.push(newItem);
          const st = getItemStats(newItem);
          this.showNotification(`Forged ${st.displayName || st.name} (${st.rarity.name})!`);
          GameState.save();
          this.renderCrafting();
        }
      };
    });

    // Bind dismantle buttons
    container.querySelectorAll('.dismantle-btn').forEach(btn => {
      btn.onclick = () => {
        const tpl = btn.dataset.tpl;
        const rar = btn.dataset.rar;
        const target = GameState.data.inventory.find(
          i => i.templateId === tpl && i.rarity.id === rar && !equippedUids.has(i.uid)
        );
        if (target) {
          const val = getDismantleValue(target);
          const idx = GameState.data.inventory.indexOf(target);
          if (idx !== -1) GameState.data.inventory.splice(idx, 1);
          GameState.data.essence += val;
          this.showNotification(`Dismantled for +${val} Essence`);
          GameState.save();
          this.renderCrafting();
          this.updateStats();
        }
      };
    });

    // ── Crafting Recipes Section ──
    const recipes = getUnlockedRecipes(GameState.data.currentStage || 1);
    if (recipes.length > 0) {
      const recipeHtml = recipes.map(r => {
        const can = canCraftRecipe(r, GameState.data.inventory, GameState.data);
        const costParts = [];
        if (r.cost.coins) costParts.push(`🪙${formatNumber(r.cost.coins)}`);
        if (r.cost.stardust) costParts.push(`✨${r.cost.stardust}`);
        if (r.cost.essence) costParts.push(`🌀${r.cost.essence}`);
        const ingParts = r.ingredients.map(ing => {
          const tpl = getItemStats({ templateId: ing.templateId, rarity: { id: ing.rarity, statMult: 1 }, uid: '_' });
          return `${ing.qty}× ${tpl.name} (${ing.rarity})`;
        }).join(', ');
        return `
          <div class="recipe-row ${can ? '' : 'recipe-locked'}">
            <div class="recipe-info">
              <span class="recipe-name">📜 ${r.name}</span>
              <span class="recipe-desc">${r.desc}</span>
              <span class="recipe-ingredients">Needs: ${ingParts}</span>
              <span class="recipe-cost">Cost: ${costParts.join(' ')}</span>
            </div>
            <button class="craft-btn recipe-craft-btn ${can ? '' : 'disabled'}" data-recipe="${r.id}">
              Craft
            </button>
          </div>`;
      }).join('');

      container.insertAdjacentHTML('beforeend', `
        <div class="recipe-section">
          <h3 class="quest-section-title">📜 Recipes</h3>
          ${recipeHtml}
        </div>
      `);

      container.querySelectorAll('.recipe-craft-btn:not(.disabled)').forEach(btn => {
        btn.onclick = () => {
          const recipe = recipes.find(r => r.id === btn.dataset.recipe);
          if (!recipe) return;
          const newItem = craftRecipe(recipe, GameState.data.inventory, GameState.data);
          if (newItem) {
            GameState.data.inventory.push(newItem);
            const st = getItemStats(newItem);
            this.showNotification(`Crafted ${st.displayName || st.name} (${st.rarity.name})!`);
            GameState.save();
            this.renderCrafting();
            this.updateStats();
          }
        };
      });
    }
  }

  // --- Boss Rush Tab ---
  renderBossRush() {
    const container = document.getElementById('bossrush-container');
    if (!container) return;
    const state = GameState.data;
    if (!state.bossRush) state.bossRush = { lastPlayed: null, bestWave: 0 };

    // If a rush is active, show the arena
    if (this._bossRushActive) {
      this._renderBossRushArena(container);
      return;
    }

    const ready = isBossRushReady(state.bossRush.lastPlayed);
    const cdMs = getBossRushCooldown(state.bossRush.lastPlayed);
    const cdMin = Math.ceil(cdMs / 60_000);

    let html = `<div class="br-status">
      <div class="br-best">🏆 Best: Wave ${state.bossRush.bestWave} / ${BOSS_RUSH_CONFIG.totalBosses}</div>
    </div>`;

    // Reward tiers preview
    html += '<div class="br-rewards-preview"><h3>Reward Tiers</h3>';
    for (const r of BOSS_RUSH_REWARDS) {
      const earned = state.bossRush.bestWave >= r.bosses;
      html += `<div class="br-tier ${earned ? 'br-tier-earned' : ''}">
        <span>${r.bosses} bosses:</span>
        <span>🪙${formatNumber(r.coins)} ✨${r.stardust}${r.gems ? ' 💎' + r.gems : ''}${r.essence ? ' 🌀' + r.essence : ''}</span>
      </div>`;
    }
    html += '</div>';

    if (ready) {
      html += '<button id="br-start-btn" class="glow-btn" style="margin-top:12px;width:100%">⚔️ Start Boss Rush!</button>';
    } else {
      html += `<p class="br-cooldown">Cooldown: ${cdMin} min remaining</p>`;
    }

    container.innerHTML = html;

    const startBtn = container.querySelector('#br-start-btn');
    if (startBtn) {
      startBtn.onclick = () => this._startBossRush();
    }

    // Auto-refresh cooldown
    if (!ready) {
      clearTimeout(this._brCdTimer);
      this._brCdTimer = setTimeout(() => this.renderBossRush(), 5000);
    }
  }

  _startBossRush() {
    this._bossRushActive = true;
    this._brWave = 0;
    this._brBossHp = 0;
    this._brBossMaxHp = 0;
    this._brTimer = BOSS_RUSH_CONFIG.timerPerBoss;
    this._brLastTick = Date.now();
    this._brKills = 0;
    this._spawnBossRushBoss();
    this.renderBossRush();
    // Start tick loop
    this._brInterval = setInterval(() => this._tickBossRush(), 100);
  }

  _spawnBossRushBoss() {
    const hp = getBossRushHp(this._brWave, GameState.data.currentStage);
    this._brBossHp = hp;
    this._brBossMaxHp = hp;
    this._brTimer = BOSS_RUSH_CONFIG.timerPerBoss;
    this._brLastTick = Date.now();
  }

  _tickBossRush() {
    const now = Date.now();
    const dt = now - this._brLastTick;
    this._brLastTick = now;

    // Timer countdown
    this._brTimer -= dt;
    if (this._brTimer <= 0) {
      // Time's up — end rush
      this._endBossRush();
      return;
    }

    // Apply party DPS
    const state = GameState.data;
    let partyDps = 0;
    state.activeParty.forEach(uid => {
      const h = state.roster.find(r => r.uid === uid);
      if (h) partyDps += getHeroStats(h).dps;
    });

    // Include upgrade multipliers
    const dpsUpg = 1 + getUpgradeEffect("upg_global_dps", state.upgrades["upg_global_dps"] || 0);
    const totalDps = partyDps * dpsUpg;
    const dmg = totalDps * (dt / 1000);

    this._brBossHp -= dmg;
    if (this._brBossHp <= 0) {
      this._brKills++;
      this._brWave++;
      if (this._brWave >= BOSS_RUSH_CONFIG.totalBosses) {
        this._endBossRush();
        return;
      }
      this._spawnBossRushBoss();
    }

    // Update display
    const container = document.getElementById('bossrush-container');
    if (container) this._renderBossRushArena(container);
  }

  _renderBossRushArena(container) {
    const hpPct = Math.max(0, (this._brBossHp / this._brBossMaxHp) * 100);
    const timerSec = Math.max(0, this._brTimer / 1000).toFixed(1);
    const bossName = BOSS_RUSH_NAMES[this._brWave] || `Boss ${this._brWave + 1}`;

    container.innerHTML = `
      <div class="br-arena">
        <div class="br-wave-counter">Wave ${this._brWave + 1} / ${BOSS_RUSH_CONFIG.totalBosses}</div>
        <div class="br-timer ${this._brTimer < 10000 ? 'br-timer-danger' : ''}">${timerSec}s</div>
        <div class="br-boss-name">${bossName}</div>
        <div class="br-hp-bar">
          <div class="br-hp-fill" style="width:${hpPct}%"></div>
        </div>
        <div class="br-hp-text">${formatNumber(Math.max(0, Math.floor(this._brBossHp)))} / ${formatNumber(this._brBossMaxHp)}</div>
        <div class="br-kills">Defeated: ${this._brKills}</div>
      </div>`;
  }

  _endBossRush() {
    clearInterval(this._brInterval);
    this._bossRushActive = false;
    const state = GameState.data;
    if (!state.bossRush) state.bossRush = { lastPlayed: null, bestWave: 0 };
    state.bossRush.lastPlayed = Date.now();

    const kills = this._brKills;
    if (kills > state.bossRush.bestWave) state.bossRush.bestWave = kills;

    // Grant rewards
    const reward = getBossRushReward(kills);
    if (reward) {
      if (reward.coins) GameState.addCoins(reward.coins);
      if (reward.stardust) GameState.addStardust(reward.stardust);
      if (reward.gems) GameState.addGems(reward.gems);
      if (reward.essence) GameState.addEssence(reward.essence);
      this.showNotification(`⚔️ Boss Rush: ${kills} bosses defeated! +${formatNumber(reward.coins)} coins, +${reward.stardust} stardust${reward.gems ? ', +' + reward.gems + ' gems' : ''}`);
    } else {
      this.showNotification(`⚔️ Boss Rush: 0 bosses defeated. Try harder!`);
    }

    GameState.save();
    this.renderBossRush();
    this.updateStats();
  }

  // --- Weekly Dungeon Tab ---
  renderDungeon() {
    const container = document.getElementById('dungeon-container');
    if (!container) return;
    const state = GameState.data;
    if (!state.dungeon) state.dungeon = { lastWeek: null, bestFloor: 0 };

    // If dungeon is active, render arena
    if (this._dungeonActive) {
      this._renderDungeonArena(container);
      return;
    }

    const ready = isDungeonReady(state.dungeon);
    const weekKey = getDungeonWeekKey();

    let html = `<div class="br-status">
      <div class="br-best">🏆 Best: Floor ${state.dungeon.bestFloor}</div>
      <div class="br-best" style="font-size:0.8em;opacity:0.7">Week: ${weekKey}</div>
    </div>`;

    // Reward tiers preview
    html += '<div class="br-rewards-preview"><h3>Floor Rewards</h3>';
    for (const r of DUNGEON_REWARDS) {
      const earned = state.dungeon.bestFloor >= r.floor;
      html += `<div class="br-tier ${earned ? 'br-tier-earned' : ''}">
        <span>Floor ${r.floor}:</span>
        <span>🪙${formatNumber(r.coins)} ✨${r.stardust}${r.gems ? ' 💎' + r.gems : ''}${r.essence ? ' 🌀' + r.essence : ''}</span>
      </div>`;
    }
    html += '</div>';

    if (ready) {
      html += '<button id="dg-start-btn" class="glow-btn" style="margin-top:12px;width:100%">🏚️ Enter Weekly Dungeon</button>';
    } else {
      html += `<p class="br-cooldown">Already attempted this week. Resets next Monday!</p>`;
    }

    container.innerHTML = html;

    const startBtn = container.querySelector('#dg-start-btn');
    if (startBtn) {
      startBtn.onclick = () => this._startDungeon();
    }
  }

  _startDungeon() {
    this._dungeonActive = true;
    this._dgFloor = 0;
    this._dgBossHp = 0;
    this._dgBossMaxHp = 0;
    this._dgTimer = 0;
    this._dgLastTick = Date.now();
    this._dgKills = 0;
    this._dgWeekSeed = getWeekSeed();
    this._spawnDungeonFloor();
    this.renderDungeon();
    this._dgInterval = setInterval(() => this._tickDungeon(), 100);
  }

  _spawnDungeonFloor() {
    const mod = getDungeonModifier(this._dgFloor, this._dgWeekSeed);
    this._dgModifier = mod;
    const hp = getDungeonFloorHp(this._dgFloor, GameState.data.currentStage, mod);
    this._dgBossHp = hp;
    this._dgBossMaxHp = hp;
    this._dgTimer = getDungeonFloorTimer(this._dgFloor, mod);
    this._dgLastTick = Date.now();
  }

  _tickDungeon() {
    const now = Date.now();
    const dt = now - this._dgLastTick;
    this._dgLastTick = now;

    // Timer countdown
    this._dgTimer -= dt;
    if (this._dgTimer <= 0) {
      this._endDungeon();
      return;
    }

    // Regen modifier
    if (this._dgModifier && this._dgModifier.regen) {
      this._dgBossHp = Math.min(this._dgBossMaxHp, this._dgBossHp + this._dgBossMaxHp * this._dgModifier.regen * (dt / 1000));
    }

    // Apply party DPS
    const state = GameState.data;
    let partyDps = 0;
    state.activeParty.forEach(uid => {
      const h = state.roster.find(r => r.uid === uid);
      if (h) partyDps += getHeroStats(h).dps;
    });
    const dpsUpg = 1 + getUpgradeEffect("upg_global_dps", state.upgrades["upg_global_dps"] || 0);
    let totalDps = partyDps * dpsUpg;

    // Armored modifier: reduce damage
    if (this._dgModifier && this._dgModifier.damageReduction) {
      totalDps *= (1 - this._dgModifier.damageReduction);
    }

    const dmg = totalDps * (dt / 1000);
    this._dgBossHp -= dmg;

    if (this._dgBossHp <= 0) {
      this._dgKills++;
      this._dgFloor++;
      this._spawnDungeonFloor();
    }

    const container = document.getElementById('dungeon-container');
    if (container) this._renderDungeonArena(container);
  }

  _renderDungeonArena(container) {
    const hpPct = Math.max(0, (this._dgBossHp / this._dgBossMaxHp) * 100);
    const timerSec = Math.max(0, this._dgTimer / 1000).toFixed(1);
    const floorName = getDungeonFloorName(this._dgFloor);
    const mod = this._dgModifier;

    container.innerHTML = `
      <div class="br-arena">
        <div class="br-wave-counter">Floor ${this._dgFloor + 1}</div>
        <div class="br-timer ${this._dgTimer < 10000 ? 'br-timer-danger' : ''}">${timerSec}s</div>
        <div class="br-boss-name">${floorName}</div>
        <div style="font-size:0.85em;opacity:0.8;margin:4px 0">${mod ? mod.name + ' — ' + mod.desc : ''}</div>
        <div class="br-hp-bar">
          <div class="br-hp-fill" style="width:${hpPct}%"></div>
        </div>
        <div class="br-hp-text">${formatNumber(Math.max(0, Math.floor(this._dgBossHp)))} / ${formatNumber(this._dgBossMaxHp)}</div>
        <div class="br-kills">Floors Cleared: ${this._dgKills}</div>
      </div>`;
  }

  _endDungeon() {
    clearInterval(this._dgInterval);
    this._dungeonActive = false;
    const state = GameState.data;
    if (!state.dungeon) state.dungeon = { lastWeek: null, bestFloor: 0 };
    state.dungeon.lastWeek = getDungeonWeekKey();

    const cleared = this._dgKills;
    if (cleared > state.dungeon.bestFloor) state.dungeon.bestFloor = cleared;

    const reward = getDungeonReward(cleared);
    if (reward) {
      if (reward.coins) GameState.addCoins(reward.coins);
      if (reward.stardust) GameState.addStardust(reward.stardust);
      if (reward.gems) GameState.addGems(reward.gems);
      if (reward.essence) GameState.addEssence(reward.essence);
      this.showNotification(`🏚️ Dungeon Complete! Floor ${cleared} reached! +${formatNumber(reward.coins)} coins, +${reward.stardust} stardust${reward.gems ? ', +' + reward.gems + ' gems' : ''}`);
    } else {
      this.showNotification(`🏚️ Dungeon Failed. 0 floors cleared. Train harder!`);
    }

    GameState.save();
    this.renderDungeon();
    this.updateStats();
  }

  // --- Expeditions Tab ---
  renderExpeditions() {
    const container = document.getElementById('expeditions-container');
    if (!container) return;
    const state = GameState.data;
    if (!state.expeditions) state.expeditions = [];

    const regions = getUnlockedRegions(state.currentStage);
    const activeExps = state.expeditions.filter(e => !e.claimed);

    // Idle heroes (in roster, not in party, not on expedition)
    const onExpUids = new Set(activeExps.filter(e => !e.completed || !e.claimed).map(e => e.heroUid));
    const idleHeroes = state.roster.filter(h =>
      !state.activeParty.includes(h.uid) && !onExpUids.has(h.uid)
    );

    let html = '';

    // Active expeditions
    if (activeExps.length > 0) {
      html += '<h3 class="exp-section-title">Active Expeditions</h3>';
      for (const exp of activeExps) {
        const region = ExpeditionRegions.find(r => r.id === exp.regionId);
        const hero = state.roster.find(h => h.uid === exp.heroUid);
        const heroTpl = hero ? HeroTemplate.find(t => t.id === hero.id) : null;
        const heroName = heroTpl ? heroTpl.name : 'Unknown';
        const heroElement = hero ? getHeroElement(hero.id) : null;
        const elementMatch = region && region.element && heroElement === region.element;

        html += `<div class="exp-card ${exp.completed ? 'exp-done' : ''}">
          <div class="exp-region-icon">${region ? region.icon : '?'}</div>
          <div class="exp-card-info">
            <span class="exp-region-name">${region ? region.name : 'Unknown'}</span>
            <span class="exp-hero-name">${heroName} ${elementMatch ? '🔷' : ''}</span>
            <span class="exp-timer">${exp.completed ? '✅ Complete!' : getExpeditionTimeLeft(exp)}</span>
          </div>
          ${exp.completed ? `<button class="quest-claim-btn exp-claim-btn" data-expid="${exp.id}">Claim</button>` : ''}
        </div>`;
      }
    }

    // Send new expedition
    if (activeExps.filter(e => !e.completed).length < 3 && regions.length > 0 && idleHeroes.length > 0) {
      html += '<h3 class="exp-section-title">Send Expedition</h3>';
      html += '<div class="exp-form">';
      html += '<select id="exp-hero-select" class="exp-select">';
      for (const h of idleHeroes) {
        const tpl = HeroTemplate.find(t => t.id === h.id);
        const el = getHeroElement(h.id);
        html += `<option value="${h.uid}">${tpl ? tpl.name : h.id} ${el ? '(' + el + ')' : ''}</option>`;
      }
      html += '</select>';
      html += '<select id="exp-region-select" class="exp-select">';
      for (const r of regions) {
        const dur = r.durationMs / 3600_000;
        html += `<option value="${r.id}">${r.icon} ${r.name} — ${dur}h (${r.element || 'any'})</option>`;
      }
      html += '</select>';
      html += '<button id="exp-send-btn" class="craft-btn">Send</button>';
      html += '</div>';
    } else if (idleHeroes.length === 0 && activeExps.filter(e => !e.completed).length < 3) {
      html += '<p class="exp-empty">No idle heroes available. Remove a hero from your party first.</p>';
    } else if (regions.length === 0) {
      html += '<p class="exp-empty">No regions unlocked yet. Progress further in stages!</p>';
    }

    container.innerHTML = html;

    // Bind claim buttons
    container.querySelectorAll('.exp-claim-btn').forEach(btn => {
      btn.onclick = () => {
        const exp = state.expeditions.find(e => e.id === btn.dataset.expid);
        if (!exp || !exp.completed || exp.claimed) return;
        const rewards = calculateExpeditionRewards(exp, state);
        if (!rewards) return;
        exp.claimed = true;
        GameState.addCoins(rewards.coins);
        state.stardust += rewards.stardust;
        rewards.items.forEach(it => state.inventory.push(it));
        const bonusText = rewards.elementBonus ? ' (Element Bonus!)' : '';
        this.showNotification(`Expedition: +${rewards.coins} coins, +${rewards.stardust} stardust${rewards.items.length ? ', +1 item' : ''}${bonusText}`);
        // Clean up claimed expeditions
        state.expeditions = state.expeditions.filter(e => !e.claimed);
        GameState.save();
        this.renderExpeditions();
        this.updateStats();
      };
    });

    // Bind send button
    const sendBtn = container.querySelector('#exp-send-btn');
    if (sendBtn) {
      sendBtn.onclick = () => {
        const heroUid = container.querySelector('#exp-hero-select').value;
        const regionId = container.querySelector('#exp-region-select').value;
        const result = startExpedition(state, heroUid, regionId);
        if (result.ok) {
          this.showNotification('Expedition started!');
          GameState.save();
          this.renderExpeditions();
        } else {
          this.showNotification(result.error);
        }
      };
    }

    // Auto-refresh timer every second if there are active expeditions
    if (activeExps.some(e => !e.completed)) {
      clearTimeout(this._expTimer);
      this._expTimer = setTimeout(() => this.renderExpeditions(), 1000);
    }
  }

  // --- Daily Quests Tab ---
  renderDailyQuests() {
    const container = document.getElementById('quests-container');
    if (!container) return;

    const state = GameState.data;
    const today = new Date().toISOString().slice(0, 10);
    const weekKey = getWeekKey(today);

    // Initialize or reset daily quests
    if (!state.dailyQuests) state.dailyQuests = { date: null, completed: [], snapshots: {}, streak: 0, lastStreakDate: null };
    if (state.dailyQuests.date !== today) {
      // Check if yesterday was a full completion for streak
      if (state.dailyQuests.date && state.dailyQuests.completed.length >= 3) {
        const yesterday = new Date(today + 'T12:00:00Z');
        yesterday.setUTCDate(yesterday.getUTCDate() - 1);
        const yStr = yesterday.toISOString().slice(0, 10);
        if (state.dailyQuests.date === yStr) {
          state.dailyQuests.streak = (state.dailyQuests.streak || 0) + 1;
          state.dailyQuests.lastStreakDate = today;
        } else {
          state.dailyQuests.streak = 0;
        }
      } else if (state.dailyQuests.date) {
        state.dailyQuests.streak = 0;
      }
      state.dailyQuests.date = today;
      state.dailyQuests.completed = [];
      state.dailyQuests.snapshots = { ...state.playerDamageStats };
      state.dailyQuests.snapshots._stagesAdvanced = state.currentStage;
      state.dailyQuests.snapshots._heroLevels = this._countTotalHeroLevels();
    }

    // Initialize or reset weekly quests
    if (!state.weeklyQuests) state.weeklyQuests = { week: null, completed: [], snapshots: {} };
    if (state.weeklyQuests.week !== weekKey) {
      state.weeklyQuests.week = weekKey;
      state.weeklyQuests.completed = [];
      state.weeklyQuests.snapshots = { ...state.playerDamageStats };
      state.weeklyQuests.snapshots._stagesAdvanced = state.currentStage;
      state.weeklyQuests.snapshots._heroLevels = this._countTotalHeroLevels();
    }

    const dailyQuests = getDailyQuests(today);
    const weeklyQuests = getWeeklyQuests(today);
    const streak = state.dailyQuests.streak || 0;
    const streakBonus = getStreakBonus(streak);

    let html = '';

    // Streak display
    html += `<div class="quest-streak-bar">
      <span class="quest-streak-label">🔥 Racha: ${streak} día${streak !== 1 ? 's' : ''}</span>
      ${streakBonus > 0 ? `<span class="quest-streak-bonus">+${streakBonus} 💎/día</span>` : ''}
    </div>`;

    // Daily section
    html += '<h3 class="quest-section-title">Diarias</h3>';
    html += this._renderQuestList(dailyQuests, state.dailyQuests, state);

    // Weekly section
    html += '<h3 class="quest-section-title" style="margin-top:14px;">Semanales</h3>';
    html += this._renderQuestList(weeklyQuests, state.weeklyQuests, state);

    container.innerHTML = html;

    // Bind claim buttons
    container.querySelectorAll('.quest-claim-btn').forEach(btn => {
      btn.onclick = () => this.claimQuest(btn.dataset.questId, btn.dataset.weekly === 'true');
    });
  }

  _renderQuestList(quests, questState, state) {
    const completed = questState.completed || [];
    return quests.map(quest => {
      const isDone = completed.includes(quest.id);
      const currentStats = { ...state.playerDamageStats, _stagesAdvanced: state.currentStage, _heroLevels: this._countTotalHeroLevels() };
      const startVal = questState.snapshots[quest.stat] || 0;
      const currentVal = currentStats[quest.stat] || 0;
      const progress = Math.max(0, currentVal - startVal);
      const pct = Math.min(100, (progress / quest.target) * 100);
      const isComplete = progress >= quest.target;

      const rewardParts = [];
      if (quest.reward.coins) rewardParts.push(`🪙${formatNumber(quest.reward.coins)}`);
      if (quest.reward.stardust) rewardParts.push(`✨${quest.reward.stardust}`);
      if (quest.reward.gems) rewardParts.push(`💎${quest.reward.gems}`);
      if (quest.reward.essence) rewardParts.push(`🌀${quest.reward.essence}`);

      return `<div class="quest-card ${isDone ? 'quest-done' : ''} ${isComplete && !isDone ? 'quest-claimable' : ''} ${quest.weekly ? 'quest-weekly' : ''}">
        <div class="quest-icon">${isDone ? '✅' : quest.icon}</div>
        <div class="quest-info">
          <div class="quest-name">${quest.name}</div>
          <div class="quest-desc">${quest.desc}</div>
          <div class="quest-progress-bar">
            <div class="quest-progress-fill" style="width:${isDone ? 100 : pct}%"></div>
          </div>
          <div class="quest-progress-text">${isDone ? 'Completada' : `${formatNumber(Math.min(progress, quest.target))} / ${formatNumber(quest.target)}`}</div>
        </div>
        <div class="quest-reward">
          <div class="quest-reward-label">${rewardParts.join(' ')}</div>
          ${isDone ? '<span class="quest-claimed">Reclamada</span>' : isComplete ? `<button class="quest-claim-btn" data-quest-id="${quest.id}" data-weekly="${!!quest.weekly}">Reclamar</button>` : ''}
        </div>
      </div>`;
    }).join('');
  }

  claimQuest(questId, isWeekly) {
    const state = GameState.data;
    const today = new Date().toISOString().slice(0, 10);
    const questState = isWeekly ? state.weeklyQuests : state.dailyQuests;
    if (!questState) return;
    if (questState.completed.includes(questId)) return;

    const quests = isWeekly ? getWeeklyQuests(today) : getDailyQuests(today);
    const quest = quests.find(q => q.id === questId);
    if (!quest) return;

    // Verify completion
    const currentStats = { ...state.playerDamageStats, _stagesAdvanced: state.currentStage, _heroLevels: this._countTotalHeroLevels() };
    const startVal = questState.snapshots[quest.stat] || 0;
    const progress = (currentStats[quest.stat] || 0) - startVal;
    if (progress < quest.target) return;

    // Grant rewards
    if (quest.reward.coins) GameState.addCoins(quest.reward.coins);
    if (quest.reward.stardust) GameState.addStardust(quest.reward.stardust);
    if (quest.reward.gems) GameState.addGems(quest.reward.gems);
    if (quest.reward.essence) GameState.addEssence(quest.reward.essence);

    questState.completed.push(questId);

    // Check if all 3 daily quests completed → award streak bonus
    if (!isWeekly && state.dailyQuests.completed.length === 3) {
      const streakBonus = getStreakBonus(state.dailyQuests.streak || 0);
      if (streakBonus > 0) {
        GameState.addGems(streakBonus);
        this.showNotification(`🔥 ¡Racha de ${state.dailyQuests.streak} días! +${streakBonus} 💎`);
      }
    }

    this.showNotification(`📋 ¡Misión completada! ${quest.icon} ${quest.name}`);
    this.renderDailyQuests();
    this.updateStats();
  }

  _countTotalHeroLevels() {
    return GameState.data.roster.reduce((sum, h) => sum + (h.level || 1), 0);
  }

  // --- Collections Tab ---
  renderCollections() {
    if (!this.dom.collectionsContainer) return;

    const gameData = {
      roster: GameState.data.roster,
      bestiary: GameState.data.bestiary || {},
      inventory: GameState.data.inventory,
    };

    this.dom.collectionsContainer.innerHTML = '';

    CollectionDatabase.forEach(col => {
      const status = getCollectionStatus(col, gameData);
      const card = document.createElement('div');
      card.className = `collection-card ${status.completed ? 'completed' : ''}`;

      let itemsHtml = '';
      if (col.type === 'hero') {
        col.requiredIds.forEach(id => {
          const template = HeroTemplate.find(t => t.id === id);
          const owned = status.ownedIds.includes(id);
          itemsHtml += `<div class="collection-item ${owned ? 'owned' : 'missing'}" title="${template ? template.name : id}" style="color:${owned && template ? template.rarity.color : 'var(--text-muted)'}">
            ${template ? template.svg : '?'}
          </div>`;
        });
      } else if (col.type === 'bestiary') {
        itemsHtml = `<div class="collection-item ${status.owned >= col.requiredCount ? 'owned' : 'missing'}">
          <span style="font-size:1.5em">📖</span>
          <small>${status.owned}/${col.requiredCount}</small>
        </div>`;
      } else if (col.type === 'items') {
        col.requiredCategories.forEach(cat => {
          const hasCategory = GameState.data.inventory.some(item => {
            const t = ItemTemplate.find(tmp => tmp.id === item.templateId);
            return t && t.category === cat;
          });
          itemsHtml += `<div class="collection-item ${hasCategory ? 'owned' : 'missing'}" title="${cat}">
            <span style="font-size:1.2em">${cat === 'Weapon' ? '⚔️' : cat === 'Armor' ? '🛡️' : '💍'}</span>
          </div>`;
        });
      }

      card.innerHTML = `
        <div class="collection-header">
          <div class="collection-name" style="color:${col.color}">${col.icon} ${col.name}</div>
          <div class="collection-progress">${status.owned}/${status.total}</div>
        </div>
        <div class="collection-desc">${col.desc}</div>
        <div class="collection-items">${itemsHtml}</div>
        <div class="collection-reward">${status.completed ? '✅' : '🔒'} Reward: ${col.reward.text}</div>
      `;

      this.dom.collectionsContainer.appendChild(card);

      // Track completed collections in GameState
      if (status.completed && !(GameState.data.completedCollections || []).includes(col.id)) {
        if (!GameState.data.completedCollections) GameState.data.completedCollections = [];
        GameState.data.completedCollections.push(col.id);
      }
    });

    // ── Render Relics ──
    if (this.dom.relicsContainer) {
      this.dom.relicsContainer.innerHTML = '';
      const prestige = GameState.data.prestigeCount || 0;
      RelicDatabase.forEach(relic => {
        const unlocked = isRelicUnlocked(relic, GameState.data);
        const val = getRelicBonusValue(relic, prestige);
        const card = document.createElement('div');
        card.className = `collection-card ${unlocked ? 'completed' : ''}`;
        card.innerHTML = `
          <div class="collection-header">
            <div class="collection-name" style="color:${unlocked ? relic.color : 'var(--text-muted)'}">${relic.icon} ${unlocked ? relic.name : '???'}</div>
            <div class="collection-progress">${unlocked ? '✅' : '🔒'}</div>
          </div>
          <div class="collection-desc">${unlocked ? relic.desc : relic.unlockDesc}</div>
          <div class="collection-reward" style="color:${relic.color}">${unlocked ? relic.bonusDesc(val) : 'Locked'}</div>
        `;
        this.dom.relicsContainer.appendChild(card);
      });
    }
  }

  // --- Storage Tab ---
  renderStorage() {
    if (!this.dom.storageWeapons) return;

    const storage = GameState.data.storage || [];
    const maxStorage = 50;

    this.dom.storageWeapons.innerHTML = '';
    this.dom.storageArmor.innerHTML = '';
    this.dom.storageAccessories.innerHTML = '';

    storage.forEach((item, idx) => {
      const stats = getItemStats(item);
      const el = document.createElement('div');
      el.className = 'inv-item';
      el.style.borderColor = stats.rarity.color;
      el.style.color = stats.rarity.color;
      el.innerHTML = stats.svg;
      el.title = `${stats.displayName || stats.name} (${stats.rarity.name}) — Click to retrieve`;
      el.onclick = () => {
        // Move item from storage to inventory
        GameState.data.storage.splice(idx, 1);
        GameState.data.inventory.push(item);
        this.showNotification(`Retrieved ${stats.name}`);
        this.renderStorage();
        this.renderInventory();
      };

      if (stats.category === ItemCategories.WEAPON) this.dom.storageWeapons.appendChild(el);
      else if (stats.category === ItemCategories.ARMOR) this.dom.storageArmor.appendChild(el);
      else if (stats.category === ItemCategories.ACCESSORY) this.dom.storageAccessories.appendChild(el);
    });

    if (this.dom.storageCapacity) {
      this.dom.storageCapacity.textContent = `${storage.length} / ${maxStorage}`;
    }
  }

  storeAllItems() {
    const storage = GameState.data.storage || [];
    const maxStorage = 50;
    const toStore = [...GameState.data.inventory];
    let stored = 0;

    toStore.forEach(item => {
      if (storage.length >= maxStorage) return;
      // Don't store equipped items
      const isEquipped = GameState.data.roster.some(h =>
        Object.values(h.equip).some(e => e && e.uid === item.uid)
      );
      if (!isEquipped) {
        storage.push(item);
        GameState.data.inventory = GameState.data.inventory.filter(i => i.uid !== item.uid);
        stored++;
      }
    });

    GameState.data.storage = storage;
    this.showNotification(`Stored ${stored} items`);
    this.renderStorage();
    this.renderInventory();
  }

  retrieveAllItems() {
    const storage = GameState.data.storage || [];
    const count = storage.length;
    GameState.data.inventory.push(...storage);
    GameState.data.storage = [];
    this.showNotification(`Retrieved ${count} items`);
    this.renderStorage();
    this.renderInventory();
  }

  // --- Tavern Hero Pool Preview ---
  renderTavernPool() {
    if (!this.dom.tavernPoolGrid) return;

    this.dom.tavernPoolGrid.innerHTML = '';

    // Group by rarity
    const rarityOrder = [Rarities.COMMON, Rarities.RARE, Rarities.EPIC, Rarities.LEGENDARY];
    rarityOrder.forEach(rarity => {
      const heroes = HeroTemplate.filter(h => h.rarity === rarity);
      heroes.forEach(hero => {
        const owned = GameState.data.roster.some(h => h.id === hero.id);
        const el = document.createElement('div');
        el.className = `pool-hero-thumb ${owned ? 'owned' : ''}`;
        el.style.borderColor = rarity.color;
        el.style.color = rarity.color;
        el.innerHTML = hero.svg;
        el.title = `${hero.name} (${rarity.name})${owned ? ' ✓ Owned' : ''}`;
        this.dom.tavernPoolGrid.appendChild(el);
      });
    });
  }

  // --- Multi-Summon ---
  multiSummon(type, count) {
    let summoned = 0;
    for (let i = 0; i < count; i++) {
      const costCheck = type === 'coin'
        ? GameState.data.coins >= Config.coinSummonCost
        : GameState.data.stardust >= Config.gachaCost;
      if (!costCheck) break;
      this.summonHero(type);
      summoned++;
    }
    if (summoned > 0) {
      this.showNotification(`Summoned ×${summoned} heroes!`);
      this.renderTavernPool();
    } else {
      this.showNotification('Not enough currency!');
    }
  }

  // --- Welcome Gifts ---
  showWelcomeGifts() {
    if (GameState.data.welcomeGiftClaimed) return;

    const overlay = document.createElement('div');
    overlay.className = 'welcome-overlay';
    overlay.innerHTML = `
      <div class="welcome-modal">
        <h2 style="color:var(--neon-purple);margin-bottom:8px;">🌙 Welcome to Midnight Gardens!</h2>
        <p style="color:var(--text-muted);margin-bottom:16px;">Here are some gifts to start your adventure!</p>
        <div class="welcome-gifts">
          <div class="welcome-gift"><div class="welcome-gift-icon">🪙</div><div>500 Coins</div></div>
          <div class="welcome-gift"><div class="welcome-gift-icon">✨</div><div>50 Stardust</div></div>
          <div class="welcome-gift"><div class="welcome-gift-icon">💎</div><div>5 Gems</div></div>
          <div class="welcome-gift"><div class="welcome-gift-icon">🗡️</div><div>Free Hero</div></div>
        </div>
        <button class="welcome-claim-btn">Claim Gifts!</button>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector('.welcome-claim-btn').onclick = () => {
      // Grant gifts
      GameState.data.coins += 500;
      GameState.data.stardust += 50;
      GameState.data.gems = (GameState.data.gems || 0) + 5;

      // Grant a free common hero
      const commonHeroes = HeroTemplate.filter(h => h.rarity === Rarities.COMMON);
      if (commonHeroes.length > 0) {
        const chosen = commonHeroes[Math.floor(Math.random() * commonHeroes.length)];
        GameState.addHero(chosen.id);
        this.showNotification(`Received ${chosen.name}!`);
      }

      GameState.data.welcomeGiftClaimed = true;
      overlay.remove();
      this.updateStats();
      this.renderRoster();
    };
  }

  // --- Offline Progress Modal ---
  showOfflineProgress(data) {
    const overlay = document.createElement('div');
    overlay.className = 'welcome-overlay';

    const rewards = [];
    if (data.coins > 0) rewards.push(`<div class="welcome-gift"><div class="welcome-gift-icon">🪙</div><div>${formatNumber(data.coins)} Coins</div></div>`);
    if (data.stardust > 0) rewards.push(`<div class="welcome-gift"><div class="welcome-gift-icon">✨</div><div>${formatNumber(data.stardust)} Stardust</div></div>`);
    if (data.gems > 0) rewards.push(`<div class="welcome-gift"><div class="welcome-gift-icon">💎</div><div>${formatNumber(data.gems)} Gems</div></div>`);
    if (data.xp > 0) rewards.push(`<div class="welcome-gift"><div class="welcome-gift-icon">⬆</div><div>${formatNumber(data.xp)} XP</div></div>`);
    if (data.enemies > 0) rewards.push(`<div class="welcome-gift"><div class="welcome-gift-icon">💀</div><div>${formatNumber(data.enemies)} Kills</div></div>`);
    if (data.stages > 0) rewards.push(`<div class="welcome-gift"><div class="welcome-gift-icon">🏔️</div><div>+${data.stages} Stages</div></div>`);

    overlay.innerHTML = `
      <div class="welcome-modal">
        <h2 style="color:var(--neon-cyan);margin-bottom:8px;">🌙 Welcome Back!</h2>
        <p style="color:var(--text-muted);margin-bottom:16px;">You were away for <span style="color:var(--neon-green)">${data.time}</span>. Your heroes kept fighting!</p>
        <div class="welcome-gifts">${rewards.join('')}</div>
        <p style="color:var(--text-muted);font-size:0.75rem;margin-top:8px;">Offline earnings are at 50% efficiency</p>
        <button class="welcome-claim-btn">Awesome!</button>
      </div>
    `;

    document.body.appendChild(overlay);
    overlay.querySelector('.welcome-claim-btn').onclick = () => overlay.remove();
  }

  // --- Stage Progress Indicator ---
  renderStageProgress() {
    if (!this.dom.stageProgressFill) return;
    const stage = GameState.data.currentStage;
    const posInCycle = stage % 10; // 0 = boss stage
    const nextBoss = stage + (10 - posInCycle);
    const pct = (posInCycle / 10) * 100;
    const currentLoop = Math.floor((stage - 1) / EnemyDatabase.length);

    this.dom.stageProgressFill.style.width = `${pct}%`;
    if (posInCycle >= 8) {
      this.dom.stageProgressFill.classList.add('boss-soon');
    } else {
      this.dom.stageProgressFill.classList.remove('boss-soon');
    }

    if (this.dom.stageLabel) {
      const tierInfo = currentLoop > 0 ? ` <span style="color:var(--neon-orange);font-size:0.75em">[Tier ${currentLoop}]</span>` : '';
      if (posInCycle === 0) {
        this.dom.stageLabel.innerHTML = `<span class="boss-tag">⚠ BOSS STAGE!</span>${tierInfo}`;
      } else {
        this.dom.stageLabel.innerHTML = `Next Boss: Stage ${nextBoss}${tierInfo}`;
      }
    }
  }

  // --- Tab Notification Badges ---
  updateTabBadges() {
    // Remove all existing badges from bottom nav items
    this.dom.navItems.forEach(item => {
      const existing = item.querySelector('.tab-badge');
      if (existing) existing.remove();
    });

    const state = GameState.data;

    // Academy → "power" category badge
    const canBuyUpgrade = UpgradeDatabase.some(u => {
      const lvl = state.upgrades[u.id] || 0;
      if (lvl >= u.maxLevel) return false;
      return state.coins >= getUpgradeCost(u.id, lvl);
    });
    if (canBuyUpgrade) this._addBadge('power', 'gold');

    // Tavern → "heroes" category badge
    const canSummon = state.coins >= Config.coinSummonCost || state.stardust >= Config.gachaCost;
    if (canSummon) this._addBadge('heroes', 'gold');

    // Events — daily login claimable → "world" category badge
    const loginStatus = getDailyLoginStatus(state.dailyLogin);
    if (loginStatus.canClaim) this._addBadge('world', 'green');

    // Shop — can afford a shop item → "power" category
    const canBuyShop = ShopDatabase.some(s => {
      const owned = (state.shopPurchases || {})[s.id] || 0;
      return owned < s.maxPurchases && (state.gems || 0) >= s.cost;
    });
    if (canBuyShop && !this._hasBadge('power')) this._addBadge('power', 'purple');

    // Prestige — gain > 0 → "power" category
    const gain = calculatePrestigeGain(state.currentStage);
    if (gain > 0 && !this._hasBadge('power')) this._addBadge('power', 'purple');
  }

  _addBadge(category, color = '') {
    const item = Array.from(this.dom.navItems).find(i => i.dataset.category === category);
    if (!item || item.querySelector('.tab-badge')) return;
    const dot = document.createElement('span');
    dot.className = `tab-badge ${color}`;
    item.appendChild(dot);
  }

  _hasBadge(category) {
    const item = Array.from(this.dom.navItems).find(i => i.dataset.category === category);
    return item && item.querySelector('.tab-badge');
  }

  // --- Daily Login Rewards ---
  renderDailyLogin() {
    if (!this.dom.dailyLoginBar) return;

    const loginData = GameState.data.dailyLogin || { lastClaimDate: null, streakDay: 0 };
    const status = getDailyLoginStatus(loginData);

    this.dom.dailyLoginBar.innerHTML = '';

    DailyLoginRewards.forEach((day, idx) => {
      const dayNum = idx + 1;
      const isClaimed = dayNum <= loginData.streakDay;
      const isToday = dayNum === (status.canClaim ? loginData.streakDay + 1 : loginData.streakDay);
      const isClaimable = status.canClaim && dayNum === loginData.streakDay + 1;

      const el = document.createElement('div');
      el.className = `daily-day ${isClaimed ? 'claimed' : ''} ${isToday ? 'today' : ''} ${isClaimable ? 'claimable' : ''}`;
      el.innerHTML = `<span class="day-icon">${isClaimed ? '✅' : day.icon}</span><span class="day-num">Day ${dayNum}</span>`;

      if (isClaimable) {
        el.onclick = () => this.claimDailyLogin();
      }

      this.dom.dailyLoginBar.appendChild(el);
    });

    // Update claim button
    if (this.dom.dailyClaimBtn) {
      this.dom.dailyClaimBtn.disabled = !status.canClaim;
      if (status.canClaim) {
        const nextDay = loginData.streakDay + 1;
        const reward = DailyLoginRewards[Math.min(nextDay - 1, DailyLoginRewards.length - 1)];
        this.dom.dailyClaimBtn.textContent = `Claim Day ${nextDay}: ${reward.label}`;
      } else {
        this.dom.dailyClaimBtn.textContent = 'Already claimed today! Come back tomorrow.';
      }
    }
  }

  claimDailyLogin() {
    const state = GameState.data;
    if (!state.dailyLogin) state.dailyLogin = { lastClaimDate: null, streakDay: 0 };

    const status = getDailyLoginStatus(state.dailyLogin);
    if (!status.canClaim) return;

    // Reset streak if it expired
    if (status.streakDay === 0 && state.dailyLogin.streakDay > 0) {
      state.dailyLogin.streakDay = 0;
    }

    state.dailyLogin.streakDay++;
    state.dailyLogin.lastClaimDate = new Date().toISOString().slice(0, 10);

    // Cycle rewards (mod 7)
    const rewardIdx = ((state.dailyLogin.streakDay - 1) % DailyLoginRewards.length);
    const reward = DailyLoginRewards[rewardIdx];

    if (reward.reward.coins) GameState.addCoins(reward.reward.coins);
    if (reward.reward.stardust) GameState.addStardust(reward.reward.stardust);
    if (reward.reward.gems) GameState.addGems(reward.reward.gems);
    if (reward.reward.essence) GameState.addEssence(reward.reward.essence);

    this.showNotification(`🎁 Day ${state.dailyLogin.streakDay} Login: ${reward.label}!`);
    this.renderDailyLogin();
    this.updateStats();
  }

  // --- Quick Equip Best Items ---
  quickEquipBestItems() {
    const state = GameState.data;
    let equipped = 0;

    // Only equip heroes in the active party
    const partyHeroes = state.activeParty.map(uid => state.roster.find(h => h.uid === uid)).filter(Boolean);

    if (partyHeroes.length === 0) {
      this.showNotification('No heroes in party! Equip heroes first.');
      return;
    }

    const slots = [
      { key: 'weapon', category: 'Weapon' },
      { key: 'armor', category: 'Armor' },
      { key: 'acc', category: 'Accessory' },
    ];

    partyHeroes.forEach(heroData => {
      slots.forEach(({ key, category }) => {
        if (heroData.equip[key]) return; // Already has something equipped

        // Find best unequipped item of this category (by rarity priority)
        const rarityPriority = { 'Legendary': 4, 'Epic': 3, 'Rare': 2, 'Common': 1 };
        const candidates = state.inventory
          .filter(item => {
            const t = ItemTemplate.find(tmp => tmp.id === item.templateId);
            return t && t.category === category;
          })
          .sort((a, b) => {
            const ra = rarityPriority[a.rarity?.name] || 0;
            const rb = rarityPriority[b.rarity?.name] || 0;
            return rb - ra;
          });

        if (candidates.length > 0) {
          GameState.equipItem(heroData.uid, candidates[0].uid, key);
          equipped++;
        }
      });
    });

    if (equipped > 0) {
      this.showNotification(`⚡ Auto-equipped ${equipped} items!`);
      this.renderRoster();
      this.renderInventory();
    } else {
      this.showNotification('No items available to equip.');
    }
  }

  // --- Item Stat Tooltips ---
  showItemTooltip(e, item) {
    this.hideItemTooltip();
    const stats = getItemStats(item);
    const tooltip = document.createElement('div');
    tooltip.className = 'item-tooltip';
    tooltip.style.borderColor = stats.rarity.color;

    let statsHtml = '';
    if (stats.dpsBonus) statsHtml += `<div class="item-tooltip-stat"><span class="item-tooltip-stat-label">DPS Bonus</span><span class="item-tooltip-stat-value">+${stats.dpsBonus.toFixed(1)}</span></div>`;
    if (stats.hpBonus) statsHtml += `<div class="item-tooltip-stat"><span class="item-tooltip-stat-label">HP Bonus</span><span class="item-tooltip-stat-value">+${stats.hpBonus}</span></div>`;
    if (stats.critBonus) statsHtml += `<div class="item-tooltip-stat"><span class="item-tooltip-stat-label">Crit Bonus</span><span class="item-tooltip-stat-value">+${(stats.critBonus * 100).toFixed(0)}%</span></div>`;

    tooltip.innerHTML = `
      <div class="item-tooltip-name" style="color:${stats.prefix ? stats.prefix.color : stats.rarity.color}">${stats.displayName || stats.name}</div>
      <div class="item-tooltip-rarity" style="color:${stats.rarity.color}">${stats.rarity.name}</div>
      ${stats.prefix ? `<div class="item-tooltip-prefix" style="color:${stats.prefix.color}">⚡ ${stats.prefix.bonus.type === 'dps' ? '+' + (stats.prefix.bonus.value * 100) + '% DPS' : stats.prefix.bonus.type === 'crit' ? '+' + stats.prefix.bonus.value + '% Crit' : '+' + (stats.prefix.bonus.value * 100) + '% Coins'}</div>` : ''}
      ${statsHtml ? '<div class="item-tooltip-stats">' + statsHtml + '</div>' : ''}
      <div class="item-tooltip-category">${stats.category || 'Item'}</div>
    `;

    document.body.appendChild(tooltip);
    this._itemTooltip = tooltip;

    // Position near cursor
    const x = Math.min(e.clientX + 12, window.innerWidth - 260);
    const y = Math.min(e.clientY + 12, window.innerHeight - 150);
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  }

  hideItemTooltip() {
    if (this._itemTooltip) {
      this._itemTooltip.remove();
      this._itemTooltip = null;
    }
  }

  // --- Item Sell/Salvage System ---
  getItemSellValue(item) {
    const rarityValues = { 'Common': 50, 'Rare': 200, 'Epic': 1000, 'Legendary': 5000 };
    const rarityName = item.rarity?.name || 'Common';
    return rarityValues[rarityName] || 50;
  }

  sellCommonItems() {
    this.sellByRarity('Common');
  }

  sellByRarity(rarityName) {
    const state = GameState.data;
    const matching = state.inventory.filter(item => {
      const itemRarity = item.rarity?.name || 'Common';
      if (itemRarity !== rarityName) return false;
      // Don't sell equipped items
      const isEquipped = state.roster.some(h =>
        Object.values(h.equip || {}).some(e => e && e.uid === item.uid)
      );
      return !isEquipped;
    });

    if (matching.length === 0) {
      this.showNotification(`No ${rarityName} items to sell.`);
      return;
    }

    this._confirmAction(`Sell ${rarityName} Items`, `Sell ${matching.length} ${rarityName} items?`, () => {
      let totalGold = 0;
      matching.forEach(item => {
        totalGold += this.getItemSellValue(item);
      });
      const uids = new Set(matching.map(i => i.uid));
      state.inventory = state.inventory.filter(i => !uids.has(i.uid));
      state.coins += totalGold;
      this.showNotification(`💰 Sold ${matching.length} ${rarityName} items for ${formatNumber(totalGold)} coins!`);
      this.renderInventory();
      this.updateStats();
    });
  }

  _confirmAction(title, message, onConfirm) {
    const overlay = document.createElement('div');
    overlay.className = 'welcome-overlay';
    overlay.innerHTML = `
      <div class="welcome-modal" style="max-width:360px;">
        <h2 style="color:var(--neon-orange);margin-bottom:8px;">⚠️ ${title}</h2>
        <p style="color:var(--text-muted);margin-bottom:16px;">${message}</p>
        <div style="display:flex;gap:8px;justify-content:center;">
          <button class="welcome-claim-btn confirm-yes" style="background:var(--neon-green);flex:1;">Confirm</button>
          <button class="welcome-claim-btn confirm-no" style="background:var(--hp-red);flex:1;">Cancel</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('.confirm-yes').onclick = () => { overlay.remove(); onConfirm(); };
    overlay.querySelector('.confirm-no').onclick = () => overlay.remove();
  }

  toggleSellMode() {
    this.sellMode = !this.sellMode;
    if (this.dom.btnSellSelected) {
      this.dom.btnSellSelected.textContent = this.sellMode ? '✅ Done' : '🗑️ Sell Mode';
      this.dom.btnSellSelected.classList.toggle('active', this.sellMode);
    }
    this._selectedForSale = this.sellMode ? new Set() : null;
    this.renderInventory();
  }

  sellSelectedItems() {
    if (!this._selectedForSale || this._selectedForSale.size === 0) {
      this.showNotification('No items selected for sale.');
      return;
    }

    const state = GameState.data;
    let totalGold = 0;
    this._selectedForSale.forEach(uid => {
      const item = state.inventory.find(i => i.uid === uid);
      if (item) totalGold += this.getItemSellValue(item);
    });

    state.inventory = state.inventory.filter(i => !this._selectedForSale.has(i.uid));
    state.coins += totalGold;

    this.showNotification(`💰 Sold ${this._selectedForSale.size} items for ${formatNumber(totalGold)} coins!`);
    this._selectedForSale = null;
    this.sellMode = false;
    if (this.dom.btnSellSelected) {
      this.dom.btnSellSelected.textContent = '🗑️ Sell Mode';
      this.dom.btnSellSelected.classList.remove('active');
    }
    this.renderInventory();
    this.updateStats();
  }

  // --- Bulk Hero Level-Up ---
  levelAllPartyHeroes() {
    const state = GameState.data;
    let totalSpent = 0;
    let totalLevels = 0;

    state.activeParty.forEach(uid => {
      const hero = state.roster.find(h => h.uid === uid);
      if (!hero) return;
      let leveled = true;
      while (leveled) {
        const cost = getHeroLevelCost(hero.id, hero.level);
        if (state.coins >= cost) {
          state.coins -= cost;
          hero.level++;
          totalSpent += cost;
          totalLevels++;
        } else {
          leveled = false;
        }
      }
    });

    if (totalLevels > 0) {
      this.showNotification(`⬆ Leveled party ${totalLevels} times (${formatNumber(totalSpent)} coins)`);
      this.renderRoster();
      this.renderActiveParty();
      this.renderHeroStatsPanel();
      this.updateStats();
    } else {
      this.showNotification('Not enough coins to level any hero.');
    }
  }

  // ── Auto-Fuse Items ──────────────────────────────────────────────
  autoFuseItems() {
    const state = GameState.data;
    let totalFused = 0;
    let keepGoing = true;
    while (keepGoing) {
      keepGoing = false;
      const groups = getCraftableGroups(state.inventory);
      for (const group of groups) {
        if (group.items.length >= CRAFT_COST) {
          const newItem = fuseItems(state.inventory, group.templateId, group.rarity.id);
          if (newItem) {
            state.inventory.push(newItem);
            totalFused++;
            keepGoing = true;
            break; // restart scan after mutation
          }
        }
      }
    }
    if (totalFused > 0) {
      this.showNotification(`🔄 Auto-fused ${totalFused} item${totalFused > 1 ? 's' : ''} into higher rarity!`);
      this.renderCrafting();
      this.renderInventory();
    } else {
      this.showNotification('No items available to fuse (need 3 identical).');
    }
  }

  // ── Auto-Fuse Heroes ─────────────────────────────────────────────
  autoFuseHeroes() {
    const state = GameState.data;
    let totalFused = 0;
    const rarityChain = ['common', 'rare', 'epic']; // can't fuse legendary

    let keepGoing = true;
    while (keepGoing) {
      keepGoing = false;
      // Group heroes by template id + rarity
      const groups = {};
      for (const h of state.roster) {
        const t = HeroTemplate.find(tp => tp.id === h.id);
        if (!t) continue;
        // Skip heroes in active party
        if (state.activeParty.includes(h.uid)) continue;
        const key = `${h.id}__${t.rarity.id}`;
        if (!groups[key]) groups[key] = { id: h.id, rarity: t.rarity, heroes: [] };
        groups[key].heroes.push(h);
      }
      for (const g of Object.values(groups)) {
        if (g.heroes.length < 3) continue;
        if (!rarityChain.includes(g.rarity.id)) continue;
        const nextRarity = g.rarity.id === 'common' ? Rarities.RARE
                         : g.rarity.id === 'rare' ? Rarities.EPIC
                         : Rarities.LEGENDARY;
        // Remove 3 heroes (unequip their items first)
        const toRemove = g.heroes.slice(0, 3);
        for (const h of toRemove) {
          // Return equipped items to inventory
          if (h.equip) {
            for (const slot of ['weapon', 'armor', 'acc']) {
              if (h.equip[slot]) {
                state.inventory.push(h.equip[slot]);
                h.equip[slot] = null;
              }
            }
          }
          const idx = state.roster.indexOf(h);
          if (idx !== -1) state.roster.splice(idx, 1);
        }
        // Find the upgraded hero template (same id but we store with higher level)
        const uid = 'h_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
        state.roster.push({
          id: g.id,
          uid,
          level: 1,
          ascensionLevel: 0,
          equip: { weapon: null, armor: null, acc: null },
          _fusedRarity: nextRarity.id, // mark as upgraded
        });
        totalFused++;
        keepGoing = true;
        break; // restart scan
      }
    }
    if (totalFused > 0) {
      this.showNotification(`🔄 Auto-fused ${totalFused} hero group${totalFused > 1 ? 's' : ''}!`);
      this.renderRoster();
      this.renderActiveParty();
    } else {
      this.showNotification('No duplicate heroes to fuse (need 3 identical, not in party).');
    }
  }

  // ============================================
  // SPIN WHEEL SYSTEM
  // ============================================
  renderSpinWheel() {
    if (!this.dom.spinWheelEl) return;
    const segments = SpinWheelPrizes.length;
    const anglePerSegment = 360 / segments;
  
    let html = '';
    SpinWheelPrizes.forEach((prize, i) => {
      const rotation = anglePerSegment * i;
      html += `<div class="spin-segment" style="--rotation: ${rotation}deg; --color: ${prize.color};">
        <span class="spin-segment-label">${prize.icon}</span>
      </div>`;
    });
    this.dom.spinWheelEl.innerHTML = html;
    this.dom.spinWheelEl.style.setProperty('--segments', segments);

    // Update button states
    const state = GameState.data;
    if (!state.spinWheel) state.spinWheel = { lastFreeSpinDate: null, history: [] };
    const free = canFreeSpin(state);
    if (this.dom.btnFreeSpin) {
      this.dom.btnFreeSpin.disabled = !free;
      this.dom.btnFreeSpin.textContent = free ? '🎡 Free Spin' : '✅ Claimed Today';
    }
    if (this.dom.btnGemSpin) {
      this.dom.btnGemSpin.disabled = (state.gems || 0) < SPIN_COST_GEMS;
    }

    // Render history
    if (this.dom.spinHistory && state.spinWheel.history) {
      const recent = state.spinWheel.history.slice(-5).reverse();
      this.dom.spinHistory.innerHTML = recent.length
        ? `<h4>Recent Spins</h4>` + recent.map(h => `<div class="spin-hist-entry">${h.icon} ${h.name} — ${h.label}</div>`).join('')
        : '';
    }
  }

  doSpin(type) {
    const state = GameState.data;
    if (!state.spinWheel) state.spinWheel = { lastFreeSpinDate: null, history: [] };

    if (type === 'free') {
      if (!canFreeSpin(state)) {
        this.showNotification('You already used your free spin today!');
        return;
      }
      state.spinWheel.lastFreeSpinDate = new Date().toDateString();
    } else {
      if (!GameState.spendGems(SPIN_COST_GEMS)) {
        this.showNotification('Not enough Gems!');
        return;
      }
    }

    // Disable buttons during spin
    if (this.dom.btnFreeSpin) this.dom.btnFreeSpin.disabled = true;
    if (this.dom.btnGemSpin) this.dom.btnGemSpin.disabled = true;

    const prize = spinWheel();
    const stage = state.currentStage;
    const segments = SpinWheelPrizes.length;
    const prizeIndex = SpinWheelPrizes.indexOf(prize);
    const anglePerSegment = 360 / segments;
    const targetAngle = 360 * 5 + (360 - prizeIndex * anglePerSegment - anglePerSegment / 2);

    // Animate wheel
    if (this.dom.spinWheelEl) {
      this.dom.spinWheelEl.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
      this.dom.spinWheelEl.style.transform = `rotate(${targetAngle}deg)`;
    }

    // Show result after animation
    setTimeout(() => {
      const rewards = prize.reward(stage);
      if (rewards.coins) GameState.addCoins(rewards.coins);
      if (rewards.stardust) GameState.addStardust(rewards.stardust);
      if (rewards.gems) GameState.addGems(rewards.gems);
      if (rewards.essence) GameState.addEssence(rewards.essence);
      if (rewards.xp) EventBus.emit('addXp', rewards.xp);

      const label = prize.label(stage);

      // Show result
      if (this.dom.spinResult) {
        this.dom.spinResult.style.display = 'block';
        if (this.dom.spinPrizeIcon) this.dom.spinPrizeIcon.textContent = prize.icon;
        if (this.dom.spinPrizeName) this.dom.spinPrizeName.textContent = prize.name;
        if (this.dom.spinPrizeLabel) this.dom.spinPrizeLabel.textContent = label;
      }

      this.showNotification(`🎡 ${prize.icon} ${prize.name}: ${label}`);

      // Record history
      if (!state.spinWheel.history) state.spinWheel.history = [];
      state.spinWheel.history.push({ icon: prize.icon, name: prize.name, label });
      if (state.spinWheel.history.length > 20) state.spinWheel.history = state.spinWheel.history.slice(-20);

      // Reset wheel after delay
      setTimeout(() => {
        if (this.dom.spinWheelEl) {
          this.dom.spinWheelEl.style.transition = 'none';
          this.dom.spinWheelEl.style.transform = 'rotate(0deg)';
        }
        this.renderSpinWheel();
      }, 2000);
    }, 4200);
  }

  // ============================================
  // PET / TAMAGOTCHI SYSTEM
  // ============================================
  renderPets() {
    const state = GameState.data;
    if (!state.pets) state.pets = { owned: [], activePetId: null };
    
    // Render pet grid (all available pets)
    if (this.dom.petGrid) {
      this.dom.petGrid.innerHTML = PetDatabase.map(pet => {
        const owned = state.pets.owned.find(p => p.id === pet.id);
        const isActive = state.pets.activePetId === pet.id;
        const mood = owned ? getPetMood(owned) : 0;
        const bonusInfo = pet.bonus(owned ? owned.level : 1, owned ? mood : 1);
        
        let costLabel = '';
        if (pet.unlockCost.coins) costLabel = `🪙 ${formatNumber(pet.unlockCost.coins)}`;
        else if (pet.unlockCost.stardust) costLabel = `✨ ${pet.unlockCost.stardust}`;
        else if (pet.unlockCost.gems) costLabel = `💎 ${pet.unlockCost.gems}`;
        else if (pet.unlockCost.essence) costLabel = `🌀 ${pet.unlockCost.essence}`;

        return `<div class="pet-card ${owned ? 'owned' : 'locked'} ${isActive ? 'active-pet' : ''}">
          <div class="pet-visual">${pet.svg}</div>
          <div class="pet-info">
            <div class="pet-name">${pet.icon} ${pet.name}</div>
            <div class="pet-species">${pet.species}</div>
            <div class="pet-desc">${pet.desc}</div>
            <div class="pet-bonus">Bonus: ${bonusInfo.desc}</div>
            ${owned ? `
              <div class="pet-stats-bar">
                <div class="pet-stat"><span>🍖</span><div class="pet-stat-fill" style="width:${owned.hunger}%;background:#ff7043;"></div></div>
                <div class="pet-stat"><span>😊</span><div class="pet-stat-fill" style="width:${owned.happiness}%;background:#ffca28;"></div></div>
                <div class="pet-stat"><span>⚡</span><div class="pet-stat-fill" style="width:${owned.energy}%;background:#4fc3f7;"></div></div>
              </div>
              <div class="pet-mood">Mood: ${Math.round(mood * 100)}% ${mood > 0.7 ? '😄' : mood > 0.4 ? '😐' : '😢'}</div>
              <div class="pet-level">Lv. ${owned.level} / ${pet.maxLevel}</div>
              ${!isActive ? `<button class="action-btn pet-btn" data-pet-action="activate" data-pet-id="${pet.id}">Set Active</button>` : '<span class="pet-active-badge">★ Active</span>'}
            ` : `
              <button class="action-btn pet-btn" data-pet-action="adopt" data-pet-id="${pet.id}">Adopt (${costLabel})</button>
            `}
          </div>
        </div>`;
      }).join('');
    }

    // Render active pet display
    if (this.dom.petActiveArea) {
      const activePet = state.pets.owned.find(p => p.id === state.pets.activePetId);
      if (activePet) {
        const template = PetDatabase.find(p => p.id === activePet.id);
        const mood = getPetMood(activePet);
        if (this.dom.petActions) this.dom.petActions.style.display = 'flex';
        this.dom.petActiveArea.innerHTML = `
          <div class="pet-active-display">
            <div class="pet-active-visual ${mood > 0.7 ? 'happy' : mood > 0.4 ? '' : 'sad'}">${template.svg}</div>
            <div class="pet-active-name">${template.icon} ${template.name} <small>Lv.${activePet.level}</small></div>
            <div class="pet-active-mood">${mood > 0.7 ? '😄 Happy!' : mood > 0.4 ? '😐 Okay' : '😢 Needs attention!'}</div>
          </div>`;
      } else {
        if (this.dom.petActions) this.dom.petActions.style.display = 'none';
        this.dom.petActiveArea.innerHTML = '<div class="pet-empty">No active companion. Adopt one below!</div>';
      }
    }
  }

  adoptPet(petId) {
    const state = GameState.data;
    if (!state.pets) state.pets = { owned: [], activePetId: null };
    if (state.pets.owned.find(p => p.id === petId)) {
      this.showNotification('You already own this companion!');
      return;
    }
    const template = PetDatabase.find(p => p.id === petId);
    if (!template) return;

    const cost = template.unlockCost;
    let success = false;
    if (cost.coins) success = GameState.spendCoins(cost.coins);
    else if (cost.stardust) success = GameState.spendStardust(cost.stardust);
    else if (cost.gems) success = GameState.spendGems(cost.gems);
    else if (cost.essence) success = GameState.spendEssence(cost.essence);

    if (!success) {
      this.showNotification('Not enough resources to adopt!');
      return;
    }

    state.pets.owned.push({
      id: petId,
      level: 1,
      hunger: 100,
      happiness: 100,
      energy: 100,
      active: true,
    });
    if (!state.pets.activePetId) state.pets.activePetId = petId;
    this.showNotification(`🐾 ${template.icon} ${template.name} has been adopted!`);
    this.renderPets();
  }

  activatePet(petId) {
    const state = GameState.data;
    if (!state.pets) return;
    state.pets.activePetId = petId;
    // Deactivate others, activate this one
    state.pets.owned.forEach(p => { p.active = p.id === petId; });
    this.showNotification(`${PetDatabase.find(p => p.id === petId)?.icon || '🐾'} is now your active companion!`);
    this.renderPets();
  }

  feedPet() {
    const state = GameState.data;
    const pet = state.pets?.owned?.find(p => p.id === state.pets.activePetId);
    if (!pet) return;
    // Use cheapest food the player can afford
    const food = PetFoods.find(f => {
      if (f.cost.coins) return state.coins >= f.cost.coins;
      if (f.cost.stardust) return state.stardust >= f.cost.stardust;
      if (f.cost.gems) return (state.gems || 0) >= f.cost.gems;
      if (f.cost.essence) return (state.essence || 0) >= f.cost.essence;
      return false;
    });
    if (!food) {
      this.showNotification('No food available! Need at least 100 coins.');
      return;
    }
    if (food.cost.coins) GameState.spendCoins(food.cost.coins);
    else if (food.cost.stardust) GameState.spendStardust(food.cost.stardust);
    else if (food.cost.gems) GameState.spendGems(food.cost.gems);
    else if (food.cost.essence) { state.essence = (state.essence || 0) - food.cost.essence; }

    pet.hunger = Math.min(100, (pet.hunger || 0) + food.hungerRestore);
    if (food.happinessRestore) pet.happiness = Math.min(100, (pet.happiness || 0) + food.happinessRestore);
    if (food.energyRestore) pet.energy = Math.min(100, (pet.energy || 0) + food.energyRestore);
    // Feeding also slightly increases level XP
    this._petXpGain(pet, 5);
    const parts = [`Hunger +${food.hungerRestore}`];
    if (food.happinessRestore) parts.push(`Happiness +${food.happinessRestore}`);
    if (food.energyRestore) parts.push(`Energy +${food.energyRestore}`);
    this.showNotification(`${food.icon} Fed ${PetDatabase.find(p => p.id === pet.id)?.name || 'pet'}! ${parts.join(', ')}`);
    this.renderPets();
  }

  playWithPet() {
    const state = GameState.data;
    const pet = state.pets?.owned?.find(p => p.id === state.pets.activePetId);
    if (!pet) return;
    if ((pet.energy || 0) < 10) {
      this.showNotification('Your companion is too tired to play! Let them rest.');
      return;
    }
    pet.happiness = Math.min(100, (pet.happiness || 0) + 25);
    pet.energy = Math.max(0, (pet.energy || 0) - 15);
    this._petXpGain(pet, 10);
    this.showNotification(`🎾 Played with ${PetDatabase.find(p => p.id === pet.id)?.name || 'pet'}! Happiness +25`);
    this.renderPets();
  }

  restPet() {
    const state = GameState.data;
    const pet = state.pets?.owned?.find(p => p.id === state.pets.activePetId);
    if (!pet) return;
    pet.energy = Math.min(100, (pet.energy || 0) + 40);
    this._petXpGain(pet, 3);
    this.showNotification(`😴 ${PetDatabase.find(p => p.id === pet.id)?.name || 'pet'} is resting! Energy +40`);
    this.renderPets();
  }

  _petXpGain(pet, amount) {
    if (!pet._xp) pet._xp = 0;
    pet._xp += amount;
    const template = PetDatabase.find(p => p.id === pet.id);
    const maxLvl = template ? template.maxLevel : 20;
    const xpNeeded = pet.level * 50;
    if (pet._xp >= xpNeeded && pet.level < maxLvl) {
      pet._xp -= xpNeeded;
      pet.level++;
      this.showNotification(`⬆ ${template?.icon || '🐾'} ${template?.name || 'Pet'} leveled up to Lv.${pet.level}!`);
    }
  }

  // ============================================
  // MINI-GAMES SYSTEM
  // ============================================
  renderMiniGames() {
    if (!this.dom.minigameContainer) return;
    const state = GameState.data;
    if (!state.miniGames) state.miniGames = {};

    this.dom.minigameContainer.innerHTML = MiniGameDatabase.map(game => {
      const ready = isMiniGameReady(game.id, state.miniGames);
      const cooldown = getMiniGameCooldown(game.id, state.miniGames);
      const cooldownStr = cooldown > 0 ? formatTime(Math.ceil(cooldown / 1000)) : '';
      const best = state.miniGames[game.id]?.bestScore;

      return `<div class="minigame-card ${ready ? '' : 'on-cooldown'}">
        <div class="mg-visual">${game.svg}</div>
        <div class="mg-info">
          <div class="mg-name">${game.icon} ${game.name}</div>
          <div class="mg-desc">${game.desc}</div>
          ${best !== undefined ? `<div class="mg-best">Best: ${best}</div>` : ''}
          <div class="mg-cost">${game.cost.coins ? `🪙 ${formatNumber(game.cost.coins)}` : ''}${game.cost.stardust ? `✨ ${game.cost.stardust}` : ''}</div>
          <button class="action-btn mg-play-btn ${ready ? '' : 'on-cooldown'}" data-mg-id="${game.id}" ${ready ? '' : 'disabled'}>
            ${ready ? '▶ Play' : `⏳ ${cooldownStr}`}
          </button>
        </div>
      </div>`;
    }).join('');
  }

  startMiniGame(gameId) {
    const state = GameState.data;
    if (!state.miniGames) state.miniGames = {};
    const game = MiniGameDatabase.find(g => g.id === gameId);
    if (!game) return;

    if (!isMiniGameReady(gameId, state.miniGames)) {
      this.showNotification('This game is still on cooldown!');
      return;
    }

    // Check & pay cost
    if (game.cost.coins && !GameState.spendCoins(game.cost.coins)) {
      this.showNotification('Not enough coins!'); return;
    }
    if (game.cost.stardust && !GameState.spendStardust(game.cost.stardust)) {
      this.showNotification('Not enough stardust!'); return;
    }

    // Record play time for cooldown
    if (!state.miniGames[gameId]) state.miniGames[gameId] = {};
    state.miniGames[gameId].lastPlayed = Date.now();

    if (gameId === 'mg_number_guess') this._playNumberGuess(game);
    else if (gameId === 'mg_memory') this._playMemoryMatch(game);
    else if (gameId === 'mg_reaction') this._playReactionGame(game);
  }

  _playNumberGuess(game) {
    if (!this.dom.minigamePlayArea) return;
    const target = Math.floor(Math.random() * game.targetRange) + 1;
    let attempts = 0;
    const max = game.maxAttempts;

    this.dom.minigamePlayArea.style.display = 'block';
    this.dom.minigamePlayArea.innerHTML = `
      <div class="mg-active">
        <h3>🔮 Mystic Oracle</h3>
        <p>I'm thinking of a number between 1 and ${game.targetRange}...</p>
        <div class="mg-attempts">Attempts: <span id="mg-attempts">0</span> / ${max}</div>
        <input type="number" id="mg-guess-input" min="1" max="${game.targetRange}" placeholder="Your guess..." class="mg-input" autofocus>
        <button id="mg-guess-btn" class="action-btn mg-play-btn">Guess!</button>
        <div id="mg-hint" class="mg-hint"></div>
      </div>`;

    const input = document.getElementById('mg-guess-input');
    const btn = document.getElementById('mg-guess-btn');
    const hint = document.getElementById('mg-hint');
    const attSpan = document.getElementById('mg-attempts');

    const doGuess = () => {
      const guess = parseInt(input.value);
      if (isNaN(guess) || guess < 1 || guess > game.targetRange) return;
      attempts++;
      attSpan.textContent = attempts;

      if (guess === target) {
        const tier = game.rewardTiers.find(t => attempts <= t.attempts) || game.rewardTiers[game.rewardTiers.length - 1];
        if (tier.coins) GameState.addCoins(tier.coins);
        if (tier.gems) GameState.addGems(tier.gems);
        hint.innerHTML = `<span style="color:#76ff03;">🎉 Correct! The number was ${target}! ${tier.label}<br>+${formatNumber(tier.coins)} Coins${tier.gems ? ` +${tier.gems} Gems` : ''}</span>`;
        btn.disabled = true;
        input.disabled = true;
        const best = GameState.data.miniGames['mg_number_guess'];
        if (!best.bestScore || attempts < best.bestScore) best.bestScore = attempts;
        setTimeout(() => { this.dom.minigamePlayArea.style.display = 'none'; this.renderMiniGames(); }, 3000);
      } else if (attempts >= max) {
        hint.innerHTML = `<span style="color:#ff1744;">❌ Out of attempts! The number was ${target}.</span>`;
        btn.disabled = true;
        input.disabled = true;
        setTimeout(() => { this.dom.minigamePlayArea.style.display = 'none'; this.renderMiniGames(); }, 2500);
      } else {
        hint.textContent = guess < target ? `📈 Higher! (${max - attempts} left)` : `📉 Lower! (${max - attempts} left)`;
      }
      input.value = '';
      input.focus();
    };

    btn.onclick = doGuess;
    input.onkeydown = (e) => { if (e.key === 'Enter') doGuess(); };
  }

  _playMemoryMatch(game) {
    if (!this.dom.minigamePlayArea) return;
    const symbols = [...game.symbols, ...game.symbols];
    // Shuffle
    for (let i = symbols.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [symbols[i], symbols[j]] = [symbols[j], symbols[i]];
    }

    let flipped = [];
    let matched = 0;
    let moves = 0;
    let locked = false;

    this.dom.minigamePlayArea.style.display = 'block';
    this.dom.minigamePlayArea.innerHTML = `
      <div class="mg-active">
        <h3>🃏 Shadow Match</h3>
        <div class="mg-moves">Moves: <span id="mg-moves">0</span></div>
        <div class="memory-grid" id="memory-grid">
          ${symbols.map((s, i) => `<div class="memory-card" data-idx="${i}" data-symbol="${s}"><div class="memory-front">?</div><div class="memory-back">${s}</div></div>`).join('')}
        </div>
      </div>`;

    const grid = document.getElementById('memory-grid');
    const movesEl = document.getElementById('mg-moves');

    grid.onclick = (e) => {
      if (locked) return;
      const card = e.target.closest('.memory-card');
      if (!card || card.classList.contains('flipped') || card.classList.contains('matched')) return;

      card.classList.add('flipped');
      flipped.push(card);

      if (flipped.length === 2) {
        moves++;
        movesEl.textContent = moves;
        locked = true;

        if (flipped[0].dataset.symbol === flipped[1].dataset.symbol) {
          flipped[0].classList.add('matched');
          flipped[1].classList.add('matched');
          matched++;
          flipped = [];
          locked = false;

          if (matched === game.pairs) {
            // Win!
            const tier = game.rewardTiers.find(t => moves <= t.moves) || game.rewardTiers[game.rewardTiers.length - 1];
            if (tier.coins) GameState.addCoins(tier.coins);
            if (tier.stardust) GameState.addStardust(tier.stardust);
            this.showNotification(`🃏 ${tier.label} +${formatNumber(tier.coins)} Coins +${tier.stardust} Stardust`);
            const best = GameState.data.miniGames['mg_memory'];
            if (!best.bestScore || moves < best.bestScore) best.bestScore = moves;
            setTimeout(() => { this.dom.minigamePlayArea.style.display = 'none'; this.renderMiniGames(); }, 2000);
          }
        } else {
          setTimeout(() => {
            flipped[0].classList.remove('flipped');
            flipped[1].classList.remove('flipped');
            flipped = [];
            locked = false;
          }, 800);
        }
      }
    };
  }

  _playReactionGame(game) {
    if (!this.dom.minigamePlayArea) return;
    let round = 0;
    const times = [];

    const runRound = () => {
      if (round >= game.rounds) {
        // Finished — calculate reward
        const avg = times.reduce((a, b) => a + b, 0) / times.length;
        const tier = game.rewardTiers.find(t => avg <= t.avgMs) || game.rewardTiers[game.rewardTiers.length - 1];
        if (tier.coins) GameState.addCoins(tier.coins);
        if (tier.gems) GameState.addGems(tier.gems);
        this.dom.minigamePlayArea.innerHTML = `
          <div class="mg-active">
            <h3>⚡ Results</h3>
            <p>Average: ${Math.round(avg)}ms — ${tier.label}</p>
            <p>+${formatNumber(tier.coins)} Coins${tier.gems ? ` +${tier.gems} Gems` : ''}</p>
          </div>`;
        const best = GameState.data.miniGames['mg_reaction'];
        if (!best.bestScore || avg < best.bestScore) best.bestScore = Math.round(avg);
        setTimeout(() => { this.dom.minigamePlayArea.style.display = 'none'; this.renderMiniGames(); }, 3000);
        return;
      }

      this.dom.minigamePlayArea.innerHTML = `
        <div class="mg-active mg-reaction-wait">
          <h3>⚡ Lightning Reflexes</h3>
          <p>Round ${round + 1} / ${game.rounds}</p>
          <div class="reaction-target" id="reaction-target" style="background:#333;border:2px solid #555;">
            <span>Wait for green...</span>
          </div>
        </div>`;

      const target = document.getElementById('reaction-target');
      const delay = 1000 + Math.random() * 3000;
      let startTime;

      const timer = setTimeout(() => {
        target.style.background = '#76ff03';
        target.querySelector('span').textContent = 'CLICK NOW!';
        startTime = Date.now();

        target.onclick = () => {
          const reactionTime = Date.now() - startTime;
          times.push(reactionTime);
          round++;
          target.style.background = '#333';
          target.querySelector('span').textContent = `${reactionTime}ms`;
          target.onclick = null;
          setTimeout(runRound, 800);
        };
      }, delay);

      // If they click early
      target.onclick = () => {
        clearTimeout(timer);
        target.style.background = '#ff1744';
        target.querySelector('span').textContent = 'Too early! Try again...';
        target.onclick = null;
        setTimeout(runRound, 1000);
      };
    };

    this.dom.minigamePlayArea.style.display = 'block';
    runRound();
  }

  // ============================================
  // TALENTS TAB
  // ============================================
  renderTalents() {
    const container = document.getElementById('talents-container');
    if (!container) return;
    const state = GameState.data;
    const talentState = state.talents || {};
    const bonuses = getTalentBonuses(talentState);
    const profileLevel = (state.profile || {}).level || 1;
    const unlocked = profileLevel >= 10;

    let html = '<div class="tab-content-inner"><h2 class="section-title">🌟 Global Talents</h2>';

    if (!unlocked) {
      html += `<div class="card" style="text-align:center;padding:2rem;opacity:0.7">
        <p style="font-size:1.2rem">🔒 Talents unlock at Profile Level 10</p>
        <p>Current Level: ${profileLevel}/10</p>
      </div></div>`;
      container.innerHTML = html;
      return;
    }

    html += `<p class="section-desc">Spend Stardust on permanent global bonuses. Current Stardust: <span style="color:var(--neon-orange)">✨ ${formatNumber(state.stardust)}</span></p>`;

    const branches = [
      { key: TalentBranches.OFFENSE, name: '⚔️ Offense', color: '#ff1744' },
      { key: TalentBranches.ECONOMY, name: '💰 Economy', color: '#ffd54f' },
      { key: TalentBranches.UTILITY, name: '🛠️ Utility', color: '#81c784' },
    ];

    branches.forEach(branch => {
      const bTalents = TalentDatabase.filter(t => t.branch === branch.key);
      html += `<div class="card" style="border-color:${branch.color}40">
        <h3 style="color:${branch.color}">${branch.name}</h3>
        <div class="talent-grid" style="display:grid;gap:0.5rem">`;

      bTalents.forEach(talent => {
        const lvl = talentState[talent.id] || 0;
        const maxed = lvl >= talent.maxLevel;
        const cost = maxed ? 0 : getTalentCost(talent.id, lvl);
        const canAfford = state.stardust >= cost;
        const canBuy = !maxed && canAfford && canUnlockTalent(talent.id, talentState);

        html += `<div class="upgrade-row ${maxed ? 'maxed' : ''}" style="display:flex;align-items:center;gap:0.75rem;padding:0.5rem;border-radius:8px;background:${maxed ? '#1a1a2e' : 'rgba(255,255,255,0.03)'}">
          <span style="font-size:1.5rem">${talent.icon}</span>
          <div style="flex:1">
            <div style="font-weight:600;color:${talent.color}">${talent.name} <span style="opacity:0.6">[${lvl}/${talent.maxLevel}]</span></div>
            <div style="font-size:0.75rem;opacity:0.7">${talent.desc}</div>
          </div>
          ${maxed
            ? '<span style="color:var(--neon-green);font-size:0.8rem">MAXED</span>'
            : `<button class="btn btn-sm ${canBuy ? 'btn-primary' : 'btn-disabled'}" data-talent-id="${talent.id}" ${canBuy ? '' : 'disabled'}>
                ✨ ${formatNumber(cost)}
              </button>`
          }
        </div>`;
      });

      html += '</div></div>';
    });

    html += '</div>';
    container.innerHTML = html;

    // Button handlers
    container.querySelectorAll('[data-talent-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const tid = btn.dataset.talentId;
        const lvl = (state.talents || {})[tid] || 0;
        const cost = getTalentCost(tid, lvl);
        if (GameState.spendStardust(cost)) {
          if (!state.talents) state.talents = {};
          state.talents[tid] = lvl + 1;
          AudioManager.playClick();
          GameState.save();
          this.renderTalents();
          this.updateStats();
        }
      });
    });
  }

  // ============================================
  // MASTERY TAB
  // ============================================
  renderMastery() {
    const container = document.getElementById('mastery-container');
    if (!container) return;
    const state = GameState.data;
    const prestigeCount = state.prestigeCount || 0;
    const masteryState = state.mastery || {};
    const totalSpent = getTotalMasteryPointsSpent(masteryState);
    const totalEarned = Math.max(0, prestigeCount - 2);
    const available = totalEarned - totalSpent;
    const unlocked = prestigeCount >= 3;

    let html = '<div class="tab-content-inner"><h2 class="section-title">🌀 Prestige Mastery</h2>';

    if (!unlocked) {
      html += `<div class="card" style="text-align:center;padding:2rem;opacity:0.7">
        <p style="font-size:1.2rem">🔒 Mastery unlocks at Prestige 3</p>
        <p>Current Prestige Count: ${prestigeCount}/3</p>
      </div></div>`;
      container.innerHTML = html;
      return;
    }

    html += `<div class="card" style="text-align:center">
      <p>Mastery Points: <span style="color:var(--neon-purple);font-weight:bold">${available}</span> available / ${totalEarned} earned</p>
      <p style="font-size:0.75rem;opacity:0.6">Earn 1 point per prestige (starting at prestige 3)</p>
    </div>`;

    // Show heroes with mastery trees
    const heroesInRoster = state.roster.map(h => h.id).filter((v, i, a) => a.indexOf(v) === i);

    heroesInRoster.forEach(heroId => {
      const template = HeroTemplate.find(t => t.id === heroId);
      if (!template) return;
      const tree = getHeroMasteryTree(heroId);
      const branches = ['power', 'fortune', 'guardian'];
      const branchNames = { power: '⚔️ Power', fortune: '💰 Fortune', guardian: '🛡️ Guardian' };
      const branchColors = { power: '#ff1744', fortune: '#ffd54f', guardian: '#81c784' };

      html += `<div class="card" style="border-color:${template.rarity.color}40">
        <h3 style="color:${template.rarity.color}">${template.name}</h3>`;

      branches.forEach(branch => {
        const nodes = tree.filter(n => n.branch === branch);
        html += `<div style="margin:0.5rem 0"><span style="color:${branchColors[branch]};font-weight:600">${branchNames[branch]}</span>
          <div style="display:flex;gap:0.3rem;flex-wrap:wrap;margin-top:0.25rem">`;

        nodes.forEach(node => {
          const lvl = (masteryState[heroId] || {})[node.id] || 0;
          const maxed = lvl >= node.maxLevel;
          const cost = node.tier;
          const canBuy = !maxed && available >= cost && canUnlockMasteryNode(heroId, node.id, masteryState);

          html += `<button class="btn btn-sm ${maxed ? 'btn-maxed' : canBuy ? 'btn-primary' : 'btn-disabled'}"
            title="${node.name}: ${node.desc} (Cost: ${cost} pts)"
            data-mastery-hero="${heroId}" data-mastery-node="${node.id}"
            ${canBuy ? '' : 'disabled'}
            style="min-width:2.5rem;font-size:0.75rem;${maxed ? 'background:#1a1a2e;color:var(--neon-green)' : ''}">
            ${node.icon} ${lvl}/${node.maxLevel}
          </button>`;
        });

        html += '</div></div>';
      });

      html += '</div>';
    });

    html += '</div>';
    container.innerHTML = html;

    // Button handlers
    container.querySelectorAll('[data-mastery-node]').forEach(btn => {
      btn.addEventListener('click', () => {
        const heroId = btn.dataset.masteryHero;
        const nodeId = btn.dataset.masteryNode;
        const tree = getHeroMasteryTree(heroId);
        const node = tree.find(n => n.id === nodeId);
        if (!node) return;

        const recalcSpent = getTotalMasteryPointsSpent(state.mastery || {});
        const recalcAvailable = Math.max(0, (state.prestigeCount || 0) - 2) - recalcSpent;

        if (recalcAvailable >= node.tier) {
          if (!state.mastery) state.mastery = {};
          if (!state.mastery[heroId]) state.mastery[heroId] = {};
          state.mastery[heroId][nodeId] = (state.mastery[heroId][nodeId] || 0) + 1;
          AudioManager.playClick();
          GameState.save();
          this.renderMastery();
        }
      });
    });
  }

  // ============================================
  // CHALLENGES TAB
  // ============================================
  renderChallenges() {
    const container = document.getElementById('challenges-container');
    if (!container) return;
    const state = GameState.data;
    const challengeState = state.challenges || {};
    const today = new Date().toISOString().split('T')[0];
    const dailyChallenges = generateDailyChallenges(today);
    const completedToday = challengeState.date === today ? (challengeState.completed || []) : [];
    const totalPoints = challengeState.totalPoints || 0;

    let html = '<div class="tab-content-inner"><h2 class="section-title">🏋️ Daily Challenges</h2>';
    html += `<div class="card" style="text-align:center">
      <p>Challenge Points: <span style="color:var(--neon-orange);font-weight:bold">${totalPoints}</span></p>
      <p style="font-size:0.75rem;opacity:0.6">Complete challenges for bonus rewards!</p>
    </div>`;

    // Daily challenges
    html += '<h3 class="section-subtitle">Today\'s Challenges</h3>';
    dailyChallenges.forEach((ch, idx) => {
      const completed = completedToday.includes(ch.modifier.id);
      const reward = getChallengeReward(ch, state.currentStage);

      html += `<div class="card ${completed ? 'completed-card' : ''}" style="border-left:3px solid ${ch.difficulty.color}">
        <div style="display:flex;align-items:center;gap:0.75rem">
          <span style="font-size:1.5rem">${ch.modifier.icon}</span>
          <div style="flex:1">
            <div style="font-weight:600;color:${ch.difficulty.color}">${ch.modifier.name} <span style="opacity:0.6">[${ch.difficulty.name}]</span></div>
            <div style="font-size:0.75rem;opacity:0.7">${ch.modifier.desc}</div>
            <div style="font-size:0.7rem;color:var(--neon-green);margin-top:0.25rem">
              Reward: ${formatNumber(reward.coins)} coins, ${formatNumber(reward.stardust)} stardust, ${reward.gems} gems, +${reward.challengePoints} pts
            </div>
          </div>
          ${completed
            ? '<span style="color:var(--neon-green)">✅ Done</span>'
            : `<button class="btn btn-sm btn-primary" data-challenge-idx="${idx}">Start</button>`
          }
        </div>
      </div>`;
    });

    // Reward milestones
    html += '<h3 class="section-subtitle">Point Rewards</h3>';
    const claimedRewards = challengeState.claimedRewards || [];
    ChallengeRewards.forEach(cr => {
      const claimed = claimedRewards.includes(cr.points);
      const canClaim = totalPoints >= cr.points && !claimed;
      html += `<div class="card" style="display:flex;align-items:center;gap:0.75rem;opacity:${totalPoints >= cr.points ? 1 : 0.5}">
        <span style="font-size:1.5rem">${cr.icon}</span>
        <div style="flex:1">
          <div style="font-weight:600">${cr.name} <span style="opacity:0.5">(${cr.points} pts)</span></div>
        </div>
        ${claimed ? '<span style="color:var(--neon-green)">✅</span>'
          : canClaim ? `<button class="btn btn-sm btn-primary" data-claim-challenge-pts="${cr.points}">Claim</button>`
          : `<span style="opacity:0.5">${totalPoints}/${cr.points}</span>`}
      </div>`;
    });

    html += '</div>';
    container.innerHTML = html;

    // Challenge start handlers
    container.querySelectorAll('[data-challenge-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.challengeIdx);
        const ch = dailyChallenges[idx];
        const reward = getChallengeReward(ch, state.currentStage);

        // Auto-complete for now (instant reward)
        if (!state.challenges) state.challenges = { date: today, completed: [], totalCompleted: 0, nightmaresCompleted: 0, totalPoints: 0, claimedRewards: [] };
        if (state.challenges.date !== today) {
          state.challenges.date = today;
          state.challenges.completed = [];
        }
        state.challenges.completed.push(ch.modifier.id);
        state.challenges.totalCompleted = (state.challenges.totalCompleted || 0) + 1;
        if (ch.difficulty.id === 'nightmare') state.challenges.nightmaresCompleted = (state.challenges.nightmaresCompleted || 0) + 1;
        state.challenges.totalPoints = (state.challenges.totalPoints || 0) + reward.challengePoints;

        GameState.addCoins(reward.coins);
        GameState.addStardust(reward.stardust);
        GameState.addGems(reward.gems);

        this.showNotification(`Challenge complete! +${formatNumber(reward.coins)} coins, +${reward.challengePoints} pts`);
        AudioManager.playAchievement();
        GameState.save();
        this.renderChallenges();
        this.updateStats();
      });
    });

    // Claim reward handlers
    container.querySelectorAll('[data-claim-challenge-pts]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pts = parseInt(btn.dataset.claimChallengePts);
        const cr = ChallengeRewards.find(r => r.points === pts);
        if (!cr) return;

        if (!state.challenges) state.challenges = {};
        if (!state.challenges.claimedRewards) state.challenges.claimedRewards = [];
        state.challenges.claimedRewards.push(pts);

        if (cr.reward.coins) GameState.addCoins(cr.reward.coins);
        if (cr.reward.stardust) GameState.addStardust(cr.reward.stardust);
        if (cr.reward.gems) GameState.addGems(cr.reward.gems);
        if (cr.reward.essence) GameState.addEssence(cr.reward.essence);

        this.showNotification(`Claimed ${cr.name}!`);
        AudioManager.playMilestone();
        GameState.save();
        this.renderChallenges();
        this.updateStats();
      });
    });
  }

  // ============================================
  // BANNERS TAB
  // ============================================
  renderBanners() {
    const container = document.getElementById('banners-container');
    if (!container) return;
    const state = GameState.data;
    const banner = getActiveBanner();
    const bannerHistory = state.bannerHistory || {};
    const bannerData = bannerHistory[banner.id] || { summonCount: 0, pityCounter: 0 };
    const pityProg = getPityProgress(bannerData.pityCounter || 0, banner);

    let html = '<div class="tab-content-inner"><h2 class="section-title">🎪 Summon Banners</h2>';

    // Active banner
    html += `<div class="card" style="border:2px solid ${banner.color};background:linear-gradient(135deg, ${banner.color}10, transparent)">
      <div style="display:flex;align-items:center;gap:1rem">
        <span style="font-size:2.5rem">${banner.icon}</span>
        <div style="flex:1">
          <h3 style="color:${banner.color};margin:0">${banner.name}</h3>
          <p style="font-size:0.8rem;opacity:0.8;margin:0.25rem 0">${banner.desc}</p>
          <p style="font-size:0.75rem;color:var(--neon-orange)">⏰ ${banner.daysRemaining}d ${banner.hoursRemaining}h remaining</p>
        </div>
      </div>`;

    // Featured heroes
    html += '<div style="margin-top:0.75rem"><span style="font-size:0.8rem;opacity:0.7">Featured Heroes (${banner.rateUpMultiplier}× rate):</span><div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.25rem">';
    banner.featuredHeroes.forEach(hId => {
      const template = HeroTemplate.find(t => t.id === hId);
      if (template) {
        html += `<span class="badge" style="background:${template.rarity.color}20;color:${template.rarity.color};border:1px solid ${template.rarity.color}40;padding:0.2rem 0.5rem;border-radius:4px;font-size:0.75rem">${template.name}</span>`;
      } else {
        html += `<span class="badge" style="opacity:0.5;padding:0.2rem 0.5rem;font-size:0.75rem">???</span>`;
      }
    });
    html += '</div></div>';

    // Pity progress
    html += `<div style="margin-top:0.75rem">
      <div style="display:flex;justify-content:space-between;font-size:0.75rem">
        <span>Pity: ${bannerData.pityCounter || 0}/${banner.pityThreshold}</span>
        <span style="color:var(--neon-purple)">${Math.floor(pityProg * 100)}%</span>
      </div>
      <div style="height:4px;background:rgba(255,255,255,0.1);border-radius:2px;margin-top:0.25rem">
        <div style="height:100%;width:${pityProg * 100}%;background:var(--neon-purple);border-radius:2px;transition:width 0.3s"></div>
      </div>
    </div>`;

    html += '</div>';

    // All banners rotation schedule
    html += '<h3 class="section-subtitle">Banner Rotation</h3>';
    BannerDatabase.forEach(b => {
      const isActive = b.id === banner.id;
      html += `<div class="card" style="display:flex;align-items:center;gap:0.75rem;${isActive ? `border:1px solid ${b.color}` : 'opacity:0.6'}">
        <span style="font-size:1.3rem">${b.icon}</span>
        <div style="flex:1">
          <div style="font-weight:600;color:${b.color}">${b.name} ${isActive ? '<span style="color:var(--neon-green)">(ACTIVE)</span>' : ''}</div>
          <div style="font-size:0.7rem;opacity:0.7">${b.desc}</div>
        </div>
      </div>`;
    });

    html += '</div>';
    container.innerHTML = html;
  }
}

// Función global para ascender héroes desde el botón
window.ascendHero = function(heroUid) {
  const template = GameState.ascendHero(heroUid);
  if (template) {
    const hero = GameState.data.roster.find(h => h.uid === heroUid);
    const ascLevel = hero ? hero.ascensionLevel : 1;
    GameState.save();
    // Find UIManager instance via DOM event
    const evt = new CustomEvent('heroAscended', { detail: { heroUid, template, ascLevel } });
    document.dispatchEvent(evt);
  }
};
