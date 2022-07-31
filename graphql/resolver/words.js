const Word = require("../../models/Word");
const Authentication = require("../../Authentication/Authentication");
module.exports = {
  Query: {},
  Mutation: {
    async createWord(_, { Characters }, context) {
      const user = Authentication(context);

      const newWord = new Word({
        Characters: Characters,
        UserId: user.id,
        CreatedDate: new Date().toISOString(),
        NumberOfSearch: 0,
        IsDictionary: true
      });
      console.log(newWord);
      const word = await newWord.save();
      return word;
    }
  }
};
