import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AUTH_CONTEXT } from "./context";
import { Api } from "@pandorae-libertas/cobra-api";

export interface QueryResponse<T = string> {
    result: T | null | undefined,
    error: string | null | undefined
}

export function useQuery() {
    const navigate = useNavigate();
    const { update, current } = useContext(AUTH_CONTEXT);

    return (async function <T = string>(endpoint: string, data: any | null): Promise<QueryResponse<T>> {
        const auth = current();

        try {
            const response = await Api.post<T>(endpoint, {
                auth: auth,
                data,
            });

            if (!response) {
                throw new Error('response cannot be null')
            }
            await update(response.auth);

            return {
                error: null,
                result: response.data
            }
        }
        catch ({ message }: any) {
            const error = message as string;


            // if not authorized, context.authorize
            if (error == 'auth_failed' || auth != null) {
                await update(null);
            }
            else if (error.includes('@')) {
                navigate(`/error/${error.slice(1)}`)
            }

            return {
                error,
                result: null
            }
        }
    })
}
