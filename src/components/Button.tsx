import { ButtonHTMLAttributes, MouseEvent, useState } from "react";
import { twMerge } from "./utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => Promise<any> | any
}

export function Button({ className, children, onClick, ...props }: ButtonProps) {
    const [loading, setLoading] = useState(false)

    async function onClickIternal(event: MouseEvent<HTMLButtonElement>) {
        setLoading(true)
        
        await onClick?.(event)
        
        setLoading(false)
    }

    return (
        <button {...props} onClick={onClickIternal} className={twMerge("cursor-pointer transition-colors pointer-events-auto disabled:cursor-default text-black w-full p-4 select-none text-base font-bold uppercase rounded-md hover:brightness-[0.9] active:brightness-[0.80] bg-primary-gradient hover:bg-secondary-gradient", className)}>
            {loading ? (<Loader2 className='animate-spin m-auto antialiased size-5' />) : children}
        </button>
    )
}

export function IconButton({ className, children, onClick, ...props }: ButtonProps) {
    const [loading, setLoading] = useState(false)

    async function onClickIternal(event: MouseEvent<HTMLButtonElement>) {
        setLoading(true)
        
        await onClick?.(event)
        
        setLoading(false)
    }

    return (
        <button {...props} onClick={onClickIternal} className={twMerge("cursor-pointer pointer-events-auto disabled:cursor-default text-black w-full p-1 select-none text-base font-bold uppercase rounded-md hover:brightness-[0.9] active:brightness-[0.80] transition-all bg-none", className)}>
            {loading ? (<Loader2 className='animate-spin m-auto antialiased size-5' />) : children}
        </button>
    )
}