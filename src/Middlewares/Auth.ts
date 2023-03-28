import {ExpressContextFunctionArgument} from '@apollo/server/express4';
import jwt from 'jsonwebtoken';

import UserDto from '../Graphql/Dtos/User.Dto';
import { TokenInfo } from './Token';
import env from '../Utils/Config';
import { roleEnumTs } from '../Enums/SchemaEnum';
import { LoginRequired, PermissionDenied } from '../Enums/ErrorMessageEnum';

export function Authen(context : ExpressContextFunctionArgument ) : TokenInfo{
    const token = context.req.headers.authorization;
    if(token)
    {
        const userInfo = jwt.verify(token, env.SECRET_KEY) as TokenInfo;
    }
    throw new Error(LoginRequired)
}
export function AuthenAdmin(context : ExpressContextFunctionArgument) : TokenInfo{
    const token = context.req.headers.authorization;
    if(token)
    {
        const adminInfo = jwt.verify(token, env.SECRET_KEY) as TokenInfo;
        if(adminInfo.Role !== roleEnumTs.admin) throw new Error(PermissionDenied);
        return adminInfo;
    }
    throw new Error(LoginRequired);
}