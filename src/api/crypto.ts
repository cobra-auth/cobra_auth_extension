import { Aes, Aes256Cbc } from "./aes";

async function encrypt(payload: any | null) {
    if (payload) {
        const cbc = await Aes256Cbc.random()
        const body = Aes.encrypt(JSON.stringify(payload), cbc);

        return `0x${cbc.nonce}${Buffer.from(body).toString('hex')}`
    }

    return null
}

async function decrypt<T>(input: string): Promise<T | null> {
    const signature = input.substring(0, 2)
    const nonce = input.substring(2, 4)
    const encrypted = input.substring(4);

    if (signature != '0x') {
        throw Error('invalid signature')
    }

    const cbc = await Aes256Cbc.from(nonce);
    return JSON.parse(Aes.decrypt(Buffer.from(encrypted, 'hex').toString('utf-8'), cbc)) as T;
}

export { encrypt, decrypt }