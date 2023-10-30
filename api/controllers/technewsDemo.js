const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const axios = require("axios"); // Import axios
const facebookDetails = require("../modals/facebook");
dotenv.config();
const technewsDemo = expressAsyncHandler(async (req, res) => {
const {name} = req.body

try{
   
    res.status(200).send(`Kya Hal Hai ${name}`);
   
}catch(error){
    res.status(400).send(error);

}

})
module.exports = { technewsDemo };
