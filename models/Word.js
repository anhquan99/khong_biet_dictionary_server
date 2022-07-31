const { model, Schema } = require("mongoose");

const wordSchema = new Schema({
  Characters: {
    type: String,
    require: true,
    validate: {
      validator: word => {
        return word.match("[^s]+");
      },
      message: "Invalid word"
    },
    unique: true
  },
  UserId: {
    type: String,
    require: true
  },
  CreatedDate: {
    type: String,
    require: true
  },
  NumberOfSearch: {
    type: Number,
    require: true
  },
  IsDictionary: {
    type: Boolean,
    require: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = model("word", wordSchema);
