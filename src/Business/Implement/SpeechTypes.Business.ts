import SpeechTypeModel from "../../Graphql/Schema/SpeechType";
import SpeechTypeDto from "../../Graphql/Dtos/SpeechType.Dto";
import mongoose from "mongoose";

export async function createSpeechType(name : string, description : string, creator : mongoose.Types.ObjectId) : Promise<SpeechTypeDto>
{
    const newSpeechType = new SpeechTypeModel({
        Name : name,
        Description : description,
        CreatedAt : new Date(),
        Creator : creator
    });
    const result = await newSpeechType.save();
    const dto : SpeechTypeDto = {
        Name : result.Name,
        Description : result.Description,
        CreatedAt : result.CreatedAt,
        Creator : result.Creator?._id.toString()
    };
    return dto;
}
export async function findSpeechType(name : string, creator : mongoose.Types.ObjectId, createdFrom : Date, createdTo : Date) : Promise<SpeechTypeDto[]> 
{
    const querySpeechTypeResult = await SpeechTypeModel.find({
        Name : name,
        Creator : creator,
        CreatedAt : {
            $gte : createdFrom,
            $lte : createdTo
        }
    });
    var result : SpeechTypeDto[] = [];
    querySpeechTypeResult.forEach( x => {
        const item : SpeechTypeDto = {
            Name : x.Name,
            Description : x.Description,
            CreatedAt : x.CreatedAt,
            Creator : x.Creator?._id.toString()
        };
        result.push(item);
    });
    return result;
}
export async function findSpeechTypeByName(name : string)
{
    const querySpeechType = await SpeechTypeModel.findOne({
        Name : name
    });
    if(!querySpeechType) throw new Error("Speech type not found");
    const dto : SpeechTypeDto = {
        Name : querySpeechType.Name,
        CreatedAt : querySpeechType?.CreatedAt,
        Description : querySpeechType.Description,
        Creator : querySpeechType.Creator?._id.toString()
    };
    return dto;
}