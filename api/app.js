const mongoose = require('mongoose')
const express = require('express')
const dotenv = require("dotenv");
var cors = require('cors')
  const app = express();
const login = require("./routes/login");
const register = require("./routes/register");
app.use(cors())
const DBLogin =  process.env.DATABASE;
app.use(express.json());
app.use(express.urlencoded({extended:false}));
dotenv.config();

// MongoDB Connection
const DB = DBLogin // Replace with your MongoDB connection URL
mongoose.connect(DB, {
}).then(() => {
    console.log("connected")
}).catch((err) => console.log("not connect"))

// All Routes
app.use("/api", login);
app.use("/api", register);




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
  }
  if (messageText.includes('hi')) {
    bot.sendMessage(chatId, 'Hello! How can I assist you?');
  }
});


// end
// App Listiner
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});