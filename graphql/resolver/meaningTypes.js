const Word = require("../../models/Word");
const AllocationTypeModel = require("../../models/AllocationType");
const Authentication = require("../../Authentication/Authentication");
const mongoose = require("mongoose");
module.exports = {
  Query: {},
  Mutation: {
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
        var wordMeaning = savedWord.Meaning.find(x => x._id.toString() === id);
        if (wordMeaning) {
          wordMeaning.meaning = Meaning;
          wordMeaning.AllocationType = AllocationType;
          wordMeaning.Status = Status;
          wordMeaning.Example = Example;
          wordMeaning.IsDictionary = IsDictionary;
        } else {
          savedWord.Meaning.push({
            Meaning: Meaning,
            Username: user.username,
            AllocationType: AllocationType,
            CreatedAt: new Date().toISOString(),
            Status: Status,
            Example: Example,
            IsDictionary: IsDictionary,
            User: mongoose.Types.ObjectId(user.Id),
            Allocation: mongoose.Types.ObjectId(allocationType._Id)
          });
        }

        await savedWord.save();
        return savedWord;
      }
      throw new Error("Word not found!");
    },
    async voteMeaning(_, { id, Vote }, context) {
      const user = Authentication(context);
      const word = await Word.findOne({ "Meaning._id": id });
      const meaning = word.Meaning.find(x => x._id.toString() === id);
      if (meaning) {
        const votedUser = meaning.Vote.find(
          vote => vote.Username === user.username
        );
        if (votedUser) {
          if (votedUser.IsUpVote === Vote) {
            meaning.Vote = meaning.Vote.filter(
              vote => vote.Username !== user.username
            );
          } else {
            votedUser.IsUpVote = Vote;
          }
        } else {
          meaning.Vote.push({
            Username: user.username,
            CreatedAt: new Date().toISOString(),
            IsUpVote: Vote
          });
        }
        await word.save();
        return word;
      }
      throw new Error("Meaning not found!");
    },
    async reportMeaning(
      _,
      {
        id,
        report: { Title, Description, Status }
      },
      context
    ) {
      const user = Authentication(context);
      const word = await Word.findOne({ "Meaning._id": id });
      const meaning = word.Meaning.find(x => x._id.toString() === id);
      if (meaning) {
        meaning.Report.push({
          Username: user.username,
          CreatedAt: new Date().toISOString(),
          Title: Title,
          Description: Description,
          Status: Status
        });
        await word.save();
        return word;
      }
      throw new Error("Meaning not found!");
    }
  }
};
