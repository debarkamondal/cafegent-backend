const mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config();

const mongoUri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/adda-cafe`;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log(
      `Connected to mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/adda-cafe`
    );
  } catch (error) {
    console.log("error");
  }
};
module.exports = connectToMongo;
