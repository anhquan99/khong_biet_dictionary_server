export function MaxStringLength(fieldName : string, maxLength : number) : string{
    return `The max length of ${fieldName} is ${maxLength}`;
}
export function MinStringLength(fieldName : string, minLength : number) : string{
    return `The min length of ${fieldName} is ${minLength}`;
}
export function InvalidField(fieldName : string){
    return `Invalid ${fieldName}`;
}
export const UserNotFound = "User not found!";
export function FieldIsEmpty(fieldName : string) : string {
    return `${fieldName} can not be empty!`;
}