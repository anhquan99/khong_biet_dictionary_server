const { gql } = require("apollo-server");
module.exports = gql`
  type User {
    Id: ID!
    Username: String!
    Email: String!
    Password: String!
    Role: String!
    Level: Int!
    token: String!
  }
  type Milestone {
    MinLevel: Int!
    Title: String!
    Badge: String!
  }
  type Word {
    Id: ID!
    Characters: String!
    Username: String!
    CreatedDate: String!
    NumberOfSearch: Int!
    IsDictionary: Boolean!
  }
  type Pharse {
    Characters: String!
    Words: [Word]!
  }
  type Meaning {
    Id: ID!
    Word: ID!
    Username: ID!
    Meaning: String!
    AllocationType: ID!
    Example: [String]
    CreatedDate: String!
    Status: Int!
    IsDictionary: Boolean!
  }
  type BookMark {
    UserID: ID!
    WordID: ID!
  }
  type AllocationType {
    Id: ID!
    Name: String!
  }
  type UserReport {
    Id: ID!
    UserID: ID!
    Description: String!
    IsValid: Boolean
  }
  type UserVote {
    UserID: ID!
    IsWord: Boolean!
    EntityVoteID: ID!
    IsUpVote: Boolean
  }
  input UserInput {
    Username: String!
    Email: String!
    Password: String!
    Role: String!
  }
  type Query {
    getFood: String
    login(Username: String!, Password: String!): User!
    findWord(lookupWord: String!): Word!
  }
  type Mutation {
    register(userInput: UserInput!): User!
    createWord(Characters: String!): Word!
  }
`;
