import { MemoryRouter, Outlet, Route, Routes } from "react-router-dom";
import { AuthProvider, Authenticate } from "./providers/auth";
import { IdentityProvider } from "./providers/identity";
import { Layout } from "./layouts";
import { Error } from "./routes/error";
import { RegisterForm, RegisterChrome, RegisterInit, RegisterTradingView, RegisterCode } from "./routes/id/register";
import { StageLayout } from "./layouts/stage";
import {  LoginForm, LoginInit } from "./routes/id/login";
import { SubHistory, SubInit, SubPending, SubResult, SubTimeout } from "./routes/sub";
import { RecoveryAuth, RecoveryForm } from "./routes/id/recovery";
import { Browser, useBrowser } from "./hooks/browser";

export function App() {
    const browser = useBrowser();

    if(browser != Browser.Chrome){
        alert("Looks like you're not on the Chrome Browser, please read the guidelines and try again on the chrome browser")
        return null
    }

    return (
        <MemoryRouter>
            <IdentityProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Layout />} >
                            <Route path="sub" element={(
                                <Authenticate>
                                    <Outlet />
                                </Authenticate>
                            )} >
                                <Route index element={<SubInit />} />
                                <Route path=":code" element={<SubResult />} />
                                <Route path="timeout/:timeout" element={<SubTimeout />} />
                                <Route path="pending_sub" element={<SubPending />} />
                                <Route path="history" element={<SubHistory />} />
                            </Route>

                            {/* Authentication */}
                            <Route path="id" element={(<Outlet />)}>
                                {/* Login */}
                                <Route path="login/" element={<StageLayout />}>
                                    <Route index element={<LoginInit />} />
                                    <Route path="form" element={<LoginForm />} />
                                </Route>

                                {/* Recovery */}
                                <Route path="recovery/" element={<StageLayout />}>
                                    <Route index element={<RecoveryAuth />} />
                                    <Route path=":code" element={<RecoveryForm />} />
                                </Route>

                                {/* Register */}
                                <Route path="register/" element={<StageLayout />}>
                                    <Route index element={<RegisterInit />} />
                                    <Route path="chrome" element={<RegisterChrome />} />
                                    <Route path="tv" element={<RegisterTradingView />} />
                                    <Route path="form" element={<RegisterForm />} />
                                    <Route path=":code" element={<RegisterCode />} />
                                </Route>
                            </Route>

                            {/* Error handling */}
                            <Route path="/error/:code" element={<Error />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </IdentityProvider>
        </MemoryRouter>
    )
}