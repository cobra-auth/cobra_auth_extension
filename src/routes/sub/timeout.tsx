import { useEffect, useMemo, useState } from "react";
import { Heading1 } from "../../components";
import { AlarmClock, ArrowLeft, Clock, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";


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
