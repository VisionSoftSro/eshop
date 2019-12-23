import {CartGoods} from "./GoodsDto";
import {JsonProperty} from "../../common/utils/ObjectMapper";

export class OrderDto {
    id:number;
    email:string;
    @JsonProperty({strict:{isArray:true}, clazz:CartGoods})
    goods:Array<CartGoods>
}