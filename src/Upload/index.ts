import {ReadStream} from 'fs';
import env from '../Utils/Config';
export namespace FileUploads{
    export type File = {
        filename: string;
        mimetype: string;
        encoding: string;
        stream: createReadStream
    }
    export interface IUploader {
        singleFileUpload: (file : File, timeStampFileName : string) => Promise<string>;
        removeFile :(fileName : string) => Promise<string>;
    }
}

