import * as React from "react";
import {connect, Provider} from "react-redux";
import {dataStore, methodsStore, WebReducersState} from "../redux/WebRedux";

import {LocaleState} from "../../common/redux/reducers/locale/LocaleReducer";
import {changeLocale} from "../redux/reducers/LocaleActions";
import DataStorage from "../../common/DataStorage";

import Header from "./Header";

import {init} from "./Bigshop";
import {RouteMapping} from "./RouteMapping";
import {Footer} from "./Footer";
import {httpEndpointArray} from "../../common/utils/HttpUtils";
import {PaymentMethodDto, ShippingMethodDto} from "../dto/Methods";
import {MethodsAction, MethodsActionType} from "../redux/reducers/cart/MethodsReducer";
import {CartGoods, Category} from "../dto/GoodsDto";
import {DataAction, DataActionType} from "../redux/reducers/cart/DataReducer";
import {booleanComparator, Loader} from "../../common/component/Loader";
import {toast, ToastContainer} from "react-toastify";

export const announceAddedToCart = (cartGoods:CartGoods) => {
    toast.info(Strings["ItemAddedToCart"]);
};

const fetchMethods = async () => {
    const payments = await httpEndpointArray(PaymentMethodDto, "method/payments");
    methodsStore.dispatch<MethodsAction>({type:MethodsActionType.SetPayment, payment:payments.data});
    const shipping = await httpEndpointArray(ShippingMethodDto, "method/shippings");
    methodsStore.dispatch<MethodsAction>({type:MethodsActionType.SetShipping, shipping:shipping.data});
};

const fetchCategories = async() => {
    const result = await httpEndpointArray<Category>(Category, "categories");
    dataStore.dispatch<DataAction>({type:DataActionType.SetCategories, categories:result.data});
};


export function setCategory(category:Category) {
    // @ts-ignore
    $('.classy-menu').removeClass("menu-on");
    dataStore.dispatch<DataAction>({type:DataActionType.SetCategory, currentCategory:category});

}

class Root extends React.Component<LocaleState> {

    state:{loaded:boolean} = {loaded:false};

    async componentDidMount() {
        this.changeLocale(DataStorage.get("locale")||"cs");
        await fetchMethods();
        await fetchCategories();
        this.setState({loaded:true}, ()=>{
            init();
        })
    }

    changeLocale = (locale:string) => {
        this.props.dispatch(changeLocale(locale));
    };

    render() {
        return (
            <>
                <Provider store={dataStore}>
                    <Loader value={this.state.loaded} fullscreen comparator={booleanComparator}>
                        {(loader)=>(
                            loader&&(
                                <Loader />
                            )||(
                                <>
                                    <Header />
                                    <RouteMapping />
                                    <Footer/>
                                </>
                            )
                        )}
                    </Loader>
                </Provider>
                <ToastContainer />
            </>
        );
    }
}
export default connect((state:WebReducersState) => state.locale)(Root);