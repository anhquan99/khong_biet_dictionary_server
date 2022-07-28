const Word = require("../../models/Word");

module.exports = {
  Query: {
    async getAllWords() {
      return "some words";
    }
  },
  Mutation: {
    async createWord() {
      return "word";
    }
  }
};
