const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const axios = require("axios"); // Import axios
dotenv.config();

const PlaceController = expressAsyncHandler(async (req, res) => {
    const { msg_body, next_page,back_page } = req.body;
    try {
        if(!msg_body && !next_page){
            res.send({status: "Search is Empty"})
        }
        let emptryArry= []
        if(msg_body){
            const dataPlace = await axios({
                method: "GET",
                url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${msg_body}`,
                headers: { "Accept": "application/json" },
                params: { key: process.env.PLACE_API_KEY }, // Assuming PLACE_API_KEY is defined in your .env file
            });

            if(emptryArry === []){
                dataPlace.data.results.map((item)=>{
                    emptryArry.push(item.place_id)
                })
            }else if(emptryArry !== []){
                emptryArry = []
                dataPlace.data.results.map((item)=>{
                    emptryArry.push(item.place_id)
                })
            }

            // console.log(emptryArry)

            res.status(200).send({place_id: emptryArry, next_page: dataPlace.data.next_page_token});
            // res.status(200).send({next_page: dataPlace.data.next_page_token});
        } else if(next_page){
            const dataPlace = await axios({
                method: "GET",
                url: `https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${next_page}`,
                headers: { "Accept": "application/json" },
                params: { key: process.env.PLACE_API_KEY }, // Assuming PLACE_API_KEY is defined in your .env file
            });
    
            if(emptryArry === []){
                dataPlace.data.results.map((item)=>{
                    emptryArry.push(item.place_id)
                })
            }else if(emptryArry !== []){
                emptryArry = []
                dataPlace.data.results.map((item)=>{
                    emptryArry.push(item.place_id)
                })
            }

            // console.log(emptryArry)

            res.status(200).send({place_id: emptryArry, next_page: dataPlace.data.next_page_token});
            // Send the dataPlace as the response
            // res.status(200).send(dataPlace.data);
        }
     
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

module.exports = { PlaceController };
