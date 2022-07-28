const userResolvers = require("./users");
module.exports = {
  Query: {
    ...userResolvers.Query,
    getFood() {
      return "Food";
    }
  },
  Mutation: {
    ...userResolvers.Mutation
  }
};
