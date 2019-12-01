import React from "react";
import Wrapper from "../../../common/component/Wrapper";
import {Link} from '../../../common/component/Link';
import {SwitchCase, SwitchPage} from "../../../common/component/SwitchPage";
import cs from 'classnames';
import {connect} from "react-redux";
import {reduceStateToPlainObject} from "../../../common/redux/Reducers";
import {CheckoutAction, CheckoutActionType, CheckoutState} from "../../redux/reducers/cart/CheckoutReducer";
import {cartStore, checkoutStore} from "../../redux/WebRedux";
import {Form, FormField, FormInputType} from "../../../common/component/form/Form";
import {CheckoutDto, PaymentMethod, ShippingMethod} from "../../dto/CheckoutDto";
import {Price} from "../../dto/GoodsDto";
import {productImageUrl} from "../../TemplateUtil";
import {httpEndpoint} from "../../../common/utils/HttpUtils";
import {jsonToFormData} from "../../../common/utils/Util";


class Complete extends React.Component {

    next = () =>{

    };

    render() {
        return <div className="checkout_area section_padding_100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="order_complated_area clearfix">
                            <h5>Thank You For Your Order.</h5>
                            <p>You will receive an email of your order details</p>
                            <p className="orderid mb-0">Your Order id #2258396</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

class CheckoutResult {
    orderNumber:number;
}

class FormDtoCart {
    goods:number;
    pcs:number;

    constructor(goods: number, pcs: number) {
        this.goods = goods;
        this.pcs = pcs;
    }
}
class FormDto extends CheckoutDto {
    goods:Array<FormDtoCart>;
}

class Review extends React.Component {
    next = async () =>{

        const checkout = checkoutStore.getState().checkout;
        const cart = cartStore.getState().cart;
        const form = new FormDto();
        form.goods = cart.map(i=>new FormDtoCart(i.goods.id, i.pcs));
        const json = {...form, ...checkout};

        const result = await httpEndpoint<CheckoutResult>(CheckoutResult, "checkout", false, {
            body:jsonToFormData(json, (field)=>{
                //convert object to id for spring and jpa support
                if(typeof field === 'object' && field.id !== undefined) {
                    return field.id;
                }
                return field;
            }),
            method:"POST",

        });
        console.log(result);
        //checkoutStore.dispatch<CheckoutAction>({type:CheckoutActionType.Update, step:4})
    };
    render() {
        const checkout = checkoutStore.getState().checkout;
        const cart = cartStore.getState().cart;
        const cartPrice = cart.map(a=>a.pcs * a.goods.price).reduce((a,b)=>a+b);
        const shippingPrice = checkout.shippingMethod.price;
        return <div className="checkout_area section_padding_100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="checkout_details_area clearfix">
                            <h5 className="mb-30">{Strings["ReviewOrder"]}</h5>

                            <div className="cart-table">
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
                                            {cart.map(i=>(
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
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-7 ml-auto">
                        <div className="cart-total-area">
                            <h5 className="mb-3">Sumarizace</h5>
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
                                    <tr>
                                        <td>Celkem</td>
                                        <td>{new Price(shippingPrice + cartPrice, 'CZK').format()}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="checkout_pagination d-flex justify-content-end mt-3">
                                <Link href={()=>checkoutStore.dispatch<CheckoutAction>({type:CheckoutActionType.SetStep, step:2})} className="btn bigshop-btn mt-2 ml-2">{Strings["Back"]}</Link>
                                <Link href={this.next} className="btn bigshop-btn mt-2 ml-2">Dokončit</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
class Payment extends React.Component {

    next = () =>{
        if(checkoutStore.getState().checkout.paymentMethod !== null) {
            checkoutStore.dispatch<CheckoutAction>({type:CheckoutActionType.SetStep, step:3});
        }
    };

    paymentMethods:Array<PaymentMethod> = [
        {id:1, name:"Bankovní převod", description:"Na konci obejdnávky obdržíte instrukce."},
        {id:2, name:"Na dobírku", description:"Zboží zaplatíte při předání."}
    ];

    updateMethod(paymentMethod:PaymentMethod) {
        const checkout = checkoutStore.getState().checkout;
        checkout.paymentMethod = paymentMethod;
        checkoutStore.dispatch<CheckoutAction>({type:CheckoutActionType.UpdateData, checkout:checkout})
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
                                            <th scope="col">Popis</th>
                                            <th scope="col">Vyberte</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.paymentMethods.map((i) => (
                                            <tr key={i.id}>
                                                <th scope="row">{i.name}</th>
                                                <td>{i.description}</td>
                                                <td>
                                                    <div className="custom-control custom-radio">
                                                        <input defaultChecked={checkout.paymentMethod&&checkout.paymentMethod.id === i.id} type="radio" id={`customRadio${i.id}`} name="paymentMethod"
                                                               className="custom-control-input" onChange={()=>this.updateMethod(i)}/>
                                                        <label className="custom-control-label" htmlFor={`customRadio${i.id}`}/>
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
                            <Link href={()=>checkoutStore.dispatch<CheckoutAction>({type:CheckoutActionType.SetStep, step:1})} className="btn bigshop-btn mt-2 ml-2">{Strings["Back"]}</Link>
                            <Link href={this.next} className="btn bigshop-btn mt-2 ml-2">{Strings["Continue"]}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}


class Shipping extends React.Component {
    next = () =>{
        if(checkoutStore.getState().checkout.shippingMethod !== null) {
            checkoutStore.dispatch<CheckoutAction>({type:CheckoutActionType.SetStep, step:2});
        }
    };

    shippingMethods:Array<ShippingMethod> = [
        {id:1, name:"Česká pošta - Balík do ruky", deliveryTime: "1-5 dní", price: 130},
        {id:2, name:"Česká pošta - Balík na poštu", deliveryTime: "1-5 dní", price: 130}
    ];

    updateMethod(shippingMethod:ShippingMethod) {
        const checkout = checkoutStore.getState().checkout;
        checkout.shippingMethod = shippingMethod;
        checkoutStore.dispatch<CheckoutAction>({type:CheckoutActionType.UpdateData, checkout:checkout})
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
                                            <th scope="col">Čas dodání</th>
                                            <th scope="col">Cena</th>
                                            <th scope="col">Vyberte</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.shippingMethods.map((i) => (
                                            <tr key={i.id}>
                                                <th scope="row">{i.name}</th>
                                                <td>{i.deliveryTime}</td>
                                                <td>{new Price(i.price, 'CZK').format()}</td>
                                                <td>
                                                    <div className="custom-control custom-radio">
                                                        <input defaultChecked={checkout.shippingMethod&&checkout.shippingMethod.id === i.id} type="radio" id={`customRadio${i.id}`} name="shippingMethod"
                                                               className="custom-control-input" onChange={()=>this.updateMethod(i)}/>
                                                        <label className="custom-control-label" htmlFor={`customRadio${i.id}`}/>
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
                            <Link href={()=>checkoutStore.dispatch<CheckoutAction>({type:CheckoutActionType.SetStep, step:0})} className="btn bigshop-btn mt-2 ml-2">{Strings["Back"]}</Link>
                            <Link href={this.next} className="btn bigshop-btn mt-2 ml-2">{Strings["Continue"]}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
class Billing extends React.Component {

    form:Form<CheckoutDto> = null;
    next = () =>{
        if(this.form.validate() || true) {
            checkoutStore.dispatch<CheckoutAction>({type:CheckoutActionType.Update, step:1, checkout:checkoutStore.getState().checkout});
        }
    };


    render() {
        return <div className="checkout_area section_padding_100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="checkout_details_area clearfix">
                            <h5 className="mb-4">{Strings["BillDetails"]}</h5>
                            <Form<CheckoutDto> data={checkoutStore.getState().checkout} simpleLabel inputGroupEnabled={false} ref={o=>this.form = o}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <FormField type={FormInputType.Text} name={"firstName"} title={Strings["FirstName"]} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <FormField type={FormInputType.Text} name={"lastName"} title={Strings["LastName"]} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <FormField type={FormInputType.Text} name={"emailAddress"} title={Strings["EmailAddress"]} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <FormField type={FormInputType.Text} name={"phoneNumber"} title={Strings["PhoneNumber"]} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <FormField type={FormInputType.Text} name={"street"} title={Strings["Street"]} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <FormField type={FormInputType.Text} name={"streetNo"} title={Strings["StreetNo"]} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <FormField type={FormInputType.Text} name={"city"} title={Strings["City"]} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <FormField type={FormInputType.Number} name={"postCode"} title={Strings["PostCode"]} required />
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="checkout_pagination d-flex justify-content-end mt-50">
                            {/*<Link href={this.next} className="btn bigshop-btn mt-2 ml-2">{Strings["Back"]}</Link>*/}
                            <Link href={this.next} className="btn bigshop-btn mt-2 ml-2">{Strings["Continue"]}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

interface Step {
    name:string
}

class Checkout extends React.Component<CheckoutState> {

    steps:Array<Step> = [{name:"Billing"}, {name:"Shipping"}, {name:"Payment"}, {name:"Review"}];

    componentDidMount(): void {
        window.scrollTo(0, 0);
    }

    render() {
        return <Wrapper>
            <div className="checkout_steps_area">
                {this.steps.map((item, index)=><Link key={index} className={cs(this.props.step>index&&"complated", this.props.step===index&&"active")} href={()=>{}}><i className="icofont-check-circled"/> {Strings[item.name]}</Link>)}
            </div>
            <SwitchPage value={this.props.step} default={0}>
                <SwitchCase value={0}>
                    <Billing />
                </SwitchCase>
                <SwitchCase value={1}>
                    <Shipping />
                </SwitchCase>
                <SwitchCase value={2}>
                    <Payment />
                </SwitchCase>
                <SwitchCase value={3}>
                    <Review />
                </SwitchCase>
                <SwitchCase value={4}>
                    <Complete />
                </SwitchCase>
            </SwitchPage>
        </Wrapper>;
    }
}

export default connect((state:CheckoutState) => reduceStateToPlainObject(state))(Checkout);