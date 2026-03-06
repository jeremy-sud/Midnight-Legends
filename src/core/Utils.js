/**
 * Format large numbers into human-readable short form.
 * e.g. 1234 → "1.23K", 1234567 → "1.23M"
 */
export function formatNumber(num) {
  if (num === undefined || num === null || isNaN(num)) return "0";
  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  if (absNum < 1000) return sign + (Number.isInteger(absNum) ? absNum.toString() : absNum.toFixed(1));
  if (absNum < 1e6) return sign + (absNum / 1e3).toFixed(2) + "K";
  if (absNum < 1e9) return sign + (absNum / 1e6).toFixed(2) + "M";
  if (absNum < 1e12) return sign + (absNum / 1e9).toFixed(2) + "B";
  if (absNum < 1e15) return sign + (absNum / 1e12).toFixed(2) + "T";
  if (absNum < 1e18) return sign + (absNum / 1e15).toFixed(2) + "Qa";
  return sign + absNum.toExponential(2);
}

/**
 * Format seconds into a readable time string.
 * e.g. 3661 → "1h 1m 1s"
 */
export function formatTime(totalSeconds) {
  if (totalSeconds < 0) totalSeconds = 0;
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);

  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}
