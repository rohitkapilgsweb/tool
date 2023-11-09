const mongoose = require('mongoose')

const FileUpload = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    PostId:{
        type: String,
        required:true
    },
    fileUploadField: {
        type: String,
        required: true  
    },
    ClientId: {
        type: String,
        require: true
    }

})
FileUpload.set('timestamps', true);

const MediaUpload = mongoose.model('Media', FileUpload)

module.exports = MediaUpload