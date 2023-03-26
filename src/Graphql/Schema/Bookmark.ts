import {model, Schema} from "mongoose";

const BookmarkSchema = new Schema ({
    Creator : {
        type : Schema.Types.ObjectId,
        require : true,
        ref : "User"
    },
    CreatedAt : {
        type: String,
        require : true
    }
});

const BookMarkModel = model("Bookmark", BookmarkSchema);
export default BookMarkModel;