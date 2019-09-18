import * as React from "react";
import {FormFieldInterface, FormFieldInterfaceProps} from "./FormFieldInterface";
import Wrapper from "../Wrapper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as faIcon from "@fortawesome/free-solid-svg-icons";

export interface FormCheckboxProps extends FormFieldInterfaceProps<boolean> {

}

export class FormCheckbox extends React.Component<FormCheckboxProps> implements FormFieldInterface {

    state = {value:this.props.value};

    componentWillReceiveProps(nextProps: Readonly<FormCheckboxProps>, nextContext: any): void {
        this.setState({value:nextProps.value});
    }

    onValueChange(value:boolean) {
        this.setState({value:value}, ()=>{
            this.props.onValueChanged(this.state.value)
        });
    }


    render() {
     return <Wrapper>
            <div className="input-group-addon ig-left">{this.props.placeholder}</div>
            <div className="input-group-addon ig-right form-control" onClick={()=>{
                this.onValueChange(!this.state.value);
            }}>
                <FontAwesomeIcon icon={this.state.value ? faIcon.faCheck : faIcon.faTimes}/>
            </div>
        </Wrapper>;
    }

}