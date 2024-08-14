import { AES, enc } from "crypto-js";

export class Aes {
    static encrypt(input: string, cbc: Aes256Cbc) {
        let payload = AES.encrypt(input, enc.Utf8.parse(cbc.key), {
            iv: enc.Utf8.parse(cbc.iv)
        }).toString()

        return payload
    }

    static decrypt(input: string, cbc: Aes256Cbc) {
        const payload = AES.decrypt(input, enc.Utf8.parse(cbc.key), {
            iv: enc.Utf8.parse(cbc.iv)
        }).toString(enc.Utf8)

        return payload
    }
}

export class Aes256Cbc {
    readonly key: string
    readonly iv: string

    constructor(key: string, iv: string) {
        this.key = key.substring(0, 32);
        this.iv = iv.substring(iv.length - 16);
    }
}