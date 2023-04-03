//Connecting to mongoDB server

const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1:27017/inotebook"  //inotebook database created to store the created user data.
const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => console.log("Mongo Connected")).catch((err) => console.log("Error Connecting", err))
}


module.exports = connectToMongo;