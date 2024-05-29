import { useEffect, useState } from "react";

export interface TvIdentity {
    username: string,
}

export function useTradingView() {
    const [loading, updateLoading] = useState(true)
    const [current, updateCurrent] = useState<TvIdentity | null>(null)

    useEffect(() => {
        update()
    }, [])

    async function update() {
        updateLoading(true);

        const tabId = await new Promise<number | undefined>(resolve => {
            chrome.tabs.query({}, (tabs) => {
                resolve(tabs.find(x => x.url?.toLowerCase().includes("tradingview.com"))?.id)
            });
        })

        if (tabId) {
            const result = await chrome.scripting.executeScript<any[], string | null>({
                target: { tabId },
                func: () => {
                    let verified = false;
                    let result: string | null = null;

                    // // get all the keys in the localstorage
                    for (var i = 0; i < localStorage.length; i++) {
                        const key = localStorage.key(i);
                        if (key == 'last_username') {
                            result = localStorage.getItem(key) || null
                        }
                        else if (key == 'trial_availiable') {
                            verified = localStorage.getItem(key) != undefined;
                        }
                    }

                    if(verified == true){
                        return result;
                    }
                    
                    return null
                }
            }).then(x => x[0].result)

            if (result) {
                updateCurrent({
                    username: result
                });

                updateLoading(false)
                return
            }

        }

        updateCurrent(null);
        updateLoading(false)
    }

    return { current, loading, update }
}