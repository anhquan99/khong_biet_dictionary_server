import PharseModel from "../../Graphql/Schema/Pharse";
import { PharseDto, convertPharseToDto } from "../../Graphql/Dtos/Pharse.Dto";
import mongoose from "mongoose";
import { setDateFilter, setValueIfNotUndefine, setRegexIfNotUndefine, setArrObjectIdIfNotUndefine, setIdIfNotUndefine } from "../../Utils/FilterHelper";
import { NotFoundMessage } from "../../Enums/ErrorMessageEnum";

const entity = "Pharse";

export async function createPharse(pharse : string, creator : string, words : [string]){
   const newPhrase = new PharseModel({
        Pharse : pharse,
        Creator : new mongoose.Types.ObjectId(creator),
        CreatedAt : new Date(),
        Words : words.map((item) => new mongoose.Types.ObjectId(item)) 
   });
   const result = await newPhrase.save();
   return convertPharseToDto(result);
}
export async function findPharse(pharseId : string){
    const result = await PharseModel.find({_id : new mongoose.Types.ObjectId(pharseId)});
    return convertPharseToDto(result);
}
export async function findPharses(pharse? : string, creator? : string, createdFrom? : Date, createdTo? : Date, words? : [string]) {
    var filter = {} as any;
    setRegexIfNotUndefine(filter, "Pharse", pharse)
    setValueIfNotUndefine(filter, "Creator", new mongoose.Types.ObjectId(creator));
    setArrObjectIdIfNotUndefine(filter, "Words", words);
    setDateFilter(filter, createdFrom, createdTo);
    const queryPharsese = await PharseModel.find({$or :[filter]});
    var result : PharseDto[] = [];
    queryPharsese.forEach(x => {
        result.push(convertPharseToDto(x));
    });
    return result;
}
export async function updatePharse(pharseId : string, creator : string, pharse? : string, createdAt? : Date, words? : [string])
{
    const filter = {
        _id : new mongoose.Types.ObjectId(pharseId),
        Creator : new mongoose.Types.ObjectId(creator)
    };
    var update = {} as any;
    setValueIfNotUndefine(update, "Pharse", pharse);
    setIdIfNotUndefine(update, "Creator", creator);
    setValueIfNotUndefine(update, "CreatedAt", createdAt);
    setValueIfNotUndefine(update, "Words", words);
    const queryPharse = await PharseModel.findOneAndUpdate(filter, update, {new : true});
    if(!queryPharse) throw new Error(NotFoundMessage(entity));
    return convertPharseToDto(queryPharse);
}

export async function deletePharse(pharseId : string, creator : string){
    await PharseModel.findOneAndDelete({_id : pharseId, Creator : new mongoose.Types.ObjectId(creator)});
}