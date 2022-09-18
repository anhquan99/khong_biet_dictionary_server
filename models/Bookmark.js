const { Schema } = require("mongoose");

const bookmark = new Schema({
  Username: {
    type: String,
    unique: true
  },
  CreatedAt: {
    type: String
  }
});
module.exports = bookmark;
