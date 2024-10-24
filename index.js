const { Telegraf } = require("telegraf");

const bot = new Telegraf("7700362550:AAHJv47-nEaHFJGvclx7qtFzCay0opMq7zI");

// Массив для хранения результатов
let leaderboard = [];

// Обработка команды /start
bot.start((ctx) => {
  ctx.reply(
    "Добро пожаловать в Minesweeper! Напишите /play, чтобы начать игру."
  );
});

// Обработка команды /play
bot.command("play", (ctx) => {
  ctx.reply(
    "Начинаем игру! Нажмите на ссылку для доступа к игре: https://minesweeper-bot-seven.vercel.app/"
  );
});

// Обработка сообщения о завершении игры
bot.on("text", (ctx) => {
  const message = ctx.message.text.toLowerCase();

  if (message.includes("@minesweeper_v001_bot")) {
    ctx.reply(
      "Вы можете начать игру, перейдя по ссылке: https://minesweeper-bot-seven.vercel.app/"
    );
  }
});

// Обработка результатов игры
bot.on("game_result", (ctx) => {
  const userId = ctx.from.id; // ID пользователя
  const username = ctx.from.username || ctx.from.first_name; // Имя пользователя
  const timeTaken = ctx.message.timeTaken; // Время, затраченное на игру (это должно быть получено из вашего кода игры)

  // Проверка на наличие пользователя в скорборде
  const userIndex = leaderboard.findIndex((entry) => entry.userId === userId);

  if (userIndex !== -1) {
    // Если пользователь уже есть, обновляем его результат, если он быстрее
    if (timeTaken < leaderboard[userIndex].time) {
      leaderboard[userIndex].time = timeTaken;
      ctx.reply(`${username}, ваш новый рекорд: ${timeTaken} секунд!`);
    }
  } else {
    // Если пользователя нет, добавляем его в скорборд
    leaderboard.push({ userId, username, time: timeTaken });
  }

  // Сортировка скорборда по времени
  leaderboard.sort((a, b) => a.time - b.time);

  // Ограничение до 10 лучших
  leaderboard = leaderboard.slice(0, 10);

  // Проверка на рекорд
  if (timeTaken === leaderboard[0].time) {
    ctx.reply(
      `🏆 ${username} побил рекорд! Новый лучший результат: ${timeTaken} секунд!`
    );
    // Уведомляем весь чат о новом рекорде
    bot.telegram.sendMessage(
      ctx.chat.id,
      `🏆 ${username} побил рекорд на уровне! Новое время: ${timeTaken} секунд!`
    );
  }

  // Отправка текущего скорборда
  const leaderboardMessage = leaderboard
    .map(
      (entry, index) => `${index + 1}. ${entry.username} - ${entry.time} секунд`
    )
    .join("\n");
  ctx.reply(`Текущий скорборд:\n${leaderboardMessage}`);
});

// Запускаем бота
bot.launch();
console.log("Бот запущен");
