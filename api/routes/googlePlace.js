const express = require("express");
const { PlaceController } = require("../controllers/PlaceController");


const router = express.Router();


router.post("/place-api-search", PlaceController);

module.exports = router;