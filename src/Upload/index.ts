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
        ingleFileUpload: (parent, { file } : { file: File }) => Promise<string>;
        multipleImageFileUpload: (files : File[]) => Promise<string[]>; 
        // TODO: create delete function
    }
}

