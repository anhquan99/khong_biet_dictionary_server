"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
exports.schema = (0, graphql_1.buildSchema)(`
    type Query{
        findWord: String
    },
    type Mutation{
        createWord: String
    }
`);
