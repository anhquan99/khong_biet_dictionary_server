const typeDefs = `#graphql
  scalar Date
  type SpeechType{
    Name : String
    Creator : String
    CreatedAt : Date
    Description : String
  }
  type Query {
    findWord(keyword: String): [String],
    Login(username : String, password : String) : String,
    SpeechType(speechTypeName : String!) : SpeechType
    SpeechTypes(speechTypeName : String, desciprtion : String, creator : String, createdFrom : Date, createdTo : Date) : [SpeechType]
  }
  type Mutation {
    createWord(newWord: String): String,
    Register(username : String, password : String, email : String) : String
    SpeechType(name : String!, description : String) : SpeechType
    UpdateSpeechType(name : String!, description : String, createdAt : Date!) : SpeechType,
    DeleteSpeechType(name : String!) : String!
  }
`;
export default typeDefs;