const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const axios = require("axios"); // Import axios
const facebookDetails = require("../modals/facebook");
dotenv.config();
const FacbookPostPublish = expressAsyncHandler(async (req, res) => {
// const {page,page_id,msg,media} = req.query
const {page,page_id,msg,media} = req.body


try{
    console.log(media)

    if(media !== undefined){
        const dataPlace = await axios({
            method: "POST",
            url: `https://graph.facebook.com/${req.body.page_id}/photos?url=${req.body.media}&message=${req.body.msg}&access_token=${req.body.page}`,
            headers: { "Accept": "application/json" },
        });
        // console.log(dataPlace.data)
        res.status(200).send(dataPlace.data);
    }else{  
        const dataPlace = await axios({
            method: "POST",
            url: `https://graph.facebook.com/${req.body.page_id}/feed?message=${req.body.msg}&access_token=${req.body.page}`,
            headers: { "Accept": "application/json" },
        });
        // console.log(dataPlace.data)
        res.status(200).send(dataPlace.data);
    }
}catch(error){
    res.status(400).send(error);
}

})
module.exports = { FacbookPostPublish };
