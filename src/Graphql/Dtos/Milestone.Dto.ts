export interface MilestoneDto{
    Id? : string,
    File? : string,
    MinLevel? : number,
    Title? : string,
    Description? : string,
    CreatedAt? : Date,
    Creator? : string
}

export function convertMilestoneToDto(milestone : any) : MilestoneDto
{
    return {
        Id : milestone._id.toString(),
        File : milestone.FileName,
        MinLevel : milestone.MinLevel,
        Title : milestone.Title,
        Description : milestone.Description,
        CreatedAt : milestone.CreatedAt ,
        Creator : milestone.Creator._id.toString()
    }
}