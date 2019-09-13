import {JsonProperty} from "../utils/ObjectMapper";

export enum PriceType {
    Real="Real", Virtual="Virtual"
}

export class PriceResult {
    value:number;
    currency:string;
}
export class Price {

    @JsonProperty({enumSource:PriceType})
    type:PriceType;

    value:number;

    @JsonProperty({clazz:PriceResult})
    result:PriceResult
}