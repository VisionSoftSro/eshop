import {JsonProperty} from "../../utils/objectmapper/Mapper";

export class FieldError {
    name: string;
    message: string;
    localize?: boolean;

    static Create(message:string, localize:boolean = false):FieldError {
        const fe = new FieldError();
        fe.message = message;
        fe.localize = localize;
        return fe;
    }
}

export class ValidationError {
    code: number;
    message: string;
    @JsonProperty({type:{clazz: FieldError, isArray: true}})
    errors: Array<FieldError> = new Array<FieldError>();
}