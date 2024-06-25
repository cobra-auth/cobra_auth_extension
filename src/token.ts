export class HashToken{
    private _uid: string;
    private _exp: number;

    private constructor(uid: string, exp: number){
        this._uid = uid;
        this._exp = exp;
    }

    public get uid(){
        return this._uid;
    }

    public get expiration(){
        return this._exp;
    }

    public static parse(data: string) {
        const revHash = data.split("").reverse().join("");
        const { exp, uid } = JSON.parse(Buffer.from(revHash.substring(0, revHash.length - 8), 'base64').toString('utf8')) as any;
     
        return new HashToken(uid, exp);
    }
}