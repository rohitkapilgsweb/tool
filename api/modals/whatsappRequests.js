const mongoose = require('mongoose')

const whatsappRequest = new mongoose.Schema({
    userObjectId: {
        type: String,
        required:true
    },
    fullName: {
        type: String,
        required:true
    },
    number: {
        type: String,
        required:true
    },
    businessType: {
        type: String,
        required:true
    },
   

})
whatsappRequest.set('timestamps', true);

const WhatsappRequests = mongoose.model('whatsappRequests', whatsappRequest)

module.exports = WhatsappRequests