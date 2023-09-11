const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const User = require("../modals/registerSchema");
const telegramTokens = require("../modals/telegramToken");
dotenv.config();
const telegramTokenController = expressAsyncHandler(async (req, res) => {
    const {user_id, telegram_BotToken, updateToken} = req.body;

    const data = new telegramTokens({
        userObjectId:req.body.user_id,
        telegramToken:req.body.telegram_BotToken
    })
    const Check = await  telegramTokens.findOne({userObjectId:req.body.user_id})

   
    try{
        console.log(Check?.userObjectId)
        console.log(Check?.telegramToken)

        if(req.body.updateToken){
            const update =   await telegramTokens.findByIdAndUpdate(Check?._id, {telegramToken: req.body.updateToken })
            res.send({updates: true,status: true})
            console.log(update)
          }

        if(Check && Check?.userObjectId && Check?.telegramToken === req.body.telegram_BotToken){
            res.send({status: "Already Updated"})
        }else{
            const TelegramTokenSave =  await data.save();
            res.send({status: true})
        }
     
    }catch{
        res.send("faild")
    }

})
module.exports = { telegramTokenController };