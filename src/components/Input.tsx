import React from "react"
import { twMerge } from "./utils"
import { Check, ChevronDown } from "lucide-react"

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>

export interface SelectProps<T extends string | number | readonly string[] | undefined> extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: T[]
}

export function TextInput({ className, ...props }: InputProps & { type?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | undefined }) {
    return <input  {...props} alt="dkfdkf" className={twMerge("bg-dark-800 px-4 rounded-lg h-12 text-base outline-none", className)} />
}

export function CheckboxInput({ className, children, ...props }: InputProps) {
    return (
        <div className={twMerge("relative flex items-center shrink-0 gap-2 w-fit cursor-pointer", className)}>
            <input {...props} type="checkbox" className="peer p-1 shrink-0 appearance-none bg-dark-800 cursor-pointer rounded-lg size-8" />
            <Check className="size-5 absolute pointer-events-none hidden top-1/2 -translate-y-1/2 left-1.5 peer-checked:flex" />
            {children}
        </div>
    )
}

export function SelectInput<T extends string | number | readonly string[] | undefined>({ className, options, ...props }: SelectProps<T>) {
    return (
        <div className="flex bg-dark-800 rounded-lg relative overflow-hidden">
            <span className="absolute top-0 flex items-center right-0 h-12 pr-2">
                <ChevronDown className="size-6 text-dark-500" />
            </span>
            <select {...props} className={twMerge("bg-dark-800 appearance-none px-4 py-2 bg-none h-12 text-base outline-none", className)} style={{ msUserSelect: 'none' }} >
                {options.map(x => (
                    <option key={`select-${x}`} className="appearance-none" value={x}>{x}</option>
                ))}
            </select>
        </div>
    )
}