const { Schema } = require("mongoose");
const Vote = require("./UserVote");
const Status = require("./Status");
const Report = require("./UserReport");
const meaningSchema = new Schema({
  Meaning: {
    type: String,
    require: true
  },

  Username: {
    type: String,
    require: true
  },
  AllocationType: String,
  Example: [String],
  CreatedAt: {
    type: String,
    require: true
  },
  Status: Status,
  IsDictionary: {
    type: Boolean,
    require: true
  },
  Vote: [Vote],
  Report: [Report],
  User: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  Allocation: {
    type: Schema.Types.ObjectId,
    ref: "allocationTypes"
  }
});

module.exports = meaningSchema;
