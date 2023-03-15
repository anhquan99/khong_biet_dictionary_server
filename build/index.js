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
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const mongoose_1 = __importDefault(require("mongoose"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        // const server = new ApolloServer({
        // });
        // await server.start();
        const app = (0, express_1.default)();
        // server.applyMiddleware({app});
        mongoose_1.default.connect(config_1.env.MONGODB).then(() => {
            console.log("MongoDB connected");
            return app.listen(config_1.env.PORT);
        })
            .then(res => {
            console.log(`Server is running on http://${config_1.env.HOST}:${config_1.env.PORT}`);
        })
            .catch(err => {
            console.log(err);
        });
    });
}
startServer();
