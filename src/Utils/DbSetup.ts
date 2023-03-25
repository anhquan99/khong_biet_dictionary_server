import mongoose from "mongoose";

import env from './Config'

const options = {
    autoIndex: env.ENABLE_INDEX_DB, 
    dbName: env.DATABASE,
    maxPoolSize: 10
};

async function connectDb() : Promise<void>
{
    await mongoose.connect(env.MONGODB, options).then(() => {
        console.log("Database connected");
    }).catch((err) => {
        console.log("Database connection error");
        throw err;
    });
}
export default connectDb;