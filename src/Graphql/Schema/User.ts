import { validate } from 'graphql';
import {model, Schema} from 'mongoose';
import UserValidation from '../../Validations/UserValidation';

const maxStringLength : number = 500;
const emailFormat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const roleEnum = ["admin", "user"];

const userSchema = new Schema({
    Username: {
        type: String,
        require: [true, "Username is required"],
        max: [maxStringLength, `The max length of username is ${maxStringLength}`],
        unique: true,
    },
    Email:{
        type: String,
        require: true,
        max: [maxStringLength, `The max length of email is ${maxStringLength}`],
        unique: true,
        validate:{
            validator: (email : string) => {
                return email.match(emailFormat);
            },
            message: "Invalid email address!"
        }
    },
    Password: {
        type: String,
        require: [ true, "Password is required!"],
        validate: {
            validator: (password: string) => {
                return UserValidation(password);
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
    },
    Exp: {
        type: Number,
        require: false
    },
    isDeleted:{
        type: Boolean,
        require: true,
    }
});

const UserModel = model("User", userSchema);
export default UserModel;