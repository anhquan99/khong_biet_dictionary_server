import { WordModel } from "../../Schema/Word";
import mongoose from "mongoose";    

export const resolvers = {
    Query:{
        async findWord(): Promise<string> {
            return "Hello";
        }
    },
    Mutation:{
        async createWord(_ : any, {newWord}:{newWord : string}): Promise<string>{
            console.log(newWord);
            return newWord;
        }
    }
};