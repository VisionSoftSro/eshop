import {Action} from "redux";
import {ReducerDispatch} from "../../ReducerDispatchInterfaceDeclaration";

export enum LocaleActionType {
    SetLocale="locale/set"
}

export interface LocaleState extends ReducerDispatch<LocaleAction> {
    locale?:string
}

export interface LocaleAction extends Action<LocaleActionType>, LocaleState {
}

export const localeReducer = (state:LocaleState = {locale:null}, action:LocaleAction):LocaleState => {
    if(LocaleActionType.SetLocale === action.type) {
        return {
            locale:action.locale
        };
    }
    return state;
};