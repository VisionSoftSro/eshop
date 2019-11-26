import React from "react";
import Wrapper from "../../../common/component/Wrapper";
import { Link } from '../../../common/component/Link';
import {SwitchCase, SwitchPage} from "../../../common/component/SwitchPage";
import cs from 'classnames';

interface CheckoutPartProps {
    next:()=>void
}


class Complete extends React.Component {
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

class Review extends React.Component<CheckoutPartProps> {
    render() {
        return <div className="checkout_area section_padding_100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="checkout_details_area clearfix">
                            <h5 className="mb-30">Review Your Order</h5>

                            <div className="cart-table">
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-30">
                                        <thead>
                                        <tr>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Product</th>
                                            <th scope="col">Unit Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th scope="row">
                                                <a href="#" className="btn edit-btn"><i className="icofont-ui-edit"></i></a>
                                            </th>
                                            <td>
                                                <img src="img/product-img/onsale-1.png" alt="Product"/>
                                            </td>
                                            <td>
                                                <a href="#">Bluetooth Speaker</a>
                                            </td>
                                            <td>$9</td>
                                            <td>
                                                {/*<div className="quantity">*/}
                                                {/*    <span className="qty-minus"*/}
                                                {/*          onClick="var effect = document.getElementById('qty2'); var qty = effect.value; if( !isNaN( qty ) &amp;&amp; qty &gt; 1 ) effect.value--;return false;"><i*/}
                                                {/*        className="fa fa-minus" aria-hidden="true"></i></span>*/}
                                                {/*    <input type="number" className="qty-text" id="qty2" step="1" min="1"*/}
                                                {/*           max="99" name="quantity" value="1">*/}
                                                {/*        <span className="qty-plus"*/}
                                                {/*              onClick="var effect = document.getElementById('qty2'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;"><i*/}
                                                {/*            className="fa fa-plus" aria-hidden="true"></i></span>*/}
                                                {/*</div>*/}
                                            </td>
                                            <td>$9</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-7 ml-auto">
                        <div className="cart-total-area">
                            <h5 className="mb-3">Cart Totals</h5>
                            <div className="table-responsive">
                                <table className="table mb-0">
                                    <tbody>
                                    <tr>
                                        <td>Sub Total</td>
                                        <td>$56.00</td>
                                    </tr>
                                    <tr>
                                        <td>Shipping</td>
                                        <td>$10.00</td>
                                    </tr>
                                    <tr>
                                        <td>VAT (10%)</td>
                                        <td>$5.60</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>$71.60</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="checkout_pagination d-flex justify-content-end mt-3">
                                {/*<a href="checkout-4.html" className="btn bigshop-btn mt-2 ml-2 d-none d-sm-inline-block">Go Back</a>*/}
                                <Link href={this.props.next} className="btn bigshop-btn mt-2 ml-2">Confirm</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
class Payment extends React.Component<CheckoutPartProps> {
    render() {
        return <div className="checkout_area section_padding_100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="checkout_details_area clearfix">
                            <div className="payment_method">
                                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                    <div className="panel panel-default">
                                        <div className="panel-heading" role="tab" id="one">
                                            <h6 className="panel-title">
                                                <a className="collapsed" role="button" data-toggle="collapse"
                                                   data-parent="#accordion" href="#collapse_one" aria-expanded="false"
                                                   aria-controls="collapse_one"><i
                                                    className="icofont-mastercard-alt"></i> Pay with Credit Card</a>
                                            </h6>
                                        </div>
                                        <div aria-expanded="false" id="collapse_one"
                                             className="panel-collapse collapse show" role="tabpanel"
                                             aria-labelledby="one">
                                            <div className="panel-body">
                                                <div className="pay_with_creadit_card">
                                                    <form action="#" method="post">
                                                        <div className="row">
                                                            <div className="col-12 col-md-6 mb-3">
                                                                <div className="custom-control custom-checkbox">
                                                                    <input type="checkbox"
                                                                           className="custom-control-input"
                                                                           id="customCheck1"/>
                                                                        <label className="custom-control-label"
                                                                               htmlFor="customCheck1">Credit or Debit
                                                                            Card</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-md-6 mb-3">
                                                                <div className="accept_payment text-right"></div>
                                                            </div>
                                                            <div className="col-12 col-md-6 mb-3">
                                                                <label htmlFor="cardNumber">Card Number</label>
                                                                <input type="text" className="form-control"
                                                                       id="cardNumber" placeholder="" value="" required/>
                                                                    <small id="card_info_store"
                                                                           className="form-text text-muted"><i
                                                                        className="fa fa-lock"
                                                                        aria-hidden="true"></i> Your payment info is
                                                                        stored securely. <a href="#">Learn
                                                                            More</a></small>
                                                            </div>
                                                            <div className="col-12 col-md-3 mb-3">
                                                                <label htmlFor="expiration">Expiration</label>
                                                                <input type="text" className="form-control"
                                                                       id="expiration" placeholder="MM / YY" value=""
                                                                       required/>
                                                            </div>
                                                            <div className="col-12 col-md-3 mb-3">
                                                                <label htmlFor="security_code">Security Code <a href="#"
                                                                                                                className="btn security_code_popover"
                                                                                                                data-container="body"
                                                                                                                data-toggle="popover"
                                                                                                                data-placement="top"
                                                                                                                data-content=""
                                                                                                                data-img="img/bg-img/cvc.jpg">
                                                                    <i className="fa fa-question-circle"
                                                                       aria-hidden="true"></i></a></label>
                                                                <input type="text" className="form-control"
                                                                       id="security_code" placeholder="" value=""
                                                                       required/>
                                                            </div>
                                                            <div className="col-12 col-md-3 ml-md-auto">
                                                                <button type="submit"
                                                                        className="btn btn-success w-100">Submit
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="panel panel-default">
                                        <div className="panel-heading" role="tab" id="two">
                                            <h6 className="panel-title">
                                                <a className="collapsed" role="button" data-toggle="collapse"
                                                   data-parent="#accordion" href="#collapse_two" aria-expanded="false"
                                                   aria-controls="collapse_two"><i
                                                    className="icofont-paypal-alt"></i> Pay with PayPal</a>
                                            </h6>
                                        </div>
                                        <div aria-expanded="false" id="collapse_two" className="panel-collapse collapse"
                                             role="tabpanel" aria-labelledby="two">
                                            <div className="panel-body">
                                                <div className="pay_with_paypal">
                                                    <form action="#" method="post">
                                                        <div className="row">
                                                            <div className="col-12 col-md-6 mb-3">
                                                                <label htmlFor="paypalemailaddress">Email
                                                                    Address</label>
                                                                <input type="email" className="form-control"
                                                                       id="paypalemailaddress" placeholder="" value=""
                                                                       required/>
                                                                    <small id="paypal_info"
                                                                           className="form-text text-muted"><i
                                                                        className="fa fa-lock"
                                                                        aria-hidden="true"></i> Secure online payments
                                                                        at the speed of want. <a href="#">Learn More</a></small>
                                                            </div>
                                                            <div className="col-12 col-md-6 mb-3">
                                                                <label htmlFor="paypalpassword">Password</label>
                                                                <input type="password" className="form-control"
                                                                       id="paypalpassword" value="" required/>
                                                                    <small id="paypal_password"
                                                                           className="form-text text-muted"><a href="#">Forget
                                                                        Password?</a></small>
                                                            </div>
                                                            <div className="col-12 col-md-3 ml-md-auto">
                                                                <button type="submit"
                                                                        className="btn btn-success w-100">Submit
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="panel panel-default">
                                        <div className="panel-heading" role="tab" id="three">
                                            <h6 className="panel-title">
                                                <a className="collapsed" role="button" data-toggle="collapse"
                                                   data-parent="#accordion" href="#collapse_three" aria-expanded="false"
                                                   aria-controls="collapse_three"><i
                                                    className="icofont-bank-transfer-alt"></i> Direct Bank Transfer</a>
                                            </h6>
                                        </div>
                                        <div aria-expanded="false" id="collapse_three"
                                             className="panel-collapse collapse in" role="tabpanel"
                                             aria-labelledby="three">
                                            <div className="panel-body">
                                                <p>Make your payment directly into our bank account. Please use your
                                                    Order ID as the payment reference. Your order won’t be shipped until
                                                    the funds have cleared in our account.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="panel panel-default">
                                        <div className="panel-heading" role="tab" id="four">
                                            <h6 className="panel-title">
                                                <a className="collapsed" role="button" data-toggle="collapse"
                                                   data-parent="#accordion" href="#collapse_four" aria-expanded="false"
                                                   aria-controls="collapse_four"><i
                                                    className="icofont-file-document"></i> Cheque Payment
                                                </a>
                                            </h6>
                                        </div>
                                        <div aria-expanded="false" id="collapse_four"
                                             className="panel-collapse collapse" role="tabpanel" aria-labelledby="four">
                                            <div className="panel-body">
                                                <p>Please send your cheque to Store Name, Store Street, Store Town,
                                                    Store State / County, Store Postcode.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="panel panel-default">
                                        <div className="panel-heading" role="tab" id="five">
                                            <h6 className="panel-title">
                                                <a className="collapsed" role="button" data-toggle="collapse"
                                                   data-parent="#accordion" href="#collapse_five" aria-expanded="false"
                                                   aria-controls="collapse_five"><i
                                                    className="icofont-cash-on-delivery-alt"></i> Cash on Delivery
                                                </a>
                                            </h6>
                                        </div>
                                        <div aria-expanded="false" id="collapse_five"
                                             className="panel-collapse collapse" role="tabpanel" aria-labelledby="five">
                                            <div className="panel-body">
                                                <p>Please send your cheque to Store Name, Store Street, Store Town,
                                                    Store State / County, Store Postcode.</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="checkout_pagination d-flex justify-content-end mt-30">
                            {/*<a href="checkout-2.html" className="btn bigshop-btn mt-2 ml-2">Go Back</a>*/}
                            <Link href={this.props.next} className="btn bigshop-btn mt-2 ml-2">Continue</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}
class Shipping extends React.Component<CheckoutPartProps> {
    render() {
        return <div className="checkout_area section_padding_100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="checkout_details_area clearfix">
                            <h5 className="mb-4">Shipping Method</h5>

                            <div className="shipping_method">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th scope="col">Method</th>
                                            <th scope="col">Delivery Time</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Choose</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th scope="row">Courier</th>
                                            <td>1-2 Business Day</td>
                                            <td>$9.99</td>
                                            <td>
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" id="customRadio1" name="customRadio"
                                                           className="custom-control-input"/>
                                                        <label className="custom-control-label"
                                                               htmlFor="customRadio1"></label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Flat Rate</th>
                                            <td>3-4 Day</td>
                                            <td>$3.00</td>
                                            <td>
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" id="customRadio2" name="customRadio"
                                                           className="custom-control-input"/>
                                                        <label className="custom-control-label"
                                                               htmlFor="customRadio2"></label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Free Shipping</th>
                                            <td>1 Week</td>
                                            <td>Free</td>
                                            <td>
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" id="customRadio3" name="customRadio"
                                                           className="custom-control-input"/>
                                                        <label className="custom-control-label"
                                                               htmlFor="customRadio3"></label>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="checkout_pagination mt-3 d-flex justify-content-end clearfix">
                            {/*<a href="checkout-2.html" className="btn bigshop-btn mt-2 ml-2">Go Back</a>*/}
                            <Link href={this.props.next} className="btn bigshop-btn mt-2 ml-2">Continue</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
class Billing extends React.Component<CheckoutPartProps> {
    render() {
        return <div className="checkout_area section_padding_100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="checkout_details_area clearfix">
                            <h5 className="mb-4">Billing Details</h5>
                            <form action="#" method="post">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="first_name">First Name</label>
                                        <input type="text" className="form-control" id="first_name"
                                               placeholder="First Name" value="" required/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="last_name">Last Name</label>
                                        <input type="text" className="form-control" id="last_name"
                                               placeholder="Last Name" value="" required/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="company">Company Name</label>
                                        <input type="text" className="form-control" id="company"
                                               placeholder="Company Name" value=""/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="email_address">Email Address</label>
                                        <input type="email" className="form-control" id="email_address"
                                               placeholder="Email Address" value=""/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="phone_number">Phone Number</label>
                                        <input type="number" className="form-control" id="phone_number" min="0"
                                               value=""/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="country">Country</label>
                                        <select className="custom-select d-block w-100 form-control" id="country">
                                            <option value="usa">United States</option>
                                            <option value="uk">United Kingdom</option>
                                            <option value="ger">Germany</option>
                                            <option value="fra">France</option>
                                            <option value="ind">India</option>
                                            <option value="aus">Australia</option>
                                            <option value="bra">Brazil</option>
                                            <option value="cana">Canada</option>
                                        </select>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="street_address">Street address</label>
                                        <input type="text" className="form-control" id="street_address"
                                               placeholder="Street Address" value=""/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="apartment_suite">Apartment/Suite/Unit</label>
                                        <input type="text" className="form-control" id="apartment_suite"
                                               placeholder="Apartment, suite, unit etc" value=""/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="city">Town/City</label>
                                        <input type="text" className="form-control" id="city" placeholder="Town/City"
                                               value=""/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="state">State</label>
                                        <input type="text" className="form-control" id="state" placeholder="State"
                                               value=""/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="postcode">Postcode/Zip</label>
                                        <input type="text" className="form-control" id="postcode"
                                               placeholder="Postcode / Zip" value=""/>
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="order-notes">Order Notes</label>
                                        <textarea className="form-control" id="order-notes" cols={30} rows={10}
                                                  placeholder="Notes about your order, e.g. special notes for delivery."/>
                                    </div>
                                </div>
                                {/*
                                <div className="different-address mt-50">
                                    <div className="ship-different-title mb-3">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                                <label className="custom-control-label" htmlFor="customCheck1">Ship to a
                                                    different address?</label>
                                        </div>
                                    </div>
                                    <div className="row shipping_input_field">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="first_name">First Name</label>
                                            <input type="text" className="form-control" id="first-name"
                                                   placeholder="First Name" value="" required/>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="last_name">Last Name</label>
                                            <input type="text" className="form-control" id="last-name"
                                                   placeholder="Last Name" value="" required/>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="company">Company Name</label>
                                            <input type="text" className="form-control" id="ship-company"
                                                   placeholder="Company Name" value=""/>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="email_address">Email Address</label>
                                            <input type="email" className="form-control" id="email-address"
                                                   placeholder="Email Address" value=""/>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="phone_number">Phone Number</label>
                                            <input type="number" className="form-control" id="phone-number" min="0"
                                                   value=""/>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="country">Country</label>
                                            <select className="custom-select d-block w-100 form-control"
                                                    id="ship-country">
                                                <option value="usa">United States</option>
                                                <option value="uk">United Kingdom</option>
                                                <option value="ger">Germany</option>
                                                <option value="fra">France</option>
                                                <option value="ind">India</option>
                                                <option value="aus">Australia</option>
                                                <option value="bra">Brazil</option>
                                                <option value="cana">Canada</option>
                                            </select>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="street_address">Street address</label>
                                            <input type="text" className="form-control" id="street-address"
                                                   placeholder="Street Address" value=""/>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="apartment_suite">Apartment/Suite/Unit</label>
                                            <input type="text" className="form-control" id="apartment-suite"
                                                   placeholder="Apartment, suite, unit etc" value=""/>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="city">Town/City</label>
                                            <input type="text" className="form-control" id="ship-city"
                                                   placeholder="Town/City" value=""/>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="state">State</label>
                                            <input type="text" className="form-control" id="ship-state"
                                                   placeholder="State" value=""/>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="postcode">Postcode/Zip</label>
                                            <input type="text" className="form-control" id="ship-postcode"
                                                   placeholder="Postcode / Zip" value=""/>
                                        </div>
                                    </div>
                                </div>*/}
                            </form>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="checkout_pagination d-flex justify-content-end mt-50">
                            {/*<a href="checkout-1.html" className="btn bigshop-btn mt-2 ml-2">Go Back</a>*/}
                            <Link href={this.props.next} className="btn bigshop-btn mt-2 ml-2">Continue</Link>
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

export class Checkout extends React.Component<any, {index:number}> {

    state = {index:0};

    steps:Array<Step> = [{name:"Billing"}, {name:"Shipping"}, {name:"Payment"}, {name:"Review"}];

    next = () => {
        this.setState({index:this.state.index+1})
    };

    finishOrder = () => {
        this.setState({index:this.state.index+1})
    };

    render() {
        return <Wrapper>
            <div className="checkout_steps_area">
                {this.steps.map((item, index)=><Link className={cs(this.state.index>index&&"complated", this.state.index===index&&"active")} href={()=>{}}><i className="icofont-check-circled"/> {item.name}</Link>)}
            </div>
            <SwitchPage value={this.state.index} default={0}>
                <SwitchCase value={0}>
                    <Billing next={this.next}/>
                </SwitchCase>
                <SwitchCase value={1}>
                    <Shipping next={this.next}/>
                </SwitchCase>
                <SwitchCase value={2}>
                    <Payment next={this.next}/>
                </SwitchCase>
                <SwitchCase value={3}>
                    <Review next={this.finishOrder}/>
                </SwitchCase>
                <SwitchCase value={4}>
                    <Complete />
                </SwitchCase>
            </SwitchPage>
        </Wrapper>;
    }
}