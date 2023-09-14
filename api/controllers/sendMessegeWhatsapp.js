const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const axios = require("axios"); // Import axios
dotenv.config();

const sendMessegeWhatsapp = expressAsyncHandler(async (req, res) => {
    const {number,msg} = req.body

    const bearerToken = process.env.WHATSAPP_TOKEN; // Replace with your Bearer token
const recipientPhoneNumber = req.body.number; // Replace with the recipient's phone number
const messageText = req.body.msg; // Replace with your message text

    try {
        const response = await axios.post(
          'https://graph.facebook.com/v13.0/119919621195664/messages',
          {
            messaging_product: 'whatsapp',
            to: recipientPhoneNumber,
              text: {body: messageText},
          },
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
    
        console.log('Message sent successfully:', response.data);
        res.send(response.data)
      } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
      }
});

module.exports = { sendMessegeWhatsapp };
