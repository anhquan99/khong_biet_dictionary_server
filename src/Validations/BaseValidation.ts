import validator from "validator";

export function IsNullOrEmptyString(str : string | null){
    return str === null || str.trim() === '';
}