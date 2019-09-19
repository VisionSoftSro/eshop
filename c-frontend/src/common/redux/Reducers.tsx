import {Action, combineReducers} from 'redux';
import {ReducerDispatch} from "./ReducerDispatchInterfaceDeclaration";
import {websocketReducer, WebsocketState} from "./reducers/websocket/WebsocketReducer";
import {loginReducer, LoginState} from "./reducers/login/LoginReducer";
import {localeReducer, LocaleState} from "./reducers/locale/LocaleReducer";

//slouzi jen jako pojistka aby se ReducersState members jmenovali stejne jako reducery aby se pak v connectu providovaly spravny nazvy statu
export interface ReducerMembers<S1 = any, S2 = any, S3 = any> {
    websocket?: S1
    login?:S2,
    locale?:S3
}

export interface ReducersState
    extends ReducerMembers<WebsocketState, LoginState, LocaleState> {
}

export interface CombinedState extends ReducersState, ReducerDispatch<Action<any>> {}


export const defaultReducers: ReducerMembers = {
    websocket: websocketReducer,
    login: loginReducer,
    locale: localeReducer
};