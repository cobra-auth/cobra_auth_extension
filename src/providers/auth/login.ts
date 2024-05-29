import { usePassword } from "../../hooks";
import { Identity } from "../identity";
import { QueryResponse, useQuery } from "./query";

export function useLogin() {
    const { hash } = usePassword();
    const query = useQuery();

    return async (identity: Identity, password: string) => {
        try {
            return await query('/id/login', {
                uid: identity.uid,
                priv_key: await hash(password, password)
            })
        }
        catch ({ message }: any) {
            const error = message as string;
            return { error } as QueryResponse
        }
    }

}
