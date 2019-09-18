import * as React from "react";
import {connect} from "react-redux";
import {WebReducersState} from "../redux/WebRedux";
import {Link} from "../../common/component/Link";
import {TestActionType, TestState} from "../redux/reducers/TestReducer";
import Wrapper from "../../common/component/Wrapper";
import {Header} from "./theme/Header";
import {AssetCache} from "../AssetCache";


class TestContent extends React.Component {
    render() {
        return <section id="features" className="bg-primary-hover dark p-0">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="promo-box text-left inner-space">
                            <div className="spacer">&nbsp;</div>
                            <div className="promo-icon-bg icon-md ml-0 border-white">
                                <img src={AssetCache.Image.Test.One} alt="" className="promo-box-icon"/>
                            </div>
                            <h5 className="box-title">RESPONSIVE</h5>
                            <p className="box-description mb-0 text-white">Fully responsive Bootstrap 4 Theme.
                                SimplyCity Bootstrap Theme looks and works perfectly on all devices.</p>
                            <div className="spacer">&nbsp;</div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="promo-box text-center inner-space bg-primary">
                            <div className="spacer">&nbsp;</div>
                            <div className="promo-icon-bg icon-md border-white">
                                <img src={AssetCache.Image.Test.Two} alt="" className="promo-box-icon"/>
                            </div>
                            <h5 className="box-title">MODERN DESIGN</h5>
                            <p className="box-description mb-0 text-white">Clean &amp; Modern Design. SimplyCity in v2
                                was redesigned to fit the latest design standards &amp; trends.</p>
                            <div className="spacer">&nbsp;</div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="promo-box text-right inner-space">
                            <div className="spacer">&nbsp;</div>
                            <div className="promo-icon-bg icon-md mr-0 border-white">
                                <img src={AssetCache.Image.Test.Three} alt="" className="promo-box-icon"/>
                            </div>
                            <h5 className="box-title">MULTIPURPOSE</h5>
                            <p className="box-description mb-0 text-white">SimplyCity suits for multiple purposes of
                                websites where you need a one-pager site, 6+ premade demos.</p>
                            <div className="spacer">&nbsp;</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>;
    }
}

class Root extends React.Component<TestState> {

    click = () => {
      this.props.dispatch({type:TestActionType.Test, value:this.props.value+1});
    };

    render() {
        return <Wrapper>
            <Header />
            <TestContent/>
            <TestContent/>
            <TestContent/>
            <TestContent/>
            <TestContent/>
            <TestContent/>
            <TestContent/>
            <TestContent/>
            <footer className="bg-white">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-lg-8 footer-left-area">
                            <p>© 2018 <b>SimplyCity</b> by <a href="https://kingstudio.ro"
                                                              target="_blank"><b>KingStudio</b></a>. All Rights
                                Reserved.</p>
                        </div>
                        <div className="col-lg-4 social-icons footer-right-area">
                            <a href="#x" className="btn-social text-whit"><i className="fab fa-facebook-f"></i></a>
                            <a href="#x" className="btn-social"><i className="fab fa-twitter"></i></a>
                            <a href="#x" className="btn-social"><i className="fab fa-google-plus-g"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        </Wrapper>;
    }
}
export default connect((state:WebReducersState) => state.test)(Root);