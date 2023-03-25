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
const mongoose_1 = __importDefault(require("mongoose"));
const Config_1 = __importDefault(require("./Config"));
const options = {
    autoIndex: Config_1.default.ENABLE_INDEX_DB,
    dbName: Config_1.default.DATABASE,
    maxPoolSize: 10
};
function connectDb() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(Config_1.default.MONGODB, options).then(() => {
            console.log("Database connected");
        }).catch((err) => {
            console.log("Database connection error");
            throw err;
        });
    });
}
exports.default = connectDb;
