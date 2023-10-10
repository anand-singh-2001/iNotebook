//Connecting to mongoDB server
require("dotenv").config();

const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URL; //inotebook database created to store the created user data.
console.log(mongoURI);
const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Mongo Connected"))
    .catch((err) => console.log("Error Connecting", err));
};

module.exports = connectToMongo;
