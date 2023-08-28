const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userObjectId: {
        type: String,
        required:false
    },
    telegramToken:{
        type: String,
        required:false
    },
    
})
userSchema.set('timestamps', true);

const telegramTokens = mongoose.model('telegramToken', userSchema)

module.exports = telegramTokens