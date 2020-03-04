export type StandardDataActionType = "set"
export type DataAction<T> = {
    type:StandardDataActionType,
    data:T
}
