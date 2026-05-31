import { NextResponse } from 'next/server';
import { generateStoryCaption } from '@/services/gemini';
import { checkRateLimit } from '@/lib/rateLimit';
import { validateTelegramWebAppData } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { trackTitle, platform, initData } = await req.json();

    const botToken = process.env.BOT_TOKEN;
    let userId = 'anonymous';

    if (botToken && initData) {
      const isValid = validateTelegramWebAppData(initData, botToken);
      if (!isValid) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const urlParams = new URLSearchParams(initData);
      const userStr = urlParams.get('user');
      if (userStr) {
        try {
          userId = JSON.parse(userStr).id.toString();
        } catch {}
      }
    } else {
        const forwardedFor = req.headers.get('x-forwarded-for');
        userId = forwardedFor ? forwardedFor.split(',')[0] : 'anonymous';
    }

    const rateLimit = checkRateLimit(userId);
    if (!rateLimit.success) {
      return NextResponse.json({ error: rateLimit.error, resetAt: rateLimit.resetAt }, { status: 429 });
    }

    if (!trackTitle || typeof trackTitle !== 'string') {
      return NextResponse.json({ error: 'Invalid track title' }, { status: 400 });
    }

    const validPlatforms = ['instagram', 'tiktok', 'youtube', 'telegram'];
    const selectedPlatform = validPlatforms.includes(platform?.toLowerCase()) ? platform : 'instagram';

    const caption = await generateStoryCaption(trackTitle, selectedPlatform);
    return NextResponse.json({ caption });
  } catch (error) {
    console.error('Error in /api/stories:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
