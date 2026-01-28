const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_KEY);
    console.log("Database connected...");
  } catch (error) {
    console.log("DB Error");
    process.exit(1);
  }
};

module.exports = connectDB;
