const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const axios = require("axios"); // Import axios
const encoder = require('string-encode-decode');
const facebookDetails = require("../modals/facebook");
dotenv.config();
const getAllPages = expressAsyncHandler(async (req, res) => {
const {id,field} = req.body

const userData  = await facebookDetails.findOne({_id: req.body.id})

let decodedToken = encoder.decode(userData?.accessToken) // hello
try{
    const dataPlace = await axios({
        method: "GET",
        url: `https://graph.facebook.com/v12.0/${userData.fb_userId}/accounts?${req.body.field ? `fields=${req.body.field}` : ''}&access_token=${decodedToken}`,
        headers: { "Accept": "application/json" },
        // params: { key: process.env.PLACE_API_KEY }, // Assuming PLACE_API_KEY is defined in your .env file
    });
    console.log(dataPlace)
    const dataArry = dataPlace.data.data
    const dataObjectArry = []
   
        for(let i = 0; i < dataArry.length; i++){
            console.log(dataArry[i].access_token)
            let dataObject ={
                page_id: dataArry[i].id,
                session:dataArry[i].access_token,
                page_name:dataArry[i].name
            }
            dataObjectArry.push(dataObject)
            // console.log(dataObjectArry)
            
   
    }
    await facebookDetails.findByIdAndUpdate(req.body.id,{pages: dataObjectArry})
    res.status(200).send(dataObjectArry);
    // await facebookDetails.findByIdAndUpdate(_id,{page_access_token:})
}catch(error){
    res.status(400).send(error);

}

})
module.exports = { getAllPages };
