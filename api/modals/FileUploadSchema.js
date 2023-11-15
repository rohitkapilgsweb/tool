const mongoose = require('mongoose')

const FileUpload = new mongoose.Schema({
    name: {
        type: String,
        required:false
    },
    PostId:{
        type: String,
        required:false
    },
    message:{
        type: String,
        required:false
    },
    fileUploadField: {
        type: String,
        required: false  
    },
    ClientId: {
        type: String,
        require: false
    }

})
FileUpload.set('timestamps', true);

const MediaUpload = mongoose.model('Media', FileUpload)

module.exports = MediaUpload