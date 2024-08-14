import React from "react"
import { twMerge } from "./utils"

export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label {...props} className={twMerge("font-semibold select-none text-sm text-dark-500", props.className)}>
            {props.children}
        </label>
    )
}