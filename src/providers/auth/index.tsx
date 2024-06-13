import { PropsWithChildren, ReactElement, useContext, useEffect, useState } from "react";
import { useIdentity } from "../identity";
import { useLocation, useNavigate } from "react-router-dom";
import { useStorage } from "../../hooks";
import { AUTH_CONTEXT } from "./context";
import { HashToken } from "../../token";
import { Api } from "@pandorae-libertas/cobra-api";

export function AuthProvider({ children }: PropsWithChildren) {
    const navigate = useNavigate()

    const identity = useIdentity();
    const storage = useStorage('local');

    const [loading, updateLoading] = useState(true);

    useEffect(() => { authenticate(); }, [identity.current])

    async function authenticate() {
        if (!identity.loading && identity.current) {
            updateLoading(true)

            const hash = current();

            if (hash) {
                try {
                    const {expiration, trwUid: trw_uid} = HashToken.parse(hash)

                    const expired = expiration <= new Date().valueOf();
                    const idChanged = trw_uid != identity.current.uid

                    if (!expired && !idChanged) {
                        updateLoading(false)
                        return;
                    }
                } catch (err) {
                    await updateToken(null)
                    return;
                }
            }

            try {
                await Api.post('/user/id', {
                    auth: null,
                    data: {
                        uid: identity.current.uid,
                        username: identity.current.username,
                    }
                })


                navigate(`/id/login`)
            } catch ({ message }: any) {
                const error = message as string;

                if (error == 'user_not_found') {
                    navigate(`/id/register`)
                }
                else {
                    navigate(`/error/${error}`)
                }
            }

            updateLoading(false)
        }
    }

    async function updateToken(token: string | null) {
        storage.set('uid_token', token)
        await authenticate();
    }

    function current() {
        return storage.get<string>('uid_token') || null
    }

    return (
        <AUTH_CONTEXT.Provider value={{ loading, authenticate, update: updateToken, current }}>
            {children}
        </AUTH_CONTEXT.Provider>
    )
}

export function Authenticate({ children }: PropsWithChildren) {
    const location = useLocation();
    const { authenticate } = useAuth();

    useEffect(() => { authenticate() }, [location.pathname])

    return children as ReactElement;
}

export function useAuth() {
    const { loading, authenticate, current } = useContext(AUTH_CONTEXT)

    return {
        loading,
        authenticate,
        current,
        authenticated: current() != null
    }
}

export { useQuery } from './query';
export type { QueryResponse } from './query';
export { useRegister } from './register'