import {JsonProperty} from "../utils/ObjectMapper";
import {UserRole} from "./Enums";

export class User {

    @JsonProperty({strict:{dataType:String}})
    id:string;

    @JsonProperty({strict:{dataType: String}})
    login:string;

    @JsonProperty({enumSource:UserRole, strict:{isArray:true}})
    roles:Array<UserRole>;

}