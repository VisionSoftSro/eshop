type Converters = {fromJson?(value:any):any, toJson?(value:any):any}
type LocalizedProperty = {
    referenceKey?:string
    textsProvider?:string
    defaultKey?:string
    suffix?:string
}
type FieldType<T> = {
    clazz?: {new(): T},
    enum?:any,
    isArray?: boolean,
    dataProvider?:string,
    localize?:LocalizedProperty
}

type ProvidedField<T> = {
    target:GenericMap;
    field:string;
    value:any;
    type:FieldType<T>
}