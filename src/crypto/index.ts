import { ENVIRONMENT } from "../environment";
import { Aes, Aes256Cbc } from "./aes";

function encrypt(payload: any | null) {
    if (payload) {
        const cbc = new Aes256Cbc(ENVIRONMENT.securityToken, ENVIRONMENT.securityIv)
        return Aes.encrypt(JSON.stringify(payload), cbc);
    }

    return null
}

function decrypt<T>(input: string): T {
    const cbc = new Aes256Cbc(ENVIRONMENT.securityToken, ENVIRONMENT.securityIv)
    return JSON.parse(Aes.decrypt(input, cbc)) as T;
}

export { encrypt, decrypt }