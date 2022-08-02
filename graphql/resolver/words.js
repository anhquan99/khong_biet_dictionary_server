const Word = require("../../models/Word");
const AllocationTypeModel = require("../../models/AllocationType");
const Authentication = require("../../Authentication/Authentication");
const mongoose = require("mongoose");
module.exports = {
  Query: {
    async findWord(_, { lookupWord }) {
      const result = await Word.findOne({ Characters: lookupWord }).populate(
        "User"
      );
      return result;
    }
  },
  Mutation: {
    async createWord(_, { Characters }, context) {
      const user = Authentication(context);
      const newWord = new Word({
        Characters: Characters,
        Username: user.username,
        CreatedAt: new Date().toISOString(),
        NumberOfSearch: 0,
        IsDictionary: true,
        User: mongoose.Types.ObjectId(user.Id)
      });
      if (user.Role === "user") {
        newWord.IsDictionary = false;
      }
      const word = await newWord.save();
      return word;
    },
    async bookmark(_, { Characters }, context) {
      const user = Authentication(context);
      const word = await Word.findOne({
        Characters: Characters
      });
      if (word) {
        const bookmarkedUser = word.Bookmark.find(
          bookmark => bookmark.Username === user.username
        );
        if (bookmarkedUser) {
          word.Bookmark = word.Bookmark.filter(
            bookmark => bookmark.Username !== user.username
          );
        } else {
          word.Bookmark.push({
            Username: user.username,
            CreatedAt: new Date().toISOString()
          });
        }
        await word.save();
        return word;
      }
      throw new Error("Word not found!");
    },
    async vote(_, { Characters, Vote }, context) {
      const user = Authentication(context);
      const word = await Word.findOne({
        Characters: Characters
      });
      if (word) {
        const votedUser = word.Vote.find(
          vote => vote.Username === user.username
        );
        if (votedUser) {
          if (votedUser.IsUpVote === Vote) {
            word.Vote = word.Vote.filter(
              vote => vote.Username !== user.username
            );
          } else {
            votedUser.IsUpVote = Vote;
          }
        } else {
          word.Vote.push({
            Username: user.username,
            CreatedAt: new Date().toISOString(),
            IsUpVote: Vote
          });
        }
        await word.save();
        return word;
      }
      throw new Error("Word not found!");
    },
    async updateMeaning(
      _,
      {
        id,
        word,
        meaning: { Meaning, AllocationType, Example, Status, IsDictionary }
      },
      context
    ) {
      const user = Authentication(context);
      const savedWord = await Word.findOne({
        Characters: word
      });
      const allocationType = await AllocationTypeModel.findOne({
        Name: AllocationType
      });
      if (savedWord !== null && allocationType !== null) {
        // var wordMeaning = word.Meaning.find(x => x._id === meaning.id);
        // if (wordMeaning) {
        //   wordMeaning.meaning = Meaning;
        //   wordMeaning.AllocationType = AllocationType;
        //   wordMeaning.Status = Status;
        //   wordMeaning.Example = Example
        //   wordMeaning.IsDictionary = IsDictionary;
        // }
        savedWord.Meaning.push({
          Meaning: Meaning,
          Username: user.username,
          AllocationType: AllocationType,
          CreatedAt: new Date().toISOString(),
          Status: Status,
          IsDictionary: IsDictionary,
          User: mongoose.Types.ObjectId(user.Id),
          Allocation: mongoose.Types.ObjectId(allocationType._Id)
        });
        await savedWord.save();
        return savedWord;
      }
      throw new Error("Word not found!");
    }
  }
};
