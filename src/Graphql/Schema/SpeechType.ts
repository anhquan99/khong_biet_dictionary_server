import {model, Schema} from "mongoose";

import { InvalidField, MaxStringLength } from "../../Enums/ErrorMessageEnum";
import StatusSchema from "./Attribute/Status";
import VoteSchema from "./Attribute/Vote";

const _maxStringLength = 500;
const _maxDescriptionLength = 50000;

const SppechTypeSchema = new Schema({
    Name : {
        type : String,
        required : true,
        unique : true,
        maxLength : [_maxStringLength, MaxStringLength('name', _maxStringLength)],
    },
    Description : {
        type : String,
        required : false,
        maxLength : [_maxDescriptionLength, MaxStringLength('description', _maxDescriptionLength)],
    },
    Creator : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    CreatedAt : {
        type : Date,
        required : true
    },
    Status: StatusSchema,
    Votes : [VoteSchema]
});

const SpeechTypeModel = model("SpeechType", SppechTypeSchema);
export default SpeechTypeModel;