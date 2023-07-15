import mongoose from "mongoose";

import env from "../Utils/Config";
import { options } from "../Utils/DbSetup";

beforeAll(async() => {
    const testDbOptions = options;
    testDbOptions.dbName = env.TEST_DATABASE;
    mongoose.set("strictQuery", true);
    await mongoose.connect(env.MONGODB, testDbOptions as any);
});

afterAll(async () => {
    await mongoose.connection.close();
})