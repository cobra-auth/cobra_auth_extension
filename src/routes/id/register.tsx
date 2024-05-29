import { useNavigate, useParams } from "react-router-dom";
import { Button, Heading1, Heading3, Input, Label } from "../../components";
import { useRegister } from "../../providers/auth";
import { useIdentity } from "../../providers/identity";
import { FormEvent, useMemo, useState } from "react";
import { Check, CopyIcon, EyeOff, Loader2 } from "lucide-react";
import { useTradingView } from "../../providers/identity/tradingview";
import { useChrome } from "../../providers/identity/chrome";
import google from '../../images/google.svg';
import tradingview from '../../images/tradingview.png';
import logo from '../../images/logo-512.png';
import { getErrorMessage } from "../../error";


export function RegisterInit() {
    const navigate = useNavigate();
    const identity = useIdentity();

    return (
        <div className="h-full fade-in w-full flex flex-col justify-between">
            <div className='w-full animate-fade-in flex text-center flex-col gap-1'>
                <Heading1 className='mx-auto'>Welcome!</Heading1>
                <Heading3 className='mx-auto text-base text-neutral-300 font-semibold'>{identity.current?.username}</Heading3>
            </div>
            <Button onClick={() => navigate('./chrome')}>
                Sign Up
            </Button>
        </div>
    )
}

export function RegisterChrome() {
    const chromeIdentity = useChrome();
    const navigate = useNavigate();

    function onClick() {
        if (chromeIdentity.current) {
            navigate('../tv', { relative: 'path' })
        }
        else {
            chromeIdentity.update();
        }
    }


    return (
        <div className="h-full max-h-full layout-expand w-full flex gap-4 flex-col justify-between">
            <div className="grow overflow-y-clip animate-fade-in flex shrink w-full">
                <div className='flex overflow-y-clip shrink m-auto flex-col gap-8'>
                    <div className=" w-full flex flex-col gap-8">
                        <img src={google} className="h-auto invert w-32 mx-auto animate-logo-size-down" />
                        <Heading1 className='mx-auto text-center'>confirm chrome account</Heading1>
                    </div>
                    {chromeIdentity.loading ? (
                        <div className="flex w-full gap-1 flex-col">
                            <Loader2 className='animate-spin mx-auto antialiased w-10 h-10 opacity-50' />
                            <p className="text-center relative text-base text-neutral-300 font-medium transition-all">Connecting...</p>
                        </div>
                    ) : (
                        chromeIdentity.current ? (
                            <div className="flex w-full gap-8 flex-col-reverse">
                                <button className='py-1 px-4 mx-auto peer flex rounded-full gap-2 text-neutral-300 transition-all hover:text-neutral-100 align-middle text-sm font-semibold hover:bg-neutral-600/60 active:bg-neutral-600/70 bg-neutral-600/50 border border-neutral-500 backdrop-blur-sm w-fit'>
                                    <EyeOff className="h-4 w-4 m-auto" />
                                    Click to view
                                </button>
                                <p className="text-center relative text-lg peer-active:text-neutral-300 text-white font-medium blur-sm peer-active:blur-0 transition-all">{chromeIdentity.current.email}</p>
                            </div>
                        ) : (
                            <div className="flex w-full gap-1 flex-col">
                                <Heading3 className="mx-auto normal-case font-bold">Failed to connect</Heading3>
                                <p className="text-center relative text-base text-neutral-300 font-medium transition-all">Please make sure your Chrome browser is logged in and try again.</p>
                            </div>
                        )
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full h-fit shrink-0">
                {chromeIdentity.current && !chromeIdentity.loading && (<p className='text-neutral-300 text-sm font-medium text-center'>Please make sure this is the correct account. This cannot be changed!</p>)}
                <Button className="grow-0 shrink-0" onClick={onClick}>
                    {chromeIdentity.current ? "Continue" : "Try again"}
                </Button>
            </div>
        </div>
    )
}

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

export function RegisterForm() {
    const identity = useIdentity();
    const tvIdentity = useTradingView();
    const chromeIdentity = useChrome();

    const [loading, updateLoading] = useState(false)
    const [feedback, updateFeedback] = useState<string>()

    const uiLoading = useMemo(() => identity.loading || tvIdentity.loading || chromeIdentity.loading || loading, [identity, tvIdentity, chromeIdentity, loading]);

    const register = useRegister();
    const navigate = useNavigate()


    async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // should always be true
        if (identity.current && tvIdentity.current && chromeIdentity.current) {
            updateLoading(true);

            const password = (event.target as any)[0].value || ""
            const passwordConfirm = (event.target as any)[1].value || "";

            try {
                const response = await register(identity.current, chromeIdentity.current, tvIdentity.current, password, passwordConfirm);

                if (response.error) {
                    updateFeedback(getErrorMessage(response.error));
                }
                else {
                    navigate(`/id/register/${response.result}`)
                    updateFeedback(undefined)
                }

            } catch {
                updateFeedback("Something went wrong. Try again");
            }

            updateLoading(false);
        }
        else if (!tvIdentity.current) {
            navigate('/error/tv')
        }
    }
    return (
        <form onSubmit={onFormSubmit} className="h-full  max-h-full layout-expand w-full flex gap-4 flex-col justify-between">
            <div className='flex pt-6 overflow-y-clip animate-fade-in h-full grow w-full justify-between flex-col gap-12'>
                <div className="w-full flex flex-col gap-8">
                    <img src={logo} className="h-auto w-32 mx-auto animate-logo-size-down" />
                    <Heading1 className='mx-auto text-center'>Create password</Heading1>
                </div>
                {uiLoading ? (
                    <div className="flex animate-fade-in w-full grow justify-center gap-1 flex-col">
                        <Loader2 className='animate-spin mx-auto antialiased w-10 h-10 opacity-50' />
                        <p className="text-center relative text-base text-neutral-300 font-medium transition-all">Connecting...</p>
                    </div>
                ) : (
                    identity.current && tvIdentity.current && chromeIdentity.current ? (
                        <div className="flex w-full grow animate-fade-in gap-4 flex-col">
                            <div className='w-full relative flex flex-col gap-1'>
                                <Label>Password:</Label>
                                <Input aria-label='password' type="password" tabIndex={1} placeholder='Enter password...' className='w-full select-text' />
                            </div>
                            <div className='w-full relative flex flex-col gap-1'>
                                <Label>Confirm password:</Label>
                                <Input aria-label='password-confirm' type="password" tabIndex={2} placeholder='Confirm password...' className='w-full select-text' />
                            </div>
                        </div>
                    ) : (
                        <div className="flex w-full h-full justify-center animate-fade-in gap-1 flex-col">
                            <Heading3 className="mx-auto normal-case font-bold">Failed to connect</Heading3>
                            <p className="text-center relative text-base text-neutral-300 font-medium transition-all">Something went wrong, please go back and try again.</p>
                        </div>
                    )
                )}
            </div>
            <div className="flex flex-col min-h-28 gap-4 w-full justify-end h-fit shrink-0">
                {!uiLoading && (<p className='text-rose-600 text-sm font-medium text-center'>{feedback}</p>)}
                <Button tabIndex={3} className="grow-0 shrink-0">
                    {identity.current ? "Sign Up" : "Try again"}
                </Button>
            </div>
        </form>
    )
}


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