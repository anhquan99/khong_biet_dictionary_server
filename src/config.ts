import dotenv from 'dotenv';
import path from "path";

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

export const env = {
    NODE_ENV: process.env.NODE_ENV || "dev",
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 3000,
    MONGODB: process.env.MONGODB || "mongodb://localhost:27017/khong_biet",
    Database: process.env.Database || "khong_biet",
    SECRET_KEY: process.env.SECRET_KEY || "private key"
  };