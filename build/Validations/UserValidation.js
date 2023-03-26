"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateEmail = exports.ValidatePassword = void 0;
const validator_1 = __importDefault(require("validator"));
const passwordFormat = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
function ValidatePassword(password) {
    if (!password.match(passwordFormat))
        return false;
    return true;
}
exports.ValidatePassword = ValidatePassword;
function ValidateEmail(email) {
    return validator_1.default.isEmail(email);
}
exports.ValidateEmail = ValidateEmail;
