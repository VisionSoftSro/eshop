import * as React from "react";
import {Subscription} from "stompjs";
import {StompHandler, StompListener, StompService} from "../utils/Websocket";
import {WebsocketState} from "../redux/reducers/websocket/WebsocketReducer";


export type StompMessage = {message?:string};
interface SubscribeConfigProps<Type> {
    path: string;
    handler: StompHandler<Type>;
    userOnly: boolean;
}

export class SubscribeConfig<Type> {
    sub: Subscription = null;
    config: SubscribeConfigProps<Type>;
    list: Array<SubscribeConfig<Type>> = new Array<SubscribeConfig<Type>>();

    constructor(props: SubscribeConfigProps<Type>, list: Array<SubscribeConfig<Type>>) {
        this.config = props;
        this.list = list;
    }

    remove() {
        // @ts-ignore
        delete this.list[this];
        return this;
    }

    unsubscribe() {
        this.sub&&this.sub.unsubscribe();
        return this;
    }
}




export abstract class StompComponent<P extends WebsocketState, S = {}, SS = any> extends React.Component<P, S, SS> implements StompListener {

    subscribeConfig: Array<SubscribeConfig<any>> = [];


    componentDidMount() {
        this.props.service.addConnectionListener(this);
        this.addSubscribers();
        this.subscribe();
    }

    abstract addSubscribers():void;

    onWebsocketConnected(service:StompService) {
        this.subscribe();
    }

    onWebsocketReconnectFailed(service:StompService) {

    }

    onWebsocketDisconnected(service:StompService) {

    }

    addSubscriber<Type>(path: string, handler: StompHandler<Type>, userOnly: boolean = false):SubscribeConfig<Type> {
        const sub = new SubscribeConfig<Type>({path: path, handler: handler, userOnly: userOnly}, this.subscribeConfig);
        this.subscribeConfig.push(sub);
        return sub;
    }

    private subscribe() {
        this.subscribeConfig.forEach(sub=>{
            sub.unsubscribe();
            const {config} = sub;
            sub.sub = this.props.service.subscribe(config.path, config.handler, config.userOnly);
        });
    }

    componentWillUnmount() {
        this.subscribeConfig.forEach(i=>{
            i.unsubscribe();
        });
        this.subscribeConfig = [];
        this.props.service.removeConnectionListener(this);
    }
}