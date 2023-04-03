import * as Business from '../../../Business/Implement/Meaning.Business';
import { Authen } from '../../../Middlewares/Auth';
import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';
import { TokenInfo } from '../../../Middlewares/Token';

const Meanings ={
    Query : {
        async Meaning(_ : any, {meaningId} : {meaningId : string})
        {
            return await Business.findMeaning(meaningId);
        },
        async Meanings(_ : any, {meaning, creator, word, createdFrom, createdTo, status, isSlang, speechType} : 
            {meaning? : string, creator? : string, word? : string, createdFrom? : Date, createdTo? : Date, status? : string, isSlang? : boolean, speechType? : string})
        {
            return await Business.findMeanings(meaning, creator, word, createdFrom, createdTo, status, isSlang, speechType);
        }
    },
    Mutation : {
        async Meaing(_ : any, {meaing, word, isSlang, speechType, example} : 
            {meaing : string, word: string, isSlang : boolean, speechType : string, example? : [string]}, context : ExpressContextFunctionArgument)
        {
            const user : TokenInfo = Authen(context);
            return await Business.createMeaning(meaing, word, isSlang, speechType, user.Id, user.Role, example);
        }, 
        async UpdateMeaning(_ : any, {meaningId, meaning, example, createdAt, status, isSlang} : 
            {meaningId : string, meaning? : string, 
                example? : [string], createdAt? : Date, status? : string, isSlang? : boolean}, context :ExpressContextFunctionArgument)
        {
            const user : TokenInfo = Authen(context);
            return await Business.updateMeaning(meaningId, user.Id, meaning, example, createdAt, status, isSlang);
        },
        async DeleteMeaing(_ : any, {meaingId} : {meaingId : string}, context : ExpressContextFunctionArgument){
            const user : TokenInfo = Authen(context);
            await Business.deleteMeaning(meaingId, user.Id);
            return "Success!";
        }
    }
}
export default Meanings;