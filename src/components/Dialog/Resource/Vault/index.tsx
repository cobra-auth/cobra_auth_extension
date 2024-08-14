import { ResourceProps } from "..";
import { Resource } from "../types";

export type VaultResource = Resource<"vault", undefined>

export function Vault({ resource }: ResourceProps<VaultResource>) {
    return (
        <div className="flex rounded-lg bg-dark-700 py-8 flex-col p-4 shrink-0 grow overflow-hidden">
            <form autoComplete='none' className=" flex flex-col gap-12 w-full max-w-md h-fit m-auto">
                <div className="shrink-0 grow-0 font-medium flex flex-col gap-1">
                    <h1 className="text-2xl justify-center items-center flex">
                        💎 {resource?.name}
                    </h1>
                    <h1 className="text-base text-center">Congratulations! You have reached Investing Master</h1>
                </div>
            </form>
        </div>
    )
}