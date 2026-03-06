// ── Daily Quest System ──────────────────────────────────────────────
// 3 quests per day from a pool, reset daily. Track progress per quest.

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
