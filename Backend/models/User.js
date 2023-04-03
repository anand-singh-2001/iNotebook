const mongoose = require('mongoose')
const { Schema } = mongoose;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,  //to set mandatory field
        unique: true
    },
    password: {
        type: String,
        required: true,
        // unique: true
    },
    date: {
        type: Date,
        default: Date.now

    }
});
const User = mongoose.model('User', UserSchema)   //(model,schemaName) is passed.
User.createIndexes()
module.exports = User;