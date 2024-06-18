import { decrypt, encrypt } from "./crypto";

export interface Packet<T> {
    auth: string | null
    data: T,
}

export class Api {
    static async post<T extends string | number | object = "success">(endpoint: string, data: Packet<any> | null) {
        return await this.resolve<T>(endpoint, 'POST', data);
    }


    public static async get<T extends string | object | number = "success">(endpoint: string) {
        return this.resolve<T>(endpoint, 'GET', null);
    }

    private static async resolve<T extends string | object | number>(endpoint: string, method: 'POST' | 'GET', data: Packet<any> | null) {
        const url = `${process.env.API_ENDPOINT || ''}${endpoint}`
        const [status, response] = await fetch(url, {
            method: method,
            mode: 'cors',
            credentials: "include",
            keepalive: true,
            body: await encrypt(data)
        }).then(x => Promise.all([x.status, x.text()]))

        if (status != 200) {
            switch (status) {
                case 404: throw new Error('@404');
                case 505: throw new Error('@505');
                default: throw new Error(response);
            }
        }

        try {
            return await decrypt<Packet<T>>(response)
        } catch (err) {
            return new Promise<Packet<T>>(resolve => {
                resolve({
                    auth: null,
                    data: err as any
                })
            })
        }
    }
}

export { encrypt, decrypt }