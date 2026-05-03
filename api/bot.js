const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const update = req.body;
    
    // ১. সাধারণ মেসেজ বা কমান্ড হ্যান্ডেল করার জন্য
    if (update && update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      if (text === '/start') {
        // বোতাম বা Inline Keyboard তৈরি করা
        const opts = {
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'ℹ️ কাজের বিবরণ', callback_data: 'info' },
                { text: '⚙️ সেটিংস', callback_data: 'settings' }
              ],
              [
                { text: '🌐 ওয়েবসাইট দেখুন', url: 'https://dht-omega.vercel.app/' }
              ]
            ]
          }
        };
        await bot.sendMessage(chatId, 'স্বাগতম! আপনার প্রজেক্টের কাজগুলো নিচে বোতাম আকারে দেওয়া হলো:', opts);
      } else {
        await bot.sendMessage(chatId, 'দয়া করে /start কমান্ডটি লিখুন।');
      }
    }

    // ২. ব্যবহারকারী কোনো বোতামে ক্লিক করলে তার উত্তর দেওয়া
    if (update && update.callback_query) {
      const callbackQuery = update.callback_query;
      const chatId = callbackQuery.message.chat.id;
      const data = callbackQuery.data;

      if (data === 'info') {
        await bot.sendMessage(chatId, 'এই প্রজেক্টের কাজের ক্ষমতা:\n১. মেসেজ গ্রহণ ও উত্তর দেওয়া\n২. ওয়েব লিংক প্রদর্শন\n৩. কাস্টম কমান্ড রিয়্যাকশন');
      } else if (data === 'settings') {
        await bot.sendMessage(chatId, 'আপনি এখন সেটিংস মেনুতে আছেন।');
      }

      // বোতামের লোডিং অবস্থা বন্ধ করার জন্য
      await bot.answerCallbackQuery(callbackQuery.id);
    }
    
    res.status(200).send('OK');
  } else {
    res.status(200).send('Bot is running!');
  }
};

