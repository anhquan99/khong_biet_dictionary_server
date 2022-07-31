const { model, Schema } = require("mongoose");
const meaning = require("./Meaning");

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
  Username: {
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
  Meaning: [meaning],
  Bookmark: [
    {
      UserId: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = model("Word", wordSchema);
