const { model, Schema } = require("mongoose");

const AllocationTypeSchema = new Schema({
  Name: {
    type: String,
    require: true,
    max: [100, "Name max is 100 characters!"]
  }
});

module.exports = AllocationTypeSchema;
