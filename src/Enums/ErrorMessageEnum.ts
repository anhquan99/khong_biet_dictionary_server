export function MaxStringLength(fieldName : string, maxLength : number) : string{
    return `The max length of ${fieldName} is ${maxLength}`;
}
export function InvalidField(fieldName : string){
    return `Invalid ${fieldName}`;
}