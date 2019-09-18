import {CombinedState, defaultReducers, ReducerMembers, ReducersState} from '../../common/redux/Reducers';
import {applyMiddleware, createStore, combineReducers, Action} from 'redux';
import thunk from "redux-thunk";
import {testReducer} from "./reducers/TestReducer";
import {WebsocketState} from "../../common/redux/reducers/websocket/WebsocketReducer";
import {LoginState} from "../../common/redux/reducers/login/LoginReducer";

// export const store:CombinedState = createStore(reducer, applyMiddleware(thunk));

interface WebReducerMembers<S1=any> {
    test:S1
}

export interface WebReducersState
    extends ReducerMembers<WebsocketState, LoginState> {
}

export interface WebCombinedState extends WebReducerMembers, CombinedState {}


const reducers: WebReducerMembers = {
    test: testReducer
};


export const store = createStore(combineReducers({...defaultReducers, ...reducers}), applyMiddleware(thunk));

export default store;