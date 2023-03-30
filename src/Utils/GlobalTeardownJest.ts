import mongoose, { connection, mongo } from "mongoose";

import env from "./Config";
import { options } from "./DbSetup";

export default async () => {
    const testDbOptions = options;
    testDbOptions.dbName = env.TEST_DATABASE;
    await mongoose.connect(env.MONGODB, options);
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
}