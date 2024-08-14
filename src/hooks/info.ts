import { UserDetails } from "./session";
import { useChrome } from "./chrome"

interface MemberResponse {
    member: {
        roles: string[],
    },
    user: {
        username: string,
        avatar: {
            _id: string
        }
    }
}

export function useInfo() {
    const { inject } = useChrome()


    async function read(): Promise<UserDetails | undefined> {
        const response = await inject(() => new Promise<UserDetails | string>((resolve) => {
            // Read session cookie to get user info
            const cookie = decodeURIComponent(document.cookie).replace(' ', '').split(';').map(x => {
                if (x.startsWith('rauth')) {
                    return JSON.parse(x.split('=')[1])
                }
            }).find(x => x != undefined)

            if (cookie == undefined) {
                resolve("Failed to connect, make sure you're signed in and refresh")
            }

            const serverId = window.location.pathname.match(/\/chat\/([^/]+)\//)?.[1]

            if (serverId == undefined || serverId == 'me') {
                resolve("Please select the correct campus from the left toolbar.")
            }

            // Request our own user info and drop session token cache
            fetch(`https://api.therealworld.ag/servers/${serverId}/members_search?query=${cookie.user_id}&offset=0&limit=100&server_ids=${serverId}`, {
                headers: {
                    "X-Session-Token": cookie.token
                }
            }).then(x => x.json()).then(([data]: MemberResponse[]) => {
                // Return privacy safe data
                resolve({
                    roles: data.member.roles,
                    server: serverId!,
                    uid: cookie.user_id,
                    avatar: data.user.avatar._id,
                    username: data.user.username,
                })
            })
        }))

        if (typeof response == 'string') {
            throw new Error(response)
        }

        if(response){
            const roles = response.roles.reduce<string[]>((res, curr) => {
                if(res.indexOf(curr) < 0){
                    return [...res, curr]
                }
                
                return res
            }, [])

            return {
                ...response,
                roles
            }
        }

        return response
    }

    return { read };
}
