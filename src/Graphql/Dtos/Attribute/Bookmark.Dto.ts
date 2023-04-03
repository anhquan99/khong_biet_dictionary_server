export interface BookmarkDto{
    Bookmarker? : string,
    CreatedAt? : Date
}

export function convertBookmarkToDto(bookmark : any) : BookmarkDto{
    return{
        Bookmarker : bookmark.Bookmarker.toString(),
        CreatedAt : bookmark.CreatedAt
    };
}