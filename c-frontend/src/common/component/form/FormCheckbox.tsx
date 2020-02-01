import * as React from "react";
import {FormFieldInterface, FormFieldInterfaceProps} from "./FormFieldInterface";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as faIcon from "@fortawesome/free-solid-svg-icons";
import Switch from "react-switch";
import cs from 'classnames';
export interface FormCheckboxProps extends FormFieldInterfaceProps<boolean> {

}

export class FormCheckbox extends React.Component<FormCheckboxProps> implements FormFieldInterface {

    state = {value:this.props.value};

    componentDidMount(): void {
        this.props.listeners.onLabelClick = this.onLabelClick
    }

    onLabelClick = (e:React.MouseEvent) => {
        e.preventDefault();
        this.onValueChange(!this.state.value);
    };

    componentWillReceiveProps(nextProps: Readonly<FormCheckboxProps>, nextContext: any): void {
        this.setState({value:nextProps.value});
    }

    onValueChange(value:boolean) {
        this.setState({value:value}, ()=>{
            this.props.onValueChanged(this.state.value)
        });
    }


    render() {
     return <>
            <div className={cs("input-group-addon hover", this.props.simpleLabel?"":"ig-right bg-white")} onClick={()=>{
                this.onValueChange(!this.state.value);
            }}>
                <FontAwesomeIcon icon={this.state.value ? faIcon.faCheck : faIcon.faTimes} data-tip={this.props.dataTip}/>
            </div>
            {/*<Switch onChange={(checked)=>{*/}
            {/*    console.log(checked);*/}
            {/*    this.onValueChange(checked)*/}
            {/*}} checked={this.state.value||false} />*/}
        </>;
    }

}