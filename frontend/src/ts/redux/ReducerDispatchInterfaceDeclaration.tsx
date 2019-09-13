import {Action, Dispatch} from "redux";

type ThunkAction = (...args:any)=>any


export type DispatchType<T extends Action<any>> = Dispatch<T> | ThunkAction

export interface ReducerDispatch<T extends Action<any>> {
    dispatch?: DispatchType<T>
}