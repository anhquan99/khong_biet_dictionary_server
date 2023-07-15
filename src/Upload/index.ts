import {ReadStream} from 'fs';
import env from '../Utils/Config';

export interface IUploader {
    singleFileUpload: (file : File, timeStampFileName : string) => Promise<string>;
    removeFile :(fileName : string) => Promise<void>;
}