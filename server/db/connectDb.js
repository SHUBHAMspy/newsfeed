const mongoose = require("mongoose");
const config = require("../config");
const { mongodbUrl } = config;
const connectDb = async () => {
  try {
    await mongoose.connect(mongodbUrl);
    console.log("mongo db connected");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connectDb;