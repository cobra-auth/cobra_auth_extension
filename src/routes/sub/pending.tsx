import { Heading1 } from "../../components";
import { AlarmClock, ArrowLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

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