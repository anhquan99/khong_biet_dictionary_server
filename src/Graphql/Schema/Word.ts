import {model, Schema} from 'mongoose';
import SpeechTypeModel from './SpeechType';


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
    },
    SpeechType : {
      type : Schema.Types.ObjectId,
      ref : "SpeechType"
    }
});
const WordModel =  model("Word", wordSchema);
export default WordModel;