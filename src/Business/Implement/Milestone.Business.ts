import mongoose, { mongo, set } from "mongoose";
import MilestoneModel from "../../Graphql/Schema/Milestone";
import { MilestoneDto,convertMilestoneToDto } from "../../Graphql/Dtos/Milestone.Dto";
import { TokenInfo } from "../../Middlewares/Token";
import { setValueIfNotUndefine } from "../../Utils/FilterHelper";
import { setNumberRangeIfNotUndefine } from "../../Utils/FilterHelper";
import { setIdIfNotUndefine } from "../../Utils/FilterHelper";
import { setRegexIfNotUndefine } from "../../Utils/FilterHelper";
import { setDateFilter } from "../../Utils/FilterHelper";
import { roleEnumTs } from "../../Enums/SchemaEnum";
import { NotFoundMessage, PermissionDenied } from "../../Enums/ErrorMessageEnum";

const entity = "Milestone";

export async function createMilestone(token : TokenInfo, title : string, minLevel : number, fileName : string, description? : string)
{
    if(token.Role !== roleEnumTs.admin) throw new Error(PermissionDenied);
    const newMilestone = new MilestoneModel({
        Title : title,
        MinLevel : minLevel,
        FileName : fileName,
        Creator : token.Id,
        CreatedAt : new Date()
    });
    if(description !== undefined){
        newMilestone.Description = description;
    }
    const result = await newMilestone.save();
    return convertMilestoneToDto(result);
}
export async function findMilestone(milestoneId : string){
    const milestone = await MilestoneModel.findById(milestoneId);
    return convertMilestoneToDto(milestone);
}

export async function findMilestones(tile? : string, levelFrom? : number, levelTo? : number, fileName? : string, creator? : string, description? : string, createdFrom? : Date, createdTo? : Date)
{
    var filter = {} as any;
    setRegexIfNotUndefine(filter, "Title", tile);
    setNumberRangeIfNotUndefine(filter, "MinLevel", levelFrom, levelTo);
    setValueIfNotUndefine(filter, "FileName", fileName);
    setIdIfNotUndefine(filter, "Creator", creator);
    setRegexIfNotUndefine(filter, "Description", description);
    setDateFilter(filter, createdFrom, createdTo);
    const milestones = await MilestoneModel.find({$or : [filter]});
    const result : MilestoneDto[] = [];
    milestones.forEach(x => {
        result.push(convertMilestoneToDto(x));
    });
    return result;
}
export async function updateMilestone(token : TokenInfo, milestoneId : string, title? : string, minLevel? : number, fileName? : string, description? : string)
{
    if(token.Role !== roleEnumTs.admin) throw new Error(PermissionDenied);
    const filter = {
        _id : new mongoose.Types.ObjectId(milestoneId)
    }
    var update = {} as any;
    setValueIfNotUndefine(update, "Title", title);
    setValueIfNotUndefine(update, "MinLevel", minLevel);
    setValueIfNotUndefine(update, "FileName", fileName);
    setValueIfNotUndefine(update, "Description", description);
    const updateMilestone = await MilestoneModel.findOneAndUpdate(filter, update, {new : true});
    if(!updateMilestone) throw new Error(NotFoundMessage(entity));
    return convertMilestoneToDto(updateMilestone);
}
export async function deleteMilestone(token : TokenInfo, milestoneId : string){
    if(token.Role !== roleEnumTs.admin) throw new Error(PermissionDenied);
    await MilestoneModel.findOneAndDelete({_id : new mongoose.Types.ObjectId(milestoneId)});
}