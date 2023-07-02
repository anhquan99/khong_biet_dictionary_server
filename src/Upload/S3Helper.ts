import stream from 'stream'
import fs from 'fs';
import {FileUploads} from './index'
import { DeleteObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import env from '../Utils/Config';

type S3Config ={
    accessKeyId : string;
    secretAccessKey : string;
    region : string;
    destinationBucketName : string;
    endpoint : string;
};
type S3UploadStream = {
    writeStream : stream.PassThrough;
    promise : Promise<Any>;
};  
export class S3Helper implements FileUploads.IUploader{
    private s3: S3Client;
    public config : S3Config;

    constructor(config: S3Config){
        this.config = config;

        this.s3 = new S3Client({
            region : this.config.region,
            credentials:{
                accessKeyId : this.config.accessKeyId,
                secretAccessKey : this.config.secretAccessKey,
            },
            endpoint : this.config.endpoint,
            forcePathStyle: true,
        });
    }
    private createUploadStream(key : string) : S3UploadStream{
        const pass = new stream.PassThrough();
        const command = new PutObjectCommand({
            Bucket : this.config.destinationBucketName,
            Key : key,
            Body : pass
        });
        return {
            writeStream : pass,
            promise: this.s3.send(command)
        };
    }
    private createDestinationFilePath(
        filename : string,
        mimetype : string,
        encoding : srting
    ): string{
        return filename;
    }
    async singleFileUpload(file: FileUpload.File, timeStampFileName : string){
        const { createReadStream, filename, mimetype, encoding } = (await file).file;
        const stream = createReadStream();
        const filePath = this.createDestinationFilePath(timeStampFileName, mimetype,encoding);
        const uploadStream = this.createUploadStream(filePath);
        stream.pipe(uploadStream.writeStream);
        await uploadStream.promise;
        return timeStampFileName;
    }
    async removeFile(fileName: string){
        const command = new DeleteObjectCommand({
            Bucket : this.config.destinationBucketName,
            Key : fileName
        });
        try{
            await this.s3.send(command);
        }
        catch(err){
            console.error(err);
        }
    }
}
export const S3ConfigTemplate = {
    accessKeyId : env.S3_ACCESS_KEY_ID,
    secretAccessKey : env.S3_SECRET_ACCESS_KEY,
    destinationBucketName : env.S3_BUCKET,
    endpoint : env.S3_ENDPOINT,
    region : env.S3_REGION
};