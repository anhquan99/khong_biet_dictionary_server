"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
  type Query {
    findWord: String!
  }
  type Mutation {
    createWord(newWord: String): String
  }
`;
