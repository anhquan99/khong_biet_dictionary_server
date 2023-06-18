import { describe, expect, jest, test } from "@jest/globals";
import { roleEnumTs } from "../../Enums/SchemaEnum";
import UserModel from "../../Graphql/Schema/User";
import {Login, Register} from '../Implement/Users.Business';
import validator from "validator";
import UserDto from "../../Graphql/Dtos/User.Dto";

const mockUser = {
    Username : "user_test",
    Password : "P@assword123",
    Email : "user@test.com",
    Role : roleEnumTs.user,
};

describe("User mutation", () => {
    test("User register happy case", async () => {
        const newUser = await Register(mockUser.Username, mockUser.Email, mockUser.Password);
        expect(newUser.Username as string).toBe(mockUser.Username);
        expect(newUser.Email as string).toBe(mockUser.Email);
        expect(newUser.Password as string).not.toBe(mockUser.Password);
        expect(validator.isEmpty(newUser.Id as string)).toBeFalsy();
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

