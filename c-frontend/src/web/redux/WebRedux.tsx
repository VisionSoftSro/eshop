import {CombinedState, defaultReducers, ReducerMembers, ReducersState} from '../../common/redux/Reducers';
import {applyMiddleware, createStore, combineReducers, Action} from 'redux';
import thunk from "redux-thunk";
import {WebsocketState} from "../../common/redux/reducers/websocket/WebsocketReducer";
import {LoginState} from "../../common/redux/reducers/login/LoginReducer";
import {LocaleState} from "../../common/redux/reducers/locale/LocaleReducer";
import {cartReducer, CartState} from "./reducers/cart/CartReducer";
import {loadState, saveState} from "../../common/redux/ReduxStoreStorage";
import {itemReducer} from "./reducers/cart/ItemReducer";
import {dataReducer} from "./reducers/cart/DataReducer";
import {checkoutReducer} from "./reducers/cart/CheckoutReducer";

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

export const selectedItemStore = createStore(itemReducer);

export const dataStore = createStore(dataReducer);
export const checkoutStore = createStore(checkoutReducer);



export const mainStore = createStore(combineReducers({...defaultReducers, ...reducers}), applyMiddleware(thunk));
