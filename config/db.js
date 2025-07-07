const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // console.log(
    //   `Mongodb database connected ${mongoose.connection.host}`.bgGreen.white
    // );
  } catch (error) {
    console.log(`Mongodb error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
