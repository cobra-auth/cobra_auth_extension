import { decrypt, encrypt } from "../crypto";
import { ENVIRONMENT } from "../environment";
import { useSessionStorage } from "./session";

export interface ApiResponse<T> {
    result: T | null,
    error: string | null
}

export function useApi() {
    const token = useSessionStorage()

    async function resolve<T extends string | object | number>(endpoint: string, method: 'POST' | 'GET', data: any | null): Promise<ApiResponse<T>> {
        const url = `${ENVIRONMENT.apiEndpoint || ''}${endpoint}`
        const auth = await token.get();

        const authHeader = auth ? { 'X-AUTH-TOKEN': auth } : undefined

        const [status, headers, response] = await fetch(url, {
            method: method,
            mode: 'cors',
            headers: {
                ...authHeader
            },
            credentials: "include",
            keepalive: true,
            body: method == 'GET' ? null : encrypt(data)
        }).then(x => Promise.all([x.status, x.headers, x.text()]))

        if (status != 200) {
            return {
                error: response,
                result: null
            }
        }

        try {
            // decrypt the data response of the server
            const data = await decrypt<T>(response)

            // Update Auth token
            token.set(headers.get('X-AUTH-TOKEN'))

            return {
                error: null,
                result: data
            }
        } catch ({ message }: any) {
            return {
                error: message as string,
                result: null
            }
        }
    }

    async function post<T extends string | number | object>(endpoint: string, data: any | null) {
        return await resolve<T>(endpoint, 'POST', data);
    }

    async function get<T extends string | object | number>(endpoint: string) {
        return await resolve<T>(endpoint, 'GET', null);
    }

    return { post, get }
}

export { encrypt, decrypt }