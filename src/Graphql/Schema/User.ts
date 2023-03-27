import { validate } from 'graphql';
import {model, Schema} from 'mongoose';

import { MaxStringLength, InvalidField, MinStringLength } from '../../Enums/ErrorMessageEnum';
import { ValidateEmail, ValidatePassword } from '../../Validations/UserValidation';
import { roleEnum, _maxStringLength, _minStringLength } from '../../Enums/SchemaEnum';



const userSchema = new Schema({
    Username: {
        type: String,
        require: true,
        minLength : [_minStringLength, MinStringLength("username", _minStringLength)],
        maxLength : [_maxStringLength, MaxStringLength("username", _maxStringLength)],
        unique: true,
    },
    Email:{
        type: String,
        require: true,
        maxLength: [_maxStringLength, MaxStringLength("email", _maxStringLength)],
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
        require : true,
        minLength : [7, MinStringLength("password", 7)],
        maxLength : [_maxStringLength, MaxStringLength("password", _maxStringLength)],
        validate : {
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