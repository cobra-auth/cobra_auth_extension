import ReactDOMServer from "react-dom/server";
import { useChrome } from "./chrome";
import { UserDetails, UserResource } from ".";
import { Dialog } from "../components";

interface Value {
    _id: string,
    value: string | number
}

export function useDialog() {
    const { inject } = useChrome()

    async function show(identity: UserDetails, resource: UserResource) {
        const styles: string | undefined = (process as any)['stylesheet']?.content;
        const html = ReactDOMServer.renderToString(
            <>
                <style type="text/css" > {styles} </style>
                <Dialog submissions={[]} resource={resource} identity={identity} />
            </>
        )

        const result = await inject((html) => new Promise<Value[] | undefined>(resolve => {
            const root = document.getElementById('dialog-root')
            const form = document.getElementById('sub-form-container')

            if (root) {
                const base = form || document.createElement('div')

                base.id = 'sub-form-container';
                base.innerHTML = html;

                if(!form){
                    root.appendChild(base)
                }

                document.getElementById('sub-form-close')?.addEventListener('click', (event) => {
                    event.preventDefault()
                    event.stopImmediatePropagation()
                    event.stopPropagation()

                    base.remove()
                    
                    resolve(undefined)
                })
                
                document.getElementById('sub-form')?.addEventListener('submit', (event) => {
                    event.preventDefault()
                    event.stopImmediatePropagation()

                    const data: any[] = (event.target as any)
                    const result: Value[] = [];

                    for (var i = 0; i < data.length; i++) {
                        var _id = data[i].name
                        var value = data[i].value

                        if (value && _id) {
                            result.push({ _id, value })
                        }
                    }

                    resolve(result)
                })
            }
        }), html)

        return {
            _id: resource._id,
            data: result?.filter(x => x._id != 'guidelines')
        }
    }

    return { show }
}
