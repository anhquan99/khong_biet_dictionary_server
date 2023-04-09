import {model, Schema} from "mongoose";
import validator from "validator";

import { InvalidField, MaxStringLength } from "../../Enums/ErrorMessageEnum";
import StatusSchema from "./Attribute/Status";

const _maxStringLength = 100

const SppechTypeSchema = new Schema({
    Name : {
        type : String,
        required : true,
        unique : true,
        maxLength : [_maxStringLength, MaxStringLength('name', _maxStringLength)],
        validate : {
            validator : (Name : string) => {
                return validator.isAscii(Name);
            },
            message : InvalidField("name")
        }
    },
    Description : {
        type : String,
        required : false,
        validate : {
            validator : (Description : string) => {
                return validator.isAscii(Description);
            },
            message : InvalidField("description")
        }
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
    Status: StatusSchema
});

const SpeechTypeModel = model("SpeechType", SppechTypeSchema);
export default SpeechTypeModel;