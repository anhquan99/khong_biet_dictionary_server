const Word = require("../../models/Word");
const Authentication = require("../../Authentication/Authentication");
module.exports = {
  Query: {
    async findWord(_, { lookupWord }) {
      const result = await Word.findOne({ Characters: lookupWord }).populate(
        "user"
      );
      console.log(result.user);
      return result;
    }
  },
  Mutation: {
    async createWord(_, { Characters }, context) {
      const user = Authentication(context);

      const newWord = new Word({
        Characters: Characters,
        Username: user.Username,
        CreatedAt: new Date().toISOString(),
        NumberOfSearch: 0,
        IsDictionary: true,
        User: user.Id
      });
      if (user.Role === "user") {
        newWord.IsDictionary = false;
      }
      console.log(newWord);
      const word = await newWord.save();
      return word;
    },
    async bookmark(_, { characters }, context) {
      const user = Authentication(context);
      const word = Word.findOne({ Characters: characters });
      word.bookmark.push({
        Username: user.Username,
        CreatedAt: new Date().toISOString()
      });
      const result = await word.save();
      return result;
    }
  }
};
