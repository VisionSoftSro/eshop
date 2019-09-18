import * as React from "react";
import {FormFieldInterface, FormFieldInterfaceProps} from "./FormFieldInterface";

export interface FormTextareaProps extends FormFieldInterfaceProps<any> {

}

export class FormTextarea extends React.Component<FormTextareaProps> implements FormFieldInterface {

    state = {value:this.props.value};

    componentWillReceiveProps(nextProps: Readonly<FormTextareaProps>, nextContext: any): void {
        this.setState({value:nextProps.value});
    }

    onValueChange(value:any) {
        this.setState({value:value}, ()=>{
            this.props.onValueChanged(this.state.value)
        });
    }

    render() {
     return <textarea
         disabled={this.props.disabled}
         className={"form-control"} value={this.state.value||""} name={this.props.name} placeholder={this.props.placeholder}
        onChange={e=>{
            this.onValueChange(e.target.value);
        }}
     />
    }

}