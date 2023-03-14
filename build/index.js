"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const app = (0, express_1.default)();
mongoose_1.default.connect(config_1.env.MONGODB, { useNewUrlParser: true })
    .then(() => {
    console.log("MongoDb connected");
})
    .then(() => {
    app.listen(config_1.env.PORT);
    console.log(`Server is running at http://${config_1.env.HOST}:${config_1.env.PORT}`);
})
    .catch(err => {
    console.log(err);
});
