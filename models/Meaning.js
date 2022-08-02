const { Schema } = require("mongoose");
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
  Status: {
    type: String,
    require: true,
    enum: {
      values: ["submitted", "approve", "reject", "delete"],
      message: "{VALUE} is not supported"
    }
  },
  IsDictionary: {
    type: Boolean,
    require: true
  },
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
