import * as React from "react";
import {User} from "../../model/User";
import {
    Form,
    FormButton,
    FormButtonClickEvent,
    FormField,
    FormHttpResponse,
    FormStatus
} from "../../component/form/Form";
import {Dial, DialFilter, DialForm} from "../../component/Dial";
import {httpEndpoint} from "../../utils/HttpUtils";
import {UserRole} from "../../model/Enums";


class TestDto {
    fieldName:string = "field value"
}

class TestForm extends React.Component {
    state = {data:new TestDto()};

    onResult = (result:FormHttpResponse<TestDto>) => {

    };

    onFormChange = (form:Form<TestDto>) => {

    };

    async processLogin(form:Form<TestDto>, event: FormButtonClickEvent):Promise<FormStatus|FormHttpResponse<TestDto>> {
        //Skip se pouzije v pripade, ze po zavolani requestu dojde k odrenderovani formu (ve formu se totiz cely form prerenderovava a react pak haze chybu)
        //v pripade ze form zustava, se muze vratit jiny status nebo i cely object FormHttpResponse<TestDto>
        //ve vetsine pripadu ale neni treba tuto funkci pouzivat nebot ajax se da modifikovat na buttonu
        //v podstate se tato funkce pouzije pouze v pripade, kdyz request vraci jiny json, nez ktery ocekava komponenta Form
        //form ocekava vraceni bud objectu TestDto nebo ValidationError
        return FormStatus.Skip;
    }

    render() {
        return (
            <Form<TestDto> data={this.state.data} onResult={this.onResult} onChange={this.onFormChange} onSend={this.processLogin.bind(this)}>
                <FormField name={"fieldName"} title={"fieldName"} type={"text"} />
                <FormField name={"fieldName2"} title={"fieldName2"} type={"text"} onChanged={(field => {
                    const {data} = this.state;
                        data.fieldName = `${field.value}.${data.fieldName}`;
                    this.setState({data:data});
                })} />
                <FormButton type={"default"}>Default</FormButton>
                <FormButton type={"button1"} onSend={(form:Form<TestDto>, type) => {
                    const event = new FormButtonClickEvent();
                    event.modifyUrl = url => `${url}/new/${form.data.fieldName}`;
                    event.requestInit = {
                        headers: {

                        }
                    };
                    return event;
                }}>Button1</FormButton>
                <FormButton type={"button2"} onSend={form => {
                    return {
                        modifyUrl:url => `${url}/new`,
                        requestInit: {

                        }
                    }
                }}>Button2</FormButton>
            </Form>
        );
    }
}

export class TestovaciCiselnik extends React.Component {

    render() {
        return (
            <div>
                <Dial<User> url={"user"} classType={User} dataTableProps={{
                    columns: [
                        {
                            name: Strings["login"],
                            selector: 'login',
                            sortable: true,
                            minWidth: "70px",
                            compact: true
                        }
                    ]
                }} reloadTableOnSave>
                    <DialFilter>
                        <FormField name={"login"} title={"Login"} type={"text"} className={"col-md-4"} />
                    </DialFilter>
                    <DialForm render={(detailState, data:User, refresh)=> {
                        console.log(detailState);
                        return <div className="card-body card-block">
                            <label className="control-label">Základní údaje</label>
                            <div className={"form-row"}>
                                <FormField name={"login"} title={"Login"} type={"text"} className={"col-md-4"} />
                                <FormField name={"roles"} title={"Roles"} type={"select"} className={"col-md-4"} selectProps={{
                                    options:Object.keys(UserRole),
                                    formatOption:(value:string)=>{return {value:value, label:Strings[`Enumerations.Roles.${value}`]}},
                                    formatValue:(value:any)=>value["value"],
                                    isMulti:true
                                }} onChanged={field => {
                                    data.login = field.value;
                                    refresh(data);
                                }}/>
                            </div>
                        </div>;
                    } }/>
                </Dial>
                <TestForm />
            </div>
        );
    }
}