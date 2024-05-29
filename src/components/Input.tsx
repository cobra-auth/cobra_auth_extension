import React, { PropsWithChildren } from "react"
import { twMerge } from "./utils"

export function Input(props: PropsWithChildren<React.InputHTMLAttributes<HTMLInputElement>>) {
    return <input {...props} className={twMerge("bg-neutral-600/70 p-1 my-1 text-base px-2 font-light transition-all rounded-md ring-neutral-500 focus:backdrop-blur-sm ring-1 focus:outline-none shadow-lg focus:ring-trw-accent-300/70 focus:shadow-trw-accent-300/50 aria-selected:ring-trw-accent-300/70 aria-selected:shadow-trw-accent-300/50", props.className)}/>

}