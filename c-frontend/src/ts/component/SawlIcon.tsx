import * as React from "react";

interface SwalIconProps {
    type:string;
}

export class SwalIcon extends React.Component<SwalIconProps> {

    static defaultProps = {
      type: "warning"
    };

    render() {
        switch (this.props.type) {
            case "success":
                return <div className="swal-icon swal-icon--success">
                    <div className="swal-icon--success__line swal-icon--success__line--long"/>
                    <div className="swal-icon--success__line swal-icon--success__line--tip"/>

                    <div className="swal-icon--success__ring"/>
                    <div className="swal-icon--success__hide-corners"/>
                </div>;
            case "warning":
                return <div className="swal-icon swal-icon--warning">
                  <span className="swal-icon--warning__body">
                    <span className="swal-icon--warning__dot"/>
                  </span>
                </div>;
            case "error":
                return <div className="swal-icon swal-icon--error">
                    <div className="swal-icon--error__x-mark">
                        <span className="swal-icon--error__line swal-icon--error__line--left"/>
                        <span className="swal-icon--error__line swal-icon--error__line--right"/>
                    </div>
                </div>;
            default:
                return null;
        }
    }
}