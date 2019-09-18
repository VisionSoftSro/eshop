import * as React from "react";
import browserHistory from '../utils/History';
import cs from 'classnames';

interface LinkProps extends React.HTMLAttributes<"a"> {
    external?:boolean,
    history?:boolean,
    className?:string,
    callback?:()=>void,
    href:(()=>void)|string,
}

export class Link extends React.Component<LinkProps> {
    dom:any = null;
    static defaultProps = {
        external:false,
        history:true,
        callback:()=>{}
    };
    render() {
        const {href, external, callback, history, ...props2} = this.props;

        const props:{[key:string]:any} = {...props2};
        if(typeof href === 'function') {
            props["onClick"] = (e:MouseEvent) => {e.preventDefault(); href(); callback()};
            props["href"] = "";
        } else {
            const href2 = `${process.env.PUBLIC_URL}${href}`;
            if(history) {
                props["onClick"] = (e:any) => {
                    e.preventDefault();
                    callback(); /*window.brHistory.push(href2);*/
                    // @ts-ignore
                    browserHistory.push(href2);
                };
                props["href"] = href2;
            } else {
                props["href"] = href2;
            }

        }
        return <a {...props} ref={o=>this.dom=o}>{this.props.children}</a>;
    }
}
interface EasingLinkProps {
    placeholder:string;
    className?:string;
}
export class EasingLink extends React.Component<EasingLinkProps> {
    render() {
        return <a className={cs("js-scroll-trigger", this.props.className)} href={"#"+this.props.placeholder}>{this.props.children}</a>;
    }
}