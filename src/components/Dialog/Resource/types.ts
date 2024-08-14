export type Resource<K extends string, T> = {
    _id: string,
    _type: K,
    name: string
    config: T
}
