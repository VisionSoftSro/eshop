import * as React from "react";
import {DataAction, DataActionType, DataState} from "../../redux/reducers/cart/DataReducer";
import {CartGoods, Category, GoodsDto} from "../../dto/GoodsDto";
import {cartStore, dataStore, selectedItemStore} from "../../redux/WebRedux";
import {CartAction, CartActionType} from "../../redux/reducers/cart/CartReducer";
import {productImageUrl} from "../../TemplateUtil";
import {Link} from "../../../common/component/Link";
import {connect} from "react-redux";
import {reduceStateToPlainObject} from "../../../common/redux/Reducers";
import {ItemAction, ItemActionType} from "../../redux/reducers/cart/ItemReducer";
import {Loader} from "../../../common/component/Loader";
import Wrapper from "../../../common/component/Wrapper";
import {getHashValue} from "../../../common/utils/Util";
import {announceAddedToCart} from "../Root";
import {StockEmoji} from "./StockEmoji";

class Item extends React.Component<{item:GoodsDto}> {

    addToCart = () => {
        const cg = new CartGoods(this.props.item, 1);
        announceAddedToCart(cg);
        cartStore.dispatch<CartAction>({ type: CartActionType.AddCart, item:cg});
    };

    showDetail = () => {
        selectedItemStore.dispatch<ItemAction>({type: ItemActionType.Show, item:this.props.item, pcs:1});
    };

    render() {
        return (
            <div className="col-9 col-sm-6 col-md-4 col-lg-3">
                <div className="single-product-area mb-30">
                    <div className="product_image">
                        <img className="normal_img" src={productImageUrl(this.props.item.code, 1)} alt="" />
                        {this.props.item.hot && <div className="product_badge">
                            <span>Top</span>
                        </div>}
                        <StockEmoji stock={this.props.item.stock}/>
                        {/*<div className="product_wishlist">*/}
                        {/*    <a href="wishlist.html"><i className="icofont-heart"/></a>*/}
                        {/*</div>*/}
                        {/*<div className="product_compare">*/}
                        {/*    <a href="compare.html"><i className="icofont-exchange"/></a>*/}
                        {/*</div>*/}
                    </div>

                    <div className="product_description">
                        <div className="product_add_to_cart">
                            <Link href={this.addToCart}>
                                <i className="icofont-cart"/> {Strings["AddToCart"]}
                            </Link>
                        </div>

                        <div className="product_quick_view">
                            <Link href={this.showDetail}>
                                <i className="icofont-eye-alt"/> {Strings["QuickView"]}
                            </Link>
                        </div>

                        <Link ignoreHash href={`${this.props.item.getUrl()}`}>{this.props.item.name}</Link>
                        <h6 className="product-price" style={{fontWeight:"bold"}}>{this.props.item.getPrice().format()}</h6>
                    </div>
                </div>
            </div>
        );
    }
}

function getCatetory():Category {
    const cid = getHashValue("cid");
    const categories = dataStore.getState().categories;
    let category = categories[0];
    if(cid) {
        const hashCategory = categories.filter(i=>i.id === cid);
        if(hashCategory.length > 0) {
            category = hashCategory[0];
        }
    }
    return category;
}

class ItemList extends React.Component<DataState> {
    componentDidMount(): void {
        const category = getCatetory();
        dataStore.dispatch<DataAction>({type:DataActionType.SetCategory, currentCategory:category});
    }

    render() {
        return (
            <section className="best-selling-products-area" >
                <div className="container" style={{paddingTop:20}}>
                    {this.props.currentCategory &&
                    <Wrapper>
                        <div className="row">
                            <div className="col-12">
                                <h5>{Strings["Goods"]}</h5>
                                <ol className="breadcrumb" style={{marginBottom:0}}>
                                    <li className="breadcrumb-item">{Strings["Category"]}</li>
                                    <li className="breadcrumb-item active">{this.props.currentCategory.getName()}</li>
                                </ol>
                                <ol className="breadcrumb" style={{backgroundColor: "transparent"}}>
                                    <li className="breadcrumb-item">{this.props.currentCategory.getDesc()}</li>
                                </ol>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            {
                                this.props.goods.filter(i=>i.categories.map(ii=>ii.id).includes(this.props.currentCategory.id)).map(item=><Item key={item.id} item={item} />)
                            }
                        </div>
                    </Wrapper>|| <Loader />}
                </div>
            </section>
        );
    }
}

export default connect((state:DataState) => reduceStateToPlainObject(state))(ItemList);
