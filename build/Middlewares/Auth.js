"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Config_1 = __importDefault(require("../Utils/Config"));
function Authen(context) {
    const token = context.req.headers.authorization;
    if (token) {
        try {
            const userInfo = jsonwebtoken_1.default.verify(token, Config_1.default.SECRET_KEY);
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
    return null;
}
