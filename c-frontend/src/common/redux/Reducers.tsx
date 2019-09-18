import {Action, combineReducers} from 'redux';
import {ReducerDispatch} from "./ReducerDispatchInterfaceDeclaration";
import {websocketReducer, WebsocketState} from "./reducers/websocket/WebsocketReducer";
import {loginReducer, LoginState} from "./reducers/login/LoginReducer";

//slouzi jen jako pojistka aby se ReducersState members jmenovali stejne jako reducery aby se pak v connectu providovaly spravny nazvy statu
export interface ReducerMembers<S1 = any, S2 = any> {
    websocket?: S1
    login?:S2
}

export interface ReducersState
    extends ReducerMembers<WebsocketState, LoginState> {
}

export interface CombinedState extends ReducersState, ReducerDispatch<Action<any>> {}


export const defaultReducers: ReducerMembers = {
    websocket: websocketReducer,
    login: loginReducer
};