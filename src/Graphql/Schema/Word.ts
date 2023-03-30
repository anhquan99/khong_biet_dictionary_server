import {model, Schema} from 'mongoose';
import validator from 'validator';
import { InvalidField } from '../../Enums/ErrorMessageEnum';

import VoteSchema from './Attribute/Vote';
import SpeechTypeModel from './SpeechType';

const entity = "word";

const wordSchema = new Schema({
  Characters: {
    type: String,
    require: true,
    validate: {
      validator: (word: string) => {
        return validator.isAscii(word);
      },
      message: InvalidField(entity)
    },
    unique: true
  },
  CreatedAt: {
    type: Date,
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
  Creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  SpeechType : {
    type : Schema.Types.ObjectId,
    ref : "SpeechType"
  },
  Votes : [VoteSchema],
});
const WordModel =  model("Word", wordSchema);
export default WordModel;