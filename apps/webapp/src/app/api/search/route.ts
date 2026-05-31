import { NextResponse } from 'next/server';
import { searchTracks } from '@/services/gemini';
import { checkRateLimit } from '@/lib/rateLimit';
import { validateTelegramWebAppData } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { query, initData } = await req.json();

    // Check auth if BOT_TOKEN is present
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
          const user = JSON.parse(userStr);
          userId = user.id.toString();
        } catch (e) {
            console.error("Failed to parse user string", e);
        }
      }
    } else {
        // Fallback for local dev or missing token
        const forwardedFor = req.headers.get('x-forwarded-for');
        userId = forwardedFor ? forwardedFor.split(',')[0] : 'anonymous';
    }

    // Rate limiting
    const rateLimit = checkRateLimit(userId);
    if (!rateLimit.success) {
      return NextResponse.json({ error: rateLimit.error, resetAt: rateLimit.resetAt }, { status: 429 });
    }

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
    }

    const tracks = await searchTracks(query);
    return NextResponse.json({ tracks });
  } catch (error) {
    console.error('Error in /api/search:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
