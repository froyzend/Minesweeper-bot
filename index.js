// 7700362550:AAHJv47-nEaHFJGvclx7qtFzCay0opMq7zI
import TelegramBot from "node-telegram-bot-api";
import { CBHandler, inlineMenu, Imenu } from "telegram-inline-menu";

const TOKEN =
  process.env.TELEGRAM_TOKEN ||
  "7700362550:AAHJv47-nEaHFJGvclx7qtFzCay0opMq7zI";

const { Telegraf } = require("telegraf");

// Replace with your bot token from BotFather
const bot = new Telegraf(TOKEN);

// Handle inline queries
bot.on("inline_query", (ctx) => {
  const gameUrl = "https://minesweeper-bot-seven.vercel.app/"; // Replace with your actual game URL

  // Create an article result to send when inline query is triggered
  const result = [
    {
      type: "article",
      id: "1", // Unique ID for the inline query result
      title: "Play Minesweeper Game",
      input_message_content: {
        message_text: `Play Minesweeper: [Click here to start!](${gameUrl})`,
        parse_mode: "Markdown",
      },
      reply_markup: {
        inline_keyboard: [[{ text: "Launch Game", url: gameUrl }]],
      },
      description: "Click to play the Minesweeper game!",
    },
  ];

  // Respond to the inline query with the result
  ctx.answerInlineQuery(result);
});

// Optional: Handle /start command
bot.start((ctx) =>
  ctx.reply("Welcome! Type @Minesweeper_v001_bot to play the game.")
);

// Launch the bot
bot.launch();

console.log("Bot is running...");
