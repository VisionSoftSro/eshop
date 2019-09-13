import {Token} from "./model/Token";
import DataStorage from "./DataStorage";
import {ObjectMapper} from "./utils/ObjectMapper";
const key = "token";
export class TokenStore {


    mapper = new ObjectMapper<Token>({strictTypes:true});

    clear() {
        DataStorage.clear(key);
    }

    get():Token {
        const str = DataStorage.get(key);
        if(str) {
            return this.mapper.readValue(Token, JSON.parse(atob(str)));
        }
        return null;
    }

    set(token:Token) {
        DataStorage.set(key, btoa(this.mapper.writeValueAsString(token)));
    }

    static cachedToken:Token = null;

    static getToken() {
        if(this.cachedToken === null) {
            this.cachedToken = new TokenStore().get();
        }
        return this.cachedToken;
    }

}
export default new TokenStore();