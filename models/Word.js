const { model, Schema } = require("mongoose");
const meaning = require("./Meaning");
const Vote = require("./UserVote");
const Bookmark = require("./Bookmark");
const wordSchema = new Schema({
  Characters: {
    type: String,
    require: true,
    validate: {
      validator: word => {
        return word.match(/^[A-Z]+$/i);
      },
      message: "Invalid word"
    },
    unique: true
  },
  Username: {
    type: String,
    require: true
  },
  CreatedAt: {
    type: String,
    require: true
  },
  NumberOfSearch: {
    type: Number,
    require: true
  },
  IsDictionary: {
    type: Boolean,
    require: true
  },
  Meaning: [meaning],
  Bookmark: [Bookmark],
  User: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  Vote: [Vote]
});

module.exports = model("Word", wordSchema);
