import { useNavigate, useParams } from "react-router-dom";
import { Button, Heading1 } from "../../../components";
import { useState } from "react";
import { Check, CopyIcon, EyeOff } from "lucide-react";
import logo from '../../images/logo-512.png';

export function RegisterCode() {
    const params = useParams();
    const navigate = useNavigate();

    const [view, updateView] = useState(false)
    const [copyLabel, updateCopyLabel] = useState(false)
    const [copy, updateCopy] = useState(false)

    function onCopyClick() {
        updateCopyLabel(true);
        updateCopy(true);

        navigator.clipboard.writeText(params.code!)

        setTimeout(() => {
            updateCopyLabel(false)
        }, 1e3 * 3)
    }

    return (
        <div className="h-full pt-12 max-h-full layout-expand w-full flex flex-col justify-between">
            <div className="grow overflow-y-clip animate-fade-in flex shrink w-full">
                <div className='flex overflow-y-clip shrink m-auto flex-col gap-8'>
                    <div className=" w-full flex flex-col gap-8">
                        <img src={logo} className="h-auto w-32 mx-auto animate-logo-size-down" />
                        <Heading1 className='mx-auto text-center'>RECOVERY CODE</Heading1>
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
                <p aria-hidden={!copyLabel} className='mx-auto flex aria-hidden:opacity-0 opacity-100 gap-1 text-status-online transition-all align-middle text-sm font-semibold'>
                    <Check className="h-4 w-4 m-auto" />
                    Copied
                </p>
            </div>
            <Button onClick={() => navigate('/')} disabled={!copy} tabIndex={3} className="grow-0 w-full shrink-0">
                Code Copied
            </Button>
        </div>
    )
}