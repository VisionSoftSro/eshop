export type Converters = {fromJson?(value:any):any, toJson?(value:any):any}
export type FieldType<T> = {
    clazz?: {new(): T},
    enum?:any,
    isArray?: boolean,
    dataProvider?:string
}