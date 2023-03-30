import mongoose from "mongoose";    
import * as Business from "../../../Business/Implement/Words.Bussiness";
import { convertWordToDto } from "../../Dtos/Word.Dto";
import { TokenInfo } from "../../../Middlewares/Token";
import { Authen } from "../../../Middlewares/Auth";
import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";

const Words = {
    Query:{
        async Word(_ : any, {wordId} : {wordId : string}){
            return await Business.findWord(wordId);
        },
        async Words(_ : any, {characters, creator, speechTypeId, createdFrom, createdTo, numberOfSearchFrom, numberOfSearchTo} :
                    {characters? : string, creator? : string, speechTypeId? : string, createdFrom? : Date, createdTo? : Date, numberOfSearchFrom? : number, numberOfSearchTo? : number}){
            return await Business.findWords(characters, creator, speechTypeId, createdFrom, createdTo, numberOfSearchFrom, numberOfSearchTo);
        },
    },
    Mutation:{
        async Word(_ : any, {characters, speechTypeId} : {characters : string, speechTypeId : string}, context : ExpressContextFunctionArgument){
            const user : TokenInfo = Authen(context);
            return await Business.createWord(characters, speechTypeId, user.Id, user.Role);
        },
        async UpdateWord(_ : any, {wordId, characters, createdAt, numberOfSearch, isDictionary, speechType} 
            : {wordId : string, characters? : string, createdAt? : Date, numberOfSearch? : number, isDictionary? : boolean, speechType? : string}, context : ExpressContextFunctionArgument){
            const user : TokenInfo = Authen(context);
            return await Business.updateWord(wordId, user.Id, characters, createdAt, numberOfSearch, isDictionary, speechType);
        },
        async DeleteWord(_ : any, {wordId} : {wordId : string}, context : ExpressContextFunctionArgument){
            const user : TokenInfo = Authen(context);
            await Business.deleteWord(wordId, user.Id);
            return "Success!";
        }, 
    }
};

export default Words;