const mongoose = require('mongoose')
const express = require('express')
const dotenv = require("dotenv");
var cors = require('cors')
  const app = express();
const login = require("./routes/login");
const register = require("./routes/register");
const telegramToken = require("./routes/telegramToken");
const facebookRoutes = require("./routes/facebookRoutes");
const googlePlace = require("./routes/googlePlace")
const Whatsapp = require('./routes/Whatsapp')
const users = require('./routes/user');
const FileUploadRoute = require('./routes/FileUploadRoute');
const { upload } = require('./middelwaer/diskStorage');
const MediaUpload = require('./modals/FileUploadSchema');
app.use(cors())
const DBLogin =  process.env.DATABASE;
app.use(express.json());
app.use(express.urlencoded({extended:false}));
dotenv.config();
const router = express.Router();
// MongoDB Connection
const DB = DBLogin // Replace with your MongoDB connection URL
mongoose.connect(DB, {
}).then(() => {
    console.log("connected")
}).catch((err) => console.log(err,"not connect"))

// All Routes
app.use("/api", login);
app.use("/api", register);
app.use("/api", telegramToken);
app.use('/api', facebookRoutes);
app.use('/api', googlePlace);
app.use('/api', Whatsapp);
app.use('/api',users);
app.use('/api',FileUploadRoute);
app.use('/api/singleuploads',express.static('singleuploads'));



  // router.post("/api/upload", upload.single('fileUploadField'), async (req, res) => {  
  //       console.log(req.body)
  //       console.log(req.file)
  //       let employee = new MediaUpload({
  //         name: req.file.originalname,
  //       ClientId: req.body.ClientId,
  //       PostId: req.body.PostId ? req.body.PostId : null,
  //       fileUploadField: req.file.path
  //       });
  //       const dataToSave = await employee.save();

  //       res.send(dataToSave);

  // });


// end
// App Listiner
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});