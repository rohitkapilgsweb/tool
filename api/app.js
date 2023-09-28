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
const users = require('./routes/user')
app.use(cors())
const DBLogin =  process.env.DATABASE;
app.use(express.json());
app.use(express.urlencoded({extended:false}));
dotenv.config();

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







// end
// App Listiner
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});