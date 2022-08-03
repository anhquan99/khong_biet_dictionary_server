const userResolvers = require("./users");
const wordResolvers = require("./words");
const allocationResolvers = require("./allocationTypes");
const meaningResolvers = require("./meaningTypes");
module.exports = {
  Query: {
    ...meaningResolvers.Query,
    ...allocationResolvers.Query,
    ...userResolvers.Query,
    ...wordResolvers.Query,
    getFood() {
      return "Food";
    }
  },
  Mutation: {
    ...meaningResolvers.Mutation,
    ...allocationResolvers.Mutation,
    ...userResolvers.Mutation,
    ...wordResolvers.Mutation
  }
};
