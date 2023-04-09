export const roleEnum = ["admin", "user"];
export enum roleEnumTs {
    admin = "admin",
    user = "user"
};
export const _maxStringLength : number = 500;
export const _minStringLength : number  = 1;

export const statusEnum = ["submitted", "approved", "rejected", "deleted", "reported"];
export enum statusEnumTs {
    submitted = "submitted",
    approved = "approved",
    rejected = "rejected",
    deleted = "deleted",
    reported = "rejected"
};

export function setStatusBaseOnRole(role : string) : string
{
    return role === roleEnumTs.admin ? statusEnumTs.approved : statusEnumTs.submitted;
}

export const BookmarkTypeEnum = ["Word", "Meaning", "Pharse"];