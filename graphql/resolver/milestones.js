const Milestone = require("../../models/Milestone");
const Authentication = require("../../Authentication/Authentication");
const { MongoClient, GridFSBucket } = require("mongodb");
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const { MONGODB, Database } = require("./../../config");

module.exports = {
  Upload: GraphQLUpload,
  Query: {
    async getAllMilestone(_, context) {
      const user = Authentication(context);
      return await Milestone.find();
    }
  },
  Mutation: {
    async addMilestone(
      _,
      {
        milestone: { MinLevel, Title },
        file
      },
      context
    ) {
      const user = Authentication(context);
      var savedMilestone = new Milestone({
        MinLevel: MinLevel,
        Title: Title,
        File: {}
      });

      // save file to db
      var client = new MongoClient(MONGODB);
      const db = client.db(Database);
      const bucket = new GridFSBucket(db);
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      let result;

      savedMilestone.MinLevel = MinLevel;
      savedMilestone.Title = Title;
      savedMilestone.File = { filename, mimetype, encoding };

      result = await savedMilestone.save();

      stream
        .pipe(
          bucket.openUploadStream(filename, {
            chunkSizeBytes: 1048576,
            metadata: { mimetype: mimetype, encoding: encoding }
          })
        )
        .on("error", err => {
          client.close();
          savedMilestone.delete();
          throw err;
        })
        .on("finish", () => {
          client.close();
        });

      return result;
    },
    async updateMilestone(
      _,
      {
        minLv,
        milestone: { MinLevel, Title },
        file
      },
      context
    ) {
      const user = Authentication(context);
      var savedMilestone = await Milestone.findOne({ MinLevel: MinLevel });

      var client = new MongoClient(MONGODB);
      const db = client.db(Database);
      const bucket = new GridFSBucket(db);
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();

      // if save file fail this will backup the old one
      var backupMilestone = { ...savedMilestone };

      savedMilestone.Title = Title;
      savedMilestone.File.filename = filename;
      savedMilestone.File.mimetype = mimetype;
      savedMilestone.File.encoding = encoding;

      let result = await savedMilestone.save();

      stream
        .pipe(
          bucket.openUploadStream(filename, {
            chunkSizeBytes: 1048576,
            metadata: { mimetype: mimetype, encoding: encoding }
          })
        )
        .on("error", err => {
          client.close();
          savedMilestone = backupMilestone;
          savedMilestone.save();
          throw err;
        })
        .on("finish", () => {
          if (!client) {
            client = new MongoClient(MONGODB);
            db = client.db(Database);
            const cursor = bucket.find({
              filename: savedMilestone.File.filename
            });
            cursor.forEach(doc => {
              bucket.delete(doc._id);
            });
          }
          client.close();
        });
      return result;
    }
  }
};
