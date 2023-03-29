import { describe, expect, jest, test } from "@jest/globals";
import validator from "validator";

import { roleEnumTs } from "../../Enums/SchemaEnum";
import { RegisterAdmin } from "../Implement/User.Admin.Business";

const mockAdmin = {
    Username : "admin",
    Password : "AdminP@assword123",
    Email : "admin@test.com",
    Role : roleEnumTs.user,
};

describe("Admin mutation", () => {
    test("Create admin happy case", async () => {
        const newAdmin = await RegisterAdmin(mockAdmin.Username, mockAdmin.Email, mockAdmin.Password);
        expect(newAdmin.Username as string).toBe(mockAdmin.Username);
        expect(newAdmin.Email as string).toBe(mockAdmin.Email);
        expect(newAdmin.Password as string).not.toBe(mockAdmin.Password);
        expect(validator.isEmpty(newAdmin.Password as string)).toBeFalsy();
        expect(validator.isEmpty(newAdmin.Id as string)).toBeFalsy();
    })
});