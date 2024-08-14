import { Bot } from "lucide-react";
import { HTMLAttributes } from "react";
import { twMerge } from "./utils";

interface FeedbackProps extends HTMLAttributes<HTMLDivElement> {
    message: string
}

export function Feedback({ className, message, ...props }: FeedbackProps) {
    return (
        <div {...props} className={twMerge("m-auto flex flex-col justify-center gap-1", className)}>
            <Bot className="size-24 flex text-dark-500 mx-auto" />
            <span className="text-center text-dark-500">{message}</span>
        </div>
    )
}