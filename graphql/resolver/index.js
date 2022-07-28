const userAccountResolvers = require("./userAccount");
const adminWordResolvers = require("./adminWords");
module.exports = {
  Query: {
    ...userAccountResolvers.Query,
    ...adminWordResolvers.Query,
    getFood() {
      return "Food";
    }
  },
  Mutation: {
    ...adminWordResolvers.Mutation,
    ...userAccountResolvers.Mutation
  }
};
