"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs = `#graphql
  type Query {
    findWord(keyword: String): [String]
  }
  type Mutation {
    createWord(newWord: String): String
  }
`;
exports.default = typeDefs;
