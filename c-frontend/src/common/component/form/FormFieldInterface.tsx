import * as React from "react";

export interface FormFieldInterface {

}

export class FormFieldListeners {
    onLabelClick:(e:React.MouseEvent)=>void
}

export interface FormFieldInterfaceProps<T> {
    name:string;
    value?:T;
    disabled?:boolean;
    className?:string;
    placeholder?:string;
    simpleLabel?:boolean;
    dataTip?:string;
    onValueChanged:(value:any)=>void
    listeners?:FormFieldListeners,
    focused?:boolean,
    enableFocusSupport?:VoidFunction,
    title?:string
}

export interface CustomFieldComponentProps<T, O> extends FormFieldInterfaceProps<T> {
    options?:O
}

export class CustomFieldComponent<T = string, O = GenericMap<any>, S = any, SS = any> extends React.Component<CustomFieldComponentProps<T, O>, S, SS> implements FormFieldInterface {

}