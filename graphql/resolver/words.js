const Word = require("../../models/Word");
const Authentication = require("../../Authentication/Authentication");
module.exports = {
  Query: {
    async findWord(_, lookupWord) {
      const result = await Word.findOne(lookupWord);
      console.log(result);
      return result;
    }
  },
  Mutation: {
    async createWord(_, { Characters }, context) {
      const user = Authentication(context);

      const newWord = new Word({
        Characters: Characters,
        Username: user.Username,
        CreatedDate: new Date().toISOString(),
        NumberOfSearch: 0,
        IsDictionary: true
      });
      if (user.Role === "user") {
        newWord.IsDictionary = false;
      }
      console.log(newWord);
      const word = await newWord.save();
      return word;
    }
  }
};
