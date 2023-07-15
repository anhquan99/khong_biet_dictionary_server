const imageValidation = {
    allowedExts : ['gif', 'jpeg', 'jpg', 'png', 'svg', 'blob'],
    allowedMimeTypes : ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/x-png', 'image/png', 'image/svg+xml', 'application/octet-stream'],
};
export function validateImage({filename, mimetype} : {filename : string, mimetype : string}) : boolean{
    if(filename){
        return imageValidation.allowedExts.includes(filename.split('.').pop() as string) 
            && imageValidation.allowedMimeTypes.includes(mimetype);
    }
    return false;
}