import validator from 'validator'
import { roleEnum } from '../Enums/SchemaEnum';
import UserDto from '../Graphql/Dtos/UserDto';

const passwordFormat = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

export function ValidatePassword(password : string) : boolean{
    if(!password.match(passwordFormat)) return false;
    return true;
}
export function ValidateEmail(email : string) : boolean{
    return validator.isEmail(email);
}