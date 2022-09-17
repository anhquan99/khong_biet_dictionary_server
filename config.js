const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "dev",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 5000,
  MONGODB: process.env.MONGODB || "mongodb://localhost:27017/khong_biet",
  Database: process.env.Database || "khong_biet",
  SECRET_KEY: process.env.SECRET_KEY || "private key",
  CLIENT: process.env.CORS || [
    "http://localhost:3000/",
    "https://studio.apollographql.com"
  ]
};
