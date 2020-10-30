import * as React from "react";
import {FormFieldInterface, FormFieldInterfaceProps} from "./FormFieldInterface";
import ReactTooltip from "react-tooltip";

export interface FormInputProps extends FormFieldInterfaceProps<any> {
    type:string
}

export class FormInput extends React.Component<FormInputProps, {value:string, backupTooltip?:string, isEmpty?:boolean}> implements FormFieldInterface {
    dom:HTMLInputElement;
    state = {
        value:this.props.value,
        backupTooltip: this.props.dataTip,
        isEmpty: false
    };

    componentDidMount(): void {
        this.props.enableFocusSupport&&this.props.enableFocusSupport();
        ReactTooltip.rebuild();
    }

    componentWillReceiveProps(nextProps: Readonly<FormInputProps>, nextContext: any): void {
        const triggerFocus = nextProps.focused !== this.props.focused && nextProps.focused;
        this.setState({value:nextProps.value}, ()=>{
            if(triggerFocus) {
                this.dom.focus();
            }
        });
    }

    onValueChange(value:any) {
        this.setState({
            value: value === ""? null : value,
            isEmpty: !value
        }, ()=>{
            this.props.onValueChanged&&this.props.onValueChanged(this.state.value);
        });
    }


    render() {
     return <input
         ref={(input) => { this.dom = input; }}
         id={this.props.name}
         disabled={this.props.disabled}
         className={"form-control"} type={this.props.type} value={this.state.value||""} name={this.props.name} placeholder={this.props.placeholder}
         onChange={e=>{
            this.onValueChange(e.target.value);
         }}
         data-tip={this.state.isEmpty ? this.state.backupTooltip : ""}
        />
    }

}