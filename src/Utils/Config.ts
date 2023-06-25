import dotenv from 'dotenv';
import path from "path";

dotenv.config();
const dbUser = process.env.MONGO_DB_USER;
const dbPassword = process.env.MONGO_DB_PASSWORD;
const enableIndexDb = true;
const env = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    MONGODB: process.env.MONGODB || `mongodb://${dbUser}:${dbPassword}@localhost:27017/?authMechanism=DEFAULT`,
    DATABASE: process.env.MONGO_DB,
    TEST_DATABASE : process.env.MONGO_DB_TEST,
    SECRET_KEY: process.env.SECRET_KEY,
    ENABLE_INDEX_DB: enableIndexDb,
    S3_ACCESS_KEY_ID : process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY : process.env.S3_SECRET_ACCESS_KEY,
    S3_BUCKET : process.env.S3_BUCKET,
    S3_ENDPOINT : process.env.S3_ENDPOINT,
    S3_REGION : process.env.S3_REGION
};

console.log(env);
export default env;