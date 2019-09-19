import {CombinedState, defaultReducers, ReducerMembers, ReducersState} from '../../common/redux/Reducers';
import {applyMiddleware, createStore, combineReducers, Action} from 'redux';
import thunk from "redux-thunk";
import {WebsocketState} from "../../common/redux/reducers/websocket/WebsocketReducer";
import {LoginState} from "../../common/redux/reducers/login/LoginReducer";
import {LocaleState} from "../../common/redux/reducers/locale/LocaleReducer";

interface WebReducerMembers<S1=any> {
}

export interface WebReducersState
    extends ReducerMembers<WebsocketState, LoginState, LocaleState>, WebReducerMembers {
}

export interface WebCombinedState extends WebReducersState, CombinedState {}


const reducers: WebReducerMembers = {

};


export const store = createStore(combineReducers({...defaultReducers, ...reducers}), applyMiddleware(thunk));

export default store;