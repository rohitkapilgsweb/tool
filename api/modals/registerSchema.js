const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    fullname: {
        type: String,
        required:false
    },
    email: {
        type: String,
        required:true
    },
    mobile: {
        type: Number,
        required:false
    },
    password: {
        type: String,
        required:false
    },
    role: {
        type: String,
        required: true
    }
})
userSchema.set('timestamps', true);

const User = mongoose.model('user', userSchema)

module.exports = User