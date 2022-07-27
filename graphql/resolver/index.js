const userResolvers = require("./users");
module.exports = {
  Query: {
    getFood() {
      return "Food";
    }
  },
  Mutation: {
    ...userResolvers.Mutation
  }
};
