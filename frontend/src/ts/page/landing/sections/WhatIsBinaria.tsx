import React from 'react';
import PageSection from "../PageSection";
import {LocalizedPage} from "../../../component/LocalizedPage";

class Localization {
    cs() {
        return <div className={"row"}>
            <div className={"col-md-12"}>
                <div className={"bg-black"}>
                    <div className="col-md-10 col-lg-8 mx-auto text-center">
                        <h2 className="text-white p-t-20">Co je Binaria?</h2>
                        <h6 className="text-white">Vybudujte svou společnost a vydělávejte ve <span className="highlight">virtuálním světě!</span></h6>
                        <p className="mb-0 text-white-50">Binaria je online svět založený na budovatelsko-ekonomickém principu.
                            V tomto virtuálním světě můžete podnikat v mnohých oblastech od těžby až po výrobu či přepravu nebo jen můžete jednoduše obchodovat s komoditami.
                            Koupí pozemku, následným těžením, zpracováním, výrobou a ostatními činnostmi ve světě Binaria získáváte virtuální měnu Binar.
                            Založte si vlastní společnost, vyberte si odvětví vaší činnosti a začněte budovat prosperující firmu, která vám bude generovat zisk!
                            Nezapomeňte, že všechny virtuální peníze, které si ve světě Binaria vyděláte si můžete ve virtuální světové bance směnit na skutečné peníze!
                        </p>
                    </div>
                    <hr className="long-hr gold-hr m-b-20" />
                    <div className="text-white process p-t-20">
                        <div className="row process-row">
                            <div className="col-md-3 process-step">
                                <div className="process-box"><i className="glyphicons2 glyphicons-spade heading"/></div>
                                <p className="title">Těžte!</p>
                                {/*<p className="text-center">Vestibulum placerat, ipsum vel mollis ornare, libero ex dapibus diam, gravida tempor.</p>*/}
                            </div>
                            <div className="col-md-3 process-step">
                                <div className="process-box"><i className="li_settings heading"/></div>
                                <p className="title">Produkujte!</p>
                                {/*<p className="text-center">Vestibulum vel dictum dolor, eget luctus risus. Nullam scelerisque viverra nisl et vehicula, in ut tellus.</p>*/}
                            </div>
                            <div className="col-md-3 process-step">
                                <div className="process-box"><i className="glyphicons2 glyphicons-settings heading"/></div>
                                <p className="title">Vyrábějte!</p>
                                {/*<p className="text-center">Mauris venenatis vulputate ligula eu finibus. Donec pretium libero lacus, vitae maximus purus dapibus.</p>*/}
                            </div>
                            <div className="col-md-3 process-step">
                                <div className="process-box"><i className="li_banknote heading"/></div>
                                <p className="title">Obchodujte!</p>
                                {/*<p className="text-center">Proin gravida, est sed vestibulum cursus, enim libero sollicitudin lacus, vel ornare nunc.</p>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default class WhatIsBinaria extends PageSection {
    getClassName() {
        return "sticky-bg bg-city-2";
    }
    renderContent() {
        return <div className={"container"}>
            <LocalizedPage provider={Localization}/>
        </div>;
    }
}