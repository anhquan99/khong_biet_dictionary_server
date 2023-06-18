import * as Business from '../../../Business/Implement/Bookmark.Business';
import { Authen } from '../../../Middlewares/Auth';
import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';
import { TokenInfo } from '../../../Middlewares/Token';

const Bookmarks = {
    Query : {
        async Bookmark(_ : any, {bookmarkId} : {bookmarkId : string})
        {
            return await Business.findBookmark(bookmarkId);
        },
        async Bookmarks(_ : any, {objectId, bookmarker, bookmarkType, createdFrom, createdTo}
            : {objectId? : string, bookmarker? : string, bookmarkType? : string, createdFrom? : Date, createdTo? : Date})
        {
            return await Business.findBookmarks(objectId, bookmarker, bookmarkType, createdFrom, createdTo);
        }
    },
    Mutation : {
        async Bookmark(_ : any, {objectId, type} : {objectId : string, type : string}, context : ExpressContextFunctionArgument)
        {
            const token : TokenInfo = Authen(context);
            return await Business.createBookmark(objectId, type, token);
        },
        async DeleteBookmark(_ : any, {bookmarkId} : {bookmarkId : string}, context : ExpressContextFunctionArgument)
        {
            const token : TokenInfo = Authen(context);
            await Business.deleteBookmark(bookmarkId, token);
            return "Success!";
        }
    }
}

export default Bookmarks