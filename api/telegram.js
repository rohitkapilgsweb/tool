// telegram bot 

const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const bot = new TelegramBot('6353894029:AAETmmJQgft2vFgvVcuihaYozQf-7Qh3xqk', { polling: true });
const chatIds = []
// Event listener for incoming messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const chatName = msg.chat.first_name +" "+ msg.chat.last_name;


  function addObjectToArrayIfNotDuplicate(array, object) {
    // Check if the object already exists in the array
    if (!array.some(item => areObjectsEqual(item, object))) {
      // If not a duplicate, push the object to the array
      array.push(object);
    }
  }

  function areObjectsEqual(obj1, obj2) {
    // Compare the properties of the objects to determine if they are equal
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  addObjectToArrayIfNotDuplicate(chatIds, {id : chatId, name: chatName});

console.log(chatIds,"aaaaaaaaaghjkjhhjhj")

  const messageText = msg.text.toLowerCase(); // Convert message to lowercase
  if (messageText === 'hello') {
    bot.sendMessage(chatId, 'Hello! How can I assist you?');
    const url = 'https://assets.cntraveller.in/photos/6216399bb2902dc1889fd867/16:9/w_960,c_limit/Mohammad%20Aziz.jpg';
    bot.sendPhoto(chatId, url);
  }else  if (messageText.includes('hi')) {
    bot.sendMessage(chatId, `Hello! How can I assist you? Hi ${chatName}`);
  }else{
    bot.sendMessage(chatId, 'Enter Valid Input!');
  }
 
});