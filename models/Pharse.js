const { Schema } = require("mongoose");

const pharseSchema = new Schema({
  Characters: {
    type: String,
    require: true
  },
  Username: {
    type: String,
    require: true
  },
  CreatedAt: {
    type: String,
    require: true
  },
  NumberOfSearch: {
    type: Number,
    require: true
  },
  Words: [String]
});

module.exports = pharseSchema;
