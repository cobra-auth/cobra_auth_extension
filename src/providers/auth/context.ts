import { createContext } from "react";

interface AuthContext{
    loading: boolean;
    authenticate: () => Promise<void>;
    update: (token: string | null) => Promise<void>;
    current: () => string | null;
}

export const AUTH_CONTEXT = createContext<AuthContext>({
    loading: true,
    authenticate: async () => { },
    update: async () => { },
    current: () => null
});
