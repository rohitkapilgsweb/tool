const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:false
    },
    email: {
        type: String,
        required:false
    },
    password: {
        type: String,
        required:false
    },
    Profile_img: {
        type: String,
        required:false
    },
    mobile: {
        type: Number,
        required:false
    },
    token:{
        type: String,
        required:false
    },
    role: {
        type: String,
        required:false
    },
})
userSchema.set('timestamps', true);

const User = mongoose.model('user', userSchema)

module.exports = User