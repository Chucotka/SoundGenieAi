import { Bot, InlineKeyboard } from 'grammy';
import * as dotenv from 'dotenv';

dotenv.config();

const token = process.env.BOT_TOKEN;

if (!token) {
  console.warn('⚠️ BOT_TOKEN is not set in environment variables.');
  console.warn('Bot will not start. Please add it to your .env file to run the Telegram Bot.');
  // We don't exit process so monorepo dev script doesn't crash
} else {
  const bot = new Bot(token);

  bot.command('start', (ctx) => {
    const keyboard = new InlineKeyboard()
      .webApp('🚀 Открыть SoundGenie', process.env.WEBAPP_URL || 'https://google.com')
      .row()
      .text('ℹ️ Помощь', 'help');

    ctx.reply(
      '🎵 Добро пожаловать в SoundGenie AI!\n\n' +
      'Ваш AI-джин для создания ремиксов и вирусного контента.\n' +
      'Нажмите кнопку ниже, чтобы начать работу:',
      { reply_markup: keyboard }
    );
  });

  bot.callbackQuery('help', (ctx) => {
    ctx.answerCallbackQuery();
    ctx.reply('SoundGenie AI позволяет вам находить любую музыку, создавать ремиксы и делиться ими в Stories. Откройте приложение, чтобы попробовать!');
  });

  bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    console.error(e);
  });

  bot.start({
      onStart: (botInfo) => {
          console.log(`Bot @${botInfo.username} started!`);
      }
  });
}
