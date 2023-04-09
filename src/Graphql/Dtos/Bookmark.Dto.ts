export interface BookmarkDto{
    Bookmarker? : string,
    CreatedAt? : Date,
    Type? : string
}

export function convertBookmarkToDto(bookmark : any) : BookmarkDto{
    return{
        Bookmarker : bookmark.Bookmarker.toString(),
        CreatedAt : bookmark.CreatedAt,
        Type : bookmark.Type
    };
}