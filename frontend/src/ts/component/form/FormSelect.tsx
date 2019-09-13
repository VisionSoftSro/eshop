import * as React from "react";
import {FormFieldInterface, FormFieldInterfaceProps} from "./FormFieldInterface";
import Select from 'react-select';
// @ts-ignore
import Async from 'react-select/lib/Async';
import {Props as SelectProps2} from "react-select/base";
import {ActionMeta, GroupedOptionsType, OptionsType, ValueType} from "react-select/src/types";
import {exist, GenericMap, JsonList, jsonToFormData} from "../../utils/Util";
import {ReactElement} from "react";
import {StateManager} from "react-select/src/stateManager";
import {any} from "prop-types";
import {httpEndpoint} from "../../utils/HttpUtils";
import qs from 'qs';

type OptionType = any;
type OptionTypes = OptionType|OptionsType<OptionType>;

type SelectOptionType = {label:string, value:string};
interface AjaxOptions {
    url:string;
    searchKey?:string;
    params?:GenericMap<string>;
}
export class SelectProps {
    options?:Array<OptionType>;
    formatOption?:(value:OptionType)=>SelectOptionType;
    labelKey?:string = "label";
    valueKey?:string = "value";
    isMulti?:boolean = false;
    isSearchable?:boolean = false;
    ajax?:AjaxOptions;
    formatValue?:(value:SelectOptionType)=>OptionType
}
interface FormSelectProps extends FormFieldInterfaceProps<OptionTypes> {
    selectProps:SelectProps
}

class FormSelectState {
    selectedOption:SelectOptionType|OptionsType<SelectOptionType>;
    options:Array<SelectOptionType>;

    constructor(selectedOption: any | Array<OptionType>, options: Array<SelectOptionType>) {
        this.selectedOption = selectedOption;
        this.options = options;
    }
}
const formatValue = (value:OptionType, props:SelectProps):SelectOptionType|Array<SelectOptionType> => {
    if(!exist(value)) {
        return null;
    }
    if(Array.isArray(value)) {
        return formatOptions(value, props);
    }
    return formatOption(value, props);
};

const formatOptions = (array:Array<OptionType>, props:SelectProps):Array<SelectOptionType> => {
    const newArray = new Array<SelectOptionType>();
    array&&array.forEach(item=>newArray.push(formatOption(item, props)));
    return newArray;
};

const formatOption = (value:OptionType, props:SelectProps):SelectOptionType => {
    if(props.formatOption){
        return props.formatOption(value);
    }
    value["label"] = value[props.labelKey];
    value["value"] = value[props.valueKey];
    return value;
};


export class FormSelect extends React.Component<FormSelectProps, FormSelectState> implements FormFieldInterface {

    state = new FormSelectState(
        formatValue(this.props.value, this.props.selectProps),
        formatOptions(this.props.selectProps.options, this.props.selectProps)
    );

    componentDidMount(): void {
       // this.sendValue(this.props.value);
    }

    componentWillReceiveProps(nextProps: Readonly<FormSelectProps>, nextContext: any): void {
        this.setState({selectedOption: formatValue(nextProps.value, nextProps.selectProps)}, ()=> {
            //this.sendValue(formatValue(nextProps.value, nextProps.selectProps));
        });
    }
    handleChange = (value: ValueType<SelectOptionType>, action: ActionMeta) => {
        this.setState({selectedOption: value}, ()=> {
            this.sendValue(value);
        });
    };

    sendValue = (value: ValueType<OptionType>) => {
        let values:any|Array<any> = {};
        const formatFn:(value:OptionType)=> any = (val:SelectOptionType) => {
            return (val&&this.props.selectProps.formatValue)&&this.props.selectProps.formatValue(val)||val;
        };
        if(Array.isArray(value)) {
            values = new Array<any>();
            value.forEach(i=>values.push(formatFn(i)));
        } else {
            values = formatFn(value);
        }
        this.props.onValueChanged(values);
    };

    async onLoadOptions (inputValue: string):Promise<any> {
        const {ajax} = this.props.selectProps;
        const params = ajax.params || {};
        // @ts-ignore
        params[ajax.searchKey||"term"] = inputValue;
        const result = await httpEndpoint<JsonList<GenericMap<any>>>(JsonList, `${ajax.url}?${qs.stringify(params)}`);
        return formatOptions(result.data.data, this.props.selectProps);
    };

    render() {
        const { selectedOption, options } = this.state;
        const props = {value:selectedOption, onChange:this.handleChange, options:options};
        const finalProps = {...this.props.selectProps, ...props};
        let Component:ReactElement;
        if(this.props.selectProps.ajax) {
            Component = <Async {...finalProps} loadOptions={this.onLoadOptions.bind(this)} defaultOptions cacheOptions />;
        } else {
            Component = <Select {...finalProps}/>;
        }
        return (
            Component
        );
    }

}