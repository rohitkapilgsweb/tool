// telegram bot 

const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const bot = new TelegramBot('6353894029:AAETmmJQgft2vFgvVcuihaYozQf-7Qh3xqk', { polling: true });

// Event listener for incoming messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text.toLowerCase(); // Convert message to lowercase
  
  if (messageText === 'hello') {
    bot.sendMessage(chatId, 'Hello! How can I assist you?');
  }else  if (messageText.includes('hi')) {
    bot.sendMessage(chatId, 'Hello! How can I assist you?');
  }else{
    bot.sendMessage(chatId, 'Enter Valid Input!');
  }
 
});