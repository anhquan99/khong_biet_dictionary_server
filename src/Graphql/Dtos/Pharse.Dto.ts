import mongoose from "mongoose";
import { WordDto } from "./Word.Dto";

export interface PharseDto{
    Id? : string,
    Pharse? : string,
    Creator? : string,
    CreatedAt? : Date,
    Words : [string]
}
export function convertPharseToDto(pharse : any) : PharseDto{
    return {
        Id : pharse._id.toString(),
        Pharse : pharse.Pharse,
        Creator : pharse.Creator._id.toString(),
        CreatedAt : pharse.CreatedAt,
        Words : pharse.Words.map((item : mongoose.Types.ObjectId) => item._id.toString())
    }
}