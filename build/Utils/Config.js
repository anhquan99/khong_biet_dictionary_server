"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});
const dbUser = process.env.dbUser || "root";
const dbPassword = process.env.dbPassword || "password";
const enableIndexDb = process.env.NODE_ENV === 'prod';
const env = {
    NODE_ENV: process.env.NODE_ENV || "dev",
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 3000,
    MONGODB: process.env.MONGODB || `mongodb://${dbUser}:${dbPassword}@localhost:27017/?authMechanism=DEFAULT`,
    DATABASE: process.env.Database || "khong_biet_dic",
    SECRET_KEY: process.env.SECRET_KEY || "private key",
    ENABLE_INDEX_DB: enableIndexDb
};
exports.default = env;
