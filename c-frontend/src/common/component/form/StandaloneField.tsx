import React, {ReactElement, useMemo} from 'react';
import Wrapper from "../Wrapper";
import cs from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as faIcon from "@fortawesome/free-solid-svg-icons";
import {FormInput} from "./FormInput";
import {FormTextarea} from "./FormTextarea";
import {FormSelect, SelectProps} from "./FormSelect";
import {FormCheckbox} from "./FormCheckbox";
import {CustomDatetimepickerProps, FormDatetime} from "./FormDatetime";
import {FormInputType} from "./Form";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {CustomFieldComponent, FormFieldInterfaceProps} from "./FormFieldInterface";

export type StandaloneFieldProps<CustomOptions = any> = {
    disabled?:boolean
    placeholder?:string
    value?:any
    type:FormInputType|string
    dataTip?:any
    selectProps?: SelectProps
    customComponent?: CustomFieldComponent | any
    customComponentOptions?: CustomOptions
    dateTimeOptions?: CustomDatetimepickerProps
    onValueChanged?(value:any):void
};

const useRenderer = (Component:ReactElement, icon?:IconProp):[ReactElement] => {
    //TODO do some unified style, etc.
    return [(
        <div className={"input-group"}>
            {Component}
            {icon&&<div className="input-group-addon ig-right"><FontAwesomeIcon icon={icon}/></div>}
        </div>
    )]
};

const useRenderFormInput = (props:StandaloneFieldProps, defaultProps:FormFieldInterfaceProps<any>):[ReactElement] => {
    let icon = faIcon.faPencilAlt;
    if (props.type === FormInputType.Password) {
        icon = faIcon.faLock;
    } else if (props.type === FormInputType.Number) {
        icon = faIcon.faOm;
    }
    return useRenderer(<FormInput type={props.type}  {...defaultProps}  />, icon);
};

const useRenderFormTextarea = (props:StandaloneFieldProps, defaultProps:FormFieldInterfaceProps<any>):[ReactElement] => {
    return useRenderer(<FormTextarea  {...defaultProps}  />, faIcon.faPencilAlt);
};

const useRenderFormSelect = (props:StandaloneFieldProps, defaultProps:FormFieldInterfaceProps<any>) => {
    return useRenderer(<FormSelect  {...defaultProps} selectProps={props.selectProps}  />);
};

const useRenderFormCheckbox = (props:StandaloneFieldProps, defaultProps:FormFieldInterfaceProps<any>) => {
    return useRenderer(<FormCheckbox  {...defaultProps} />);
};

const useRenderDatetime = (props:StandaloneFieldProps, defaultProps:FormFieldInterfaceProps<any>) => {
    return useRenderer(<FormDatetime  {...defaultProps} dateTimeOptions={props.dateTimeOptions}  />, faIcon.faCalendar);
};

const useRenderCustomField = (props:StandaloneFieldProps, defaultProps:FormFieldInterfaceProps<any>) => {
    if(props.customComponent) {
        return useRenderer(<props.customComponent  {...defaultProps} options={props.customComponentOptions}  />);
    } else {
        return useRenderer(<div>Custom component must have set prop customComponent</div>);
    }
};



export function StandaloneField<CustomOptions = any>(props:StandaloneFieldProps<CustomOptions>) {
    const createDefaultComponentProps = () => {
        return {
            name:"",
            dataTip:props.dataTip,
            disabled: props.disabled,
            placeholder: props.placeholder,
            value: props.value,
            onValueChanged: props.onValueChanged,
            enableFocusSupport:()=>false
        } as FormFieldInterfaceProps<any>;
    };

    const renderComponent = ():[ReactElement] => {
        const defaultProps = createDefaultComponentProps();
        if (props.type === FormInputType.Text || props.type === FormInputType.Password || props.type === FormInputType.Number) {
            return useRenderFormInput(props, defaultProps);
        } else if (props.type === FormInputType.Select) {
            return useRenderFormSelect(props, defaultProps);
        } else if (props.type === FormInputType.TextArea) {
            return useRenderFormTextarea(props, defaultProps);
        } else if (props.type === FormInputType.Checkbox) {
            return useRenderFormCheckbox(props, defaultProps);
        } else if (props.type === FormInputType.Custom) {
            return useRenderCustomField(props, defaultProps);
        } else if (props.type === FormInputType.DateTime) {
            return useRenderDatetime(props, defaultProps);
        }
        return [<div>{`Wrong input type ${props.type}`}</div>];
    };
    return renderComponent()[0];
}