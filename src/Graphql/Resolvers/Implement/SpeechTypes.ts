import SpeechTypeModel from "../../Schema/SpeechType";
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
            const user : TokenInfo = Authen(context);
            return await Business.createSpeechType(name, description as string, user.Id);
        },
        async UpdateSpeechType(_ : any, {speechTypeId, name, description, createdAt} : {speechTypeId : string, name? : string, description : string, createdAt : Date}, context : ExpressContextFunctionArgument)
        {
            const user = Authen(context);
            return await Business.updateSpeechType(speechTypeId, user.Id, name, description, createdAt);
        },
        async DeleteSpeechType(_ : any, {name} : {name : string}, context : ExpressContextFunctionArgument)
        {
            const user = Authen(context);
            return await Business.deleteSpeechType(name, user.Id);
            return "Success!";
        }
    }
}

export default SpeechTypes;