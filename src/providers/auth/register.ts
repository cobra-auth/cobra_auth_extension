import { usePassword } from "../../hooks";
import { Identity } from "../identity";
import { ChromeIdentity } from "../identity/chrome";
import { TvIdentity } from "../identity/tradingview";
import { QueryResponse, useQuery } from "./query";

export function useRegister() {
    const { hash } = usePassword();
    const query = useQuery();

    return async (identity: Identity, chrome: ChromeIdentity, tradingview: TvIdentity, password: string, passwordConfirm: string) => {
        try {
            return await query('/id/register', {
                uid: identity.uid,
                email: chrome.email,
                username: identity.username,
                tradingview: tradingview.username,
                priv_key: await hash(password, passwordConfirm)
            })

        }
        catch ({ message }: any) {
            const error = message as string;
            return { error } as QueryResponse
        }
    }

}
