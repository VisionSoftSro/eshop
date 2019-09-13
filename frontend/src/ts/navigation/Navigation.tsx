import * as React from "react";
import {RouteComponentProps} from "react-router";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export class RouteConfig {
    href: string;
    submenuOpen?:boolean;
    menuConfig?: {
        icon?: IconProp;
        title: string;        
    };
    properties?: any;
    subMenus?: Array<RouteConfig>;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> | React.Component<any, any>;
    useDefaultWrapper?:boolean
}
export class Navigation {
    context:string;
    routes:Array<RouteConfig>;
    defaultRoute:string
}