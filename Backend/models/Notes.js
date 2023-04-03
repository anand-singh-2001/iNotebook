const mongoose = require('mongoose')
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,  //accepts the id of the user logged in from user.js
        ref: 'user'
    },
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,  //to set mandatory field

    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now

    }
});

module.exports = mongoose.model('notes', NotesSchema)   //(model,schemaName) is passed.