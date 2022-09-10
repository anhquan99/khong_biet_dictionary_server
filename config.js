const dotenv = requrie("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dir, `${process.env.NODE_ENV}.env`)
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "dev",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 4000,
  MONGODB: process.env.CONNECTION_STR || "mongodb://localhost:27017",
  SECRET_KEY: process.env.SECRET_KEY || "private key"
};
