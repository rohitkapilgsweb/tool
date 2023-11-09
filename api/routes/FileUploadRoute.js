const express = require("express");
const { FileUploadController } = require("../controllers/FileUpload");
const { upload } = require("../middelwaer/diskStorage");
const router = express.Router();


router.post("/upload",upload.single('fileUploadField'), FileUploadController);

module.exports = router;