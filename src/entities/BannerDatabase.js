/**
 * Banner System — Time-limited summon rate-up banners
 * Each banner features specific heroes with boosted summon rates
 * Banners rotate weekly with different themes
 * Uses a pity system: guaranteed featured hero after N summons without one
 */

export const BannerDatabase = [
  {
    id: 'banner_fire_festival',
    name: 'Fire Festival',
    icon: '🔥',
    color: '#ff6d00',
    desc: 'Fire element heroes have boosted summon rates!',
    element: 'fire',
    featuredHeroes: ['h_elementalist', 'h_dragon_knight', 'h_flame_sentinel'],
    rateUpMultiplier: 3.0, // 3× more likely to get featured heroes
    pityThreshold: 30, // Guaranteed featured hero after 30 summons
    durationDays: 7,
  },
  {
    id: 'banner_shadow_convergence',
    name: 'Shadow Convergence',
    icon: '🌑',
    color: '#9575cd',
    desc: 'Shadow element heroes emerge from the void!',
    element: 'shadow',
    featuredHeroes: ['h_assassin', 'h_necromancer', 'h_shadow_dancer'],
    rateUpMultiplier: 3.0,
    pityThreshold: 30,
    durationDays: 7,
  },
  {
    id: 'banner_ice_storm',
    name: 'Ice Storm',
    icon: '❄️',
    color: '#4fc3f7',
    desc: 'Frozen warriors answer the call!',
    element: 'ice',
    featuredHeroes: ['h_chrono_mage', 'h_frost_warden', 'h_glacial_titan'],
    rateUpMultiplier: 3.0,
    pityThreshold: 30,
    durationDays: 7,
  },
  {
    id: 'banner_void_ascension',
    name: 'Void Ascension',
    icon: '🌀',
    color: '#ce93d8',
    desc: 'The void yields its champions!',
    element: 'void',
    featuredHeroes: ['h_void_empress', 'h_void_stalker', 'h_astral_dragon'],
    rateUpMultiplier: 3.0,
    pityThreshold: 25, // Slightly easier pity
    durationDays: 7,
  },
  {
    id: 'banner_light_crusade',
    name: 'Light Crusade',
    icon: '✨',
    color: '#ffd54f',
    desc: 'Champions of light shine bright!',
    element: 'light',
    featuredHeroes: ['h_moon_king', 'h_cleric', 'h_paladin'],
    rateUpMultiplier: 3.0,
    pityThreshold: 30,
    durationDays: 7,
  },
  {
    id: 'banner_legendary_gala',
    name: 'Legendary Gala',
    icon: '👑',
    color: '#ffd740',
    desc: 'Legendary hero rates DOUBLED! Once per month.',
    element: null,
    featuredHeroes: ['h_moon_king', 'h_void_empress', 'h_astral_dragon', 'h_celestial_phoenix', 'h_eclipse_arbiter', 'h_cosmic_weaver'],
    rateUpMultiplier: 2.0,
    pityThreshold: 20, // Generous pity for legendary gala
    durationDays: 5,
  },
];

/**
 * Get the currently active banner based on date
 * Banners rotate weekly (index based on week of year)
 */
export function getActiveBanner() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.floor((now - startOfYear) / (7 * 24 * 60 * 60 * 1000));
  const bannerIndex = weekNum % BannerDatabase.length;
  const banner = BannerDatabase[bannerIndex];

  // Calculate remaining time
  const dayOfWeek = now.getDay();
  const daysLeft = Math.max(1, 7 - dayOfWeek);
  const hoursLeft = 24 - now.getHours();

  return {
    ...banner,
    daysRemaining: daysLeft,
    hoursRemaining: hoursLeft,
    weekNum,
  };
}

/**
 * Check if a hero is featured in the active banner
 */
export function isHeroFeatured(heroId, banner) {
  return banner.featuredHeroes.includes(heroId);
}

/**
 * Calculate summon rate modifier for a hero based on active banner
 */
export function getBannerRateModifier(heroId, banner) {
  if (isHeroFeatured(heroId, banner)) {
    return banner.rateUpMultiplier;
  }
  return 1.0;
}

/**
 * Check pity counter — if threshold reached, guarantee featured hero
 */
export function checkPity(bannerPityCount, banner) {
  return bannerPityCount >= banner.pityThreshold;
}

/**
 * Get pity progress as percentage
 */
export function getPityProgress(bannerPityCount, banner) {
  return Math.min(1, bannerPityCount / banner.pityThreshold);
}
