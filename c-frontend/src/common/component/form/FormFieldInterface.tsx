import {GenericMap} from "../../utils/Util";
import * as React from "react";

export interface FormFieldInterface {

}
export interface FormFieldInterfaceProps<T> {
    name:string;
    value?:T;
    disabled?:boolean;
    className?:string;
    placeholder?:string;
    onValueChanged:(value:any)=>void
}

interface CustomFieldComponentProps<T, O> extends FormFieldInterfaceProps<T> {
    options?:O
}

export class CustomFieldComponent<T = string, O = GenericMap<any>, S = any, SS = any> extends React.Component<CustomFieldComponentProps<T, O>, S, SS> implements FormFieldInterface {

}