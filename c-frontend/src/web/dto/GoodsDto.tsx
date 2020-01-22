import {formatPrice, toSeoString} from "../../common/utils/Util";
import {JsonProperty} from "../../common/utils/ObjectMapper";


export class Category {
    id:string;

    getName() {
        return Strings[`Categories.${this.id}`];
    }
    getSeoName() {
        return toSeoString(this.getName());
    }
}

export class GoodsDto {
    id:number;
    code:string;
    name:string;
    description:string;
    stock:number;
    price:number;
    images:number;
    hot:boolean;

    @JsonProperty({strict:{isArray:true}, clazz:Category})
    categories:Array<Category>;

    getPrice():Price {
        return new Price(this.price, 'CZK');
    }

    getCategory() {
        return this.categories[0];
    }

    getSeoName() {
        return toSeoString(this.name);
    }

    getUrl() {
        return `/${this.getCategory().getSeoName()}/${this.getSeoName()}#pid=${this.id}`;
    }

}

export class CartGoods {

    @JsonProperty({clazz:GoodsDto})
    goods:GoodsDto;
    pcs:number;

    constructor(goods?: GoodsDto, pcs?: number) {
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