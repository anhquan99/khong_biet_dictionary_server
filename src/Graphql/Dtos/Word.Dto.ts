import {SpeechTypeDto} from "./SpeechType.Dto";
import WordModel from "../Schema/Word";

export interface WordDto{
    Id? : string,
    Characters? : string,
    CreatedAt? : Date,
    NumberOfSearch? : number,
    IsDictionary? : boolean,
    Creator? : string,
    SpeechType? : string,
    Votes : [string]
}
export function convertWordToDto(wordModel : any) : WordDto {
    return {
        Id : wordModel._id.toString(),
        Characters : wordModel.Characters,
        CreatedAt : wordModel.CreatedAt,
        NumberOfSearch : wordModel.NumberOfSearch,
        IsDictionary : wordModel.IsDictionary,
        Creator : wordModel.Creator?._id.toString(),
        SpeechType : wordModel._id.toString(),
        Votes : wordModel.Votes
    }
}