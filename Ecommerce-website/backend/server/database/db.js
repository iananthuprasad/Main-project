const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mainproject", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};

module.exports = connectDB;
