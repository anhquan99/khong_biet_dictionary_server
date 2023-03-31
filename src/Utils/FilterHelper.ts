import mongoose from "mongoose";

export function setValueIfNotUndefine(obj : any, field : string, value : any){
    if(value !== undefined) obj[field] = value;
}
export function setDateFilter(filter : any, createdFrom? : Date, createdTo? : Date){
    if(createdFrom !== undefined){
        filter.CreatedAt = {
            $gte : createdFrom
        };
        if(createdTo !== undefined) {
            filter.CreatedAt.$lte = createdTo;
        }
    }
    else if(createdTo !== undefined){
        filter.CreatedAt = {
            $lte : createdTo
        };
    }
}
export function setRegexIfNotUndefine(obj : any, field : string, value? : string){
    if(value !== undefined) return obj[field] = {$regex : new RegExp(value as string, 'i')};
}
export function setArrObjectIdIfNotUndefine(obj : any, field : string, value? : [string]){
    if(value !== undefined) return obj[field] = value.map(x => new mongoose.Types.ObjectId(x));
}
export function setIdIfNotUndefine(obj : any, field : string, value? : string){
    if(value !== undefined) return new mongoose.Types.ObjectId(value);
}