import * as React from "react";
import {connect} from "react-redux";
import {WebReducersState} from "../redux/WebRedux";
import Wrapper from "../../common/component/Wrapper";

import {LocaleState} from "../../common/redux/reducers/locale/LocaleReducer";
import {changeLocale} from "../redux/reducers/LocaleActions";
import DataStorage from "../../common/DataStorage";

import {Header} from "./Header";

import {init} from "./Bigshop";

class Root extends React.Component<LocaleState> {


    componentDidMount(): void {
        this.changeLocale(DataStorage.get("locale")||"cs");
        init();
    }

    changeLocale = (locale:string) => {
        this.props.dispatch(changeLocale(locale));
    };

    render() {
        return <Wrapper>
            <Header />
            <div className="demo-hero-area bg-gray text-center section_padding_100">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-9">
                            <h2 className="mb-4">Bigshop is a pleasingly graceful and stylish ecommerce template with a
                                great user experience.</h2>
                            <p>
                                <span className="badge badge-info m-1">bootstrap 4.3.1</span>
                                <span className="badge badge-info m-1">npm</span>
                                <span className="badge badge-info m-1">pug</span>
                                <span className="badge badge-info m-1">sass</span>
                                <span className="badge badge-info m-1">gulp.js</span>
                                <span className="badge badge-info m-1">mega menu</span>
                                <span className="badge badge-info m-1">reusable elements</span>
                                <span className="badge badge-info m-1">responsive</span>
                                <span className="badge badge-info m-1">bug free code</span>
                                <span className="badge badge-info m-1">new design</span>
                                <span className="badge badge-info m-1">new code</span>
                                <span className="badge badge-info m-1">google fonts</span>
                                <span className="badge badge-info m-1">dashboard pages</span>
                                <span className="badge badge-info m-1">support</span>
                                <span className="badge badge-info m-1">multiple checkouts</span>
                                <span className="badge badge-info m-1">grid / list view</span>
                                <span className="badge badge-info m-1">blog</span>
                                <span className="badge badge-info m-1">others pages</span>
                            </p>
                            <p className="mb-4">Current Realease - 2.1.1</p>
                            <a href="https://wrapbootstrap.com/theme/bigshop-responsive-e-commerce-template-WB0NH85N8"
                               className="btn bigshop-btn">Buy Now</a>
                        </div>
                    </div>
                </div>
            </div>

        </Wrapper>;
    }
}
export default connect((state:WebReducersState) => state.locale)(Root);