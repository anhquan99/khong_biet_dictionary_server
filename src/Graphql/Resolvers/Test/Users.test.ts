// import { describe, expect, jest, test } from "@jest/globals";
// import UserModel from "../../Schema/User";
// import Users from '../Users';

// const mockAdminUser = {
//     Id : "01",
//     Username : "user",
//     Password : "P@assword123",
//     Email : "user@test.com",
//     Role : "admin"
// };

// beforeAll(() => {
//     jest.spyOn(UserModel.prototype, "save").mockReturnValue(mockAdminUser as any);
//     jest.spyOn(UserModel, "find").mockReturnValue([mockAdminUser] as any);
// });

// afterAll(() => {
//     jest.restoreAllMocks();
// });

// describe("Query users", () => {
//     test("Find user", async () => {
//         const result = await Users.Query.findUser({context: "context"}, {
//             username : mockAdminUser.Username,
//             email : mockAdminUser.Email,
//             role : mockAdminUser.Role,
//         });
//         expect(result[0].Username).toBe(mockAdminUser.Username);
//         expect(result[0].Email).toBe(mockAdminUser.Email);
//         expect(result[0].Role).toBe(mockAdminUser.Role);
//     }) 
// });

// describe("Mutation users", () => {
//     test("Create user", async () => {
//         const result = await Users.Mutation.createUser({context: "context"}, {
//             username : mockAdminUser.Username,
//             password : mockAdminUser.Password   
//         });
//         expect(result.Username).toBe(mockAdminUser.Username);
//     })
// })