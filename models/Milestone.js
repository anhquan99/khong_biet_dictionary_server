const { Schema } = require("mongoose");

const milestoneSchema = new Schema({
  MinLevel: {
    type: Number,
    require: true
  },
  Title: {
    type: String,
    require: true
  },
  Badge: {
    type: String,
    require: true
  }
});

module.exports = milestoneSchema;
