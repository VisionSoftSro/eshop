import {Action} from "redux";
import {Token} from "../../../model/Token";
import {ReducerDispatch} from "../../ReducerDispatchInterfaceDeclaration";

export enum LoginActionType {
    Login="login/Login", Logout="login/Logout", LoginFailed="login/LoginFailed"
}

export interface LoginState extends ReducerDispatch<LoginAction> {
    failed?:boolean
    token?:Token
}

export interface LoginAction extends Action<LoginActionType>, LoginState {

}

export const loginReducer = (state:LoginState = {token:null, failed:false}, action:LoginAction):LoginState => {
    if(LoginActionType.LoginFailed === action.type) {
        return {
            failed:true,
            token:null
        }
    } else if(LoginActionType.Logout === action.type || LoginActionType.Login === action.type) {
        return {
            failed:false,
            token:null
        }
    }
    return state;
};