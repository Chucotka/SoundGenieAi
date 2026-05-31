import { NextResponse } from 'next/server';
import { generateRemixIdeas } from '@/services/gemini';
import { checkRateLimit } from '@/lib/rateLimit';
import { validateTelegramWebAppData } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { trackTitle, initData } = await req.json();

    // Check auth
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

    const ideas = await generateRemixIdeas(trackTitle);
    return NextResponse.json({ ideas });
  } catch (error) {
    console.error('Error in /api/remix:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
