const mongoose = require('mongoose')
const express = require('express')
const dotenv = require("dotenv");
var cors = require('cors')
  const app = express();
const login = require("./routes/login");
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
}).catch((err) => console.log("not connect"))

// All Routes
app.use("/api", login);
// app.use("/api", registerRoutes);


// App Listiner
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});