import * as React from "react";
import cs from 'classnames';
import * as faIcon from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {CSSProperties} from "react";

interface LoadingProps {
    fullscreen?:boolean,
    show?:boolean
    style?:CSSProperties
    color?:string
}
export class Loading extends React.Component<LoadingProps> {
    static defaultProps = {
        fullscreen:false,
        show:false,
        color:"#fff"
    };
    state = {show: this.props.show};

    render() {
        if (!this.state.show) {
            return null;
        }
        return <div className={cs(this.props.fullscreen?"loading-fullscreen":"loading-local")} style={{textAlign:"center"}}>
            <span style={{...this.props.style, ...{color:this.props.color}}}>
                <LoadingIcon />
            </span>
        </div>;
    }
}
interface LoadingIconProps {
    faSize:SizeProp
}
export class LoadingIcon extends React.Component<LoadingIconProps> {
    static defaultProps = {
        faSize:"3x"
    };
    render() {
        return <FontAwesomeIcon icon={faIcon.faSpinner} spin size={this.props.faSize}/>;
    }
}