//FILENAME : db.js

const mongoose = require("mongoose");

// Replace this with your MONGOURI.

const MONGO_URI =
  "mongodb+srv://finalProject:Blackops1@cluster0.o3lx5.mongodb.net/finalproject1?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
