import { usePassword } from "../../hooks";
import { Identity } from "../identity";
import { QueryResponse, useQuery } from "./query";

export function useRecover() {
    const { hash } = usePassword();
    const query = useQuery();

    return async (identity: Identity, rec_key: string, password: string, passwordConfirm: string) => {
        try {
            return await query('/id/recovery/reset', {
                rec_key,
                uid: identity.uid,
                priv_key: await hash(password, passwordConfirm)
            })

        }
        catch ({ message }: any) {
            const error = message as string;
            return { error } as QueryResponse
        }
    }

}
