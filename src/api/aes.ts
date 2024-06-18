import { AES, enc } from "crypto-js";
import { getSHA256Hash } from "boring-webcrypto-sha256";

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
    readonly nonce: string
    readonly key: string
    readonly iv: string

    constructor(nonce: string, key: string, iv: string) {
        this.nonce = nonce;
        this.key = key;
        this.iv = iv;
    }

    public static random() {
        const nonce = Math.floor(Math.random() * (255 - 1))
        return this.from(`00${nonce.toString(16)}`.slice(-2))
    }

    public static async from(nonce: string) {
        const pass = await getSHA256Hash(nonce);
        const key = pass.substring(0, 32)
        const iv = pass.substring(pass.length - 16, pass.length)

        return new Aes256Cbc(nonce, key, iv)
    }
}