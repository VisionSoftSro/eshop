import React from 'react';
import cs from 'classnames';
import PageSection from "../PageSection";
import {LocalizedPage} from "../../../component/LocalizedPage";

interface ItemProps {
    title:string;
}

class Item extends React.Component<ItemProps> {
    render() {
        return <div className="row p-20">
            <div className="col-md-12">
                <h4 className={"text-white"}>{this.props.title}</h4>
                <p className={"text-white-50"}>
                    {this.props.children}
                </p>
            </div>
        </div>;
    }
}
class Localization {
    cs() {
        return <div className={"row"}>
            <div className={"col-md-12"}>
                <div className={"bg-black"}>
                    <div className="col-md-10 col-lg-8 mx-auto text-center">
                        <h2 className={"text-white p-20"}>FAQ</h2>
                        <h6 className="text-white">Odpovědi na nejčastěji kladené otázky</h6>
                    </div>
                    <hr className="long-hr long-hr gold-hr m-b-20"/>
                    <Item title={"Jak mohu vydělávat peníze ve virtuálním světě?"}>
                        Staňte se těžařem,průmyslovým magnátem,majitelem stavební
                        společnosti,dopravcem,obchodníkem s komoditami,výrobcem,prodejcem.
                        Založte společnost, vyberte si odvětví ve kterém chcete začít podnikat a pusťte se do
                        toho.Možností je mnoho!
                        První výdělky na sebe nenechají dlouho čekat.
                    </Item>
                    <Item title={"Je přístup do světa Binaria věkové omezený?"}>
                        K proplacení vašich Binars je potřeba k vašemu virtuálnímu Binaria účtu přidat číslo
                        vašeho bankovního účtu na který chcete zasílat směněné Binars v Korunách českých. Po
                        přidání vašeho bankovního účtu musí dojít k ověření účtu. Ověření probíhá zasláním 1 Kč
                        na účet Binaria Bank a zaslání kopie dokladu totožnosti. Po ověření Vašeho účtu již
                        můžete ve virtuální směnárně kdykoliv směnit Binar za Českou Korunu. Transakce je pro
                        větší bezpečnost před odesláním na Váš účet ověřována. Po úspěšném ověření vám bude
                        zaslána zpráva a peníze budou poslány na účet do 5ti pracovních dnů.
                    </Item>
                    <Item title={"Jak probíhá proplacení virtuální měny na reálnou?"}>
                        Binaria je určena pouze pro osoby starší 18ti let. Uživatel se tímto musí prokázat
                        dokladem při směně Binars.
                    </Item>
                    <Item title={"Jakým způsobem ve hře funguje nákup těžebních pozemků?"}>
                        Naleziště, Lesy, doly a lomy se prodávají ve formě aukcí.
                        Stačí si vybrat položku o kterou máte zájem a buď přihodit libovolnou částku nebo pokud
                        je možnost, můžete pozemek koupit okamžitě.
                    </Item>
                    <Item title={"Kdy bude hra spuštěna?"}>
                        Předběžný odhad zpřístupnění světa Binaria všem registrovaným virtuálním společnostem je
                        jaro roku 2019.
                    </Item>

                    <Item title={"Mohu se zapojit do testovací (beta) fáze vývoje?"}>
                        Vzhledem k tomu, že se jedná o výdělečně činnou hru, tak testovací fáze nebude veřejnosti
                        dostupná z důvodů mazání a upravování dat.
                        Pokud chcete Binarii jakkoliv podpořit, můžete tak učinit na č.ú. 1234567890 nebo nás
                        kontaktovat prostřednictvím formuláře <a
                        href={"https://vision-soft.cz/#contact"}>zde</a>
                    </Item>
                </div>
            </div>
        </div>;
    }
}

export default class Faq extends PageSection {
    getClassName() {
        return "sticky-bg bg-city-2";
    }

    renderContent() {
        return <div className="container">
            <LocalizedPage provider={Localization}/>
        </div>;
    }

}