const express = require("express");
const { addFacebookAccount } = require("../controllers/addFacebookAccount");
const { getFacebookAccount } = require("../controllers/getFacebookaccount");

const router = express.Router();


router.post("/add_facebook_account", addFacebookAccount);
router.get("/facebookaccount", getFacebookAccount);

module.exports = router;