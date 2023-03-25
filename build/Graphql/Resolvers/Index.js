"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Words_1 = require("./Words");
const resolvers = {
    Query: Object.assign({}, Words_1.Words.Query),
    Mutation: Object.assign({}, Words_1.Words.Mutation)
};
exports.default = resolvers;
