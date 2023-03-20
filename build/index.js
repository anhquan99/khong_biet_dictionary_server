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
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const config_1 = require("./config");
const Index_1 = require("./Data/Graphql/Resolvers/Index");
const typeDef_1 = require("./Data/Graphql/typeDef");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new server_1.ApolloServer({
            typeDefs: typeDef_1.typeDefs,
            resolvers: Index_1.resolvers,
            csrfPrevention: true,
            cache: "bounded"
        });
        const { url } = yield (0, standalone_1.startStandaloneServer)(server, { listen: { port: config_1.env.PORT } });
        console.log(`Server is running on ${url}`);
    });
}
startServer();
