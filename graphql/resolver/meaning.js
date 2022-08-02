const Meaning = require("../../models/Meaning");
const Authentication = require("../../Authentication/Authentication");
const AllocationType = require("../../models/AllocationType");
const mongoose = require("mongoose");
module.exports = {
  Query: {},
  Mutation: {
    async updateMeaning(
      _,
      {
        meaning: { id, meaning, allocationType, status, isDictionary }
      },
      context
    ) {
      const user = Authentication(context);
      const data = Meaning.findOne({ _id: id });
      if (data) {
        data.meaning = meaning;
        data.allocationType.Name = allocationType;
        data.status = status;
        data.isDictionary = isDictionary;
        const result = await data.save();
        return result;
      } else {
        const Allocation = AllocationType.findOne({ Name: allocationType });
        const newMeaning = new Meaning({
          meaning: meaning,
          Username: user.username,
          AllocationType: Allocation,
          Status: status,
          IsDictionary: isDictionary,
          User: mongoose.Types.ObjectId(user.id),
          Allocation: mongoose.Types.ObjectId(Allocation._id)
        });
        const result = await newMeaning.save();
        return result;
      }
    }
  }
};
