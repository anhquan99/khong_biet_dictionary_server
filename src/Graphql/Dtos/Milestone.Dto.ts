export interface MilestoneDto{
    Id? : string,
    FileName? : string,
    MinLevel? : number,
    Title? : string,
    Description? : string,
    CreatedAt? : Date
}

export function convertMilestoneToDto(milestone : any) : MilestoneDto
{
    return {
        Id : milestone._id.toString(),
        FileName : milestone.FileName,
        MinLevel : milestone.MinLevel,
        Title : milestone.Title,
        Description : milestone.Description,
        CreatedAt : milestone.CreatedAt 
    }
}