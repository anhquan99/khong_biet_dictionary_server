import {model, Schema} from "mongoose";
import CommentSchema from "./Attribute/Comment";
import StatusSchema from "./Attribute/Status";
import VoteSchema from "./Attribute/Vote";

const MeaningSchema = new Schema({
    Meaning : {
        type : String,
        require : true
    },
    Creator : {
        type : Schema.Types.ObjectId,
        require: true,
        ref : "User"
    },
    Word : {
        type : Schema.Types.ObjectId,
        require: true,
        ref : "Word"
    },
    Example : {
        type : [String],
        require : false
    },
    CreatedAt : {
        type : String,
        require : true
    },
    Status : StatusSchema,
    IsSlang : {
        type : Boolean,
        require : true
    },
    Votes : [VoteSchema],
    Comments : [CommentSchema],
    SpeechType : {
        type : Schema.Types.ObjectId,
        ref : "SpeechType",
        require : false
    }
});

const MeaningModel = model("Meaning", MeaningSchema);
export default MeaningModel;