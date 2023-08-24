const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const User = require("../modals/registerSchema");
dotenv.config();
const LoginCL = expressAsyncHandler(async (req, res) => {
  const { username, email, fullname, mobile, password } = req.body;
  const data = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile,
    role: "fbUser"
  });
  try {
    const dataToSave = await data.save();
    console.log(data, "data", truereq.body);
    res.status(200).send({success:true});
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = { LoginCL };