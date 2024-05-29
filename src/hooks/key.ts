import { getSHA256Hash } from "boring-webcrypto-sha256";

export function usePassword() {
    function validatePassword(input: string, confirm: string) {
        if (input != confirm) {
            throw new Error("Passwords don't match.")
        }
        else if (!/.{8,}$/.test(input)) {// min length of 8
            throw new Error("Minimum of 8 characters required.")
        }
        else if (!/(?=.*?[0-9])/.test(input)) { // Min of 1 digit
            throw new Error("Minimum of 1 digit required.")
        }
    }

    async function iterHash(input: string, confirm: string, nonce: number = 1) {
        validatePassword(input, confirm);

        let result = Buffer.from(`${input}`).toString('base64');

        for (var i = 0; i < nonce; i++) {
            result = (await getSHA256Hash(result)).toUpperCase()
        }

        return result
    }

    async function hash(input: string, confirm: string) {
        return await iterHash(input, confirm)
    }

    return { iterHash, hash }
}