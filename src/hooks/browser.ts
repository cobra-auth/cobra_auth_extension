import { useMemo } from "react";

export enum Browser {
    Opera,
    Brave,
    Edge,
    Chrome,
    Safari,
    Firefox,
    IE,
    Other,
}

export function useBrowser() {
    const result = useMemo(() => {
        if ((navigator as any).brave != null){
            return Browser.Brave
        }
        if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
            return Browser.Opera
        }
        else if (navigator.userAgent.indexOf("Edg") != -1) {
            return Browser.Edge
        }
        else if (navigator.userAgent.indexOf("Chrome") != -1) {
            return Browser.Chrome
        }
        else if (navigator.userAgent.indexOf("Safari") != -1) {
            return Browser.Safari
        }
        else if (navigator.userAgent.indexOf("Firefox") != -1) {
            return Browser.Firefox
        }
        else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!(document as any).documentMode == true)) //IF IE > 10
        {
            return Browser.IE
        } 
        else {
            return Browser.Other
        }
    }, [navigator.userAgent])

    return result
}