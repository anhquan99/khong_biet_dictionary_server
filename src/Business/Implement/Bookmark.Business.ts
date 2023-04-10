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
    await newBookmark.save();
    return convertBookmarkToDto(newBookmark);
}
export async function findBookmark(bookmarkId : string)
{
    const bookmark = await BookmarkModel.findById(bookmarkId);
    return convertBookmarkToDto(bookmark);
}
export async function findBookmarks(objectId? : string, bookmarker? : string, bookmarkType? : string, createdFrom? : Date, createdTo? : Date)
{
    const filter  = {} as any;
    setIdIfNotUndefine(filter, "Bookmark", objectId);
    setIdIfNotUndefine(filter, "Bookmarker", bookmarker);
    setValueIfNotUndefine(filter, "BookmarkType", bookmarkType);
    setDateFilter(filter, createdFrom, createdTo);
    const bookmarks = await BookmarkModel.find({$or : [filter]});
    var result : BookmarkDto[] = [];
    bookmarks.forEach(x => {
        result.push(convertBookmarkToDto(x));
    });
    return result;
}
export async function deleteBookmark(bookmarkId : string, token : TokenInfo){
    if(token.Role === roleEnumTs.admin)
    {
        await BookmarkModel.findOneAndDelete({_id : bookmarkId});
    }
    else if(token.Role === roleEnumTs.user)
    {
        await BookmarkModel.findOneAndDelete({_id : bookmarkId, Bookmarker : token.Id});
    } 
}