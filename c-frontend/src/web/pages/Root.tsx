import * as React from "react";
import {connect} from "react-redux";
import {WebReducersState} from "../redux/WebRedux";
import Wrapper from "../../common/component/Wrapper";

import {LocaleState} from "../../common/redux/reducers/locale/LocaleReducer";
import {changeLocale} from "../redux/reducers/LocaleActions";
import DataStorage from "../../common/DataStorage";
import moment from "moment";
import {Header} from "./Header";
import '../assets/scss/main.scss';
import {NavBar} from "./NavBar";

class Root extends React.Component<LocaleState> {


    componentDidMount(): void {
        this.changeLocale(DataStorage.get("locale")||"cs");
    }

    changeLocale = (locale:string) => {
        this.props.dispatch(changeLocale(locale));
    };

    render() {
        return <Wrapper>
            <Header />


        </Wrapper>;
    }
}
export default connect((state:WebReducersState) => state.locale)(Root);