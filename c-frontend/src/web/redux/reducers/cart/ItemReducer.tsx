import {Action} from "redux";
import {CartGoods, Goods} from "../../../dto/Goods";

export enum ItemActionType {
    Show="item/detail",
    Clear="item/clear",
    ChangeQuantity="item/changeQuantity"
}

export interface ItemState {
    item?:Goods;
    pcs?:number;
}

export interface ItemAction extends Action<ItemActionType>, ItemState {
    pcs?:number
}


const initialState:ItemState = {item: null};
export const itemReducer = (state:ItemState = initialState, action:ItemAction):ItemState => {
    if(ItemActionType.Show === action.type) {
        return {item:action.item, pcs: action.pcs};
    } else if(ItemActionType.Clear === action.type) {
        return initialState;
    } else if(ItemActionType.ChangeQuantity === action.type) {
        return {...state, ...{pcs:action.pcs}};
    }
    return state;
};