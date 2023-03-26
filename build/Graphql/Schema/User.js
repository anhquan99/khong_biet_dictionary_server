"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ErrorMessageEnum_1 = require("../../Enums/ErrorMessageEnum");
const UserValidation_1 = require("../../Validations/UserValidation");
const SchemaEnum_1 = require("../../Enums/SchemaEnum");
const userSchema = new mongoose_1.Schema({
    Username: {
        type: String,
        require: [true, "Username is required"],
        max: [SchemaEnum_1._maxStringLength, (0, ErrorMessageEnum_1.MaxStringLength)("username", SchemaEnum_1._maxStringLength)],
        unique: true,
    },
    Email: {
        type: String,
        require: true,
        max: [SchemaEnum_1._maxStringLength, (0, ErrorMessageEnum_1.MaxStringLength)("email", SchemaEnum_1._maxStringLength)],
        unique: true,
        validate: {
            validator: (email) => {
                return (0, UserValidation_1.ValidateEmail)(email);
            },
            message: (0, ErrorMessageEnum_1.InvalidField)("email address")
        }
    },
    Password: {
        type: String,
        require: [true, "Password is required!"],
        minLength: 7,
        max: [SchemaEnum_1._maxStringLength, (0, ErrorMessageEnum_1.MaxStringLength)("password", SchemaEnum_1._maxStringLength)],
        validate: {
            validator: (password) => {
                return (0, UserValidation_1.ValidatePassword)(password);
            }
        }
    },
    Role: {
        type: String,
        enum: {
            values: SchemaEnum_1.roleEnum,
            message: "{VALUE} not supported!"
        },
        require: true
    },
    Level: {
        type: Number,
        require: false,
        min: 0,
        default: 0
    },
    Exp: {
        type: Number,
        require: false,
        min: 0,
        default: 0
    },
    CreatedAt: {
        type: String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        require: true,
    }
});
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
