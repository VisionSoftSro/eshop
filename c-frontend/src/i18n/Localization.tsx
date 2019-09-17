import cs from './cs/strings';
// import en from './en/strings';
import LocalizedStrings from 'react-localization';
window.Strings = new Proxy(new LocalizedStrings({
    cs: cs
}), {

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
export default window.Strings;