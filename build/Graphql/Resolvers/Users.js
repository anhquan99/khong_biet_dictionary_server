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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../Schema/User"));
const ErrorMessageEnum_1 = require("../../Enums/ErrorMessageEnum");
const Token_1 = require("../../Middlewares/Token");
const BaseValidation_1 = require("../../Validations/BaseValidation");
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
function Login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        var emptyFieldName = (0, BaseValidation_1.IsNullOrEmptyString)(username) ? "Username" : "";
        emptyFieldName += (0, BaseValidation_1.IsNullOrEmptyString)(password) ? ((0, BaseValidation_1.IsNullOrEmptyString)(emptyFieldName) ? "Password" : " and password") : "";
        if (!(0, BaseValidation_1.IsNullOrEmptyString)(emptyFieldName)) {
            throw new Error((0, ErrorMessageEnum_1.FieldIsEmpty)(emptyFieldName));
        }
        const existedUser = yield User_1.default.findOne({ Username: username });
        if (!existedUser) {
            throw new Error(ErrorMessageEnum_1.UserNotFound);
        }
        const isPasswordMatch = bcryptjs_1.default.compare(password, existedUser.Password);
        if (!isPasswordMatch) {
            throw new Error(ErrorMessageEnum_1.UserNotFound);
        }
        const user = {
            Id: existedUser.Id,
            Username: existedUser.Username,
            Role: existedUser.Role
        };
        var token = (0, Token_1.GenerateToken)(user);
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
        },
        Login(_, { username, password }) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield Login(username, password);
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
