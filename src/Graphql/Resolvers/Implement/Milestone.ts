import * as Business from '../../../Business/Implement/Milestone.Business';
import { Authen } from '../../../Middlewares/Auth';
import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';
import { TokenInfo } from '../../../Middlewares/Token';
import { FileUploads } from '../../../Upload';

const Meanings ={
    Query : {
        async Milestone(_ : any, {milestoneId} : {milestoneId : string})
        {
            return await Business.findMilestone(milestoneId);
        },
        async Milestones(_ : any, {title, levelFrom, levelTo, fileName, creator, description, createdFrom, createdTo} : 
            {title? : string, levelFrom? : number, levelTo? : number, fileName? : string, creator? : string, description? : string, createdFrom? : Date, createdTo? : Date})
        {
            return await Business.findMilestones(title, levelFrom, levelTo, fileName, creator, description, createdFrom, createdTo);
        }
    },
    Mutation : {
        async Milestone(_ : any, {title, minLevel, file, description} : 
            {title : string, minLevel : number, file : FileUploads.File, description : string} , context : ExpressContextFunctionArgument)
        {
            const token : TokenInfo = Authen(context);
            return await Business.createMilestone(token, title, minLevel, file, description);
        }, 
        async UpdateMilestone(_ : any, {milestoneId, title, minLevel, file, description} : 
            {milestoneId : string, title? : string, minLevel? : number, file? : FileUploads.File, description? : string}, context :ExpressContextFunctionArgument)
        {
            const token : TokenInfo = Authen(context);
            return await Business.updateMilestone(token, milestoneId, title, minLevel, file, description);
        },
        async DeleteMeaning(_ : any, {milestoneId} : {milestoneId : string}, context : ExpressContextFunctionArgument){
            const token : TokenInfo = Authen(context);
            await Business.deleteMeaning(milestoneId, token);
            return "Success!";
        }
    }
}
export default Meanings;