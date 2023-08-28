const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const User = require("../modals/registerSchema");
const jwt = require('jsonwebtoken')
const secretkey="secretkey" 
dotenv.config();
const loginUser = expressAsyncHandler(async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  console.log(email)
  console.log(password)
  const dataToSave = await User.findOne({email:req.body.email});

  try {
    console.log(dataToSave.password,"ajdasjdslj")
    if(dataToSave.password === req.body.password){
      console.log(dataToSave.password === req.body.password)
      const token = jwt.sign({user: dataToSave.username, email: dataToSave.email,role:dataToSave.role, img: dataToSave.Profile_img},secretkey,{expiresIn:"8h"}) 
      // res.json({loginStatus: LoginVeryfy,tokenuigiugitygtyigtyi:token})   
        res.status(200).send({success: true, userToken:token });
    }else{
        res.status(200).send({success: false, status: "Wrong Password" });
    }

  } catch {
    res.status(400).send({ success: false });
  }
});

module.exports = { loginUser };
