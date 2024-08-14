import { VaultResource, FormResource } from "../components/Dialog/Resource";
import { useStorageValue } from "./storage";

export type UserResource = VaultResource | FormResource
export const useSessionStorage = () => useStorageValue<string>('session-token')

export interface UserDetails {
    uid: string,
    avatar: string,
    server: string,
    roles: string[],
    username: string,
}

export interface SessionDetails {
    token: string,
}

export interface SessionToken {
    uid: string,
    resource: string | null,
    expired: number,
    auth_role: number,
}
