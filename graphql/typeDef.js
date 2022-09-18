const { gql } = require("apollo-server");

module.exports = gql`
  scalar Upload
  scalar MilestoneFile
  type User {
    Id: ID!
    Username: String!
    Email: String!
    Password: String!
    Role: String!
    Level: Int!
    token: String!
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Milestone {
    MinLevel: Int!
    Title: String!
    File: File
  }
  type Word {
    Id: ID!
    Characters: String!
    Username: String!
    CreatedAt: String!
    NumberOfSearch: Int!
    IsDictionary: Boolean!
  }
  type Pharse {
    Characters: String!
    Words: [Word]!
  }
  input Meaning {
    Meaning: String!
    AllocationType: String!
    Example: [String]
    Status: String!
    IsDictionary: Boolean!
  }
  type BookMark {
    UserID: ID!
    WordID: ID!
  }
  type AllocationType {
    Name: String!
  }
  input UserReport {
    Title: String!
    Description: String!
    Status: String!
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
  input MeaningInput {
    id: String
    meaning: String!
    allocationType: String!
    status: String!
    isDictionary: Boolean!
  }
  input milestoneInput {
    MinLevel: Int!
    Title: String!
  }
  type Query {
    getFood: String
    login(Username: String!, Password: String!): User!
    findWord(lookupWord: String!): Word!
    getSingleMilestone(Name: String!): MilestoneFile
    getAllMilestone: [Milestone]
  }
  type Mutation {
    register(userInput: UserInput!): User!
    createWord(Characters: String!): Word!
    bookmark(Characters: String!): Word!
    voteWord(Characters: String!, Vote: Boolean!): Word!
    updateAllocationType(id: String, allocation: String!): AllocationType!
    updateMeaning(id: String, word: String!, meaning: Meaning!): Word!
    voteMeaning(id: String!, Vote: Boolean!): Word!
    reportMeaning(id: String!, report: UserReport!): Word!
    reportWord(Characters: String!, report: UserReport!): Word!
    addMilestone(milestone: milestoneInput!, file: Upload!): Milestone
    updateMilestone(
      id: String
      milestone: milestoneInput!
      file: Upload!
    ): Milestone!
  }
`;
