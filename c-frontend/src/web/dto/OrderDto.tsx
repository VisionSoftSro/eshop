import {CartGoods} from "./GoodsDto";
import {JsonProperty} from "../../common/utils/ObjectMapper";


export enum OrderStatus {
    New="New", Invoice="Invoice", Shipped="Shipped", Cancel="Cancel"
}
export class OrderDto {
    id:number;
    email:string;
    @JsonProperty({enumSource:OrderStatus})
    status:OrderStatus;
    @JsonProperty({strict:{isArray:true}, clazz:CartGoods})
    goods:Array<CartGoods>
}