import { Button, Heading1, Heading3, Input, Label } from "../../../components";
import { useIdentity } from "../../../providers/identity";
import { FormEvent, useMemo, useState } from "react";
import logo from '../../../images/logo-512.png';
import {Loader2 } from "lucide-react";
import { StageButton } from "../../../layouts/stage";
import { useQuery } from "../../../providers/auth";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../error";

export { RecoveryForm } from "./form";

export function RecoveryAuth() {
    const identity = useIdentity();

    const [loading, updateLoading] = useState(false)
    const [feedback, updateFeedback] = useState<string>()
    
    const uiLoading = useMemo(() => identity.loading || loading, [identity, loading]);
    
    const navigate = useNavigate()
    const query = useQuery();

    async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (identity.current) {
            updateLoading(!loading);

            const value: string | undefined = (document.getElementById('rec_key_input') as any)?.value
            if (value) {
                try {
                    const response = await query('/user/recovery/verify', {
                        uid: identity.current.uid,
                        rec_key: value
                    })

                    if (response.error) {
                        updateFeedback(getErrorMessage(response.error));
                    }
                    else {
                        navigate(`./${value}`)
                        updateFeedback(undefined)
                    }

                } catch {
                    updateFeedback("Something went wrong. Try again");
                }
            }
            else{
                updateFeedback('Recovery key cannot be empty')
            }

            updateLoading(false);
        }
    }

    return (
        <form onSubmit={onFormSubmit} className="h-full max-h-full layout-expand w-full flex gap-2 flex-col justify-between">
            <StageButton disabled={false} />
            <div className='flex animate-fade-in pt-12 h-full grow w-full justify-between flex-col gap-6'>
                <div className="w-full flex flex-col gap-8">
                    <img src={logo} className="h-auto w-32 mx-auto animate-logo-size-down" />
                    <div className="w-full flex flex-col gap-2">
                        <Heading1 className='mx-auto text-center'>Recover Account</Heading1>
                    </div>
                </div>
                {uiLoading ? (
                    <div className="flex animate-fade-in w-full grow justify-center gap-1 flex-col">
                        <Loader2 className='animate-spin mx-auto antialiased w-10 h-10 opacity-50' />
                        <p className="text-center relative text-base text-neutral-300 font-medium transition-all">Loading...</p>
                    </div>
                ) : (
                    identity.current ? (
                        <div className="flex w-full justify-center grow animate-fade-in gap-4 flex-col">
                            <div className='w-full relative flex flex-col gap-1'>
                                <Label>Username:</Label>
                                <Label className="text-base text-neutral-100 normal-case font-semibold">{identity.current.username}</Label>
                            </div>
                            <div className='w-full relative flex flex-col gap-1'>
                                <Label>Recovery key:</Label>
                                <Input id="rec_key_input" aria-label='rec_key' type="text" tabIndex={1} required placeholder='Enter recovery code...' className='w-full select-text' />
                            </div>
                        </div>
                    ) : (
                        <div className="flex w-full animate-fade-in gap-1 flex-col">
                            <Heading3 className="mx-auto normal-case font-bold">Failed to connect</Heading3>
                            <p className="text-center relative text-base text-neutral-300 font-medium transition-all">Looks like something went wrong, please come back and try again later.</p>
                        </div>
                    )
                )}
            </div>
            <div className="flex flex-col gap-4 w-full justify-end min-h-24 overflow-hidden h-fit shrink-0">
                <p className='text-rose-600 text-sm font-medium text-center'>{!uiLoading ? feedback : ""}</p>
                <Button tabIndex={2} className="grow-0 shrink-0">
                    {identity.current ? "Recover Account" : "Try again"}
                </Button>
            </div>
        </form>
    )
}
