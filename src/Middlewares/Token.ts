import jwt from "jsonwebtoken";

import UserDto from "../Graphql/Dtos/User.Dto";
import env from "../Utils/Config";

export interface AuthContext {
    Token? : string
}
export interface TokenInfo {
    Id : string,
    Username : string,
    Role : string
}
export function GenerateToken(user : UserDto) : string
{
    return jwt.sign(
        {
            id : user.Id,
            username : user.Username,
            role : user.Role    
        },
        env.SECRET_KEY,
        {expiresIn : "1h"}
    );
}