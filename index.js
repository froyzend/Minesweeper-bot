const { Telegraf } = require("telegraf");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Укажите свой токен, полученный от BotFather
const bot = new Telegraf("7700362550:AAHJv47-nEaHFJGvclx7qtFzCay0opMq7zI");

// Обработка команды /start
bot.start((ctx) => {
  ctx.reply(
    "Добро пожаловать в Minesweeper! Нажмите на кнопку ниже, чтобы начать игру.",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Начать игру",
              url: "https://minesweeper-bot-seven.vercel.app/",
            },
          ],
        ],
      },
    }
  );
});

// Обработка команды /help
bot.help((ctx) => {
  ctx.reply(
    'Это бот для игры в Minesweeper. Нажмите на кнопку "Начать игру", чтобы играть!'
  );
});

// Обработка всех текстовых сообщений
bot.on("text", (ctx) => {
  ctx.reply("Пожалуйста, используйте кнопки для взаимодействия с ботом.");
});

// Запускаем сервер
app.use(express.json());
app.use(express.static("public")); // Отдача статических файлов из папки 'public'

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

// Запускаем бота
bot.launch().then(() => {
  console.log("Бот запущен");
});

// Обработка ошибок
process.once("SIGINT", () => {
  bot.stop("SIGINT");
});
process.once("SIGTERM", () => {
  bot.stop("SIGTERM");
});
