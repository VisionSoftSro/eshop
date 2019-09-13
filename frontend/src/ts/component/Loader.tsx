import * as React from "react";
import {Loading} from "./Loading";

export const booleanComparator = (value: boolean) => value;

export const nullableComparator = (value?: any) => value != null;

interface LoaderProps {
    comparator?: (value?: any) => boolean
    value?: any;
    fullscreen?: boolean;
}

export class Loader extends React.Component<LoaderProps> {

    static defaultProps = {
        comparator: nullableComparator,
        fullscreen: false
    };

    render() {
        if (this.props.comparator(this.props.value)) {
            if(typeof this.props.children === 'function') {
                return this.props.children();
            }
            return this.props.children;
        } else {
            return <Loading show fullscreen={this.props.fullscreen} color={"#000"}/>;
        }
    }
}