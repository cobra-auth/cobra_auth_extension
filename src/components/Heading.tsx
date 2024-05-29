import React, { PropsWithChildren } from "react"
import { twMerge } from "./utils"

export function Heading1(props: PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
    return <h1 {...props} className={twMerge("text-2xl font-bold uppercase", props.className)}>
        {props.children}
    </h1>
}

export function Heading2(props: PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
    return <h2 {...props} className={twMerge("text-xl font-bold uppercase", props.className)}>
        {props.children}
    </h2>
}

{/* <p className='text-neutral-300 text-sm font-medium text-center'>Please confirm this is your account, this cannot be changed.</p> */ }

export function Heading3(props: PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
    return <h3 {...props} className={twMerge("text-base font-semibold", props.className)}>
        {props.children}
    </h3>
}


export function Heading4(props: PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
    return <h4 {...props} className={twMerge("text-base font-medium", props.className)}>
        {props.children}
    </h4>
}

