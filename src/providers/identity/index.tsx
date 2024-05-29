import { PropsWithChildren, useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const TRW_DOMAINS = [
    "app.university.com",
    "app.jointherealworld.com",
    "therealworld.ag"
]

const IDENTITY_CONTEXT = createContext<IdentityContext>({
    loading: false,
    current: undefined,
    update: async () => undefined
})

interface TrwIdentity {
    username: string,
    uid: string
}

interface IdentityContext{
    loading: boolean, 
    current: Identity | undefined
    update: () => Promise<Identity | undefined>
}

export type Identity = TrwIdentity & {
}

export function IdentityProvider({ children }: PropsWithChildren) {
    const navigate = useNavigate();

    const [loading, updateLoading] = useState(true)
    const [info, updateInfo] = useState<Identity>();

    useEffect(() => { update() }, [])

    async function update() {
        updateLoading(true);

        let result: Identity | undefined = undefined
        const trw = await getTrwInfo()

        if (trw) {
            result = {
                uid: trw.uid,
                username: trw.username,
            }
        }
        else {
            if (!chrome) {
                navigate('/error/chrome')
            }
            else if (!trw) {
                navigate('/error/trw')
            }

        }
        
        updateInfo(result)
        updateLoading(false);

        return result;
    }

    async function getTrwInfo() {
        const tabId = await new Promise<number | undefined>(resolve => {
            chrome.tabs.query({}, (tabs) => {
                resolve(tabs.find(x => TRW_DOMAINS.some(y => x.url?.toLowerCase().includes(y.toLowerCase())))?.id)
            });
        })

        if (tabId) {
            return await chrome.scripting.executeScript<any[], TrwIdentity | undefined>({
                target: { tabId },
                func: () => {
                    // get all the keys in the localstorage
                    for (var i = 0; i < localStorage.length; i++) {
                        const key = localStorage.key(i);

                        // Find the proper storage key and retreive the required variables
                        if (key && key.includes('_posthog')) {
                            const target = JSON.parse(localStorage.getItem(key) || "{}");
                            const username: string = target['$stored_person_properties']['username'];
                            const uid: string = target['$user_id'];

                            if (username && uid && username.length > 0 && uid.length > 0) {
                                return {
                                    username,
                                    uid
                                };
                            }
                        }
                    }

                    return undefined;
                }
            }).then(x => x[0].result)
        }

        return undefined;
    }

    return (
        <IDENTITY_CONTEXT.Provider value={{ loading, current: info, update }}>
            {children}
        </IDENTITY_CONTEXT.Provider>
    )
}

export function useIdentity() {
    return useContext(IDENTITY_CONTEXT)
}