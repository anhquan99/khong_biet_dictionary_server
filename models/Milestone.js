const { model, Schema } = require("mongoose");

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
  Badge: {
    type: String,
    require: true,
    unique: true
  }
});
milestoneSchema.index({ MinLevel: 1, Title: 1, Badge: 1 }, { unique: true });
module.exports = model("milestones", milestoneSchema);
