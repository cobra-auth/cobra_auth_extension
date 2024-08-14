import { decrypt, useApi } from "."
import { SessionDetails, SessionToken, UserDetails, useSessionStorage } from "./session"
import { useInfo } from "./info"

interface IdentityResult {
    error: string | null
    result: UserDetails | null
}

export function useIdentify(): () => Promise<IdentityResult> {
    const { post } = useApi()
    const { read } = useInfo()

    const sessionStore = useSessionStorage();

    return async () => {
        try {
            const [identity, session] = await Promise.all([read(), sessionStore.get()])

            if (identity) {
                // Check if we have a session token active in storage
                if (session) {
                    const token = decrypt<SessionToken>(session)

                    // If session token is active, check if still valid
                    if (token.uid == identity.uid && token.expired > Date.now()) {
                        return {
                            result: identity,
                            error: null
                        }
                    }
                    else {
                        // Session token invalid, clear from storage
                        await sessionStore.clear()
                    }
                }

                // Filter roles for duplicates
                const roles = identity.roles.reduce<string[]>((result, current) => {
                    if (result.indexOf(current) < 0) {
                        return [...result, current]
                    }

                    return result
                }, [])

                // Call API to update credentials
                const { result, error } = await post<SessionDetails>('/v2/user/auth', {
                    uid: identity.uid,
                    avatar: identity.avatar,
                    username: identity.username
                })

                // Update session info with response
                if (result) {
                    await sessionStore.set(result.token)

                    return {
                        result: {
                            ...identity,
                            roles,
                        },
                        error: null
                    }
                }
                else {
                    // Failed to reach API server
                    return {
                        result: null,
                        error: error || 'Failed to reach server'
                    }
                }
            }
            else {
                // Failed to read data from TRW tab
                return {
                    result: null,
                    error: "Please make sure you have TRW open and you're signed-in"
                }
            }
        }
        catch (err: any) {
            // Unkown error occured, clear session token
            await sessionStore.clear()

            return {
                result: null,
                error: err.message as string
            }
        }
    }
}