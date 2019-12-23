import * as React from "react";
import {Form, FormButton, FormField, FormHttpResponse, FormInputType} from "../../../common/component/form/Form";
import Wrapper from "../../../common/component/Wrapper";
import {httpEndpointArray} from "../../../common/utils/HttpUtils";
import {OrderDto} from "../../dto/OrderDto";
import {Link} from "../../../common/component/Link";
import {productImageUrl} from "../../TemplateUtil";
import {Price} from "../../dto/GoodsDto";
import {Modal, ModalBody} from "react-bootstrap";

class StorageData {
    trackingNumber:string
}

interface AccessedFormState {
    id?:number
    list:Array<OrderDto>
    detail?:OrderDto
}

class AccessedForm extends React.Component<{id?:number, passcode:string}, AccessedFormState> {

    state:AccessedFormState = {list:new Array<OrderDto>(), id:this.props.id};


    async componentDidMount() {
        this.refreshList()
    }

    refreshList = async() => {
        const result = await httpEndpointArray<OrderDto>(OrderDto, "storage", {method:"GET", headers:{"passcode":this.props.passcode}});
        console.log(result);
        this.setState({list:result.data});
    };

    render() {
        return <Wrapper>
            {
                this.state.detail&&
                <Modal show={true} onHide={() => this.setState({detail: null})}>
                    <ModalBody>
                        <div className="table-responsive">
                            <table className="table table-bordered mb-30">
                                <thead>
                                <tr>
                                    <th scope="col">Obrázek</th>
                                    <th scope="col">Produkt</th>
                                    <th scope="col">Cena za kus</th>
                                    <th scope="col">Počet</th>
                                    <th scope="col">Celkem</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.detail.goods.map(i => (
                                    <tr key={i.goods.id}>
                                        <td>
                                            <img src={productImageUrl(i.goods.code, 1)} alt="Product"/>
                                        </td>
                                        <td>
                                            {/*<a href="#">Bluetooth Speaker</a>*/}
                                            {i.goods.name}
                                        </td>
                                        <td>{i.goods.getPrice().format()}</td>
                                        <td>
                                            {i.pcs} ks
                                        </td>
                                        <td>{new Price(i.goods.price * i.pcs, 'CZK').format()}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </ModalBody>
                </Modal>
            }
            Nevyrizene objednavky:
            <table className="table mb-0">
                <thead>
                <tr>
                    <td>id</td><td>email</td><td/>
                </tr>
                </thead>
                <tbody>
                    {this.state.list.map(item=>(
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>
                                <Link href={()=>this.setState({id:item.id})} className={"mr-5"}>Vyridit</Link>
                                <Link href={()=>this.setState({detail:item})}>Detail</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                this.state.id&&
                <Form<StorageData> onResult={this.refreshList} data={new StorageData()} url={`storage/save/${this.state.id}`} inputGroupEnabled={false} simpleLabel={true} requestInit={{method:"POST", headers:{"passcode":this.props.passcode}}}>
                    <hr/>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <FormField name={"trackingUrl"} title={"TrackingUrl"} type={FormInputType.Text} />
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <FormButton className={"btn btn-small btn-success mr-1"} type={"confirm"}>Potvrdit</FormButton>
                            <FormButton className={"btn btn-small btn-danger mr-1"} type={"cancel"}>Zrusit</FormButton>
                            <FormButton className={"btn btn-small btn-warning mr-1"} type={"cancelWithEmail"}>Zrusit a odeslat email</FormButton>
                        </div>
                    </div>
                </Form>
            }
        </Wrapper>
    }

}

interface PasscodeState {
    passcode?:string
}

class PasscodeResult {
    value:boolean = false;
    passcode:string = "";
}
export class StorageForm extends React.Component<any, PasscodeState> {

    state:PasscodeState = {passcode:null};

    passCodeResult = (result:FormHttpResponse<PasscodeResult>) => {
        if(result.data.value) {
            this.setState({passcode:result.data.passcode})
        }
    };

    render() {
        return <section className="best-selling-products-area mb-70" >
            <div className="container p-5" style={{paddingTop:20}}>
                {
                    this.state.passcode&&<AccessedForm passcode={this.state.passcode}/>||(
                        <Form<PasscodeResult> data={new PasscodeResult()} url={"storage/passcode"} onResult={this.passCodeResult} inputGroupEnabled={false} simpleLabel={true}>
                            <FormField name={"passcode"} title={"Heslo"} type={"password"} />
                            <FormButton className={"btn btn-small btn-primary"}>Odemknout</FormButton>
                        </Form>
                    )
                }
            </div>
        </section>;
    }

}