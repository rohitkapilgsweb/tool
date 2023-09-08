const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const axios = require("axios"); // Import axios
dotenv.config();

const GoogleBUsinessController = expressAsyncHandler(async (req, res) => {
    const {place_id} = req.body
    const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=name,formatted_phone_number,formatted_address,url,photo,business_status&place_id=${place_id}&key=${process.env.PLACE_API_KEY}`;
  try {
    const dataPlace = await axios({
        method: "POST",
        url: `https://maps.googleapis.com/maps/api/place/details/json?fields=name,formatted_phone_number,formatted_address,url,photo,business_status&place_id=${place_id}`,
        headers: { "Accept": "application/json" },
        params: { key: process.env.PLACE_API_KEY }, // Assuming PLACE_API_KEY is defined in your .env file
    });
// console.log(dataPlace.data?.result)
    res.send(dataPlace?.data?.result)
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}); 

module.exports = { GoogleBUsinessController };
