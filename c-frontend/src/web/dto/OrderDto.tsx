import {CartGoods} from "./GoodsDto";
import {JsonProperty} from "../../common/utils/objectmapper/Mapper";


export enum OrderStatus {
    New="New", Invoice="Invoice", Shipped="Shipped", Cancel="Cancel"
}
export class OrderDto {
    id:number;
    email:string;
    @JsonProperty({type:{enum:OrderStatus}})
    status:OrderStatus;
    @JsonProperty({type:{clazz:CartGoods, isArray:true}})
    goods:Array<CartGoods>
}