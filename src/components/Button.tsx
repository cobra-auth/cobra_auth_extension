import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "./utils";

export function Button(props: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
    return (
        <button {...props} className={twMerge("cursor-pointer pointer-events-auto disabled:cursor-default disabled:bg-trw-accent-700/60 hover:bg-trw-accent-500 text-black w-full p-4 select-none text-base font-bold transition-colors uppercase rounded-md bg-trw-accent-400 ", props.className)}>
            {props.children}
        </button>
    )
}