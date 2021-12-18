const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

const connect = async (dbUrl) => {
  try {
    mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      console.log("Database connected");
    });
  } catch (err) {
    console.error(err.message);
    throw new Error("Could not connect to the database");
  }
};

module.exports = {
  connect,
};