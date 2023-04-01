import mongoose from "mongoose";
import * as Business from '../../../Business/Implement/Pharses.Business'
import { Authen } from "../../../Middlewares/Auth";
import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { TokenInfo } from "../../../Middlewares/Token";

const Pharses = {
    Query : {
        async Pharse(_ : any, {pharseId} : {pharseId : string}){
            return await Business.findPharse(pharseId);
        },
        async Pharses(_ : any, {pharse, creator, createdFrom, createdTo, words} : {pharse? : string, creator? : string, createdFrom? : Date, createdTo? : Date, words? : [string]}){
            return await Business.findPharses(pharse, creator, createdFrom, createdTo, words);
        }
    },
    Mutation : {
        async Pharse(_ : any, {pharse, words} : {pharse : string, words : [string]}, context : ExpressContextFunctionArgument){
            const token = Authen(context);
            return await Business.createPharse(pharse, token.Id, words);
        },
        async UpdatePharse(_ : any, {pharseId, pharse, createdAt, words} : {pharseId : string, pharse? : string, createdAt? : Date, words? : [string]}, context : ExpressContextFunctionArgument){
            const token = Authen(context);
            return await Business.updatePharse(pharseId, token.Id, pharse, createdAt, words);
        },
        async DeletePharse(_ : any, {pharseId} : {pharseId : string}, context : ExpressContextFunctionArgument){
            const token = Authen(context);
             await Business.deletePharse(pharseId, token.Id);
             return "Sucess!";
        }
    }
}

export default Pharses;