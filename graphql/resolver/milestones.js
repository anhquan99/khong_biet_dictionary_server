const Milestone = require("../../models/Milestone");
const Authentication = require("../../Authentication/Authentication");
const mongoose = require("mongoose");
const { MongoClient, GridFSBucket } = require("mongodb");
const { finished } = require("stream");
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const { MONGODB, Database } = require("./../../config");

module.exports = {
  Upload: GraphQLUpload,
  Query: {},
  Mutation: {
    async updateMilestone(
      _,
      {
        id,
        milestone: { MinLevel, Title },
        file
      },
      context
    ) {
      const user = Authentication(context);
      var savedMilestone;
      if (id) {
        savedMilestone = await Milestone.findOne({ _id: id });
      }
      if (!savedMilestone) {
        savedMilestone = new Milestone({
          MinLevel: MinLevel,
          Title: Title
        });
      }
      var client = new MongoClient(MONGODB);
      const db = client.db(Database);
      console.log("db connected");
      const bucket = new GridFSBucket(db);
      const { createReadStream, filename, mimetype, encoding } = await file;
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
        });

      savedMilestone.MinLevel = MinLevel;
      savedMilestone.Title = Title;
      savedMilestone.Badge = filename;
      const result = await savedMilestone.save();
      return result;
    }
  }
};
