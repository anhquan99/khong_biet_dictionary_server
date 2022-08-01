const { model, Schema } = require("mongoose");
const meaning = require("./Meaning");

const wordSchema = new Schema({
  Characters: {
    type: String,
    require: true,
    validate: {
      validator: word => {
        return word.match("ApL+z");
      },
      message: "Invalid word"
    },
    unique: true
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
  IsDictionary: {
    type: Boolean,
    require: true
  },
  Meaning: [meaning],
  Bookmark: [
    {
      Username: String,
      CreatedAt: String
    }
  ],
  User: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = model("Word", wordSchema);
