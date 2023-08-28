const express = require("express");
const router = express.Router();

const { telegramTokenController } = require("../controllers/telegramTokenController");
const { telegramGetTokenController } = require("../controllers/telegramGetTokenController");

router.post("/telegramToken", telegramTokenController);
router.post("/gettelegramToken", telegramGetTokenController);

module.exports = router;