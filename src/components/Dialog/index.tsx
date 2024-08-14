import { X } from 'lucide-react'
import { IconButton } from '../Button'
import { UserInfo } from '../UserInfo'
import { History } from './History'
import { SubmissionDetails } from './Submission'
import { Resource } from './Resource'
import { UserDetails, UserResource } from '../../hooks'

export * from './Resource'

interface DialogProps{
    identity: UserDetails | undefined
    resource: UserResource
    submissions: SubmissionDetails[] | undefined
}

export function Dialog({ submissions, identity, resource }: DialogProps) {
    return (
        <div data-dialog={true} className="overflow-hidden pointer-events-auto flex justify-center fixed z-50 inset-0 bg-backdrop bg-opacity-50 backdrop-blur-[1px] backdrop-filter transition-all opacity-1">
            <div className="bg-neutral overflow-hidden flex flex-col lg:flex-row size-full shadow-xl mt-auto md:my-auto max-h-[90vh] md:max-w-[85%] lg:max-w-[1200px] gap-4 items-center border border-transparent md:border-primary rounded-t-lg p-4 pb-0 md:p-6 md:rounded-lg">
                <div className="grow size-full overflow-hidden hidden lg:flex md:max-w-[360px] gap-4 flex-col">
                    <UserInfo user={identity} />
                    <History className="p-4 rounded-lg overflow-hidden h-full" submissions={submissions} />
                </div>
                <div className="grow w-full md:h-full flex flex-col gap-4 overflow-hidden ">
                    <div className="w-full flex md:h-14 overflow-hidden md:pl-2 justify-between shrink-0">
                        <div className="grow shrink overflow-hidden text-xl font-medium whitespace-nowrap items-center my-auto flex h-10">
                            IMC - Post Graduation
                        </div>
                        <IconButton type='button' id="sub-form-close" className="h-10 text-dark-500 w-10 translate-x-2.5 grow-0 my-auto shrink-0">
                            <X className="size-8 ml-auto" />
                        </IconButton>
                    </div>
                    <div className="grow flex flex-col gap-4 overflow-hidden">
                        <UserInfo className="flex flex-row lg:hidden" user={identity} />
                        <div className="flex grow flex-col pb-4 md:pb-0 gap-12 overflow-auto">
                            <Resource resource={resource}/>
                            <History className="h-fit lg:hidden bg-transparent" submissions={submissions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}