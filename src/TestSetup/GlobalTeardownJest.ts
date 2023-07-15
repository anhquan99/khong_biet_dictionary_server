import mongoose, { connection, mongo } from "mongoose";

import env from "../Utils/Config";
import { options } from "../Utils/DbSetup";

export default async () => {
    const testDbOptions = options;
    testDbOptions.dbName = env.TEST_DATABASE;
    await mongoose.connect(env.MONGODB, options as any);
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
}