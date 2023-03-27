import UserDto from "../Dtos/UserDto";
import UserModel from "../Schema/User";
import {Login, Register} from '../../Business/User.Business'
const Users = {
    Query : {
        async Login(_ : any, {username, password} : {username : string, password : string}){
            const result = await Login(username, password);
            return result;
        }
    },
    Mutation: {
        async Register(_ : any, {username, password, email} : {username : string, password : string, email : string}){
            const userDto : UserDto = {
                Username : username,
                Password : password,
                Email : email
            };
            return await Register(userDto);
        }
    }
}
export default Users;