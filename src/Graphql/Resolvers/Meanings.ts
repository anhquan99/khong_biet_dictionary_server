import MeaningModel from "../Schema/Meaning";
import mongoose from "mongoose";

async function findMeaning(meaning : string)
{
    const result = await MeaningModel.find({
        Meaning : meaning   
    });
    return result;
}

const Meanings = {
    Query : {
        async findMeaning(_ : any, {meaning} : {meaning : string}){
            const result = await findMeaning(meaning);
            return result;
        }
    },
    Mutation : {

    }
}

export default Meanings;