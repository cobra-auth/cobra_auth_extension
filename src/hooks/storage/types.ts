export type StorageType = 'local' | 'session'

export type KeyValueStore<K extends string | number | symbol, V> = {
    [k in K]: V;
};

export interface Storage {
    get: <T>(key: string) => T | undefined;
    set: <T>(key: string, value: T) => void;
    remove: (key: string) => void;
    clear: () => void;
}