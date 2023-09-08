const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const axios = require("axios"); // Import axios
dotenv.config();

const GoogleBUsinessController = expressAsyncHandler(async (req, res) => {
    const {place_id} = req.body
    const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=name,formatted_phone_number,formatted_address,url,photo,business_status&place_id=${place_id}&key=${process.env.PLACE_API_KEY}`;
  try {
    const phoneData = await fetch(url,{

    });
    const userData = await phoneData?.json();
    res.send(userData?.result)
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}); 

module.exports = { GoogleBUsinessController };
