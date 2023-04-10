export interface BookmarkDto{
    Id? : string,
    Bookmarker? : string,
    CreatedAt? : Date,
    Type? : string,
    Bookmark? : string
}

export function convertBookmarkToDto(bookmark : any) : BookmarkDto{
    return{
        Id : bookmark._id.toString(),
        Bookmarker : bookmark.Bookmarker._id.toString(),
        CreatedAt : bookmark.CreatedAt,
        Type : bookmark.BookmarkType,
        Bookmark : bookmark.Bookmark._id.toString()
    };
}