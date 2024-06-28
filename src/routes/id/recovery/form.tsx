import { Button, Heading1, Heading3, Input, Label } from "../../../components";
import { useIdentity } from "../../../providers/identity";
import { FormEvent, useMemo, useState } from "react";
import logo from '../../images/logo-512.png';
import {Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecover } from "../../../providers/auth/recover";
import { getErrorMessage } from "../../../error";

export function RecoveryForm() {
    const params = useParams();
    const identity = useIdentity();

    const [loading, updateLoading] = useState(false)
    const [feedback, updateFeedback] = useState<string>()

    const uiLoading = useMemo(() => identity.loading || loading, [identity, loading]);
    
    const navigate = useNavigate()
    const recover = useRecover();

    async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // should always be true
        if (identity.current) {
            updateLoading(true);

            const password = (event.target as any)[0].value || ""
            const passwordConfirm = (event.target as any)[1].value || "";

            try {
                const response = await recover(identity.current, params.code!, password, passwordConfirm);
                
                if (response.error) {
                    updateFeedback(getErrorMessage(response.error));
                }
                else {
                    navigate(`/id/register/`)
                    updateFeedback(undefined)
                }
            } catch {
                updateFeedback("Something went wrong. Try again");
            }

            updateLoading(false);
        }
    }
    return (
        <form onSubmit={onFormSubmit} className="h-full  max-h-full layout-expand w-full flex gap-4 flex-col justify-between">
            <div className='flex pt-6 overflow-y-clip animate-fade-in h-full grow w-full justify-between flex-col gap-12'>
                <div className="w-full flex flex-col gap-8">
                    <img src={logo} className="h-auto w-32 mx-auto animate-logo-size-down" />
                    <Heading1 className='mx-auto text-center'>reset password</Heading1>
                </div>
                {uiLoading ? (
                    <div className="flex animate-fade-in w-full grow justify-center gap-1 flex-col">
                        <Loader2 className='animate-spin mx-auto antialiased w-10 h-10 opacity-50' />
                        <p className="text-center relative text-base text-neutral-300 font-medium transition-all">Connecting...</p>
                    </div>
                ) : (
                    identity.current ? (
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
                    {identity.current ? "Reset Password" : "Try again"}
                </Button>
            </div>
        </form>
    )
}