import mongoose from "mongoose";

import BookmarkModel from "../../Graphql/Schema/Bookmark";
import { BookmarkDto, convertBookmarkToDto } from "../../Graphql/Dtos/Bookmark.Dto";
import { TokenInfo } from "../../Middlewares/Token";
import { roleEnumTs, setStatusBaseOnRole } from "../../Enums/SchemaEnum";
import { NotFoundMessage } from "../../Enums/ErrorMessageEnum";
import { setDateFilter, setIdIfNotUndefine, setNumberRangeIfNotUndefine, setRegexIfNotUndefine, setValueIfNotUndefine } from "../../Utils/FilterHelper";


const entity = "Bookmark";

export async function createBookmark(objectId : string, type : string, token : TokenInfo)
{
    const newBookmark = new BookmarkModel({
        Bookmarker : new mongoose.Types.ObjectId(token.Id),
        BookmarkType : type,
        Bookmark : new mongoose.Types.ObjectId(objectId),
        CreatedAt : new Date()
    })
}