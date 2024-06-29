import { FormEvent, useMemo, useState } from "react";
import { useIdentity } from "../../../providers/identity";
import { useLogin } from "../../../providers/auth/login";
import logo from '../../../images/logo-512.png';
import { Loader2 } from "lucide-react";
import { getErrorMessage } from "../../../error";
import { useNavigate } from "react-router-dom";
import { Button, Heading1, Heading3, Input, Label } from "../../../components";

export function LoginForm() {
    const identity = useIdentity();

    const [loading, updateLoading] = useState(false)
    const [feedback, updateFeedback] = useState<string>()

    const uiLoading = useMemo(() => identity.loading || loading, [identity, loading]);

    const login = useLogin()
    const navigate = useNavigate()


    async function onFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (identity.current) {
            updateLoading(!loading);

            const password = (event.target as any)[0].value || ""

            try {
                const response = await login(identity.current, password);

                if (response.error) {
                    updateFeedback(getErrorMessage(response.error));
                }
                else {
                    navigate('/')
                    updateFeedback(undefined)
                }

            } catch {
                updateFeedback("Something went wrong. Try again");
            }

            updateLoading(false);
        }
    }

    return (
        <form onSubmit={onFormSubmit} className="h-full max-h-full layout-expand w-full flex gap-2 flex-col justify-between">
            <div className='flex animate-fade-in pt-12 h-full grow w-full justify-between flex-col gap-6'>
                <div className="w-full flex flex-col gap-8">
                    <img src={logo} className="h-auto w-32 mx-auto animate-logo-size-down" />
                    <div className="w-full flex flex-col gap-2">
                        <Heading1 className='mx-auto text-center'>Sign in</Heading1>
                        <Label onClick={() => navigate('/id/recovery')} className="w-fit z-0 mx-auto hover:cursor-pointer text-center transition-colors hover:text-neutral-300 ">RECOVER ACCOUNT</Label>
                    </div>
                </div>
                {uiLoading ? (
                    <div className="flex animate-fade-in w-full grow justify-center gap-1 flex-col">
                        <Loader2 className='animate-spin mx-auto antialiased w-10 h-10 opacity-50' />
                        <p className="text-center relative text-base text-neutral-300 font-medium transition-all">Connecting...</p>
                    </div>
                ) : (
                    identity.current ? (
                        <div className="flex w-full justify-center grow animate-fade-in gap-4 flex-col">
                            <div className='w-full relative flex flex-col gap-1'>
                                <Label>Username:</Label>
                                <Label className="text-base text-neutral-100 normal-case font-semibold">{identity.current?.username}</Label>
                            </div>
                            <div className='w-full relative flex flex-col gap-1'>
                                <div className="justify-between w-full h-fit flex">
                                    <Label>password:</Label>
                                </div>
                                <Input aria-label='password' type="password" tabIndex={1} placeholder='Enter password...' className='w-full select-text' />
                            </div>
                        </div>
                    ) : (
                        <div className="flex w-full animate-fade-in gap-1 flex-col">
                            <Heading3 className="mx-auto normal-case font-bold">Failed to connect</Heading3>
                            <p className="text-center relative text-base text-neutral-300 font-medium transition-all">Looks like something went wrong, please try again later.</p>
                        </div>
                    )
                )}
            </div>
            <div className="flex flex-col gap-4 w-full justify-end min-h-24 overflow-hidden h-fit shrink-0">
                <p className='text-rose-600 text-sm font-medium text-center'>{!uiLoading ? feedback : ""}</p>
                <Button tabIndex={2} className="grow-0 shrink-0">
                    {identity.current ? "Sign In" : "Try again"}
                </Button>
            </div>
        </form>
    )
}