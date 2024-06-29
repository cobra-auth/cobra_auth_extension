import { useNavigate } from "react-router-dom";
import { Button, Heading1, Heading3 } from "../../../components";
import {EyeOff, Loader2 } from "lucide-react";
import { useTradingView } from "../../../providers/identity/tradingview";
import tradingview from '../../../images/tradingview.png';

export function RegisterTradingView() {
    const tvIdentity = useTradingView();
    const navigate = useNavigate();

    function onClick() {
        if (tvIdentity.current) {
            navigate('../form', { relative: 'path' })
        }
        else {
            tvIdentity.update();
        }
    }

    return (
        <div className="h-full max-h-full layout-expand w-full flex gap-4 flex-col justify-between">
            <div className="grow animate-fade-in overflow-y-clip flex shrink w-full">
                <div className='flex flex0 overflow-y-clip shrink m-auto flex-col gap-8'>
                    <div className=" w-full flex flex-col gap-8">
                        <img src={tradingview} className="h-auto w-32 mx-auto animate-logo-size-down" />
                        <Heading1 className='mx-auto text-center'>confirm your TradingView</Heading1>
                    </div>
                    {tvIdentity.loading ? (
                        <div className="flex w-full animate-fade-in gap-1 flex-col">
                            <Loader2 className='animate-spin mx-auto antialiased w-10 h-10 opacity-50' />
                            <p className="text-center relative text-base text-neutral-300 font-medium transition-all">Connecting...</p>
                        </div>
                    ) : (
                        tvIdentity.current ? (
                            <div className="flex w-full gap-8 flex-col-reverse">
                                <button className='py-1 px-4 mx-auto peer flex rounded-full gap-2 text-neutral-300 transition-all hover:text-neutral-100 align-middle text-sm font-semibold hover:bg-neutral-600/60 active:bg-neutral-600/70 bg-neutral-600/50 border border-neutral-500 backdrop-blur-sm w-fit'>
                                    <EyeOff className="h-4 w-4 m-auto" />
                                    Click to view
                                </button>
                                <p className="text-center relative text-lg peer-active:text-neutral-300 text-white font-medium blur-sm peer-active:blur-0 transition-all">{tvIdentity.current.username}</p>
                            </div>
                        ) : (
                            <div className="flex w-full gap-1 flex-col">
                                <Heading3 className="mx-auto normal-case font-bold">Failed to connect</Heading3>
                                <p className="text-center relative text-base text-neutral-300 font-medium transition-all">Please make sure you have TradingView open, logged in and try again.</p>
                            </div>
                        )
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full h-fit shrink-0">
                {tvIdentity.current && !tvIdentity.loading && (<p className='text-neutral-300 text-sm font-medium text-center'>Don't change your TradingView username or all of your progress will be lost!</p>)}
                <Button className="grow-0 shrink-0" onClick={onClick}>
                    {tvIdentity.current ? "Continue" : "Try again"}
                </Button>
            </div>
        </div>
    )
}