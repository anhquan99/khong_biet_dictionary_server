const { Schema } = require("mongoose");
const Status = require("./Status");
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
  Status: Status
});

module.exports = reportSchema;
