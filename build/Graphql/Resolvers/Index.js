"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Words_1 = __importDefault(require("./Words"));
const resolvers = {
    Query: Object.assign({}, Words_1.default.Query),
    Mutation: Object.assign({}, Words_1.default.Mutation)
};
exports.default = resolvers;
