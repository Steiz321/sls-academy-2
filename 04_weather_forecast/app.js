import TelegramBot from 'node-telegram-bot-api';
import { btnCityMarkup, btnForecastHours } from './keyboards.js';
import { getForecast } from './utils.js';

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

const commands = [
    { command: 'start', description: 'Start getting forecast' },
];

bot.setMyCommands(commands)


bot.onText(/\/start/, async (msg) => {
    let chatId = msg.chat.id;

    await bot.sendMessage(chatId, 'Press the button to check!', { reply_markup: btnCityMarkup })

})

bot.onText(/Check a new forecast in Vinnytsia/, async (msg) => {
    let chatId = msg.chat.id;

    await bot.sendMessage(chatId, 'Choose the interval:', { reply_markup: btnForecastHours })

})

bot.onText(/at intervals of 3 hours/, async (msg) => {
    let chatId = msg.chat.id;

    let resultMessage = await getForecast(3);
    await bot.sendMessage(chatId, resultMessage, { reply_markup: btnCityMarkup });

})

bot.onText(/at intervals of 6 hours/, async (msg) => {
    let chatId = msg.chat.id;

    let resultMessage = await getForecast(6);
    await bot.sendMessage(chatId, resultMessage, { reply_markup: btnCityMarkup });
})

