import {StompService} from "../../../utils/Websocket";
import {DispatchType} from "../../ReducerDispatchInterfaceDeclaration";
import {WebsocketAction, WebsocketActionType} from "./WebsocketReducer";
import {Token} from "../../../model/Token";
import {ReducersState} from "../../Reducers";

export const disconnectFromServer = () => {
    return (dispatch: DispatchType<WebsocketAction>, getState:()=>ReducersState) => {
        getState().websocket.service.disconnect();
        dispatch({type:WebsocketActionType.DisconnectedAndLogout, token:null});
    };
};

export const connectToServer = (token:Token) => {
    return (dispatch: DispatchType<WebsocketAction>) => {
        dispatch({type: WebsocketActionType.Connecting, token:token});
        const stomp = new StompService({
            token:token.accessToken,
            reconnectAttempts:100
        });
        stomp.addConnectionListener({
            onWebsocketConnected:(service:StompService)=> {
                dispatch({type:WebsocketActionType.Connected, service:service});
            },
            onWebsocketDisconnected:(service:StompService)=>{
                dispatch({type:WebsocketActionType.Disconnected, service:service});
            }
        });
        stomp.connect();
    };
};



// if(MainActionType.Login === action.type) {
//     TokenStore.set(action.token);
//
//     return {
//         token:action.token,
//         stompService:stomp
//     }
// } else if(MainActionType.Logout === action.type) {
//     TokenStore.clear();
//     console.log(store);
//     state.stompService.disconnect();
//     return {token:null, stompService:null};
// } else if(MainActionType.Connected === action.type || MainActionType.Disconnected === action.type) {
//     return {...{connected:state.stompService.connected}, ...state};
// }