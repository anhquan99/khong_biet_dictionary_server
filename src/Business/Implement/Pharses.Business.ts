import PharseModel from "../../Graphql/Schema/Pharse";
import { PharseDto, convertPharseToDto } from "../../Graphql/Dtos/Pharse.Dto";
import mongoose from "mongoose";
import { setDateFilter, setValueIfNotUndefine, setRegexIfNotUndefine, setArrObjectIdIfNotUndefine, setIdIfNotUndefine } from "../../Utils/FilterHelper";
import { NotFoundMessage } from "../../Enums/ErrorMessageEnum";
import { TokenInfo } from "../../Middlewares/Token";
import { roleEnumTs, setStatusBaseOnRole } from "../../Enums/SchemaEnum";

const entity = "Pharse";

export async function createPharse(pharse : string, token : TokenInfo, words : [string]){
   const newPhrase = new PharseModel({
        Pharse : pharse,
        Creator : new mongoose.Types.ObjectId(token.Id),
        CreatedAt : new Date(),
        Words : words.map((item) => new mongoose.Types.ObjectId(item)),
        Status : setStatusBaseOnRole(token.Role)
   });
   const result = await newPhrase.save();
   return convertPharseToDto(result);
}
export async function findPharse(pharseId : string){
    const result = await PharseModel.findOne({_id : new mongoose.Types.ObjectId(pharseId)});
    return convertPharseToDto(result);
}
export async function findPharses(pharse? : string, creator? : string, createdFrom? : Date, createdTo? : Date, words? : [string]) {
    var filter = {} as any;
    setRegexIfNotUndefine(filter, "Pharse", pharse)
    setIdIfNotUndefine(filter, "Creator", creator);
    setArrObjectIdIfNotUndefine(filter, "Words", words);
    setDateFilter(filter, createdFrom, createdTo);
    const queryPharsese = await PharseModel.find({$or :[filter]});
    var result : PharseDto[] = [];
    queryPharsese.forEach(x => {
        result.push(convertPharseToDto(x));
    });
    return result;
}
export async function updatePharse(pharseId : string, token : TokenInfo, pharse? : string, createdAt? : Date, words? : [string])
{
    const filter : any = {
        _id : new mongoose.Types.ObjectId(pharseId)
    };
    if(token.Role === roleEnumTs.user)
    {
        filter.Creator = new mongoose.Types.ObjectId(token.Id);
    }
    var update = {} as any;
    setValueIfNotUndefine(update, "Pharse", pharse);
    setIdIfNotUndefine(update, "Creator", token.Id);
    setValueIfNotUndefine(update, "CreatedAt", createdAt);
    setValueIfNotUndefine(update, "Words", words);
    const queryPharse = await PharseModel.findOneAndUpdate(filter, update, {new : true});
    if(!queryPharse) throw new Error(NotFoundMessage(entity));
    return convertPharseToDto(queryPharse);
}

export async function deletePharse(pharseId : string, token : TokenInfo){
    if(token.Role === roleEnumTs.user){
        await PharseModel.findOneAndDelete({_id : new mongoose.Types.ObjectId(pharseId), Creator : new mongoose.Types.ObjectId(token.Id)});
    }
    else if(token.Role === roleEnumTs.admin){
        await PharseModel.findOneAndDelete({_id : new mongoose.Types.ObjectId(pharseId)});
    }
}