import WordModel from "../../Graphql/Schema/Word";
import {WordDto, convertWordToDto} from "../../Graphql/Dtos/Word.Dto";
import { TokenInfo } from "../../Middlewares/Token";
import mongoose from "mongoose";
import { roleEnumTs } from "../../Enums/SchemaEnum";
import { NotFoundMessage } from "../../Enums/ErrorMessageEnum";

const entity = "Word";

export async function createWord(characters : string, speechTypeId : string, creator : string, role : string){
    const newWord = new WordModel({
        Characters : characters,
        CreatedAt : new Date(),
        NumberOfSearch : 0,
        IsDictionary : role == roleEnumTs.admin ? true : false,
        Creator : new mongoose.Types.ObjectId(creator),
        SpeechType : new mongoose.Types.ObjectId(speechTypeId),
        Votes : []
    });
    const result = await newWord.save();
    const wordDto : WordDto = convertWordToDto(result);
    return wordDto;
}
export async function findWord(wordId : string){
    const result = await WordModel.findOne({_id : new mongoose.Types.ObjectId(wordId)}, {$inc : {NumberOfSearch : 1} }, {new : true});
    return convertWordToDto(result);
}

export async function findWords(characters? : string, creator? : string, speechTypeId? : string, createdFrom? : Date, createdTo? : Date, numberOfSearchFrom? : number, numberOfSearchTo? : number)
{
    const filter = {} as any;
    if(characters !== undefined) filter.Characters = {$regex : new RegExp(characters as string, 'i')};
    if(creator !== undefined) filter.Creator = new mongoose.Types.ObjectId(creator);
    if(speechTypeId !== undefined) filter.SpeechType = new mongoose.Types.ObjectId(speechTypeId);
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
    if(numberOfSearchFrom !== undefined){
        filter.NumberOfSearch = {
            $gte : numberOfSearchFrom
        };
        if(numberOfSearchTo !== undefined) {
            filter.NumberOfSearch.$lte = numberOfSearchTo;
        }
    }
    else if(numberOfSearchTo !== undefined){
        filter.NumberOfSearch = {
            $lte : numberOfSearchTo
        };
    }
    const queryWord = await WordModel.find({$or : [filter]});
    var result : WordDto[] = [];
    queryWord.forEach(x => {
        result.push(convertWordToDto(x));
    });
    return result;
}

export async function updateWord(wordId : string, creator : string, characters? : string, createdAt? : Date, numberOfSearch? : number, isDictionary? : boolean, speechType? : string)
{
    const filter = {
        _id : new mongoose.Types.ObjectId(wordId),
        Creator : new mongoose.Types.ObjectId(creator)
    };
    var update = {} as any;
    if(characters !== undefined) update.Characters = characters;
    if(createdAt !== undefined) update.CreatedAt = createdAt;
    if(numberOfSearch !== undefined) update.NumberOfSearch = numberOfSearch;
    if(isDictionary !== undefined) update.IsDictionary = isDictionary;
    if(speechType !== undefined) update.SpeechType = new mongoose.Types.ObjectId(speechType);
    const queryWord = await WordModel.findOneAndUpdate(filter, update, {new : true});
    if(!queryWord) throw new Error(NotFoundMessage(entity));
    return convertWordToDto(queryWord);
}

export async function deleteWord(wordId : string, creator : string){
    await WordModel.findOneAndDelete({_id : wordId, Creator : new mongoose.Types.ObjectId(creator)});
}