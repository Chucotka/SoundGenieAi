import crypto from 'crypto';

export function validateTelegramWebAppData(initData: string, botToken: string): boolean {
  if (!initData || !botToken) return false;

  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    if (!hash) return false;

    urlParams.delete('hash');

    // Sort keys alphabetically
    const keys = Array.from(urlParams.keys()).sort();

    // Construct data check string
    const dataCheckString = keys.map(key => `${key}=${urlParams.get(key)}`).join('\n');

    // Create secret key
    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();

    // Calculate hash
    const calculatedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

    return calculatedHash === hash;
  } catch (error) {
    console.error('Error validating Telegram data:', error);
    return false;
  }
}
