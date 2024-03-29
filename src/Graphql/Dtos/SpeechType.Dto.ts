import SpeechTypeModel from "../Schema/SpeechType"

export interface SpeechTypeDto
{
    Id? : string,
    Name? : string,
    Creator? : string,
    CreatedAt? : Date,
    Description? : string,
    Status? : string
}

export function convertSpeechTypeToDto(speechType : any) : SpeechTypeDto{
    return {
        Id : speechType._id.toString(),
        Name : speechType.Name,
        Description : speechType.Description,
        CreatedAt : speechType.CreatedAt,
        Creator : speechType.Creator?._id.toString(),
        Status : speechType.Status
    }
}