import * as React from "react";
import {connect, Provider} from "react-redux";
import {dataStore, WebReducersState} from "../redux/WebRedux";
import Wrapper from "../../common/component/Wrapper";

import {LocaleState} from "../../common/redux/reducers/locale/LocaleReducer";
import {changeLocale} from "../redux/reducers/LocaleActions";
import DataStorage from "../../common/DataStorage";

import Header from "./Header";

import {init} from "./Bigshop";
import {GoodsPage} from "./Goods";
import {StickyContainer} from "react-sticky";


class Root extends React.Component<LocaleState> {

    componentDidMount(): void {
        this.changeLocale(DataStorage.get("locale")||"cs");
        init();
    }

    changeLocale = (locale:string) => {
        this.props.dispatch(changeLocale(locale));
    };

    render() {
        return <Provider store={dataStore}>
            <StickyContainer>
                <Header />
                <GoodsPage />
            </StickyContainer>
        </Provider>;
    }
}
export default connect((state:WebReducersState) => state.locale)(Root);