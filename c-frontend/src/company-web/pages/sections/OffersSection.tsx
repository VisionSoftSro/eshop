import * as React from "react";
import {SectionComponentProps} from "../theme/Sections";
import {SwitchCase, SwitchPage} from "../../../common/component/SwitchPage";
import {Link} from "../../../common/component/Link";
import {AssetCache} from "../../AssetCache";

interface State {
    tab:number;
}

export class OffersSection extends React.Component<SectionComponentProps, State> {

    state = {
        tab: 0
    };

    changeTab = (index:number) => {
        this.setState({tab:index});
    };

    render() {
        // return <section id="work" className="container no-gutter">
        //     <div className="boxed-content grid-content content-wrapper-raised big-raise pb-0 rectangle">
        //         <ul className="portfolio-filter mt-0 list-inline text-center">
        //             <li><Link href={()=>this.changeTab(0)} data-group="all" className={this.state.tab === 0&&"active"||""}>Inzerce</Link></li>
        //             <li><Link href={()=>this.changeTab(1)} data-group="branding" className={this.state.tab === 1&&"active"||""}>Digitalizace</Link></li>
        //             <li><Link href={()=>this.changeTab(2)} data-group="design" className={this.state.tab === 2&&"active"||""}>Aplikace na míru</Link></li>
        //         </ul>
        //         <div className="row portfolio lightbox list-unstyled mb-0 p-3" id="grid">
        //             <SwitchPage value={this.state.tab} default={0}>
        //                 <SwitchCase value={0}>
        //                     Chcete inzerovat vaši grafickou reklamu na internetové seznamce SEZNAM SE ONLINE a informační databázi výletních destinací a kulturních tipů severních čech SMĚR SEVER?
        //                 </SwitchCase>
        //                 <SwitchCase value={1}>
        //                     Chcete dostat vaši společnost nebo obchod na internet, ale nevíte jak? Vše za vás vyřeší náš marketingový balíček VISION!
        //                     Uvedeme vaši společnost do online prostředí a dáme o vás vědět vašim potenciálním zákazníkům.
        //                 </SwitchCase>
        //                 <SwitchCase value={2}>
        //                     Potřebujete vytvořit mobilní a webovou aplikaci, která bude Vašim zákazníkům či zaměstnancům nabízet efektivní a komfortní služby?
        //                 </SwitchCase>
        //             </SwitchPage>
        //         </div>
        //     </div>
        // </section>;
        return <section id={this.props.id} className="bg-primary-hover dark p-0">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="promo-box text-left inner-space">
                            <div className="spacer">&nbsp;</div>
                            <div className="promo-icon-bg icon-md ml-0 border-white">
                                <img src={AssetCache.Image.Test.One} alt="" className="promo-box-icon"/>
                            </div>
                            <h5 className="box-title">INZERCE</h5>
                            <p className="box-description mb-0 text-white">
                                Chcete inzerovat vaši grafickou reklamu na internetové seznamce <strong>Seznam se Online</strong> a informační databázi výletních destinací a kulturních tipů severních čech <strong>Směr Sever</strong>?
                            </p>
                            <div className="spacer">&nbsp;</div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="promo-box text-center inner-space bg-primary">
                            <div className="spacer">&nbsp;</div>
                            <div className="promo-icon-bg icon-md border-white">
                                <img src={AssetCache.Image.Test.Three} alt="" className="promo-box-icon"/>
                            </div>
                            <h5 className="box-title">DIGITALIZACE</h5>
                            <p className="box-description mb-0 text-white">
                                 Chcete dostat vaši společnost nebo obchod na internet, ale nevíte jak? Vše za vás vyřeší náš marketingový balíček VISION!
                                 Uvedeme vaši společnost do online prostředí a dáme o vás vědět vašim potenciálním zákazníkům.
                            </p>
                            <div className="spacer">&nbsp;</div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="promo-box text-right inner-space">
                            <div className="spacer">&nbsp;</div>
                            <div className="promo-icon-bg icon-md mr-0 border-white">
                                <img src={AssetCache.Image.Test.Two} alt="" className="promo-box-icon"/>
                            </div>
                            <h5 className="box-title">APLIKACE NA MÍRU</h5>
                            <p className="box-description mb-0 text-white">
                                Potřebujete vytvořit mobilní a webovou aplikaci, která bude Vašim zákazníkům či zaměstnancům nabízet efektivní a komfortní služby?
                            </p>
                            <div className="spacer">&nbsp;</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="promo-box text-left inner-space">
                            <Link href={""} className={"btn btn-white m-1"}>Více</Link>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="promo-box text-center inner-space bg-primary">
                            <Link href={""} className={"btn btn-white m-1"}>Více</Link>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="promo-box text-right inner-space">
                            <Link href={""} className={"btn btn-white m-1"}>Více</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }

}