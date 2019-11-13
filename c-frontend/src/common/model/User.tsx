import {JsonProperty} from "../utils/ObjectMapper";
export enum UserRole {
    ROLE_ADMIN = "ROLE_ADMIN",
    ROLE_USER = "ROLE_USER"
}

export class User {

    @JsonProperty({strict:{dataType:String}})
    id:string;

    @JsonProperty({strict:{dataType: String}})
    login:string;

    @JsonProperty({enumSource:UserRole, strict:{isArray:true}})
    roles:Array<UserRole>;

}