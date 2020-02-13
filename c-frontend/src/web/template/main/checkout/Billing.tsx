import cs from "classnames";
import React, {useEffect, useRef, useState} from "react";
import {checkoutStore} from "../../../redux/WebRedux";
import {CheckoutAction, CheckoutActionType} from "../../../redux/reducers/cart/CheckoutReducer";
import {Form, FormField, FormInputType} from "../../../../common/component/form/Form";
import {CheckoutDto} from "../../../dto/CheckoutDto";
import {Link} from "../../../../common/component/Link";

import {FormCzechPostAutocomplete} from "./FormCzechPostAutocomplete";
import {FormZasilkovnaAutocomplete} from "./FormZasilkovnaAutocomplete";


export function Billing() {
    const [canContinue, setCanContinue] = useState(false);
    const form = useRef<Form<CheckoutDto>>();
    const checkout = checkoutStore.getState().checkout;
    const next = () => {
        if (form.current.validate()) {
            checkoutStore.dispatch<CheckoutAction>({
                type: CheckoutActionType.Update,
                step: 3,
                checkout: checkout
            });
        }
    };

    return (

        <div className="checkout_area section_padding_100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="checkout_details_area clearfix">
                            <h5 className="mb-4">{Strings["BillDetails"]}</h5>
                            <Form<CheckoutDto> data={checkout} simpleLabel
                                               inputGroupEnabled={false} ref={form}
                                               onChange={(form) => setCanContinue(form.validate())}>
                                <div className="row">
                                    <div className="col-lg-3 col-md-6 mb-3">
                                        <FormField type={FormInputType.Text} name={"firstName"}
                                                   title={Strings["FirstName"]} required/>
                                    </div>
                                    <div className="col-lg-3 col-md-6 mb-3">
                                        <FormField type={FormInputType.Text} name={"lastName"}
                                                   title={Strings["LastName"]} required/>
                                    </div>
                                    <div className="col-lg-3 col-md-6 mb-3">
                                        <FormField type={FormInputType.Text} name={"emailAddress"}
                                                   title={Strings["EmailAddress"]} required validate={{
                                            message: "Vyplňte správnou emailovou adresu",
                                            regexp: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                                        }}/>
                                    </div>
                                    <div className="col-lg-3 col-md-6 mb-3">
                                        <FormField type={FormInputType.Text} name={"phoneNumber"}
                                                   title={Strings["PhoneNumber"]} validate={{
                                            regexp: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
                                            message: "Vyplňte správné telefonní číslo"
                                        }} required={checkout.shippingMethod.code==="zasilkovna"}/>
                                    </div>
                                    <div className="col-12 mb-3">
                                        {checkout.shippingMethod.code === "zasilkovna" && (
                                            <FormField type={FormInputType.Custom} name={"zasilkovna"}
                                                       customComponent={FormZasilkovnaAutocomplete} title={"Pobočka Zásilkovny"}
                                                       customComponentOptions={{checkout: checkout}} required/>
                                        ) ||
                                        (
                                            <FormField type={FormInputType.Custom} name={"czechPost"}
                                                       customComponent={FormCzechPostAutocomplete} title={"Pobočka České pošty"}
                                                       customComponentOptions={{checkout: checkout}} required/>
                                        )}
                                    </div>
                                    {/*<div className="col-md-6 mb-3">*/}
                                    {/*<FormField type={FormInputType.Text} name={"street"} title={Strings["Street"]}*/}
                                    {/*required/>*/}
                                    {/*</div>*/}
                                    {/*<div className="col-md-6 mb-3">*/}
                                    {/*<FormField type={FormInputType.Text} name={"streetNo"}*/}
                                    {/*title={Strings["StreetNo"]} required/>*/}
                                    {/*</div>*/}
                                    {/*<div className="col-md-6 mb-3">*/}
                                    {/*<FormField type={FormInputType.Text} name={"city"} title={Strings["City"]}*/}
                                    {/*required/>*/}
                                    {/*</div>*/}
                                    {/*<div className="col-md-6 mb-3">*/}
                                    {/*<FormField type={FormInputType.Number} name={"postCode"}*/}
                                    {/*title={Strings["PostCode"]} required/>*/}
                                    {/*</div>*/}
                                </div>
                            </Form>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="checkout_pagination d-flex justify-content-end mt-50">
                            <Link href={() => checkoutStore.dispatch<CheckoutAction>({
                                type: CheckoutActionType.SetStep,
                                step: 1
                            })} className="btn bigshop-btn mt-2 ml-2">{Strings["Back"]}</Link>

                            <Link href={() => canContinue && next()} className={cs("btn bigshop-btn mt-2 ml-2", !canContinue && "disabled")}>{Strings["Continue"]}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
