const multer = require("multer");

const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
                                                                             
let mydata;
const upload = multer({
  storage: multer.diskStorage({
    destination: "singleuploads/",
    filename: (req, file, cb) => {
      console.log(file,"hello")  
      const name = file.originalname;
      (mydata = file), cb(null, `${new Date().getTime()}-${name}`);
    },
  }),

  fileFilter: (req, file, cb) => {
    console.log(file,"fileee")
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error("file is not allowed"));
    }
    cb(null, file);   
  },
})
module.exports = { upload };  