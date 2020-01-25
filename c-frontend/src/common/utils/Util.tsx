import {JsonProperty} from "./ObjectMapper";
import browserHistory from '../utils/History';
import DataStorage from "../DataStorage";
import {TokenStore} from "../TokenStore";
export const jsonToFormData = (json:any, dataConverter:(field:any)=>any = (field)=>field, skipNull:boolean=true) => {
    const formData = new FormData();
    const preConverter = (field:any) => {
        if(field === null || field === undefined) {
            return null;
        }
        return dataConverter(field);
    };
    Object.keys(json).forEach(e=>{
        const value = json[e];
        if(value === null || value === undefined) return;
        if(Array.isArray(value)) {
            for(let i = 0; i < value.length; i++) {
                const aitem = value[i];
                Object.keys(aitem).forEach(k=>{
                    let value2 = aitem[k];
                    if(value2 === null || value2 === undefined) return;
                    formData.set(`${e}[${i}].${k}`, preConverter(value2));
                });
            }
        } else {
            formData.set(e, preConverter(value));
        }
    });
    return formData;
};
export const exist = (value?:any) => value !== null && value !== undefined;

export type GenericMap<T> = {[key:string]:T}

export class JsonList<E> {

    @JsonProperty()
    data:Array<E>;
}
export class ScrollableList<E> extends JsonList<E> {
    @JsonProperty()
    page: number = 0;
    @JsonProperty()
    objectsPerPage: number = 0;
    @JsonProperty()
    total: number = 0;
    @JsonProperty()
    pages: number;
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

export function getHashValue(key:string) {
    const matches = location.hash.match(new RegExp(key+'=([^&]*)'));
    return matches ? matches[1] : null;
}

export function toSeoString(str:string) {
    return str.toLowerCase().trim().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}