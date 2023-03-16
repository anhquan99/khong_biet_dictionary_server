export const typeDefs = `#graphql
  type Query {
    findWord: String!
  }
  type Mutation {
    createWord(newWord: String): String
  }
`;