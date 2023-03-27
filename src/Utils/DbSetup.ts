import mongoose, { mongo } from "mongoose";

import env from './Config'

export const options = {
    autoIndex: env.ENABLE_INDEX_DB, 
    dbName: env.DATABASE,
    maxPoolSize: 10
};

async function connectDb() : Promise<void>
{
    mongoose.set('strictQuery', true);
    await mongoose.connect(env.MONGODB, options).then(() => {
        console.log("Database connected");
    }).catch((err) => {
        console.log("Database connection error");
        throw err;
    });
}
export default connectDb;