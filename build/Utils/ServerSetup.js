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
const server_1 = require("@apollo/server");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const express4_1 = require("@apollo/server/express4");
const Config_1 = __importDefault(require("./Config"));
const typeDef_1 = __importDefault(require("../Graphql/TypeDef/typeDef"));
const Index_1 = __importDefault(require("../Graphql/Resolvers/Index"));
const DbSetup_1 = __importDefault(require("./DbSetup"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const app = (0, express_1.default)();
            const httpServer = http_1.default.createServer(app);
            const server = new server_1.ApolloServer({
                typeDefs: typeDef_1.default,
                resolvers: Index_1.default,
                csrfPrevention: true,
                cache: "bounded",
                plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })]
            });
            yield server.start();
            app.use('/', (0, cors_1.default)(), body_parser_1.default.json({ limit: '50mb' }), (0, express4_1.expressMiddleware)(server, {
                context: ({ req }) => __awaiter(this, void 0, void 0, function* () { return ({ req }); })
            }));
            yield (0, DbSetup_1.default)();
            yield new Promise((resolve) => httpServer.listen({ port: Config_1.default.PORT }, resolve));
            console.log(`Server is running on http://${Config_1.default.HOST}:${Config_1.default.PORT}`);
        }
        catch (err) {
            console.log(err);
            return;
        }
    });
}
exports.default = startServer;