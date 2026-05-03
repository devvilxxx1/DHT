const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const update = req.body;
    
    if (update && update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      await bot.sendMessage(chatId, `আপনি লিখেছেন: ${text}`);
    }
    
    res.status(200).send('OK');
  } else {
    res.status(200).send('Bot is running!');
  }
};
