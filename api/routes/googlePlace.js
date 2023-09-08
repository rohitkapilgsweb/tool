const express = require("express");
const { PlaceController } = require("../controllers/PlaceController");
const { GoogleBUsinessController } = require("../controllers/GoogleBUsinessController");


const router = express.Router();


router.post("/place-api-search", PlaceController);
router.post("/google-business", GoogleBUsinessController);

module.exports = router;