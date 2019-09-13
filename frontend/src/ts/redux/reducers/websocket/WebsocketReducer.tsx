import {Action} from "redux";
import {StompService} from "../../../utils/Websocket";
import {ReducerDispatch} from "../../ReducerDispatchInterfaceDeclaration";
import {Token} from "../../../model/Token";

export enum WebsocketActionType {
     Connected="websocket/Connected", Disconnected="websocket/Disconnected", Connecting="websocket/Connecting", DisconnectedAndLogout="websocket/DisconnectedAndLogout",
}

export interface WebsocketState extends ReducerDispatch<WebsocketAction> {
    connected?:boolean
    service?:StompService,
    token?:Token
}

export interface WebsocketAction extends Action<WebsocketActionType>, WebsocketState {
}

export const websocketReducer = (state:WebsocketState = {token:null, connected:false}, action:WebsocketAction):WebsocketState => {
    if(WebsocketActionType.Connecting === action.type) {
        return {
            token:action.token,
            connected:false,
            service:null
        }
    } else if(WebsocketActionType.Disconnected === action.type || WebsocketActionType.Connected === action.type) {
        return {connected:action.service.connected, service:action.service, token:state.token};
    } else if(WebsocketActionType.DisconnectedAndLogout === action.type) {
        return {token:null};
    }
    return state;
};