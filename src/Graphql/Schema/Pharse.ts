import mongoose, { model, Schema } from "mongoose";  
import validator from "validator";

import { InvalidField } from "../../Enums/ErrorMessageEnum";

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
    }]
});

const PharseModel = model("Pharse", PharseSchema);
export default PharseModel;