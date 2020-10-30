import * as React from "react";
import {FormFieldInterface, FormFieldInterfaceProps} from "./FormFieldInterface";
import JoditEditor from "jodit-react";

export interface FormTextareaProps extends FormFieldInterfaceProps<any> {
    wysiwyg?:boolean
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
                this.dom&& this.dom.focus();
            }
        });
    }

    onValueChange(value:any) {
        this.setState({value:value}, ()=>{
            this.props.onValueChanged(this.state.value)
        });
    }

    render() {
    if(this.props.wysiwyg) {
        return <JoditEditor
            value={this.state.value}
            onChange={this.onValueChange.bind(this)}
        />
    }
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