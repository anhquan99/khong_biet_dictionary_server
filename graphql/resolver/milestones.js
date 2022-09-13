const Milestone = require("../../models/Milestone");
const Authentication = require("../../Authentication/Authentication");
const mongoose = require("mongoose");
const { MongoClient, GridFSBucket } = require("mongodb");

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
      var savedMilestone = await Milestone.findOne({ _id: id });
      if (!savedMilestone) {
        savedMilestone = new Milestone({
          MinLevel: MinLevel,
          Title: Title,
          Badge: Badge
        });
        const result = await newMilestone.save();
        return result;
      }
      var client = new MongoClient("mongodb://localhost:27017");
      const db = client.db("khong_biet");
      console.log("db connected");
      const bucket = new GridFSBucket(db);
      const { createReadStream, filename, mimetype, encoding } = await Badge;

      const stream = createReadStream();
      console.log(filename, mimetype, encoding);
      stream
        .pipe(
          bucket.openUploadStream(filename, {
            chunkSizeBytes: 1048576,
            metadata: { mimetype: mimetype, encoding: encoding }
          })
        )
        .on("error", err => {
          client.close();
          console.log(err);
        })
        .on("finish", () => {
          client.close();
          console.log("stream is done");
        });

      savedMilestone.MinLevel = MinLevel;
      savedMilestone.Title = Title;
      savedMilestone.Badge = { filename, mimetype, encoding };
      const result = await savedMilestone.save();
      return result;
    }
  }
};
