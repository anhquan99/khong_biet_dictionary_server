import UserDto from "../../Dtos/UserDto";
import UserModel from "../../Schema/User";
import {Login, Register} from '../../../Business/Implement/User.Business';
import { GenerateToken } from "../../../Middlewares/Token";
const Users = {
    Query : {
        async Login(_ : any, {username, password} : {username : string, password : string}){
            const user = await Login(username, password);
            const token = GenerateToken(user);
            return token;
        }
    },
    Mutation: {
        async Register(_ : any, {username, password, email} : {username : string, password : string, email : string}){
            const user = await Register(username, password, email);
            const token = GenerateToken(user);
            return token;
        }
    }
}
export default Users;