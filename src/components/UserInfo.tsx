import { HTMLAttributes } from "react"
import { twMerge } from "./utils"
import { UserDetails } from "../hooks"

interface UserInfoProps extends HTMLAttributes<HTMLDivElement> {
    user: UserDetails | undefined
}

export function UserInfo({ className, user, ...props }: UserInfoProps) {
    if (!user) {
        return null
    }

    return (
        <section {...props} className={twMerge("flex gap-4 p-2 px-4 grow-0 shrink-0 rounded-md bg-dark-700 w-full", className)}>
            <span className="relative size-10 shrink-0">
                <span className="size-3 bg-status-online animate-bounce my-auto rounded-full left-0 bottom-0 absolute border border-black" />
                <img src={`https://assets.therealworld.ag/avatars/${user.avatar}`} className="object-cover size-10 rounded-full border-none" />
            </span>
            <div className="flex flex-col justify-evenly overflow-hidden">
                <span className="text-sm text-nowrap">{user.username}</span>
                <label className="text-sm items-center text-dark-500 flex gap-2">
                    Connected
                </label>
            </div>
        </section>
    )
}