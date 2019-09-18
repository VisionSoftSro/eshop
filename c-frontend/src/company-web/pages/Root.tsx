import * as React from "react";
import {connect} from "react-redux";
import {WebCombinedState} from "../redux/WebRedux";
import {Link} from "../../common/component/Link";
import {TestActionType, TestState} from "../redux/reducers/TestReducer";

class Root extends React.Component<TestState> {

    click = () => {
      this.props.dispatch({type:TestActionType.Test, value:this.props.value+1});
    };

    render() {
        return <Link href={this.click}>Klik {this.props.value}</Link>;
    }
}
export default connect((state:WebCombinedState) => state.test)(Root);