import * as React from "react";
import {AssetCache} from "../../AssetCache";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as faIcon from '@fortawesome/free-solid-svg-icons';
import {addScrollListener, removeScrollListener} from "../../../common/utils/Util";
import cs from 'classnames';
import Wrapper from "../../../common/component/Wrapper";
export class Header extends React.Component {

    state = {onTop:true};
    scrollListener:number;
    componentDidMount(): void {
        this.scrollListener = addScrollListener(this.onScroll)
    }

    componentWillUnmount(): void {
        removeScrollListener(this.scrollListener);
    }

    onScroll = (ev:Event) => {
        const threshold = 50;
        const top = document.documentElement.scrollTop;
        if(top > threshold && this.state.onTop) {
            this.setState({onTop:false});
        }
        if(top < threshold && !this.state.onTop) {
            this.setState({onTop:true});
        }
    };

    render() {
        return <Wrapper>
            <div id="top" />
            <header className="home-header parallax pt-0" >
                <div className="top-menu big has-contained-menu top-menu-primary has-raised-content">
                    <div className="container">
                        <div className="row vcenter">
                            <div className="col-sm-9">
                                <div className="features-small has-contained-menu">
                                    <p>
                                        <FontAwesomeIcon icon={faIcon.faPhone} className={"fa text-white mr-1"}/>
                                        <span><b>0123 456 7890</b></span>
                                        <FontAwesomeIcon icon={faIcon.faEnvelope} className={"fa text-white ml-3 mr-1"}/>
                                        <span><b>office@yoursite.com</b></span>
                                    </p>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <a className="btn btn-info smooth-scroll pull-right mr-3" href="#contact">Request Quote</a>
                            </div>
                        </div>
                    </div>
                </div>

                <nav id="nav-scroll"
                     className={cs("navbar navbar-contained navbar-content navbar-expand-lg navbar-light bg-white menu-line menu-rounded fixed-top has-top-menu-big", this.state.onTop?"is-hidden":"nav-scroll")}
                     data-nav-status="scroll">
                    <div className="container">
                        <a className="navbar-brand" href="#x"><img src={AssetCache.Image.Logo} alt=""/></a>

                        <button className="navbar-toggler collapsed menu-text" type="button" data-toggle="collapse"
                                data-target="#navbar-toggle-1" aria-controls="navbar-toggle-1" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="icon-bar top-bar"></span>
                            <span className="icon-bar middle-bar"></span>
                            <span className="icon-bar bottom-bar"></span>
                            <span className="sr-only">Toggle navigation</span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbar-toggle-1">
                            <ul className="navbar-nav vcenter ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link smooth-scroll" href="#top"><span>HOME</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link smooth-scroll" href="#about"><span>ABOUT</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link smooth-scroll" href="#services"><span>SERVICES</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link smooth-scroll" href="#portfolio"><span>PORTFOLIO</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link smooth-scroll" href="#clients"><span>CLIENTS</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link smooth-scroll last-menu-item"
                                       href="#contact"><span>CONTACT</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="header-content dark has-sticky-menu-mobile">
                    <div className="container">
                        <div className="row vcenter">
                            <div className="col-md-6 header-content-left">
                                <h1>SIMPLYCITY</h1>
                                <h3 className="mb-3">MULTIPURPOSE THEME</h3>
                                <p className="header-text hide-mobile">Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit. Sed laoreet sapien velit, sed faucibus nunc euismod vitae. Interdum et malesuada
                                    fames ac ante ipsum primis in faucibus velit finibus, congue.</p>
                                <a className="btn btn-info mr-3 smooth-scroll" href="#about">Learn More</a>
                                <a className="btn btn-info mr-3 smooth-scroll" href="#services">Services</a>
                            </div>
                            <div className="col-md-6 header-content-right">
                                <img src={AssetCache.Image.Laptop} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </Wrapper>;
    }
}