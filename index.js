const TelegramBot = require("node-telegram-bot-api");

const token1 = "7700362550:AAHJv47-nEaHFJGvclx7qtFzCay0opMq7zI";
const bot = new TelegramBot(token1, { polling: true });
chatId2 = msg.chat.id;

bot.onText(/\/start/, (msg) => {
  const chatId1 = msg.chat.id;
  bot.sendMessage(
    chatId1,
    "Добро пожаловать в игру Сапер! Нажмите /play для начала."
  );
});

bot.onText(/\/play/, (msg) => {
  const chatId1 = msg.chat.id;
  const gameUrl = "https://minesweeper-bot-seven.vercel.app/"; // Ссылка на игру
  bot.sendMessage(chatId1, `Игра начинается! Вот ваша ссылка: ${gameUrl}`);
});
