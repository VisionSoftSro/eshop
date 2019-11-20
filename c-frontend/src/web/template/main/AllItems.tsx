import * as React from "react";
import {ItemsState} from "../../redux/reducers/cart/ItemsReducer";
import {CartGoods, Goods} from "../../dto/Goods";
import {cartStore, itemsStore, selectedItemStore} from "../../redux/WebRedux";
import {CartAction, CartActionType} from "../../redux/reducers/cart/CartReducer";
import {productImageUrl} from "../../TemplateUtil";
import {Link} from "../../../common/component/Link";
import {connect} from "react-redux";
import {reduceStateToPlainObject} from "../../../common/redux/Reducers";
import {ItemAction, ItemActionType} from "../../redux/reducers/cart/ItemReducer";

class Item extends React.Component<{item:Goods}> {

    addToCart = () => {
        cartStore.dispatch<CartAction>({ type: CartActionType.AddCart, item:new CartGoods(this.props.item, 1)});
    };

    showDetail = () => {
        selectedItemStore.dispatch<ItemAction>({type: ItemActionType.Show, item:this.props.item, pcs:1});
    };

    render() {
        return (
            <div className="col-9 col-sm-6 col-md-4 col-lg-3">
                <div className="single-product-area mb-30">
                    <div className="product_image">
                        <img className="normal_img" src={productImageUrl(this.props.item.id, 1)} alt="" />
                        {this.props.item.hot && <div className="product_badge">
                            <span>Top</span>
                        </div>}
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

                        <a href="#">{this.props.item.name}</a>
                        <h6 className="product-price">{this.props.item.getPrice().format()}</h6>
                    </div>
                </div>
            </div>
        );
    }
}
class AllItems extends React.Component<ItemsState> {
    render() {
        return <section className="best-selling-products-area mb-70 section_padding_100">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-heading mb-50">
                            <h5>Naše zboží</h5>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    {this.props.items.map(item=><Item key={item.id} item={item} />)}
                </div>
            </div>
        </section>;
    }
}

export default connect((state:ItemsState) => reduceStateToPlainObject(state))(AllItems);