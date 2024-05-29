import { twMerge as internalMerge } from "tw-merge"

export function twMerge(...params: (string | undefined)[]){
    return internalMerge(params.map(x => x || '').join(" "))
}