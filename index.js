// 7700362550:AAHJv47-nEaHFJGvclx7qtFzCay0opMq7zI
import TelegramBot from "node-telegram-bot-api";
import { CBHandler, inlineMenu, Imenu } from "telegram-inline-menu";

const TOKEN =
  process.env.TELEGRAM_TOKEN ||
  "7700362550:AAHJv47-nEaHFJGvclx7qtFzCay0opMq7zI";

const { Telegraf } = require("telegraf");

// Replace with your bot token from BotFather
const bot = new Telegraf(TOKEN);

bot.command('play', ctx => {
    let StartMsg = 'Play Minesweeper and gain respect!';
    bot.telegram.sendMessage(ctx.chat.id, StartMsg,
        {
            reply_markup: {
                inline_keyboard: [
                    [(text: "Minesweeper", url:"https://minesweeper-bot-seven.vercel.app/")]
                ]
            }
        }
    )
})