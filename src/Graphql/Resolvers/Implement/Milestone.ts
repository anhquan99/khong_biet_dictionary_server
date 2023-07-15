import * as Business from '../../../Business/Implement/Milestone.Business';
import { Authen } from '../../../Middlewares/Auth';
import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';
import { TokenInfo } from '../../../Middlewares/Token';

const Meanings ={
    Query : {
        async Milestone(_ : any, {milestoneId} : {milestoneId : string})
        {
            return await Business.findMilestone(milestoneId);
        },
        async Milestones(_ : any, {title, levelFrom, levelTo, creator, description, createdFrom, createdTo} : 
            {title? : string, levelFrom? : number, levelTo? : number, creator? : string, description? : string, createdFrom? : Date, createdTo? : Date})
        {
            return await Business.findMilestones(title, levelFrom, levelTo, creator, description, createdFrom, createdTo);
        }
    },
    Mutation : {
        async Milestone(_ : any, {title, minLevel, file, description} : 
            {title : string, minLevel : number, file : any, description : string} , context : ExpressContextFunctionArgument)
        {
            const token : TokenInfo = Authen(context);
            return await Business.createMilestone(token, title, minLevel, file, description);
        }, 
        async UpdateMilestone(_ : any, {milestoneId, title, minLevel, file, description} : 
            {milestoneId : string, title? : string, minLevel? : number, file? : any, description? : string}, context :ExpressContextFunctionArgument)
        {
            const token : TokenInfo = Authen(context);
            return await Business.updateMilestone(token, milestoneId, title, minLevel, file, description);
        },
        async DeleteMilestone(_ : any, {milestoneId} : {milestoneId : string}, context : ExpressContextFunctionArgument){
            const token : TokenInfo = Authen(context);
            await Business.deleteMilestone(token, milestoneId);
            return "Success!";
        }
    }
}
export default Meanings;