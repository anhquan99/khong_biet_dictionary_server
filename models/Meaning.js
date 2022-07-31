const { Schema } = require("mongoose");

const meaningSchema = new Schema({
  Username: {
    type: String,
    require: true
  },
  AllocationType: String,
  Example: [String],
  CreatedDate: {
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
  }
});

module.exports = meaningSchema;
