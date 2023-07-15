import dotenv from 'dotenv';
import path from "path";

dotenv.config();
const dbUser = process.env.MONGO_DB_USER;
const dbPassword = process.env.MONGO_DB_PASSWORD;
const enableIndexDb = true;
const env = {
    NODE_ENV: process.env.NODE_ENV as string,
    HOST: process.env.HOST as string,
    PORT: process.env.PORT as string,
    MONGODB: process.env.MONGODB || `mongodb://${dbUser}:${dbPassword}@localhost:27017/?authMechanism=DEFAULT`,
    DATABASE: process.env.MONGO_DB as string,
    TEST_DATABASE : process.env.MONGO_DB_TEST as string,
    SECRET_KEY: process.env.SECRET_KEY as string,
    ENABLE_INDEX_DB: enableIndexDb as boolean,
    S3_ACCESS_KEY_ID : process.env.S3_ACCESS_KEY_ID as string,
    S3_SECRET_ACCESS_KEY : process.env.S3_SECRET_ACCESS_KEY as string,
    S3_BUCKET : process.env.S3_BUCKET as string,
    S3_ENDPOINT : process.env.S3_ENDPOINT as string,
    S3_REGION : process.env.S3_REGION as string,
    S3_FILE_MAX_SIZE : process.env.S3_FILE_MAX_SIZE as string
};
export default env;