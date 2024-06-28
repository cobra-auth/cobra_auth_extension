import { useNavigate} from "react-router-dom";
import { Button, Heading1, Heading3, Input, Label } from "../../../components";
import { useRegister } from "../../../providers/auth";
import { useIdentity } from "../../../providers/identity";
import { FormEvent, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { useTradingView } from "../../../providers/identity/tradingview";
import { useChrome } from "../../../providers/identity/chrome";
import logo from '../../images/logo-512.png';
import { getErrorMessage } from "../../../error";

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
