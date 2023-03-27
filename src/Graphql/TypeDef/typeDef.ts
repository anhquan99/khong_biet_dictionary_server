const typeDefs = `#graphql
  type Query {
    findWord(keyword: String): [String],
    Login(username : String, password : String) : String
  }
  type Mutation {
    createWord(newWord: String): String,
    Register(username : String, password : String, email : String) : String
  }
`;
export default typeDefs;