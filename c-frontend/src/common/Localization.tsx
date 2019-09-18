import Locs, {LocalizedStrings} from 'react-localization';
import {GenericMap} from "./utils/Util";
type Type = GenericMap<{}>;
export const init = (props:Type):LocalizedStrings<Type> => {
    const strings = new Proxy(new Locs(props), {

        get: function (target:any, key:any) {
            const lang = target.getLanguage();
            const defaultKey = `_${key}_${lang}_`;
            let value = target;
            const keys = key.split(".");
            keys.forEach((key:string)=>{
                if(value) value = value[key];
            });
            return value || defaultKey;
        }
    });
    window.Strings = strings;
    return strings;
};