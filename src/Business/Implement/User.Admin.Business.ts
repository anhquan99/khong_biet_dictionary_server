import bcrypt from 'bcryptjs'
import validator from 'validator';

import UserDto from "../../Graphql/Dtos/User.Dto";
import UserModel from "../../Graphql/Schema/User";
import { FieldIsEmpty } from "../../Enums/ErrorMessageEnum";
import { GenerateToken } from '../../Middlewares/Token';
import { roleEnumTs } from '../../Enums/SchemaEnum';

export async function RegisterAdmin(username : string, email : string, password : string) : Promise<UserDto>
{
    if(validator.isEmpty(password)) throw new Error("Password is empty");
    var salt = await bcrypt.genSalt(Math.floor(Math.random() * 5));
    password = await bcrypt.hash(password, salt);
    const newAdmin = new UserModel({
        Username : username,
        Password : password,
        Email : email,
        Role : roleEnumTs.admin,
        CreatedAt : new Date()
    });
    const newAdminResult = await newAdmin.save();
    const admin : UserDto = {
        Id : newAdminResult._id.toString(),
        Username : newAdminResult.Username,
        Password : newAdminResult.Password,
        Email : newAdminResult.Email,
        Role : newAdminResult.Role,
        Level : newAdminResult.Level,
        Exp : newAdminResult.Exp,
        CreatedAt : newAdminResult.CreatedAt
    }
    return admin;
}