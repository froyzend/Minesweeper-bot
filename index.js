// 7700362550:AAHJv47-nEaHFJGvclx7qtFzCay0opMq7zI
import TelegramBot from "node-telegram-bot-api";
import { Telegraf } from "telegraf";
import { button } from "telegraf/markup";
import { CBHandler, inlineMenu, Imenu } from "telegram-inline-menu";

const TOKEN =
  process.env.TELEGRAM_TOKEN ||
  "7700362550:AAHJv47-nEaHFJGvclx7qtFzCay0opMq7zI";
const gameName = process.env.TELEGRAM_GAMENAME || "Minesweeper";
// Specify '0' to use ngrok i.e. localhost tunneling
let url = process.env.URL || "https://minesweeper-bot-seven.vercel.app/";
const port = process.env.PORT || 8080;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const menuLayout: IMenu = {
  id: "main",
  text: "Main Menu",
  buttons: {
    minesweeper: "Minesweeper",
    url: {
      text: "Minesweeper URL",
      url: "https://minesweeper-bot-seven.vercel.app/",
    },
  },
};

const telegraf = new Telegraf(TOKEN);
CBHandler.attach(telegraf);

telegraf.on("Minesweeper", async (ctx) => {
  await CBHandler.showMenu(ctx, inlineMenu(layout));
});

telegraf.startPolling();
telegraf.launch().catch(console.error);
