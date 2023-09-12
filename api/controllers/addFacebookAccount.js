const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const facebookDetails = require("../modals/facebook");
dotenv.config();
const addFacebookAccount = expressAsyncHandler(async (req, res) => {
const {user_id, accessToken,page_access_token,autoPost,fb_userId,fb_userImg,fb_Username,fb_pages,fb_groups}= req.body

const data = new facebookDetails({
    userObjectId: req.body.user_id,
    accessToken:req.body.accessToken,
    page_access_token:req.body.page_access_token,
    fb_userId: req.body.fb_userId,
    fb_userImg: req.body.fb_userImg,
    fb_Username:req.body.fb_Username,
    autoPosting:req.body.autoPost,
    fb_pages: req.body.fb_pages,
    fb_groups: req.body.fb_groups
})
const facebookData = await facebookDetails.findOne({fb_Username : req.body.fb_Username})
try{
    if(!facebookData){
        const datasend = await data.save();
        res.status(200).send({status: "Account is Added"})
    }else if(req.body.fb_Username === facebookData.fb_Username){
        res.status(200).send({status: "This Account Already Added"})
    }

}catch(error){
    res.status(400).send(error);

}

})
module.exports = { addFacebookAccount };
