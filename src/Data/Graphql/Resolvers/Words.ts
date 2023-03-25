import WordModel from "../../Schema/Word";
import mongoose from "mongoose";    

export const Words = {
    Query:{
        async findWord(_ : any, {keyword}: {keyword: string}){
            const result = await WordModel.find({Characters: keyword});
            var resultArr = result.map(x => x.Characters);
            return resultArr;
        }
    },
    Mutation:{
        async createWord(_ : any, {newWord}:{newWord : string}){
            const word = new WordModel({
                Characters: newWord,
                CreatedAt: new Date().toISOString(),
                NumberOfSearch: 0,
                IsDictionary: true
            });
            const result = await word.save();
            return result.Characters;
        }
    }
};