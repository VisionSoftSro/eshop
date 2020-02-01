import * as React from "react";
import {httpEndpointArray} from "../../common/utils/HttpUtils";
import {CartGoods, GoodsDto} from "../dto/GoodsDto";
import {cartStore, checkoutStore, dataStore, selectedItemStore} from "../redux/WebRedux";
import Wrapper from "../../common/component/Wrapper";
import {DataAction, DataActionType} from "../redux/reducers/cart/DataReducer";
import {connect, Provider} from "react-redux";
import ItemList from "./main/ItemList";
import ModalItem from "./main/ModalItem";
import {Router, BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import history from '../../common/utils/History';
import {StorageForm} from "./main/Storage";
import {ItemDetail} from "./main/ItemDetail";
import Checkout from "./main/checkout/Checkout";

export class RouteMapping extends React.Component {

    async componentDidMount() {
        const result = await httpEndpointArray<GoodsDto>(GoodsDto, "goods");
        dataStore.dispatch<DataAction>({type:DataActionType.SetGoods, goods:result.data})
    }

    render() {
        const categories = dataStore.getState().categories;
        return (
            <Wrapper>
                <Router history={history}>
                    <Switch>
                        <Route path={"/storage-form"} component={StorageForm} />
                        <Route path={"/kosik"} render={()=>(
                            <Provider store={cartStore}>
                                <Checkout/>
                            </Provider>
                        )}/>
                        {categories.map(category=>(
                            <Route key={`/${category.id}-item`} path={`/${category.getSeoName()}/*`} component={ItemDetail}/>
                        ))}
                        {categories.map(category=>(
                            <Route key={`/${category.id}-category`} path={`/${category.getSeoName()}`} component={ItemList}/>
                        ))}
                        <Route path={`/`} component={ItemList}/>
                        <Redirect to={"/"} />
                    </Switch>
                </Router>
                <Provider store={selectedItemStore}>
                    <ModalItem />
                </Provider>
            </Wrapper>
        );
    }

}