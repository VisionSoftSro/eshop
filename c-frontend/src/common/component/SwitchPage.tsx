import React from 'react';

type SwitchType = number | string;

export class SwitchPage extends React.Component<{
    value: SwitchType
    default: SwitchType
}> {


    render() {
        let defaultCase:any = null;
       React.Children.forEach(this.props.children,child=>{
            if (!React.isValidElement(child)) {
                return child;
            }
            if(child.type && child.type === SwitchCase) {
                if(child.props.value === this.props.default && defaultCase === null) {
                    defaultCase = child;
                }
                if(child.props.value === this.props.value){
                    defaultCase = child;
                    return;
                }
            }
        });
        return defaultCase;
    }

}


export class SwitchCase extends React.Component<{value:SwitchType}> {
    render() {
        return this.props.children;
    }
}


