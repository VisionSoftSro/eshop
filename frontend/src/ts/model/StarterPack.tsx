import {Price} from "./Price";
import {JsonProperty} from "../utils/ObjectMapper";

export class StarterPack {
    id:string;
    name:string;
    @JsonProperty({clazz:Price})
    price:Price;
}