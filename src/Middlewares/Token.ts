import jwt from "jsonwebtoken";

import UserDto from "../Graphql/Dtos/User.Dto";
import env from "../Utils/Config";

export interface AuthContext {
    Token? : string
}
export interface TokenInfo {
    Id : string,
    Username : string,
    Role : string,
    CreatedDate : Date
}
export function GenerateToken(user : UserDto) : string
{
    return jwt.sign(
        {
            Id : user.Id,
            Username : user.Username,
            Role : user.Role,
            CreatedDate : new Date()
        },
        env.SECRET_KEY,
        {expiresIn : "1h"}
    );
}