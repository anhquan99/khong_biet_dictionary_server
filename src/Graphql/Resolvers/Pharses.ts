import PharseModel from "../Schema/Pharse";
import mongoose from "mongoose";

async function findPharse(pharse : string){
    const result = await PharseModel.find({
        Pharse : pharse
    });
    return result;
}

const Pharses = {
    Query : {
        async findPharse(_ : any, {pharse} : {pharse : string}){
            const result = await findPharse(pharse);
            return result;
        }
    },
    Mutation : {

    }
}

export default Pharses;