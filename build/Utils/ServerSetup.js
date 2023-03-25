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
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const Config_1 = __importDefault(require("./Config"));
const typeDef_1 = __importDefault(require("../Graphql/TypeDef/typeDef"));
const Index_1 = __importDefault(require("../Graphql/Resolvers/Index"));
const DbSetup_1 = __importDefault(require("./DbSetup"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const server = new server_1.ApolloServer({
                typeDefs: typeDef_1.default,
                resolvers: Index_1.default,
                csrfPrevention: true,
                cache: "bounded"
            });
            const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
                listen: { port: +Config_1.default.PORT }
            });
            yield (0, DbSetup_1.default)();
            console.log(`Server is running on ${url}`);
        }
        catch (err) {
            console.log(err);
            return;
        }
    });
}
exports.default = startServer;
