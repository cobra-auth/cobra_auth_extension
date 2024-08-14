import { HTMLAttributes, useMemo } from "react"
import { twMerge } from "../utils"
import { Check, Hourglass, X } from "lucide-react"

export enum SubmissionStatus {
    TimedOut = 102,
    DriveLocked = 105,

    Pending = 201,
    Removed = 202,
    Failed = 203,
    Passed = 204,
}

export interface SubmissionDetails {
    label: string,
    status: SubmissionStatus,
    timestamp: number,
}

interface SubmissionInfoProps extends HTMLAttributes<HTMLDivElement> {
    details: SubmissionDetails | undefined
}

export function Submission({ className, details, ...props }: SubmissionInfoProps) {
    if (!details) {
        return null
    }

    const date = useMemo(() => {
        return new Date(details.timestamp).toLocaleDateString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'UTC'
        })
    }, [details.timestamp])

    const status = useMemo(() => {
        if (details) {
            switch (details.status) {
                case SubmissionStatus.TimedOut: return 'Timed out'
                case SubmissionStatus.DriveLocked: return 'Drive Locked'
                case SubmissionStatus.Pending: return 'Pending'
                case SubmissionStatus.Removed: return 'Removed'
                case SubmissionStatus.Failed: return 'Failed'
                case SubmissionStatus.Passed: return 'Passed'
            }
        }
    }, [details.status])

    const icon = useMemo(() => {
        if (details) {
            switch (details.status) {
                case SubmissionStatus.Pending: return <Hourglass className="m-auto text-primary animate-spin shrink-0 size-4" />
                case SubmissionStatus.Failed: return <X className="m-auto text-primary shrink-0 size-5" />
                case SubmissionStatus.Passed: return <Check className="m-auto text-primary shrink-0 size-5" />
                default: return <X className="m-auto text-primary shrink-0 size-5" />
            }
        }
    }, [details.status])

    return (
        <div {...props} className={twMerge("flex gap-4 p-2 h-14 px-4 grow-0 shrink-0 rounded-md bg-dark-700 w-full", className)}>
            <span className="relative shrink-0 px-1 rounded-full border border-primary flex grow-0 my-auto size-10">
                {icon}
            </span>
            <div className="flex flex-col justify-evenly overflow-hidden">
                <span className="gap-1 h-4 flex items-center">
                    <span className="text-sm text-nowrap">{details.label}</span>
                    <span>-</span>
                    <span className="text-sm text-nowrap">{status}</span>
                </span>
                <span className="gap-1 text-sm h-4 flex items-center text-dark-500">
                    <label>
                        {date} UTC
                    </label>
                </span>
            </div>
        </div >
    )
}