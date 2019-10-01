import * as React from "react";
import {SectionComponentProps} from "../theme/Sections";
import {SwitchCase, SwitchPage} from "../../../common/component/SwitchPage";
import {Link} from "../../../common/component/Link";
import {AssetCache} from "../../AssetCache";
import {Modal} from "react-bootstrap";
import {Form, FormButton, FormField} from "../../../common/component/form/Form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as faIcon from "@fortawesome/free-solid-svg-icons";


interface PopupProps {
    title: string;
    text: any;
    onHide?: () => void
}

interface State {
    popupProps?: PopupProps;
}


class FormSend {
    email:string;
}

class DetailPopup extends React.Component<PopupProps, { show: boolean }> {

    state = {
        show: true
    };

    componentWillReceiveProps(nextProps: Readonly<PopupProps>, nextContext: any): void {
        this.setState({show:true});
    }

    hide = () => {
        this.props.onHide?this.props.onHide():this.setState({show:false});
    };

    render() {
        return (
            <Modal size="lg" show={this.state.show}
                   onHide={this.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {this.props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.text}
                </Modal.Body>
                <Modal.Footer>
                   <div className={"container"}>
                       <div className={"row"}>
                           <h6>Máte zájem o nabídku?</h6>
                       </div>
                       <div className={"row"}>
                           Zanechte nám Váš kontakt a my se obratem ozveme.
                       </div>
                       <div className={"row"}>
                           <div className="input-group mt-3 mb-3">
                               <input type="text" className="form-control border-faded mr-3" placeholder="Emailová adresa"/>
                               <span className="input-group-btn">
                            <a href="#x" className="btn btn-w-icon btn-info"><span><FontAwesomeIcon icon={faIcon.faPaperPlane}/></span></a>
                        </span>
                           </div>
                       </div>
                   </div>

                </Modal.Footer>
            </Modal>
        );
    }
}

const createPopupProps = (): Array<PopupProps> => (
    [
        {
            text: (
                <div>
                    <h6>Společnost Vision Soft vám nabízí zprostředkování reklamy ve formě grafického banneru.</h6>
                    <p> Váš banner zobrazíme na hlavních stránkách dvou největších projektů společnosti.</p>
                    <ul style={{listStyle:"inside"}}>
                        <li>Internetová seznamka <Link href={"https://seznamseonline.cz"} history={false} target={"_blank"}>Seznam se Online</Link> (více než 5000 uživatelů).</li>
                        <li><Link href={"https://seznamseonline.cz"} history={false} target={"_blank"}>Směr sever</Link> - informační databáze výletních destinací a kulturních tipů severních čech (návštěvnost více než 1000 prokliků měsíčně).</li>
                    </ul>
                    <p><strong>Cena</strong>: 1000 Kč/měsíc</p>
                    <p style={{fontSize:"small"}}>(cena zahrnuje zobrazení reklamy na hlavních stránkách obou projektů po dobu jednoho měsíce)</p>
                </div>
            ),
            title: "INZERCE"
        },
        {
            text: (
                <div>
                    <p>
                        <FontAwesomeIcon icon={faIcon.faBookmark} /> Chcete svoji společnost nebo obchod zviditelnit na internetu, ale nevíte jak?<br/>
                        <FontAwesomeIcon icon={faIcon.faBookmark} /> Chcete o sobě dát vědět v online prostředí?<br/>
                        <FontAwesomeIcon icon={faIcon.faBookmark} /> Chcete přitáhnout nové zákazníky a zvýšit povědomí o Vaší firmě?<br/><br/>
                        <h4>Vše za Vás zařídíme!</h4><br />
                        <span style={{fontSize:"medium"}}>Naše služby v oblasti webdesignu, copywrightingu, programování a marketingu jsme shrnuli do jednoho balíčku přímo pro vás!</span>
                    </p>
                    <br/>
                    <h6>V Marketingovém balíčku se nachází:</h6>
                    <ol>
                        <li>
                            Vytvoříme webové stránky pro Vaši společnost.
                            - Návrh, texty, registrace domény i zprovoznění a správa webových stránek vaší společnosti. Na základě sdělených informací vše zařídíme za Vás.
                        </li>
                        <li>
                            Registrace do nejznámějších vyhledávačů Google a Seznam.
                            - Zaregistrujeme Vaši společnost do nejznámějších internetových vyhledávačů a dáme o Vás vědět Vašim potenciálním zákazníkům.
                        </li>
                        <li>
                            Videonávod "Jak na PPC" (placenou reklamu) internetových vyhledávačů Google a Seznam.
                            - Neplaťte zbytečné peníze rádoby reklamním specialistům. Po zhlédnutí jednoduchého návodu budete schopni sami zadávat placenou internetovou reklamu do nejznámějších vyhledávačů.
                        </li>
                        <li>
                            Umístění reklamy odkazující na Vaše webové stránky na internetových projektech společnosti Vision Soft po dobu jednoho měsíce.
                            - Po dobu jednoho měsíce - změťn to! umístíme grafickou reklamu do internetové seznamky Seznam se Online s více než 5000 uživateli a do projektu Směr sever - Informační databáze výletních destinací a kulturních tipů severních čech. Databáze s měsíční návštěvností přes 1000 prokliků.
                        </li>
                    </ol>
                    <p><strong>Cena</strong>: 15 000 Kč</p>
                    <p style={{fontSize:"small"}}>(cena zahrnuje tvorbu webové stránky, správu webu a domény po dobu jednoho roku, registrace ve vyhledávačích, videonávod "Jak na PPC", inzerce na projektech společnosti Vision Soft na jeden měsíc zdarma)</p>

                </div>
            ),
            title: "DIGITALIZACE"
        },
        {
            text: (
                <div>
                    <FontAwesomeIcon icon={faIcon.faBookmark} /> Máte starý systém, který se už špatně udržuje a přidávání nových funkcí je zdlouhavé a drahé?<br/>
                    <FontAwesomeIcon icon={faIcon.faBookmark} /> Funguje vaše podnikání stále papírovou formou a rádi byste jej přenesli do digitálního prosředí?<br/><br/>

                    <strong>V tom případě se obraťte na nás a my Vám rádi pomůžeme.</strong><br/><br/>

                    Vytvoříme Vám webovou nebo mobilní aplikaci na zakázku, která bude řešit vaše potřeby.<br/><br/>

                    <p><strong>Cena</strong>: Dynamická dle konzultace</p>
                </div>
            ),
            title: "APLIKACE NA ZAKÁZKU"
        }
    ]
);

export class OffersSection extends React.Component<SectionComponentProps, State> {

    state: State = {popupProps: null};

    showPopup(index: number) {
        this.setState({popupProps: createPopupProps()[index]});
    }

    render() {
        return <section id={this.props.id} className="bg-primary-hover dark p-0">
            {this.state.popupProps && <DetailPopup {...this.state.popupProps} />}
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
                                Chcete inzerovat vaši grafickou reklamu na internetové seznamce <strong>Seznam se
                                Online</strong> a informační databázi výletních destinací a kulturních tipů severních
                                čech <strong>Směr Sever</strong>?
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
                                Chcete dostat vaši společnost nebo obchod na internet, ale nevíte jak? Vše za vás vyřeší
                                náš marketingový balíček VISION!
                                Uvedeme vaši společnost do online prostředí a dáme o vás vědět vašim potenciálním
                                zákazníkům.
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
                                Potřebujete vytvořit mobilní a webovou aplikaci, která bude Vašim zákazníkům či
                                zaměstnancům nabízet efektivní a komfortní služby?
                            </p>
                            <div className="spacer">&nbsp;</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="promo-box text-left inner-space">
                            <Link href={() => this.showPopup(0)} className={"btn btn-white m-1"}>Více</Link>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="promo-box text-center inner-space bg-primary">
                            <Link href={() => this.showPopup(1)} className={"btn btn-white m-1"}>Více</Link>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="promo-box text-right inner-space">
                            <Link href={() => this.showPopup(2)} className={"btn btn-white m-1"}>Více</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }

}