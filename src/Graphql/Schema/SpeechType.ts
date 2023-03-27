import {model, Schema} from "mongoose";
import { MaxStringLength } from "../../Enums/ErrorMessageEnum";

const _maxStringLength = 100

const SppechTypeSchema = new Schema({
    Name : {
        type : String,
        require : true,
        unique : true,
        max : [100, MaxStringLength('name', _maxStringLength)]
    },
    Description : {
        type : String,
        required : false,
    },
    Creator : {
        type : Schema.Types.ObjectId,
        require : true,
        ref : "User"
    },
    CreatedAt : {
        type : Date,
        required : true
    }
});

const SpeechTypeModel = model("SpeechType", SppechTypeSchema);
export default SpeechTypeModel;