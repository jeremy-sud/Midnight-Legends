import { HeroTemplate, getHeroElement } from './HeroDatabase.js';

export const SynergyDatabase = [
  {
    id: 'syn_common_bond',
    name: 'Common Bond',
    desc: '2+ Common heroes in party',
    effect: '+10% DPS',
    icon: '🤝',
    rarityName: 'Common',
    minCount: 2,
    dpsBonus: 0.10,
    coinBonus: 0,
    color: '#b0bec5',
  },
  {
    id: 'syn_rare_alliance',
    name: 'Rare Alliance',
    desc: '2+ Rare heroes in party',
    effect: '+20% DPS',
    icon: '💎',
    rarityName: 'Rare',
    minCount: 2,
    dpsBonus: 0.20,
    coinBonus: 0,
    color: '#4fc3f7',
  },
  {
    id: 'syn_epic_force',
    name: 'Epic Force',
    desc: '2+ Epic heroes in party',
    effect: '+35% DPS',
    icon: '⚡',
    rarityName: 'Epic',
    minCount: 2,
    dpsBonus: 0.35,
    coinBonus: 0,
    color: '#ba68c8',
  },
  {
    id: 'syn_legendary_wrath',
    name: 'Legendary Wrath',
    desc: '2+ Legendary heroes in party',
    effect: '+60% DPS',
    icon: '🌟',
    rarityName: 'Legendary',
    minCount: 2,
    dpsBonus: 0.60,
    coinBonus: 0,
    color: '#ffd54f',
  },
  {
    id: 'syn_full_squad',
    name: 'Full Squad',
    desc: '4+ heroes in party',
    effect: '+15% DPS',
    icon: '👥',
    rarityName: null,
    minCount: 4,
    dpsBonus: 0.15,
    coinBonus: 0,
    color: '#81c784',
  },
  {
    id: 'syn_legendary_five',
    name: 'Legendary Five',
    desc: '5 heroes in party',
    effect: '+25% DPS, +15% Coins',
    icon: '🌟',
    rarityName: null,
    minCount: 5,
    dpsBonus: 0.25,
    coinBonus: 0.15,
    color: '#ffd700',
  },
  {
    id: 'syn_diversity',
    name: 'Diversity',
    desc: '3+ different rarities',
    effect: '+25% DPS, +10% Coins',
    icon: '🌈',
    rarityName: 'mixed',
    minCount: 3,
    dpsBonus: 0.25,
    coinBonus: 0.10,
    color: '#ff8a65',
  },
  // ── ELEMENT SYNERGIES ──
  {
    id: 'syn_fire_blaze',
    name: 'Infernal Blaze',
    desc: '2+ Fire heroes in party',
    effect: '+30% DPS, +5% Burn chance',
    icon: '🔥',
    elementName: 'Fire',
    minCount: 2,
    dpsBonus: 0.30,
    coinBonus: 0,
    color: '#ff6d00',
  },
  {
    id: 'syn_ice_storm',
    name: 'Frozen Storm',
    desc: '2+ Ice heroes in party',
    effect: '+25% DPS, +8% Slow chance',
    icon: '❄️',
    elementName: 'Ice',
    minCount: 2,
    dpsBonus: 0.25,
    coinBonus: 0,
    color: '#4fc3f7',
  },
  {
    id: 'syn_shadow_veil',
    name: 'Shadow Veil',
    desc: '2+ Shadow heroes in party',
    effect: '+30% DPS, +3% Crit',
    icon: '🌑',
    elementName: 'Shadow',
    minCount: 2,
    dpsBonus: 0.30,
    coinBonus: 0,
    color: '#9575cd',
  },
  {
    id: 'syn_void_rift',
    name: 'Void Rift',
    desc: '2+ Void heroes in party',
    effect: '+35% DPS, +5% Essence',
    icon: '🌀',
    elementName: 'Void',
    minCount: 2,
    dpsBonus: 0.35,
    coinBonus: 0,
    color: '#ce93d8',
  },
  {
    id: 'syn_light_beacon',
    name: 'Light Beacon',
    desc: '2+ Light heroes in party',
    effect: '+20% DPS, +15% Coins',
    icon: '✨',
    elementName: 'Light',
    minCount: 2,
    dpsBonus: 0.20,
    coinBonus: 0.15,
    color: '#ffd54f',
  },
];

export function getActiveSynergies(party, roster) {
  const rarityCounts = {};
  const elementCounts = {};
  let partySize = 0;

  party.forEach(uid => {
    const heroData = roster.find(h => h.uid === uid);
    if (!heroData) return;
    const template = HeroTemplate.find(t => t.id === heroData.id);
    if (!template) return;
    rarityCounts[template.rarity.name] = (rarityCounts[template.rarity.name] || 0) + 1;
    const element = getHeroElement(heroData.id);
    if (element) {
      elementCounts[element] = (elementCounts[element] || 0) + 1;
    }
    partySize++;
  });

  return SynergyDatabase.filter(syn => {
    // Element synergies
    if (syn.elementName) return (elementCounts[syn.elementName] || 0) >= syn.minCount;
    // Rarity synergies
    if (syn.rarityName === null) return partySize >= syn.minCount;
    if (syn.rarityName === 'mixed') return Object.keys(rarityCounts).length >= syn.minCount;
    return (rarityCounts[syn.rarityName] || 0) >= syn.minCount;
  });
}

export function getSynergyBonuses(party, roster) {
  const active = getActiveSynergies(party, roster);
  let totalDpsBonus = 0;
  let totalCoinBonus = 0;
  active.forEach(syn => {
    totalDpsBonus += syn.dpsBonus;
    totalCoinBonus += syn.coinBonus;
  });
  return { dpsBonus: totalDpsBonus, coinBonus: totalCoinBonus, active };
}
