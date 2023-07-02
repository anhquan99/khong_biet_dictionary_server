const imageValidation = {
    allowedExts : ['gif', 'jpeg', 'jpg', 'png', 'svg', 'blob'],
    allowedMimeTypes : ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/x-png', 'image/png', 'image/svg+xml', 'application/octet-stream'],
};
export function validateImage({filename, mimetype} : {filename : string, mimetype : string}) : boolean{
    return imageValidation.allowedExts.includes(filename.split('.').pop()) 
        && imageValidation.allowedMimeTypes.includes(mimetype);
}