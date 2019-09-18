import {http} from "../../../utils/HttpUtils";
import {Token} from "../../../model/Token";
import config from "../../../../Config";
import {LoginAction, LoginActionType} from "./LoginReducer";
import TokenStore from "../../../TokenStore";
import {connectToServer, disconnectFromServer} from "../websocket/WebsocketActions";
import {DispatchType} from "../../ReducerDispatchInterfaceDeclaration";
import {ReducersState} from "../../Reducers";

export interface LoginForm {
    username?: string,
    password?: string
}

const login = (dispatch: DispatchType<LoginAction>, token:Token) => {
    dispatch(connectToServer(token));
};

export const processLogin = (form: LoginForm = null) => {
    return async (dispatch: DispatchType<LoginAction>) => {
        if(form === null) {
            const token = TokenStore.get();
            if(token != null) {
                login(dispatch, token);
            } else {
                dispatch({type: LoginActionType.Login});
            }
            return;
        }
        const token = await http<Token>(Token, `${config.logportUrl}/oauth/token?username=${form.username}&password=${form.password}&grant_type=password`, {
            method: "POST",
            headers: {
                'Authorization': `Basic ${config.backendClientId}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        if(!token || !token.data || token.data.error) {
            dispatch({type: LoginActionType.LoginFailed});
        } else {
            TokenStore.set(token.data);
            login(dispatch, token.data);
        }
    }
};

export const logout = () => {
    return async (dispatch: DispatchType<LoginAction>, getState:()=>ReducersState) => {
        //add token invalidate fetch
        TokenStore.clear();
        dispatch(disconnectFromServer())
    }

};