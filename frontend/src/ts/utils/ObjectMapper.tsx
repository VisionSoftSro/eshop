import "reflect-metadata";
import {capitalize} from "./StringExtension";

export interface StrictType {
    //if property is enum or class then dataType is ignored
    dataType?:any,
    isArray?:boolean,
}
export interface LocalizedProperty {
    referenceKey?:string
    textsProvider?:string
    defaultKey?:string
    suffix?:string
}
export interface JsonPropertyMetaData<T> {
    strict?:StrictType,
    name?: string,
    clazz?: {new(): T},
    enumSource?:any,
    dataProvider?:string,
    converter?:(jsonValue:any)=>any,
    localize?:LocalizedProperty
    notNull?:boolean
}
const JSON_META_DATA_KEY = "JsonProperty";
const JSON_IGNORE_META_DATA_KEY = "JsonIgnore";
export function JsonProperty<T>(metadata?: JsonPropertyMetaData<T>|string): (target: Object, targetKey: string | symbol)=> void {
    let decoratorMetaData: JsonPropertyMetaData<T>;
    if(metadata === null || typeof metadata === 'undefined') {
        decoratorMetaData = {};
    } else if (typeof metadata === 'object') {
        decoratorMetaData = metadata as JsonPropertyMetaData<T>;
    }
    // @ts-ignore
    return Reflect.metadata(JSON_META_DATA_KEY, decoratorMetaData);
}
export function JsonIgnore<T>(): (target: Object, targetKey: string | symbol)=> void {
    // @ts-ignore
    return Reflect.metadata(JSON_IGNORE_META_DATA_KEY, true);
}
const formatMetadataKey = Symbol("format");

export function format(formatString: string) {
    // @ts-ignore
    return Reflect.metadata(formatMetadataKey, formatString);
}

export class ObjectMapperConfig<T> {
    //throw errors when types from class and json not match
    strictTypes?:boolean = false;
    defaultValuesFromClass?:boolean=true;
    dataProviders?:(root:T)=>Map<string, any>;
}

export const convertorArrayToMap = (array:Array<any>, key="id") => {
    const map = new Map();
    array.forEach(item=>{
        map.set(item[key], item);
    });
    return map;
};

const throwError = (instance:any, fieldKey:string, value?:any, index?:number) => {
    throw new Error(`${instance.constructor.name}::${fieldKey} has wrong property type '${value||undefined}'${index&&` at index ${index} of array`||""}`);
};

export class ObjectMapper<A> {

    config:ObjectMapperConfig<A>;
    instance:A;
    constructor(config?: ObjectMapperConfig<A>) {
        this.config = Object.assign(new ObjectMapperConfig<A>(), config);
    }

    getJsonProperty<T>(target: any, propertyKey: string): JsonPropertyMetaData<T> {
        // @ts-ignore
        return Reflect.getMetadata(JSON_META_DATA_KEY, target, propertyKey);
    }
    getJsonIgnore<T>(target: any, propertyKey: string): JsonPropertyMetaData<T> {
        // @ts-ignore
        return Reflect.getMetadata(JSON_IGNORE_META_DATA_KEY, target, propertyKey);
    }

    strictValidation<T>(instance:any, meta:JsonPropertyMetaData<T>, fieldKey:string, value:any) {
        if(value === undefined) {
            return;
        }
        if(this.config.strictTypes &&
            (value != null || typeof value !== 'undefined') &&
            (meta.dataProvider === null || typeof meta.dataProvider === 'undefined') &&
            (meta.localize === null || typeof meta.localize === 'undefined')) {

            const strict = meta.strict;
            const isArray = strict && strict.isArray;
            const testArray = () => {
                if(!Array.isArray(value) && isArray) {
                    throw new Error('${instance.constructor.name}::${fieldKey} => Json Value is not array');
                }
            };
            if( meta.clazz !== undefined || meta.enumSource !== undefined){
                testArray();
                if(meta.enumSource) {
                    const testEnum = (enumValue:any):boolean => typeof enumValue === 'undefined';
                    if(isArray) {
                        value.forEach((v:any, i:number) => {
                            if(testEnum(meta.enumSource[capitalize(v)])){
                                throwError(instance, fieldKey, value, i)
                            }
                        });
                    } else {
                        if(testEnum(meta.enumSource[capitalize(value)])) {
                            throwError(instance, fieldKey, value);
                        }
                    }
                }
            } else {
                if(typeof strict === 'undefined' || strict === null)
                    throw new Error(`${instance.constructor.name}::${fieldKey} has no strict:StrictType parameter of @JsonProperty`);
                const testType = (val:any) => !(typeof val === strict.dataType().constructor.name.toLowerCase());
                if(strict.isArray) {
                    value.forEach((v:any, i:number) => {
                        if(testType(v)) {
                            throwError(instance, fieldKey, typeof value, i);
                        }
                    });
                } else if(testType(value)) {
                    throwError(instance, fieldKey, typeof value);
                }
            }

        }
    }


    writeValueAsString(obj:A) {
        return JSON.stringify(obj, (key, value) => {
            if (value && typeof value === 'object') {
                let replacement: { [key: string]: any } = {};
                for (let k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        if(this.getJsonIgnore(value, k)) {
                            continue;
                        }
                        const prop = this.getJsonProperty(value, k);
                        let key = k;
                        if(prop && prop.name) {
                            key = prop.name;
                        }
                        replacement[key] = value[k];
                    }
                }
                return replacement;
            }
            return value;
        });
    }


    readValueAsArray(constructor:{new(): A}, data:Array<any>):Array<A> {
        const array:Array<A> = [];
        data.forEach(i=>{
            array.push(this.readValueInternal(new constructor(), i));
        });
        return array;
    }

    readValue(constructor:{new(): A}, data:any):A {
        return this.readValueInternal( new constructor(), data);
    }

    readValueInternal<A>(instance:A, data:any):A {
        // @ts-ignore
        this.instance = instance;
        Object.keys(instance).forEach((key: string) => {
            let meta = this.getJsonProperty(instance, key);
            if(data === null || data === undefined) {
                return;
            }
            const setValue = (value?:any) => {
                const converter:(v:any)=>any = meta&&meta.converter || ((v:any):any => v);
                if((value === null || typeof value === 'undefined') && this.config.defaultValuesFromClass) {
                    // @ts-ignore
                    value = instance[key];
                }
                // @ts-ignore
                instance[key] = converter(value);
            };
            if(this.getJsonIgnore(instance, key)) {
                return;
            }
            if(this.config.strictTypes && !meta) {
                throw new Error(`strictTypes is enabled: ${instance.constructor.name}::${key} must have @JsonProperty({dataType:anytype}) or @JsonProperty({strict:{dataType:Type}}) or @JsonIgnore`);
            }
            if(meta) {
                let fieldKey = meta.name || key;
                const value = data[fieldKey];
                if(meta.notNull && (value === null || value === undefined)) {
                    throw new Error(`${instance.constructor.name}::${key} cannot be null`);
                }
                if(meta.localize !== undefined) {
                    const cfg:LocalizedProperty = Object.assign({textsProvider:"texts"}, meta.localize);
                    const providers = this.config.dataProviders(this.instance);
                    const texts = providers.get(cfg.textsProvider);
                    if(texts === null || typeof texts === 'undefined') {
                        throw new Error(`Texts provider named ${cfg.textsProvider} is not provided!!! cannot use LocalizedProperty`);
                    }
                    const getLocalizedValue = (locKey:string):string => {
                        return texts[`${locKey}${cfg.suffix&&`_${cfg.suffix}`||""}`];
                    };
                    if(Array.isArray(value)) {
                        const array:Array<any> = [];
                        value.forEach(item=>array.push(getLocalizedValue(item)));
                        setValue(array.filter(i=>i!==null));
                    } else {
                        let locKey = value;
                        if(cfg.referenceKey !== undefined) {
                            locKey = data[cfg.referenceKey];
                        }
                        locKey = locKey||cfg.defaultKey;
                        if(locKey !== undefined){
                            setValue(getLocalizedValue(locKey));
                        }
                    }
                } else if(meta.dataProvider) {
                    const providers = this.config.dataProviders(this.instance);
                    //default set null
                    setValue(null);
                    if(providers && value !== undefined) {
                        // @ts-ignore
                        const provider = providers.get(meta.dataProvider);
                        if(provider) {
                            const getProviderValue = (refKey:string):any => {
                                const pvalue = provider.get(refKey);
                                if(!pvalue) {
                                    console.warn(`${instance.constructor.name}::${key} reference ${refKey} to provider ${meta.dataProvider} not exist`);
                                }
                                return pvalue || null;
                            };
                            if(Array.isArray(value)) {
                                const array:Array<any> = [];
                                value.forEach(item=>array.push(getProviderValue(item)));
                                setValue(array.filter(i=>i!==null));
                            } else {
                                setValue(getProviderValue(value));
                            }
                        }
                    }
                } else if(meta.enumSource) {
                    this.strictValidation(instance, meta, fieldKey, value);
                    if(value === undefined) {
                        setValue(null);
                    } else if(Array.isArray(value)) {
                        const array:Array<any> = [];
                        value.forEach(item=>{
                            array.push(meta.enumSource[capitalize(item)]);
                        });
                        setValue(array);
                    } else {
                        setValue(meta.enumSource[capitalize(value)]);
                    }
                } else if(meta.clazz) {
                    this.strictValidation(instance, meta, fieldKey, value);
                    if(value === undefined) {
                        setValue(null);
                    } else if(Array.isArray(value)) {
                        const array:Array<any> = [];
                        value.forEach(item=>{
                           array.push(this.readValueInternal(new meta.clazz(), item));
                        });
                        setValue(array);
                    } else {
                        setValue(this.readValueInternal(new meta.clazz(), value))
                    }
                } else {
                    this.strictValidation(instance, meta, fieldKey, value);
                    setValue(value)
                }
            } else {
                setValue(data[key]);
            }
        });
        // @ts-ignore
        if(instance.finish && typeof instance.finish === 'function') {
            // @ts-ignore
            instance.finish();
        }
        return instance;
    }

}