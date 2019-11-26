import {formatPrice} from "../../common/utils/Util";
import {JsonProperty} from "../../common/utils/ObjectMapper";


export class Category {
    id:string
}

export class Goods {
    id:number;
    code:string;
    name:string;
    description:string;
    stock:number;
    price:number;
    hot:boolean;

    @JsonProperty({strict:{isArray:true}, clazz:Category})
    categories:Array<Category>;

    getPrice():Price {
        return new Price(this.price, 'CZK');
    }

}

export class CartGoods {

    @JsonProperty({clazz:Goods})
    goods:Goods;
    pcs:number;

    constructor(goods?: Goods, pcs?: number) {
        this.goods = goods;
        this.pcs = pcs;
    }
}

export class Price {
    value:number;
    currency:string;

    constructor(value: number, currency: string) {
        this.value = value;
        this.currency = currency;
    }

    format() {
        return formatPrice(this.value, this.currency)
    }

}