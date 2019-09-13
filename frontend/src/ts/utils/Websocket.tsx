import SockJS from 'sockjs-client';
import Stomp, {Client, Subscription} from 'stompjs';
import * as React from 'react';
import config from '../../Config';

export type StompHandler<Type> = (json: Type) => void;

// @ts-ignore
import AbstractXHRObject from 'sockjs-client/lib/transport/browser/abstract-xhr';

const _start = AbstractXHRObject.prototype._start;

// @ts-ignore
AbstractXHRObject.prototype._start = function(method, url, payload, opts) {
    if (!opts) {
        opts = { noCredentials : true };
    }
    return _start.call(this, method, url, payload, opts);
};


export interface StompListener {
    onWebsocketConnected?: (service:StompService)=>void;

    onWebsocketReconnectFailed?: (service:StompService)=>void;

    onWebsocketDisconnected?:(service:StompService) => void
}

class StompServiceProps {
    token?:string;
    timeout?:number = 5000;
    reconnectAttempts?:number = 5;
}

export class StompService {
    attempts: number = 0;
    connectionListeners: Array<StompListener> = [];
    connected = false;
    socket: any;
    stompClient: Client;
    props?:StompServiceProps;
    constructor(props?:StompServiceProps) {
        this.props = Object.assign(new StompServiceProps(), props||{});

    }
    connect = () => {
        this.socket = new SockJS(`${config.backendUrl}/stomp/notify?__token=${this.props.token||""}`);
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.debug = null;
        this.stompClient.connect({}, (frame: any) => {
            this.attempts = 0;
            this.connected = true;
            this.connectionListeners.forEach(listener=>listener.onWebsocketConnected&&listener.onWebsocketConnected(this));
        }, () => {
            if (this.attempts === this.props.reconnectAttempts) {
                this.connectionListeners.forEach(listener=>listener.onWebsocketReconnectFailed&&listener.onWebsocketReconnectFailed(this));
                return;
            }
            this.attempts++;
            if(this.connected)
                this.connectionListeners.forEach(listener=>listener.onWebsocketDisconnected&&listener.onWebsocketDisconnected(this));
            this.connected = false;
            setTimeout(this.connect, this.props.timeout);
        });
    };

    removeConnectionListener(listener:StompListener) {
        this.connectionListeners = this.connectionListeners.filter(i=>i!=listener);
    }

    addConnectionListener(listener: StompListener) {
        this.connectionListeners.push(listener);
    }

    subscribe<Type>(subscribe: string, handler: StompHandler<Type>, userOnly: boolean=false) {
        let path = "/topic/" + subscribe;
        if (userOnly) {
            path = "/user" + path;
        }
        return this.stompClient.subscribe(path, function (message: any) {
            const json = JSON.parse(message.body);
            handler(json);
        });
    }

    disconnect() {
        this.stompClient.disconnect(() => {
            console.log("websocket disconnected manually");
        });
    }

}