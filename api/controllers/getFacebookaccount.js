const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const facebookDetails = require("../modals/facebook");
dotenv.config();
const getFacebookAccount = expressAsyncHandler(async (req, res) => {

    const {userId, session} = req.body;

    // const dataPlace = await axios({
    //     method: "POST",
    //     url: `https://graph.facebook.com/v17.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_SECRECT}&fb_exchange_token=${req.body.session}`,
    //     headers: { "Accept": "application/json" },
    //     // params: { key: process.env.PLACE_API_KEY }, // Assuming PLACE_API_KEY is defined in your .env file
    // });
    // console.log(dataPlace,`https://graph.facebook.com/v17.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_SECRECT}&fb_exchange_token=${req.body.session}`)
    try{
      const facebookData = await facebookDetails.find({userObjectId : userId})
        res.send(facebookData)
    }catch(error){
res.status(400).send(error)
    }

})
module.exports = { getFacebookAccount };