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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const db_1 = require("@soundgenie/db");
dotenv.config();
const token = process.env.BOT_TOKEN;
const webAppUrl = process.env.WEBAPP_URL || 'https://google.com';
const webhookSecret = process.env.WEBHOOK_SECRET || 'secret-webhook-string';
const port = process.env.PORT || 3001;
const prisma = new db_1.PrismaClient();
if (!token) {
    console.warn('⚠️ BOT_TOKEN is not set in environment variables.');
    console.warn('Bot will not start. Please add it to your .env file to run the Telegram Bot.');
}
else {
    const bot = new grammy_1.Bot(token);
    bot.command('start', async (ctx) => {
        const keyboard = new grammy_1.InlineKeyboard()
            .webApp('🚀 Открыть SoundGenie AI', webAppUrl)
            .row()
            .text('ℹ️ Помощь', 'help');
        // Ensure user exists in the database
        if (ctx.from) {
            await prisma.user.upsert({
                where: { telegramId: ctx.from.id.toString() },
                update: { username: ctx.from.username },
                create: {
                    telegramId: ctx.from.id.toString(),
                    username: ctx.from.username,
                },
            });
        }
        await ctx.reply('🎵 Добро пожаловать в SoundGenie AI!\n\n' +
            'Ваш AI-джин для создания ремиксов и вирусного контента.\n' +
            'Нажмите кнопку ниже, чтобы начать работу:', { reply_markup: keyboard });
    });
    bot.callbackQuery('help', async (ctx) => {
        await ctx.answerCallbackQuery();
        await ctx.reply('SoundGenie AI позволяет вам находить любую музыку, создавать ремиксы и делиться ими в Stories. Откройте приложение, чтобы попробовать!');
    });
    // Premium Invoice with Telegram Stars
    bot.command('premium', async (ctx) => {
        await ctx.replyWithInvoice('Premium Month', // Title
        '1 месяц доступа к Premium Studio. 50 генераций ремиксов в день, HD экспорт и все AI стили.', // Description
        'premium-month-payload', // Payload
        'XTR', // Currency (Telegram Stars)
        [{ label: 'Premium Month', amount: 299 }] // Prices array
        );
    });
    // Handle pre-checkout query (must be answered within 10s)
    bot.on('pre_checkout_query', async (ctx) => {
        await ctx.answerPreCheckoutQuery(true);
    });
    // Handle successful payment
    bot.on('message:successful_payment', async (ctx) => {
        const paymentInfo = ctx.message.successful_payment;
        console.log('Payment successful:', paymentInfo);
        if (ctx.from) {
            await prisma.user.update({
                where: { telegramId: ctx.from.id.toString() },
                data: { subscriptionPlan: 'Pro' },
            });
        }
        await ctx.reply('🌟 Спасибо за покупку Premium! Ваш статус обновлен. Наслаждайтесь продвинутыми возможностями!');
    });
    bot.catch((err) => {
        const ctx = err.ctx;
        console.error(`Error while handling update ${ctx.update.update_id}:`);
        console.error(err.error);
    });
    // Setup Express server for webhook
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // Webhook endpoint
    app.post('/webhook', (0, grammy_1.webhookCallback)(bot, 'express', { secretToken: webhookSecret }));
    app.listen(port, () => {
        console.log(`Bot webhook server running on port ${port}`);
        console.log(`Webhook URL: http://localhost:${port}/webhook`);
    });
    // Start polling if not using webhook (e.g. for local dev if WEBHOOK_URL is not set)
    // To keep it simple we just run webhook server.
    // In production, you would call `bot.api.setWebhook` to configure Telegram.
    if (process.env.NODE_ENV !== 'production' && !process.env.WEBHOOK_URL) {
        bot.start({
            onStart: (botInfo) => {
                console.log(`Bot @${botInfo.username} started in polling mode!`);
            }
        });
    }
    else if (process.env.WEBHOOK_URL) {
        bot.api.setWebhook(`${process.env.WEBHOOK_URL}/webhook`, { secret_token: webhookSecret })
            .then(() => console.log('Webhook configured successfully'))
            .catch(console.error);
    }
}
