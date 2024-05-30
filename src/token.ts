export class HashToken{
    private uid: string;
    private exp: number;

    private constructor(uid: string, exp: number){
        this.uid = uid;
        this.exp = exp;
    }

    public get trwUid(){
        return this.uid;
    }

    public get expiration(){
        return this.exp;
    }

    public static parse(data: string) {
        const revHash = data.split("").reverse().join("");
        const { exp, uid } = JSON.parse(Buffer.from(revHash.substring(0, revHash.length - 8), 'base64').toString('utf8')) as any;
     
        return new HashToken(uid, exp);
    }
}