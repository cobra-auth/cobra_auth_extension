import { UserResource } from "../../../hooks";
import { Form } from "./Form";
import { Vault } from "./Vault";

export * from './Vault'
export * from './Form'

export interface ResourceProps<T> {
    resource: T | undefined | null
}

export function Resource({ resource }: ResourceProps<UserResource>) {
    if (resource) {
        switch (resource._type) {
            case "vault": return <Vault resource={resource} />
            case "form": return <Form resource={resource} />
        }
    }
    else {
        return <> {"Invalid resource"} </>
    }
}