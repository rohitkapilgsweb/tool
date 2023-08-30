const express = require("express");
const router = express.Router();

const { telegramTokenController } = require("../controllers/telegramTokenController");
const { telegramGetTokenController } = require("../controllers/telegramGetTokenController");
const { addFacebookAccount } = require("../controllers/addFacebookAccount");
const { getFacebookAccount } = require("../controllers/getFacebookaccount");

router.post("/telegramToken", telegramTokenController);
router.post("/gettelegramToken", telegramGetTokenController);


module.exports = router;