import { SubmissionDetails, Submission } from "./Submission";
import { Feedback } from "../Feedback";
import { HTMLAttributes } from "react";
import { twMerge } from "../utils";

interface HistoryProps extends HTMLAttributes<HTMLDivElement> {
    submissions: SubmissionDetails[] | undefined
}

export function History({ submissions, className }: HistoryProps) {
    return (
        <section className={twMerge("bg-base-100 h-fit flex flex-col grow gap-4", className)}>
            <div className="shrink-0 sticky grow-0 text-xl h-8 font-medium items-center my-auto flex">
                Submission History
            </div>
            <div className="flex flex-col gap-2 relative grow overflow-y-auto swipe-dialog-scroll-descendant" data-scrollable={true}>
                {submissions ? (
                    submissions.length > 0 ? (
                        submissions?.map((details, index) => (
                            <Submission key={`sub-${index}`} className=" bg-slate-500/30" details={details} />)
                        )
                    ) : (<Feedback message="Looks like you haven't made any submissions yet." />)
                ) : (<Feedback message="Failed to load submission history." />)}
            </div>
        </section>
    )
}