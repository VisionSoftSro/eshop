import "reflect-metadata";
import _ from 'lodash';



export interface MapperConfig<T> {
    constructor:{new(): T};
    texts?:GenericMap;
    dataProviders?:(root:T)=>GenericMap<GenericMap>;
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
    return Reflect.metadata(JSON_META_DATA_KEY, decoratorMetaData);
}
export function JsonIgnore<T>(): (target: Object, targetKey: string | symbol)=> void {
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
        return Reflect.getMetadata(JSON_META_DATA_KEY, target, propertyKey);
    }
    getJsonIgnore<T>(target: any, propertyKey: string): JsonPropertyMetaData<T> {
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
        const providedFields = new Array<ProvidedField<any>>();
        const result = this.readValueInternalRecursive(instance, data, providedFields);
        if(this.config.dataProviders) {
            const providers = this.config.dataProviders(instance);
            providedFields.forEach(({type, value, field, target})=>{
                const provider = providers[type.dataProvider];
                if(provider) {
                    const setValue = (newValue?:any) => target[field] = newValue;
                    const getProviderValue = (refKey:string):any => provider[refKey] || null;
                    if(type.isArray) {
                        const array:Array<any> = [];
                        value.forEach((item:any)=>array.push(getProviderValue(item)));
                        setValue(array.filter(i=>i!==null));
                    } else {
                        setValue(getProviderValue(value));
                    }
                }
            });
        }

        return result;
    }


    private readValueInternalRecursive(instance:A, data:any, providedFields:ProvidedField<any>[]):A {
        if((data || null) === null) {
            return instance;
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
            const {fromJson} = _.merge({fromJson: defaultConverter}, (meta.converters || ({})));
            const setValue = (value?:any, ignoreConverter = false) => {
                (instance as GenericMap)[oKey] = ignoreConverter ? value : fromJson(value);
            };
            //set null value without converters
            setValue(null, true);
            const valueExist = (value || null) !== null;
            if(type.localize !== undefined) {
                const cfg:LocalizedProperty = Object.assign({textsProvider:"texts"}, type.localize);
                const texts = this.config.texts;
                if(texts === null || typeof texts === 'undefined') {
                    throw new Error(`Texts provider named ${cfg.textsProvider} is not provided!!! cannot use LocalizedProperty`);
                }
                const getLocalizedValue = (locKey:string):string => {
                    return texts[`${locKey}${cfg.suffix&&`_${cfg.suffix}`||""}`];
                };
                if(type.isArray) {
                    if(valueExist) {
                        const array:Array<any> = [];
                        value.forEach((item:any)=>array.push(getLocalizedValue(item)));
                        setValue(array.filter(i=>i!==null));
                    }
                } else {
                    let locKey = value;
                    if(cfg.referenceKey) {
                        locKey = data[cfg.referenceKey];
                    }
                    locKey = locKey||cfg.defaultKey;
                    if(locKey){
                        setValue(getLocalizedValue(locKey));
                    }
                }
            } else if(type.dataProvider && valueExist) {
                providedFields.push({field:oKey, target: instance, value: value, type: type})
            } else if(type.enum && valueExist) {
                const getEnumValue = (enumValue:any):any => {
                    if (typeof enumValue === 'number') {
                        //in the enum there are keys for Enum names but there are number keys too and their values as keys of string names
                        return getEnumValue(type.enum[enumValue]);
                    } else {
                        const enumKeys = Object.keys(type.enum).filter(enumKey=> enumKey.toLowerCase() === enumValue.toString().toLowerCase());
                        if(enumKeys.length == 1) {
                            return type.enum[enumKeys[0]];
                        }
                        return null;
                    }
                };
                if(type.isArray) {
                    const array:Array<any> = [];
                    value.forEach((item:any)=>{
                        array.push(getEnumValue(item));
                    });
                    setValue(array);
                } else {
                    setValue(getEnumValue(value));
                }
            } else if(type.clazz && valueExist) {
                if(type.isArray) {
                    const array:Array<any> = [];
                    value.forEach((item:any)=>{
                        array.push(this.readValueInternalRecursive(new type.clazz(), item, providedFields));
                    });
                    setValue(array);
                } else {
                    setValue(this.readValueInternalRecursive(new type.clazz(), value, providedFields))
                }
            } else if(valueExist) {
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
            const {toJson} = _.merge({toJson: defaultConverter}, (meta.converters || ({})));

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