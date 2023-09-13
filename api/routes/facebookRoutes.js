const express = require("express");
const { addFacebookAccount } = require("../controllers/addFacebookAccount");
const { getFacebookAccount } = require("../controllers/getFacebookaccount");
const { getAllPages } = require("../controllers/getAllPages");
const { FacbookPostPublish } = require("../controllers/FacbookPostPublish");

const router = express.Router();


router.post("/add_facebook_account", addFacebookAccount);
router.post("/facebookaccount", getFacebookAccount);
router.post("/get_pages", getAllPages);
router.post("/FacbookPostPublish", FacbookPostPublish);

module.exports = router;