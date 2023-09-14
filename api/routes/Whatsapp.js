const express = require("express");
const { sendMessegeWhatsapp } = require("../controllers/sendMessegeWhatsapp");
const router = express.Router();



router.post("/whatsapp-send-messege", sendMessegeWhatsapp);


module.exports = router;