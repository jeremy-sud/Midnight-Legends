import { GameState } from "./GameState.js";
import { Config } from "./Config.js";
import { getEnemyStats } from "../entities/EnemyDatabase.js";
import { getHeroStats } from "../entities/HeroDatabase.js";
import { generateRandomLootDrop } from "../entities/ItemDatabase.js";
import { getUpgradeEffect } from "../entities/UpgradeDatabase.js";
import { TowerDatabase } from "../entities/TowerDatabase.js";
import { getSynergyBonuses } from "../entities/SynergyDatabase.js";
import { getShopBonuses } from "../entities/ShopDatabase.js";
import { getPrestigeBonuses, calculatePrestigeGain } from "../entities/PrestigeDatabase.js";
import { getPetBonuses, decayPetNeeds } from "../entities/PetDatabase.js";
import { getEventBonuses } from "../entities/EventDatabase.js";
import { getCollectionBonuses } from "../entities/CollectionDatabase.js";
import { getUnclaimedMilestones } from "../entities/MilestoneDatabase.js";
import { getPartySkillBonuses } from "../entities/SkillDatabase.js";
import { formatNumber } from "./Utils.js";
import { getPartyElementMultiplier, processStatusEffects, createStatusEffect, EnemyAuras, getComboTier, Elements } from "../entities/ElementDatabase.js";
import { getHeroActiveSkill, getSkillDamage } from "../entities/HeroActiveSkills.js";
import { tickExpeditions } from "../entities/ExpeditionDatabase.js";
import { getHeroElement } from "../entities/HeroDatabase.js";
import { generateRuneDrop, getRuneInfo } from "../entities/RuneDatabase.js";
import { getRelicBonuses } from "../entities/RelicDatabase.js";

export class Engine {
  constructor(uiManager) {
    this.ui = uiManager;
    this.lastTick = Date.now();
    this.towerActive = false;
    this.towerEnemyHp = 0;
    this.towerEnemyMaxHp = 0;
    this.towerTimeRemaining = 0;

    // ── Combat State ──
    this.enemyStatusEffects = [];      // active status effects on current enemy
    this.enemyAuraTriggered = {};      // which auras already triggered this fight
    this.enemyShieldHp = 0;            // void barrier / shield HP
    this.comboHits = 0;                // combo counter
    this.comboTimer = 0;               // ms until combo resets
    this.skillCooldowns = {};          // { heroUid: remainingMs }
    this.partyBuffs = [];              // temporary party-wide buffs from skills
    this.currentEnemyElement = null;   // cached element of current enemy
    this.currentEnemyAura = null;      // cached aura of current enemy
    this.isEliteEnemy = false;         // whether current enemy is elite
  }

  start() {
    // If starting fresh or enemy is dead, spawn initial enemy
    const state = GameState.data;
    if (
      state.currentEnemyHp <= 0 ||
      state.currentEnemyMaxHp === 0 ||
      !state.currentEnemyMaxHp
    ) {
      this.spawnEnemy();
    } else {
      // Re-render existing enemy from save
      const enemyInfo = getEnemyStats(state.currentStage);
      this.ui.renderEnemy(enemyInfo);
      this.ui.updateHealthBar(state.currentEnemyHp, state.currentEnemyMaxHp);
    }

    // Offline progress calculation
    this.calculateOfflineProgress();

    // UI Init
    this.ui.init();

    // Set intervals
    setInterval(() => this.tick(), Config.gameTickMs);
    setInterval(() => {
      if (GameState.data.settings && GameState.data.settings.autoSaveEnabled !== false) {
        GameState.save();
      }
    }, Config.autoSaveMs);
  }

  calculateOfflineProgress() {
    const state = GameState.data;
    const lastOnline = state.lastOnlineTimestamp || Date.now();
    const now = Date.now();
    const offlineMs = now - lastOnline;
    const offlineSec = offlineMs / 1000;

    // Minimum 60 seconds offline for rewards, max 8 hours
    if (offlineSec < 60) return;
    const cappedSec = Math.min(offlineSec, 8 * 3600);

    // Calculate offline DPS (same as tick)
    let partyDps = 0;
    state.activeParty.forEach((uid) => {
      const heroData = state.roster.find((h) => h.uid === uid);
      if (heroData) partyDps += getHeroStats(heroData).dps;
    });

    const dpsMult = 1 + getUpgradeEffect("upg_global_dps", state.upgrades["upg_global_dps"] || 0);
    const shopBonuses = getShopBonuses(state.shopPurchases || {});
    const prestigeBonuses = getPrestigeBonuses(state.prestigeUpgrades || {});
    const collectionBonuses = getCollectionBonuses(state);
    partyDps *= dpsMult * shopBonuses.dpsMultiplier * prestigeBonuses.dpsMultiplier * collectionBonuses.dpsMultiplier;

    // Autoclicker damage
    let autoclickDmg = 0;
    if (state.autoclickerLevel > 0) {
      const profile = state.profile || { level: 1 };
      const basePowerUpg = getUpgradeEffect("upg_base_power", state.upgrades["upg_base_power"] || 0);
      const baseDmg = 1 + (profile.level - 1) * 2 + Math.floor(state.currentStage / 3) + basePowerUpg;
      const clickDmg = baseDmg + partyDps * 0.15;
      const familiarMult = 1 + getUpgradeEffect("upg_familiar_speed", state.upgrades["upg_familiar_speed"] || 0);
      autoclickDmg = state.autoclickerLevel * clickDmg * familiarMult * shopBonuses.familiarMultiplier * prestigeBonuses.familiarMultiplier;
    }

    const totalDps = partyDps + autoclickDmg;
    if (totalDps <= 0) return; // No DPS = no offline progress

    // Estimate kills during offline period (50% efficiency — idle penalty)
    const efficiency = 0.5;
    const effectiveDps = totalDps * efficiency;

    let coinsEarned = 0;
    let stardustEarned = 0;
    let gemsEarned = 0;
    let xpEarned = 0;
    let enemiesKilled = 0;
    let stagesCleared = 0;

    let simStage = state.currentStage;
    let simTime = cappedSec;

    while (simTime > 0) {
      const enemyInfo = getEnemyStats(simStage);
      const killTime = enemyInfo.maxHp / effectiveDps;
      if (killTime > simTime || killTime <= 0) break;

      simTime -= killTime;
      enemiesKilled++;

      // Coins
      const coinMult = 1 + getUpgradeEffect("upg_coin_mult", state.upgrades["upg_coin_mult"] || 0);
      const soulSiphonBonus = 1 + getUpgradeEffect("upg_hp_drain", state.upgrades["upg_hp_drain"] || 0);
      coinsEarned += Math.floor(enemyInfo.coinDrop * coinMult * soulSiphonBonus * shopBonuses.coinMultiplier * prestigeBonuses.coinMultiplier * collectionBonuses.coinMultiplier);

      // Stardust
      if (enemyInfo.stardustDrop > 0) {
        stardustEarned += Math.max(1, Math.floor(enemyInfo.stardustDrop * shopBonuses.stardustMultiplier * prestigeBonuses.stardustMultiplier * collectionBonuses.stardustMultiplier));
      }

      // Gems (bosses only during offline)
      if (enemyInfo.isBoss) {
        gemsEarned += Math.max(1, Math.floor(simStage / 10));
      }

      // XP
      const xpUpgBonus = 1 + getUpgradeEffect("upg_xp_boost", state.upgrades["upg_xp_boost"] || 0);
      const baseXp = enemyInfo.isBoss ? simStage * 8 : Math.max(1, Math.floor(simStage * 1.5));
      xpEarned += Math.floor(baseXp * shopBonuses.xpMultiplier * prestigeBonuses.xpMultiplier * collectionBonuses.xpMultiplier * xpUpgBonus);

      simStage++;
      stagesCleared++;

      // Safety cap: max 500 stage advances
      if (stagesCleared >= 500) break;
    }

    // Idle coin fountain during offline
    const idleCoinsPerSec = getUpgradeEffect("upg_idle_coins", state.upgrades["upg_idle_coins"] || 0);
    if (idleCoinsPerSec > 0) {
      const coinMult = 1 + getUpgradeEffect("upg_coin_mult", state.upgrades["upg_coin_mult"] || 0);
      coinsEarned += Math.floor(idleCoinsPerSec * coinMult * cappedSec);
    }

    if (coinsEarned <= 0 && stardustEarned <= 0 && gemsEarned <= 0) return;

    // Apply rewards
    GameState.addCoins(coinsEarned);
    GameState.addStardust(stardustEarned);
    if (gemsEarned > 0) GameState.addGems(gemsEarned);
    if (xpEarned > 0) this.addXp(xpEarned);

    state.currentStage += stagesCleared;
    state.playerDamageStats.enemiesDefeated += enemiesKilled;

    // Re-spawn enemy at new stage
    this.spawnEnemy();

    // Format offline time
    const hours = Math.floor(cappedSec / 3600);
    const mins = Math.floor((cappedSec % 3600) / 60);
    const timeStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

    this.ui.showOfflineProgress({
      time: timeStr,
      coins: coinsEarned,
      stardust: stardustEarned,
      gems: gemsEarned,
      xp: xpEarned,
      enemies: enemiesKilled,
      stages: stagesCleared,
    });
  }

  spawnEnemy() {
    const state = GameState.data;
    const enemyInfo = getEnemyStats(state.currentStage);

    // Elite enemy chance: 3% for normal, 0% for bosses
    this.isEliteEnemy = !enemyInfo.isBoss && Math.random() < 0.03;
    if (this.isEliteEnemy) {
      // Elite enemies have 2× HP but give 3× rewards
      enemyInfo.maxHp = Math.floor(enemyInfo.maxHp * 2);
      enemyInfo.coinDrop = Math.floor(enemyInfo.coinDrop * 3);
      if (enemyInfo.stardustDrop) enemyInfo.stardustDrop = Math.floor(enemyInfo.stardustDrop * 3);
      enemyInfo.name = `⚡ ${enemyInfo.name}`;
      enemyInfo.isElite = true;
    }

    state.currentEnemyHp = enemyInfo.maxHp;
    state.currentEnemyMaxHp = enemyInfo.maxHp;

    // Reset combat state for new enemy
    this.enemyStatusEffects = [];
    this.enemyAuraTriggered = {};
    this.enemyShieldHp = 0;
    this.currentEnemyElement = enemyInfo.element || null;
    this.currentEnemyAura = enemyInfo.aura || null;

    // Void barrier aura: create shield on spawn
    if (this.currentEnemyAura === 'void_barrier') {
      const auraData = EnemyAuras.VOID_BARRIER;
      this.enemyShieldHp = Math.floor(enemyInfo.maxHp * (auraData.shieldPercent || 0.3));
    }

    this.ui.renderEnemy(enemyInfo, this.currentEnemyElement, this.currentEnemyAura);
  }

  tick() {
    const now = Date.now();
    const deltaMs = now - this.lastTick;
    this.lastTick = now;

    const state = GameState.data;

    // Calculate total Party DPS
    let partyDps = 0;
    state.activeParty.forEach((uid) => {
      const heroData = state.roster.find((h) => h.uid === uid);
      if (heroData) {
        const stats = getHeroStats(heroData);
        partyDps += stats.dps;
      }
    });

    // Apply Global DPS Upgrade Multiplier
    const dpsMult =
      1 +
      getUpgradeEffect("upg_global_dps", state.upgrades["upg_global_dps"] || 0);
    const synergyBonuses = getSynergyBonuses(state.activeParty, state.roster);
    const shopBonuses = getShopBonuses(state.shopPurchases || {});
    const prestigeBonuses = getPrestigeBonuses(state.prestigeUpgrades || {});
    const eventBonuses = getEventBonuses();
    const collectionBonuses = getCollectionBonuses(state);
    const skillBonuses = getPartySkillBonuses(state.activeParty, state.roster);
    const petBonuses = getPetBonuses(state.pets || {});
    const relicBonuses = getRelicBonuses(state);
    partyDps *= dpsMult * (1 + synergyBonuses.dpsBonus) * (1 + (skillBonuses.dpsBonus || 0)) * (1 + (petBonuses.dpsBonus || 0)) * shopBonuses.dpsMultiplier * prestigeBonuses.dpsMultiplier * eventBonuses.dpsMultiplier * collectionBonuses.dpsMultiplier * relicBonuses.dpsMultiplier;

    // Autoclicker Damage
    let autoclickDamage = 0;
    if (state.autoclickerLevel > 0) {
      // Incremental autoclick: scales with level, stage, and party
      const profile = state.profile || { level: 1 };
      const clicksPerSec = state.autoclickerLevel;
      const basePowerUpg = getUpgradeEffect("upg_base_power", state.upgrades["upg_base_power"] || 0);
      const baseDmg = 1 + (profile.level - 1) * 2 + Math.floor(state.currentStage / 3) + basePowerUpg;
      const clickDmg = baseDmg + partyDps * 0.15;
      const familiarMult = 1 + getUpgradeEffect("upg_familiar_speed", state.upgrades["upg_familiar_speed"] || 0);
      autoclickDamage = clicksPerSec * clickDmg * familiarMult * shopBonuses.familiarMultiplier * prestigeBonuses.familiarMultiplier;
    }

    // Apply passive damage and Tower Timer logic
    const totalPassiveDps = partyDps + autoclickDamage;
    let damageAmount = totalPassiveDps * (deltaMs / 1000);

    // ── Pet Combat Attack ──
    // Active pet deals periodic damage based on level and mood
    if (petBonuses.dpsBonus > 0) {
      const petAttackDps = partyDps * petBonuses.dpsBonus * 0.5;
      damageAmount += petAttackDps * (deltaMs / 1000);
    }

    // ── Element Multiplier ──
    if (!this.towerActive && this.currentEnemyElement) {
      const partyElements = state.activeParty.map(uid => {
        const h = state.roster.find(r => r.uid === uid);
        return h ? (getHeroElement(h.id) || null) : null;
      }).filter(Boolean);
      const elMult = getPartyElementMultiplier(partyElements, this.currentEnemyElement);
      damageAmount *= elMult;
      // Update element indicator in UI
      this.ui.updateElementIndicator(elMult, partyElements, this.currentEnemyElement);
    }

    // ── Party Buffs (from hero active skills) ──
    let partyDpsBuff = 1;
    let partyCoinBuff = 1;
    for (let i = this.partyBuffs.length - 1; i >= 0; i--) {
      const buff = this.partyBuffs[i];
      buff.remainingMs -= deltaMs;
      if (buff.remainingMs <= 0) {
        this.partyBuffs.splice(i, 1);
        continue;
      }
      if (buff.stat === 'dps') partyDpsBuff += buff.value;
      if (buff.stat === 'coins') partyCoinBuff += buff.value;
    }
    damageAmount *= partyDpsBuff;

    // ── Enemy Status Effects ──
    if (!this.towerActive && this.enemyStatusEffects.length > 0) {
      const statusResult = processStatusEffects(this.enemyStatusEffects, deltaMs, state.currentEnemyMaxHp);
      // DoT damage
      if (statusResult.dotDamage > 0) {
        state.currentEnemyHp -= statusResult.dotDamage;
        state.playerDamageStats.totalDamageDealt += statusResult.dotDamage;
        this.ui.updateHealthBar(state.currentEnemyHp, state.currentEnemyMaxHp);
        if (state.currentEnemyHp <= 0) {
          this.killEnemy();
          return; // enemy is dead, skip rest
        }
      }
      // Enemy heal (regen aura)
      if (statusResult.healAmount > 0) {
        state.currentEnemyHp = Math.min(state.currentEnemyMaxHp, state.currentEnemyHp + statusResult.healAmount);
        this.ui.updateHealthBar(state.currentEnemyHp, state.currentEnemyMaxHp);
      }
      // Damage-taken multiplier (shield/enrage)
      damageAmount *= statusResult.dmgTakenMult;
      // Show status icons
      this.ui.updateEnemyStatusEffects(this.enemyStatusEffects);
    }

    // ── Enemy Aura Triggers ──
    if (!this.towerActive && this.currentEnemyAura && state.currentEnemyMaxHp > 0) {
      this._checkEnemyAura(state);
    }

    // ── Shield absorption ──
    if (!this.towerActive && this.enemyShieldHp > 0 && damageAmount > 0) {
      if (damageAmount <= this.enemyShieldHp) {
        this.enemyShieldHp -= damageAmount;
        damageAmount = 0;
      } else {
        damageAmount -= this.enemyShieldHp;
        this.enemyShieldHp = 0;
        this.ui.addBattleLog('🛡️ Shield shattered!', 'crit');
      }
      this.ui.updateEnemyShield(this.enemyShieldHp);
    }

    // ── Hero Active Skill Cooldowns & Auto-Cast ──
    this._processHeroSkills(state, deltaMs);

    // ── Combo Decay ──
    if (this.comboTimer > 0) {
      this.comboTimer -= deltaMs;
      if (this.comboTimer <= 0) {
        this.comboHits = 0;
        this.comboTimer = 0;
        this.ui.updateCombo(0, null);
      }
    }

    if (this.towerActive) {
      this.towerTimeRemaining -= deltaMs / 1000;
      if (this.towerTimeRemaining <= 0) {
        this.loseTower();
      } else if (totalPassiveDps > 0) {
        this.dealTowerDamage(damageAmount);
      }
      this.ui.updateTowerTimer(this.towerTimeRemaining);
    } else {
      if (totalPassiveDps > 0) {
        this.dealDamage(damageAmount, false);
      }
    }

    // Coin Fountain — passive coin income
    const idleCoinsPerSec = getUpgradeEffect("upg_idle_coins", state.upgrades["upg_idle_coins"] || 0);
    if (idleCoinsPerSec > 0) {
      const coinMult = 1 + getUpgradeEffect("upg_coin_mult", state.upgrades["upg_coin_mult"] || 0);
      const idleCoins = idleCoinsPerSec * coinMult * (deltaMs / 1000);
      GameState.addCoins(idleCoins);
    }

    this.ui.updateStats();

    // Pet need decay (every tick)
    decayPetNeeds(state.pets, deltaMs);

    // Track playtime
    state.playerDamageStats.totalPlayTimeMs += deltaMs;

    // Check streak expiry
    this.ui.checkStreakExpiry();

    // Tick expeditions
    tickExpeditions(state);

    // Auto-buy cheapest upgrade (every ~1 second = 10 ticks)
    this._autoBuyCounter = (this._autoBuyCounter || 0) + 1;
    if (this._autoBuyCounter >= 10) {
      this._autoBuyCounter = 0;
      this.ui.processAutoBuy();
    }
  }

  manualClick(clickPower, x, y) {
    const state = GameState.data;
    state.playerDamageStats.totalClicks++;

    // Calculate global crit chance and damage
    const bonusCritChance =
      getUpgradeEffect(
        "upg_crit_chance",
        state.upgrades["upg_crit_chance"] || 0
      ) / 100;
    const bonusCritDmg = getUpgradeEffect(
      "upg_crit_damage",
      state.upgrades["upg_crit_damage"] || 0
    );

    // Evaluate if this click is a crit (base 10% + upgrade + shop + event + skills)
    const shopBonusesCrit = getShopBonuses(state.shopPurchases || {});
    const evtBonusesCrit = getEventBonuses();
    const skillBonClick = getPartySkillBonuses(state.activeParty, state.roster);
    const relicBonCrit = getRelicBonuses(state);
    const isActuallyCrit = Math.random() < 0.1 + bonusCritChance + (shopBonusesCrit.critChanceBonus || 0) + (evtBonusesCrit.critChanceBonus || 0) + (skillBonClick.critChanceBonus || 0) + (relicBonCrit.critBonus || 0);

    let finalDamage = clickPower;

    // Apply click power upgrade + skill click bonus
    const clickPowerMult = 1 + getUpgradeEffect("upg_click_power", state.upgrades["upg_click_power"] || 0);
    const shopBonuses = getShopBonuses(state.shopPurchases || {});
    const prestigeBonuses = getPrestigeBonuses(state.prestigeUpgrades || {});
    const relicBonClick = getRelicBonuses(state);
    finalDamage *= clickPowerMult * (1 + (skillBonClick.clickDmgBonus || 0)) * shopBonuses.clickMultiplier * prestigeBonuses.clickMultiplier * relicBonClick.clickMultiplier;

    // Apply global DPS upgrade to manual clicks too
    const dpsMult =
      1 +
      getUpgradeEffect("upg_global_dps", state.upgrades["upg_global_dps"] || 0);
    finalDamage *= dpsMult * this.getManualClickSynergyMult();

    if (isActuallyCrit) {
      finalDamage *= Config.baseCritDamage + bonusCritDmg + (skillBonClick.critDmgBonus || 0);
      state.playerDamageStats.criticalHits++;
    }

    if (this.towerActive) {
      this.dealTowerDamage(finalDamage);
    } else {
      this.dealDamage(finalDamage, isActuallyCrit);
      this.ui.showClickFeedback(x, y, finalDamage, isActuallyCrit);
      if (isActuallyCrit && Math.random() < 0.08) {
        this.ui.addBattleLog(`💥 CRIT! ${formatNumber(Math.floor(finalDamage))} damage!`, 'crit');
      }
      // Multi-strike chance from Phantom Blades upgrade
      const multiStrikeChance = getUpgradeEffect("upg_multi_strike", state.upgrades["upg_multi_strike"] || 0) / 100;
      if (multiStrikeChance > 0 && Math.random() < multiStrikeChance) {
        this.dealDamage(finalDamage * 0.5, false);
        this.ui.showClickFeedback(x + 20, y - 15, finalDamage * 0.5, false);
        this.ui.addBattleLog(`⚔️ Phantom Strike! +${formatNumber(Math.floor(finalDamage * 0.5))} bonus!`, 'crit');
      }
    }
  }

  // --- Normal Enemy Logic ---
  dealDamage(amount, isCrit = false) {
    const state = GameState.data;
    if (state.currentEnemyHp <= 0) return;

    // ── Shield absorption ──
    if (this.enemyShieldHp > 0) {
      if (amount <= this.enemyShieldHp) {
        this.enemyShieldHp -= amount;
        this.ui.updateEnemyShield(this.enemyShieldHp);
        return; // fully absorbed
      }
      amount -= this.enemyShieldHp;
      this.enemyShieldHp = 0;
      this.ui.addBattleLog('🛡️ Shield broken!', 'crit');
      this.ui.updateEnemyShield(0);
    }

    // ── Combo ──
    const comboMult = this.registerComboHit();
    amount *= comboMult;

    state.currentEnemyHp -= amount;
    state.playerDamageStats.totalDamageDealt += amount;

    this.ui.updateHealthBar(state.currentEnemyHp, state.currentEnemyMaxHp);

    if (state.currentEnemyHp <= 0) {
      this.killEnemy();
    }
  }

  killEnemy() {
    const state = GameState.data;
    const enemyInfo = getEnemyStats(state.currentStage);

    state.playerDamageStats.enemiesDefeated++;
    if (enemyInfo.isBoss) state.playerDamageStats.bossesDefeated++;
    if (state.currentStage > (state.playerDamageStats.highestStage || 1)) {
      state.playerDamageStats.highestStage = state.currentStage;
    }

    // Kill streak
    this.ui.registerKill();
    const streakMult = this.ui.getStreakMultiplier();

    // Cache all bonus calculations ONCE per kill (performance fix)
    const skillBon = getPartySkillBonuses(state.activeParty, state.roster);
    const synBonus = getSynergyBonuses(state.activeParty, state.roster);
    const shopBon = getShopBonuses(state.shopPurchases || {});
    const presBon = getPrestigeBonuses(state.prestigeUpgrades || {});
    const evtBon = getEventBonuses();
    const colBon = getCollectionBonuses(state);
    const petBon = getPetBonuses(state.pets || {});
    const relBon = getRelicBonuses(state);

    // Rewards
    let finalCoins = enemyInfo.coinDrop;
    if (finalCoins) {
      const coinMult =
        1 +
        getUpgradeEffect("upg_coin_mult", state.upgrades["upg_coin_mult"] || 0);
      const soulSiphonBonus = 1 + getUpgradeEffect("upg_hp_drain", state.upgrades["upg_hp_drain"] || 0);
      const bossSkillMult = enemyInfo.isBoss ? (1 + (skillBon.bossCoinsBonus || 0)) : 1;
      const skillCoinBuff = this.getPartyCoinBuff();
      finalCoins = Math.floor(finalCoins * coinMult * soulSiphonBonus * (1 + synBonus.coinBonus) * (1 + (skillBon.coinBonus || 0)) * (1 + (petBon.coinBonus || 0)) * bossSkillMult * skillCoinBuff * shopBon.coinMultiplier * presBon.coinMultiplier * evtBon.coinMultiplier * colBon.coinMultiplier * relBon.coinMultiplier * streakMult);
      GameState.addCoins(finalCoins);
    }
    // Stardust base reward + bonus chance from upgrade + shop/prestige multiplier + event bonus
    let stardustReward = enemyInfo.stardustDrop || 0;
    const stardustChanceBonus =
      getUpgradeEffect(
        "upg_stardust_chance",
        state.upgrades["upg_stardust_chance"] || 0
      ) / 100;
    if (stardustReward === 0 && Math.random() < (stardustChanceBonus + (evtBon.stardustDropChance || 0))) {
      stardustReward = 1; // Bonus stardust proc from upgrade or event
    }
    if (stardustReward > 0) {
      stardustReward = Math.max(1, Math.floor(stardustReward * (1 + (skillBon.stardustBonus || 0)) * (1 + (petBon.stardustBonus || 0)) * shopBon.stardustMultiplier * presBon.stardustMultiplier * evtBon.stardustMultiplier * colBon.stardustMultiplier * relBon.stardustMultiplier));
      GameState.addStardust(stardustReward);
    }

    // Gem drop chance (bosses: 50%, normal: 1% + prestige + event + gem_magnet upgrade bonus)
    const gemMagnetBonus = getUpgradeEffect("upg_gem_magnet", state.upgrades["upg_gem_magnet"] || 0) / 100;
    const gemChance = enemyInfo.isBoss ? 0.50 : (0.01 + (presBon.gemChanceBonus || 0) + (evtBon.gemChanceBonus || 0) + gemMagnetBonus + (skillBon.gemChanceBonus || 0) + (relBon.gemChanceBonus || 0));
    if (Math.random() < gemChance) {
      const gemAmount = enemyInfo.isBoss ? Math.max(1, Math.floor(state.currentStage / 10)) : 1;
      GameState.addGems(gemAmount);
      this.ui.addBattleLog(`💎 +${gemAmount} Gem${gemAmount > 1 ? 's' : ''}!`, 'loot');
    }

    let dropMsg = "";
    // Boss Loot Check (Every 10 stages, or 1% chance otherwise + loot luck upgrade + shop + event + collection bonus)
    const lootLuckBonus = getUpgradeEffect("upg_loot_luck", state.upgrades["upg_loot_luck"] || 0) / 100 + (shopBon.lootChanceBonus || 0) + (evtBon.lootChanceBonus || 0) + (colBon.lootChanceBonus || 0) + (skillBon.lootChanceBonus || 0) + (petBon.lootBonus || 0) + (relBon.lootChanceBonus || 0);
    const eliteLootBonus = this.isEliteEnemy ? 0.25 : 0; // Elites have 25% extra loot chance
    if (state.currentStage % 10 === 0 || Math.random() < (0.01 + lootLuckBonus + eliteLootBonus)) {
      const item = generateRandomLootDrop(state.currentStage);
      GameState.addItem(item);
      dropMsg = ` | Found Loot: [${item.rarity.name}]!`;
    }

    // Only show notification for boss kills or loot drops (avoid spam on fast kills)
    if (enemyInfo.isBoss || dropMsg || this.isEliteEnemy) {
      this.ui.showNotification(
        `Defeated ${this.isEliteEnemy ? '⚡ Elite ' : ''}${enemyInfo.name}! +${formatNumber(finalCoins)} Coins${dropMsg}`
      );
    }

    // XP gain (with shop/prestige/event/collection/upgrade/pet multipliers)
    const xpUpgBonus = 1 + getUpgradeEffect("upg_xp_boost", state.upgrades["upg_xp_boost"] || 0);
    const baseXp = enemyInfo.isBoss ? state.currentStage * 8 : Math.max(1, Math.floor(state.currentStage * 1.5));
    const xpGain = Math.floor(baseXp * (1 + (petBon.xpBonus || 0)) * shopBon.xpMultiplier * presBon.xpMultiplier * evtBon.xpMultiplier * colBon.xpMultiplier * relBon.xpMultiplier * xpUpgBonus * streakMult);
    this.addXp(xpGain);

    // Bestiary tracking
    if (!state.bestiary) state.bestiary = {};
    const baseId = enemyInfo.id;
    if (!state.bestiary[baseId]) {
      state.bestiary[baseId] = { kills: 0, highestTier: 0 };
      this.ui.addBattleLog(`\ud83d\udcd6 New discovery: ${enemyInfo.baseName}!`, 'discover');
    }
    state.bestiary[baseId].kills++;
    if (enemyInfo.tier > (state.bestiary[baseId].highestTier || 0)) {
      state.bestiary[baseId].highestTier = enemyInfo.tier;
      if (enemyInfo.tier > 0) {
        this.ui.addBattleLog(`\ud83c\udf1f ${enemyInfo.baseName} evolved to Tier ${enemyInfo.tierLabel}!`, 'discover');
      }
    }

    // Battle log
    this.ui.addBattleLog(`💀 ${enemyInfo.name} defeated! +${finalCoins}c${dropMsg ? ' ' + dropMsg : ''}`, 'kill');

    // Auto-progress check: if disabled and was a boss, don't advance
    const autoProgress = GameState.data.settings.autoProgress !== false;
    if (!autoProgress && enemyInfo.isBoss) {
      // Stay on same stage, respawn same boss
      this.ui.showNotification('Auto-progress paused at boss. Toggle Auto ▶ to continue.');
      this.ui.triggerDeathEffect(() => this.spawnEnemy());
      return;
    }

    state.currentStage++;

    // Check for milestone rewards
    this.checkMilestones();

    // Death animation then spawn
    this.ui.triggerDeathEffect(() => this.spawnEnemy());
  }

  // --- Milestone Rewards ---
  checkMilestones() {
    const state = GameState.data;
    if (!state.claimedMilestones) state.claimedMilestones = [];
    const unclaimed = getUnclaimedMilestones(state.currentStage, state.claimedMilestones);

    unclaimed.forEach(milestone => {
      // Grant rewards
      if (milestone.rewards.coins) GameState.addCoins(milestone.rewards.coins);
      if (milestone.rewards.stardust) GameState.addStardust(milestone.rewards.stardust);
      if (milestone.rewards.gems) GameState.addGems(milestone.rewards.gems);
      if (milestone.rewards.essence) GameState.addEssence(milestone.rewards.essence);

      state.claimedMilestones.push(milestone.stage);

      // Show milestone modal
      this.ui.showMilestoneReward(milestone);
    });
  }

  // --- Tower Logic ---
  startTower() {
    const state = GameState.data;
    const towerData = TowerDatabase.find((t) => t.floor === state.towerFloor);
    if (!towerData) {
      this.ui.showNotification(
        "You have conquered all current Eclipse Tower floors!"
      );
      return;
    }

    this.towerActive = true;
    this.towerEnemyHp = towerData.hp;
    this.towerEnemyMaxHp = towerData.hp;
    this.towerTimeRemaining = towerData.timeLimit + (getEventBonuses().towerTimeBonus || 0);

    this.ui.renderTowerCombat(towerData);
  }

  dealTowerDamage(amount) {
    if (!this.towerActive) return;
    this.towerEnemyHp -= amount;
    GameState.data.playerDamageStats.totalDamageDealt += amount;

    this.ui.updateTowerHealthBar(this.towerEnemyHp, this.towerEnemyMaxHp);

    if (this.towerEnemyHp <= 0) {
      this.winTower();
    }
  }

  winTower() {
    this.towerActive = false;
    const state = GameState.data;
    const towerData = TowerDatabase.find((t) => t.floor === state.towerFloor);

    GameState.addStardust(towerData.stardustReward);
    const towerGems = Math.max(1, Math.floor(towerData.stardustReward / 5));
    GameState.addGems(towerGems);

    // Rune drop: 40% chance base, +5% per floor above 5
    const runeChance = 0.40 + Math.max(0, (state.towerFloor - 5)) * 0.05;
    let runeMsg = '';
    if (Math.random() < runeChance) {
      const rune = generateRuneDrop(state.towerFloor);
      GameState.addRune(rune);
      const info = getRuneInfo(rune);
      runeMsg = ` | 🔮 ${info.displayName}!`;
    }

    this.ui.showNotification(
      `Floor ${state.towerFloor} Cleared! +${towerData.stardustReward} Stardust +${towerGems} Gems${runeMsg}`
    );

    state.towerFloor++;
    if (state.towerFloor > (state.playerDamageStats.highestTowerFloor || 1)) {
      state.playerDamageStats.highestTowerFloor = state.towerFloor;
    }
    this.ui.stopTowerCombat();
  }

  loseTower() {
    this.towerActive = false;
    this.ui.showNotification("Time's up! The Eclipse Guardian escapes.");
    this.ui.stopTowerCombat();
  }

  // --- XP / Level System ---
  addXp(amount) {
    if (!GameState.data.profile) GameState.data.profile = { name: 'Adventurer', level: 1, xp: 0, avatarId: 0 };
    const profile = GameState.data.profile;
    profile.xp += amount;
    let xpNeeded = this.getXpForLevel(profile.level);
    while (profile.xp >= xpNeeded) {
      profile.xp -= xpNeeded;
      profile.level++;
      this.ui.showNotification(`⬆ Level Up! You are now Level ${profile.level}!`);
      this.ui.addBattleLog(`⬆ Level ${profile.level} reached!`, 'level');
      xpNeeded = this.getXpForLevel(profile.level);
    }
  }

  getXpForLevel(level) {
    return Math.floor(100 * Math.pow(1.5, level - 1));
  }

  // --- Synergy manual click multiplier ---
  getManualClickSynergyMult() {
    const state = GameState.data;
    const synBonus = getSynergyBonuses(state.activeParty, state.roster);
    return 1 + synBonus.dpsBonus;
  }

  // --- Prestige (Void Rebirth) ---
  performPrestige() {
    const state = GameState.data;
    const gain = calculatePrestigeGain(state.currentStage);
    if (gain <= 0) return false;

    const relBonPrestige = getRelicBonuses(state);
    const finalEssence = Math.floor(gain * relBonPrestige.essenceMultiplier);
    GameState.addEssence(finalEssence);
    state.prestigeCount = (state.prestigeCount || 0) + 1;

    // Preserve these across prestige (heroes, items, and permanent progress persist)
    const preserved = {
      essence: state.essence,
      gems: state.gems,
      prestigeUpgrades: state.prestigeUpgrades || {},
      prestigeCount: state.prestigeCount,
      shopPurchases: state.shopPurchases || {},
      unlockedAchievements: state.unlockedAchievements || [],
      bestiary: state.bestiary || {},
      profile: state.profile,
      settings: state.settings,
      playerDamageStats: state.playerDamageStats,
      claimedMilestones: state.claimedMilestones || [],
      dailyLogin: state.dailyLogin || { lastClaimDate: null, streakDay: 0 },
      spinWheel: state.spinWheel || { lastFreeSpinDate: null, history: [] },
      pets: state.pets || { owned: [], activePetId: null },
      miniGames: state.miniGames || {},
      // Heroes and items persist across prestige
      roster: state.roster || [],
      inventory: state.inventory || [],
      activeParty: state.activeParty || [],
      heroAscensions: state.heroAscensions || {},
      storage: state.storage || [],
      completedCollections: state.completedCollections || [],
      dungeon: state.dungeon || { lastWeek: null, bestFloor: 0 },
    };

    // Get start stage bonus from prestige
    const presBon = getPrestigeBonuses(preserved.prestigeUpgrades);
    const startStage = 1 + (presBon.startStageBonus || 0);

    // Reset run-specific state (currencies and stage progress only)
    state.coins = 0;
    state.stardust = 0;
    state.currentStage = startStage;
    state.currentEnemyHp = 100;
    state.currentEnemyMaxHp = 100;
    state.towerFloor = 1;
    state.autoclickerLevel = 0;
    state.upgrades = {};

    // Restore preserved data
    state.essence = preserved.essence;
    state.gems = preserved.gems;
    state.prestigeUpgrades = preserved.prestigeUpgrades;
    state.prestigeCount = preserved.prestigeCount;
    state.shopPurchases = preserved.shopPurchases;
    state.unlockedAchievements = preserved.unlockedAchievements;
    state.bestiary = preserved.bestiary;
    state.profile = preserved.profile;
    state.settings = preserved.settings;
    state.playerDamageStats = preserved.playerDamageStats;
    state.claimedMilestones = preserved.claimedMilestones;
    state.dailyLogin = preserved.dailyLogin;
    state.spinWheel = preserved.spinWheel;
    state.pets = preserved.pets;
    state.miniGames = preserved.miniGames;
    state.roster = preserved.roster;
    state.inventory = preserved.inventory;
    state.activeParty = preserved.activeParty;
    state.heroAscensions = preserved.heroAscensions;
    state.storage = preserved.storage;
    state.completedCollections = preserved.completedCollections;
    state.dungeon = preserved.dungeon;

    GameState.save();
    this.ui.showNotification(`🌀 Void Rebirth! +${finalEssence} Essence. A new journey begins...`);

    // Re-spawn enemy and re-init UI
    this.spawnEnemy();
    this.ui.init();

    return true;
  }

  // ── Enemy Aura trigger check ──────────────────────────────────────
  _checkEnemyAura(state) {
    const auraId = this.currentEnemyAura;
    const auraData = EnemyAuras[auraId.toUpperCase()] || EnemyAuras[Object.keys(EnemyAuras).find(k => EnemyAuras[k].id === auraId)];
    if (!auraData) return;

    const hpPercent = state.currentEnemyHp / state.currentEnemyMaxHp;

    // One-shot auras (trigger once when crossing HP threshold)
    if (auraData.triggerHpPercent < 1 && !this.enemyAuraTriggered[auraId]) {
      if (hpPercent <= auraData.triggerHpPercent) {
        this.enemyAuraTriggered[auraId] = true;

        if (auraData.effect === 'shield') {
          const shieldEff = createStatusEffect('shield');
          if (shieldEff) this.enemyStatusEffects.push(shieldEff);
          this.ui.addBattleLog(`${auraData.icon} ${auraData.name} activated!`, 'discover');
        }
        if (auraData.effect === 'enrage') {
          const enrageEff = createStatusEffect('enrage');
          if (enrageEff) this.enemyStatusEffects.push(enrageEff);
          this.ui.addBattleLog(`${auraData.icon} Enemy is ${auraData.name}!`, 'crit');
        }
      }
    }

    // Periodic auras (e.g. toxic cloud)
    if (auraData.intervalMs && auraData.triggerHpPercent >= 1) {
      if (!this._auraTimers) this._auraTimers = {};
      if (!this._auraTimers[auraId]) this._auraTimers[auraId] = 0;
      this._auraTimers[auraId] += (Date.now() - (this._lastAuraTick || Date.now()));
      this._lastAuraTick = Date.now();

      // Regen aura - apply heal directly
      if (auraData.effect === 'regen' && !this.enemyStatusEffects.find(e => e.id === 'regen')) {
        const regenEff = createStatusEffect('regen');
        if (regenEff) this.enemyStatusEffects.push(regenEff);
      }

      // Frost armor - gives enemy damage reduction (applied as shield effect)
      if (auraData.effect === 'freeze_aura' && !this.enemyStatusEffects.find(e => e.id === 'shield')) {
        const shieldEff = createStatusEffect('shield');
        if (shieldEff) {
          shieldEff.durationMs = 99999999; // permanent while enemy lives
          shieldEff.remainingMs = 99999999;
          this.enemyStatusEffects.push(shieldEff);
        }
      }
    }
  }

  // ── Hero Active Skill Processing ──────────────────────────────────
  _processHeroSkills(state, deltaMs) {
    state.activeParty.forEach(uid => {
      const heroData = state.roster.find(h => h.uid === uid);
      if (!heroData) return;

      const skill = getHeroActiveSkill(heroData.id);
      if (!skill) return;

      // Initialize cooldown if not tracked
      if (this.skillCooldowns[uid] === undefined) {
        this.skillCooldowns[uid] = skill.cooldownMs * 0.5; // start at half cooldown
      }

      // Reduce cooldown
      this.skillCooldowns[uid] -= deltaMs;

      // Auto-cast when ready
      if (this.skillCooldowns[uid] <= 0) {
        this.skillCooldowns[uid] = skill.cooldownMs;
        this._executeHeroSkill(heroData, skill);
      }
    });
  }

  _executeHeroSkill(heroData, skill) {
    const state = GameState.data;
    const heroStats = getHeroStats(heroData);
    const heroDps = heroStats.dps;

    // Burst damage
    if (skill.dmgMult && !this.towerActive) {
      const burstDmg = getSkillDamage(skill, heroDps);
      this.dealDamage(burstDmg, skill.guaranteed_crit || false);
      this.ui.addBattleLog(`${skill.icon} ${skill.name}! ${formatNumber(Math.floor(burstDmg))} dmg`, 'crit');
    }

    // Apply status effect to enemy
    if (skill.statusEffect && !this.towerActive) {
      if (skill.statusEffect === 'all_dots') {
        ['burn', 'poison', 'bleed'].forEach(eid => {
          const eff = createStatusEffect(eid);
          if (eff) this.enemyStatusEffects.push(eff);
        });
      } else {
        const eff = createStatusEffect(skill.statusEffect);
        if (eff) {
          // Stack bleeds
          const existing = this.enemyStatusEffects.find(e => e.id === eff.id);
          if (existing && eff.id === 'bleed') {
            existing.stacks = Math.min((existing.stacks || 1) + 1, 5);
            existing.remainingMs = eff.durationMs;
          } else {
            this.enemyStatusEffects.push(eff);
          }
        }
      }
    }

    // Party buff
    if (skill.type === 'buff_party') {
      this.partyBuffs.push({
        stat: skill.stat,
        value: skill.value,
        remainingMs: skill.durationMs,
        name: skill.name,
        icon: skill.icon,
      });
      this.ui.addBattleLog(`${skill.icon} ${skill.name} active!`, 'discover');
    }

    // Bonus stardust
    if (skill.bonusStardust) {
      GameState.addStardust(skill.bonusStardust);
    }

    // Show skill activation in UI
    this.ui.showSkillActivation(heroData, skill);
  }

  // ── Manual Skill Trigger ──────────────────────────────────────────
  triggerHeroSkill(heroUid) {
    const state = GameState.data;
    const heroData = state.roster.find(h => h.uid === heroUid);
    if (!heroData) return false;

    const skill = getHeroActiveSkill(heroData.id);
    if (!skill) return false;

    if ((this.skillCooldowns[heroUid] || 0) > 0) return false;

    this.skillCooldowns[heroUid] = skill.cooldownMs;
    this._executeHeroSkill(heroData, skill);
    return true;
  }

  // ── Combo registration (called from dealDamage) ───────────────────
  registerComboHit() {
    this.comboHits++;
    this.comboTimer = 3000; // 3s to maintain combo
    const tier = getComboTier(this.comboHits);
    this.ui.updateCombo(this.comboHits, tier);
    return tier ? tier.mult : 1;
  }

  // ── Get party coin buff from active skills ────────────────────────
  getPartyCoinBuff() {
    let mult = 1;
    for (const buff of this.partyBuffs) {
      if (buff.stat === 'coins') mult += buff.value;
    }
    return mult;
  }
}
