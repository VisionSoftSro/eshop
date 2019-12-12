import * as React from "react";
import {connect, Provider} from "react-redux";
import {dataStore, methodsStore, WebReducersState} from "../redux/WebRedux";

import {LocaleState} from "../../common/redux/reducers/locale/LocaleReducer";
import {changeLocale} from "../redux/reducers/LocaleActions";
import DataStorage from "../../common/DataStorage";

import Header from "./Header";

import {init} from "./Bigshop";
import {GoodsPage} from "./Goods";
import {Footer} from "./Footer";
import {httpEndpointArray} from "../../common/utils/HttpUtils";
import {PaymentMethodDto, ShippingMethodDto} from "../dto/Methods";
import {MethodsAction, MethodsActionType} from "../redux/reducers/cart/MethodsReducer";


const fetchMethods = async () => {
    const payments = await httpEndpointArray(PaymentMethodDto, "method/payments");
    methodsStore.dispatch<MethodsAction>({type:MethodsActionType.SetPayment, payment:payments.data});
    const shipping = await httpEndpointArray(ShippingMethodDto, "method/shippings");
    methodsStore.dispatch<MethodsAction>({type:MethodsActionType.SetShipping, shipping:shipping.data});
};

class Root extends React.Component<LocaleState> {

    async componentDidMount() {
        this.changeLocale(DataStorage.get("locale")||"cs");
        init();
        return fetchMethods()
    }

    changeLocale = (locale:string) => {
        this.props.dispatch(changeLocale(locale));
    };

    render() {
        return <Provider store={dataStore}>
            <Header />
            <GoodsPage />
            <Footer/>
        </Provider>;
    }
}
export default connect((state:WebReducersState) => state.locale)(Root);