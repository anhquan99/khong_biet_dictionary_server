import mongoose from "mongoose";

import WordModel from "../../Graphql/Schema/Word";
import {WordDto, convertWordToDto} from "../../Graphql/Dtos/Word.Dto";
import { TokenInfo } from "../../Middlewares/Token";
import { roleEnumTs, setStatusBaseOnRole } from "../../Enums/SchemaEnum";
import { NotFoundMessage } from "../../Enums/ErrorMessageEnum";
import { setDateFilter, setIdIfNotUndefine, setNumberRangeIfNotUndefine, setRegexIfNotUndefine, setValueIfNotUndefine } from "../../Utils/FilterHelper";
import { convertVoteToDto } from "../../Graphql/Dtos/Attribute/Vote.Dto";

const entity = "Word";

export async function createWord(characters : string, speechTypeId : string, isDictionary : boolean, token : TokenInfo){
    const newWord = new WordModel({
        Characters : characters,
        CreatedAt : new Date(),
        NumberOfSearch : 0,
        IsDictionary : isDictionary,
        Creator : new mongoose.Types.ObjectId(token.Id),
        SpeechType : new mongoose.Types.ObjectId(speechTypeId),
        Status : setStatusBaseOnRole(token.Role),
        Votes : []
    });
    const result = await newWord.save();
    const wordDto : WordDto = convertWordToDto(result);
    return wordDto;
}
export async function findWord(wordId : string){
    const result = await WordModel.findOneAndUpdate({_id : new mongoose.Types.ObjectId(wordId)}, {$inc : {NumberOfSearch : 1} }, {new : true});
    return convertWordToDto(result);
}

export async function findWords(characters? : string, creator? : string, speechTypeId? : string, createdFrom? : Date, createdTo? : Date, numberOfSearchFrom? : number, numberOfSearchTo? : number)
{
    const filter = {} as any;
    setRegexIfNotUndefine(filter, "Characters", characters);
    setIdIfNotUndefine(filter, "Creator", creator);
    setIdIfNotUndefine(filter, "SpeechType", speechTypeId);
    setDateFilter(filter, createdFrom, createdTo);
    setNumberRangeIfNotUndefine(filter, "NumberOfSearch", numberOfSearchFrom, numberOfSearchTo);
    const queryWord = await WordModel.find({$or : [filter]});
    var result : WordDto[] = [];
    queryWord.forEach(x => {
        result.push(convertWordToDto(x));
    });
    return result;
}

export async function updateWord(wordId : string, token : TokenInfo, characters? : string, createdAt? : Date, numberOfSearch? : number, isDictionary? : boolean, speechType? : string)
{
    const filter : any = {
        _id : new mongoose.Types.ObjectId(wordId)
    };
    if(token.Role === roleEnumTs.user)
    {
        filter.Creator = new mongoose.Types.ObjectId(token.Id);
    }
    var update = {} as any;
    setValueIfNotUndefine(update, "Characters", characters);
    setValueIfNotUndefine(update, "CreatedAt", createdAt);
    setValueIfNotUndefine(update, "NumberOfSearch", numberOfSearch);
    setValueIfNotUndefine(update, "IsDictionary", isDictionary);
    setIdIfNotUndefine(update, "SpeechType", speechType);
    update.Status = setStatusBaseOnRole(token.Role);
    const queryWord = await WordModel.findOneAndUpdate(filter, update, {new : true});
    if(!queryWord) throw new Error(NotFoundMessage(entity));
    return convertWordToDto(queryWord);
}
export async function voteWord(wordId : string, token : TokenInfo, isUpVote : boolean){
    const word = await WordModel.findById(wordId);
    const vote = word?.Votes.find(x => x.Voter._id === token.Id);
    if(vote && vote.IsUpVote === isUpVote)
    {
        word?.Votes.splice(word?.Votes.indexOf(vote),1);
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
        word?.Votes.push(newVote);
        await word?.save();
        return convertVoteToDto(newVote);
    }
    await word?.save();
    return convertVoteToDto(vote);
}
export async function deleteWord(wordId : string, token : TokenInfo){
    if(token.Role === roleEnumTs.admin){
        await WordModel.findOneAndDelete({_id : wordId});
    }
    else if(token.Role === roleEnumTs.user)
    {
        await WordModel.findOneAndDelete({_id : wordId, Creator : new mongoose.Types.ObjectId(token.Id)});
    }
}