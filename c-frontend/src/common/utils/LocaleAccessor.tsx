type LocaleAccessor = () => string

let get:LocaleAccessor = () => "cs";

export const setLocaleAccessor = (accessor:LocaleAccessor) => {
    get = accessor;
};

export const currentLocale = () => {
    // //TODO udelat jinak
    // // @ts-ignore
    // return window.locale || DataStorage.get("locale");
    return get();
};