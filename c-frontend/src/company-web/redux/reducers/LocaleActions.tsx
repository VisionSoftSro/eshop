import {DispatchType} from "../../../common/redux/ReducerDispatchInterfaceDeclaration";
import {ReducersState} from "../../../common/redux/Reducers";
import {LocaleAction, LocaleActionType} from "../../../common/redux/reducers/locale/LocaleReducer";
import DataStorage from "../../../common/DataStorage";
import moment from 'moment';


export const changeLocale = (locale:string) => {
    return async (dispatch: DispatchType<LocaleAction>, getState:()=>ReducersState) => {
        window.Strings.locale = locale;
        moment.locale(locale);
        DataStorage.set("locale", locale);
        dispatch({type:LocaleActionType.SetLocale, locale:locale});
    }

};