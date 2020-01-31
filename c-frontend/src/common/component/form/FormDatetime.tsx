import * as React from "react";
import {FormFieldInterface, FormFieldInterfaceProps} from "./FormFieldInterface";
import moment, {isMoment, Moment} from "moment";
import Datetime, {DatetimepickerProps} from "react-datetime";
import {ReactElement} from "react";



type ValueConverter = (value:Moment)=>string;
const DateTimeValueConverterISO = (datetime: Moment) => datetime;



export interface CustomDatetimepickerProps<> extends DatetimepickerProps {
    valueConverter?:ValueConverter
}

export interface FormDatetimeProps extends FormFieldInterfaceProps<Date | Moment> {
    dateTimeOptions?:CustomDatetimepickerProps
}

export class FormDatetime extends React.Component<FormDatetimeProps> implements FormFieldInterface {

    state = {value:this.props.value};
    input:HTMLInputElement;
    componentDidMount(): void {
        this.props.listeners.onLabelClick = this.onLabelClick
    }

    onLabelClick = (e:React.MouseEvent) => {
        e.preventDefault();
        this.input.focus();
    };

    componentWillReceiveProps(nextProps: Readonly<FormDatetimeProps>, nextContext: any): void {
        this.setState({value:nextProps.value});
    }

    onValueChange(value: Moment) {
        const convert = (this.props.dateTimeOptions && this.props.dateTimeOptions.valueConverter) || DateTimeValueConverterISO;
        this.setState({value:value}, ()=>{
            this.props.onValueChanged(convert(value))
        });
    }

    open = () => {
        this.setState({open:true});
    };

    close = () => {
        this.setState({open:false});
    };

    render() {
        return <Datetime locale={moment.locale()} inputProps={{ref:(o)=>this.input=o, disabled: this.props.disabled}} {...this.props.dateTimeOptions}
                      value={this.state.value}
                      onChange={(value: string | Moment)=>{
                          //tenhle if tu je jen tak, nevim co chodi ve stringu, takze je dost mozny, ze nebude fungovat
                          if(!isMoment(value)) value = moment(value);
                          this.onValueChange(value);
                      }} />;
    }

}