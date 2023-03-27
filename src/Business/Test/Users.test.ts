import { describe, expect, jest, test } from "@jest/globals";
import mongoose from "mongoose";
import { roleEnumTs } from "../../Enums/SchemaEnum";
import env from "../../Utils/Config";
import { options } from "../../Utils/DbSetup";
import UserModel from "../../Graphql/Schema/User";
import {Login, Register} from '../Implement/User.Business';
import validator from "validator";
import UserDto from "../../Graphql/Dtos/UserDto";

const mockUser = {
    Username : "user_test",
    Password : "P@assword123",
    Email : "user@test.com",
    Role : roleEnumTs.user,
};

beforeAll(async() => {
    const testDbOptions = options;
    testDbOptions.dbName = "khong_biet_dic_test";
    await mongoose.connect(env.MONGODB, testDbOptions);
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

describe("User mutation", () => {
    test("User registrt happy case", async () => {
        const createdUser = await Register(mockUser.Username, mockUser.Email, mockUser.Password);
        expect(createdUser.Username as string).toBe(mockUser.Username);
        expect(createdUser.Email as string).toBe(mockUser.Email);
        expect(createdUser.Password as string).not.toBe(mockUser.Password);
        expect(validator.isEmpty(createdUser.Id as string)).toBeFalsy();
    })
})

describe("User query",() => {
    test("User login happy case", async () => {
        const loginUser = await Login(mockUser.Username, mockUser.Password);
        expect(loginUser.Username).toBe(mockUser.Username);
        expect(loginUser.Role).toBe(mockUser.Role);
        expect(validator.isEmpty(loginUser.Id as string)).toBeFalsy();
    });
});

