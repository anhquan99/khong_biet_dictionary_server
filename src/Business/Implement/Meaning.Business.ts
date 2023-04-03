import MeaningModel from "../../Graphql/Schema/Meaning";
import { MeaningDto, convertMeaningToDto } from "../../Graphql/Dtos/Meaning.Dto";
import { TokenInfo } from "../../Middlewares/Token";
import mongoose from "mongoose";
import { roleEnumTs, statusEnumTs } from "../../Enums/SchemaEnum";
import { NotFoundMessage } from "../../Enums/ErrorMessageEnum";

const entity = "Meaning";

export async function createMeaning(meaning : string, word : string, isSlang : boolean, speechType : string, exmaple : [string], creator : string, role : string){
    const newMeaning = new MeaningModel({
        Meaning : meaning,
        Creator : new mongoose.Types.ObjectId(creator),
        Word : new mongoose.Types.ObjectId(word),
        Example : exmaple,
        Status : role === roleEnumTs.admin ? statusEnumTs.approved : statusEnumTs.submitted,
        IsSlang : isSlang,
        SpeechType : new mongoose.Types.ObjectId(speechType)
    });
    const result = await newMeaning.save();
    return convertMeaningToDto(result);
}
export async function findMeaning(meaningId : string){
    const result = MeaningModel.findOne({_id : new mongoose.Types.ObjectId(meaningId)});
    return convertMeaningToDto(result);
}