import * as React from "react";
import {AjaxTable, AjaxTableButton, AjaxTableFilter} from "./AjaxTable";
import Wrapper from "./Wrapper";
import {Form, FormButton, FormHttpResponse, FormProps, FormStatus, HiddenFormProps} from "./form/Form";
import Collapse from "react-bootstrap/Collapse";
import {exist} from "../utils/Util";
import {httpEndpoint} from "../utils/HttpUtils";
enum DetailState {
    New = "New", Edit = "Edit"
}

interface DialProps<T> {
    classType:{new(): T};
    url:string;
    dataTableProps?: {[key:string]:any}
    buttons?:Array<AjaxTableButton>;
    reloadTableOnSave:boolean;
}

export class DialFilter extends React.Component {
    render() {
        return this.props.children;
    }
}
interface DialFormProps<T> extends HiddenFormProps {
    detailId?:string;
    render?:(detailState:DetailState, data?:T, refreshCallBack?:(data:T)=>void)=>React.ReactElement
}
export class DialForm<T> extends React.Component<DialFormProps<T>> {
    render() {
        return this.props.children;
    }
}
interface LocalFormProps<T> extends DialFormProps<T> {
    url:string;
    constructor:{new():T};
    onSave:(t:T)=>void;
    formProps?:DialFormProps<T>;
}
interface LocalFormState<T> {
    data?:T,
    detailState:DetailState
}
class LocalForm<T> extends React.Component<LocalFormProps<T>, LocalFormState<T>> {
    // @ts-ignore
    state = {data:new this.props.constructor(), detailState:DetailState.New};

    componentWillReceiveProps(nextProps: Readonly<LocalFormProps<T>>, nextContext: any): void {
        this.loadDetail(nextProps.detailId);
    }

    componentDidMount(): void {
        this.loadDetail(this.props.detailId);
    }

    loadDetail(id?:string) {
        if(exist(id)) {
            httpEndpoint<T>(this.props.constructor, `${this.props.url}/${id}`).then(result=>{
                this.setState({data:result.data, detailState:DetailState.Edit});
            })
        } else {
            this.setState({data:new this.props.constructor(), detailState:DetailState.New});
        }
    }

    isEdit() {
        return exist(this.props.detailId);
    }

    onResult(form:FormHttpResponse<T>) {
        if(form.status === FormStatus.Success) {
            this.setState({data:form.data}, ()=>{
                this.props.onSave(form.data);
            });
        }
    }

    onRefresh = (data:T) => {
        this.setState({data:data});
    };

    render() {
        return <Form<T> data={this.state.data} url={this.props.url} onResult={this.onResult.bind(this)} {...this.props.formProps}>
            <div id="adding-collapse" className="card table--no-card m-b-30 not-overflow" /*hidden={this.state.expandedAdding}*/
                 style={{ marginBottom: 15 }}>
                {this.props.formProps.render&&this.props.formProps.render(this.state.detailState, this.state.data, this.onRefresh)||this.props.children}
                <div className="card-body card-block input-minus30">
                    <div className="float-right" hidden={!this.isEdit()}>
                        <FormButton<T> className={"cur-p btn-success"} type={"new"} onSend={(form:Form<T>, type?:string)=>{
                            return {
                                modifyUrl:(url:string) => `${url}/new`
                            };
                        }}>
                            Uložit jako nový
                        </FormButton>
                    </div>
                    <div className="float-right" style={{ marginRight: 10 }}>
                        <FormButton<T> className={"cur-p btn-success"} type={"save"} onSend={(form:Form<T>, type?:string)=>{
                            return {
                                // @ts-ignore
                                modifyUrl:(url:string) => `${url}/${form.data.id||"new"}`
                            };
                        }}>
                            {this.isEdit() ? " Uložit změny " : " Vytvořit záznam "}
                        </FormButton>
                    </div>
                </div>
            </div>

        </Form>
    }
}

class DialState {
    showForm:boolean = false;
    detailId?:any = null;
}

export class Dial<T> extends React.Component<DialProps<T>, DialState> {

    state = new DialState();
    table:AjaxTable<T>;
    static defaultProps = {
      buttons:new Array<AjaxTableButton>(),
      reloadTableOnSave:false
    };

    getAddNewButton() {
        return {text:<Wrapper><i className={!this.state.showForm ? "zmdi zmdi-plus" : "zmdi zmdi-close"} />{!this.state.showForm?"test":"test2"}</Wrapper>, onClick:()=>this.setState({showForm:!this.state.showForm, detailId:null}), className:`au-btn au-btn-icon ${!this.state.showForm?"au-btn--blue":"btn-secondary"} au-btn--small`};
    }

    async reload(t:T) {
        if(this.props.reloadTableOnSave) {
            await this.table.reload();
        }
    }

    renderChildren() {
        return React.Children.map(this.props.children,child=>{
            if (React.isValidElement(child) && child.type == DialFilter) {
                return <AjaxTableFilter>
                    {child}
                </AjaxTableFilter>;
            } else if (React.isValidElement(child) && child.type == DialForm) {
                return <Collapse in={this.state.showForm}>
                    <div>
                        {
                            //@ts-ignore
                            <LocalForm<T> constructor={this.props.classType} detailId={child.props.detailId||this.state.detailId} url={this.props.url} onSave={this.reload.bind(this)} formProps={child.props}>
                                {child}
                            </LocalForm>
                        }
                    </div>
                </Collapse>;
            }
            return child;
        });
    }

    render() {
        return (
            <div>
                <AjaxTable<T> constructor={this.props.classType} url={this.props.url} dataTableProps={
                    {onRowClicked:(row:T)=>{
                        // @ts-ignore
                            this.setState({detailId:row.id, showForm:true});
                        }, ...this.props.dataTableProps}
                } buttons={[this.getAddNewButton(), ...this.props.buttons]} ref={o=>this.table=o}>
                    {this.renderChildren()}
                </AjaxTable>
            </div>
        );
    }
}