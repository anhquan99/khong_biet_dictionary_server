const { Schema } = require("mongoose");

const meaningSchema = new Schema({
  meaning: {
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
      values: ["submited", "approve", "reject", "delete"],
      message: "{VALUE} is not supported"
    }
  },
  IsDictionary: {
    type: Boolean,
    require: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = meaningSchema;
