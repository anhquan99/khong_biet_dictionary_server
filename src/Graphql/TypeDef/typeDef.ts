const typeDefs = `#graphql
  scalar Date
  type SpeechType{
    Id : String
    Name : String
    Creator : String
    CreatedAt : Date
    Description : String
  }
  type Word{
    Id : String,
    Characters : String,
    CreatedAt : Date,
    NumberOfSearch : Int,
    IsDictionary : Int,
    Creator : String,
    SpeechType : String,
    Votes : [String]
  }
  type Query {
    findWord(keyword: String): [String],
    Login(username : String, password : String) : String,
    SpeechType(speechTypeName : String!) : SpeechType
    SpeechTypes(speechTypeName : String, desciprtion : String, creator : String, createdFrom : Date, createdTo : Date) : [SpeechType]
    Word(wordId : String!) : Word
    Words(characters : String, creator : String, speechTypeId : String, createdFrom : Date, createdTo : Date, numberOfSearchFrom : Int, numberOfSearchTo : Int) : [Word]
  }
  type Mutation {
    createWord(newWord: String): String,
    Register(username : String, password : String, email : String) : String
    SpeechType(name : String!, description : String) : SpeechType
    UpdateSpeechType(name : String!, description : String, createdAt : Date!) : SpeechType,
    DeleteSpeechType(name : String!) : String!
    Word(characters : String, speechTypeId : String) : Word
    UpdateWord(wordId : String!, characters : String, createdAt : Date, numberOfSearch : Int, isDictionary : Boolean, speechType : String) : Word
    DeleteWord(wordId : String!) : String
  }
`;
export default typeDefs;