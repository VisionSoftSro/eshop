import {PaymentMethodDto, ShippingMethodDto} from "./Methods";

export class CheckoutDto {

    firstName:string = null;
    lastName:string = null;
    emailAddress:string = null;
    phoneNumber:number = null;
    address:string = null;
    city:string = null;
    postCode:number = null;
    shippingMethod:ShippingMethodDto = null;
    paymentMethod:PaymentMethodDto = null;
}
// export class ShippingMethod {
//     id:number;
//     name:string;
//     price:number;
//     deliveryTime:string;
// }
//
// export class PaymentMethod {
//     id:number;
//     name:string;
//     description:string;
// }