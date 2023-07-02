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
import { NotFoundMessage, PermissionDenied, InvalidImage, ImageProcessFailed } from "../../Enums/ErrorMessageEnum";
import { FileUploads } from "../../Upload";
import { S3Helper, S3ConfigTemplate } from "../../Upload/S3Helper";
import { validateImage } from "../../Validations/ImageValidation";

const entity = "Milestone";

export async function createMilestone(token : TokenInfo, title : string, minLevel : number, file : FileUploads.File, description? : string)
{
    if(token.Role !== roleEnumTs.admin) throw new Error(PermissionDenied);
    const s3Helper = new S3Helper(S3ConfigTemplate);
    const {filename, mimetype} =  (await file).file;
    if(!validateImage({filename, mimetype})){
        throw new Error(InvalidImage);
    }
    const timeStampFileName = Date.now() + '.' + filename.split('.').pop();
    const newMilestone = new MilestoneModel({
        Title : title,
        MinLevel : minLevel,
        File : timeStampFileName,
        Creator : token.Id,
        CreatedAt : new Date()
    });
    if(description !== undefined){
        newMilestone.Description = description;
    }
    const result = await newMilestone.save();
    try{
        await s3Helper.singleFileUpload(file, timeStampFileName);
    }
    catch(err){
        console.error(err);
        newMilestone.delete();
        throw new Error(ImageProcessFailed);
    }
    return convertMilestoneToDto(result);
}
export async function findMilestone(milestoneId : string){
    const milestone = await MilestoneModel.findById(milestoneId);
    return convertMilestoneToDto(milestone);
}

export async function findMilestones(title? : string, levelFrom? : number, levelTo? : number, creator? : string, description? : string, createdFrom? : Date, createdTo? : Date)
{
    var filter = {} as any;
    setRegexIfNotUndefine(filter, "Title", title);
    setNumberRangeIfNotUndefine(filter, "MinLevel", levelFrom, levelTo);
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
export async function updateMilestone(token : TokenInfo, milestoneId : string, title? : string, minLevel? : number, file? : FileUploads.File, description? : string)
{
    if(token.Role !== roleEnumTs.admin) throw new Error(PermissionDenied);

    const oldMilestone = await MilestoneModel.findById(milestoneId);
    if(!oldMilestone) throw new Error(NotFoundMessage(entity));
    
    const filter = {
        _id : new mongoose.Types.ObjectId(milestoneId)
    }
    var update = {} as any;
    setValueIfNotUndefine(update, "Title", title);
    setValueIfNotUndefine(update, "MinLevel", minLevel);
    
    const {filename, mimetype} = await file;
    if(file){
        if(validateImage({filename, mimetype})){
            throw new Error(InvalidImage);
        }
        const s3Helper = new S3Helper(S3ConfigTemplate);
        const timeStampFileName = Date.now() + '.' + filename.split('.').pop();
        await s3Helper.singleFileUpload(file, timeStampFileName);
        await s3Helper.removeFile(oldMilestone.FileName);
        setValueIfNotUndefine(update, "File", timeStampFileName);
    }
    setValueIfNotUndefine(update, "Description", description);
    
    const updateMilestone = await MilestoneModel.findOneAndUpdate(filter, update, {new : false});
    if(!updateMilestone) throw new Error(NotFoundMessage(entity));
    return convertMilestoneToDto(updateMilestone);
}
export async function deleteMilestone(token : TokenInfo, milestoneId : string){
    if(token.Role !== roleEnumTs.admin) throw new Error(PermissionDenied);
    const milestone = await MilestoneModel.findOneAndDelete({_id : new mongoose.Types.ObjectId(milestoneId)});
    if(milestone){
       const s3Helper = new S3Helper(S3ConfigTemplate);
       s3Helper.removeFile(milestone.File); 
    }
    else{
        throw new Error(NotFoundMessage(entity));
    }
}