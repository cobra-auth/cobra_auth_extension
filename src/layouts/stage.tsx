import { Outlet } from "react-router-dom";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { twMerge } from "../components/utils";
import { useMatch, useResolvedPath } from "react-router-dom";

interface StageLayoutProps{
    className?: string
}

export function StageLayout({className}: StageLayoutProps) {
    return (
        <div className={ twMerge("h-full shrink overflow-y-hidden p-1 w-full", className)}>
            <StageButton tabIndex={9999}/>
            <Outlet />
        </div>
    )
}

export function StageButton(props: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
    const stage = useStage();
    const navigate = useNavigate()

    return (
        <button {...props} onClick={() => navigate(-1)} disabled={props.disabled != undefined ? props.disabled : stage == undefined} className={twMerge("cursor-pointer absolute pointer-events-auto text-neutral-400 bg-neutral-600/40 hover:bg-neutral-600/70 hover:text-neutral-300 disabled:opacity-0 w-fit p-1 top-0 left-0 disabled:cursor-default  select-none  transition-colors rounded-md", props.className)}>
            <ArrowLeft className="h-5 w-5" />
        </button>
    )
}


export function useStage(){
    const path = useResolvedPath('.')
    const match = useMatch<'stage', string>(`${path.pathname}/:stage`);
    
    return match?.params.stage;
}