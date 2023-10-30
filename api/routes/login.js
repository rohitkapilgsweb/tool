const express = require("express");
const router = express.Router();

const { loginUser } = require("../controllers/loginUser");
const { technewsDemo } = require("../controllers/technewsDemo");

router.post("/login", loginUser);
router.post("/technews", technewsDemo);

module.exports = router;