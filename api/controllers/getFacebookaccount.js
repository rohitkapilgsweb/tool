const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const facebookDetails = require("../modals/facebook");
dotenv.config();
const getFacebookAccount = expressAsyncHandler(async (req, res) => {

    try{
      const facebookData = await facebookDetails.find()
        res.status(200).send(facebookData)
    }catch(error){
res.status(400).send(error)
    }

})
module.exports = { getFacebookAccount };