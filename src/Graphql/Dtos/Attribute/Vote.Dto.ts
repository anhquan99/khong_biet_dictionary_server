export interface VoteDto{
    Voter? : string,
    CreatedAt? : Date,
    IsUpVote? : boolean
}

export function convertVoteToDto(vote : any) : VoteDto{
    return {
        Voter : vote.Voter._id.toString(),
        CreatedAt : vote.CreatedAt,
        IsUpVote : vote.IsUpVote
    };
}