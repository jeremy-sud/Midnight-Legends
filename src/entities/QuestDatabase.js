// ── Daily & Weekly Quest System ─────────────────────────────────────
// 3 daily quests + 2 weekly quests from pools, seeded per day/week.
// Streak bonus: completing ALL daily quests N days in a row → bonus gems.

export const QuestPool = [
  {
    id: 'q_defeat_enemies',
    name: 'Cazador',
    icon: '💀',
    desc: 'Derrota {target} enemigos',
    stat: 'enemiesDefeated',
    targets: [30, 50, 100, 200],
    reward: { coins: 500, stardust: 5 },
  },
  {
    id: 'q_click_damage',
    name: 'Furia de Clicks',
    icon: '👆',
    desc: 'Haz {target} clicks',
    stat: 'totalClicks',
    targets: [50, 100, 200, 500],
    reward: { coins: 300, gems: 1 },
  },
  {
    id: 'q_earn_coins',
    name: 'Buscador de Tesoros',
    icon: '🪙',
    desc: 'Gana {target} monedas',
    stat: 'totalCoinsEarned',
    targets: [1000, 5000, 20000, 100000],
    reward: { stardust: 10, gems: 1 },
  },
  {
    id: 'q_boss_kills',
    name: 'Matador de Jefes',
    icon: '👑',
    desc: 'Derrota {target} jefes',
    stat: 'bossesDefeated',
    targets: [1, 3, 5, 10],
    reward: { gems: 2, stardust: 15 },
  },
  {
    id: 'q_critical_hits',
    name: 'Precisión Letal',
    icon: '🎯',
    desc: 'Consigue {target} golpes críticos',
    stat: 'criticalHits',
    targets: [10, 30, 50, 100],
    reward: { coins: 800, gems: 1 },
  },
  {
    id: 'q_deal_damage',
    name: 'Demoledor',
    icon: '💥',
    desc: 'Inflige {target} de daño total',
    stat: 'totalDamageDealt',
    targets: [10000, 50000, 200000, 1000000],
    reward: { coins: 1000, essence: 2 },
  },
  {
    id: 'q_advance_stages',
    name: 'Explorador',
    icon: '🏔️',
    desc: 'Avanza {target} stages',
    stat: '_stagesAdvanced',
    targets: [5, 10, 20, 50],
    reward: { stardust: 8, gems: 1 },
  },
  {
    id: 'q_level_heroes',
    name: 'Entrenador',
    icon: '⬆',
    desc: 'Sube de nivel héroes {target} veces',
    stat: '_heroLevels',
    targets: [5, 10, 20, 50],
    reward: { coins: 600, stardust: 5 },
  },
];

/**
 * Generate 3 daily quests based on the day seed.
 * Uses a deterministic seed so quests are the same all day.
 */
export function getDailyQuests(dateStr) {
  if (!dateStr) dateStr = new Date().toISOString().slice(0, 10);
  // Simple hash from date string
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed = ((seed << 5) - seed + dateStr.charCodeAt(i)) | 0;
  }
  seed = Math.abs(seed);

  const quests = [];
  const used = new Set();
  for (let i = 0; i < 3; i++) {
    let idx = (seed + i * 7 + i * i * 3) % QuestPool.length;
    while (used.has(idx)) idx = (idx + 1) % QuestPool.length;
    used.add(idx);

    const template = QuestPool[idx];
    // Pick target difficulty based on stage / date rotation
    const difficulty = (seed + i) % template.targets.length;
    const target = template.targets[difficulty];

    // Scale rewards with difficulty
    const rewardMult = 1 + difficulty * 0.5;
    const scaledReward = {};
    for (const [k, v] of Object.entries(template.reward)) {
      scaledReward[k] = Math.floor(v * rewardMult);
    }

    quests.push({
      id: `${template.id}_${i}`,
      templateId: template.id,
      name: template.name,
      icon: template.icon,
      desc: template.desc.replace('{target}', target.toLocaleString()),
      stat: template.stat,
      target,
      reward: scaledReward,
    });
  }
  return quests;
}

/**
 * Check quest progress against current stats snapshot.
 */
export function getQuestProgress(quest, questState) {
  if (!questState || !questState.snapshots) return 0;
  const startVal = questState.snapshots[quest.stat] || 0;
  const currentVal = questState.current[quest.stat] || 0;
  return Math.max(0, currentVal - startVal);
}

// ── Weekly Quest Pool ──────────────────────────────────────────────
export const WeeklyQuestPool = [
  {
    id: 'wq_mass_hunter',
    name: 'Gran Cazador',
    icon: '🏆',
    desc: 'Derrota {target} enemigos esta semana',
    stat: 'enemiesDefeated',
    targets: [500, 1000, 2000],
    reward: { gems: 10, essence: 10 },
  },
  {
    id: 'wq_boss_slayer',
    name: 'Asesino de Jefes',
    icon: '⚔️',
    desc: 'Derrota {target} jefes esta semana',
    stat: 'bossesDefeated',
    targets: [15, 30, 50],
    reward: { gems: 8, stardust: 50 },
  },
  {
    id: 'wq_tireless_warrior',
    name: 'Guerrero Incansable',
    icon: '💪',
    desc: 'Inflige {target} de daño total',
    stat: 'totalDamageDealt',
    targets: [500000, 2000000, 10000000],
    reward: { gems: 12, essence: 15 },
  },
  {
    id: 'wq_stage_conqueror',
    name: 'Conquistador',
    icon: '🗺️',
    desc: 'Avanza {target} stages esta semana',
    stat: '_stagesAdvanced',
    targets: [30, 60, 100],
    reward: { gems: 10, stardust: 40 },
  },
];

/**
 * Get the ISO week key (YYYY-Wnn) for a date string.
 */
export function getWeekKey(dateStr) {
  const d = new Date(dateStr + 'T12:00:00Z');
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

/**
 * Generate 2 weekly quests seeded by the week.
 */
export function getWeeklyQuests(dateStr) {
  if (!dateStr) dateStr = new Date().toISOString().slice(0, 10);
  const weekKey = getWeekKey(dateStr);
  let seed = 0;
  for (let i = 0; i < weekKey.length; i++) {
    seed = ((seed << 5) - seed + weekKey.charCodeAt(i)) | 0;
  }
  seed = Math.abs(seed);

  const quests = [];
  const used = new Set();
  for (let i = 0; i < 2; i++) {
    let idx = (seed + i * 5) % WeeklyQuestPool.length;
    while (used.has(idx)) idx = (idx + 1) % WeeklyQuestPool.length;
    used.add(idx);

    const template = WeeklyQuestPool[idx];
    const difficulty = (seed + i) % template.targets.length;
    const target = template.targets[difficulty];
    const rewardMult = 1 + difficulty * 0.5;
    const scaledReward = {};
    for (const [k, v] of Object.entries(template.reward)) {
      scaledReward[k] = Math.floor(v * rewardMult);
    }
    quests.push({
      id: `${template.id}_w${i}`,
      templateId: template.id,
      name: template.name,
      icon: template.icon,
      desc: template.desc.replace('{target}', target.toLocaleString()),
      stat: template.stat,
      target,
      reward: scaledReward,
      weekly: true,
    });
  }
  return quests;
}

/**
 * Streak bonus table: for each consecutive day ALL 3 daily quests completed.
 * Returns extra gems awarded.
 */
export function getStreakBonus(streakDays) {
  if (streakDays < 2) return 0;
  if (streakDays < 5) return 2;   // 2-4 days: 2 gems
  if (streakDays < 7) return 5;   // 5-6 days: 5 gems
  return 10;                      // 7+ days: 10 gems
}
