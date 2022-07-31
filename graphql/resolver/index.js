const userResolvers = require("./users");
const wordResolvers = require("./words");

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...wordResolvers.Query,
    getFood() {
      return "Food";
    }
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...wordResolvers.Mutation
  }
};
