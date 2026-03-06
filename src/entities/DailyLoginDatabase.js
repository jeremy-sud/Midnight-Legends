/**
 * Daily Login Rewards — escalating rewards for consecutive daily logins.
 * Streak resets if the player misses a day.
 */
export const DailyLoginRewards = [
  { day: 1, icon: '🪙', label: '200 Coins', reward: { coins: 200 } },
  { day: 2, icon: '✨', label: '30 Stardust', reward: { stardust: 30 } },
  { day: 3, icon: '🪙', label: '500 Coins', reward: { coins: 500 } },
  { day: 4, icon: '💎', label: '3 Gems', reward: { gems: 3 } },
  { day: 5, icon: '✨', label: '80 Stardust', reward: { stardust: 80 } },
  { day: 6, icon: '🪙', label: '1,500 Coins', reward: { coins: 1500 } },
  { day: 7, icon: '🎁', label: '5 Gems + 200 SD', reward: { gems: 5, stardust: 200 } },
];

/**
 * Get the daily login state and check if today's reward is claimable.
 * @param {object} loginData — GameState.data.dailyLogin
 * @returns {{ streakDay, canClaim, isNewDay }}
 */
export function getDailyLoginStatus(loginData) {
  if (!loginData) loginData = { lastClaimDate: null, streakDay: 0 };

  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  const lastClaim = loginData.lastClaimDate;

  if (!lastClaim) {
    // Never claimed → new streak
    return { streakDay: 0, canClaim: true, isNewDay: true };
  }

  if (lastClaim === today) {
    // Already claimed today
    return { streakDay: loginData.streakDay, canClaim: false, isNewDay: false };
  }

  // Check if yesterday
  const lastDate = new Date(lastClaim + 'T00:00:00');
  const todayDate = new Date(today + 'T00:00:00');
  const diffDays = Math.floor((todayDate - lastDate) / (24 * 3600 * 1000));

  if (diffDays === 1) {
    // Consecutive day — continue streak
    return { streakDay: loginData.streakDay, canClaim: true, isNewDay: true };
  } else {
    // Missed a day — reset streak
    return { streakDay: 0, canClaim: true, isNewDay: true };
  }
}
