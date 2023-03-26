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
const User_1 = __importDefault(require("../Schema/User"));
function findUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield User_1.default.find({
            _id: user.Id,
            Username: user.Username,
            Email: user.Email,
            Role: user.Role,
            Level: user.Level,
            Exp: user.Exp
        });
        return result;
    });
}
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = new User_1.default({
            Username: user.Username,
            Email: user.Email,
            Role: user.Role,
            Level: user.Level,
            Exp: user.Exp,
            CreatedAt: new Date().toISOString()
        });
        const result = yield newUser.save();
        return result;
    });
}
const Users = {
    Query: {
        findUser(_, { username, email, role, level, exp }) {
            return __awaiter(this, void 0, void 0, function* () {
                const userDto = {
                    Username: username,
                    Email: email,
                    Role: role,
                    Level: level,
                    Exp: exp
                };
                const result = yield findUser(userDto);
                return result;
            });
        }
    },
    Mutation: {
        createUser(_, { username, password }) {
            return __awaiter(this, void 0, void 0, function* () {
                const userDto = {
                    Username: username,
                    Password: password
                };
                const result = yield createUser(userDto);
                return result;
            });
        }
    }
};
exports.default = Users;
