"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserValidation_1 = __importDefault(require("../../Validations/UserValidation"));
const maxStringLength = 500;
const emailFormat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const roleEnum = ["admin", "user"];
const userSchema = new mongoose_1.Schema({
    Username: {
        type: String,
        require: [true, "Username is required"],
        max: [maxStringLength, `The max length of username is ${maxStringLength}`],
        unique: true,
    },
    Email: {
        type: String,
        require: true,
        max: [maxStringLength, `The max length of email is ${maxStringLength}`],
        unique: true,
        validate: {
            validator: (email) => {
                return email.match(emailFormat);
            },
            message: "Invalid email address!"
        }
    },
    Password: {
        type: String,
        require: [true, "Password is required!"],
        validate: {
            validator: (password) => {
                return (0, UserValidation_1.default)(password);
            }
        }
    },
    Role: {
        type: String,
        enum: {
            values: roleEnum,
            message: "{VALUE} not supported!"
        },
        require: true
    },
    Level: {
        type: Number,
        require: false,
    },
    Exp: {
        type: Number,
        require: false
    },
    isDeleted: {
        type: Boolean,
        require: true,
    }
});
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
