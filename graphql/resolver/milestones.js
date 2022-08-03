const Milestone = require("../../models/Milestone");
const Authentication = require("../../Authentication/Authentication");
const mongoose = require("mongoose");

module.exports = {
  Query: {},
  Mutation: {
    async updateMilestone(
      _,
      {
        id,
        milestone: { MinLevel, Title, Badge }
      },
      context
    ) {
      const user = Authentication(context);
      const savedMilestone = await Milestone.findOne({ _id: id });
      if (savedMilestone) {
        savedMilestone.MinLevel = MinLevel;
        savedMilestone.Title = Title;
        savedMilestone.Badge = Badge;
        const result = await savedMilestone.save();
        return result;
      } else {
        const newMilestone = new Milestone({
          MinLevel: MinLevel,
          Title: Title,
          Badge: Badge
        });
        const result = await newMilestone.save();
        return result;
      }
    }
  }
};
