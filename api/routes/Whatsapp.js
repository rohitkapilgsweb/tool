const express = require("express");
const { sendMessegeWhatsapp } = require("../controllers/sendMessegeWhatsapp");
const { whatsapp_Request } = require("../controllers/whatsapp_Request");
const { Allwhatsapprequest } = require("../controllers/Allwhatsapprequest");
const router = express.Router();



router.post("/whatsapp-send-messege", sendMessegeWhatsapp);
router.post("/whatsapp-requests", whatsapp_Request);
router.post("/get-whatsapp-request", Allwhatsapprequest);


module.exports = router;