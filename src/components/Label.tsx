import React, { PropsWithChildren } from "react"
import { twMerge } from "./utils"

export function Label(props: PropsWithChildren<React.HTMLAttributes<HTMLLabelElement>>) {
    return <label {...props} className={twMerge("font-semibold text-xs text-neutral-400 uppercase", props.className)}>
        {props.children}
    </label>
}