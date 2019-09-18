import * as Cookies from "js-cookie";
import {ObjectMapper} from "./utils/ObjectMapper";

interface IStorage {
    set(key:string, data:any, type:string):void
    get(key:string, type:string):any
    clear(key:string, type:string):any
}

class CookiesStorage implements IStorage{
    set(key:string, data:any, type:string) {
        Cookies.set(key, data, { expires: 365, path: '' });
    }

    get(key:string, type:string):any {
        return Cookies.get(key);
    }

    clear(key:string, type:string):any {
        return Cookies.remove(key);
    }

}

class WebStorage implements IStorage {
    storages:{[key:string]:Storage};
    constructor() {
        this.storages = {
            local:localStorage,
            session:sessionStorage
        };
    }

    set(key:string, data:any, type="local") {
        this.storages[type].setItem(key, data);
    }

    get(key:string, type="local") {
        return this.storages[type].getItem(key);
    }

    clear(key:string, type="local") {
        const value = this.storages[type].getItem(key);
        this.storages[type].removeItem(key);
        return value;
    }

}

class DataStorage implements IStorage {
    instance:IStorage;
    constructor() {
        if (typeof(Storage) !== "undefined") {
            this.instance = new WebStorage();
        } else {
            this.instance = new CookiesStorage();
        }
    }

    set(key:string, data:any, type:string="local") {
        this.instance.set(key, data, type);
    }

    get(key:string, type:string="local") {
        return this.instance.get(key, type);
    }

    clear(key:string, type:string="local") {
        return this.instance.clear(key, type);
    }
}


export default new DataStorage();