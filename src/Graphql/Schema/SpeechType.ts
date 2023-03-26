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
    Creator : {
        type : Schema.Types.ObjectId,
        require : true,
        ref : "User"
    },
    CreatedAt : {
        type : String,
        required : true
    }
});

const SpeechTypeModel = model("SpeechType", SppechTypeSchema);
export default SpeechTypeModel;