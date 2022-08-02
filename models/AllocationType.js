const { Schema } = require("mongoose");

const AllocationTypeSchema = new Schema({
  Name: {
    type: String,
    require: true,
    max: [100, "Name max is 100 characters!"]
  },
  Username: {
    type: String,
    require: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  CreatedAt: {
    type: String,
    require: true
  }
});

module.exports = AllocationTypeSchema;
