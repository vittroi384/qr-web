/** Number formatting shared by the admin pages (fixed locale, so server and tests agree). */
export const num = (v: number) => v.toLocaleString("en-US");

/** "12.5%", or "–" when there is nothing to divide by. */
export const pct = (part: number, whole: number) => (whole > 0 ? `${((part / whole) * 100).toFixed(1)}%` : "–");

/** Saves per user with one decimal, or "–" without users. */
export const perUser = (saves: number, users: number) => (users > 0 ? (saves / users).toFixed(1) : "–");
