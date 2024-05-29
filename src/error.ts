export function getErrorMessage(error: string){
    switch (error){
        case "invalid_priv_key": return "Invalid Credentials";
        case "invalid_rec_key": return "Invalid Recovery Code";
        case "not_found": return "User With UID Not Found";
        case "user_already_exists": return "User With UID Already Exists";
        default: return error;
    }
}