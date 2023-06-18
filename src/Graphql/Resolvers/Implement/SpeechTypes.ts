import mongoose from "mongoose";

import * as Business from '../../../Business/Implement/SpeechTypes.Business';
import { Authen } from "../../../Middlewares/Auth";
import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { TokenInfo } from "../../../Middlewares/Token";

const SpeechTypes = {
    Query : {
        async SpeechType(_ : any, {speechTypeName} : {speechTypeName : string}){
            return await Business.findSpeechType(speechTypeName);
        },
        async SpeechTypes(_ : any, {speechTypeName, description, creator, createdFrom, createdTo} : 
                        {speechTypeName? : string, description? : string, creator? : string, createdFrom? : Date, createdTo? : Date})
        {  
            return await Business.findSpeechTypes(speechTypeName, description, creator, createdFrom, createdTo);
        }
    },
    Mutation : {
        async SpeechType(_ : any, {name, description} : {name : string, description? : string}, context : ExpressContextFunctionArgument)
        {
            const token : TokenInfo = Authen(context);
            return await Business.createSpeechType(name, description as string, token);
        },
        async UpdateSpeechType(_ : any, {speechTypeId, name, description, createdAt} : {speechTypeId : string, name? : string, description : string, createdAt : Date}, context : ExpressContextFunctionArgument)
        {
            const token = Authen(context);
            return await Business.updateSpeechType(speechTypeId, token, name, description, createdAt);
        },
        async DeleteSpeechType(_ : any, {speechTypeId} : {speechTypeId : string}, context : ExpressContextFunctionArgument)
        {
            const token = Authen(context);
            await Business.deleteSpeechType(speechTypeId, token);
            return "Success!";
        }
    }
}

export default SpeechTypes;