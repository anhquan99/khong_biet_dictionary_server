"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const User_1 = __importDefault(require("../../Schema/User"));
const Users_1 = __importDefault(require("../Users"));
const mockAdminUser = {
    Id: "01",
    Username: "user",
    Password: "P@assword123",
    Email: "user@test.com",
    Role: "admin"
};
beforeAll(() => {
    globals_1.jest.spyOn(User_1.default.prototype, "save").mockReturnValue(mockAdminUser);
    globals_1.jest.spyOn(User_1.default, "find").mockReturnValue([mockAdminUser]);
});
afterAll(() => {
    globals_1.jest.restoreAllMocks();
});
(0, globals_1.describe)("Query users", () => {
    (0, globals_1.test)("Find user", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield Users_1.default.Query.findUser({ context: "context" }, {
            username: mockAdminUser.Username,
            email: mockAdminUser.Email,
            role: mockAdminUser.Role,
        });
        (0, globals_1.expect)(result[0].Username).toBe(mockAdminUser.Username);
        (0, globals_1.expect)(result[0].Email).toBe(mockAdminUser.Email);
        (0, globals_1.expect)(result[0].Role).toBe(mockAdminUser.Role);
    }));
});
(0, globals_1.describe)("Mutation users", () => {
    (0, globals_1.test)("Create user", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield Users_1.default.Mutation.createUser({ context: "context" }, {
            username: mockAdminUser.Username,
            password: mockAdminUser.Password
        });
        (0, globals_1.expect)(result.Username).toBe(mockAdminUser.Username);
    }));
});
