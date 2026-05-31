type RateLimitData = {
  count: number;
  resetAt: number;
};

// Map<userId, RateLimitData>
const rateLimits = new Map<string, RateLimitData>();

const LIMIT = 20;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export function checkRateLimit(userId: string): { success: boolean; resetAt?: number; error?: string } {
  const now = Date.now();
  const userData = rateLimits.get(userId);

  if (!userData) {
    rateLimits.set(userId, { count: 1, resetAt: now + WINDOW_MS });
    return { success: true };
  }

  if (now > userData.resetAt) {
    // Reset window
    rateLimits.set(userId, { count: 1, resetAt: now + WINDOW_MS });
    return { success: true };
  }

  if (userData.count >= LIMIT) {
    return {
      success: false,
      resetAt: userData.resetAt,
      error: "Rate limit exceeded"
    };
  }

  userData.count += 1;
  return { success: true };
}
