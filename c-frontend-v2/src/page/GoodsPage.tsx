import * as React from "react";
import {useAppContext} from "../context/main/AppContext";
import {useTranslation} from "react-i18next";
import {Link} from "@material-ui/core";
import i18n from "i18next";
import {useHistory, useParams} from "react-router";

export function LanguageLink({lang}:{lang:string}) {
    const {push} = useHistory();
    return <Link href={"#"} onClick={async ()=>{
        await i18n.changeLanguage(lang);
    }}>{lang}</Link>;
}

export function GoodsPage() {
    const {paymentMethods, shippingMethods} = useAppContext();
    const {t} = useTranslation();
    const {lang} = useParams();
    const {push} = useHistory();
    return (
        <div className="App">
            <LanguageLink lang={"cs"}/>
            <LanguageLink lang={"en"}/><br/>
            name: {t("app.name")}<br/>
            lang: {lang}<br/>
            lang2: {i18n.language}<br/><br/><br/><br/>
            <Link href="#" onClick={()=>push("/nekam")}>nekam</Link>
            {/*{paymentMethods.map(item => <div key={item.id}>{item.code}</div>)}*/}
            {/*{shippingMethods.map(item => <div key={item.id}>{item.code}</div>)}*/}
        </div>
    );
}
