import { Schema } from "mongoose";

const BookmarkSchema = new Schema({
    Bookmarker : {
        type : Schema.Types.ObjectId,
        require : true,
        ref : "User"
    },
    CreatedAt : {
        type : Date,
        require : true
    }
});

export default BookmarkSchema;