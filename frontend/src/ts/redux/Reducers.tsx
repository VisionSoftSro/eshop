import {Action, combineReducers} from 'redux';
import {ReducerDispatch} from "./ReducerDispatchInterfaceDeclaration";
import {testReducer, TestState} from "./reducers/TestReducer";
import {websocketReducer, WebsocketState} from "./reducers/websocket/WebsocketReducer";
import {loginReducer, LoginState} from "./reducers/login/LoginReducer";

//slouzi jen jako pojistka aby se ReducersState members jmenovali stejne jako reducery aby se pak v connectu providovaly spravny nazvy statu
interface ReducerMembers<S1 = any, S2 = any, D1 = any> {
    websocket?: S1
    login?:S2
    test?: D1
}

export interface ReducersState
    extends ReducerMembers<WebsocketState, LoginState, TestState> {
}

export interface CombinedState extends ReducersState, ReducerDispatch<Action<any>> {}


const reducers: ReducerMembers = {
    websocket: websocketReducer,
    login: loginReducer,
    test: testReducer
};

const rootReducer = combineReducers(reducers);


export default rootReducer;