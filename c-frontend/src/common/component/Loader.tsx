import * as React from "react";
import {Loading} from "./Loading";
import {ReactElement} from "react";

export const booleanComparator = (value: boolean) => value;

export const nullableComparator = (value?: any) => value != null;

interface LoaderProps {
    comparator?: (value?: any) => boolean
    value?: any;
    fullscreen?: boolean;
    children?:ReactElement|((loading:any)=>ReactElement)
}

export class Loader extends React.Component<LoaderProps> {

    static defaultProps = {
        comparator: nullableComparator,
        fullscreen: false
    };

    render() {
        const Loader = <Loading show fullscreen={this.props.fullscreen} color={"#000"}/>;
        const showLoader = !this.props.comparator(this.props.value);
        if(typeof this.props.children === 'function') {
            return this.props.children(showLoader&&Loader||null);
        }
        if (showLoader) {
            return Loader;
        } else {
            return this.props.children;
        }
    }
}