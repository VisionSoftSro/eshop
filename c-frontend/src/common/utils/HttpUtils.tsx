import {toast} from 'react-toastify';
import _ from 'lodash';
import {GenericMap, JsonList} from "./Util";
import {JsonProperty, Mapper} from "./objectmapper/Mapper";
import {useContext} from "react";

export class FieldError {
    name: string;
    message: string;
    localize:boolean = false;

    static Create(message:string):FieldError {
        const fe = new FieldError();
        fe.message = message;
        return fe;
    }

}

export class ValidationError {
    code: number;
    message: string;
    @JsonProperty({type:{clazz: FieldError, isArray: true}})
    errors: Array<FieldError> = new Array<FieldError>();
}

export class HttpResultSimple {
    json:any;
    response: Response;
}

export class HttpResult<Data> extends HttpResultSimple {
    data: Data;
    errors?:ValidationError
}

interface HttpUtilsConfig {
    apiUrl?:string;
    token?:string;
    on401?():void
}

let httpConfig:HttpUtilsConfig = {

};

export const setHttpConfig = (c:HttpUtilsConfig) => {
    httpConfig = _.merge(httpConfig, c);
};


export async function httpEndpointJsonList<A>(constructor: { new(): A }, url: string, init?: RequestInit): Promise<HttpResult<JsonList<A>>> {
    const result = await httpEndpoint<JsonList<A>>(JsonList, url, init);
    result.data.list = new Mapper<A>({constructor:constructor}).readValueAsArray(result.data.list);
    return result;
}

export async function httpEndpointArray<A>(constructor: { new(): A }, url: string, init?: RequestInit): Promise<HttpResult<Array<A>>> {
    const result = await httpEndpoint<Array<A>>(Array, url, init);
    result.data = result.json.map((i:any)=>new Mapper<A>({constructor:constructor}).readValue(i));
    return result;
}

export async function httpEndpoint<A>(constructor: { new(): A }, url: string, init?: RequestInit): Promise<HttpResult<A>> {
    try {
        const resultSimple = await httpEndpointCustom(url, init);
        const result = new HttpResult<A>();
        result.json = resultSimple.json;
        result.response = resultSimple.response;
        if(result.response.status === 422) {
            result.errors = new Mapper<ValidationError>({constructor:ValidationError}).readValue(resultSimple.json);
        } else {
            result.data = new Mapper<A>({constructor:constructor}).readValue(resultSimple.json);
        }

        return result;
    } catch (e) {
        throw e;
    }
}

export async function httpEndpointCustom(url: string, init?: RequestInit): Promise<HttpResultSimple> {
    const init2:RequestInit = {
        headers: {}
    };
    if(httpConfig.token) {
        // @ts-ignore
        init2.headers["Authorization"] = `Bearer ${httpConfig.token}`;
    }
    return await http(`${httpConfig.apiUrl}${url}`, _.merge(init2, init || {}));
}

export async function http(input: RequestInfo, init?: RequestInit): Promise<HttpResultSimple> {
    return fetch(input, init).then(r => {
        const result = new HttpResultSimple();
        result.response = r;
        if(r.status === 401 && httpConfig.on401) {
            httpConfig.on401();
            throw 401;
        }
        if(r.body !== null) {
            return r.json().then(e => {
                result.json = e;
                return result;
            }).catch(()=>result);
        } else {
            return result;
        }
    }).catch(e => {
        console.error(e);
        if(e === 401) {
            toast.error(Strings.Error401);
        } else {
            toast.error(Strings.NetworkError);
        }
        throw null;
    })
}