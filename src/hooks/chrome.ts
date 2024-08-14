import { ENVIRONMENT } from "../environment";

export function useChrome() {
    async function getTab() {
        return await new Promise<chrome.tabs.Tab | undefined>(resolve => {
            chrome.tabs.query({ url: ENVIRONMENT.trwDomains }, (tabs) => {
                resolve(tabs[0])
            });
        })

    }

    async function inject<T, Args extends any[]>(func: (...args: Args) => Promise<T>, ...args: Args) {
        const tab = await getTab();

        if (tab && tab.id) {
            const [{ result }] = await chrome.scripting.executeScript<Args, Promise<T>>({
                func,
                args,
                target: {
                    tabId: tab.id
                },
            })

            return result
        }
    }

    return { inject, getTab }
}
