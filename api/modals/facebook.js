const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userObjectId: {
        type: String,
        required:true
    },
    accessToken:{
        type: String,
        required:false
    },
    autoPosting:{
        type: Boolean,
        required:false
    },
    old_accessToken:{
        type: String,
        required:false
    },
    page_access_token:{
        type: String,
        required:false
    },
    fb_userId:{
        type: String,
        required:false
    },
    fb_userImg:{
        type: String,
        required:false
    },
    fb_Username:{
        type: String,
        required:false
    },
    fb_pages:{
        type: String,
        required:false
    },
    fb_groups:{
        type: String,
        required:false
    }

})
userSchema.set('timestamps', true);

const facebookDetails = mongoose.model('facebookDetails', userSchema)

module.exports = facebookDetails