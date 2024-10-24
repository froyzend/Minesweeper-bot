const { Telegraf } = require("7700362550:AAHJv47-nEaHFJGvclx7qtFzCay0opMq7zI");
const express = require("express");
const path = require("https://t.me/Minesweeper_v001_bot?game=MinesweeperGame");
const BOT_TOKEN = "7700362550:AAHJv47-nEaHFJGvclx7qtFzCay0opMq7zI";
// Инициализация бота и сервера
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();
const port = process.env.PORT || 3000;

let scoreboard = []; // Скорборд для записи лучших результатов
const maxScoreboardEntries = 10; // Количество записей в скорборде

// Устанавливаем сервер для статических файлов (index.html)
app.use(express.static(path.join(__dirname, "/Minesweeper-bot")));

// Telegram команда /start
bot.start((ctx) =>
  ctx.reply("Добро пожаловать в игру Сапер! Попробуйте установить рекорд!")
);

// Обработчик получения результата игры
bot.command("score", (ctx) => {
  const userId = ctx.message.from.id;
  const userName = ctx.message.from.username || ctx.message.from.first_name;
  const result = ctx.message.text.split(" ")[1];

  if (!result || isNaN(result)) {
    ctx.reply("Чтобы добавить результат, укажите время (например, /score 120)");
    return;
  }

  const time = parseInt(result);
  addScore(userId, userName, time, ctx);
});

// Функция добавления рекорда
function addScore(userId, userName, time, ctx) {
  // Проверка, если пользователь уже в таблице и улучшил результат
  const existingPlayer = scoreboard.find((entry) => entry.userId === userId);
  if (existingPlayer) {
    if (time < existingPlayer.time) {
      existingPlayer.time = time; // Обновляем результат
      ctx.reply(
        `Поздравляем, ${userName}, вы обновили свой результат! Ваше время: ${time} секунд`
      );
    } else {
      ctx.reply(
        `Ваш результат не улучшен, ${userName}. Ваше лучшее время: ${existingPlayer.time} секунд`
      );
    }
  } else {
    // Добавление нового игрока в таблицу рекордов
    scoreboard.push({ userId, userName, time });

    // Сортировка по времени и обрезка списка до 10 лучших
    scoreboard.sort((a, b) => a.time - b.time);
    if (scoreboard.length > maxScoreboardEntries) {
      scoreboard.pop();
    }

    ctx.reply(`Новый результат добавлен: ${userName} - ${time} секунд`);
  }

  // Если новый рекорд, уведомляем чат
  if (scoreboard[0].userId === userId) {
    ctx.telegram.sendMessage(
      ctx.chat.id,
      `🎉 Новый рекорд! ${userName} занял первое место с результатом ${time} секунд!`
    );
  }

  // Отправляем обновленный скорборд
  sendScoreboard(ctx);
}

// Функция отправки скорборда в чат
function sendScoreboard(ctx) {
  let message = "🏆 Текущий скорборд:\n";
  scoreboard.forEach((entry, index) => {
    message += `${index + 1}. ${entry.userName} - ${entry.time} секунд\n`;
  });

  ctx.reply(message);
}

// Функция перезапуска игры
app.post("/restart", (req, res) => {
  scoreboard = [];
  bot.telegram.sendMessage(
    process.env.CHAT_ID,
    "Игра была перезапущена, все результаты сброшены."
  );
  res.sendStatus(200);
});

// Запуск бота и сервера
bot.launch();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
