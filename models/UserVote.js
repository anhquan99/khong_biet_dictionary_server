const { Schema } = require("mongoose");

const voteSchema = new Schema({
  Username: {
    type: String,
    require: true
  },
  CreatedAt: {
    type: String,
    require: true
  },
  IsUpVote: {
    type: Boolean,
    require: true
  }
});

module.exports = voteSchema;
