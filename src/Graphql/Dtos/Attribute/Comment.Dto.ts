export interface CommentDto{
    Comment? : string,
    CreatedAt? : Date,
    Creator : string
}

export function convertCommentToDto(comment : any) : CommentDto{
    return {
        Comment : comment.Comment,
        CreatedAt : comment.CreatedAt,
        Creator : comment.Creator._id.tostring()
    }
}