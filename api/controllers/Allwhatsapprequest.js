const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const axios = require("axios"); // Import axios
const md5 = require("md5");
const User = require("../modals/registerSchema");
const WhatsappRequests = require("../modals/whatsappRequests");
dotenv.config();
const Allwhatsapprequest = expressAsyncHandler(async (req, res) => {
    const {userObjectId} = req.body
try{
        const FindUser = await User.findOne({_id: req.body.userObjectId});

        if(FindUser){
            const FindRecord = await WhatsappRequests.find();
            console.log(FindRecord._id)
            if(FindRecord?._id){
                res.status(200).send({status:true, data:FindRecord});
            }else if(FindRecord?._id === undefined){
                res.status(200).send({status:false, message: 'Data Not Found'});
            }
           
        }else{
            res.status(200).send({status:false , message: 'UnAutorized Access'})
        }

    }catch(error){
        res.status(400).send(error);
    }

})
module.exports = { Allwhatsapprequest };
