import {Action} from "redux";
import {CartGoods} from "../../../dto/Goods";
import {JsonProperty} from "../../../../common/utils/ObjectMapper";
import {PlainReduceState} from "../../../../common/redux/Reducers";

export enum CartActionType {
    AddCart="cart/add",
    RemoveCart="cart/remove"
}

export class CartState {
    @JsonProperty({clazz:CartGoods, strict:{isArray:true}})
    cart?:Array<CartGoods> = new Array<CartGoods>();

    constructor(cart?: Array<CartGoods>) {
        this.cart = cart || new Array<CartGoods>();
    }
}

export interface CartAction extends Action<CartActionType> {
    item:CartGoods
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
    } else if(CartActionType.RemoveCart === action.type) {
        return new CartState(state.cart.filter(item=>item.goods.id != action.item.goods.id));
    }
    return state;
};