import bcrypt from 'bcryptjs'
import validator from 'validator';

import UserDto from "../../Graphql/Dtos/User.Dto";
import UserModel from "../../Graphql/Schema/User";
import { FieldIsEmpty, UserNotFound } from "../../Enums/ErrorMessageEnum";
import { GenerateToken } from '../../Middlewares/Token';
import { roleEnumTs } from '../../Enums/SchemaEnum';

export async function Register(username : string, email : string, password : string) : Promise<UserDto>{
    if(validator.isEmpty(password)) throw new Error("Password is empty!");
    var salt = await bcrypt.genSalt(Math.floor(Math.random() * 5));
    password = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
        Username : username,
        Password : password,
        Email : email,
        Role : roleEnumTs.user,
        Level : 0,
        Exp : 0,
        CreatedAt : new Date()
    });
    const newUserResult = await newUser.save();
    const user : UserDto = {
        Id : newUserResult._id.toString(),
        Username : newUserResult.Username,
        Password : newUserResult.Password,
        Email : newUserResult.Email,
        Role : newUserResult.Role,
        Level : newUserResult.Level,
        Exp : newUserResult.Exp,
        CreatedAt : newUserResult.CreatedAt
    }
    return user;
}
export async function Login(username : string, password : string) : Promise<UserDto>{
    const existedUser = await UserModel.findOne({ Username : username});
    if(existedUser === undefined || existedUser === null){
        throw new Error(UserNotFound);
    }
    const isPasswordMatch = await bcrypt.compare(password, existedUser.Password as string);
    if(!isPasswordMatch){
        throw new Error(UserNotFound);
    }
    const user : UserDto = {
        Id : existedUser._id.toString(),
        Username : existedUser.Username,
        Role : existedUser.Role
    };
    return user;
}