import { ENVIRONMENT } from "./environment"
import { useApi, useDialog, useIdentify, UserResource } from "./hooks";

interface Message<T> {
    type: string,
    data: T
}

chrome.tabs.onUpdated.addListener(async (_, info, tab) => {
    const identify = useIdentify()
    const url = tab.url;

    if (info.status == 'complete' && url) {
        if (ENVIRONMENT.trwRegex.some(regex => regex.test(tab.url!))) {
            await identify()
        }
    }
})

chrome.runtime.onMessage.addListener(async (message: Message<{}>) => {
    const identify = useIdentify()

    const { show } = useDialog();
    const { post, get } = useApi();

    const identity = await identify()

    if (identity.result) {
        if(!identity.result.resource){
            throw new Error('No resource set')
        }

        const resource = await get<UserResource>(`/v2/resource/${identity.result.resource}`);

        if (resource.result) {
            switch (message.type) {
                case 'open-resource-dialog': {
                    const result = await show(identity.result.user, resource.result);
                    
                    if(result.data){
                        const response = await post('/v2/submission', result)
                        
                        if(response.result){

                        }
                        else{
                            console.error(response.error)
                        }
                    }
                    else{
                        console.log('Result is empty')
                    }

                } break;
                default: return;
            }
        }
        else {
            console.error(resource.error)
        }
    }
    else {
        console.error(identity.error)
    }

})