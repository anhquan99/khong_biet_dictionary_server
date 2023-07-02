import { validate } from 'graphql';
import {model, Schema} from 'mongoose';

import { MaxStringLength, InvalidField, MinStringLength } from '../../Enums/ErrorMessageEnum';
import { validateEmail, validatePassword } from '../../Validations/UserValidation';
import { roleEnum, _maxStringLength, _minStringLength } from '../../Enums/SchemaEnum';



const userSchema = new Schema({
    Username: {
        type: String,
        required: true,
        minLength : [_minStringLength, MinStringLength("username", _minStringLength)],
        maxLength : [_maxStringLength, MaxStringLength("username", _maxStringLength)],
        unique: true,
    },
    Email:{
        type: String,
        required: true,
        maxLength: [_maxStringLength, MaxStringLength("email", _maxStringLength)],
        unique: true,
        validate:{
            validator: (email : string) => {
                return validateEmail(email);
            },
            message: InvalidField("email address")
        }
    },  
    Password: {
        type: String,
        required : true,
        minLength : [7, MinStringLength("password", 7)],
        maxLength : [_maxStringLength, MaxStringLength("password", _maxStringLength)],
        validate : {
            validator: (password: string) => {
                return validatePassword(password);
            }
        }
    },
    Role: {
        type: String,
        enum:{
            values: roleEnum,
            message: "{VALUE} not supported!"
        },
        required: true
    },
    Level: {
        type: Number,
        required: false,
        min : 0,
        default : 0
    },
    Exp: {
        type: Number,
        required: false,
        min : 0,
        default : 0
    },
    CreatedAt: {
        type: Date,
        required: true
    },
    isDeleted:{
        type: Boolean,
        required: true,
        default : false
    }
});

const UserModel = model("User", userSchema);
export default UserModel;