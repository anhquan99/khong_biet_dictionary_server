"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Config_1 = __importDefault(require("../Utils/Config"));
function GenerateToken(user) {
    return jsonwebtoken_1.default.sign({
        id: user.Id,
        username: user.Username,
        role: user.Role
    }, Config_1.default.SECRET_KEY, { expiresIn: "1h" });
}
exports.GenerateToken = GenerateToken;
