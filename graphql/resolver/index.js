const userResolvers = require("./users");
const wordResolvers = require("./words");
const allocationResolvers = require("./allocationTypes");
module.exports = {
  Query: {
    ...allocationResolvers.Query,
    ...userResolvers.Query,
    ...wordResolvers.Query,
    getFood() {
      return "Food";
    }
  },
  Mutation: {
    ...allocationResolvers.Mutation,
    ...userResolvers.Mutation,
    ...wordResolvers.Mutation
  }
};
