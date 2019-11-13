import {CombinedState, defaultReducers, ReducerMembers, ReducersState} from '../../common/redux/Reducers';
import {applyMiddleware, createStore, combineReducers, Action} from 'redux';
import thunk from "redux-thunk";
import {WebsocketState} from "../../common/redux/reducers/websocket/WebsocketReducer";
import {LoginState} from "../../common/redux/reducers/login/LoginReducer";
import {LocaleState} from "../../common/redux/reducers/locale/LocaleReducer";
import {cartReducer, CartState} from "./reducers/cart/CartReducer";
import {loadState, saveState} from "../../common/redux/ReduxStoreStorage";
import {itemsReducer} from "./reducers/cart/ItemsReducer";

interface WebReducerMembers<CART=any> {

}

export interface WebReducersState extends ReducerMembers<WebsocketState, LoginState, LocaleState>, WebReducerMembers {

}

export interface WebCombinedState extends WebReducersState, CombinedState {}


const reducers: WebReducerMembers = {

};


export const cartStore = createStore(cartReducer, loadState(CartState, "cartState"));
cartStore.subscribe(() => {
    saveState<CartState>("cartState", cartStore.getState());
});
export const itemsStore = createStore(itemsReducer);

export const mainStore = createStore(combineReducers({...defaultReducers, ...reducers}), applyMiddleware(thunk));
