const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const axios = require("axios"); // Import axios
const md5 = require("md5");
const WhatsappRequests = require("../modals/whatsappRequests");
dotenv.config();
const whatsapp_Request = expressAsyncHandler(async (req, res) => {
const {userObjectId,fullName,number,businessType} = req.body

const data = new WhatsappRequests({
    userObjectId: req.body.userObjectId ? req.body.userObjectId : "null",
    fullName: req.body.fullName ? req.body.fullName : "null",
    number: req.body.number ? req.body.number : "null",
    businessType: req.body.businessType ? req.body.businessType : "null",
  });

try{
    const FindRecord = await WhatsappRequests.findOne({userObjectId:req.body.userObjectId});
    if(FindRecord){
        res.status(200).send({status: true, message: "Already Requested"});
    }else if(req.body.userObjectId && req.body.fullName){
        await data.save();
        res.status(200).send({status: true, message: "Request Has been Sent"});
    }else{
        res.status(200).send({status: false, message: "Request To Send"});
    }
    
   
}catch(error){
    res.status(400).send(error);

}

})
module.exports = { whatsapp_Request };
