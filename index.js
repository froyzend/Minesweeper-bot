const TelegramBot = require("node-telegram-bot-api");

// Замените на ваш токен
const token = "7700362550:AAHJv47-nEaHFJGvclx7qtFzCay0opMq7zI";
const bot = new TelegramBot(token, { polling: true });

// Объект для хранения состояния игры пользователя
let userGames = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Сохраняем chat_id в объекте для использования в будущем
  userGames[chatId] = {
    inGame: false,
  };

  // Обновленная ссылка на игру
  const gameUrl = "https://minesweeper-bot-seven.vercel.app/"; // Замените на вашу ссылку Vercel
  bot.sendMessage(
    chatId,
    `Добро пожаловать в игру Сапер! Нажмите /play для начала. Вот ваша ссылка на игру: ${gameUrl}`
  );
});

// Обработчик команды /play
bot.onText(/\/play/, (msg) => {
  const chatId = msg.chat.id;

  // Здесь можно инициализировать игру и отправить ссылку на веб-страницу
  userGames[chatId].inGame = true;

  // Обновленная ссылка на игру
  const gameUrl = "https://minesweeper-bot-seven.vercel.app/"; // Замените на вашу ссылку Vercel
  bot.sendMessage(chatId, `Игра начинается! Вот ваша ссылка: ${gameUrl}`);
});

// Функция отправки сообщения пользователю
function sendGameResult(chatId, resultMessage) {
  bot.sendMessage(chatId, resultMessage);
}

// Пример использования функции отправки результата после победы
function checkVictory(chatId) {
  let victory = true; // Замените на вашу логику проверки

  if (victory) {
    userGames[chatId].inGame = false;
    sendGameResult(chatId, "Вы выиграли игру! Поздравляем!");
  }
}

// Используйте это в вашем коде игры, когда нужно проверить победу
// Пример: checkVictory(chatId); в нужном месте кода
