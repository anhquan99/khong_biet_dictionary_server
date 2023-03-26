import { validate } from 'graphql';
import {model, Schema} from 'mongoose';

import { MaxStringLength, InvalidField } from '../../Enums/ErrorMessageEnum';
import { ValidateEmail, ValidatePassword } from '../../Validations/UserValidation';
import { roleEnum, _maxStringLength } from '../../Enums/SchemaEnum';



const userSchema = new Schema({
    Username: {
        type: String,
        require: [true, "Username is required"],
        max: [_maxStringLength, MaxStringLength("username", _maxStringLength)],
        unique: true,
    },
    Email:{
        type: String,
        require: true,
        max: [_maxStringLength, MaxStringLength("email", _maxStringLength)],
        unique: true,
        validate:{
            validator: (email : string) => {
                return ValidateEmail(email);
            },
            message: InvalidField("email address")
        }
    },
    Password: {
        type: String,
        require: [ true, "Password is required!"],
        minLength: 7,
        max : [_maxStringLength, MaxStringLength("password", _maxStringLength)],
        validate: {
            validator: (password: string) => {
                return ValidatePassword(password);
            }
        }
    },
    Role: {
        type: String,
        enum:{
            values: roleEnum,
            message: "{VALUE} not supported!"
        },
        require: true
    },
    Level: {
        type: Number,
        require: false,
        min : 0,
        default : 0
    },
    Exp: {
        type: Number,
        require: false,
        min : 0,
        default : 0
    },
    CreatedAt: {
        type: String,
        require: true
    },
    isDeleted:{
        type: Boolean,
        require: true,
    }
});

const UserModel = model("User", userSchema);
export default UserModel;