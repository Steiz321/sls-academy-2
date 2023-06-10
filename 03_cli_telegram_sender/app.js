const TelegramBot = require('node-telegram-bot-api');
const { Command } = require('commander');
process.env["NTBA_FIX_350"] = 1;

const program = new Command();

const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});
const chatId = process.env.CHAT_ID;

program
  .name('cli-telegram-sender')
  .description('CLI to make some notes with telegram bot')
  .version('1.0.0');

program.command('message')
  .description('Send a message to bot')
  .argument('<message>')
  .alias('m')
  .action( async (message) => {
    try {
        await bot.sendMessage(chatId, message);
        console.log('Message has been sent!');
        process.exit();
    } catch(err) {
        console.log(`Error: ${err}`);
        process.exit();
    }
  });

program.command('photo')
  .description('Send a photo to bot')
  .argument('<photoPath>')
  .alias('p')
  .action(async (photoPath) => {
    try {
        await bot.sendPhoto(chatId, photoPath);
        console.log('Photo has been sent!');
        process.exit();
    } catch(err) {
        console.log(`Error: ${err}`);
        process.exit();
    }
  });

program.parse();