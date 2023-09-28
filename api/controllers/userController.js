const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const User = require("../modals/registerSchema");

dotenv.config();
const userController = expressAsyncHandler(async (req, res) => {

    const Check = await  User.find()
    try{
        res.send(Check)
    
    }catch{
        res.send("faild")
    }

})
module.exports = { userController };