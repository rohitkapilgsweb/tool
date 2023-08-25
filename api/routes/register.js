const express = require("express");
const router = express.Router();

const { loginUser } = require("../controllers/loginUser");

router.post("/register", loginUser);

module.exports = router;