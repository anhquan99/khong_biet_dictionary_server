const passwordFormat = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

function validatePassword(password : string){
    if(!password.match(passwordFormat)) return false;
    return true;
}

const UserValidation : Validation<string> = (password : string) => {
    return validatePassword(password);
}
export default UserValidation;