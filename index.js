// 7700362550:AAHJv47-nEaHFJGvclx7qtFzCay0opMq7zIimport TelegramBot from "node-telegram-bot-api";mport { CBHandler, inlineMenu, Imenu } from "telegram-inline-menu";

const TOKEN = "7605809135:AAHN87WOl9ly7SZR7dYdTspohL3DY__IpjM";

const { Telegraf } = require("telegraf");
const bot = new Telegraf(TOKEN);
const axios = require('axios');

bot.command('play', ctx => {
    let StartMsg = 'Play Minesweeper and gain respect!';
    bot.telegram.sendMessage(ctx.chat.id, StartMsg,
        {
            reply_markup: {
                inline_keyboard: [
                    [(text: "Minesweeper", url: "https://minesweeper-bot-seven.vercel.app/")]
                ]
            }
        }
    )
});

bot.launch();