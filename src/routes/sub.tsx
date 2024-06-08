import { useEffect, useMemo, useState } from "react";
import { Button, Heading1, Heading3, Heading4, Label } from "../components";
import logo from '../images/logo-512.png';
import { AlarmClock, AlertCircle, ArrowLeft, Check, Clock, CopyIcon, EyeOff, FileBox, Loader2 } from "lucide-react";
import { useIdentity } from "../providers/identity";
import { useQuery } from "../providers/auth";
import { useNavigate, useParams } from "react-router-dom";
import { HashToken } from "../token";

enum SubStatus {
    CodeInvalid = 101,
    PendingSub = 102,
    WrongLevel = 103,
    WrongEmail = 104,
    DriveLocked = 105,

    Pending = 201,
    Removed = 202,
    Failed = 203,
    Passed = 204,
}

interface SubmissionDetails {
    timestamp: Date,
    ref_end: string,
    status: SubStatus
}

type SubQueryResult = { success: true, data: string } | { success: false, data: number | 'pending_sub' }

export function SubInit() {
    const identity = useIdentity();
    const [loading, updateLoading] = useState(false)

    const query = useQuery();
    const navigate = useNavigate();

    async function onClick() {
        updateLoading(true);

        if (!identity.current) {
            await identity.update()
        }
        else {
            try {

                const response = await query<SubQueryResult>('/sub', null);

                if (response.result) {
                    if (response.result.success) {
                        navigate(`./${response.result.data}`)
                    }
                    else {
                        switch (response.result.data) {
                            case "pending_sub": navigate(`./pending_sub`); break;
                            default: navigate(`./timeout/${response.result.data}`); break;
                        }
                    }
                }
                else if (response.error) {
                    alert(response.error)
                }
            } catch ({ message }: any) {
                const error = message as string;
                alert(error)
            }
        }

        updateLoading(false)
    }

    return (
        <div className="h-full  w-full flex flex-col justify-between">
            <div className='w-full animate-fade-in flex text-center flex-col gap-1'>
                <Heading1 className='mx-auto'>Welcome</Heading1>
                <Heading3 className='mx-auto text-base text-neutral-300 font-semibold'>{identity.current?.username}</Heading3>
            </div>
            <Button tabIndex={1} disabled={loading} onClick={onClick}>
                Get Auth Code
            </Button>
        </div>
    )
}

export function SubTimeout() {
    const params = useParams();
    const timeout = useMemo(() => parseInt(params['timeout']!), [params["timeout"]])
    const [lifetime, updateLifetime] = useState<number>(0)

    useEffect(() => {
        setTimeout(() => {
            updateLifetime(Math.floor((timeout - Date.now()) / 1e3))
        }, 1e3)
    }, [lifetime])

    const navigate = useNavigate();

    function formatLifetime() {
        const hours = Math.floor(lifetime / (60 * 60))
        const minutes = Math.floor((lifetime / 60) - (hours * 60))
        const seconds = Math.floor(lifetime - ((hours * 60 * 60) + (minutes * 60)))

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <div className="h-full pt-12 max-h-full layout-expand w-full flex gap-4 flex-col justify-between">
            <div className="grow overflow-y-clip animate-fade-in justify-center flex flex-col w-full">
                <button onClick={() => navigate(-1)} className="cursor-pointer animate-fade-in absolute pointer-events-auto text-neutral-400 bg-neutral-600/40 hover:bg-neutral-600/70 hover:text-neutral-300 disabled:opacity-0 w-fit p-1 top-0 left-0 disabled:cursor-default  select-none  transition-colors rounded-md">
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <button onClick={() => navigate('../history')} className="cursor-pointer animate-fade-in absolute pointer-events-auto text-neutral-400 bg-neutral-600/40 hover:bg-neutral-600/70 hover:text-neutral-300 disabled:opacity-0 w-fit p-1 top-0 right-0 disabled:cursor-default  select-none  transition-colors rounded-md">
                    <Clock className="h-5 w-5" />
                </button>
                <div className=" w-full flex flex-col gap-8">
                    <AlarmClock strokeWidth={1.5} className="w-32 text-neutral-300 h-32 mx-auto" />
                    <div className=" flex mx-auto flex-col gap-2">
                        <Heading1 className='mx-auto text-center'>Timed out</Heading1>
                        <p className="text-center relative text-base text-neutral-300 font-medium transition-all">You are can submit once every 24 hours. Pleas come back and try again later.</p>
                    </div>
                </div>
            </div>
            <div className="flex h-10 flex-col gap-4 w-full shrink-0">
                {lifetime > 0 ? (
                    <p className="mx-auto py-2 text-base text-center text-neutral-300 font-medium">Come back in: {formatLifetime()}</p>
                ) : (
                    <Loader2 className='animate-spin m-auto antialiased aspect-square grow opacity-50' />
                )}
            </div>
        </div>
    )
}

export function SubPending() {
    const navigate = useNavigate();
    return (
        <div className="h-full pt-12 max-h-full layout-expand w-full flex gap-4 flex-col justify-between">

            <div className="grow overflow-y-clip animate-fade-in justify-center flex flex-col w-full">
                <button onClick={() => navigate(-1)} className="cursor-pointer animate-fade-in absolute pointer-events-auto text-neutral-400 bg-neutral-600/40 hover:bg-neutral-600/70 hover:text-neutral-300 disabled:opacity-0 w-fit p-1 top-0 left-0 disabled:cursor-default  select-none  transition-colors rounded-md">
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <button onClick={() => navigate('../history')} className="cursor-pointer animate-fade-in absolute pointer-events-auto text-neutral-400 bg-neutral-600/40 hover:bg-neutral-600/70 hover:text-neutral-300 disabled:opacity-0 w-fit p-1 top-0 right-0 disabled:cursor-default  select-none  transition-colors rounded-md">
                    <Clock className="h-5 w-5" />
                </button>
                <div className=" w-full flex flex-col gap-8">
                    <AlarmClock strokeWidth={1.5} className="w-32 text-neutral-300 h-32 mx-auto" />
                    <div className=" flex mx-auto flex-col gap-2">
                        <Heading1 className='mx-auto text-center'>Pending Submission.</Heading1>
                        <p className="text-center relative text-base text-neutral-300 font-medium transition-all">Please wait while we grade your submission, meanwhile refresh your memory by going over the lessons.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

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

    function formatStatusMessage(status: SubStatus){
        switch (status){
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

export function SubResult() {
    const params = useParams();
    const navigate = useNavigate();
    const token = useMemo(() => HashToken.parse(params.code!), [params["code"]])

    const [lifeTime, updateLifetime] = useState<number>(0)
    const [view, updateView] = useState(false)
    const [copy, updateCopy] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            updateLifetime((token.expiration - Date.now()) / 1e3)
        }, 1e3)
    }, [lifeTime])

    function onCopyClick() {
        updateCopy(true);

        navigator.clipboard.writeText(params.code!)

        setTimeout(() => {
            updateCopy(false)
        }, 1e3 * 3)
    }

    function formatLifetime() {
        const hours = Math.floor(lifeTime / (60 * 60))
        const minutes = Math.floor((lifeTime - (hours * 60)) / 60)
        const seconds = Math.floor(lifeTime - ((hours * 60 * 60) + (minutes * 60)))

        return `${`00${minutes}`.slice(-2)}:${`00${seconds}`.slice(-2)}`
    }

    return (
        <div className="h-full pt-12 max-h-full layout-expand w-full flex gap-4 flex-col justify-between">
            <button tabIndex={3} onClick={() => navigate(-1)} className="cursor-pointer animate-fade-in absolute pointer-events-auto text-neutral-400 bg-neutral-600/40 hover:bg-neutral-600/70 hover:text-neutral-300 disabled:opacity-0 w-fit p-1 top-0 left-0 disabled:cursor-default  select-none  transition-colors rounded-md">
                <ArrowLeft className="h-5 w-5" />
            </button>
            <button tabIndex={4} onClick={() => navigate('../history')} className="cursor-pointer animate-fade-in absolute pointer-events-auto text-neutral-400 bg-neutral-600/40 hover:bg-neutral-600/70 hover:text-neutral-300 disabled:opacity-0 w-fit p-1 top-0 right-0 disabled:cursor-default  select-none  transition-colors rounded-md">
                <Clock className="h-5 w-5" />
            </button>
            <div className="grow overflow-y-clip animate-fade-in flex shrink w-full">
                <div className='flex overflow-y-clip shrink m-auto flex-col gap-8'>
                    <div className=" w-full flex flex-col gap-8">
                        <img src={logo} className="h-auto w-32 mx-auto animate-logo-size-down" />
                        <Heading1 className='mx-auto text-center'>authenticate</Heading1>
                    </div>

                </div>
            </div>
            <div className="flex w-full gap-4 px-2 justify-start grow animate-fade-in flex-col">
                <p aria-hidden={!view} className="max-h-20 text-center py-1 px-2 text-ellipsis aria-hidden:blur-sm overflow-hidden break-all relative text-base font-medium transition-all">{params.code}</p>
                <div className="flex gap-2 justify-center">
                    <button tabIndex={1} onMouseDown={() => updateView(true)} onMouseUp={() => updateView(false)} className='py-1 px-4 flex rounded-full gap-2 text-neutral-300 transition-all hover:text-neutral-100 align-middle text-sm font-semibold hover:bg-neutral-600/60 active:bg-neutral-600/70 bg-neutral-600/50 border border-neutral-500 backdrop-blur-sm w-fit'>
                        <EyeOff className="h-4 w-4 m-auto" />
                        View
                    </button>
                    <button tabIndex={2} onClick={onCopyClick} className='py-1 px-4 flex rounded-full gap-2 transition-all text-black align-middle text-sm font-semibold hover:bg-trw-accent-500 active:bg-trw-accent-600 bg-trw-accent-400 border border-black w-fit'>
                        <CopyIcon className="h-4 w-4 m-auto" />
                        Copy
                    </button>
                </div>
                <p aria-hidden={!copy} className='mx-auto flex aria-hidden:opacity-0 opacity-100 gap-1 text-status-online transition-all align-middle text-sm font-semibold'>
                    <Check className="h-4 w-4 m-auto" />
                    Copied
                </p>
            </div>
            <div className="flex h-10 flex-col gap-4 w-full shrink-0">
                {lifeTime > 0 ? (
                    <p className="mx-auto py-2 text-base text-center text-neutral-300 font-medium">Your code expires in: {formatLifetime()}</p>
                ) : (
                    <Loader2 className='animate-spin m-auto antialiased aspect-square grow opacity-50' />
                )}
            </div>
        </div>
    )
}