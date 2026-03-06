// Milestone rewards for reaching specific stages
export const MilestoneDatabase = [
  {
    stage: 10,
    icon: "🏅",
    title: "First Steps",
    rewards: { coins: 500, stardust: 10 },
    desc: "You survived the first 10 stages!",
  },
  {
    stage: 25,
    icon: "⭐",
    title: "Rising Star",
    rewards: { coins: 2000, stardust: 50, gems: 3 },
    desc: "A promising adventurer emerges.",
  },
  {
    stage: 50,
    icon: "🔥",
    title: "Midnight Warrior",
    rewards: { coins: 10000, stardust: 200, gems: 10 },
    desc: "The gardens tremble before you.",
  },
  {
    stage: 100,
    icon: "💎",
    title: "Centurion",
    rewards: { coins: 50000, stardust: 500, gems: 25 },
    desc: "A legend in the making.",
  },
  {
    stage: 150,
    icon: "🌟",
    title: "Starforged",
    rewards: { coins: 150000, stardust: 1000, gems: 40 },
    desc: "Your name echoes across the void.",
  },
  {
    stage: 200,
    icon: "👑",
    title: "Sovereign",
    rewards: { coins: 500000, stardust: 2500, gems: 60 },
    desc: "All bow before the Midnight Sovereign.",
  },
  {
    stage: 300,
    icon: "🐉",
    title: "Dragon Slayer",
    rewards: { coins: 1500000, stardust: 5000, gems: 100 },
    desc: "Even dragons fear your power.",
  },
  {
    stage: 500,
    icon: "∞",
    title: "The Eternal",
    rewards: { coins: 5000000, stardust: 15000, gems: 250, essence: 50 },
    desc: "Beyond mortal comprehension.",
  },
  // ── EXPANDED MILESTONES ──
  {
    stage: 750,
    icon: "⚡",
    title: "Void Walker",
    rewards: { coins: 15000000, stardust: 50000, gems: 500, essence: 150 },
    desc: "The void itself bends to your will.",
  },
  {
    stage: 1000,
    icon: "🌌",
    title: "Cosmic Arbiter",
    rewards: { coins: 50000000, stardust: 150000, gems: 1000, essence: 500 },
    desc: "You have transcended the stars.",
  },
  {
    stage: 1500,
    icon: "🔮",
    title: "Astral Sovereign",
    rewards: { coins: 200000000, stardust: 500000, gems: 2500, essence: 1500 },
    desc: "The cosmos whispers your name.",
  },
  {
    stage: 2000,
    icon: "💫",
    title: "The Infinite",
    rewards: { coins: 1000000000, stardust: 2000000, gems: 5000, essence: 5000 },
    desc: "Beyond the end, a new beginning.",
  },
];

export function getUnclaimedMilestones(currentStage, claimedMilestones = []) {
  return MilestoneDatabase.filter(
    (m) => currentStage >= m.stage && !claimedMilestones.includes(m.stage)
  );
}
