import * as React from 'react';
import Wrapper from "../../component/Wrapper";
import WhatIsBinaria from "./sections/WhatIsBinaria";
import WhyBinaria from "./sections/WhyBinaria";
import WaysToGain from "./sections/WaysToGain";
import Faq from "./sections/Faq";
import Contact from "./sections/Contact";
import {EasingLink, Link} from "../../component/Link";
import moment from "moment";
import {initializeGrayScale, uninitializeGrayScale} from "../../../assets/grayscale/grayscale";
import {AssetCache} from "../../../AssetCache";
import {isAuthenticated} from "../../utils/Util";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// @ts-ignore
import * as faIcon from '@fortawesome/free-brands-svg-icons';

import config from '../../../Config';


export class OnePage extends React.Component {

    componentDidMount() {
        initializeGrayScale();
    }

    componentWillUnmount() {
        uninitializeGrayScale();
    }

    render() {
        return <div className={"landing-page"}>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                <div className="container">
                    <a className="navbar-brand js-scroll-trigger" href="#root">Binaria</a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><EasingLink placeholder={"WhatIsBinaria"} className={"nav-link"}>{Strings.WhatIsBinaria}</EasingLink></li>
                            <li className="nav-item"><EasingLink placeholder={"WhyBinaria"} className={"nav-link"}>{Strings.WhyBinaria}</EasingLink></li>
                            <li className="nav-item"><EasingLink placeholder={"WaysToGain"} className={"nav-link"}>{Strings.WaysToGain}</EasingLink></li>
                            <li className="nav-item"><EasingLink placeholder={"FAQ"} className={"nav-link"}>{Strings.FAQ}</EasingLink></li>
                            <li className="nav-item"><EasingLink placeholder={"Contact"} className={"nav-link"}>{Strings.Support}</EasingLink></li>
                            <li className="nav-item">
                                <Link href={"/user"} history className={"nav-link"}>{!isAuthenticated() && Strings.Login || Strings.Account}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <header className="masthead">
                <div className="container d-flex h-100 align-items-center">
                    <div className="mx-auto text-center header-content" style={{zIndex:1}}>
                        <img src={AssetCache.Image.Logo} width={150} className={"p-20"} />
                        <h1 className="mx-auto my-0 text-uppercase">Binaria</h1>
                        <h2 className="text-white-50 mx-auto mt-2 mb-5">Virtualní svět podnikání</h2>
                        <p className="text-white-50">
                            Binaria je online svět zaměřený na výdělek reálných peněz formou virtuální ekonomicko-budovatelské činnosti.
                            Těžte,produkujte,vyrábějte,obchodujte!
                            Vybudujte svou společnost a vydělávejte ve virtuálním světě!.
                        </p>
                        <a href={config.logportRegisterUrl} className="btn btn-primary js-scroll-trigger">Založit společnost</a>
                    </div>
                </div>
            </header>
            {/*<Home placeholder={"Home"}/>*/}
            {/*<ReleaseInfo placeholder={"Release"}/>*/}
            <section id="about" className="about-section text-center" style={{position:"relative"}}>
                {/*<Image src="fg4.png" className="img-fluid" style={{position:"absolute", bottom:0, left:0}}/>*/}
               <div className={"container"} style={{position:"absolute"}}>
                   <img src={AssetCache.Image.Mac} className="img-fluid" width={600} style={{position:"absolute", bottom:0}}/>
               </div>
            </section>
            <WhatIsBinaria placeholder={"WhatIsBinaria"}/>
            <WhyBinaria placeholder={"WhyBinaria"}/>
            <WaysToGain placeholder={"WaysToGain"}/>
            <Faq placeholder={"FAQ"}/>
            <section id="signup" className="signup-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-lg-8 mx-auto text-center">

                            {/*<i className="far fa-paper-plane fa-2x mb-2 text-white" />*/}
                            {/*<h2 className="text-white mb-5">Subscribe to receive updates!</h2>*/}

                            {/*<form className="form-inline d-flex">*/}
                                {/*<input type="email" className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0" id="inputEmail" placeholder="Enter email address..."/>*/}
                                    {/*<button type="submit" className="btn btn-primary mx-auto">Subscribe</button>*/}
                            {/*</form>*/}
                            <a href={config.logportRegisterUrl} className="btn btn-primary js-scroll-trigger m-r-5">{Strings.YouHaveNoAccount}</a>
                            <Link href={"/user"} className="btn btn-dark js-scroll-trigger m-l-5">{Strings.Login}</Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contact-section bg-black" id={"Contact"}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 offset-md-4">
                            <div className="card py-4 h-100">
                                <div className="card-body text-center">
                                    <i className="fas fa-envelope text-primary mb-2"/>
                                    <h4 className="text-uppercase m-0">Email</h4>
                                    <hr className="my-4"/>
                                        <div className="small text-black-50">
                                            <a href="mailto:info@binaria.cz">info@binaria.cz</a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="social d-flex justify-content-center">
                        <a href="#" className="mx-2">
                            <FontAwesomeIcon icon={faIcon.faTwitter} />
                        </a>
                        <a href="#" className="mx-2">
                            <FontAwesomeIcon icon={faIcon.faFacebookF} />
                        </a>
                        <a href="#" className="mx-2">
                            <FontAwesomeIcon icon={faIcon.faYoutube} />
                        </a>
                    </div>

                </div>
            </section>
            <footer className="bg-black small text-center text-white-50">
                <div className="container">
                    Copyright &copy; Vision Soft s.r.o. {moment().format('YYYY')}
                </div>
            </footer>
        </div>;
    }
}