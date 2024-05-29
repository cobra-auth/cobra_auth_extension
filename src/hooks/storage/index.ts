import { Storage, StorageType, KeyValueStore } from "./types";

export type { KeyValueStore, Storage }

function getInternalStorage(storage: StorageType) {
    switch (storage) {
        case "local": return localStorage;
        case "session": return sessionStorage;
    }
}

export function useStorage(storage: StorageType): Storage {
    const internal = getInternalStorage(storage);

    return {
        get: (key: string) => {
            const response = internal.getItem(key)

            if (response) {
                return JSON.parse(response);
            }
            else {
                return undefined;
            }
        },
        remove: (key: string) => {
            internal.removeItem(key);
        },
        set: <T>(key: string, value: T) => {
            if (value != undefined) {
                internal.setItem(key, JSON.stringify(value))
            }
            else{
                internal.removeItem(key)
            }
        },
        clear() {
            internal.clear();
        }

    }
}