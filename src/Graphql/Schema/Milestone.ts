import mongoose, {model, Schema} from 'mongoose'
import validator from 'validator';
import { InvalidField, MaxStringLength } from '../../Enums/ErrorMessageEnum';

const _maxStringLength = 100;

const MilestoneSchema = new Schema({
    Title : {
        type : String,
        require : true,
        unique : true,
        maxLength : [_maxStringLength, MaxStringLength("tile", _maxStringLength)],
        validate : {
            validator : (Title : string) => {
                return validator.isAscii(Title);
            },
            message : InvalidField("title")
        }
    },
    MinLevel : {
        type : Number,
        require : true,
        unique : true,
        min : 0
    },
    FileName : {
        type : String,
        require : true
    },
    Creator : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        require : true
    },
    Description : {
        type : String,
        require : false,
        validator : {
            validator : (Description : string) => {
                return validator.isAscii(Description);
            },
            message : InvalidField("description")
        }
    },
    CreatedAt : {
        type : Date,
        require : true
    }
})

const MilestoneModel = model("Milestone", MilestoneSchema);
export default MilestoneModel;