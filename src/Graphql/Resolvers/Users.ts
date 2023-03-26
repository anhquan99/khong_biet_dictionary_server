import UserDto from "../Dtos/UserDto";
import UserModel from "../Schema/User";

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