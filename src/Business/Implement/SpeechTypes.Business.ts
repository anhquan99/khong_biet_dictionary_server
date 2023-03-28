import SpeechTypeModel from "../../Graphql/Schema/SpeechType";
import SpeechTypeDto from "../../Graphql/Dtos/SpeechType.Dto";
import mongoose, { mongo } from "mongoose";
import WordModel from "../../Graphql/Schema/Word";
import { NoutFoundMessage } from "../../Enums/ErrorMessageEnum";

const entity = "Speech type";

export async function createSpeechType(name : string, description : string, creator : string) : Promise<SpeechTypeDto>
{
    console.log(creator);
    const newSpeechType = new SpeechTypeModel({
        Name : name,
        Description : description,
        CreatedAt : new Date(),
        Creator : new mongoose.Types.ObjectId(creator)
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
export async function findSpeechTypes(name? : string, description? : string, creator? : string, createdFrom? : Date, createdTo? : Date) : Promise<SpeechTypeDto[]> 
{
    const querySpeechTypeResult = await SpeechTypeModel.find({$or : 
        [
            {Name : {$regex : new RegExp(name as string, 'i')}}, 
            {Description : {$regex : new RegExp(description as string, 'i')}}, 
            {Creator : new mongoose.Types.ObjectId(creator)}, 
            {CreatedAt : {
                $gte : createdFrom,
                $lte : createdTo
            }}
        ]});
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
export async function findSpeechType(name : string)
{
    const querySpeechType = await SpeechTypeModel.findOne({Name : name});
    if(!querySpeechType) throw new Error(NoutFoundMessage(entity));
    var result : SpeechTypeDto = {
        Name : querySpeechType.Name,
        Description : querySpeechType.Description,
        CreatedAt : querySpeechType.CreatedAt,
        Creator : querySpeechType.Creator?._id.toString()
    }
    return result;
}
export async function updateSpeechType(name : string, description : string, creator : string, createdAt : Date) : Promise<SpeechTypeDto>
{
    const filter = {
        Name : name,
        Creator : new mongoose.Types.ObjectId(creator)
    };
    console.log(filter);
    const update = {
        Description : description,
        CreatedAt : createdAt
    };
    const temp = await SpeechTypeModel.findOne({Name : name});
    console.log(temp);
    const querySpeechType = await SpeechTypeModel.findOneAndUpdate(filter, update);
    if(!querySpeechType) throw new Error(NoutFoundMessage(entity));
    const dto : SpeechTypeDto = {
        Name : querySpeechType.Name,
        Description : querySpeechType.Description,
        CreatedAt : querySpeechType.CreatedAt,
        Creator : querySpeechType.Creator?._id.toString()
    };
    return dto;
}
export async function deleteSpeechType(name : string, creator : string){
    const querySpeechType = await SpeechTypeModel.find({Name : name, Creator : new mongoose.Types.ObjectId(creator)});
    if(!querySpeechType) throw new Error(NoutFoundMessage(entity));
    await WordModel.remove({SpeechType : querySpeechType});
    await SpeechTypeModel.findOneAndRemove(querySpeechType);
}