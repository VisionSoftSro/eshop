import React from 'react';
import PageSection from '../PageSection';
import cs from 'classnames';
import Wrapper from "../../../component/Wrapper";
import {LocalizedPage} from "../../../component/LocalizedPage";
import {AssetCache} from "../../../../AssetCache";
interface ItemProps {
    image:any;
    dir?:string;
    title:string;
}
class Item extends React.Component<ItemProps> {
    render() {
        return <div className="row justify-content-center no-gutters">
            <div className="col-lg-6">
                <img className="img-fluid" src={this.props.image}/>
            </div>
            <div className={cs("col-lg-6", this.props.dir==="right"?"order-lg-first":"")}>
                <div className="bg-black text-center h-100 project">
                    <div className="d-flex h-100">
                        <div className={"project-text w-100 my-auto text-center text-lg-" + this.props.dir}>
                            <h4 className="text-white">{this.props.title}</h4>
                            <p className="mb-0 text-white-50">
                                {this.props.children}
                            </p>
                            <hr className={cs("d-none d-lg-block mb-0", this.props.dir==="right"?"mr-0":"ml-0")}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

class Localization {
    cs() {
        return <Wrapper>
            <div className={"row"}>
                <div className={"col-md-12"}>
                    <div className="bg-even mx-auto text-center p-20">
                        <h2 className="text-white">Proč Binaria?</h2>
                        <p className="mb-0 text-white-50">
                            Binaria nabízí způsob výdělku formou interaktivní budovatelsko-ekonomické hry.
                        </p>
                    </div>
                </div>
            </div>
            <Item image={AssetCache.Image.DemoImage} title={"Stavte, těžte, produkujte, obchodujte"} dir={"right"}>
                21 produktivních budov k výstavbě<br/>
                27 položek materiálu k obchodování či výrobě<br/>
                7 základních druhů vozidel k přepravě
            </Item>
            <Item image={AssetCache.Image.DemoImage} title={"Směna virtuální měny za skutečné peníze"} dir={"left"}>
                V Binarii se nachází Světová banka, ve které si můžete směnit Binars za opravdové peníze.<br/>
                V současnosti hra umožňuje směnu za Korunu českou.
            </Item>
            <Item image={AssetCache.Image.DemoImage} title={"Nákup pozemků v aukci"} dir={"right"}>
                Zůčastněte se aukcí dolů, lomů, lesů a vrtů. Nakupujte pozemky a začnětě těžit materiál pro vaše podnikání.
            </Item>
            <Item image={AssetCache.Image.DemoImage} title={"Sofistikovaný komoditní trh"} dir={"left"}>
                Na komoditním trhu virtuálního světa můžete prodávat vámi vytěžený nebo vyrobeným materiál.
            </Item>
            <Item image={AssetCache.Image.DemoImage} title={"Jedinečný koncept \"hry\" ve které si vyděláte opravdové peníze"} dir={"right"}>
                Ve světě Binaria mohou uživatelé zpeněžit své produkty nebo služby.
            </Item>
            <Item image={AssetCache.Image.DemoImage} title={"Svobodný výběr podnikání"} dir={"left"}>
                Určete si způsob jakým rozmnožíte svoje peníze.
                Můžete se stát těžařem, průmyslovým magnátem, majitelem stavební společnosti,
                dopravcem, obchodníkem s komoditami, výrobcem nebo prodejcem.
            </Item>
        </Wrapper>;
    }
}

export default class WhyBinaria extends PageSection {

    getClassName() {
        return "projects-section sticky-bg bg-city-1";
    }

    renderContent() {
        return <div className={"container"}>
            <LocalizedPage provider={Localization}/>
        </div>;
    }
}