import MeaningModel from "../../Graphql/Schema/Meaning";
import { MeaningDto, convertMeaningToDto } from "../../Graphql/Dtos/Meaning.Dto";
import { TokenInfo } from "../../Middlewares/Token";
import mongoose from "mongoose";
import { roleEnumTs, setStatusBaseOnRole, statusEnumTs } from "../../Enums/SchemaEnum";
import { NotFoundMessage } from "../../Enums/ErrorMessageEnum";
import { setDateFilter, setIdIfNotUndefine, setRegexIfNotUndefine, setValueIfNotUndefine } from "../../Utils/FilterHelper";
import { convertVoteToDto } from "../../Graphql/Dtos/Attribute/Vote.Dto";

const entity = "Meaning";

export async function createMeaning(meaning : string, word : string, isSlang : boolean, speechType : string, token : TokenInfo, example? : [string]){
    const newMeaning = new MeaningModel({
        Meaning : meaning,
        Creator : new mongoose.Types.ObjectId(token.Id),
        Word : new mongoose.Types.ObjectId(word),
        Example : example,
        Status : setStatusBaseOnRole(token.Role),
        IsSlang : isSlang,
        SpeechType : new mongoose.Types.ObjectId(speechType)
    });
    const result = await newMeaning.save();
    return convertMeaningToDto(result);
}
export async function findMeaning(meaningId : string){
    const result = await MeaningModel.findOne({_id : new mongoose.Types.ObjectId(meaningId)});
    return convertMeaningToDto(result);
}
export async function findMeanings(meaning? : string, creator? : string, word? : string,  
    // example? : string, 
    createdFrom? : Date, createdTo? : Date, status? : string, 
    isSlang? : boolean, 
    // voteCount? : number, commentCount? : number,
    speechType? : string)
{
    const filter = {} as any;
    setRegexIfNotUndefine(filter, "Meaning", meaning);
    setIdIfNotUndefine(filter, "Creator", creator);
    setIdIfNotUndefine(filter, "Word", word);
    setDateFilter(filter, createdFrom, createdTo);
    setValueIfNotUndefine(filter, "Status", status);
    setValueIfNotUndefine(filter, "IsSlang", isSlang);
    setIdIfNotUndefine(filter, "SpeechType", speechType);
    const queryMeaning = await MeaningModel.find({$or : [filter]});
    var result : MeaningDto[] = [];
    queryMeaning.forEach(x => {
        result.push(convertMeaningToDto(x));
    });
    return result;
}
export async function updateMeaning(meaningId : string, token : TokenInfo, meaning? : string, 
            example? : [string], createdAt? : Date, status? : string, isSlang? : boolean)
{
    const filter : any = {
        _id : new mongoose.Types.ObjectId(meaningId),
    };
    if(token.Role === roleEnumTs.user){
        filter.Creator = new mongoose.Types.ObjectId(token.Id);
    }
    const update = {} as any;
    setValueIfNotUndefine(update, "Meaning", meaning);
    setValueIfNotUndefine(update, "Example", example);
    setValueIfNotUndefine(update, "CreatedAt", createdAt);
    setValueIfNotUndefine(update, "Status", status);
    setValueIfNotUndefine(update, "IsSlang", isSlang);
    const result = await MeaningModel.findOneAndUpdate(filter, update, {new : true});
    return convertMeaningToDto(result);
}
export async function voteMeaning(meaningId : string, token : TokenInfo, isUpVote : boolean){
    const meaning = await MeaningModel.findById(meaningId);
    const vote = meaning?.Votes.find(x => x.Voter._id === token.Id);
    if(vote && vote.IsUpVote === isUpVote)
    {
        meaning?.Votes.splice(meaning?.Votes.indexOf(vote),1);
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
        meaning?.Votes.push(newVote);
        await meaning?.save();
        return convertVoteToDto(newVote);
    }
    await meaning?.save();
    return convertVoteToDto(vote);
}
export async function deleteMeaning(meaningId : string, token : TokenInfo)
{
    if(token.Role === roleEnumTs.user)
    {
        await MeaningModel.findOneAndDelete({_id : meaningId, Creator : new mongoose.Types.ObjectId(token.Id)});
    }
    else if(token.Role === roleEnumTs.admin)
    {
        await MeaningModel.findOneAndDelete({_id : meaningId});
    }
}