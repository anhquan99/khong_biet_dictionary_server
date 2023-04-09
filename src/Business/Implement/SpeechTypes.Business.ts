import SpeechTypeModel from "../../Graphql/Schema/SpeechType";
import { SpeechTypeDto,  convertSpeechTypeToDto } from "../../Graphql/Dtos/SpeechType.Dto";
import mongoose, { mongo } from "mongoose";
import WordModel from "../../Graphql/Schema/Word";
import { NotFoundMessage } from "../../Enums/ErrorMessageEnum";
import { roleEnumTs, setStatusBaseOnRole, statusEnumTs } from "../../Enums/SchemaEnum";
import { setRegexIfNotUndefine, setValueIfNotUndefine } from "../../Utils/FilterHelper";
import { setIdIfNotUndefine } from "../../Utils/FilterHelper";
import { setDateFilter } from "../../Utils/FilterHelper";
import { TokenInfo } from "../../Middlewares/Token";
import { convertVoteToDto } from "../../Graphql/Dtos/Attribute/Vote.Dto";

const entity = "Speech type";

export async function createSpeechType(name : string, description : string, token : TokenInfo) : Promise<SpeechTypeDto>
{
    const newSpeechType = new SpeechTypeModel({
        Name : name,
        Description : description,
        CreatedAt : new Date(),
        Creator : new mongoose.Types.ObjectId(token.Id),
        Status : token.Role == roleEnumTs.admin ? statusEnumTs.approved : statusEnumTs.submitted
    });
    const result = await newSpeechType.save();
    return convertSpeechTypeToDto(result);
}
export async function findSpeechTypes(name? : string, description? : string, creator? : string, createdFrom? : Date, createdTo? : Date) : Promise<SpeechTypeDto[]> 
{
    const filter = {} as any;
    setRegexIfNotUndefine(filter, "Name", name);
    setRegexIfNotUndefine(filter, "Description", description);
    setIdIfNotUndefine(filter, "Creator", creator);
    setDateFilter(filter, createdFrom, createdTo);
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
export async function updateSpeechType(speechTypeId : string, token : TokenInfo, name? : string, description? : string, createdAt? : Date) : Promise<SpeechTypeDto>
{
    const filter : any = {
        _id : speechTypeId
    };
    if(token.Role === roleEnumTs.user)
    {
        filter.Creator = new mongoose.Types.ObjectId(token.Id);
    }
    var update : any = {};
    setValueIfNotUndefine(update, "Name", name);
    setValueIfNotUndefine(update, "Description", description);
    setValueIfNotUndefine(update, "CreatedAt", createdAt);
    update.Status = setStatusBaseOnRole(token.Role); 
    const querySpeechType = await SpeechTypeModel.findOneAndUpdate(filter, update, {new : true});
    if(!querySpeechType) throw new Error(NotFoundMessage(entity));
    return convertSpeechTypeToDto(querySpeechType);
}
export async function voteSpeechType(speechTypeId : string, token : TokenInfo, isUpVote : boolean){
    const speechType = await SpeechTypeModel.findById(speechTypeId);
    const vote = speechType?.Votes.find(x => x.Voter._id === token.Id);
    if(vote && vote.IsUpVote === isUpVote)
    {
        speechType?.Votes.splice(speechType?.Votes.indexOf(vote),1);
    }
    else if(vote)
    {
        vote.IsUpVote = isUpVote;
    }
    else
    {
        const newVote = {
            Voter : new mongoose.Types.ObjectId(token.Id),
            CreatedAt : new Date(),
            IsUpVote : isUpVote
        }
        speechType?.Votes.push(newVote);
        await speechType?.save();
        return convertVoteToDto(newVote);
    }
    await speechType?.save();
    return convertVoteToDto(vote);
}
export async function deleteSpeechType(speechTypeId : string, token : TokenInfo){
    let querySpeechType;
    if(token.Role === roleEnumTs.user){
        querySpeechType = await SpeechTypeModel.find({_id : speechTypeId, Creator : new mongoose.Types.ObjectId(token.Id)});
    }
    else if(token.Role === roleEnumTs.admin){
        querySpeechType = await SpeechTypeModel.find({_id : speechTypeId});
    }
    if(!querySpeechType) throw new Error(NotFoundMessage(entity));
    await WordModel.deleteMany({SpeechType : querySpeechType});
    await SpeechTypeModel.findOneAndDelete(querySpeechType);
}