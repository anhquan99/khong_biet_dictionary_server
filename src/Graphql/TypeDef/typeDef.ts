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
  type Pharse{
    Id : String,
    Pharse : String,
    Creator : String,
    CreatedAt : Date,
    Words : [String]
  }
  type Meaning{
    Id : String,
    Meaning : String,
    Creator : String,
    Word : String,
    Example : [String]
    CreatedAt : Date
    Status : String,
    IsSlang : Boolean
  }
  type Vote{
    Voter : String
    CreatedAt : Date
    IsUpVote : Boolean
  }
  type Bookmark{
    Bookmarker : String
    CreatedAt : Date
    Type : String
    Bookmark : String
  }
  type Query {
    Login(username : String, password : String) : String,
    SpeechType(speechTypeName : String!) : SpeechType
    SpeechTypes(speechTypeName : String, desciprtion : String, creator : String, createdFrom : Date, createdTo : Date) : [SpeechType]
    Word(wordId : String!) : Word
    Words(characters : String, creator : String, speechTypeId : String, createdFrom : Date, createdTo : Date, numberOfSearchFrom : Int, numberOfSearchTo : Int) : [Word]
    Pharse(pharseId : String) : Pharse
    Pharses(pharse : String, creator : String, createdFrom : Date, createdTo : Date, words : [String]) : [Pharse]
    Meaning(meaningId : String!) : Meaning
    Meanings(meaning : String, creator : String, words : String, createdFrom : Date, createdTo : Date, status : String, isSlang : Boolean, speechType : String) : [Meaning]
    Bookmark(bookmarkId : String!) : Bookmark
    Bookmarks(objectId : String, bookmarker : String, bookmarkType : String, createdFrom : Date, createdTo : Date) : [Bookmark]
  }
  type Mutation {
    Register(username : String, password : String, email : String) : String
    SpeechType(name : String!, description : String) : SpeechType
    UpdateSpeechType(name : String!, description : String, createdAt : Date!) : SpeechType,
    DeleteSpeechType(name : String!) : String!
    Word(characters : String, speechTypeId : String) : Word
    UpdateWord(wordId : String!, characters : String, createdAt : Date, numberOfSearch : Int, isDictionary : Boolean, speechType : String) : Word
    VoteWord(wordId : String!, isUpVote : Boolean!) : Vote
    DeleteWord(wordId : String!) : String!
    Pharse(pharse : String, words : [String]) : Pharse
    UpdatePharse(pharseId : String!, pharse : String, createdAt : Date, words : [String]) : Pharse
    DeletePharse(pharseId : String!) : String!
    Meaning(meaning : String, word : String, isSlang : Boolean, speechType : String, example : [String]) : Meaning
    UpdateMeaning(meaningId : String!, meaning : String, example : [String], createdAt : Date, status : String, isSlang : Boolean) : Meaning
    DeleteMeaning(meaningId : String!) : String
    Bookmark(objectId : String!, type : String!) : Bookmark
    DeleteBookmark(objectId : String!) : String
  }
`;
export default typeDefs;