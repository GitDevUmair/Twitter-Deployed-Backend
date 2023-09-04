const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    fullname:{
        type: String,
        required: true
    },
    contact:{
        type: Number,
    },
    profileimage:{
        type: String,
    },
    followers :{
        type: Array,
    },
    following :{
        type: Array,
    },
    status:{
        type: String,
    }
})
const User = mongoose.model('user', UserSchema);
module.exports = User;