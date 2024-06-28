import { useState } from "react";
import { Button, Heading1, Heading3 } from "../../components";
import { useIdentity } from "../../providers/identity";
import { useQuery } from "../../providers/auth";
import { useNavigate } from "react-router-dom";
import { SubQueryResult } from "./types";

export { SubTimeout } from "./timeout";
export { SubPending } from "./pending";
export { SubHistory } from "./history";
export { SubResult } from "./result";

export function SubInit() {
    const identity = useIdentity();
    const [loading, updateLoading] = useState(false)

    const query = useQuery();
    const navigate = useNavigate();

    async function onClick() {
        updateLoading(true);

        if (!identity.current) {
            await identity.update()
        }
        else {
            try {

                const response = await query<SubQueryResult>('/sub', null);

                if (response.result) {
                    if (response.result.success) {
                        navigate(`./${response.result.data}`)
                    }
                    else {
                        switch (response.result.data) {
                            case "pending_sub": navigate(`./pending_sub`); break;
                            default: navigate(`./timeout/${response.result.data}`); break;
                        }
                    }
                }
                else if (response.error) {
                    alert(response.error)
                }
            } catch ({ message }: any) {
                const error = message as string;
                alert(error)
            }
        }

        updateLoading(false)
    }

    return (
        <div className="h-full  w-full flex flex-col justify-between">
            <div className='w-full animate-fade-in flex text-center flex-col gap-1'>
                <Heading1 className='mx-auto'>Welcome</Heading1>
                <Heading3 className='mx-auto text-base text-neutral-300 font-semibold'>{identity.current?.username}</Heading3>
            </div>
            <Button tabIndex={1} disabled={loading} onClick={onClick}>
                Get Auth Code
            </Button>
        </div>
    )
}
