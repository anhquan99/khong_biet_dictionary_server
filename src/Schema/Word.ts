import {model, Schema} from 'mongoose';


const wordSchema = new Schema({
    Characters: {
        type: String,
        require: true,
        validate: {
          validator: (word: string) => {
            return word.match(/^[A-Z]+$/i);
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
      User: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
});
export const WordModel =  model("Word", wordSchema);