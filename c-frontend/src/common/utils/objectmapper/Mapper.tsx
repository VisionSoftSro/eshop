import {capitalize} from "../StringExtension";
import {Converters, FieldType} from "./Mapper.d";
import {type} from "os";
import {GenericMap} from "../Util";
import _ from 'lodash';


export interface MapperConfig<T> {
    constructor:{new(): T};
    dataProviders?:(root:T)=>Map<string, any>;
}
export interface JsonPropertyMetaData<T> {
    name?: string,
    type?: FieldType<T>,
    converters?:Converters
}
export const JSON_META_DATA_KEY = "JsonProperty";
export const JSON_IGNORE_META_DATA_KEY = "JsonIgnore";
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

interface Mapped extends GenericMap {
    finish?():VoidFunction
}

const defaultConverter = (value: any) => value;
type writeType = {
    springSupport:boolean
}
const defaultWriteConfig = {springSupport:true};
export class Mapper<A extends Mapped> {
    config:MapperConfig<A>;
    constructor(cfg:MapperConfig<A>) {
        this.config = cfg;
    }
    getJsonProperty<T>(target: any, propertyKey: string): JsonPropertyMetaData<T> {
        // @ts-ignore
        return Reflect.getMetadata(JSON_META_DATA_KEY, target, propertyKey);
    }
    getJsonIgnore<T>(target: any, propertyKey: string): JsonPropertyMetaData<T> {
        // @ts-ignore
        return Reflect.getMetadata(JSON_IGNORE_META_DATA_KEY, target, propertyKey);
    }

    readValueAsArray(data:Array<any>):Array<A> {
        const array:Array<A> = [];
        data.forEach(i=>{
            array.push(this.readValueInternal(new this.config.constructor(), i));
        });
        return array;
    }

    readValue(data:GenericMap|string):A {
        let jsonObject = data;
        if(typeof jsonObject === 'string') {
            jsonObject = JSON.parse(data as string);
        }
        return this.readValueInternal( new this.config.constructor(), jsonObject);
    }



    private readValueInternal(instance:A, data:any):A {
        if((data || null) === null) {
            return;
        }
        Object.keys(instance).forEach((oKey: string) => {
            let meta = this.getJsonProperty<any>(instance, oKey) || {};
            let ignore = this.getJsonIgnore(instance, oKey);
            if(ignore) {
                return;
            }
            const key:string = meta.name || oKey;
            const value = data[key] || instance[key] || null;
            const type = meta.type || {};
            const {fromJson} = {...{fromJson: defaultConverter}, ...(meta.converters || ({}))};
            const setValue = (value?:any, ignoreConverter = false) => {
                (instance as GenericMap)[oKey] = ignoreConverter ? value : fromJson(value);
            };
            //set null value without converters
            setValue(null, true);
            if(type.dataProvider) {
                const providers = this.config.dataProviders(instance);
                if(providers && value !== undefined) {
                    const provider = providers.get(type.dataProvider);
                    if(provider) {
                        const getProviderValue = (refKey:string):any => {
                            const pvalue = provider.get(refKey);
                            if(!pvalue) {
                                console.warn(`${instance.constructor.name}::${key} reference ${refKey} to provider ${type.dataProvider} not exist`);
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
            } else if(type.enum) {

                const getEnumValue = (enumValue:any):any => {
                    if (typeof enumValue === 'number') {
                        //in the enum there are keys for Enum names but there are number keys too and their values as keys of string names
                        return getEnumValue(type.enum[enumValue]);
                    } else {
                        return type.enum[enumValue];
                    }
                };

                if(Array.isArray(value)) {
                    const array:Array<any> = [];
                    value.forEach(item=>{
                        array.push(getEnumValue(item));
                    });
                    setValue(array);
                } else {
                    setValue(getEnumValue(value));
                }
            } else if(type.clazz) {
                if(Array.isArray(value)) {
                    const array:Array<any> = [];
                    value.forEach(item=>{
                        array.push(this.readValueInternal(new type.clazz(), item));
                    });
                    setValue(array);
                } else {
                    setValue(this.readValueInternal(new type.clazz(), value))
                }
            } else if(value) {
                setValue(value)
            }
        });
        if(instance.finish) {
            instance.finish();
        }
        return instance;
    }



    writeValueAsJson(instance:A, options?:writeType):GenericMap {
        const {springSupport} = _.merge(defaultWriteConfig, options);
        const json = {} as GenericMap;
        Object.keys(instance).forEach(oKey=>{
           let value = instance[oKey];
           let meta = this.getJsonProperty<any>(instance, oKey) || {};
           let ignore = this.getJsonIgnore(instance, oKey);
           const key = meta.name || oKey;
           if(ignore) {
                return;
           }
           const {toJson} = {...{toJson: defaultConverter}, ...(meta.converters || ({}))};

           const getValue = (_value:any):any => {
                let newValue = toJson(_value);
                if(springSupport) {
                    //zde dodelavat spring support converse na objektech
                    if(newValue && (newValue as GenericMap).id) {
                        newValue = (newValue as GenericMap).id;
                    }
                }
                if(newValue && typeof newValue === "object") {
                    return this.writeValueAsJson(newValue, options);
                } else {
                    return newValue;
                }
            };

           if(meta.type&&meta.type.isArray) {
               if(value&&Array.isArray(value)) {
                   json[key] = value.map(arrayValue => getValue(arrayValue));
               }
           } else {
               json[key] = getValue(value);
           }

           return value;
        });
        return json;
    }
    writeValueAsString(obj:A, options:writeType) {
        return JSON.stringify(this.writeValueAsJson(obj, options));
    }

}