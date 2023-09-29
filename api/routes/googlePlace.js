const express = require("express");
const { PlaceController } = require("../controllers/PlaceController");
const { GoogleBUsinessController } = require("../controllers/GoogleBUsinessController");
const { googleLoginController } = require("../controllers/googleLoginController");


const router = express.Router();


router.post("/place-api-search", PlaceController);
router.post("/google-business", GoogleBUsinessController);
router.post("/google-login", googleLoginController);

module.exports = router;