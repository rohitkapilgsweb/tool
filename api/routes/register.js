const express = require("express");
const router = express.Router();

const { UserRegister } = require("../controllers/registerControllers");

router.post("/register", UserRegister);

module.exports = router;