const { model, Schema } = require("mongoose");

const fileSchema = new Schema({
  filename: {
    type: String,
    require: true,
    unique: true
  },
  mimetype: {
    type: String,
    require: true
  },
  encoding: {
    type: String,
    require: true
  }
});
const milestoneSchema = new Schema({
  MinLevel: {
    type: Number,
    require: true,
    unique: true
  },
  Title: {
    type: String,
    require: true,
    unique: true
  },
  File: fileSchema
});
milestoneSchema.index({ MinLevel: 1, Title: 1 }, { unique: true });
module.exports = model("milestones", milestoneSchema);
