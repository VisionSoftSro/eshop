import {ObjectMapper} from "./ObjectMapper";
import {toast} from 'react-toastify';
import {TokenStore} from "../TokenStore";
import _ from 'lodash';
import config from '../../Config';
import {JsonList} from "./Util";
export class HttpResult<Data> {
    data: Data;
    json:any;
    response: Response;
}


export async function httpEndpointList<A>(constructor: { new(): A }, url: string, init?: RequestInit): Promise<HttpResult<JsonList<A>>> {
    const result = await httpEndpoint<JsonList<A>>(JsonList, url, init);
    result.data.list = new ObjectMapper<A>().readValueAsArray(constructor, result.data.list);
    return result;
}


export async function httpEndpoint<A>(constructor: { new(): A }, url: string, init?: RequestInit): Promise<HttpResult<A>> {
    const init2 = {
        headers: {
            "Authorization": `Bearer ${TokenStore.getToken().accessToken}`
        }
    };
    return await http<A>(constructor, `${config.backendUrl}/${url}`, _.merge(init2, init || {}));
}

export function http<T>(constructor: { new(): T }, input: RequestInfo, init?: RequestInit): Promise<HttpResult<T>> {
    return fetch(input, init).then(r => {
        const result = new HttpResult<T>();
        result.response = r;
        if(r.body !== null) {
            return r.json().then(e => {

                result.json = e;
                if(r.status === 200) {
                    result.data = new ObjectMapper<T>().readValue(constructor, e);
                }
                return result;
            }).catch(()=>result);
        } else {
            return result;
        }
    }).catch(e => {
        console.error(e);
        toast.error(Strings["NetworkError"]);
        return null;
    })
}