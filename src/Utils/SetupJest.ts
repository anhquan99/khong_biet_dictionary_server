import mongoose from "mongoose";

import env from "./Config";
import { options } from "./DbSetup";

beforeAll(async() => {
    const testDbOptions = options;
    testDbOptions.dbName = env.TEST_DATABASE;
    mongoose.set("strictQuery", true);
    await mongoose.connect(env.MONGODB, testDbOptions);
});

afterAll(async () => {
    await mongoose.connection.close();
})