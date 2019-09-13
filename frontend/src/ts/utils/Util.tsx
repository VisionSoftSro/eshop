import {JsonProperty} from "./ObjectMapper";
import browserHistory from '../utils/History';
import DataStorage from "../DataStorage";
import {TokenStore} from "../TokenStore";
import {Price, PriceResult} from "../model/Price";

export const jsonToFormData = (json:any, dataConvertor:(field:any)=>any = (field)=>field) => {
    const formData = new FormData();
    Object.keys(json).forEach(e=>{
        const value = json[e];
        if(value !== undefined)
       formData.set(e, dataConvertor(value));
    });
    return formData;
};
export const exist = (value?:any) => value !== null && value !== undefined;

export type GenericMap<T> = {[key:string]:T}

export class JsonList<E> {

    @JsonProperty()
    list:Array<E>;
}

export const isAuthenticated = () => {
    return TokenStore.getToken() !== null;
};


export const currentLocale = () => {
    return DataStorage.get("locale");
};


let scrollIndex = 0;
let scrollListeners = new Map();
export const addScrollListener = (method:()=>void):number => {
    scrollIndex++;
    scrollListeners.set(scrollIndex, method);
    return scrollIndex;
};
export const removeScrollListener = (id:number) => {
    scrollListeners.delete(id);
};
window.onscroll = ev => {
    scrollListeners.forEach((value, key, map) => {
        value(ev);
    })
};


export const formatNumber = (value:number) => {
    return value.toLocaleString(currentLocale());
};

export const formatPrice = (result:PriceResult) => {
    return result.value.toLocaleString(currentLocale(), {style: 'currency', currency: result.currency});
};