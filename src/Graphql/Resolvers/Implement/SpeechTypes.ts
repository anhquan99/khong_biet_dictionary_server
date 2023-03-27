import SpeechTypeModel from "../../Schema/SpeechType";
import mongoose from "mongoose";

async function findSpeechType(speechTypeName : string){
    const result = await SpeechTypeModel.find({
        Name : name
    });
    return result;
}
// async function createSpeechType(speechTypeName : string, creatorId : string){
//     const newSpeechType = new SpeechTypeModel({
//         Name : speechTypeName,
//         // Creator : mongoose.Schema.Types.ObjectId(creatorId),
//         CreatedAt : new Date().toISOString()
//     });
//     await newSpeechType.save();
//     return newSpeechType;
// }

const SpeechTypes = {
    Query : {
        async findSpeechType(_ : any, {speechTypeName} : {speechTypeName : string}){
            const result = await findSpeechType(speechTypeName);
            return result;
        }
    },
    Mutation : {
    //     async createSpeechType(_ : any, {speechTypeName} : {speechTypeName : string}){
    //         const result = await createSpeechType(speechTypeName, "001");
    //         return result;
    //     }
    }
}

export default SpeechTypes;