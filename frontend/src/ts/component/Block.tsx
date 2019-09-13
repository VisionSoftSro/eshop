import * as React from "react";
import {CSSProperties} from "react";

interface BlockProps {
   noPadding?:boolean;
   title:any;
   autoMargin:boolean;
   style?:CSSProperties
}

export class Block extends React.Component<BlockProps> {

    static defaultProps = {
        autoMargin:true,
        noPadding:false
    };

    render() {
        const styles:CSSProperties = {};
        if(this.props.noPadding) {
            styles.padding = 0;
        }
        return <div className={"card"} style={this.props.style}>
            {this.props.title&&<div className={"card-header"}>{this.props.title}</div>}
            <div className={"card-body card-block"} style={styles}>
                {this.props.children}
            </div>
        </div>
    }
}