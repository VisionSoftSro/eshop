import {Action} from "redux";
import {GoodsDto} from "../../../dto/GoodsDto";
import {PaymentMethodDto, ShippingMethodDto} from "../../../dto/Methods";

export enum MethodsActionType {
    SetShipping="methods/set-shipping",
    SetPayment="methods/set-payment",
}

export interface MethodsState {
    shipping?:Array<ShippingMethodDto>;
    payment?:Array<PaymentMethodDto>;
}

export interface MethodsAction extends Action<MethodsActionType>, MethodsState {

}


const initialState:MethodsState = {shipping: new Array<ShippingMethodDto>(), payment:new Array<PaymentMethodDto>()};
export const methodsReducer = (state:MethodsState = initialState, action:MethodsAction):MethodsState => {
    if(MethodsActionType.SetShipping === action.type) {
        return {...state, ...{shipping: action.shipping}}
    } else if(MethodsActionType.SetPayment === action.type) {
        let ss = {...state, ...{payment: action.payment}};
        return ss;
    }

    return state;
};