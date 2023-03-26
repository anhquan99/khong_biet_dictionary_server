import bcrypt from 'bcryptjs'

import UserDto from "../Dtos/UserDto";
import UserModel from "../Schema/User";
import { FieldIsEmpty, UserNotFound } from "../../Enums/ErrorMessageEnum";
import { GenerateToken } from '../../Middlewares/Token';
import { IsNullOrEmptyString } from '../../Validations/BaseValidation';

async function findUser(user :  UserDto)
{
    const result = await UserModel.find({
        _id : user.Id,
        Username : user.Username,
        Email : user.Email,
        Role : user.Role,
        Level : user.Level,
        Exp : user.Exp
    });
    return result;
}
async function createUser(user : UserDto){
    const newUser = new UserModel({
        Username : user.Username,
        Email : user.Email,
        Role : user.Role,
        Level : user.Level,
        Exp : user.Exp,
        CreatedAt : new Date().toISOString()
    });
    const result = await newUser.save();
    return result;
}
async function Login(username : string, password : string){
    var emptyFieldName = IsNullOrEmptyString(username) ? "Username" : "";
    emptyFieldName += IsNullOrEmptyString(password) ? (IsNullOrEmptyString(emptyFieldName) ? "Password" : " and password") : "";
    if(!IsNullOrEmptyString(emptyFieldName))
    {
        throw new Error(FieldIsEmpty(emptyFieldName));
    }
    const existedUser = await UserModel.findOne({ Username : username}) as any;
    if(!existedUser){
        throw new Error(UserNotFound);
    }
    const isPasswordMatch = bcrypt.compare(password, existedUser.Password);
    if(!isPasswordMatch){
        throw new Error(UserNotFound);
    }
    const user : UserDto = {
        Id : existedUser.Id,
        Username : existedUser.Username,
        Role : existedUser.Role
    };
    var token = GenerateToken(user);
}
const Users = {
    Query : {
        async findUser(_ : any, {username, email, role, level, exp} : 
                                {username? : string,  email? : string, role? : string, level? : number, exp? : number}){
            const userDto : UserDto = {
                Username : username,
                Email : email,
                Role : role,
                Level : level,
                Exp : exp
            };
            const result = await findUser(userDto);
            return result;
        },
        async Login(_ : any, {username, password} : {username : string, password : string}){
            const result = await Login(username, password);
        }
    },
    Mutation: {
        async createUser(_ : any, {username, password} : {username : string, password : string}){
            const userDto : UserDto = {
                Username : username,
                Password : password
            };
            const result = await createUser(userDto);
            return result;
        }
    }
}
export default Users;