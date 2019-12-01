import * as React from "react";
import {CSSProperties, FormEvent, ReactElement, ReactNode} from "react";
import cs from 'classnames';
import {LoadingIcon, Loading} from "../Loading";
import {FormInput, FormInputProps} from "./FormInput";
import Wrapper from "../Wrapper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as faIcon from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {httpEndpoint} from "../../utils/HttpUtils";
import {GenericMap, jsonToFormData} from "../../utils/Util";
import {FormSelect, SelectProps} from "./FormSelect";
import {toast} from "react-toastify";
import {JsonProperty, ObjectMapper} from "../../utils/ObjectMapper";
import {FormTextarea} from "./FormTextarea";
import {FormCheckbox} from "./FormCheckbox";
import {CustomFieldComponent, FormFieldInterface} from "./FormFieldInterface";


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

interface FormFieldProps<CustomOptions = any> {
    type: FormInputType | string;
    name: string;
    title: string;
    required?: boolean;
    icon?: IconProp;
    showIcon?: boolean;
    placeholder?: string;
    className?: string;
    useFormGroup?: boolean;
    disabled?: boolean;
    onChanged?: (field: FormField) => void;
    selectProps?:SelectProps;
    customComponent?:CustomFieldComponent|any
    customComponentOptions?:CustomOptions
}

interface FormFieldState {
    errors?: Array<string>;
}

export interface HiddenFormProps {
    simpleLabel?: boolean;
    inputGroupEnabled?: boolean;
}

interface HiddenFormFieldProps<> extends HiddenFormProps {
    defaultValue: any;
    onValueChanged: (field: FormField) => void
    fieldErrors:Array<FieldError>;
}

export class FormField<CustomOptions = any> extends React.Component<FormFieldProps<CustomOptions>, FormFieldState> {

    state = {};

    // @ts-ignore
    hiddenProps: HiddenFormFieldProps = this.props.hiddenProps;

    // @ts-ignore
    value: any = this.hiddenProps.defaultValue;

    componentWillReceiveProps(nextProps: Readonly<FormFieldProps>, nextContext: any): void {
        // @ts-ignore
        this.hiddenProps = nextProps.hiddenProps;
        this.value = this.hiddenProps.defaultValue;
    }

    static defaultProps = {
        showIcon: true,
        useFormGroup: false,
        disabled: false
    };

    valueChanged = (value: any) => {
        this.value = value;
        this.hiddenProps.onValueChanged(this);
        this.props.onChanged && this.props.onChanged(this);
    };

    validate():FieldError {
        const error = new FieldError();
        error.name = this.props.name;
        const isNull = this.props.required && (this.value === undefined || this.value === null || this.value === '');
        if(isNull) {
            error.message = "FieldIsRequired";
            error.localize = true;
            return error;
        }
        return null;
    }

    hasError() {
        return this.hiddenProps.fieldErrors.length > 0;
    }

    renderError() {
        return this.hasError() && <small><span className={"c-dribbble"}>{this.hiddenProps.fieldErrors.map((t, i) => <span
            key={i}>{t.localize&&Strings[t.message]||t.message} {this.hiddenProps.fieldErrors.length !== i + 1 && ", "}</span>)}</span></small>
    }

    getLabelText() {
        return <Wrapper>{this.props.title} {this.props.required && "*"}</Wrapper>;
    }

    resolveClassNames() {
        return cs(this.props.useFormGroup && "form-group", this.props.className, this.isEmpty() && "is-empty", this.hasError() && "has-error");
    }

    isEmpty() {
        return this.value === null || this.value === undefined || this.value.length === 0;
    }

    renderByStyle(content: (ig: any) => ReactElement, defaultIcon: IconProp = null) {
        let simpleLabel = this.hiddenProps.simpleLabel;
        const w = (c: any) => this.hiddenProps.inputGroupEnabled ?
            <div className={"input-group form-group"}>{c(true)}</div> : c(false);
        // @ts-ignore
        const icon = defaultIcon || this.props.icon || faIcon.faPen;
        return <div className={this.resolveClassNames()}>
            {simpleLabel && <label className="control-label"><Wrapper>{this.getLabelText()}</Wrapper></label>}
            {w((ig: any) => {
                return <Wrapper>
                    {(ig && !simpleLabel) && <div
                        className={cs("input-group-addon ig-left", this.props.required && "ig-required")}>{this.getLabelText()}</div>}
                    {content(ig)}
                    {(this.props.showIcon && icon) && (ig &&
                        // @ts-ignore
                        <div className="input-group-addon ig-right"><FontAwesomeIcon icon={icon}/></div> || null)}
                </Wrapper>
            })}
            {this.renderError()}
            {this.props.children}
        </div>;
    }

    renderFormInput() {

        let icon = faIcon.faPencilAlt;
        if(this.props.type === FormInputType.Password) {
            icon = faIcon.faLock;
        } else if(this.props.type === FormInputType.Number) {
            icon = faIcon.faOm;
        }

        return this.renderByStyle(() => {
            return <FormInput type={this.props.type}
                              className={"form-control"}
                              disabled={this.props.disabled}
                              placeholder={this.props.placeholder}
                              value={this.value}
                              name={this.props.name}
                              onValueChanged={this.valueChanged}
            />;
        }, icon)
    }

    renderFormTextarea() {
        return this.renderByStyle(() => {
            return <FormTextarea
                className={"form-control"}
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                value={this.value}
                name={this.props.name}
                onValueChanged={this.valueChanged}
            />;
        }, faIcon.faPencilAlt)
    }

    renderFormSelect() {
        return this.renderByStyle(() => {
            return <FormSelect className={"form-control"}
                               disabled={this.props.disabled}
                               placeholder={this.props.placeholder}
                               value={this.value}
                               name={this.props.name}
                               onValueChanged={this.valueChanged}
                               selectProps={this.props.selectProps}
            />;
        })
    }
    renderFormCheckbox() {
        return this.renderByStyle(() => {
            return <FormCheckbox className={"form-control"}
                                 disabled={this.props.disabled}
                                 placeholder={this.props.placeholder}
                                 value={this.value}
                                 name={this.props.name}
                                 onValueChanged={this.valueChanged}
            />;
        })
    }

    renderCustomField() {
        return this.renderByStyle(() => {
            if(this.props.customComponent === null || this.props.customComponent === undefined) {
                return <div>Custom component must have set prop customComponent</div>;
            }
            const Component = this.props.customComponent;
            // @ts-ignore
            return <Component className={"form-control"}
                              disabled={this.props.disabled}
                              placeholder={this.props.placeholder}
                              value={this.value}
                              name={this.props.name}
                              options={this.props.customComponentOptions}
                              onValueChanged={this.valueChanged}
            />;
        })
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
    type?: string;
    modifyUrl?: (url: string) => string;
    requestInit?: RequestInit
}

interface FormButtonProps<T> {
    className?: string;
    type?: string;
    onSend?: (form: Form<T>, type?: string) => FormButtonClickEvent
}

export class FormButton<T> extends React.Component<FormButtonProps<T>, { loading: boolean }> {
    state = {loading: false};

    onButtonClick: (event: FormButtonClickEvent) => void;

    constructor(props: FormButtonProps<T>) {
        super(props);
    }

    setStatus(status: boolean) {
        this.setState({loading: status});
    }

    render() {
        if (this.state.loading) {
            return <button className={cs("btn", this.props.className)} disabled={true}><LoadingIcon faSize={"1x"}/>
            </button>;
        }
        // @ts-ignore
        return <button onClick={() => {
            // @ts-ignore
            const event = this.props.onSend && this.props.onSend(this.props.form, this.props.type) || new FormButtonClickEvent();
            event.type = this.props.type;
            this.onButtonClick(event)
        }} className={cs("btn", this.props.className)}>{this.props.children}</button>;
    }
}

/********************
 *
 * FORM
 *
 ********************/
class FieldError {
    name:string;
    message:string;
    localize:boolean;
}
class ValidationError {
    code:number;
    message:string;
    @JsonProperty({clazz:FieldError, strict:{isArray:true}})
    errors:Array<FieldError> = new Array<FieldError>();
}

export class FormHttpResponse<T> {
    response: Response;
    status: FormStatus;
    data: T;
    validationError:ValidationError;
}

export enum FormStatus {
    Success, Error, Validation, Skip, Nothing
}

export interface FormProps<Data> extends HiddenFormProps {
    style?: CSSProperties;
    method?: string;
    isEndpoint?: boolean,
    showLoading?: boolean;
    url?: string;
    data: Data
    onSend?: (form: Form<Data>, event?: FormButtonClickEvent) => Promise<FormStatus | FormHttpResponse<Data>>
    onResult?: (result: FormHttpResponse<Data>) => void
    onChange?: (form: Form<Data>) => void
}

export const voidFormSubmit = (e: FormEvent) => e.preventDefault();

class FormState {
    errors:ValidationError = new ValidationError();
}

export class Form<Data> extends React.Component<FormProps<Data>, FormState> {
    instance: any;
    loading: Loading;
    hasFile: boolean = false;
    fields: Array<FormField> = [];
    buttons: Array<FormButton<Data>> = [];

    state = new FormState();

    static defaultProps = {
        method: "post",
        simpleLabel: false,
        inputGroupEnabled: true,
        isEndpoint: false
    };

    data: Data = this.props.data;
    processing: boolean = false;


    validate():boolean {
        let errors = new ValidationError();
        for(let i in this.fields) {
            const field = this.fields[i];
            const fieldErrors = field.validate();
            if(fieldErrors !== null) {
                errors.errors.push(fieldErrors);
            }
        }
        this.setState({errors:errors});
        return errors.errors.length === 0;
    }

    componentWillReceiveProps(nextProps: Readonly<FormProps<Data>>, nextContext: any): void {
        this.data = nextProps.data;
        this.setState({errors:new ValidationError()})
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
        this.setState({errors:new ValidationError()}, ()=>{
            this.sendInternal(event).then();
        });
    }

    async sendInternal(event: FormButtonClickEvent) {
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
        const url = event.modifyUrl && event.modifyUrl(this.props.url) || this.props.url;
        const init = {method: "POST", body: jsonToFormData(this.data, (field)=>{
                //convert object to id for spring and jpa support
                if(typeof field === 'object' && field.id !== undefined) {
                    return field.id;
                }
                return field;
            })};
        // @ts-ignore
        const result = await httpEndpoint<Data>(this.data.constructor, url, {...init, ...event.requestInit});
        const response = new FormHttpResponse<Data>();
        response.status = FormStatus.Success;
        response.response = result.response;
        if(result.response.status === 200) {
            response.data = result.data;
        } else if(result.response.status === 422) {
            response.status = FormStatus.Validation;
            response.validationError = new ObjectMapper<ValidationError>().readValue(ValidationError, result.json);
        } else {
            response.status = FormStatus.Error;
        }
        return response;
    }

    showValidation(response: FormHttpResponse<Data>) {
        this.setState({errors:response.validationError}, ()=>{
            toast.warn(response.validationError.message);
        })
    }
    showError(response: FormHttpResponse<Data>) {
        toast.error(Strings["ServerError"]);
    }

    showSuccess(response: FormHttpResponse<Data>) {
        toast.success(Strings["DataSaved"]);
    }

    onValueChanged(field: FormField) {
        // @ts-ignore
        this.data[field.props.name] = field.value;
        if (field.isEmpty()) {
            // @ts-ignore
            delete this.data[field.props.name];
        }
        this.props.onChange && this.props.onChange(this);
    }

    mapChildren(children: ReactNode): ReactNode {
        this.hasFile = false;
        this.fields = [];
        this.buttons = [];
        return React.Children.map(children, child => {
            if (!React.isValidElement(child)) {
                return child;
            }
            let addProps = {};
            if (child.type == FormField || child.type == FormButton) {
                addProps = {
                    form:this,
                    hiddenProps: {
                        fieldErrors:this.state.errors.errors.filter(i=>i.name === child.props.name),
                        simpleLabel: this.props.simpleLabel,
                        inputGroupEnabled: this.props.inputGroupEnabled,
                        // @ts-ignore
                        defaultValue: this.data[child.props.name],
                        onValueChanged: this.onValueChanged.bind(this)
                    },
                };
                if (child.props.type === 'file') {
                    this.hasFile = true;
                }
            }
            const clone = React.cloneElement(child, {
                ...child.props,
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
                children: this.mapChildren(child.props.children)
            });
            if ('file' === child.props.type) {
                this.hasFile = true;
            }
            return clone;
        })
    }


    render() {
        console.log("render form");
        return <form className="need-validation" method={this.props.method}
                     onSubmit={voidFormSubmit}
                     action={this.props.url} ref={o => this.instance = o}
                     onSubmitCapture={voidFormSubmit} style={{position: "relative", ...this.props.style}}>
            {this.mapChildren(this.props.children)}
            <Loading ref={o => this.loading = o}/>
        </form>;
    }

}