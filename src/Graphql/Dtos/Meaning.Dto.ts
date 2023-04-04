import { CommentDto, convertCommentToDto } from "./Attribute/Comment.Dto";
import { VoteDto, convertVoteToDto } from "./Attribute/Vote.Dto";
import { BookmarkDto, convertBookmarkToDto } from "./Attribute/Bookmark.Dto";
import { SpeechTypeDto } from "./SpeechType.Dto";

export interface MeaningDto{
    Id? : string,
    Meaning?: string,
    Creator? : string,
    Word? : string,
    Example? : [string],
    CreatedAt? : Date,
    Status? : string,
    IsSlang? : boolean,
    Votes : [VoteDto],
    Comments? : [CommentDto],
    Bookmarks? : [BookmarkDto],
    SpeechType? : SpeechTypeDto
}

export function convertMeaningToDto(meaning : any) : MeaningDto{
    return {
        Id : meaning._id.toString(),
        Meaning : meaning.Meaning,
        Creator : meaning.Creator._id.toString(),
        Word : meaning.Word._id.toString(),
        Example : meaning.Example,
        CreatedAt : meaning.CreatedAt,
        Status : meaning.Status,
        IsSlang : meaning.IsSlang,
        Votes : meaning.Votes.forEach( (x : any) => {
            convertVoteToDto(x);
        }),
        Comments : meaning.Comments.forEach( (x : any) => {
            convertCommentToDto(x);
        }),
        Bookmarks : meaning.Bookmarks.forEach((x : any) => {
            convertBookmarkToDto(x);
        }),
        SpeechType : meaning.SpeechType._id.toString()
    };
}