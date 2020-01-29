import {Action} from "redux";
import {CartGoods} from "../../../dto/GoodsDto";
import {PlainReduceState} from "../../../../common/redux/Reducers";
import {JsonProperty} from "../../../../common/utils/objectmapper/Mapper";

export enum CartActionType {
    AddCart="cart/add",
    RemoveCart="cart/remove",
    ClearCart="cart/clear",
    ChangeCart="cart/change",
}

export class CartState {
    @JsonProperty({type:{isArray:true, clazz:CartGoods}})
    cart?:Array<CartGoods> = new Array<CartGoods>();

    constructor(cart?: Array<CartGoods>) {
        this.cart = cart || new Array<CartGoods>();
    }
}

export interface CartAction extends Action<CartActionType> {
    item?:CartGoods
    changePcs?:number;
}

export const cartReducer = (state:CartState = new CartState(), action:CartAction):CartState => {
    if(CartActionType.AddCart === action.type) {
        const content = state.cart;
        const existItem = content.filter(item=>item.goods.id === action.item.goods.id);
        if(existItem.length > 0){
            existItem[0].pcs += action.item.pcs;
        } else {
            content.push(action.item);
        }
        return new CartState([...state.cart]);
    } else if(CartActionType.ChangeCart === action.type) {
        const content = state.cart;
        const existItem = content.filter(item=>item.goods.id === action.item.goods.id);
        if(existItem.length > 0){
            existItem[0].pcs = action.changePcs;
            return new CartState([...state.cart]);
        }
    } else if(CartActionType.RemoveCart === action.type) {
        return new CartState(state.cart.filter(item=>item.goods.id != action.item.goods.id));
    } else if(CartActionType.ClearCart === action.type) {
        return new CartState();
    }
    return state;
};