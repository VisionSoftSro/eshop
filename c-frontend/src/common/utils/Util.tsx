import {currentLocale} from "./LocaleAccessor";
import _ from 'lodash';



export const formatNumber = (value:number) => {
    return value.toLocaleString(currentLocale());
};

export const formatPrice = (value:number, currency:string) => {
    return value.toLocaleString(currentLocale(), {style: 'currency', currency: currency});
};

export function clamp(v:number, min:number, max:number) { return v < min ? min : v > max ? max : v; }


type jsonToFormDataType = {
    dataConverter?:(key:string, value:any)=>any
    skipNull?:boolean
};

export const jsonToFormUrlEncoded = (json:GenericMap, userOptions?:jsonToFormDataType) => {
    let formData = [] as string[];
    jsonTo({set:(name, value)=>{
            const encodedKey = encodeURIComponent(name);
            const encodedValue = encodeURIComponent(value);
            formData.push(encodedKey + "=" + encodedValue);
        }}, json, userOptions);
    return formData.join("&");
};
export const jsonToFormData = (json:GenericMap, userOptions?:jsonToFormDataType):FormData => {
    const formData = new FormData();
    jsonTo({set:(name, value)=>formData.set(name, value)}, json, userOptions);
    return formData;
};

export const jsonTo = ({set}:{set:(name:string, value:any)=>void}, json:GenericMap, userOptions?:jsonToFormDataType) => {
    console.log("json", json);
    // const formData = new FormData();
    const defaultOptions:jsonToFormDataType = {dataConverter:(key, value)=>value, skipNull:true};
    const {dataConverter, skipNull} = _.merge(defaultOptions, userOptions);
    Object.keys(json).forEach(e=>{
        const value = json[e];
        if(value) {
            const resultValue = dataConverter(e, value);
            if(resultValue !== null || !skipNull) {
                if(Array.isArray(resultValue)) {
                    for (let i = 0; i < resultValue.length; i++) {
                        let o = resultValue[i];
                        if(typeof o === "object") {
                            Object.keys(o).forEach(oe => {
                                set(`${e}[${i}].${oe}`, dataConverter(oe, o[oe]));
                            })
                        } else {
                            set(`${e}[${i}]`, o);
                        }
                    }
                    set(`${e}_length`, resultValue.length.toString())
                } else {
                    set(e, resultValue);
                }
            }
        }
    });
};
export const exist = (value?:any) => value !== null && value !== undefined;

export type GenericMap<T = any> = {[key:string]:T}

export class JsonList<E> {
    list:Array<E>;
}

export class ScrollableList<A> extends JsonList<A> {
    page: number;
    objectsPerPage: number;
    total: number;
    pages: number;
}
export type Constructor<Type> = {new():Type}


export const deepEqual = <T extends object>(left:T, right:T, exclude:string[] = null) => {

    let newLeft:T = Object.assign({}, left);
    let newRight:T = Object.assign({}, right);
    if(exclude !== null) {
        exclude.forEach(key=>{
            //@ts-ignore
            delete newLeft[key];
            //@ts-ignore
            delete newRight[key];
        })
    }
    return _.isEqual(newLeft, newRight);
};


export const arrayToObject = (array:any[], {idKey, valueKey}:{idKey:any, valueKey:any}):{} => {
    const obj = {};
    // @ts-ignore
    array.forEach(o=>obj[o[idKey]]=o[valueKey]);
    return obj;
};

export function getHashValue(key:string) {
    const matches = location.hash.match(new RegExp(key+'=([^&]*)'));
    return matches ? matches[1] : null;
}

export function toSeoString(str:string) {
    return str.toLowerCase().trim().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}