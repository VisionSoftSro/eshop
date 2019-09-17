import React from 'react';
import {currentLocale, GenericMap} from "../utils/Util";

type Method = ()=>GenericMap<any>;
type Provider = GenericMap<any> | Method;

interface LocalizedPageProps {
    provider:Provider
}
export class LocalizedPage extends React.Component<LocalizedPageProps> {
    render() {
        let owner:GenericMap<any>;
        if(typeof this.props.provider === "function") {
            owner = new this.props.provider();
        }
        const defautlLang = "cs";
        const locale = currentLocale();
        let page = owner[locale];
        if(typeof page === 'undefined') {
            page = owner[defautlLang];
        }
        if(typeof page === 'undefined') {
            page = ()=>"No localized page found";
        }
        return page.bind(owner)();
    }
}