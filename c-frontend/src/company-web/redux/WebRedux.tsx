import {CombinedState, defaultReducers, ReducerMembers, ReducersState} from '../../common/redux/Reducers';
import {applyMiddleware, createStore, combineReducers, Action} from 'redux';
import thunk from "redux-thunk";
import {testReducer, TestState} from "./reducers/TestReducer";
import {WebsocketState} from "../../common/redux/reducers/websocket/WebsocketReducer";
import {LoginState} from "../../common/redux/reducers/login/LoginReducer";

interface WebReducerMembers<S1=any> {
    test:S1
}

export interface WebReducersState
    extends ReducerMembers<WebsocketState, LoginState>, WebReducerMembers<TestState> {
}

export interface WebCombinedState extends WebReducersState, CombinedState {}


const reducers: WebReducerMembers = {
    test: testReducer
};


export const store = createStore(combineReducers({...defaultReducers, ...reducers}), applyMiddleware(thunk));

export default store;