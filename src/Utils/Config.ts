import dotenv from 'dotenv';
import path from "path";

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});
const dbUser = process.env.dbUser || "root";
const dbPassword = process.env.dbPassword || "password";
const enableIndexDb = true;
const env = {
    NODE_ENV: process.env.NODE_ENV || "dev",
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 3000,
    MONGODB: process.env.MONGODB || `mongodb://${dbUser}:${dbPassword}@localhost:27017/?authMechanism=DEFAULT`,
    DATABASE: process.env.Database || "khong_biet_dic",
    SECRET_KEY: process.env.SECRET_KEY || "private key",
    ENABLE_INDEX_DB: enableIndexDb
};

export default env;