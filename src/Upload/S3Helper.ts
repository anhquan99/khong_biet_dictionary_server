import stream from 'stream'
import fs from 'fs';
import {FileUploads} from './index'
import { PutObjectCommand, S3Client} from '@aws-sdk/client-s3';

type S3Config ={
    accessKeyId : string;
    secretAccessKey : string;
    region : string;
    destinationBucketName : string;
    endpoint : string;
};
type S3UploadStream = {
    writeStream : stream.PassThrough;
    promise : Promise<Any>
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
    async ingleFileUpload(image: FileUpload.File){
        const { createReadStream, filename, mimetype, encoding } = await image;
        const stream = createReadStream();
        const filePath = this.createDestinationFilePath(filename, mimetype,encoding);
        const uploadStream = this.createUploadStream(filePath);
        stream.pipe(uploadStream.writeStream);
        return filename;
    }
    // TODO: recheck this function should be used
    async multipleImageFileUpload(files: FileUploads.File[]){
        await Promise.all(files.map(async (File) => this.ingleFileUpload(file)));
        return files.map(x => x.filename);
    }
    // TODO: create delete function
}
export const S3ConfigTemplate = {
    accessKeyId : env.S3_ACCESS_KEY_ID,
    secretAccessKey : env.S3_SECRET_ACCESS_KEY,
    destinationBucketName : env.S3_BUCKET,
    endpoint : env.S3_ENDPOINT,
    region : env.S3_ENDPOINT
};