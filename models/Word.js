const { model, Schema } = require("mongoose");

const wordSchema = new Schema({
  Characters: String,
  UserId: String,
  CreatedDate: String,
  NumberOfSearch: Number,
  IsDictionary: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = model("Post", wordSchema);
