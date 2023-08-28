const express = require("express");
const router = express.Router();


const { LoginCL } = require("../controllers/loginCL");

router.post("/register", LoginCL);

module.exports = router;