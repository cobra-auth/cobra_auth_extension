import { useEffect, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Button, UserInfo } from "./components";
import { useIdentify, UserDetails } from "./hooks";

export function App() {
    const identify = useIdentify();

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string>()
    const [user, setUser] = useState<UserDetails>()

    useEffect(() => {
        setLoading(true);
        setError(undefined)

        identify().then(x => {
            if(x.error){
                setError(x.error)
            }
            else{
                setUser(x.result || undefined)
            }

            setLoading(false)
        })
    }, [])

    async function onOpenSubmissions() {
        await chrome.runtime.sendMessage({ type: 'open-resource-dialog', data: { label: 'fsd' } });
    }

    return (
        <div aria-expanded={user == undefined && !loading} className="size-full select-none group flex flex-col group transition-all">
            {loading ? (
                <Loader2 className='animate-spin m-auto antialiased size-12 opacity-50' />
            ) : (
                <div className="size-full overflow-hidden flex">
                    {user ? (
                        <div className="flex flex-col gap-4 animate-fade-in grow delay-300">
                            <UserInfo user={user} />
                            <Button onClick={onOpenSubmissions} className="h-14 shrink-0 flex gap-2 justify-center">
                                <Send className="size-5 my-auto" />
                                My Submissions
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 animate-fade-in grow delay-300">
                            <div className="h-12 grow-0 shrink-0 text-base">
                                {error}
                            </div>
                            <Button className="h-14 shrink-0">Retry</Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
