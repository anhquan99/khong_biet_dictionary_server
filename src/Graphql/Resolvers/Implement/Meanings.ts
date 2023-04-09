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
        async Meaning(_ : any, {meaning, word, isSlang, speechType, example} : 
            {meaning : string, word: string, isSlang : boolean, speechType : string, example? : [string]}, context : ExpressContextFunctionArgument)
        {
            const token : TokenInfo = Authen(context);
            return await Business.createMeaning(meaning, word, isSlang, speechType, token, example);
        }, 
        async UpdateMeaning(_ : any, {meaningId, meaning, example, createdAt, status, isSlang} : 
            {meaningId : string, meaning? : string, 
                example? : [string], createdAt? : Date, status? : string, isSlang? : boolean}, context :ExpressContextFunctionArgument)
        {
            const token : TokenInfo = Authen(context);
            return await Business.updateMeaning(meaningId, token, meaning, example, createdAt, status, isSlang);
        },
        async DeleteMeaning(_ : any, {meaningId} : {meaningId : string}, context : ExpressContextFunctionArgument){
            const token : TokenInfo = Authen(context);
            await Business.deleteMeaning(meaningId, token);
            return "Success!";
        }
    }
}
export default Meanings;