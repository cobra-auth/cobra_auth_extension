import { useNavigate, useParams } from "react-router-dom";
import { Heading2, Button } from "../../components";
import { useMemo } from "react";

export function Error() {
    const navigate = useNavigate();
    const params = useParams();

    const message = useMemo(() => getErrorMessage(params['code']), [])

    return (
        <div className='flex flex-col animate-fade-in w-full justify-between h-full'>
            <div className=' w-full flex text-center flex-col gap-1'>
                <Heading2 className='mx-auto text-2xl'>failed to connect</Heading2>
                <p className='mx-auto text-base text-neutral-300 font-semibold'>{message}</p>
            </div>
            <Button tabIndex={1} onClick={() => navigate(-1)}>
                Try again
            </Button>
        </div>
    )
}

function getErrorMessage(code: string | undefined){
    switch (code){
        case 'trw': return 'Please make sure TRW is open, logged in, and try again.'
        case 'chrome': return 'Please make sure Chrome is logged in, and try again.'
        case 'tv': return 'Please make sure TradingView is open, logged in, and try again.'
        case 'wrong_email': return "Please switch to the correct google account and try again."
        default: return 'Looks like something went wrong, please try again.'
    }
}