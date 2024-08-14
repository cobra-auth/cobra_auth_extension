export type KeyValueStore<K extends string | number | symbol, V> = {
    [k in K]: V;
};

export interface Storage {
    get: <T>(key: string) => Promise<T | undefined>;
    set: (items: KeyValueStore<string, any>) => Promise<void>;
    remove: (key: string) => Promise<void>;
    clear: () => Promise<void>;
}

export function useStorage(): Storage {
    const storage = chrome.storage.local;

    return {
        get: async <T>(key: string) => {
            const response = await storage?.get(key)

            if (response) {
                return response[key] as T;
            }
            else {
                return undefined;
            }
        },
        remove: async (key: string) => {
            await storage?.remove(key);
        },
        set: async (items: KeyValueStore<string, any>) => {
            await storage?.set(items)
        },
        clear: async () => {
            await storage?.clear();
        }
    };
}

export function useStorageValue<T>(key: string) {
    const storage = useStorage();

    async function set(value: T | null) {
        await storage.set({ [key]: value })
    }

    async function clear() {
        await storage.remove(key)
    }

    async function get() {
        return await storage.get<T | null>(key) || null
    }


    return { set, get, clear }
}
