import { useEffect, useState } from "react";
import { Heading1, Heading4, Label } from "../../components";
import { AlertCircle, ArrowLeft, Check, Clock, FileBox, Loader2 } from "lucide-react";
import { useQuery } from "../../providers/auth";
import { useNavigate } from "react-router-dom";
import { SubStatus, SubmissionDetails } from "./types";

export function SubHistory() {
    const navigate = useNavigate();
    const query = useQuery();

    const [loading, updateLoading] = useState(true);
    const [items, updateItems] = useState<SubmissionDetails[]>([]);

    useEffect(() => {
        updateLoading(true)
        query<any[]>('/sub/history', null).then(response => {
            if (response.result) {
                updateItems(response.result.map<SubmissionDetails>(value => ({
                    ...value,
                    timestamp: new Date(value.timestamp),
                })))
            }

            updateLoading(false)
        })
    }, [])

    function formatTimestamp(date: Date) {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' };
        return date.toLocaleDateString('en-GB', options);

    }

    function formatAriaStatus(status: SubStatus): string {
        switch (status) {
            case SubStatus.Pending: return 'pending'
            case SubStatus.Passed: return 'passed'
            default: return 'error'
        }
    }

    function formatStatusMessage(status: SubStatus) {
        switch (status) {
            case SubStatus.CodeInvalid: return "Invalid auth code"
            case SubStatus.PendingSub: return "Unauthorized"
            case SubStatus.WrongLevel: return "Wrong level"
            case SubStatus.WrongEmail: return "Wrong email"
            case SubStatus.DriveLocked: return "Drive folder locked"
            default: return SubStatus[status]
        }
    }

    function SubmissionIcon({ status }: { status: SubStatus }) {
        switch (status) {
            case SubStatus.Pending: return (<Clock className="h-6 my-auto text-yellow-500" />)
            case SubStatus.Passed: return (<Check className="h-6 my-auto text-emerald-500" />)
            default: return (<AlertCircle className="h-6 my-auto text-rose-500" />)
        }
    }

    return (
        <div className="h-full pt-12 max-h-full layout-expand w-full flex flex-col">
            <button onClick={() => navigate(-1)} className="cursor-pointer animate-fade-in absolute pointer-events-auto text-neutral-400 bg-neutral-600/40 hover:bg-neutral-600/70 hover:text-neutral-300 disabled:opacity-0 w-fit p-1 top-0 left-0 disabled:cursor-default  select-none  transition-colors rounded-md">
                <ArrowLeft className="h-5 w-5" />
            </button>
            {loading ? (
                <div className="grow w-full flex justify-center">
                    <Loader2 className='animate-spin m-auto antialiased w-10 h-10 opacity-50' />
                </div>
            ) : (
                items.length > 0 ? (
                    <ul className="flex w-full gap-4 fade justify-start overflow-y-auto overflow-x-hidden grow animate-fade-in flex-col list-none">
                        {items.map(details => (
                            <li aria-valuetext={formatAriaStatus(details.status)} className="bg-neutral-600/70 group shrink-0 backdrop-blur-sm rounded-md w-full flex pt-2 p-3 overflow-hidden gap-3">
                                <SubmissionIcon status={details.status} />
                                <div className="flex flex-col">
                                    <Heading4>{formatStatusMessage(details.status)}</Heading4>
                                    <Label className="normal-case">{details.ref_end.toUpperCase()} | {formatTimestamp(details.timestamp)}</Label>
                                </div>
                                <div className="h-1 w-full group-aria-[valuetext=pending]:bg-yellow-500 bg-rose-500 group-aria-[valuetext=passed]:bg-emerald-500 bottom-0 left-0 absolute" />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className=" w-full my-auto flex flex-col gap-8">
                        <FileBox strokeWidth={1.5} className="w-32 text-neutral-300 h-32 mx-auto" />
                        <div className=" flex mx-auto flex-col gap-2">
                            <Heading1 className='mx-auto text-center'>Get to work!</Heading1>
                            <p className="text-center relative text-base text-neutral-300 font-medium transition-all">Looks like you haven't made any submissions yet...</p>
                        </div>
                    </div>
                )

            )}
        </div>
    )
}
