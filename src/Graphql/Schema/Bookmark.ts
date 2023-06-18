import { Schema, model } from "mongoose";
import { BookmarkTypeEnum } from "../../Enums/SchemaEnum";

const BookmarkSchema = new Schema({
    Bookmarker : {
        type : Schema.Types.ObjectId,
        require : true,
        ref : "User"
    },
    Bookmark : {
        type : Schema.Types.ObjectId,
        require: true,
        refPath : 'BookType'
    },
    BookmarkType : {
        type : String,
        require : true,
        enum :{
            values : BookmarkTypeEnum,
            message : "{VALUE} is not supported"
        }
    },
    CreatedAt : {
        type : Date,
        require : true
    }

    
});

const BookmarkModel = model("Bookmark", BookmarkSchema);
export default BookmarkModel;