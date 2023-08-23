const express = require("express");
const router = express.Router();

const { LoginCL } = require("../controllers/loginCL");

router.post("/login", LoginCL);

module.exports = router;