// const TelegramBot = require('node-telegram-bot-api');

// // Replace 'YOUR_BOT_TOKEN' with your actual bot token
// const bot = new TelegramBot('6353894029:AAETmmJQgft2vFgvVcuihaYozQf-7Qh3xqk', { polling: true });

// // Object to store user information
// const userInformation = {};

// // Command to capture user information
// bot.onText(/\/start/, (msg) => {
//   const chatId = msg.chat.id;
//   const username = msg.from.username;
  
//   userInformation[username] = chatId;

//   const messageText = msg.text.toLowerCase(); // Convert message to lowercase
  
//   if (messageText.includes('hello')) {
//     bot.sendMessage(chatId, 'Hello! How can I assist you?');
//   }

  
//   bot.sendMessage(chatId, `Hello ${msg.from.first_name}! Your information is captured.`);
// });

// // Command to send a message to a user using stored chat ID
// bot.onText(/\/send_message/, (msg) => {
//   const chatId = msg.chat.id;
//   const username = msg.from.username;

//   if (userInformation[username]) {
//     const targetChatId = userInformation[username];
//     bot.sendMessage(targetChatId, 'This is a message from your bot.');
//   } else {
//     bot.sendMessage(chatId, 'User information not found.');
//   }
// });



