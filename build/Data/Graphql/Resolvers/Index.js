"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const Words_1 = require("./Words");
exports.resolvers = {
    Query: Object.assign({}, Words_1.Words.Query),
    Mutation: Object.assign({}, Words_1.Words.Mutation)
};
