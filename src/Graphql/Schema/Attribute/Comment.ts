import { Schema, model } from "mongoose";

const CommentSchema = {
    Comment : {
        type : String,
        require : true
    },
    CreatedAt : {
        type : Date,
        require : true
    },
    Creator : {
        type : Schema.Types.ObjectId,
        require : true,
        ref : "User"
    }
};

export default CommentSchema;