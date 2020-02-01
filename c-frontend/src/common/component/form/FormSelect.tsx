import * as React from "react";
import {FormFieldInterface, FormFieldInterfaceProps} from "./FormFieldInterface";
import Select from 'react-select';
// @ts-ignore
import Async from 'react-select/lib/Async';
import {Props as SelectProps2} from "react-select/base";
import {ActionMeta, GroupedOptionsType, OptionsType, Theme, ValueType} from "react-select/src/types";
import {exist, GenericMap, JsonList, jsonToFormData} from "../../utils/Util";
import {ReactElement} from "react";
import {StateManager} from "react-select/src/stateManager";
import {any} from "prop-types";
import {httpEndpoint, httpEndpointCustom} from "../../utils/HttpUtils";
import qs from 'qs';
import {ThemeConfig} from "react-select/src/theme";
import {Mapper} from "../../utils/objectmapper/Mapper";

type OptionType = any;
type OptionTypes = OptionType|OptionsType<OptionType>;

type SelectOptionType<T = any> = {label:any, value:T};
interface AjaxOptions {
    url:string;
    searchKey?:string;
    params?:GenericMap<string>;
    mapper?():Mapper<any>
}
export class SelectProps<T = any> {
    options?:Array<OptionType>;
    formatOption?(value:OptionType):SelectOptionType<T>;
    formatValue?(value:SelectOptionType<T>):OptionType;
    labelKey?:string = "label";
    valueKey?:string = "value";
    isMulti?:boolean = false;
    isSearchable?:boolean = false;
    ajax?:AjaxOptions;
    theme?:ThemeConfig
}
interface FormSelectProps extends FormFieldInterfaceProps<OptionTypes> {
    selectProps:SelectProps<any>
}

class FormSelectState {
    selectedOption:SelectOptionType|OptionsType<SelectOptionType>;
    options:Array<SelectOptionType>;

    constructor(selectedOption: any | Array<OptionType>, options: Array<SelectOptionType>) {
        this.selectedOption = selectedOption;
        this.options = options;
    }
}
const formatValue = (value:OptionType, props:SelectProps<any>):SelectOptionType|Array<SelectOptionType> => {
    if(!exist(value)) {
        return null;
    }
    if(Array.isArray(value)) {
        return formatOptions(value, props);
    }
    return formatOption(value, props);
};

const formatOptions = (array:Array<OptionType>, props:SelectProps<any>):Array<SelectOptionType> => {
    const newArray = new Array<SelectOptionType>();
    array&&array.forEach(item=>newArray.push(formatOption(item, props)));
    return newArray;
};

const formatOption = (value:OptionType, props:SelectProps<any>):SelectOptionType => {
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

    dom:any;

    componentDidMount(): void {
        if(this.props.listeners)this.props.listeners.onLabelClick = this.onLabelClick
    }

    onLabelClick = (e:React.MouseEvent) => {
        e.preventDefault();
        this.dom.focus();
    };

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
            let rv = (val && this.props.selectProps.formatValue) && this.props.selectProps.formatValue(val);
            if(!exist(rv))
                rv = val;
            return rv;
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
        const result = await httpEndpointCustom(`${ajax.url}?${qs.stringify(params)}`);
        let data = result.json.list;
        if(ajax.mapper) {
            data = ajax.mapper().readValueAsArray(data);
        }
        return formatOptions(data, this.props.selectProps);
    };

    render() {
        const { selectedOption, options } = this.state;
        const props = {value:selectedOption, onChange:this.handleChange, options:options};
        const themeProps:ThemeConfig = (theme:Theme) => {
            if(!this.props.simpleLabel) {
                // @ts-ignore
                theme.borderRadius = "0px 5px 5px 0px";
            }
            return theme;
        };
        const finalProps = {ref:(o:any)=>this.dom=o,theme:themeProps, ...this.props.selectProps, ...props};
        let Component:ReactElement;
        if(this.props.selectProps.ajax) {
            Component = <Async {...finalProps} loadOptions={this.onLoadOptions.bind(this)} defaultOptions cacheOptions />;
        } else {
            Component = <Select {...finalProps} data-tip={this.props.dataTip}/>;
        }
        return (
            Component
        );
    }

}