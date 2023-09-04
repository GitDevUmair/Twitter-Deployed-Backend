const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://umair:twitter0@cluster0.w1bblxn.mongodb.net/?retryWrites=true&w=majority";
async function connectToMongo() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

module.exports = connectToMongo;
