const { gql } = require("apollo-server");
module.exports = gql`
  type User {
    ID: ID!
    Username: String!
    Email: String!
    Password: String!
    Role: String!
    Level: Int!
  }
  type Milestone {
    MinLevel: Int!
    Title: String!
    Badge: String!
  }
  type Word {
    ID: ID!
    Characters: String!
    UserID: String!
    CreatedDate: String!
    NumberOfSearch: Int!
    IsDictionary: Boolean!
  }
  type Pharse {
    Characters: String!
    Words: [Word]!
  }
  type Meaning {
    ID: ID!
    WordID: ID!
    UserID: ID!
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
    ID: ID!
    Name: String!
  }
  type UserReport {
    ID: ID!
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
  }
  type Mutation {
    createUser(userInput: UserInput): User!
  }
`;
