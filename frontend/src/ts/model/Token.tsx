import {JsonIgnore, JsonProperty} from "../utils/ObjectMapper";

export class Token {
    @JsonProperty({name:"access_token", strict:{dataType:String}})
    accessToken:string;

    @JsonProperty({name:"refresh_token", strict:{dataType:String}})
    refreshToken:string;

    @JsonProperty({name:"error", strict:{dataType:String}})
    error:string;

}