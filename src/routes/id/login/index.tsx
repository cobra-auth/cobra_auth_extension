import { useNavigate } from "react-router-dom";
import { Button, Heading1, Heading3 } from "../../../components";
import { useIdentity } from "../../../providers/identity";

export{ LoginForm } from "./form";

export function LoginInit() {
    const identity = useIdentity();
    const navigate = useNavigate();

    return (
        <div className="h-full  w-full flex flex-col justify-between">
            <div className='w-full animate-fade-in flex text-center flex-col gap-1'>
                <Heading1 className='mx-auto'>Welcome!</Heading1>
                <Heading3 className='mx-auto text-base text-neutral-300 font-semibold'>{identity.current?.username}</Heading3>
            </div>
            <Button onClick={() => navigate('./form')}>
                Sign In
            </Button>
        </div>
    )
}
