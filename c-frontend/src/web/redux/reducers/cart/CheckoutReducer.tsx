import {Action} from "redux";
import {CheckoutDto} from "../../../dto/CheckoutDto";

export enum CheckoutActionType {
    Update="checkout/update",
    SetStep="checkout/set-step",
    Finish="checkout/finish",
    UpdateData="checkout/update-data"
}

export interface CheckoutState {
    step?:number;
    finished?:boolean;
    checkout?:CheckoutDto;
    orderNumber?:number;
}

export interface CheckoutAction extends Action<CheckoutActionType>, CheckoutState {

}

export const checkoutReducer = (state:CheckoutState = {step:0, checkout:new CheckoutDto()}, action:CheckoutAction):CheckoutState => {
    if(CheckoutActionType.Update === action.type) {
        return {...state, ...{step:action.step, checkout:action.checkout, finished:false}};
    } else if(CheckoutActionType.SetStep === action.type) {
        return {...state, ...{step:action.step, finished:false}};
    } else if(CheckoutActionType.UpdateData === action.type) {
        return {...state, ...{checkout:action.checkout, finished:false}};
    } else if(CheckoutActionType.Finish === action.type) {
        return {finished:true, orderNumber:action.orderNumber}
    }
    return state;
};