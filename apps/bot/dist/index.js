"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const token = process.env.BOT_TOKEN;
if (!token) {
    console.warn('⚠️ BOT_TOKEN is not set in environment variables.');
    console.warn('Bot will not start. Please add it to your .env file to run the Telegram Bot.');
    // We don't exit process so monorepo dev script doesn't crash
}
else {
    const bot = new grammy_1.Bot(token);
    bot.command('start', (ctx) => {
        const keyboard = new grammy_1.InlineKeyboard()
            .webApp('🚀 Открыть SoundGenie', process.env.WEBAPP_URL || 'https://google.com')
            .row()
            .text('ℹ️ Помощь', 'help');
        ctx.reply('🎵 Добро пожаловать в SoundGenie AI!\n\n' +
            'Ваш AI-джин для создания ремиксов и вирусного контента.\n' +
            'Нажмите кнопку ниже, чтобы начать работу:', { reply_markup: keyboard });
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
