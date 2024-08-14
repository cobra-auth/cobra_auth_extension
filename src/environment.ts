function loadVariable<T extends object | string | number>(key: string): T | string {
    const value = process.env[key];

    if (value == undefined) {
        throw new Error(`${key} not set in .env file.`)
    }

    try {
        return JSON.parse(value) as T;
    }
    catch {
        return value
    }
}


const trwDomains = loadVariable<string[]>('TRW_DOMAINS') as string[];
const trwRegex = trwDomains.map(x => {
    let regexPattern = x
        .replace(/\*\:\/\//, '.*://')     // Convert *:// to .*://
        .replace(/\*\./g, '.*\\.')        // Convert *. to .*.
        .replace(/\/\*$/, '/.*');         // Convert /* to /.*
    return new RegExp(`^${regexPattern}$`, 'i');
})

export const ENVIRONMENT = {
    trwRegex,
    trwDomains,
    apiEndpoint: loadVariable<string>('API_ENDPOINT'),
    securityToken: loadVariable<string>('SECURITY_KEY'),
    securityIv: loadVariable<string>('SECURITY_IV'),
}
