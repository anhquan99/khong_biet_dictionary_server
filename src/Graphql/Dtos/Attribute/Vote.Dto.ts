export interface VoteDto{
    Voter? : string,
    CreatedAt? : Date,
    IsUpVote? : boolean
}

export function convertVoteToDto(vote : any) : VoteDto{
    return {
        Voter : vote.Voter,
        CreatedAt : vote.CreatedAt,
        IsUpVote : vote.IsUpVote
    };
}