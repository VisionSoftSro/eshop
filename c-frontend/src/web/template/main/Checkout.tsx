import React, {ChangeEvent} from "react";
import Wrapper from "../../../common/component/Wrapper";
import {Link} from '../../../common/component/Link';
import {SwitchCase, SwitchPage} from "../../../common/component/SwitchPage";
import cs from 'classnames';
import {connect, Provider} from "react-redux";
import {reduceStateToPlainObject} from "../../../common/redux/Reducers";
import {CheckoutAction, CheckoutActionType, CheckoutState} from "../../redux/reducers/cart/CheckoutReducer";
import {cartStore, checkoutStore, dataStore, methodsStore} from "../../redux/WebRedux";
import {Form, FormField, FormInputType} from "../../../common/component/form/Form";
import {CheckoutDto} from "../../dto/CheckoutDto";
import {CartGoods, Category, GoodsDto, Price} from "../../dto/GoodsDto";

import {productImageUrl} from "../../TemplateUtil";
import {httpEndpoint} from "../../../common/utils/HttpUtils";
import {jsonToFormData} from "../../../common/utils/Util";
import {PaymentMethodDto, ShippingMethodDto} from "../../dto/Methods";
import {MethodsState} from "../../redux/reducers/cart/MethodsReducer";
import {JsonProperty} from "../../../common/utils/ObjectMapper";
import {CartAction, CartActionType, CartState} from "../../redux/reducers/cart/CartReducer";
import {Modal, ModalBody} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as faIcon from "@fortawesome/free-solid-svg-icons";
import ModalHeader from "react-bootstrap/ModalHeader";
import {Quantity} from "../Quantity";
import {booleanComparator, Loader} from "../../../common/component/Loader";

class Complete extends React.Component {

    complete() {

    }

    render() {
        return <div className="checkout_area section_padding_100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="order_complated_area clearfix">
                            <h5>Děkujeme za objednávku.</h5>
                            <p>O dalším postupu budete informováni emailem.</p>
                            <p className="orderid mb-0">Číslo objednávky: {checkoutStore.getState().orderNumber}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

class CheckoutResult {

    orderNumber: number;

    success: boolean;

    @JsonProperty({strict: {isArray: true}, clazz: GoodsDto})
    outOfStock: Array<GoodsDto>;
}

class FormDtoCart {
    goods: number;
    pcs: number;

    constructor(goods: number, pcs: number) {
        this.goods = goods;
        this.pcs = pcs;
    }
}

class FormDto extends CheckoutDto {
    goods: Array<FormDtoCart>;
}
type ReviewState = { result?: CheckoutResult, error?:boolean, canFinish?:boolean, loading?:boolean}
class Review extends React.Component<any, ReviewState> {

    state: ReviewState = {result: null, error:false, canFinish:false, loading:false};

    next = async () => {
        this.setState({loading:true});
        const checkout = checkoutStore.getState().checkout;
        const cart = cartStore.getState().cart;
        const form = new FormDto();
        form.goods = cart.map(i => new FormDtoCart(i.goods.id, i.pcs));
        const json = {...form, ...checkout};

        const result = await httpEndpoint<CheckoutResult>(CheckoutResult, "checkout", true, {
            body: jsonToFormData(json, (field) => {
                //convert object to id for spring and jpa support
                if (typeof field === 'object' && field.id !== undefined) {
                    return field.id;
                }
                return field;
            }),
            method: "POST",

        });
        let data = result.data;
        if(!data) {
            this.setState({error: true, loading:false});
        } else if (data.success) {
            checkoutStore.dispatch<CheckoutAction>({type: CheckoutActionType.Finish, orderNumber:data.orderNumber});
            cartStore.dispatch<CartAction>({type: CartActionType.ClearCart});
        } else {
            this.setState({result: data, loading:false});
        }
    };

    render() {
        const checkout = checkoutStore.getState().checkout;
        const cart = cartStore.getState().cart;
        const cartPrice = cart.map(a => a.pcs * a.goods.price).reduce((a, b) => a + b);
        const shippingPrice = checkout.shippingMethod.price;
        const paymentPrice = checkout.paymentMethod.price || 0;
        return (
            <Loader comparator={booleanComparator} value={!this.state.loading}>
                {(loader)=>(
                    loader&&(
                        <div className="checkout_area section_padding_100" style={{textAlign:"center"}}>
                            <div className="container">
                                {loader}
                                <h3 style={{marginTop:10}}>Vydržte. Pracuje se na tom.</h3>
                            </div>
                        </div>
                    )||(
                        <div className="checkout_area section_padding_100">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="checkout_details_area clearfix">
                                            <h5 className="mb-30">{Strings["ReviewOrder"]}</h5>
                                            <div className="cart-table">
                                                {this.state.error&&(
                                                    <Modal show={true} onHide={() => this.setState({error: false})}>
                                                        <ModalHeader closeButton>
                                                            Je nám líto :(
                                                        </ModalHeader>
                                                        <ModalBody>
                                                            <p>Bohužel nastala chyba na straně serveru. Zkuste to prosím později. Pokud problém přetrvává obraťte se prosím na podporu.</p>
                                                        </ModalBody>
                                                    </Modal>
                                                )}
                                                {this.state.result && this.state.result.outOfStock.length > 0 && (
                                                    <Modal show={true} onHide={() => this.setState({result: null})} size={"lg"}>
                                                        <ModalHeader closeButton>
                                                            Je nám líto :(
                                                        </ModalHeader>
                                                        <ModalBody>
                                                            <p>Bohužel následující zboží již na skladě nemáme. Upravte prosím objednávku
                                                                dle dostupnosti skladu.</p>
                                                            <div className="table-responsive">
                                                                <table className="table table-bordered mb-30">
                                                                    <thead>
                                                                    <tr>
                                                                        <td>Náhled</td>
                                                                        <td>Název produktu</td>
                                                                        <td>Na skladě</td>
                                                                        <td>Nový počet</td>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {cart.filter(i=>this.state.result.outOfStock.map(a=>a.id).includes(i.goods.id)).map(e=>({cart:e, outOfStock:this.state.result.outOfStock.filter(a=>a.id===e.goods.id)[0]})).map(i => (
                                                                        <tr key={i.cart.goods.id}>
                                                                            <td>
                                                                                <img width={50} src={productImageUrl(i.cart.goods.code, 1)} alt="Product"/>
                                                                            </td>
                                                                            <td>
                                                                                {i.cart.goods.name}
                                                                            </td>
                                                                            <td>
                                                                                {i.outOfStock.stock} ks
                                                                            </td>
                                                                            <td>
                                                                                <Quantity max={i.outOfStock.stock} pcs={i.cart.pcs} setQuantity={value=>{
                                                                                    cartStore.dispatch<CartAction>({type: CartActionType.ChangeCart, item:i.cart, changePcs:value});
                                                                                }}/>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </ModalBody>
                                                    </Modal>
                                                )}
                                                <div className="table-responsive">
                                                    <table className="table table-bordered mb-30">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col"/>
                                                            <th scope="col">Náhled</th>
                                                            <th scope="col">Název produktu</th>
                                                            <th scope="col">Cena za kus</th>
                                                            <th scope="col" style={{width:30}}>Počet</th>
                                                            <th scope="col">Celkem</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {cart.map(i => (
                                                            <tr key={i.goods.id}>
                                                                <td>
                                                                    <Link href={()=>cartStore.dispatch<CartAction>({type: CartActionType.RemoveCart, item:i})}><FontAwesomeIcon icon={faIcon.faTimes} style={{color:"red"}} /></Link>
                                                                </td>
                                                                <td>
                                                                    <img src={productImageUrl(i.goods.code, 1)} alt="Product"/>
                                                                </td>
                                                                <td>
                                                                    {/*<a href="#">Bluetooth Speaker</a>*/}
                                                                    {i.goods.name}
                                                                </td>
                                                                <td>{i.goods.getPrice().format()}</td>
                                                                <td>
                                                                    <Quantity max={i.goods.stock} pcs={i.pcs} setQuantity={value=>{
                                                                        cartStore.dispatch<CartAction>({type: CartActionType.ChangeCart, item:i, changePcs:value});
                                                                    }}/>
                                                                </td>
                                                                <td>{new Price(i.goods.price * i.pcs, 'CZK').format()}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 col-lg-7 ml-auto">
                                        <div className="cart-total-area">
                                            <h5 className="mb-3">Obsah nákupního košíku</h5>
                                            <div className="table-responsive">
                                                <table className="table mb-0">
                                                    <tbody>
                                                    <tr>
                                                        <td>Zboží</td>
                                                        <td>{new Price(cartPrice, 'CZK').format()}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Doprava</td>
                                                        <td>{new Price(shippingPrice, 'CZK').format()}</td>
                                                    </tr>
                                                    {
                                                        paymentPrice>0&&(
                                                            <tr>
                                                                <td>{Strings[`PaymentsTexts.${checkout.paymentMethod.code}.name`]}</td>
                                                                <td>{new Price(paymentPrice, 'CZK').format()}</td>
                                                            </tr>
                                                        )
                                                    }
                                                    <tr>
                                                        <td style={{fontSize:"large"}}>Celkem</td>
                                                        <td style={{fontSize:"large"}}> {new Price(shippingPrice + cartPrice + paymentPrice, 'CZK').format()}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="cart-total-area">
                                                <div className="form-check">
                                                    <div className="custom-control custom-checkbox mb-3 pl-1">
                                                        <input type="checkbox" className="custom-control-input" id="customChe" onChange={e=>this.setState({canFinish:e.target.checked})}/>
                                                        <label className="custom-control-label" htmlFor="customChe">Souhlasím s <Link history={false} target={"_blank"} href={"/static/pdf/VOP.a.OOU.-.final.pdf"}>ochranou osobních údajů a obchodními podmínkami</Link></label>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="checkout_pagination d-flex justify-content-end mt-3">
                                                <Link href={() => checkoutStore.dispatch<CheckoutAction>({
                                                    type: CheckoutActionType.SetStep,
                                                    step: 2
                                                })} className="btn bigshop-btn mt-2 ml-2">{Strings["Back"]}</Link>
                                                <Link href={()=>this.state.canFinish&&this.next()} className={cs("btn bigshop-btn mt-2 ml-2", !this.state.canFinish&&"disabled")}>Dokončit</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </Loader>
        );
    }
}
const CartReviewRedux = connect((state:CartState)=>reduceStateToPlainObject(state))(Review);

type ContinueState = {canContinue:boolean};

class Payment extends React.Component<MethodsState, ContinueState> {

    state:ContinueState = {canContinue:checkoutStore.getState().checkout.paymentMethod !== null};


    next = () => {
        if (checkoutStore.getState().checkout.paymentMethod !== null) {
            checkoutStore.dispatch<CheckoutAction>({type: CheckoutActionType.SetStep, step: 3});
        }
    };

    updateMethod(paymentMethod: PaymentMethodDto) {
        const checkout = checkoutStore.getState().checkout;
        checkout.paymentMethod = paymentMethod;
        checkoutStore.dispatch<CheckoutAction>({type: CheckoutActionType.UpdateData, checkout: checkout});
        this.setState({canContinue:true})
    }

    render() {
        const checkout = checkoutStore.getState().checkout;
        return <div className="checkout_area section_padding_100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="checkout_details_area clearfix">
                            <h5 className="mb-4">{Strings["PaymentMethod"]}</h5>

                            <div className="shipping_method">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Způsob</th>
                                                <th scope="col">Popis</th>
                                                <th scope="col">Vyberte</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.props.payment.map((i) => (
                                            <tr key={i.id}>
                                                <th scope="row">{Strings[`PaymentsTexts.${i.code}.name`]}{i.price&&` ( ${new Price(i.price, 'CZK').format()} )`}</th>
                                                <td>{Strings[`PaymentsTexts.${i.code}.description`]}</td>
                                                <td>
                                                    <div className="custom-control custom-radio">
                                                        <input
                                                            defaultChecked={checkout.paymentMethod && checkout.paymentMethod.id === i.id}
                                                            type="radio" id={`customRadio${i.id}`} name="paymentMethod"
                                                            className="custom-control-input"
                                                            onChange={() => this.updateMethod(i)}/>
                                                        <label className="custom-control-label"
                                                               htmlFor={`customRadio${i.id}`}/>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="checkout_pagination mt-3 d-flex justify-content-end clearfix">
                            <Link href={() => checkoutStore.dispatch<CheckoutAction>({
                                type: CheckoutActionType.SetStep,
                                step: 1
                            })} className="btn bigshop-btn mt-2 ml-2">{Strings["Back"]}</Link>
                            <Link href={()=>this.state.canContinue&&this.next()} className={cs("btn bigshop-btn mt-2 ml-2", !this.state.canContinue&&"disabled")}>{Strings["Continue"]}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
const PaymentRedux = connect((state: MethodsState) => reduceStateToPlainObject(state))(Payment);

class Shipping extends React.Component<MethodsState, ContinueState> {
    state:ContinueState = {canContinue:checkoutStore.getState().checkout.shippingMethod !== null};
    next = () => {
        if (checkoutStore.getState().checkout.shippingMethod !== null) {
            checkoutStore.dispatch<CheckoutAction>({type: CheckoutActionType.SetStep, step: 2});
        }
    };


    updateMethod(shippingMethod: ShippingMethodDto) {
        const checkout = checkoutStore.getState().checkout;
        checkout.shippingMethod = shippingMethod;
        checkoutStore.dispatch<CheckoutAction>({type: CheckoutActionType.UpdateData, checkout: checkout})
        this.setState({canContinue:true})
    }

    render() {
        const checkout = checkoutStore.getState().checkout;
        return <div className="checkout_area section_padding_100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="checkout_details_area clearfix">
                            <h5 className="mb-4">{Strings["ShippingMethod"]}</h5>

                            <div className="shipping_method">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th scope="col">Způsob</th>
                                            <th scope="col">Cena</th>
                                            <th scope="col">Vyberte</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.props.shipping.map((i) => (
                                            <tr key={i.id}>
                                                <th scope="row">{Strings[`ShippingTexts.${i.code}.name`]}</th>
                                                <td>{new Price(i.price, 'CZK').format()}</td>
                                                <td>
                                                    <div className="custom-control custom-radio">
                                                        <input
                                                            defaultChecked={checkout.shippingMethod && checkout.shippingMethod.id === i.id}
                                                            type="radio" id={`customRadio${i.id}`} name="shippingMethod"
                                                            className="custom-control-input"
                                                            onChange={() => this.updateMethod(i)}/>
                                                        <label className="custom-control-label"
                                                               htmlFor={`customRadio${i.id}`}/>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="checkout_pagination mt-3 d-flex justify-content-end clearfix">
                            {/*<a href="checkout-2.html" className="btn bigshop-btn mt-2 ml-2">Go Back</a>*/}
                            <Link href={() => checkoutStore.dispatch<CheckoutAction>({
                                type: CheckoutActionType.SetStep,
                                step: 0
                            })} className="btn bigshop-btn mt-2 ml-2">{Strings["Back"]}</Link>
                            <Link href={()=>this.state.canContinue&&this.next()} className={cs("btn bigshop-btn mt-2 ml-2", !this.state.canContinue&&"disabled")}>{Strings["Continue"]}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
const ShippingRedux = connect((state: MethodsState) => reduceStateToPlainObject(state))(Shipping);


class Billing extends React.Component<{}, ContinueState> {
    state:ContinueState = {canContinue:false};
    form: Form<CheckoutDto> = null;
    next = () => {
        if (this.form.validate()) {
            checkoutStore.dispatch<CheckoutAction>({
                type: CheckoutActionType.Update,
                step: 1,
                checkout: checkoutStore.getState().checkout
            });
        }
    };

    componentDidMount(): void {
        this.setState({canContinue: this.form.validate()})
    }


    render() {
        return <div className="checkout_area section_padding_100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="checkout_details_area clearfix">
                            <h5 className="mb-4">{Strings["BillDetails"]}</h5>
                            <Form<CheckoutDto> data={checkoutStore.getState().checkout} simpleLabel
                                               inputGroupEnabled={false} ref={o => this.form = o} onChange={(form)=>this.setState({canContinue: form.validate()})}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <FormField type={FormInputType.Text} name={"firstName"}
                                                   title={Strings["FirstName"]} required/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <FormField type={FormInputType.Text} name={"lastName"}
                                                   title={Strings["LastName"]} required/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <FormField type={FormInputType.Text} name={"emailAddress"}
                                                   title={Strings["EmailAddress"]} required/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <FormField type={FormInputType.Text} name={"phoneNumber"}
                                                   title={Strings["PhoneNumber"]}/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <FormField type={FormInputType.Text} name={"street"} title={Strings["Street"]}
                                                   required/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <FormField type={FormInputType.Text} name={"streetNo"}
                                                   title={Strings["StreetNo"]} required/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <FormField type={FormInputType.Text} name={"city"} title={Strings["City"]}
                                                   required/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <FormField type={FormInputType.Number} name={"postCode"}
                                                   title={Strings["PostCode"]} required/>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="checkout_pagination d-flex justify-content-end mt-50">
                            {/*<Link href={this.next} className="btn bigshop-btn mt-2 ml-2">{Strings["Back"]}</Link>*/}
                            <Link href={()=>this.state.canContinue&&this.next()} className={cs("btn bigshop-btn mt-2 ml-2", !this.state.canContinue&&"disabled")}>{Strings["Continue"]}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

interface Step {
    name: string
}

class Checkout extends React.Component<CheckoutState> {

    steps: Array<Step> = [{name: "Billing"}, {name: "Shipping"}, {name: "Payment"}, {name: "Review"}];



    render() {
        return !this.props.finished&&(
            <Wrapper>
                <div className="checkout_steps_area">
                    {this.steps.map((item, index) => (
                        <Link key={index} className={cs(this.props.step > index && "complated", this.props.step === index && "active")} href={() => { }}>
                            <i className="icofont-check-circled"/> {Strings[item.name]}
                        </Link>
                    ))}
                </div>
                <SwitchPage value={this.props.step} default={0}>
                    <SwitchCase value={0}>
                        <Billing/>
                    </SwitchCase>
                    <SwitchCase value={1}>
                        <Provider store={methodsStore}>
                            <ShippingRedux/>
                        </Provider>
                    </SwitchCase>
                    <SwitchCase value={2}>
                        <Provider store={methodsStore}>
                            <PaymentRedux/>
                        </Provider>
                    </SwitchCase>
                    <SwitchCase value={3}>
                        <Provider store={cartStore}>
                            <CartReviewRedux/>
                        </Provider>
                    </SwitchCase>
                </SwitchPage>
            </Wrapper>
        );
    }
}

const CheckoutRedux = connect((state: CheckoutState) => reduceStateToPlainObject(state))(Checkout);

class CheckoutPage extends React.Component<CartState> {

    componentDidMount(): void {
        window.scrollTo(0, 0);
    }

    render() {
        if(checkoutStore.getState().finished) {
            return <Complete />
        }
        if (this.props.cart.length > 0) {
            return (
                    <Provider store={checkoutStore}>
                           <CheckoutRedux/>
                    </Provider>
            );
        }
        return (
            <div className="checkout_area section_padding_100">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            Košík je prázdný.
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}


export default connect((state: CartState) => reduceStateToPlainObject(state))(CheckoutPage);