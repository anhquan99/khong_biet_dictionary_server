const userResolvers = require("./users");
const wordResolvers = require("./words");
const allocationResolvers = require("./allocationTypes");
const meaningResolvers = require("./meaningTypes");
const milestoneResolvers = require("./milestones");
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");

module.exports = {
  Upload: GraphQLUpload,
  Query: {
    ...milestoneResolvers.Query,
    ...meaningResolvers.Query,
    ...allocationResolvers.Query,
    ...userResolvers.Query,
    ...wordResolvers.Query,
    getFood() {
      return "Food";
    }
  },
  Mutation: {
    ...milestoneResolvers.Mutation,
    ...meaningResolvers.Mutation,
    ...allocationResolvers.Mutation,
    ...userResolvers.Mutation,
    ...wordResolvers.Mutation
  }
};
