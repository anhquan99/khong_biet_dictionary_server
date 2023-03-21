export const typeDefs = `#graphql
  type Query {
    findWord(keyword: String): [String]
  }
  type Mutation {
    createWord(newWord: String): String
  }
`;