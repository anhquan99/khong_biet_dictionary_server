const { Schema } = require("mongoose");

const reportSchema = new Schema({
  Username: {
    type: String,
    require: true
  },
  CreatedAt: {
    type: String,
    require: true
  },
  Title: {
    type: String,
    require: true
  },
  Description: {
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
  }
});

module.exports = reportSchema;
