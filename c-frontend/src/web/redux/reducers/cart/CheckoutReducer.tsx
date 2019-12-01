import {Action} from "redux";
import {CheckoutDto} from "../../../dto/CheckoutDto";

export enum CheckoutActionType {
    Update="checkout/update",
    SetStep="checkout/set-step",
    UpdateData="checkout/update-data"
}

export interface CheckoutState {
    step?:number;
    checkout?:CheckoutDto;
}

export interface CheckoutAction extends Action<CheckoutActionType>, CheckoutState {

}

export const checkoutReducer = (state:CheckoutState = {step:0, checkout:new CheckoutDto()}, action:CheckoutAction):CheckoutState => {
    if(CheckoutActionType.Update === action.type) {
        return {...state, ...{step:action.step, checkout:action.checkout}};
    } else if(CheckoutActionType.SetStep === action.type) {
        return {...state, ...{step:action.step}}
    } else if(CheckoutActionType.UpdateData === action.type) {
        return {...state, ...{checkout:action.checkout}}
    }
    return state;
};