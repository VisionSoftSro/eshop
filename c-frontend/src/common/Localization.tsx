import Locs, {LocalizedStrings} from 'react-localization';
import {GenericMap} from "./utils/Util";

type Type = GenericMap<{}>;
export const init = (props:Type):LocalizedStrings<Type> => {
    return new Proxy(new Locs<Type>(props), {

        set:(target: LocalizedStrings<Type>, key: any, _val:string, r:any) => {
            if("locale" === key) {
                target.setLanguage(_val);
            }
            return true;
        },

        get: (target: LocalizedStrings<Type>, key: any, _val:string) => {
            const lang = target.getLanguage();
            const defaultKey = `_${key}_${lang}_`;
            let value = target;
            const keys = key.split(".");
            keys.forEach((key: string) => {
                if (value) {
                    // @ts-ignore
                    value = value[key];
                }
            });
            return value || defaultKey;
        }
    });
};