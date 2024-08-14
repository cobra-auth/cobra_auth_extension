import { ResourceProps } from "..";
import { Button } from "../../../Button";
import { FormField, CheckboxField } from "./Field";
import { FormResource } from "./types";

export * from './types'

export function Form({ resource }: ResourceProps<FormResource>) {
    return (
        <div id="sub-form" className="flex rounded-lg bg-dark-700 py-8 flex-col p-4 shrink-0 grow overflow-hidden">
            <form autoComplete='none' className=" flex flex-col gap-12 w-full max-w-md h-fit m-auto">
                <div className="shrink-0 grow-0 font-medium flex flex-col gap-1">
                    <h1 className="text-2xl justify-center items-center flex">
                        Submission Form
                    </h1>
                    <h4 className="text-base text-dark-500 justify-center items-center flex">{resource?.name}</h4>
                </div>
                <div className="grow flex flex-col gap-4">
                    {resource?.config.fields.map(x => <FormField required key={x._type} name={x._id} {...x} />)}
                </div>
                <div className="grow flex flex-col gap-4">
                    <CheckboxField _type="checkbox" label="I confirm I have read the guidelines" _id="guidelines" name="guidelines" required className="mx-auto" />
                    <div className="flex gap-4 flex-col-reverse md:flex-row pt-4">
                        <Button type="reset" className="mt-auto bg-transparent border border-dark-500 hover:bg-slate-500/30 text-dark-500 ">Clear</Button>
                        <Button type="submit" className="mt-auto">Submit</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}