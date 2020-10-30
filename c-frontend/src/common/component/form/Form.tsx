import * as React from "react";
import {CSSProperties, FormEvent, ReactElement, ReactNode} from "react";
import cs from 'classnames';
import {Loading, LoadingIcon} from "../Loading";
import {FormInput} from "./FormInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as faIcon from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {httpEndpoint, httpEndpointCustom} from "../../utils/HttpUtils";
import {deepEqual, jsonToFormData, jsonToFormUrlEncoded} from "../../utils/Util";
import {FormSelect, SelectProps} from "./FormSelect";
import {toast} from "react-toastify";
import {FormTextarea} from "./FormTextarea";
import {FormCheckbox} from "./FormCheckbox";
import {CustomFieldComponent, FormFieldListeners} from "./FormFieldInterface";
import {CustomDatetimepickerProps, FormDatetime} from "./FormDatetime";
import ReactTooltip from 'react-tooltip'
import moment from "moment";
import _ from 'lodash';
import {Mapper} from "../../utils/objectmapper/Mapper";
import {FieldError, ValidationError} from "./ValidationError";
import {Button} from "@material-ui/core";

// export const ISO_DATETIME_STRING = "YYYY-MM-DD[T]HH:mm:ss.SSSZZ";
// export const ISO_LOCAL_DATETIME_STRING = "YYYY-MM-DD[T]HH:mm:ss.SSS";

/********************
 *
 * FORM FIELD
 *
 ********************/
export enum FormInputType {
    Text = "text",
    Password = "password",
    AutoComplete = "autocomplete",
    Select = "select",
    TextArea = "textarea",
    DateTime = "datetime",
    Number = "number",
    FormattedNumber = "formattednumber",
    Checkbox = "checkbox",
    Custom = "Custom"
}
type Validation = {regexp: RegExp, message:string}
export interface FormFieldProps<CustomOptions = any> {
    type: FormInputType | string;
    wysiwyg?:boolean,
    name: string;
    title?: string;
    required?: boolean;
    icon?: IconProp;
    showIcon?: boolean;
    placeholder?: string;
    className?: string;
    useFormGroup?: boolean;
    disabled?: boolean;
    onChanged?: (field: FormField) => void;
    selectProps?: SelectProps;
    customComponent?: CustomFieldComponent | any;
    customComponentOptions?: CustomOptions;
    dateTimeOptions?: CustomDatetimepickerProps;
    ignoreBlockSave?:boolean;
    dataTip?:string;
    validate?:((value:any)=>FieldError[])|Validation|Validation[]
}

interface FormFieldState {
    errors?: Array<string>;
    focused:boolean;
}

export interface HiddenFormProps {
    simpleLabel?: boolean;
    inputGroupEnabled?: boolean;
}

interface HiddenFormFieldProps<> extends HiddenFormProps {
    defaultValue: any;
    onValueChanged: (field: FormField) => void;
    fieldErrors: Array<FieldError>;
}

type SimpleEventMethod = (e:React.MouseEvent)=>void

class FormDefaults {
    localization:GenericMap = {}
}
const defaults = new FormDefaults();

export function setLocalization(locs:GenericMap) {
    defaults.localization = locs;
}

export class FormField<CustomOptions = any> extends React.Component<FormFieldProps<CustomOptions>, FormFieldState> {
    listenersInstance = new FormFieldListeners();
    state = {focused:false};
    // @ts-ignore
    hiddenProps: HiddenFormFieldProps = this.props.hiddenProps;

    supportTabFocus:boolean = false;

    // @ts-ignore
    value: any = this.hiddenProps.defaultValue;

    componentWillReceiveProps(nextProps: Readonly<FormFieldProps>, nextContext: any): void {
        // @ts-ignore
        this.hiddenProps = nextProps.hiddenProps;
        this.value = this.hiddenProps.defaultValue;
    }

    static defaultProps = {
        ignoreBlockSave:false,
        showIcon: true,
        useFormGroup: false,
        disabled: false
    };

    valueChanged = (value: any) => {
        this.value = value;
        this.hiddenProps.onValueChanged(this);
        this.props.onChanged && this.props.onChanged(this);
    };

    hasError() {
        return this.hiddenProps.fieldErrors.length > 0;
    }

    renderError() {
        return this.hasError() &&
            <small><span className={"c-dribbble"}>{this.hiddenProps.fieldErrors.map((t, i) => {
                return <span key={i}>{t.localize&&defaults.localization["FieldMessages"][t.message]||t.message} {this.hiddenProps.fieldErrors.length !== i + 1 && ", "}</span>
            })}</span></small>
    }

    getLabelText() {
        return <>{this.props.title} {this.props.required && "*"}</>;
    }

    resolveClassNames() {
        return cs(this.props.useFormGroup && "form-group", this.props.className, this.isEmpty() && "is-empty", this.hasError() && "has-error");
    }

    isEmpty() {
        return this.value === null || this.value === undefined || this.value.length === 0;
    }

    renderByStyle(content: () => ReactElement, defaultIcon: IconProp = null, showIcon: boolean = true) {
        let simpleLabel = this.hiddenProps.simpleLabel;
        const w = (c: any) => this.hiddenProps.inputGroupEnabled ? <div className={"input-group form-group"}>{c(true)}</div> : c(false);
        // @ts-ignore
        const icon = defaultIcon || this.props.icon || faIcon.faPen;
        const onLabelClick = (e:React.MouseEvent) => {
          if(this.listenersInstance.onLabelClick) {
              this.listenersInstance.onLabelClick(e);
          }
        };
        return <div className={this.resolveClassNames()} onFocus={()=>this.setState({focused:true})} onBlur={()=>this.setState({focused:false})}>
            {simpleLabel && <label className="control-label hover" htmlFor={this.props.name}><>{this.getLabelText()}</></label>}
            {w((ig: any) => {
                return <>
                    {(ig && !simpleLabel) && <label htmlFor={this.props.name} onClick={onLabelClick}
                        className={cs("input-group-addon ig-left hover", this.props.required && "ig-required")}>{this.getLabelText()}</label>}
                    {content()}
                    {(this.props.showIcon && icon && showIcon) && (ig &&
                        // @ts-ignore
                        <div className="input-group-addon ig-right"><FontAwesomeIcon icon={icon}/></div> || null)}
                </>
            })}
            {this.renderError()}
            {this.props.children}
        </div>;
    }


    createDefaultProps = () => {
        return {
            dataTip:this.props.dataTip,
            className: "form-control",
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            focused:this.state.focused,
            value: this.value,
            name: this.props.name,
            onValueChanged: this.valueChanged,
            simpleLabel: this.hiddenProps.simpleLabel,
            listeners: this.listenersInstance,
            title: this.props.title,
            enableFocusSupport:()=>this.supportTabFocus = true
        };
    };

    renderFormInput() {

        let icon = faIcon.faPencilAlt;
        if (this.props.type === FormInputType.Password) {
            icon = faIcon.faLock;
        } else if (this.props.type === FormInputType.Number) {
            icon = faIcon.faOm;
        }

        return this.renderByStyle(() => {
            return <FormInput type={this.props.type} 
                              {...this.createDefaultProps()}
            />;
        }, icon);
    }

    renderFormTextarea() {
        return this.renderByStyle(() => {
            return <FormTextarea 
                {...this.createDefaultProps()}
                wysiwyg={this.props.wysiwyg}
            />;
        }, faIcon.faPencilAlt);
    }

    renderFormSelect() {
        return this.renderByStyle(() => {
            return <FormSelect  {...this.createDefaultProps()} 
                                selectProps={this.props.selectProps}
            />;
        }, null, false);
    }

    renderFormCheckbox() {
        return this.renderByStyle(() => {
            return <FormCheckbox  {...this.createDefaultProps()}
                                  onValueChanged={this.valueChanged}
                                  
            />;
        }, null, false);
    }

    renderDatetime() {
        return this.renderByStyle(() => {
            return <FormDatetime  {...this.createDefaultProps()}
                                  dateTimeOptions={this.props.dateTimeOptions}
            />;
        }, faIcon.faCalendar);
    }

    renderCustomField() {
        return this.renderByStyle(() => {
            if (this.props.customComponent === null || this.props.customComponent === undefined) {
                return <div>Custom component must have set prop customComponent</div>;
            }
            const Component = this.props.customComponent;
            // @ts-ignore
            return <Component  {...this.createDefaultProps()}
                               options={this.props.customComponentOptions}
                               
            />;
        });
    }

    validate():FieldError[] {
        const errors = [] as FieldError[];
        const isNull = (this.value === undefined || this.value === null || this.value === '');
        if(isNull && this.props.required) {
            errors.push(FieldError.Create("FieldIsRequired", true));
        }
        if(this.props.validate)
            if(typeof this.props.validate === "function") {
                errors.concat(this.props.validate(this.value) || []);
            } else {
                // typeof this.props.validate === "object"
                const doValidate = (validation:Validation) => {
                    if(!isNull&&!this.value.toString().match(validation.regexp)) {
                        errors.push(FieldError.Create(validation.message));
                    }
                };
                if(Array.isArray(this.props.validate)) {
                    this.props.validate.forEach(doValidate);
                } else {
                    doValidate(this.props.validate);
                }
            }
        errors.forEach(e=>e.name = this.props.name);
        return errors;
    }

    render() {
        if (this.props.type === FormInputType.Text || this.props.type === FormInputType.Password || this.props.type === FormInputType.Number) {
            return this.renderFormInput();
        } else if (this.props.type === FormInputType.Select) {
            return this.renderFormSelect();
        } else if (this.props.type === FormInputType.TextArea) {
            return this.renderFormTextarea();
        } else if (this.props.type === FormInputType.Checkbox) {
            return this.renderFormCheckbox();
        } else if (this.props.type === FormInputType.Custom) {
            return this.renderCustomField();
        } else if (this.props.type === FormInputType.DateTime) {
            return this.renderDatetime();
        }
        return `Wrong input type ${this.props.type}`;
    }

}

/********************
 *
 * FORM BUTTON
 *
 ********************/
export class FormButtonClickEvent {
    modifyUrl?: (url: string) => string;
    requestInit?: RequestInit
}

interface FormButtonProps<T> {
    className?: string;
    type?: string;
    main?:boolean;
    onSend?: (form: Form<T>, type?: string) => FormButtonClickEvent
}

export class FormButton<T> extends React.Component<FormButtonProps<T>, { loading: boolean, disabled:boolean }> {
    // @ts-ignore
    state = {loading: false, disabled:this.props.hiddenProps.blockSaveUntilChange||false};

    onButtonClick: (event: FormButtonClickEvent) => void;

    constructor(props: FormButtonProps<T>) {
        super(props);
    }

    setStatus(status: boolean) {
        this.setState({loading: status});
    }
    setDisabled(status: boolean) {
        this.setState({disabled: status});
    }
    doClick = () => {
        if(this.state.disabled) {
            return;
        }
        // @ts-ignore
        const event = this.props.onSend && this.props.onSend(this.props.form, this.props.type) || new FormButtonClickEvent();
        event.requestInit = _.merge({headers:{"type": this.props.type||""}}, event.requestInit);
        this.onButtonClick(event)
    };
    render() {
        if (this.state.loading) {
            return <button className={cs("btn", this.props.className)} disabled={true}><LoadingIcon faSize={"1x"}/></button>;
        }
        // @ts-ignore
        return <Button variant={"contained"} onClick={this.doClick} className={cs("btn", this.props.className)} disabled={this.state.disabled}>{this.props.children}</Button>;
    }
}

/********************
 *
 * FORM
 *
 ********************/


export class FormHttpResponse<T> {
    response: Response;
    status: FormStatus;
    data: T;
    validationError: ValidationError;
}

export enum FormStatus {
    Success, Error, Validation, Skip, Nothing, Custom
}

export type ResultType<Data> = Promise<FormStatus | FormHttpResponse<Data>>

export interface FormProps<Data> extends HiddenFormProps {
    blockSaveUntilChange?:boolean,
    style?: CSSProperties;
    method?: string;
    isEndpoint: boolean,
    requestInit?:RequestInit,
    crud?:boolean,
    showLoading?: boolean;
    onPropsChanged?(form:Form<Data>):void
    url?: string;
    data: Data
    onSend?: (form: Form<Data>, event?: FormButtonClickEvent) => ResultType<Data>
    onResult?: (result: FormHttpResponse<Data>) => void
    onChange?: (form: Form<Data>) => void
}

export const voidFormSubmit = (e: FormEvent) => e.preventDefault();

class FormState {
    errors: ValidationError = new ValidationError();
}

export class Form<Data> extends React.Component<FormProps<Data>, FormState> {
    instance: any;
    loading: Loading;
    hasFile: boolean = false;
    fields: Array<FormField> = [];
    buttons: Array<FormButton<Data>> = [];

    state = new FormState();

    static defaultProps = {
        blockSaveUntilChange:false,
        method: "post",
        simpleLabel: false,
        inputGroupEnabled: true,
        isEndpoint: false
    };

    data: Data = this.props.data;
    originData: Data = _.merge({}, this.data);

    //slouzi pro exclude fieldu pri blockSaveUntilChange
    __bsuc_excludeFields:string[] = [];

    processing: boolean = false;


    componentWillReceiveProps(nextProps: Readonly<FormProps<Data>>, nextContext: any): void {
        this.data = nextProps.data;
        this.originData = _.merge({}, this.data);
        //this is dangerous use this function carefouly
        nextProps.onPropsChanged&&nextProps.onPropsChanged(this);
        this.setState({errors: new ValidationError()});
    }


    validate():boolean {
        let errors = new ValidationError();
        this.fields.forEach(field=>{
            const fieldErrors = field.validate();
            if(fieldErrors !== null) {
                errors.errors = errors.errors.concat(fieldErrors);
            }
        });
        this.setState({errors:errors});
        return errors.errors.length === 0;
    }

    setProcessing(status: boolean) {
        this.processing = status;
        if (this.props.showLoading) {
            this.loading.setState({show: status});
        }
        this.buttons.forEach(o => o.setStatus(status));

    }

    async send(event: FormButtonClickEvent) {
        if (this.processing) {
            return;
        }
        this.setState({errors: new ValidationError()}, () => {
            this.sendInternal(event).then();
        });
    }

    async sendInternal(event: FormButtonClickEvent) {
        if(!this.validate()) {
            return;
        }
        this.setProcessing(true);
        let result: FormStatus | FormHttpResponse<Data>;
        if (this.props.onSend) {
            result = await this.props.onSend(this, event);
        } else {
            result = await this.sendForm(event);
        }

        let status: FormStatus;
        let response: FormHttpResponse<Data>;

        if (result instanceof FormHttpResponse) {
            response = result as FormHttpResponse<Data>;
            status = response.status;
        } else {
            status = result as FormStatus;
            response = new FormHttpResponse<Data>();
            response.status = status;
        }
        switch (status) {
            case FormStatus.Error:
                this.showError(response);
                break;
            case FormStatus.Validation:
                this.showValidation(response);
                break;
            case FormStatus.Success:
                this.showSuccess(response);
                break;
        }
        if (status !== FormStatus.Skip) {
            this.setProcessing(false);
        }
        this.props.onResult && this.props.onResult(response);
    }

    async sendForm(event: FormButtonClickEvent): Promise<FormHttpResponse<Data>> {
        const mapper = new Mapper<Data>({constructor:this.data.constructor as {new():Data}});
        const url = event.modifyUrl && event.modifyUrl(this.props.url) || this.props.url;
        const json = mapper.writeValueAsJson(this.data);
        let method = "POST";
        let headers = {'Content-Type': 'application/x-www-form-urlencoded'};
        if(this.props.crud) {
            method = url.includes("new") ? "POST" : "PUT";
        }
        let convertMethod:(json:GenericMap, userOptions?:{})=>any = jsonToFormUrlEncoded;
        if(this.hasFile){
            convertMethod = jsonToFormData;
            // headers['Content-Type'] = 'multipart/form-data';
        }
        const init = _.merge({method: method, headers:headers, body: convertMethod(json)}, _.merge(event.requestInit, this.props.requestInit));
        const result = await httpEndpointCustom(url, init);
        const response = new FormHttpResponse<Data>();
        response.status = FormStatus.Nothing;

        if((result || null) !== null) {
            response.response = result.response;
            if (result.response.status >= 200 && result.response.status < 300) {
                response.status = FormStatus.Success;
                response.data = mapper.readValue(result.json);
            } else if (result.response.status === 422) {
                response.status = FormStatus.Validation;
                response.validationError = new Mapper<ValidationError>({constructor:ValidationError}).readValue(result.json);
            } else {
                response.status = FormStatus.Error;
            }
        }

        return response;

    }

    showValidation(response: FormHttpResponse<Data>) {
        this.setState({errors: response.validationError}, () => {
            toast.warn(response.validationError.message);
        })
    }

    showError(response: FormHttpResponse<Data>) {
        toast.error(defaults.localization["ServerError"]);
    }

    showSuccess(response: FormHttpResponse<Data>) {
        toast.success(defaults.localization["DataSaved"]);
    }

    onValueChanged(field: FormField) {
        // @ts-ignore
        this.data[field.props.name] = field.value;
        // if (field.value === undefined) { //field.isEmpty()) {
        //     // @ts-ignore
        //     delete this.data[field.props.name];
        // }
        this.testBlockSaveUntilChange();
        this.props.onChange && this.props.onChange(this);
    }

    testBlockSaveUntilChange() {
        if(this.props.blockSaveUntilChange) {
            // @ts-ignore
            this.buttons.forEach(button=>button.setDisabled(deepEqual(this.data, this.originData, this.__bsuc_excludeFields)));
        }
    }

    mapChildren(children: ReactNode): ReactNode {
        this.fields = [];
        this.buttons = [];
        this.hasFile = false;
        return React.Children.map(children, child => {
            if (!React.isValidElement(child)) {
                return child;
            }
            let props = child.props;
            let addProps = {};
            if (child.type == FormField || child.type == FormButton) {
                if(props.ignoreBlockSave) {
                    this.__bsuc_excludeFields.push(props.name);
                }
                addProps = {
                    form: this,
                    hiddenProps: {
                        blockSaveUntilChange: this.props.blockSaveUntilChange,
                        fieldErrors: this.state.errors.errors.filter(i => i.name === props.name),
                        simpleLabel: this.props.simpleLabel,
                        inputGroupEnabled: this.props.inputGroupEnabled,
                        // @ts-ignore
                        defaultValue: this.data[props.name],
                        onValueChanged: this.onValueChanged.bind(this)
                    },
                };
                if (props.type === 'file') {
                    this.hasFile = true;
                }
            }
            const clone = React.cloneElement(child, {
                ...props,
                ...addProps,
                ref: (o: any) => {
                    const isField = o instanceof FormField;
                    const isButton = o instanceof FormButton;
                    if (isField) {
                        this.fields.push(o);
                    }
                    if (isButton) {
                        o.onButtonClick = this.send.bind(this);
                        this.buttons.push(o);
                    }
                },
                children: this.mapChildren(props.children)
            });
            if ('file' === props.type) {
                this.hasFile = true;
            }
            return clone;
        })
    }


    onKey = (e:KeyboardEvent) => {
        if(e.key === "Enter") {
            if(this.buttons.length > 0) {
                if(this.buttons.length === 1) {
                    this.buttons[0].doClick();
                } else {
                    const mainButtons = this.buttons.filter(b=>b.props.main);
                    if(mainButtons.length > 0) {
                        mainButtons[0].doClick();
                    }
                }

            }
        } else if(e.key === "Tab") {
            e.preventDefault();
            let nextIndex = 0;
            const supportedFields = this.fields.filter(i=>i.supportTabFocus && !i.props.disabled);
            supportedFields.forEach((f, i)=>{
                if(f.state.focused) {
                    nextIndex = i +1;
                }
                f.setState({focused:false});
            });
            if(nextIndex >= supportedFields.length) {
                nextIndex = 0;
            }
            supportedFields[nextIndex].setState({focused:true});
        }
    };

    enableTabSwitching = (e:React.FocusEvent<HTMLFormElement>) => {
        e.target.addEventListener('keydown', this.onKey);
    };

    disabledTabSwitching = (e:React.FocusEvent<HTMLFormElement>) => {
        e.target.removeEventListener('keydown', this.onKey);
    };


    render() {
        return <form className="need-validation" method={this.props.method}
                     onSubmit={voidFormSubmit}
                     onFocus={this.enableTabSwitching}
                     onBlur={this.disabledTabSwitching}
                     action={this.props.url} ref={o => this.instance = o}
                     onSubmitCapture={voidFormSubmit} style={{position: "relative", ...this.props.style}}>
            {this.mapChildren(this.props.children)}
            <Loading ref={o => this.loading = o}/>
        </form>;
    }

}