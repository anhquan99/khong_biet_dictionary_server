import {ExpressContextFunctionArgument} from '@apollo/server/express4';
import jwt from 'jsonwebtoken';

import UserDto from '../Graphql/Dtos/UserDto';
import { TokenInfo } from './Token';
import env from '../Utils/Config';

function Authen(context : ExpressContextFunctionArgument ) : TokenInfo | null{
    const token = context.req.headers.authorization;
    if(token)
    {
        try{
            const userInfo = jwt.verify(token, env.SECRET_KEY) as TokenInfo;
        }
        catch(err){
            console.log(err);
            return null;
        }
    }
    return null;
}
