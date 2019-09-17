import * as React from "react";

export enum AlertType {
    Primary = "primary",
    Secondary = "secondary",
    Success = "success",
    Danger = "danger",
    Warning = "warning",
    Light = "light",
    Dark = "dark"
}

interface AlertProps {
    text: string
    type?: AlertType | string
}

export class Alert extends React.Component<AlertProps> {
    static defaultProps = {
        type: AlertType.Primary
    };

    render() {
        return <div className={`alert alert-${this.props.type}`} role="alert">
            {this.props.text}
        </div>;
    }
}