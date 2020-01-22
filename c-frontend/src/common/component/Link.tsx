import * as React from "react";
import browserHistory from '../utils/History';
import cs from 'classnames';
// @ts-ignore
import {Link as AnchorLink, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

interface SmoothScrollProps {
    offset?:number;
    duration?:number;
    delay?:number;
    smooth?:string|boolean;
}
type FuncArgs = Array<any>|any;
interface LinkProps extends React.HTMLAttributes<"a"> {
    external?:boolean,
    history?:boolean,
    className?:string,
    callback?:()=>void,
    href:((args?:FuncArgs)=>void)|string,
    funcArgs?:FuncArgs
    displayHref?:String
    target?:string
    smooth?:SmoothScrollProps|boolean
    ignoreHash?:boolean
}

export class Link extends React.Component<LinkProps> {
    dom:any = null;
    static defaultProps = {
        external:false,
        history:true,
        smooth:false,
        ignoreHash:false,
        callback:()=>{}
    };
    render() {
        const {ignoreHash, href, smooth, external, callback, history, funcArgs, displayHref, ...props2} = this.props;

        const props:{[key:string]:any} = {...props2};
        if(typeof href === 'function') {
            props["onClick"] = (e:MouseEvent) => {e.preventDefault(); href(funcArgs); callback()};
            props["href"] = displayHref||"";
        } else {
            const href2 = `${process.env.PUBLIC_URL}${href}`;
            if(smooth) {
                props["href"] = "#" + href;
                props['onClick'] = (e:any) =>{
                    e.preventDefault();
                    scroller.scrollTo(href, {...{
                            duration: 800,
                            delay: 0,
                            offset:0,
                            smooth: "easeInOutQuart"
                        }, ...(smooth as {})});
                };
                //return <AnchorLink className={this.props.className} to={href} spy smooth duration={500}>{this.props.children}</AnchorLink>;
            } else if(history) {
                if(!href.includes("#") || ignoreHash) {
                    props["onClick"] = (e:any) => {
                        e.preventDefault();
                        callback(); /*window.brHistory.push(href2);*/
                        // @ts-ignore
                        browserHistory.push(href2);
                    };
                }
                props["href"] = href2;
            } else {
                props["href"] = href2;

            }
        }
        return <a {...props} ref={o=>this.dom=o}>{this.props.children}</a>;
    }
}
