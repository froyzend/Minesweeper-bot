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
    // Другие параметры состояния игры
  };

  // Отправляем приветственное сообщение
  bot.sendMessage(
    chatId,
    "Добро пожаловать в игру Сапер! Нажмите /play для начала."
  );
});

// Обработчик команды /play
bot.onText(/\/play/, (msg) => {
  const chatId = msg.chat.id;

  // Здесь можно инициализировать игру и отправить ссылку на веб-страницу
  userGames[chatId].inGame = true;

  // Отправляем сообщение с ссылкой на игру
  bot.sendMessage(chatId, "Игра начинается! Вот ваша ссылка: <ссылка на игру>");
});

// Функция отправки сообщения пользователю
function sendGameResult(chatId, resultMessage) {
  bot.sendMessage(chatId, resultMessage);
}

// Пример использования функции отправки результата после победы
function checkVictory(chatId) {
  // Логика проверки победы
  let victory = true; // замените на вашу логику проверки

  if (victory) {
    // Останавливаем игру
    userGames[chatId].inGame = false;

    // Отправляем результат пользователю
    sendGameResult(chatId, "Вы выиграли игру! Поздравляем!");
  }
}

// Используйте это в вашем коде игры, когда нужно проверить победу
// Пример: checkVictory(chatId); в нужном месте кода
