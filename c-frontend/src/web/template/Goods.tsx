import * as React from "react";
import {httpEndpointArray} from "../../common/utils/HttpUtils";
import {CartGoods, Goods} from "../dto/Goods";
import {productImageUrl} from "../TemplateUtil";
import {cartStore, itemsStore} from "../redux/WebRedux";
import Wrapper from "../../common/component/Wrapper";
import {ItemsAction, ItemsActionType, ItemsState} from "../redux/reducers/cart/ItemsReducer";
import {connect, Provider} from "react-redux";
import AllItems from "./main/AllItems";
import HotItems from "./main/HotItems";

export class GoodsPage extends React.Component {

    async componentDidMount() {
        const result = await httpEndpointArray<Goods>(Goods, "goods");
        itemsStore.dispatch<ItemsAction>({type:ItemsActionType.Show, items:result.data})
    }

    render() {
        return (
            <Wrapper>
                <Provider store={itemsStore}>
                    <HotItems />
                    <AllItems />
                </Provider>
            </Wrapper>
        );
    }

}