const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "dev",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 4000,
  MONGODB: process.env.MONGODB || "mongodb://localhost:27017",
  SECRET_KEY: process.env.SECRET_KEY || "private key"
};
