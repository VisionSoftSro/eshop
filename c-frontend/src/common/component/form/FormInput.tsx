import * as React from "react";
import {FormFieldInterface, FormFieldInterfaceProps} from "./FormFieldInterface";

export interface FormInputProps extends FormFieldInterfaceProps<any> {
    type:string
}

export class FormInput extends React.Component<FormInputProps> implements FormFieldInterface {

    state = {value:this.props.value};

    componentWillReceiveProps(nextProps: Readonly<FormInputProps>, nextContext: any): void {
        this.setState({value:nextProps.value});
    }

    onValueChange(value:any) {
        this.setState({value:value}, ()=>{
            this.props.onValueChanged(this.state.value)
        });
    }


    render() {
     return <input
         disabled={this.props.disabled}
         className={"form-control"} type={this.props.type} defaultValue={this.state.value||""} name={this.props.name} placeholder={this.props.placeholder}
        onChange={e=>{
            this.onValueChange(e.target.value);
        }}
     />
    }

}