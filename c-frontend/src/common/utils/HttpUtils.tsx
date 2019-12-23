import {ObjectMapper} from "./ObjectMapper";
import {toast} from 'react-toastify';
import _ from 'lodash';
import {GenericMap, JsonList} from "./Util";
export class HttpResult<Data> {
    data: Data;
    json:any;
    response: Response;
}

interface HttpUtilsConfig {
    apiUrl?:string;
    token?:string;
}

let httpConfig:HttpUtilsConfig = {

};

export const setConfig = (c:HttpUtilsConfig) => {
    httpConfig = _.merge(httpConfig, c);
};


export async function httpEndpointJsonList<A>(constructor: { new(): A }, url: string, init?: RequestInit): Promise<HttpResult<JsonList<A>>> {
    const result = await httpEndpoint<JsonList<A>>(JsonList, url, true, init);
    result.data.list = new ObjectMapper<A>().readValueAsArray(constructor, result.data.list);
    return result;
}

export async function httpEndpointArray<A>(constructor: { new(): A }, url: string, init?: RequestInit): Promise<HttpResult<Array<A>>> {
    const result = await httpEndpoint<Array<A>>(Array, url, false, init);
    result.data = result.json.map((i:any)=>new ObjectMapper<A>().readValue(constructor, i));
    return result;
}
export async function httpEndpoint<A>(constructor: { new(): A }, url: string, customMapping:boolean = true, init?: RequestInit): Promise<HttpResult<A>> {
    const init2:RequestInit = {
        headers: {}
    };
    if(httpConfig.token) {
        // @ts-ignore
        init2.headers["Authorization"] = `Bearer ${httpConfig.token}`;
    }
    return await http<A>(constructor, `${httpConfig.apiUrl}${url}`, customMapping, _.merge(init2, init || {}));
}

export function http<T>(constructor: { new(): T }, input: RequestInfo, useMapping:boolean = true, init?: RequestInit): Promise<HttpResult<T>> {
    return fetch(input, init).then(r => {
        const result = new HttpResult<T>();
        result.response = r;
        if(r.body !== null) {
            return r.json().then(e => {
                result.json = e;
                if(r.status === 200 && useMapping) {
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