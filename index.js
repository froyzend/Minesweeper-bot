// 7700362550:AAHJv47-nEaHFJGvclx7qtFzCay0opMq7zI
import TelegramBot from "node-telegram-bot-api";
import { CBHandler, inlineMenu, Imenu } from "telegram-inline-menu";

const TOKEN =
  process.env.TELEGRAM_TOKEN ||
  "7700362550:AAHJv47-nEaHFJGvclx7qtFzCay0opMq7zI";
const gameName = process.env.TELEGRAM_GAMENAME || "Minesweeper";
// Specify '0' to use ngrok i.e. localhost tunneling
let url = process.env.URL || "https://minesweeper-bot-seven.vercel.app/";

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("inline_query", (query) => {
  const gameUrl = url; // Replace with your game URL

  // Create an article to return as inline query result
  const results = [
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

  // Send results to Telegram
  bot.answerInlineQuery(query.id, results, { cache_time: 0 });
});

// Handle basic /start command (optional)
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Welcome! Type @Minesweeper_v001_bot to play the game."
  );
});

console.log("Bot is running...");
