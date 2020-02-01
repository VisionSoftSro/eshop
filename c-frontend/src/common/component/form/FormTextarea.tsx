import * as React from "react";
import {FormFieldInterface, FormFieldInterfaceProps} from "./FormFieldInterface";

export interface FormTextareaProps extends FormFieldInterfaceProps<any> {

}

export class FormTextarea extends React.Component<FormTextareaProps> implements FormFieldInterface {
    dom:HTMLTextAreaElement;
    state = {value:this.props.value};

    componentDidMount(): void {
        this.props.enableFocusSupport();
    }

    componentWillReceiveProps(nextProps: Readonly<FormTextareaProps>, nextContext: any): void {
        const triggerFocus = nextProps.focused !== this.props.focused && nextProps.focused;
        this.setState({value:nextProps.value}, ()=>{
            if(triggerFocus) {
                this.dom.focus();
            }
        });
    }

    onValueChange(value:any) {
        this.setState({value:value}, ()=>{
            this.props.onValueChanged(this.state.value)
        });
    }

    render() {
     return <textarea
         ref={(input) => { this.dom = input; }}
         disabled={this.props.disabled}
         className={"form-control"} value={this.state.value||""} name={this.props.name} placeholder={this.props.placeholder} data-tip={this.props.dataTip}
        onChange={e=>{
            this.onValueChange(e.target.value);
        }}
     />
    }

}