const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const axios = require("axios"); // Import axios
dotenv.config();

const PlaceController = expressAsyncHandler(async (req, res) => {
    const { msg_body, nex_page } = req.body;
    try {
        if(msg_body){
            const dataPlace = await axios({
                method: "GET",
                url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${msg_body}`,
                headers: { "Accept": "application/json" },
                params: { key: process.env.PLACE_API_KEY }, // Assuming PLACE_API_KEY is defined in your .env file
            });
    
            // Send the dataPlace as the response
            res.status(200).send(dataPlace.data);
        } else if(nex_page){
            const dataPlace = await axios({
                method: "GET",
                url: `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${nex_page}`,
                headers: { "Accept": "application/json" },
                params: { key: process.env.PLACE_API_KEY }, // Assuming PLACE_API_KEY is defined in your .env file
            });
    
            // Send the dataPlace as the response
            res.status(200).send(dataPlace.data);
        }
     
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

module.exports = { PlaceController };
