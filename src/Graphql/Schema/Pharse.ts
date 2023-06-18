import mongoose, { model, Schema } from "mongoose";  
import validator from "validator";

import { InvalidField } from "../../Enums/ErrorMessageEnum";
import StatusSchema from "./Attribute/Status";
import VoteSchema from "./Attribute/Vote";

const entity = "pharse";

const PharseSchema = new Schema({
    Pharse : {
        type : String,
        require : true,
        validate : {
            validator : (pharse : string) => {
                return validator.isAscii(pharse);
            },
            message : InvalidField(entity)
        }
    },
    Creator : {
        type : Schema.Types.ObjectId,
        require : true,
        ref : "User"
    },
    CreatedAt : {
        type : Date,
        require : true
    },
    Words : [{
        type : mongoose.Types.ObjectId,
        require : true,
        ref : "Word"
    }],
    Status : StatusSchema,
    Votes : [VoteSchema]
});

const PharseModel = model("Pharse", PharseSchema);
export default PharseModel;