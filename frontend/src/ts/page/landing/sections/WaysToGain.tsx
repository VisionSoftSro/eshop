import React from 'react';
import cs from 'classnames';
import PageSection from "../PageSection";
import {LocalizedPage} from "../../../component/LocalizedPage";

interface ItemProps {
    position:string;
    color:string;
    className?:string;
    title:string;
}

class Item extends React.Component<ItemProps> {
    render() {
        const position = this.props.position;
        const color = this.props.color;
        let hrPos = "";
        if("left" === position) {
            hrPos = "ml-0";
        } else if ("right" === position) {
            hrPos = "mr-0";
        }
        return <div className={cs("col-md-4", this.props.className, "text-"+position)}>
            <div className="p-20">
                <h5 className={"text-white"}>{this.props.title}</h5>
                <hr className={cs("short-hr m-t-0 m-b-10", color, hrPos)} />
                <p className={"mb-0 text-white-50"}>{this.props.children}</p>
            </div>
        </div>;
    }
}
//gf
class Localization {
    cs() {
        return <div className={"row"}>
            <div className={"col-md-12"}>
                <div className={"bg-even"}>
                    <div className="col-md-10 col-lg-8 mx-auto text-center">
                        <h2 className={"text-white mb-5 p-20"}>Cesty k výdělkům v Binarii</h2>
                        <h6 className="text-white">Vydělávejte reálné peníze ve virtuálním světě!</h6>
                        <p className="mb-0 text-white-50">Ve světě Binaria mohou uživatelé zpeněžit své produkty a služby!</p>
                    </div>
                    <hr className="long-hr long-hr gold-hr m-b-20" />
                    <div className="row">
                        <Item title={"Staňte se obchodníkem!"} className={"bg-black"} position={"left"} color={"red-hr"}>
                            Heslo obchodníků na trzích zní: Nakup levně a prodej draze!
                            Na virtuálním trhu je možné obchodovat se vším zbožím, které můžete v Binarii
                            vytěžit, zpracovat nebo vyrobit.
                        </Item>
                        <Item title={"Prodejte nebo zpracujte vytěžené suroviny!"} position={"center"} color={"green-hr"}>
                            Ve Binarii se nachází šest druhů surovin, které můžete získat těžbou nebo nákupem na
                            trhu.
                            Tyto suroviny lze dále zpracovávat nebo prodat na trhu.
                        </Item>
                        <Item title={"Prodejte nebo využijte zpracované suroviny!"} className={"bg-odd"} position={"center"} color={"blue-hr"}>
                            Zpracováním vytěžených suroviny můžete ve světě Binaria získat až sedm dalších druhů
                            materiálu potřebných ve stavebnictví či výrobě.
                            Tyto materiály můžete prodat na trhu nebo využít pro stavbu nových budov, výrobu
                            strojů a nářadí.
                        </Item>
                    </div>
                    <div className={"m-20"}/>
                    <div className="row">
                        <Item title={"Přepravujte materiál ostatním společnostem!"} className={"bg-odd"} position={"left"} color={"pink-hr"}>
                            Vybudujte vlastní dopravní společnost, nabídněte své služby a vydělávejte přepravou
                            materiálu pro ostatní společnosti.
                            Přeprava a stavba budov mohou být ve světě Binaria jedny z nejlukrativnějších
                            obchodních činností!
                        </Item>
                        <Item title={"Stavte ostatním společnostem nové budovy!"} position={"center"} color={"yellow-hr"}>
                            S vlastní stavební společností se vám otevírají nové možnosti postavit budovy nejen
                            sobě,
                            ale také nabídnout postavení nových budov ostatním společnostem.
                            Stavba budov a přeprava materiálu mohou být ve světě Binaria jedny z
                            nejlukrativnějších obchodních činností!
                        </Item>
                        <Item title={"Prodejte nebo využijte vyrobená vozidla a nářadí!"} className={"bg-black"} position={"right"} color={"purple-hr"}>
                            Vyrobte přepravní vozidla nebo nářadí na zrychlení těžby.
                            To vše můžete následně prodat nebo využít ve svůj prospěch!
                        </Item>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default class WaysToGain extends PageSection {
    getClassName() {
        return "sticky-bg bg-city-1";
    }

    renderContent() {
        return <div className="container">
            <LocalizedPage provider={Localization}/>
        </div>;
    }

}