const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const User = require("../modals/registerSchema");
dotenv.config();
const LoginCL = expressAsyncHandler(async (req, res) => {
  const {
    username,
    email,
    password,
    Profile_img,
    facebook_page_Profile_img,
    facebook_page_token,
    facebook_User_id,
    facebook_User_login_token,
    mobile,
    token,
    role,
  } = req.body;
  const data = new User({
    username: req.body.username ? req.body.username : "null",
    email: req.body.email ? req.body.email : "null",
    password: req.body.password ? req.body.password : "null",
    Profile_img: req.body.Profile_img ? req.body.Profile_img : "null",
    facebook_page_Profile_img: req.body.facebook_page_Profile_img
      ? req.body.facebook_page_Profile_img
      : "null",
    facebook_User_id: req.body.facebook_User_id
      ? req.body.facebook_User_id
      : "null",
    facebook_User_login_token: req.body.facebook_User_login_token
      ? req.body.facebook_User_login_token
      : "null",
    facebook_page_token: req.body.facebook_page_token
      ? req.body.facebook_page_token
      : "null",
    mobile: req.body.mobile ? req.body.mobile : 0,
    token: req.body.token ? req.body.token : "null",
    role: "tempuser",
  });

  try {
    const dataToSave = await data.save();
    res.status(200).send({ dataToSave, success: true });
  } catch {
    res.status(400).send({ success: false });
  }
});

module.exports = { LoginCL };
