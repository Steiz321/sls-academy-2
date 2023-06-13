import TelegramBot from "node-telegram-bot-api";
import { getUSDRate, getEURRate } from "./services/bankService.js";
import { btnCurrencies, btnStart, btnBack} from './extensions/keyboards.js'
import NodeCache from "node-cache";

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true })

const commands = [
    { command: 'start', description: 'Start getting currencies rates' },
];
bot.setMyCommands(commands)

export const myCache = new NodeCache({ stdTTL: 60 });

bot.onText(/\/start/, async (msg) => {
    let chatId = msg.chat.id;

    await bot.sendMessage(chatId, 'Press the button to check currency!', { reply_markup: btnStart })
})

bot.onText(/Check exchange rate/, async (msg) => {
    let chatId = msg.chat.id;

    await bot.sendMessage(chatId, 'Pick the currency:', { reply_markup: btnCurrencies })
})

bot.onText(/USD/, async (msg) => {
    let chatId = msg.chat.id;

    let resultMessage = await getUSDRate();
    await bot.sendMessage(chatId, resultMessage, { reply_markup: btnBack });

})

bot.onText(/EUR/, async (msg) => {
    let chatId = msg.chat.id;

    let resultMessage = await getEURRate();
    await bot.sendMessage(chatId, resultMessage, { reply_markup: btnBack });

})

bot.onText(/Change/, async (msg) => {
    let chatId = msg.chat.id;

    await bot.sendMessage(chatId, 'Pick the currency:', { reply_markup: btnCurrencies })
})