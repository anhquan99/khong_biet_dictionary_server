import bcrypt from 'bcryptjs'

import UserDto from "../Graphql/Dtos/UserDto";
import UserModel from "../Graphql/Schema/User";
import { FieldIsEmpty, UserNotFound } from "../Enums/ErrorMessageEnum";
import { GenerateToken } from '../Middlewares/Token';
import { roleEnumTs } from '../Enums/SchemaEnum';

// export async function findUser(user :  UserDto)
// {
//     const result = await UserModel.find({
//         _id : user.Id,
//         Username : user.Username,
//         Email : user.Email,
//         Role : user.Role,
//         Level : user.Level,
//         Exp : user.Exp
//     });
//     return result;
// }
export async function Register(User : UserDto){
    if(User.Password == undefined) throw new Error("Password is undefined!");
    var salt = await bcrypt.genSalt(Math.floor(Math.random() * 5));
    User.Password = await bcrypt.hash(User.Password, salt);
    const newUser = new UserModel({
        Username : User.Username,
        Password : User.Password,
        Email : User.Email,
        Role : roleEnumTs.user,
        Level : 0,
        Exp : 0,
        CreatedAt : new Date().toISOString()
    });
    const createNewUserResult = await newUser.save();
    User.Id = newUser._id.toString();
    const token = GenerateToken(User);
    return token;
}
export async function Login(username : string, password : string){
    const existedUser = await UserModel.findOne({ Username : username}) as any;
    if(existedUser === undefined || existedUser === null){
        throw new Error(UserNotFound);
    }
    const isPasswordMatch = await bcrypt.compare(password, existedUser.Password);
    if(!isPasswordMatch){
        throw new Error(UserNotFound);
    }
    const user : UserDto = {
        Id : existedUser.Id,
        Username : existedUser.Username,
        Role : existedUser.Role
    };
    var token = GenerateToken(user);
    return token;
}