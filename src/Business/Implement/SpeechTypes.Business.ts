import SpeechTypeModel from "../../Graphql/Schema/SpeechType";
import { SpeechTypeDto,  convertSpeechTypeToDto } from "../../Graphql/Dtos/SpeechType.Dto";
import mongoose, { mongo } from "mongoose";
import WordModel from "../../Graphql/Schema/Word";
import { NotFoundMessage } from "../../Enums/ErrorMessageEnum";

const entity = "Speech type";

export async function createSpeechType(name : string, description : string, creator : string) : Promise<SpeechTypeDto>
{
    const newSpeechType = new SpeechTypeModel({
        Name : name,
        Description : description,
        CreatedAt : new Date(),
        Creator : (creator)
    });
    const result = await newSpeechType.save();
    return convertSpeechTypeToDto(result);
}
export async function findSpeechTypes(name? : string, description? : string, creator? : string, createdFrom? : Date, createdTo? : Date) : Promise<SpeechTypeDto[]> 
{
    const filter = {} as any;
    if(name !== undefined) filter.Name = {$regex : new RegExp(name as string, 'i')};
    if(description !== undefined) filter.Description = {$regex : new RegExp(description as string, 'i')}
    if(creator !== undefined) filter.Creator = new mongoose.Types.ObjectId(creator); 
    if(createdFrom !== undefined){
        filter.CreatedAt = {
            $gte : createdFrom
        };
        if(createdTo !== undefined) {
            filter.CreatedAt.$lte = createdTo;
        }
    }
    else if(createdTo !== undefined){
        filter.CreatedAt = {
            $lte : createdTo
        };
    }
    const querySpeechTypeResult = await SpeechTypeModel.find({$or : 
        [
            filter
        ]}); 
    var result : SpeechTypeDto[] = [];
    querySpeechTypeResult.forEach( x => {
        result.push(convertSpeechTypeToDto(x));
    });
    return result;
}
export async function findSpeechType(name : string)
{
    const querySpeechType = await SpeechTypeModel.findOne({Name : name});
    if(!querySpeechType) throw new Error(NotFoundMessage(entity));
    return convertSpeechTypeToDto(querySpeechType);
}
export async function updateSpeechType(speechTypeId : string, creator : string, name? : string, description? : string, createdAt? : Date) : Promise<SpeechTypeDto>
{
    const filter = {
        _id : speechTypeId,
        Creator : new mongoose.Types.ObjectId(creator)
    };
    var update : any = {};
    if(name !== undefined) update.Name = name;
    if(description !== undefined) update.Description = description;
    if(createdAt !== undefined) update.CreatedAt = createdAt;
    const querySpeechType = await SpeechTypeModel.findOneAndUpdate(filter, update, {new : true});
    if(!querySpeechType) throw new Error(NotFoundMessage(entity));
    return convertSpeechTypeToDto(querySpeechType);
}
export async function deleteSpeechType(name : string, creator : string){
    const querySpeechType = await SpeechTypeModel.find({Name : name, Creator : new mongoose.Types.ObjectId(creator)});
    if(!querySpeechType) throw new Error(NotFoundMessage(entity));
    await WordModel.remove({SpeechType : querySpeechType});
    await SpeechTypeModel.findOneAndDelete(querySpeechType);
}