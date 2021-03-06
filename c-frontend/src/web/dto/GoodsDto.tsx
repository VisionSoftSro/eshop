import {formatPrice, toSeoString} from "../../common/utils/Util";
import {JsonProperty} from "../../common/utils/objectmapper/Mapper";



export class Category {
    id:string;

    getName() {
        return Strings[`Categories.Title.${this.id}`];
    }
    getDesc() {
        return Strings[`Categories.Desc.${this.id}`];
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
    published:boolean;


    @JsonProperty({type:{clazz:Category, isArray:true}})
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

    @JsonProperty({type:{clazz:GoodsDto}})
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
