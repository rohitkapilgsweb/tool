const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const User = require("../modals/registerSchema");
const telegramTokens = require("../modals/telegramToken");
dotenv.config();
const telegramGetTokenController = expressAsyncHandler(async (req, res) => {
    const {user_id} = req.body;

  
    try{
      const TelegramTokenSave =  await telegramTokens.findOne({userObjectId:user_id});
        res.send(TelegramTokenSave)
    }catch{
        res.send("faild")
    }

})
module.exports = { telegramGetTokenController };