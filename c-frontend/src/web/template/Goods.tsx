import * as React from "react";
import {httpEndpointArray} from "../../common/utils/HttpUtils";
import {CartGoods, Goods} from "../dto/Goods";
import {productImageUrl} from "../TemplateUtil";
import {cartStore, itemsStore, selectedItemStore} from "../redux/WebRedux";
import Wrapper from "../../common/component/Wrapper";
import {ItemsAction, ItemsActionType, ItemsState} from "../redux/reducers/cart/ItemsReducer";
import {connect, Provider} from "react-redux";
import AllItems from "./main/AllItems";
import HotItems from "./main/HotItems";
import ModalItem from "./main/ModalItem";
import {Router, BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import history from '../../common/utils/History';
import {Checkout} from "./main/Checkout";

export class GoodsPage extends React.Component {

    async componentDidMount() {
        const result = await httpEndpointArray<Goods>(Goods, "goods");
        itemsStore.dispatch<ItemsAction>({type:ItemsActionType.Show, items:result.data})
    }

    render() {
        return (
            <Wrapper>
                <Provider store={itemsStore}>
                    <Router history={history}>
                        <Switch>
                            <Route path={"/checkout"} component={Checkout}/>
                            <Route path={"/"} render={()=>(
                                <Wrapper>
                                    <HotItems />
                                    <AllItems />
                                </Wrapper>
                            )}/>
                            <Redirect to={"/"} />
                        </Switch>
                    </Router>

                </Provider>
                <Provider store={selectedItemStore}>
                    <ModalItem />
                </Provider>
            </Wrapper>
        );
    }

}