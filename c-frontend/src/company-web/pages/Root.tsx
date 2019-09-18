import * as React from "react";
import {connect} from "react-redux";
import {WebReducersState} from "../redux/WebRedux";
import {Link} from "../../common/component/Link";
import {TestActionType, TestState} from "../redux/reducers/TestReducer";
import Wrapper from "../../common/component/Wrapper";
import {Header} from "./theme/Header";

class Root extends React.Component<TestState> {

    click = () => {
      this.props.dispatch({type:TestActionType.Test, value:this.props.value+1});
    };

    render() {
        return <Wrapper>
            <div id="top" />
            <Header />
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