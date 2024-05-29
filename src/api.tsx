import { Packet } from "./providers/auth";
import { decrypt, encrypt } from '@pandorae-libertas/e2e-crypto-ts';

export type ApiEndpoint = `/id/${'' | 'verify' | 'register' | 'login' | `recovery/${'verify' | 'reset'}`}` | `/sub/${'' | 'history'}`

export interface ApiError {
    message: string,
    code: number
}

export class Api {
    static async post<T = "success">(endpoint: ApiEndpoint, data: Packet<any> | null) {
        return await this.resolve<T>(endpoint, 'POST', data);
    }

    static async resolve<T>(endpoint: ApiEndpoint, method: 'POST', data: Packet<any> | null) {
        const url = `${process.env.API_ENDPOINT}${endpoint}`

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

        try{
            return await decrypt<Packet<T>>(response)
        }catch (err){
            alert(err);
        }
    }
}
