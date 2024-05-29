import logo from '../images/logo-512.png'
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from '../providers/auth';
import { useIdentity } from '../providers/identity';
import { useEffect, useMemo, useState } from 'react';
import { Heading1, Heading3 } from '../components/Heading';
import { Loader2 } from 'lucide-react';

export interface AuthResponse {
    uid: string,
    email: string,
    username: string,
}

export function Layout() {
    const auth = useAuth()
    const identity = useIdentity();
    const location = useLocation();

    const loading = useMemo(() => auth.loading || identity.loading, [identity.loading, auth.loading])
    const error = useMemo(() => location.pathname.includes('/error/'), [location.pathname])
    
    const [expanded, updateExpanded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname == '/'){
            navigate('/sub')
        }
    }, [location.pathname])

    function onRefChanged(element: HTMLDivElement | null) {
        if (element) {
            updateExpanded(element.querySelectorAll('.layout-expand').length > 0)
        }
    }

    return (
        <div className="h-full w-full group pointer-events-auto flex">
            <div ref={onRefChanged} aria-expanded={!expanded} className='w-full group/layout justify-end flex flex-col'>
                <div className='absolute w-24 h-24 blur-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-full group-aria-expanded/layout:blur-0 opacity-0 group-aria-expanded/layout:opacity-100 transition-all'>
                    <img src={logo} className='mx-auto relative bottom-10  h-full w-full' />
                </div>
                <div className="w-full animate-fade-in  text-base group-aria-expanded/layout:max-h-72 max-h-full group-aria-expanded:mt-4 grow gap-8 flex flex-col">
                    {loading && !error ? (
                        <div className='flex-col animate-fade-in flex gap-8 w-full'>
                            <div className='w-full flex flex-col gap-1'>
                                <Heading1 className='mx-auto'>YOU'RE BROKE!</Heading1>
                                <Heading3 className='mx-auto'>Jep... You really are.</Heading3>
                            </div>
                            <div className='w-full justify-center flex'>
                                <Loader2 className='animate-spin antialiased w-10 h-10 opacity-50' />
                            </div>
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </div>
            </div>
        </div>
    )
}