import {JsonProperty} from "./ObjectMapper";
import browserHistory from '../utils/History';
import DataStorage from "../DataStorage";
import {TokenStore} from "../TokenStore";
export const jsonToFormData = (json:any, dataConverter:(field:any)=>any = (field)=>field) => {
    const formData = new FormData();
    Object.keys(json).forEach(e=>{
        const value = json[e];
        if(value !== undefined)
       formData.set(e, dataConverter(value));
    });
    return formData;
};
export const exist = (value?:any) => value !== null && value !== undefined;

export type GenericMap<T> = {[key:string]:T}

export class JsonList<E> {

    @JsonProperty()
    list:Array<E>;
}

// export const isAuthenticated = () => {
//     return TokenStore.getToken() !== null;
// };
export const currentLocale = () => {
    // @ts-ignore
    return window.locale || DataStorage.get("locale");
};

export const formatNumber = (value:number) => {
    return value.toLocaleString(currentLocale());
};

export const formatPrice = (value:number, currency:string) => {
    return value.toLocaleString(currentLocale(), {style: 'currency', currency: currency});
};

export function clamp(v:number, min:number, max:number) { return v < min ? min : v > max ? max : v; }