const { Schema } = require("mongoose");
const AllocationType = require("./AllocationType");
const meaningSchema = new Schema({
  meaning: {
    type: String,
    require: true
  },

  Username: {
    type: String,
    require: true
  },
  AllocationType: AllocationType,
  Example: [String],
  CreatedAt: {
    type: String,
    require: true
  },
  Status: {
    type: String,
    require: true,
    enum: {
      values: ["submited", "approve", "reject", "delete"],
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
    ref: "AllocationType"
  }
});

module.exports = meaningSchema;
