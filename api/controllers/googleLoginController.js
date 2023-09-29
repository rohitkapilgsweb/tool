const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const User = require("../modals/registerSchema");

dotenv.config();
const googleLoginController = expressAsyncHandler(async (req, res) => {
const {token}= req.body;

    try{
        const dataPlace = await axios({
            method: "GET",
            url: `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${JSON.stringify(req.body.token)}`,
            headers: { "Accept": "application/json" },
        });
        res.status(200).send(dataPlace.data)
    console.log(dataPlace.data)
    }catch (error){
        res.send("error")
    }

})
module.exports = { googleLoginController };