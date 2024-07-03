import { useEffect, useState } from "react";

export type ChromeIdentity = chrome.identity.UserInfo;

export function useChrome() {
    const [loading, updateLoading] = useState(true)
    const [current, updateCurrent] = useState<chrome.identity.UserInfo | null>(null)

    // 54633874682-803v8ebmdsgnj238un2cruufcbhm8r98.apps.googleusercontent.com

    useEffect(() => {
        update()
    }, [])

    function update() {
        updateLoading(true);

        

        // [ ] implement for brave router
        // chrome.identity.getAuthToken({ interactive: true }).then(x => {
        //     console.log(x)
        // })

        chrome.identity.getProfileUserInfo({ accountStatus: chrome.identity.AccountStatus.ANY }).then(info => {
            updateCurrent(info);
            updateLoading(false)
        })
    }

    return { current, loading, update }
}