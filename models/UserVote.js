const { Schema } = require("mongoose");

const voteSchema = new Schema({
  Username: {
    type: String,
    unique: true
  },
  CreatedAt: {
    type: String
  },
  IsUpVote: {
    type: Boolean
  }
});

module.exports = voteSchema;
