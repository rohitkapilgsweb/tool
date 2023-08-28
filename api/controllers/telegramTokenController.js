const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const User = require("../modals/registerSchema");
const telegramTokens = require("../modals/telegramToken");
dotenv.config();
const telegramTokenController = expressAsyncHandler(async (req, res) => {
    const {user_id, telegram_BotToken} = req.body;

    const data = new telegramTokens({
        userObjectId:req.body.user_id,
        telegramToken:req.body.telegram_BotToken
    })

    try{
      const TelegramTokenSave =  await data.save();
        res.send(TelegramTokenSave)
    }catch{
        res.send("faild")
    }

})
module.exports = { telegramTokenController };