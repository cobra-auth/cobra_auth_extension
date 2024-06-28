import { useEffect, useMemo, useState } from "react";
import { Heading1 } from "../../components";
import logo from '../images/logo-512.png';
import { ArrowLeft, Check, Clock, CopyIcon, EyeOff, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { HashToken } from "../../token";

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