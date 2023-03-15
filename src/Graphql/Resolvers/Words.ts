import { WordModel } from "../../Schema/Word";
import mongoose from "mongoose";

export const Words = {
    Query: {
        findWord: () => {
            return 'hello world';
        }
    },
    Mutation: {
        createWorld: (word: string): string => {
            return word;
        }
    }
}